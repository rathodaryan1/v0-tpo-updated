"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  LayoutDashboard,
  Users,
  Building2,
  Briefcase,
  FileText,
  BarChart3,
  Settings,
  LogOut,
  GraduationCap,
} from "lucide-react"

interface AdminSidebarProps {
  activeSection: string
  onSectionChange: (section: string) => void
}

export function AdminSidebar({ activeSection, onSectionChange }: AdminSidebarProps) {
  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "faculty", label: "Faculty Approvals", icon: Users },
    { id: "companies", label: "Company Approvals", icon: Building2 },
    { id: "drives", label: "Drive Management", icon: Briefcase },
    { id: "interviews", label: "Interview Reports", icon: FileText },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
    { id: "settings", label: "Settings", icon: Settings },
  ]

  const handleLogout = () => {
    if (confirm("Are you sure you want to logout?")) {
      console.log("[v0] Admin logging out")
      // Clear any stored user data
      localStorage.removeItem("userRole")
      localStorage.removeItem("userEmail")
      localStorage.removeItem("adminToken")
      // Show logout message
      alert("Logged out successfully!")
      // Redirect to home page
      window.location.href = "/"
    }
  }

  return (
    <div className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col min-h-screen relative z-10">
      <div className="p-6 flex-1">
        <div className="flex items-center gap-2 mb-8">
          <GraduationCap className="h-8 w-8 text-cyan-400" />
          <div>
            <h2 className="font-bold text-white">TPO Portal</h2>
            <p className="text-xs text-slate-400">Admin Panel</p>
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
                    ? "bg-cyan-600 text-white hover:bg-cyan-700"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white",
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

      <div className="p-6 border-t border-slate-800 bg-slate-900">
        <div className="mb-4 p-3 bg-slate-800 rounded-lg">
          <p className="text-sm font-medium text-white">Admin User</p>
          <p className="text-xs text-slate-400">TPO Administrator</p>
        </div>
        <Button
          variant="ghost"
          className="w-full justify-start gap-2 text-slate-300 hover:bg-slate-800 hover:text-white"
          onClick={handleLogout}
        >
          <LogOut className="h-4 w-4" />
          Logout
        </Button>
      </div>
    </div>
  )
}
