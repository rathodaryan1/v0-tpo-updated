import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { z } from 'zod'

const approveCompanySchema = z.object({
  companyId: z.string().uuid(),
  action: z.enum(['approve', 'reject']),
  notes: z.string().optional(),
})

export async function POST(request: NextRequest) {
  try {
    const supabase = createClient()
    
    // Get current user
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Check if user is admin
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single()

    if (!profile || profile.role !== 'admin') {
      return NextResponse.json({ error: 'Only admins can approve companies' }, { status: 403 })
    }

    const body = await request.json()
    const { companyId, action, notes } = approveCompanySchema.parse(body)

    // Get company profile
    const { data: companyProfile, error: companyError } = await supabase
      .from('profiles')
      .select('id, email, first_name, last_name, is_approved')
      .eq('id', companyId)
      .single()

    if (companyError || !companyProfile) {
      return NextResponse.json({ error: 'Company profile not found' }, { status: 404 })
    }

    if (companyProfile.is_approved) {
      return NextResponse.json({ error: 'Company already approved' }, { status: 400 })
    }

    // Update approval status
    const { error: updateError } = await supabase
      .from('profiles')
      .update({
        is_approved: action === 'approve',
        approved_by: user.id,
        approved_at: new Date().toISOString(),
      })
      .eq('id', companyId)

    if (updateError) {
      return NextResponse.json({ error: 'Failed to update company approval' }, { status: 400 })
    }

    // Create notification for company
    await supabase
      .from('notifications')
      .insert({
        user_id: companyId,
        title: action === 'approve' ? 'Account Approved' : 'Account Rejected',
        message: action === 'approve' 
          ? 'Your company account has been approved. You can now post jobs and manage applications.'
          : `Your company account has been rejected. ${notes || 'Please contact admin for more details.'}`,
        type: action === 'approve' ? 'success' : 'error',
      })

    return NextResponse.json({ 
      message: `Company ${action}d successfully`,
      company: {
        id: companyProfile.id,
        email: companyProfile.email,
        name: `${companyProfile.first_name} ${companyProfile.last_name}`,
        action,
      }
    })

  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid input data', details: error.errors },
        { status: 400 }
      )
    }

    console.error('Approve company error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
