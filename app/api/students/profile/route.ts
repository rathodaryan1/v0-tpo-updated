import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { z } from 'zod'

const updateProfileSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  phone: z.string().optional(),
  address: z.string().optional(),
  branch: z.string().optional(),
  year: z.number().optional(),
  cgpa: z.number().min(0).max(10).optional(),
  skills: z.array(z.string()).optional(),
  certifications: z.array(z.string()).optional(),
  training_experience: z.string().optional(),
})

export async function GET(request: NextRequest) {
  try {
    const supabase = createClient()
    
    // Get current user
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get student profile
    const { data: student, error: studentError } = await supabase
      .from('students')
      .select(`
        *,
        profiles!inner(first_name, last_name, email)
      `)
      .eq('profile_id', user.id)
      .single()

    if (studentError) {
      return NextResponse.json({ error: 'Student profile not found' }, { status: 404 })
    }

    return NextResponse.json({ student })

  } catch (error) {
    console.error('Get student profile error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const supabase = createClient()
    
    // Get current user
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const validatedData = updateProfileSchema.parse(body)

    // Update profile
    const { error: profileError } = await supabase
      .from('profiles')
      .update({
        first_name: validatedData.firstName,
        last_name: validatedData.lastName,
        updated_at: new Date().toISOString(),
      })
      .eq('id', user.id)

    if (profileError) {
      return NextResponse.json({ error: 'Failed to update profile' }, { status: 400 })
    }

    // Update student data
    const { error: studentError } = await supabase
      .from('students')
      .update({
        phone: validatedData.phone,
        address: validatedData.address,
        branch: validatedData.branch,
        year: validatedData.year,
        cgpa: validatedData.cgpa,
        skills: validatedData.skills,
        certifications: validatedData.certifications,
        training_experience: validatedData.training_experience,
        updated_at: new Date().toISOString(),
      })
      .eq('profile_id', user.id)

    if (studentError) {
      return NextResponse.json({ error: 'Failed to update student data' }, { status: 400 })
    }

    return NextResponse.json({ message: 'Profile updated successfully' })

  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid input data', details: error.errors },
        { status: 400 }
      )
    }

    console.error('Update student profile error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
