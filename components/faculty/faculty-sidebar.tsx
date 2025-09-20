"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { LayoutDashboard, Users, UserCheck, FileText, Download, LogOut, GraduationCap } from "lucide-react"

interface FacultySidebarProps {
  activeSection: string
  onSectionChange: (section: string) => void
}

export function FacultySidebar({ activeSection, onSectionChange }: FacultySidebarProps) {
  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "students", label: "Student Profiles", icon: Users },
    { id: "approvals", label: "Approval Requests", icon: UserCheck },
    { id: "applications", label: "Student Applications", icon: FileText },
    { id: "export", label: "Export Data", icon: Download },
  ]

  const handleLogout = () => {
    if (confirm("Are you sure you want to logout?")) {
      console.log("[v0] Faculty logging out")
      localStorage.removeItem("userRole")
      localStorage.removeItem("userEmail")
      localStorage.removeItem("facultyToken")
      alert("Logged out successfully!")
      window.location.href = "/"
    }
  }

  return (
    <div className="w-64 bg-sidebar border-r border-sidebar-border flex flex-col min-h-screen">
      <div className="p-6 flex-1">
        <div className="flex items-center gap-2 mb-8">
          <GraduationCap className="h-8 w-8 text-primary" />
          <div>
            <h2 className="font-bold text-sidebar-foreground">TPO Portal</h2>
            <p className="text-xs text-muted-foreground">Faculty Panel</p>
          </div>
        </div>

        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon
            return (
              <Button
                key={item.id}
                variant={activeSection === item.id ? "default" : "ghost"}
                className={cn(
                  "w-full justify-start gap-2",
                  activeSection === item.id
                    ? "bg-sidebar-primary text-sidebar-primary-foreground"
                    : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                )}
                onClick={() => onSectionChange(item.id)}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Button>
            )
          })}
        </nav>
      </div>

      <div className="p-6 border-t border-sidebar-border bg-sidebar">
        <div className="mb-4 p-3 bg-muted rounded-lg">
          <p className="text-sm font-medium">Dr. Jane Smith</p>
          <p className="text-xs text-muted-foreground">Computer Science Dept.</p>
        </div>
        <Button
          variant="ghost"
          className="w-full justify-start gap-2 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
          onClick={handleLogout}
        >
          <LogOut className="h-4 w-4" />
          Logout
        </Button>
      </div>
    </div>
  )
}
