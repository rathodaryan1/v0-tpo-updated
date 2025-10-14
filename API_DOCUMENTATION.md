# TPO Portal Backend API Documentation

This document provides comprehensive documentation for all the backend APIs in the TPO Portal system.

## Base URL
All API endpoints are prefixed with `/api/`

## Authentication
Most endpoints require authentication. Include the session token in the request headers or cookies (handled automatically by Supabase).

## API Endpoints

### Authentication APIs

#### POST `/api/auth/register`
Register a new user (student, faculty, or company).

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123",
  "role": "student", // "student", "faculty", "company"
  "firstName": "John",
  "lastName": "Doe",
  // Role-specific fields
  "rollNumber": "CS2021001", // for students
  "branch": "Computer Science", // for students
  "year": 3, // for students
  "employeeId": "EMP001", // for faculty
  "department": "Computer Science", // for faculty
  "companyName": "Tech Corp", // for companies
  "industry": "Technology", // for companies
  "contactPerson": "HR Manager", // for companies
  "phone": "+1234567890"
}
```

#### POST `/api/auth/login`
Login with email and password.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

#### POST `/api/auth/logout`
Logout the current user.

#### GET `/api/auth/verify`
Verify current user session and get user details.

### Student APIs

#### GET `/api/students/profile`
Get current student's profile and academic details.

#### PUT `/api/students/profile`
Update student profile information.

**Request Body:**
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "phone": "+1234567890",
  "address": "123 Main St",
  "branch": "Computer Science",
  "year": 4,
  "cgpa": 8.5,
  "skills": ["React", "Node.js", "Python"],
  "certifications": ["AWS Certified", "Google Analytics"],
  "trainingExperience": "6 months internship at Tech Corp"
}
```

#### GET `/api/students/applications`
Get all applications submitted by the current student.

**Query Parameters:**
- `status`: Filter by application status (optional)

#### DELETE `/api/students/applications?id={applicationId}`
Delete an application (only if status is 'applied').

#### POST `/api/students/apply`
Apply for a job.

**Request Body:**
```json
{
  "jobId": "uuid-of-job"
}
```

### Faculty APIs

#### GET `/api/faculty/students`
Get all students with optional filtering.

**Query Parameters:**
- `branch`: Filter by branch
- `year`: Filter by year
- `status`: "approved", "pending", "all"

#### PUT `/api/faculty/students`
Approve or reject student registrations.

**Request Body:**
```json
{
  "studentId": "uuid-of-student",
  "action": "approve", // "approve" or "reject"
  "feedback": "Optional feedback message"
}
```

#### GET `/api/faculty/applications`
Get all applications with student and job details.

**Query Parameters:**
- `status`: Filter by application status
- `student_id`: Filter by specific student
- `job_id`: Filter by specific job

#### PUT `/api/faculty/applications`
Update application status.

**Request Body:**
```json
{
  "applicationId": "uuid-of-application",
  "status": "shortlisted", // "under_review", "shortlisted", "rejected", "selected"
  "notes": "Optional notes"
}
```

#### GET `/api/faculty/analytics`
Get analytics data for faculty.

**Query Parameters:**
- `type`: "overview", "branch-stats", "recent-activity"

### Company APIs

#### GET `/api/companies/profile`
Get current company's profile information.

#### PUT `/api/companies/profile`
Update company profile.

**Request Body:**
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "companyName": "Tech Corp",
  "industry": "Technology",
  "contactPerson": "HR Manager",
  "phone": "+1234567890",
  "website": "https://techcorp.com",
  "description": "Leading technology company"
}
```

#### GET `/api/companies/jobs`
Get all jobs posted by the current company.

**Query Parameters:**
- `status`: Filter by job status

#### POST `/api/companies/jobs`
Create a new job posting.

**Request Body:**
```json
{
  "title": "Software Engineer",
  "description": "Full-time software engineer position",
  "requirements": ["Bachelor's degree", "2+ years experience"],
  "location": "Bangalore",
  "salaryMin": 600000,
  "salaryMax": 1200000,
  "jobType": "full-time", // "full-time", "part-time", "internship"
  "applicationDeadline": "2024-12-31T23:59:59Z"
}
```

#### PUT `/api/companies/jobs`
Update an existing job.

**Request Body:**
```json
{
  "jobId": "uuid-of-job",
  "title": "Updated Title",
  "status": "active" // "active", "inactive", "closed"
  // ... other fields
}
```

#### GET `/api/companies/applications`
Get all applications for company's jobs.

**Query Parameters:**
- `job_id`: Filter by specific job
- `status`: Filter by application status

#### PUT `/api/companies/applications`
Update application status (review applications).

**Request Body:**
```json
{
  "applicationId": "uuid-of-application",
  "status": "selected", // "under_review", "shortlisted", "rejected", "selected"
  "notes": "Excellent candidate"
}
```

### Admin APIs

#### GET `/api/admin/users`
Get all users with pagination and filtering.

**Query Parameters:**
- `role`: Filter by user role
- `status`: "approved", "pending", "all"
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 20)

#### PUT `/api/admin/users`
Manage user approvals and deletions.

**Request Body:**
```json
{
  "userId": "uuid-of-user",
  "action": "approve", // "approve", "reject", "delete"
  "feedback": "Optional feedback"
}
```

#### GET `/api/admin/system`
Get system-wide analytics and data.

**Query Parameters:**
- `type`: "dashboard", "recent-activity", "analytics"

#### GET `/api/admin/notifications`
Get all notifications (admin view).

**Query Parameters:**
- `user_id`: Filter by specific user
- `type`: Filter by notification type
- `is_read`: Filter by read status
- `page`: Page number
- `limit`: Items per page

#### POST `/api/admin/notifications`
Send notifications to users.

**Request Body:**
```json
{
  "userId": "uuid-of-user", // Optional: send to specific user
  "role": "student", // Optional: send to all users of role ("all" for everyone)
  "title": "Important Notice",
  "message": "Notification message",
  "type": "info" // "info", "success", "warning", "error"
}
```

### Job APIs

#### GET `/api/jobs`
Get all active jobs with company details.

**Query Parameters:**
- `status`: Filter by job status
- `company_id`: Filter by specific company

#### POST `/api/jobs`
Create a new job (companies only).

#### GET `/api/jobs/[id]`
Get specific job details.

#### PUT `/api/jobs/[id]`
Update specific job (owner or admin only).

#### DELETE `/api/jobs/[id]`
Delete specific job (owner or admin only).

### Notification APIs

#### GET `/api/notifications`
Get current user's notifications.

**Query Parameters:**
- `is_read`: Filter by read status
- `type`: Filter by notification type
- `limit`: Number of notifications to fetch

#### PUT `/api/notifications`
Mark notifications as read/unread.

**Request Body:**
```json
{
  "notificationId": "uuid-of-notification",
  "isRead": true
}
```

#### DELETE `/api/notifications?id={notificationId}`
Delete a specific notification.

### Upload APIs

#### POST `/api/upload`
Upload files (resume, profile picture, certificates).

**Form Data:**
- `file`: The file to upload
- `fileType`: "resume", "profile_pic", "certificate", "offer_letter"

#### GET `/api/upload`
Get current user's uploaded files.

### Analytics APIs

#### GET `/api/analytics`
Get comprehensive analytics data.

**Query Parameters:**
- `type`: "overview", "branch-wise", "company-wise", "monthly-trends", "placement-report"

## Error Responses

All APIs return consistent error responses:

```json
{
  "error": "Error message",
  "details": "Additional error details (optional)"
}
```

Common HTTP status codes:
- `200`: Success
- `400`: Bad Request (validation errors)
- `401`: Unauthorized (not logged in)
- `403`: Forbidden (insufficient permissions)
- `404`: Not Found
- `500`: Internal Server Error

## Rate Limiting

APIs may be rate limited to prevent abuse. Implement appropriate retry logic in your frontend.

## File Upload

File uploads are handled via FormData with the following constraints:
- Maximum file size: 10MB
- Allowed file types depend on the upload type:
  - Resume: PDF, DOC, DOCX
  - Profile Picture: JPEG, PNG, GIF, WebP
  - Certificates: PDF, JPEG, PNG
  - Offer Letters: PDF, DOC, DOCX

## Database Schema

The system uses the following main tables:
- `profiles`: User authentication and basic info
- `students`: Student-specific data
- `faculty`: Faculty-specific data
- `companies`: Company-specific data
- `jobs`: Job postings
- `applications`: Job applications
- `notifications`: System notifications
- `offer_letters`: Offer letter uploads

## Security

- All endpoints require authentication except registration
- Role-based access control is enforced
- File uploads are validated for type and size
- SQL injection protection via Supabase
- XSS protection via input validation

