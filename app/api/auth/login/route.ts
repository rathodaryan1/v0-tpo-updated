import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { z } from 'zod'

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = loginSchema.parse(body)
    
    const supabase = createClient()
    
    // Sign in user
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email: validatedData.email,
      password: validatedData.password,
    })

    if (authError) {
      // Check if it's an email not confirmed error
      if (authError.message.includes('email_not_confirmed')) {
        return NextResponse.json(
          { 
            error: 'Email not verified', 
            details: 'Please check your email and click the verification link before logging in.',
            requiresEmailVerification: true 
          },
          { status: 401 }
        )
      }
      
      return NextResponse.json(
        { error: authError.message },
        { status: 401 }
      )
    }

    if (!authData.user) {
      return NextResponse.json(
        { error: 'Login failed' },
        { status: 401 }
      )
    }

    // Check if email is confirmed
    if (!authData.user.email_confirmed_at) {
      return NextResponse.json(
        { 
          error: 'Email not verified', 
          details: 'Please check your email and click the verification link before logging in.',
          requiresEmailVerification: true 
        },
        { status: 401 }
      )
    }

    // Get user profile
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', authData.user.id)
      .single()

    if (profileError || !profile) {
      return NextResponse.json(
        { error: 'Profile not found' },
        { status: 404 }
      )
    }

    // Check if user is approved (skip check for admin role)
    if (profile.role !== 'admin' && !profile.is_approved) {
      return NextResponse.json(
        { 
          error: 'Account pending approval', 
          details: 'Please wait for admin/faculty approval before accessing the system.',
          requiresApproval: true 
        },
        { status: 403 }
      )
    }

    // Get role-specific data
    let roleData = null
    if (profile.role === 'student') {
      const { data: studentData } = await supabase
        .from('students')
        .select('*')
        .eq('profile_id', authData.user.id)
        .single()
      roleData = studentData
    } else if (profile.role === 'faculty') {
      const { data: facultyData } = await supabase
        .from('faculty')
        .select('*')
        .eq('profile_id', authData.user.id)
        .single()
      roleData = facultyData
    } else if (profile.role === 'company') {
      const { data: companyData } = await supabase
        .from('companies')
        .select('*')
        .eq('profile_id', authData.user.id)
        .single()
      roleData = companyData
    }

    return NextResponse.json({
      user: {
        id: authData.user.id,
        email: profile.email,
        role: profile.role,
        firstName: profile.first_name,
        lastName: profile.last_name,
        isApproved: profile.is_approved,
        emailConfirmed: !!authData.user.email_confirmed_at,
        roleData,
      },
      session: authData.session,
    })

  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid input data', details: error.errors },
        { status: 400 }
      )
    }

    console.error('Login error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}