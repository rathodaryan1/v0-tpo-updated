# 🚀 TPO Portal Setup Guide

## Quick Setup Steps

### 1. Create Supabase Project
1. Go to [supabase.com](https://supabase.com)
2. Create new project: `tpo-portal`
3. Save your database password!

### 2. Get API Keys
1. Go to **Settings** → **API**
2. Copy these values:
   - Project URL
   - anon public key
   - service_role key

### 3. Create Environment File
Create `.env.local` in project root:
```env
NEXT_PUBLIC_SUPABASE_URL=your_project_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 4. Set up Database
1. Go to **SQL Editor** in Supabase
2. Copy entire content from `database-schema.sql`
3. Paste and click **Run**

### 5. Set up Storage
1. Go to **Storage** in Supabase
2. Create bucket: `tpo-files`
3. Make it **Public**

### 6. Create Admin User
1. Go to **Authentication** → **Users**
2. Add user: `admin@tpo.com` with password
3. Copy the User UID
4. Run this SQL (replace YOUR_ADMIN_UID_HERE):
```sql
INSERT INTO profiles (id, email, role, first_name, last_name, is_approved)
VALUES ('YOUR_ADMIN_UID_HERE', 'admin@tpo.com', 'admin', 'Admin', 'User', true);
```

### 7. Run the Application
```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 🎯 Login Credentials

**Admin Login:**
- Email: `admin@tpo.com`
- Password: (the password you created)
- Role: Admin

## 📱 Features Available

- ✅ Mobile responsive design
- ✅ Student registration and profile management
- ✅ Faculty approval system
- ✅ Company job posting
- ✅ Admin dashboard with analytics
- ✅ File upload for resumes and documents
- ✅ Real-time notifications
- ✅ Role-based access control

## 🔧 Troubleshooting

**If the site doesn't load:**
1. Check if `.env.local` file exists and has correct values
2. Verify Supabase project is active
3. Check if database schema was applied successfully
4. Ensure admin user was created properly

**If you get authentication errors:**
1. Verify API keys are correct
2. Check if RLS policies are enabled
3. Ensure admin user is approved in the database

**If file uploads don't work:**
1. Check if `tpo-files` bucket exists and is public
2. Verify storage policies are set correctly

## 📞 Support

If you encounter any issues, check the browser console for error messages and ensure all setup steps were completed correctly.
