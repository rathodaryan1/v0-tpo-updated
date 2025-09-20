"use client"

import { useState } from "react"
import { CompanySidebar } from "./company-sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Users, FileText, TrendingUp, Plus, Eye, Download } from "lucide-react"

export function CompanyDashboard() {
  const [activeTab, setActiveTab] = useState("overview")

  const stats = [
    { title: "Active Drives", value: "3", icon: Calendar, change: "+2 this month" },
    { title: "Applications Received", value: "247", icon: Users, change: "+45 this week" },
    { title: "Interviews Scheduled", value: "89", icon: FileText, change: "+12 today" },
    { title: "Offers Extended", value: "34", icon: TrendingUp, change: "+8 this week" },
  ]

  const recentDrives = [
    { id: 1, title: "Software Engineer - Full Stack", applications: 89, deadline: "2024-01-15", status: "Active" },
    { id: 2, title: "Data Analyst", applications: 67, deadline: "2024-01-20", status: "Active" },
    { id: 3, title: "Product Manager", applications: 91, deadline: "2024-01-10", status: "Closed" },
  ]

  const recentApplications = [
    { id: 1, student: "Rahul Sharma", position: "Software Engineer", cgpa: "8.5", status: "Under Review" },
    { id: 2, student: "Priya Patel", position: "Data Analyst", cgpa: "9.1", status: "Shortlisted" },
    { id: 3, student: "Amit Kumar", position: "Software Engineer", cgpa: "8.8", status: "Interview Scheduled" },
    { id: 4, student: "Sneha Reddy", position: "Product Manager", cgpa: "9.3", status: "Offer Extended" },
  ]

  const handleCreateDrive = () => {
    console.log("[v0] Creating new drive")
    setActiveTab("drives")
  }

  const handleViewDrive = (driveId: number, driveTitle: string) => {
    console.log(`[v0] Viewing drive: ${driveTitle} (ID: ${driveId})`)
    setActiveTab("drives")
  }

  const handleDownloadResume = (studentName: string) => {
    console.log(`[v0] Downloading resume for: ${studentName}`)
    // Simulate resume download
    alert(`Downloading resume for ${studentName}`)
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <CompanySidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="flex-1 p-6 ml-64">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Company Dashboard</h1>
            <p className="text-gray-600 mt-2">Manage your recruitment drives and applications</p>
          </div>

          {activeTab === "overview" && (
            <div className="space-y-6">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                  <Card key={index}>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium text-gray-600">{stat.title}</CardTitle>
                      <stat.icon className="h-4 w-4 text-cyan-600" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                      <p className="text-xs text-green-600 mt-1">{stat.change}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Recent Drives */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Recent Drives</CardTitle>
                    <CardDescription>Your latest recruitment drives</CardDescription>
                  </div>
                  <Button className="bg-cyan-600 hover:bg-cyan-700" onClick={handleCreateDrive}>
                    <Plus className="h-4 w-4 mr-2" />
                    Create Drive
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentDrives.map((drive) => (
                      <div key={drive.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900">{drive.title}</h3>
                          <p className="text-sm text-gray-600">
                            {drive.applications} applications • Deadline: {drive.deadline}
                          </p>
                        </div>
                        <div className="flex items-center gap-3">
                          <Badge variant={drive.status === "Active" ? "default" : "secondary"}>{drive.status}</Badge>
                          <Button variant="outline" size="sm" onClick={() => handleViewDrive(drive.id, drive.title)}>
                            <Eye className="h-4 w-4 mr-2" />
                            View
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Recent Applications */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Applications</CardTitle>
                  <CardDescription>Latest student applications across all drives</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentApplications.map((app) => (
                      <div key={app.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900">{app.student}</h3>
                          <p className="text-sm text-gray-600">
                            {app.position} • CGPA: {app.cgpa}
                          </p>
                        </div>
                        <div className="flex items-center gap-3">
                          <Badge
                            variant={
                              app.status === "Offer Extended"
                                ? "default"
                                : app.status === "Shortlisted"
                                  ? "secondary"
                                  : app.status === "Interview Scheduled"
                                    ? "outline"
                                    : "secondary"
                            }
                          >
                            {app.status}
                          </Badge>
                          <Button variant="outline" size="sm" onClick={() => handleDownloadResume(app.student)}>
                            <Download className="h-4 w-4 mr-2" />
                            Resume
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "drives" && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Manage Drives</CardTitle>
                  <CardDescription>Create and manage your recruitment drives</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Drive management functionality will be implemented here.</p>
                  <Button className="mt-4 bg-cyan-600 hover:bg-cyan-700" onClick={handleCreateDrive}>
                    <Plus className="h-4 w-4 mr-2" />
                    Create New Drive
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "applications" && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Applications</CardTitle>
                  <CardDescription>View and manage student applications</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Applications management functionality will be implemented here.</p>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "interviews" && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Interviews</CardTitle>
                  <CardDescription>Schedule and manage interviews</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Interview management functionality will be implemented here.</p>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "reports" && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Reports</CardTitle>
                  <CardDescription>Generate and view recruitment reports</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Reports functionality will be implemented here.</p>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "profile" && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Company Profile</CardTitle>
                  <CardDescription>Manage your company information</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Company profile management functionality will be implemented here.</p>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "settings" && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Settings</CardTitle>
                  <CardDescription>Configure your account settings</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Settings functionality will be implemented here.</p>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
