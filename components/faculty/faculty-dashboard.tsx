"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FacultySidebar } from "@/components/faculty/faculty-sidebar"
import { StudentProfilesTable } from "@/components/faculty/student-profiles-table"
import { ApprovalRequests } from "@/components/faculty/approval-requests"
import { StudentApplications } from "@/components/faculty/student-applications"
import { ExportData } from "@/components/faculty/export-data"
import { Users, UserCheck, FileText, TrendingUp, Clock, CheckCircle } from "lucide-react"

export function FacultyDashboard() {
  const [activeSection, setActiveSection] = useState("dashboard")

  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return <DashboardContent onSectionChange={setActiveSection} />
      case "students":
        return <StudentProfilesTable />
      case "approvals":
        return <ApprovalRequests />
      case "applications":
        return <StudentApplications />
      case "export":
        return <ExportData />
      default:
        return <DashboardContent onSectionChange={setActiveSection} />
    }
  }

  return (
    <div className="flex min-h-screen bg-background">
      <FacultySidebar activeSection={activeSection} onSectionChange={setActiveSection} />
      <main className="flex-1 p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">{renderContent()}</div>
      </main>
    </div>
  )
}

function DashboardContent({ onSectionChange }: { onSectionChange: (section: string) => void }) {
  const handleReviewStudent = (studentName: string) => {
    console.log(`[v0] Reviewing student: ${studentName}`)
    onSectionChange("approvals")
  }

  const handleViewAllApprovals = () => {
    console.log("[v0] Viewing all pending approvals")
    onSectionChange("approvals")
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Faculty Dashboard</h1>
          <p className="text-muted-foreground mt-1">Welcome back, Dr. Jane Smith - Computer Science Department</p>
        </div>
        <Badge variant="outline" className="px-3 py-1">
          CSE Department
        </Badge>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">156</div>
            <p className="text-xs text-muted-foreground">In your department</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Approvals</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">Profile updates</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Approved Today</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">+3 from yesterday</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Placement Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">78%</div>
            <p className="text-xs text-muted-foreground">This academic year</p>
          </CardContent>
        </Card>
      </div>

      {/* Pending Approvals Card */}
      <Card className="border-l-4 border-l-orange-500">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UserCheck className="h-5 w-5" />
            Pending Profile Approvals
          </CardTitle>
          <CardDescription>Student profile updates waiting for your approval</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { name: "Rahul Kumar", rollNo: "CS2021001", type: "Profile Update", time: "2 hours ago" },
              { name: "Priya Sharma", rollNo: "CS2021002", type: "Document Upload", time: "4 hours ago" },
              { name: "Amit Singh", rollNo: "CS2021003", type: "Skills Update", time: "1 day ago" },
            ].map((request, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="space-y-1">
                  <p className="font-medium">{request.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {request.rollNo} • {request.type}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">{request.time}</span>
                  <Button size="sm" variant="outline" onClick={() => handleReviewStudent(request.name)}>
                    Review
                  </Button>
                </div>
              </div>
            ))}
          </div>
          <Button variant="outline" className="w-full mt-4 bg-transparent" onClick={handleViewAllApprovals}>
            View All Pending Approvals
          </Button>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Recent Student Applications
            </CardTitle>
            <CardDescription>Latest job applications from your department students</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { student: "Rahul Kumar", company: "TechCorp", role: "Software Engineer", status: "Applied" },
                { student: "Priya Sharma", company: "DataSys", role: "Data Analyst", status: "Interview" },
                { student: "Amit Singh", company: "WebFlow", role: "Frontend Dev", status: "Selected" },
              ].map((app, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="space-y-1">
                    <p className="font-medium text-sm">{app.student}</p>
                    <p className="text-xs text-muted-foreground">
                      {app.company} - {app.role}
                    </p>
                  </div>
                  <Badge variant={app.status === "Selected" ? "default" : "outline"}>{app.status}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Department Performance</CardTitle>
            <CardDescription>Key metrics for your department</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Students with Complete Profiles</span>
                <span className="text-sm font-bold">142/156</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Active Job Applications</span>
                <span className="text-sm font-bold">89</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Students Placed</span>
                <span className="text-sm font-bold">45</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Average Package</span>
                <span className="text-sm font-bold">₹8.5 LPA</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
