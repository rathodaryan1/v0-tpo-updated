# Supabase Setup Guide for TPO Portal

## 1. Create Supabase Project

1. Go to [Supabase](https://supabase.com) and create a new project
2. Wait for the project to be fully initialized
3. Go to Settings > API to get your project credentials

## 2. Environment Variables

Create a `.env.local` file in your project root with the following variables:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

### Where to find these values:
- **NEXT_PUBLIC_SUPABASE_URL**: Project Settings > API > Project URL
- **NEXT_PUBLIC_SUPABASE_ANON_KEY**: Project Settings > API > Project API Keys > anon/public
- **SUPABASE_SERVICE_ROLE_KEY**: Project Settings > API > Project API Keys > service_role (keep this secret!)

## 3. Database Setup

1. Go to your Supabase project dashboard
2. Navigate to SQL Editor
3. Copy and paste the contents of `database-schema.sql` file
4. Run the SQL script to create all tables and policies

## 4. Email Authentication Setup

1. Go to Authentication > Settings in your Supabase dashboard
2. Configure your email templates:
   - **Confirm signup**: Customize the email verification template
   - **Reset password**: Customize the password reset template
3. Set up email provider (SMTP or use Supabase's built-in email)
4. Configure site URL: `http://localhost:3000` (for development) or your production URL

## 5. Row Level Security (RLS)

The database schema includes RLS policies, but you may need to enable them:

1. Go to Authentication > Policies in your Supabase dashboard
2. Ensure RLS is enabled for all tables
3. Review the policies in the database schema file

## 6. Admin User Setup

After setting up the database, you can create the initial admin user by making a POST request to `/api/admin/setup` with:

```json
{
  "email": "admin@yourdomain.com",
  "password": "your_secure_password",
  "firstName": "Admin",
  "lastName": "User"
}
```

## 7. Testing the Setup

1. Start your development server: `npm run dev`
2. Try registering a new user
3. Check your email for verification link
4. Verify email and try logging in
5. Test admin setup if no admin exists

## 8. Production Deployment

For production:
1. Update the site URL in Supabase Authentication settings
2. Configure your email provider for production
3. Set up proper CORS settings
4. Update environment variables in your hosting platform

## Troubleshooting

### Common Issues:

1. **"Invalid input data" error**: Check that your frontend is sending the correct data format
2. **Email not sending**: Verify email configuration in Supabase
3. **RLS errors**: Ensure all policies are correctly set up
4. **Admin setup fails**: Check if admin user already exists

### Debug Mode:
Set `NODE_ENV=development` to see more detailed error messages in the console.
