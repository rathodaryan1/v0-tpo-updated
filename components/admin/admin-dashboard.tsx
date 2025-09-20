"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { FacultyApprovals } from "@/components/admin/faculty-approvals"
import { CompanyApprovals } from "@/components/admin/company-approvals"
import { DriveManagement } from "@/components/admin/drive-management"
import { InterviewReports } from "@/components/admin/interview-reports"
import { AdminAnalytics } from "@/components/admin/admin-analytics"
import { AdminSettings } from "@/components/admin/admin-settings"
import { Users, Building2, Briefcase, TrendingUp, Clock, CheckCircle, AlertTriangle, Award } from "lucide-react"

export function AdminDashboard() {
  const [activeSection, setActiveSection] = useState("dashboard")

  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return <DashboardContent onSectionChange={setActiveSection} />
      case "faculty":
        return <FacultyApprovals />
      case "companies":
        return <CompanyApprovals />
      case "drives":
        return <DriveManagement />
      case "interviews":
        return <InterviewReports />
      case "analytics":
        return <AdminAnalytics />
      case "settings":
        return <AdminSettings />
      default:
        return <DashboardContent onSectionChange={setActiveSection} />
    }
  }

  return (
    <div className="flex min-h-screen bg-slate-50">
      <AdminSidebar activeSection={activeSection} onSectionChange={setActiveSection} />
      <main className="flex-1 p-6 lg:p-8 bg-slate-50 overflow-auto">
        <div className="max-w-7xl mx-auto">{renderContent()}</div>
      </main>
    </div>
  )
}

function DashboardContent({ onSectionChange }: { onSectionChange: (section: string) => void }) {
  const handleReviewFaculty = (facultyName: string) => {
    console.log(`[v0] Reviewing faculty: ${facultyName}`)
    onSectionChange("faculty")
  }

  const handleReviewCompany = (companyName: string) => {
    console.log(`[v0] Reviewing company: ${companyName}`)
    onSectionChange("companies")
  }

  const handleViewAllFaculty = () => {
    console.log("[v0] Viewing all faculty requests")
    onSectionChange("faculty")
  }

  const handleViewAllCompanies = () => {
    console.log("[v0] Viewing all company requests")
    onSectionChange("companies")
  }

  const handleCreateDrive = () => {
    console.log("[v0] Creating new drive")
    onSectionChange("drives")
  }

  const handleSendNotifications = () => {
    console.log("[v0] Sending notifications")
    // Add notification functionality here
    alert("Notifications sent successfully!")
  }

  const handleGenerateReports = () => {
    console.log("[v0] Generating reports")
    onSectionChange("analytics")
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
          <p className="text-muted-foreground mt-1">Training & Placement Office - Administrative Panel</p>
        </div>
        <Badge variant="outline" className="px-3 py-1">
          TPO Admin
        </Badge>
      </div>

      {/* Key Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,247</div>
            <p className="text-xs text-muted-foreground">Across all departments</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Drives</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">Currently ongoing</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Selected Students</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">342</div>
            <p className="text-xs text-muted-foreground">This academic year</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Offers Generated</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">456</div>
            <p className="text-xs text-muted-foreground">+23% from last year</p>
          </CardContent>
        </Card>
      </div>

      {/* Pending Approvals */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-l-4 border-l-orange-500">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Pending Faculty Approvals
            </CardTitle>
            <CardDescription>New faculty registrations awaiting approval</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "Dr. Rajesh Kumar", dept: "Mechanical Engineering", date: "2 days ago" },
                { name: "Prof. Anita Sharma", dept: "Electronics & Communication", date: "3 days ago" },
                { name: "Dr. Suresh Patel", dept: "Civil Engineering", date: "1 week ago" },
              ].map((faculty, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="space-y-1">
                    <p className="font-medium text-sm">{faculty.name}</p>
                    <p className="text-xs text-muted-foreground">{faculty.dept}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">{faculty.date}</span>
                    <Button size="sm" variant="outline" onClick={() => handleReviewFaculty(faculty.name)}>
                      Review
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4 bg-transparent" onClick={handleViewAllFaculty}>
              View All Faculty Requests
            </Button>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-500">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5" />
              Pending Company Approvals
            </CardTitle>
            <CardDescription>New company registrations awaiting approval</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "TechVision Solutions", industry: "Information Technology", date: "1 day ago" },
                { name: "Global Finance Corp", industry: "Finance & Banking", date: "2 days ago" },
                { name: "InnovateTech Systems", industry: "Software Development", date: "4 days ago" },
              ].map((company, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="space-y-1">
                    <p className="font-medium text-sm">{company.name}</p>
                    <p className="text-xs text-muted-foreground">{company.industry}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">{company.date}</span>
                    <Button size="sm" variant="outline" onClick={() => handleReviewCompany(company.name)}>
                      Review
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4 bg-transparent" onClick={handleViewAllCompanies}>
              View All Company Requests
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity Feed */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Latest activities across the TPO system</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              {
                type: "drive",
                message: "New drive created: Software Engineer at TechCorp",
                time: "2 hours ago",
                icon: Briefcase,
              },
              {
                type: "approval",
                message: "Faculty approval: Dr. Jane Smith approved 12 student profiles",
                time: "4 hours ago",
                icon: CheckCircle,
              },
              {
                type: "company",
                message: "Company registered: DataFlow Analytics",
                time: "6 hours ago",
                icon: Building2,
              },
              {
                type: "interview",
                message: "Interview completed: 15 students interviewed at WebTech",
                time: "1 day ago",
                icon: Users,
              },
              {
                type: "alert",
                message: "Drive deadline approaching: Frontend Developer at UIDesign Co.",
                time: "1 day ago",
                icon: AlertTriangle,
              },
            ].map((activity, index) => {
              const Icon = activity.icon
              return (
                <div key={index} className="flex items-start gap-3 p-3 border rounded-lg">
                  <Icon className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div className="flex-1 space-y-1">
                    <p className="text-sm">{activity.message}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {activity.type}
                  </Badge>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full justify-start bg-transparent" variant="outline" onClick={handleCreateDrive}>
              <Briefcase className="h-4 w-4 mr-2" />
              Create New Drive
            </Button>
            <Button className="w-full justify-start bg-transparent" variant="outline" onClick={handleSendNotifications}>
              <Users className="h-4 w-4 mr-2" />
              Send Notifications
            </Button>
            <Button className="w-full justify-start bg-transparent" variant="outline" onClick={handleGenerateReports}>
              <TrendingUp className="h-4 w-4 mr-2" />
              Generate Reports
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">System Health</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm">Database Status</span>
              <Badge variant="default" className="bg-green-100 text-green-800 border-green-200">
                Healthy
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Email Service</span>
              <Badge variant="default" className="bg-green-100 text-green-800 border-green-200">
                Active
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">File Storage</span>
              <Badge variant="outline">85% Used</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Upcoming Events</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2">
              <div className="text-sm">
                <p className="font-medium">TechCorp Interview</p>
                <p className="text-muted-foreground">Tomorrow, 10:00 AM</p>
              </div>
              <div className="text-sm">
                <p className="font-medium">DataSys Drive Deadline</p>
                <p className="text-muted-foreground">Jan 20, 2024</p>
              </div>
              <div className="text-sm">
                <p className="font-medium">Placement Committee Meeting</p>
                <p className="text-muted-foreground">Jan 25, 2024</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
