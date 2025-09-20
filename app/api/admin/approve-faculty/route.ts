import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { z } from 'zod'

const approveFacultySchema = z.object({
  facultyId: z.string().uuid(),
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
      return NextResponse.json({ error: 'Only admins can approve faculty' }, { status: 403 })
    }

    const body = await request.json()
    const { facultyId, action, notes } = approveFacultySchema.parse(body)

    // Get faculty profile
    const { data: facultyProfile, error: facultyError } = await supabase
      .from('profiles')
      .select('id, email, first_name, last_name, is_approved')
      .eq('id', facultyId)
      .single()

    if (facultyError || !facultyProfile) {
      return NextResponse.json({ error: 'Faculty profile not found' }, { status: 404 })
    }

    if (facultyProfile.is_approved) {
      return NextResponse.json({ error: 'Faculty already approved' }, { status: 400 })
    }

    // Update approval status
    const { error: updateError } = await supabase
      .from('profiles')
      .update({
        is_approved: action === 'approve',
        approved_by: user.id,
        approved_at: new Date().toISOString(),
      })
      .eq('id', facultyId)

    if (updateError) {
      return NextResponse.json({ error: 'Failed to update faculty approval' }, { status: 400 })
    }

    // Create notification for faculty
    await supabase
      .from('notifications')
      .insert({
        user_id: facultyId,
        title: action === 'approve' ? 'Account Approved' : 'Account Rejected',
        message: action === 'approve' 
          ? 'Your faculty account has been approved. You can now access the TPO portal.'
          : `Your faculty account has been rejected. ${notes || 'Please contact admin for more details.'}`,
        type: action === 'approve' ? 'success' : 'error',
      })

    return NextResponse.json({ 
      message: `Faculty ${action}d successfully`,
      faculty: {
        id: facultyProfile.id,
        email: facultyProfile.email,
        name: `${facultyProfile.first_name} ${facultyProfile.last_name}`,
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

    console.error('Approve faculty error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
