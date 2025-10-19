"use client"

import { useState } from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { FacultyApprovals } from "@/components/admin/faculty-approvals"
import { CompanyApprovals } from "@/components/admin/company-approvals"
import { DriveManagement } from "@/components/admin/drive-management"
import { InterviewReports } from "@/components/admin/interview-reports"
import { AdminAnalytics } from "@/components/admin/admin-analytics"
import { AdminSettings } from "@/components/admin/admin-settings"
import {
  Users,
  Building2,
  Briefcase,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertTriangle,
  Award,
} from "lucide-react"

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
      <AdminSidebar
        activeSection={activeSection}
        onSectionChange={setActiveSection}
      />
      <main className="flex-1 p-6 lg:p-8 bg-slate-50 overflow-auto">
        <div className="max-w-7xl mx-auto">{renderContent()}</div>
      </main>
    </div>
  )
}

function DashboardContent({
  onSectionChange,
}: {
  onSectionChange: (section: string) => void
}) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Admin Dashboard
          </h1>
          <p className="text-muted-foreground mt-1">
            Training & Placement Office - Administrative Panel
          </p>
        </div>
        <Badge variant="outline" className="px-3 py-1">
          TPO Admin
        </Badge>
      </div>

      {/* Key Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        <StatCard title="Total Students" value="—" icon={Users} note="Across all departments" />
        <StatCard title="Active Drives" value="—" icon={Briefcase} note="Currently ongoing" />
        <StatCard title="Selected Students" value="—" icon={Award} note="This academic year" />
        <StatCard title="Offers Generated" value="—" icon={TrendingUp} note="Compared to last year" />
      </div>

      {/* Pending Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <EmptyCard
          title="Pending Faculty Approvals"
          description="No faculty pending approval"
          icon={Clock}
          onViewAll={() => onSectionChange("faculty")}
        />
        <EmptyCard
          title="Pending Company Approvals"
          description="No company pending approval"
          icon={Building2}
          onViewAll={() => onSectionChange("companies")}
        />
      </div>

      {/* Recent Activity Feed */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>
            Latest activities across the TPO system
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground text-center py-8">
            No recent activity yet.
          </p>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <QuickActions onSectionChange={onSectionChange} />
        <SystemHealth />
        <UpcomingEvents />
      </div>
    </div>
  )
}

/* Helper Components */

function StatCard({ title, value, icon: Icon, note }: any) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{note}</p>
      </CardContent>
    </Card>
  )
}

function EmptyCard({ title, description, icon: Icon, onViewAll }: any) {
  return (
    <Card className="border-l-4 border-l-slate-300">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Icon className="h-5 w-5" />
          {title}
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Button
          variant="outline"
          className="w-full mt-2"
          onClick={onViewAll}
        >
          View All
        </Button>
      </CardContent>
    </Card>
  )
}

function QuickActions({ onSectionChange }: any) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <Button
          className="w-full justify-start bg-transparent"
          variant="outline"
          onClick={() => onSectionChange("drives")}
        >
          <Briefcase className="h-4 w-4 mr-2" />
          Create New Drive
        </Button>
        <Button
          className="w-full justify-start bg-transparent"
          variant="outline"
        >
          <Users className="h-4 w-4 mr-2" />
          Send Notifications
        </Button>
        <Button
          className="w-full justify-start bg-transparent"
          variant="outline"
          onClick={() => onSectionChange("analytics")}
        >
          <TrendingUp className="h-4 w-4 mr-2" />
          Generate Reports
        </Button>
      </CardContent>
    </Card>
  )
}

function SystemHealth() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">System Health</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <HealthItem label="Database Status" status="Healthy" color="green" />
        <HealthItem label="Email Service" status="Active" color="green" />
        <HealthItem label="File Storage" status="85% Used" />
      </CardContent>
    </Card>
  )
}

function HealthItem({ label, status, color }: any) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm">{label}</span>
      <Badge
        variant="outline"
        className={color ? `bg-${color}-100 text-${color}-800 border-${color}-200` : ""}
      >
        {status}
      </Badge>
    </div>
  )
}

function UpcomingEvents() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Upcoming Events</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground text-center py-6">
          No upcoming events.
        </p>
      </CardContent>
    </Card>
  )
}
