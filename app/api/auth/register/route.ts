import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { z } from 'zod'

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  role: z.enum(['student', 'faculty', 'company']),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  // Additional fields based on role
  rollNumber: z.string().optional(),
  branch: z.string().optional(),
  year: z.number().optional(),
  employeeId: z.string().optional(),
  department: z.string().optional(),
  companyName: z.string().optional(),
  industry: z.string().optional(),
  contactPerson: z.string().optional(),
  phone: z.string().optional(),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = registerSchema.parse(body)
    
    const supabase = createClient()
    
    // Create user in Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: validatedData.email,
      password: validatedData.password,
    })

    if (authError) {
      return NextResponse.json(
        { error: authError.message },
        { status: 400 }
      )
    }

    if (!authData.user) {
      return NextResponse.json(
        { error: 'Failed to create user' },
        { status: 400 }
      )
    }

    // Create profile record
    const { error: profileError } = await supabase
      .from('profiles')
      .insert({
        id: authData.user.id,
        email: validatedData.email,
        role: validatedData.role,
        first_name: validatedData.firstName,
        last_name: validatedData.lastName,
        is_approved: validatedData.role === 'student' ? false : false, // All need approval except admin
      })

    if (profileError) {
      // Clean up auth user if profile creation fails
      await supabase.auth.admin.deleteUser(authData.user.id)
      return NextResponse.json(
        { error: 'Failed to create profile' },
        { status: 400 }
      )
    }

    // Create role-specific records
    if (validatedData.role === 'student' && validatedData.rollNumber && validatedData.branch && validatedData.year) {
      const { error: studentError } = await supabase
        .from('students')
        .insert({
          profile_id: authData.user.id,
          roll_number: validatedData.rollNumber,
          branch: validatedData.branch,
          year: validatedData.year,
          cgpa: 0, // Default value
          phone: validatedData.phone || '',
          address: '', // Default value
          skills: [],
          certifications: [],
        })

      if (studentError) {
        return NextResponse.json(
          { error: 'Failed to create student record' },
          { status: 400 }
        )
      }
    }

    if (validatedData.role === 'faculty' && validatedData.employeeId && validatedData.department) {
      const { error: facultyError } = await supabase
        .from('faculty')
        .insert({
          profile_id: authData.user.id,
          employee_id: validatedData.employeeId,
          department: validatedData.department,
          designation: 'Professor', // Default value
          phone: validatedData.phone || '',
        })

      if (facultyError) {
        return NextResponse.json(
          { error: 'Failed to create faculty record' },
          { status: 400 }
        )
      }
    }

    if (validatedData.role === 'company' && validatedData.companyName && validatedData.industry) {
      const { error: companyError } = await supabase
        .from('companies')
        .insert({
          profile_id: authData.user.id,
          company_name: validatedData.companyName,
          industry: validatedData.industry,
          contact_person: validatedData.contactPerson || '',
          phone: validatedData.phone || '',
        })

      if (companyError) {
        return NextResponse.json(
          { error: 'Failed to create company record' },
          { status: 400 }
        )
      }
    }

    return NextResponse.json({
      message: 'Registration successful. Please check your email for verification.',
      user: {
        id: authData.user.id,
        email: validatedData.email,
        role: validatedData.role,
      }
    })

  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid input data', details: error.errors },
        { status: 400 }
      )
    }

    console.error('Registration error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
