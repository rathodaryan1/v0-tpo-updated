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

    // Check if user is admin or faculty
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single()

    if (!profile || !['admin', 'faculty'].includes(profile.role)) {
      return NextResponse.json({ error: 'Only admins and faculty can view analytics' }, { status: 403 })
    }

    // Get analytics data
    const [
      totalStudents,
      totalCompanies,
      totalJobs,
      totalApplications,
      placementsByDepartment,
      yearlyTrends,
      driveWiseSelections
    ] = await Promise.all([
      // Total students
      supabase
        .from('students')
        .select('id', { count: 'exact' }),

      // Total companies
      supabase
        .from('companies')
        .select('id', { count: 'exact' }),

      // Total jobs
      supabase
        .from('jobs')
        .select('id', { count: 'exact' }),

      // Total applications
      supabase
        .from('applications')
        .select('id', { count: 'exact' }),

      // Placements by department
      supabase
        .from('students')
        .select(`
          branch,
          applications!inner(
            status,
            jobs!inner(
              companies!inner(company_name)
            )
          )
        `),

      // Yearly trends (applications over time)
      supabase
        .from('applications')
        .select(`
          applied_at,
          status,
          students!inner(branch)
        `)
        .gte('applied_at', new Date(new Date().getFullYear() - 1, 0, 1).toISOString()),

      // Drive-wise selections
      supabase
        .from('applications')
        .select(`
          status,
          jobs!inner(
            title,
            companies!inner(company_name)
          )
        `)
        .eq('status', 'selected')
    ])

    // Process placements by department
    const departmentStats = placementsByDepartment.data?.reduce((acc: any, student: any) => {
      const branch = student.branch
      if (!acc[branch]) {
        acc[branch] = { total: 0, placed: 0 }
      }
      acc[branch].total++
      if (student.applications.some((app: any) => app.status === 'selected')) {
        acc[branch].placed++
      }
      return acc
    }, {}) || {}

    // Process yearly trends
    const monthlyTrends = yearlyTrends.data?.reduce((acc: any, app: any) => {
      const month = new Date(app.applied_at).toISOString().substring(0, 7)
      if (!acc[month]) {
        acc[month] = { applications: 0, selected: 0 }
      }
      acc[month].applications++
      if (app.status === 'selected') {
        acc[month].selected++
      }
      return acc
    }, {}) || {}

    // Process drive-wise selections
    const driveStats = driveWiseSelections.data?.reduce((acc: any, app: any) => {
      const driveName = `${app.jobs.companies.company_name} - ${app.jobs.title}`
      if (!acc[driveName]) {
        acc[driveName] = 0
      }
      acc[driveName]++
      return acc
    }, {}) || {}

    const analytics = {
      overview: {
        totalStudents: totalStudents.count || 0,
        totalCompanies: totalCompanies.count || 0,
        totalJobs: totalJobs.count || 0,
        totalApplications: totalApplications.count || 0,
      },
      placementsByDepartment: Object.entries(departmentStats).map(([department, stats]: [string, any]) => ({
        department,
        total: stats.total,
        placed: stats.placed,
        placementRate: stats.total > 0 ? ((stats.placed / stats.total) * 100).toFixed(1) : 0
      })),
      yearlyTrends: Object.entries(monthlyTrends).map(([month, data]: [string, any]) => ({
        month,
        applications: data.applications,
        selected: data.selected
      })),
      driveWiseSelections: Object.entries(driveStats).map(([drive, count]: [string, any]) => ({
        drive,
        selections: count
      }))
    }

    return NextResponse.json({ analytics })

  } catch (error) {
    console.error('Analytics error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
