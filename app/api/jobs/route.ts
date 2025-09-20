import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { z } from 'zod'

const createJobSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  requirements: z.array(z.string()),
  location: z.string().min(1),
  salary_min: z.number().min(0),
  salary_max: z.number().min(0),
  job_type: z.enum(['full-time', 'part-time', 'internship']),
  application_deadline: z.string().datetime(),
})

export async function GET(request: NextRequest) {
  try {
    const supabase = createClient()
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status') || 'active'
    const companyId = searchParams.get('company_id')

    let query = supabase
      .from('jobs')
      .select(`
        *,
        companies!inner(
          company_name,
          industry,
          contact_person
        )
      `)
      .eq('status', status)
      .order('created_at', { ascending: false })

    if (companyId) {
      query = query.eq('company_id', companyId)
    }

    const { data: jobs, error } = await query

    if (error) {
      return NextResponse.json({ error: 'Failed to fetch jobs' }, { status: 400 })
    }

    return NextResponse.json({ jobs })

  } catch (error) {
    console.error('Get jobs error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = createClient()
    
    // Get current user
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Check if user is a company
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single()

    if (!profile || profile.role !== 'company') {
      return NextResponse.json({ error: 'Only companies can create jobs' }, { status: 403 })
    }

    // Get company ID
    const { data: company, error: companyError } = await supabase
      .from('companies')
      .select('id')
      .eq('profile_id', user.id)
      .single()

    if (companyError || !company) {
      return NextResponse.json({ error: 'Company profile not found' }, { status: 404 })
    }

    const body = await request.json()
    const validatedData = createJobSchema.parse(body)

    // Create job
    const { data: job, error: jobError } = await supabase
      .from('jobs')
      .insert({
        company_id: company.id,
        ...validatedData,
      })
      .select()
      .single()

    if (jobError) {
      return NextResponse.json({ error: 'Failed to create job' }, { status: 400 })
    }

    return NextResponse.json({ 
      message: 'Job created successfully',
      job 
    })

  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid input data', details: error.errors },
        { status: 400 }
      )
    }

    console.error('Create job error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
