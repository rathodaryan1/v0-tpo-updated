import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  try {
    const supabase = createClient()
    
    // Get current user
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const formData = await request.formData()
    const file = formData.get('file') as File
    const fileType = formData.get('fileType') as string // 'resume', 'profile_pic', 'certificate', 'offer_letter'

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    // Validate file type
    const allowedTypes = {
      resume: ['application/pdf'],
      profile_pic: ['image/jpeg', 'image/png', 'image/jpg'],
      certificate: ['application/pdf', 'image/jpeg', 'image/png'],
      offer_letter: ['application/pdf']
    }

    if (!allowedTypes[fileType as keyof typeof allowedTypes]?.includes(file.type)) {
      return NextResponse.json({ 
        error: `Invalid file type for ${fileType}. Allowed types: ${allowedTypes[fileType as keyof typeof allowedTypes]?.join(', ')}` 
      }, { status: 400 })
    }

    // Validate file size (5MB max)
    const maxSize = 5 * 1024 * 1024 // 5MB
    if (file.size > maxSize) {
      return NextResponse.json({ error: 'File size too large. Maximum size is 5MB.' }, { status: 400 })
    }

    // Generate unique filename
    const fileExt = file.name.split('.').pop()
    const fileName = `${user.id}_${fileType}_${Date.now()}.${fileExt}`
    const filePath = `uploads/${fileType}/${fileName}`

    // Upload file to Supabase Storage
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('tpo-files')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      })

    if (uploadError) {
      return NextResponse.json({ error: 'Failed to upload file' }, { status: 400 })
    }

    // Get public URL
    const { data: urlData } = supabase.storage
      .from('tpo-files')
      .getPublicUrl(filePath)

    // Update user's profile with file URL based on file type
    if (fileType === 'resume' || fileType === 'profile_pic') {
      const updateData: any = {}
      if (fileType === 'resume') {
        updateData.resume_url = urlData.publicUrl
      } else if (fileType === 'profile_pic') {
        updateData.profile_pic_url = urlData.publicUrl
      }

      const { error: updateError } = await supabase
        .from('students')
        .update(updateData)
        .eq('profile_id', user.id)

      if (updateError) {
        return NextResponse.json({ error: 'Failed to update profile with file URL' }, { status: 400 })
      }
    }

    return NextResponse.json({
      message: 'File uploaded successfully',
      fileUrl: urlData.publicUrl,
      fileName: file.name,
      fileSize: file.size,
      fileType: file.type
    })

  } catch (error) {
    console.error('File upload error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
