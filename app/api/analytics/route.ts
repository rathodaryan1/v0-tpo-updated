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
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single()

    if (profileError || !profile || !['admin', 'faculty'].includes(profile.role)) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type') || 'overview'

    if (type === 'overview') {
      // Get comprehensive overview statistics
      const [
        { count: totalStudents },
        { count: approvedStudents },
        { count: pendingStudents },
        { count: totalCompanies },
        { count: approvedCompanies },
        { count: totalJobs },
        { count: activeJobs },
        { count: totalApplications },
        { count: selectedApplications },
        { count: totalFaculty }
      ] = await Promise.all([
        supabase.from('profiles').select('id', { count: 'exact', head: true }).eq('role', 'student'),
        supabase.from('profiles').select('id', { count: 'exact', head: true }).eq('role', 'student').eq('is_approved', true),
        supabase.from('profiles').select('id', { count: 'exact', head: true }).eq('role', 'student').eq('is_approved', false),
        supabase.from('profiles').select('id', { count: 'exact', head: true }).eq('role', 'company'),
        supabase.from('profiles').select('id', { count: 'exact', head: true }).eq('role', 'company').eq('is_approved', true),
        supabase.from('jobs').select('id', { count: 'exact', head: true }),
        supabase.from('jobs').select('id', { count: 'exact', head: true }).eq('status', 'active'),
        supabase.from('applications').select('id', { count: 'exact', head: true }),
        supabase.from('applications').select('id', { count: 'exact', head: true }).eq('status', 'selected'),
        supabase.from('profiles').select('id', { count: 'exact', head: true }).eq('role', 'faculty')
      ])

      return NextResponse.json({
        overview: {
          users: {
            totalStudents: totalStudents || 0,
            approvedStudents: approvedStudents || 0,
            pendingStudents: pendingStudents || 0,
            totalFaculty: totalFaculty || 0,
            totalCompanies: totalCompanies || 0,
            approvedCompanies: approvedCompanies || 0
          },
          jobs: {
            total: totalJobs || 0,
            active: activeJobs || 0,
            inactive: (totalJobs || 0) - (activeJobs || 0)
          },
          applications: {
            total: totalApplications || 0,
            selected: selectedApplications || 0,
            placementRate: totalApplications > 0 ? ((selectedApplications || 0) / totalApplications * 100).toFixed(2) : 0
          }
        }
      })
    }

    if (type === 'branch-wise') {
      // Get branch-wise statistics
      const { data: branchStats, error: branchError } = await supabase
        .from('students')
        .select(`
          branch,
          year,
          cgpa,
          profiles!inner(is_approved),
          applications(id, status)
        `)

      if (branchError) {
        return NextResponse.json({ error: 'Failed to fetch branch statistics' }, { status: 400 })
      }

      // Process branch statistics
      const branchData = branchStats.reduce((acc: any, student: any) => {
        const branch = student.branch
        if (!acc[branch]) {
          acc[branch] = {
            totalStudents: 0,
            approvedStudents: 0,
            yearDistribution: {},
            averageCGPA: 0,
            totalCGPA: 0,
            totalApplications: 0,
            selectedApplications: 0
          }
        }
        
        acc[branch].totalStudents++
        if (student.profiles.is_approved) {
          acc[branch].approvedStudents++
        }
        
        // Year distribution
        const year = student.year
        acc[branch].yearDistribution[year] = (acc[branch].yearDistribution[year] || 0) + 1
        
        // CGPA calculation
        if (student.cgpa > 0) {
          acc[branch].totalCGPA += student.cgpa
        }
        
        // Applications
        acc[branch].totalApplications += student.applications.length
        acc[branch].selectedApplications += student.applications.filter((app: any) => app.status === 'selected').length
      }, {})

      // Calculate average CGPA
      Object.keys(branchData).forEach(branch => {
        const studentsWithCGPA = branchStats.filter(s => s.branch === branch && s.cgpa > 0).length
        branchData[branch].averageCGPA = studentsWithCGPA > 0 
          ? (branchData[branch].totalCGPA / studentsWithCGPA).toFixed(2) 
          : 0
      })

      return NextResponse.json({ branchStats: branchData })
    }

    if (type === 'company-wise') {
      // Get company-wise statistics
      const { data: companyStats, error: companyError } = await supabase
        .from('companies')
        .select(`
          industry,
          company_name,
          profiles!inner(is_approved),
          jobs(id, status, applications(id, status))
        `)

      if (companyError) {
        return NextResponse.json({ error: 'Failed to fetch company statistics' }, { status: 400 })
      }

      // Process company statistics
      const companyData = companyStats.reduce((acc: any, company: any) => {
        const industry = company.industry
        if (!acc[industry]) {
          acc[industry] = {
            totalCompanies: 0,
            approvedCompanies: 0,
            companies: [],
            totalJobs: 0,
            activeJobs: 0,
            totalApplications: 0,
            selectedApplications: 0
          }
        }
        
        acc[industry].totalCompanies++
        if (company.profiles.is_approved) {
          acc[industry].approvedCompanies++
        }
        
        acc[industry].companies.push({
          name: company.company_name,
          isApproved: company.profiles.is_approved
        })
        
        // Jobs and applications
        acc[industry].totalJobs += company.jobs.length
        acc[industry].activeJobs += company.jobs.filter((job: any) => job.status === 'active').length
        
        company.jobs.forEach((job: any) => {
          acc[industry].totalApplications += job.applications.length
          acc[industry].selectedApplications += job.applications.filter((app: any) => app.status === 'selected').length
        })
      }, {})

      return NextResponse.json({ companyStats: companyData })
    }

    if (type === 'monthly-trends') {
      // Get monthly trends for registrations, jobs, and applications
      const { data: monthlyData, error: monthlyError } = await supabase
        .from('profiles')
        .select('created_at, role')
        .gte('created_at', new Date(Date.now() - 365 * 24 * 60 * 60 * 1000).toISOString()) // Last year

      const { data: jobData, error: jobError } = await supabase
        .from('jobs')
        .select('created_at')
        .gte('created_at', new Date(Date.now() - 365 * 24 * 60 * 60 * 1000).toISOString())

      const { data: applicationData, error: applicationError } = await supabase
        .from('applications')
        .select('applied_at')
        .gte('applied_at', new Date(Date.now() - 365 * 24 * 60 * 60 * 1000).toISOString())

      if (monthlyError || jobError || applicationError) {
        return NextResponse.json({ error: 'Failed to fetch monthly trends' }, { status: 400 })
      }

      // Process monthly data
      const monthlyStats = {}
      const currentDate = new Date()
      
      for (let i = 11; i >= 0; i--) {
        const date = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1)
        const monthKey = date.toISOString().substring(0, 7) // YYYY-MM format
        
        monthlyStats[monthKey] = {
          students: 0,
          faculty: 0,
          companies: 0,
          jobs: 0,
          applications: 0
        }
      }

      // Count registrations by month
      monthlyData?.forEach(profile => {
        const month = profile.created_at.substring(0, 7)
        if (monthlyStats[month]) {
          monthlyStats[month][`${profile.role}s` as keyof typeof monthlyStats[string]]++
        }
      })

      // Count jobs by month
      jobData?.forEach(job => {
        const month = job.created_at.substring(0, 7)
        if (monthlyStats[month]) {
          monthlyStats[month].jobs++
        }
      })

      // Count applications by month
      applicationData?.forEach(application => {
        const month = application.applied_at.substring(0, 7)
        if (monthlyStats[month]) {
          monthlyStats[month].applications++
        }
      })

      return NextResponse.json({ monthlyTrends: monthlyStats })
    }

    if (type === 'placement-report') {
      // Get detailed placement report
      const { data: placementData, error: placementError } = await supabase
        .from('applications')
        .select(`
          status,
          applied_at,
          reviewed_at,
          students!inner(
            branch,
            year,
            cgpa,
            profiles!inner(first_name, last_name, email)
          ),
          jobs!inner(
            title,
            salary_min,
            salary_max,
            location,
            companies!inner(company_name, industry)
          )
        `)
        .eq('status', 'selected')

      if (placementError) {
        return NextResponse.json({ error: 'Failed to fetch placement data' }, { status: 400 })
      }

      // Process placement data
      const placementReport = {
        totalPlacements: placementData?.length || 0,
        branchWisePlacements: {},
        companyWisePlacements: {},
        averageSalary: 0,
        salaryRange: { min: Infinity, max: 0 },
        placements: placementData?.map(placement => ({
          studentName: `${placement.students.profiles.first_name} ${placement.students.profiles.last_name}`,
          studentEmail: placement.students.profiles.email,
          branch: placement.students.branch,
          year: placement.students.year,
          cgpa: placement.students.cgpa,
          company: placement.jobs.companies.company_name,
          jobTitle: placement.jobs.title,
          location: placement.jobs.location,
          salaryMin: placement.jobs.salary_min,
          salaryMax: placement.jobs.salary_max,
          appliedAt: placement.applied_at,
          selectedAt: placement.reviewed_at
        })) || []
      }

      // Calculate branch-wise and company-wise statistics
      placementData?.forEach(placement => {
        const branch = placement.students.branch
        const company = placement.jobs.companies.company_name
        
        placementReport.branchWisePlacements[branch] = (placementReport.branchWisePlacements[branch] || 0) + 1
        placementReport.companyWisePlacements[company] = (placementReport.companyWisePlacements[company] || 0) + 1
        
        // Update salary range
        placementReport.salaryRange.min = Math.min(placementReport.salaryRange.min, placement.jobs.salary_min)
        placementReport.salaryRange.max = Math.max(placementReport.salaryRange.max, placement.jobs.salary_max)
      })

      // Calculate average salary
      const totalSalary = placementData?.reduce((sum, placement) => 
        sum + (placement.jobs.salary_min + placement.jobs.salary_max) / 2, 0) || 0
      placementReport.averageSalary = placementData?.length > 0 ? Math.round(totalSalary / placementData.length) : 0

      return NextResponse.json({ placementReport })
    }

    return NextResponse.json({ error: 'Invalid type parameter' }, { status: 400 })

  } catch (error) {
    console.error('Analytics error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}