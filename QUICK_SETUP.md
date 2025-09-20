# 🚀 TPO Portal - Quick Setup Guide

## ✅ **Your Site is Running!**

Your TPO Portal is now running at: **http://localhost:3000**

## 🔧 **Next Steps - Set Up Supabase**

The middleware error has been fixed! Now you need to set up Supabase to make the authentication work.

### 1. Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Sign up/Login and create a new project
3. Name it: `tpo-portal`
4. Choose your region
5. Set a strong database password (save this!)

### 2. Get Your API Keys

1. In your Supabase project, go to **Settings** → **API**
2. Copy these values:
   - **Project URL** (starts with `https://`)
   - **anon public** key (long string starting with `eyJ`)
   - **service_role** key (long string starting with `eyJ`)

### 3. Create Environment File

Create a file named `.env.local` in your project root with this content:

```env
NEXT_PUBLIC_SUPABASE_URL=your_project_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

Replace the placeholder values with your actual Supabase credentials.

### 4. Set Up Database

1. In Supabase dashboard, go to **SQL Editor**
2. Click **New Query**
3. Copy the entire content from `database-schema.sql` file
4. Paste it and click **Run**

### 5. Create Storage Bucket

1. Go to **Storage** in Supabase
2. Click **Create a new bucket**
3. Name: `tpo-files`
4. Make it **Public**
5. Click **Create bucket**

### 6. Create Admin User

1. Go to **Authentication** → **Users**
2. Click **Add user**
3. Email: `admin@tpo.com`
4. Password: (create a strong password)
5. Click **Create user**
6. Copy the **User UID** (long UUID string)

### 7. Add Admin to Database

Go back to **SQL Editor** and run this query (replace `YOUR_ADMIN_UID_HERE`):

```sql
INSERT INTO profiles (id, email, role, first_name, last_name, is_approved)
VALUES ('YOUR_ADMIN_UID_HERE', 'admin@tpo.com', 'admin', 'Admin', 'User', true);
```

### 8. Restart Server

After creating the `.env.local` file:

1. Stop the server (Ctrl+C)
2. Run `npm run dev` again

## 🎯 **Login Credentials**

Once set up, you can login with:
- **Email:** `admin@tpo.com`
- **Password:** (the password you created)
- **Role:** Admin

## 📱 **What You'll See**

- ✅ Mobile-responsive design
- ✅ Student registration and profiles
- ✅ Faculty approval system
- ✅ Company job posting
- ✅ Admin dashboard with analytics
- ✅ File upload functionality
- ✅ Real-time notifications

## 🆘 **If You See Setup Required**

The site will show a configuration checker if Supabase isn't set up yet. Just follow the steps above to configure it.

## 🔍 **Troubleshooting**

**Site not loading?**
- Check if `.env.local` file exists
- Verify all Supabase credentials are correct
- Make sure the database schema was applied

**Authentication errors?**
- Ensure admin user was created properly
- Check if the admin profile was added to the database
- Verify RLS policies are enabled

Your TPO Portal is ready to go! 🎉
