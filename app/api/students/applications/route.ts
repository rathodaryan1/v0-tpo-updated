import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: NextRequest) {
  try {
    const supabase = createClient()
    
    // Get current user
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get student ID
    const { data: student, error: studentError } = await supabase
      .from('students')
      .select('id')
      .eq('profile_id', user.id)
      .single()

    if (studentError || !student) {
      return NextResponse.json({ error: 'Student profile not found' }, { status: 404 })
    }

    // Get applications with job details
    const { data: applications, error: applicationsError } = await supabase
      .from('applications')
      .select(`
        *,
        jobs!inner(
          id,
          title,
          description,
          location,
          salary_min,
          salary_max,
          job_type,
          application_deadline,
          companies!inner(
            company_name,
            industry
          )
        )
      `)
      .eq('student_id', student.id)
      .order('applied_at', { ascending: false })

    if (applicationsError) {
      return NextResponse.json({ error: 'Failed to fetch applications' }, { status: 400 })
    }

    return NextResponse.json({ applications })

  } catch (error) {
    console.error('Get applications error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
