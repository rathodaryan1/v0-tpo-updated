"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { LayoutDashboard, Calendar, Users, FileText, BarChart3, Settings, Building2, LogOut } from "lucide-react"

interface CompanySidebarProps {
  activeTab: string
  setActiveTab: (tab: string) => void
}

export function CompanySidebar({ activeTab, setActiveTab }: CompanySidebarProps) {
  const [isOpen, setIsOpen] = useState(false)
  const menuItems = [
    { id: "overview", label: "Overview", icon: LayoutDashboard },
    { id: "drives", label: "Manage Drives", icon: Calendar },
    { id: "applications", label: "Applications", icon: Users },
    { id: "interviews", label: "Interviews", icon: FileText },
    { id: "reports", label: "Reports", icon: BarChart3 },
    { id: "profile", label: "Company Profile", icon: Building2 },
    { id: "settings", label: "Settings", icon: Settings },
  ]

  const handleLogout = () => {
    if (confirm("Are you sure you want to logout?")) {
      console.log("[v0] Company logging out")
      localStorage.removeItem("userRole")
      localStorage.removeItem("userEmail")
      localStorage.removeItem("companyToken")
      alert("Logged out successfully!")
      window.location.href = "/"
    }
  }

  return (
    <>
      <div className="hidden lg:flex w-64 bg-white border-r border-gray-200 flex-col min-h-screen">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-violet-600 rounded-lg flex items-center justify-center">
              <Building2 className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="font-bold text-gray-900">TechCorp Inc.</h2>
              <p className="text-sm text-gray-600">Company Portal</p>
            </div>
          </div>
        </div>

        <nav className="p-4 space-y-2 flex-1">
          {menuItems.map((item) => (
            <Button
              key={item.id}
              variant={activeTab === item.id ? "default" : "ghost"}
              className={cn(
                "w-full justify-start gap-3",
                activeTab === item.id
                  ? "bg-cyan-600 text-white hover:bg-cyan-700"
                  : "text-gray-700 hover:text-gray-900 hover:bg-gray-100",
              )}
              onClick={() => setActiveTab(item.id)}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Button>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-200 bg-white">
          <div className="mb-4 p-3 bg-gray-50 rounded-lg">
            <p className="text-sm font-medium text-gray-900">Company User</p>
            <p className="text-xs text-gray-600">HR Manager</p>
          </div>
          <Button
            variant="ghost"
            className="w-full justify-start gap-3 text-gray-700 hover:text-gray-900 hover:bg-gray-100"
            onClick={handleLogout}
          >
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>
      </div>

      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="lg:hidden fixed top-4 left-4 z-50"
          >
            <span className="inline-block w-5 h-[2px] bg-gray-700 relative">
              <span className="absolute top-[-6px] left-0 w-5 h-[2px] bg-gray-700" />
              <span className="absolute top-[6px] left-0 w-5 h-[2px] bg-gray-700" />
            </span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0">
          <div className="w-64 bg-white border-r border-gray-200 flex flex-col min-h-screen">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-violet-600 rounded-lg flex items-center justify-center">
                  <Building2 className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h2 className="font-bold text-gray-900">TechCorp Inc.</h2>
                  <p className="text-sm text-gray-600">Company Portal</p>
                </div>
              </div>
            </div>

            <nav className="p-4 space-y-2 flex-1">
              {menuItems.map((item) => (
                <Button
                  key={item.id}
                  variant={activeTab === item.id ? "default" : "ghost"}
                  className={cn(
                    "w-full justify-start gap-3",
                    activeTab === item.id
                      ? "bg-cyan-600 text-white hover:bg-cyan-700"
                      : "text-gray-700 hover:text-gray-900 hover:bg-gray-100",
                  )}
                  onClick={() => {
                    setActiveTab(item.id)
                    setIsOpen(false)
                  }}
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </Button>
              ))}
            </nav>

            <div className="p-4 border-t border-gray-200 bg-white">
              <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                <p className="text-sm font-medium text-gray-900">Company User</p>
                <p className="text-xs text-gray-600">HR Manager</p>
              </div>
              <Button
                variant="ghost"
                className="w-full justify-start gap-3 text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                onClick={handleLogout}
              >
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  )
}
