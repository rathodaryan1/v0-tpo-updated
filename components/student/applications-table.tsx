"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ResponsiveTable } from "@/components/ui/responsive-table"
import { Search, Filter, Download, Eye } from "lucide-react"

const applications = [
  {
    id: "1",
    company: "TechCorp Inc.",
    role: "Software Engineer",
    package: "₹12 LPA",
    lastDate: "2024-01-15",
    status: "Under Review",
    applied: true,
  },
  {
    id: "2",
    company: "DataSys Solutions",
    role: "Data Analyst",
    package: "₹8 LPA",
    lastDate: "2024-01-20",
    status: "Interview Scheduled",
    applied: true,
  },
  {
    id: "3",
    company: "WebFlow Technologies",
    role: "Frontend Developer",
    package: "₹10 LPA",
    lastDate: "2024-01-25",
    status: "Applied",
    applied: true,
  },
  {
    id: "4",
    company: "CloudTech Systems",
    role: "DevOps Engineer",
    package: "₹15 LPA",
    lastDate: "2024-01-30",
    status: "Open",
    applied: false,
  },
  {
    id: "5",
    company: "AI Innovations",
    role: "ML Engineer",
    package: "₹18 LPA",
    lastDate: "2024-02-05",
    status: "Open",
    applied: false,
  },
]

export function ApplicationsTable() {
  const [selectedApplications, setSelectedApplications] = useState<any[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredApplications = applications.filter((app) => {
    const matchesSearch =
      app.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.role.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || app.status.toLowerCase() === statusFilter.toLowerCase()
    return matchesSearch && matchesStatus
  })

  const getStatusBadge = (status: string, applied: boolean) => {
    if (applied) {
      switch (status) {
        case "Under Review":
          return <Badge variant="outline">Under Review</Badge>
        case "Interview Scheduled":
          return <Badge variant="default">Interview Scheduled</Badge>
        case "Applied":
          return <Badge variant="secondary">Applied</Badge>
        default:
          return <Badge variant="outline">{status}</Badge>
      }
    } else {
      return <Badge variant="outline">Open</Badge>
    }
  }

  const columns = [
    {
      key: 'company' as keyof typeof applications[0],
      label: 'Company',
      sortable: true,
    },
    {
      key: 'role' as keyof typeof applications[0],
      label: 'Role',
      sortable: true,
    },
    {
      key: 'package' as keyof typeof applications[0],
      label: 'Package',
      sortable: true,
    },
    {
      key: 'lastDate' as keyof typeof applications[0],
      label: 'Last Date',
      sortable: true,
    },
    {
      key: 'status' as keyof typeof applications[0],
      label: 'Status',
      render: (value: string, row: any) => getStatusBadge(value, row.applied),
    },
    {
      key: 'actions' as keyof typeof applications[0],
      label: 'Actions',
      render: (value: any, row: any) => (
        <div className="flex items-center gap-2">
          <Button size="sm" variant="outline">
            <Eye className="h-4 w-4 mr-1" />
            View
          </Button>
          {!row.applied && <Button size="sm">Apply</Button>}
        </div>
      ),
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">My Applications</h1>
          <p className="text-muted-foreground mt-1">Track your job applications and apply to new opportunities</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Job Applications</CardTitle>
          <CardDescription>Manage your applications and discover new opportunities</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Filters and Search */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search companies or roles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="open">Open</SelectItem>
                <SelectItem value="applied">Applied</SelectItem>
                <SelectItem value="under review">Under Review</SelectItem>
                <SelectItem value="interview scheduled">Interview Scheduled</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Bulk Actions */}
          {selectedApplications.length > 0 && (
            <div className="flex items-center gap-2 mb-4 p-3 bg-muted rounded-lg">
              <span className="text-sm font-medium">{selectedApplications.length} selected</span>
              <Button size="sm" variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          )}

          {/* Responsive Table */}
          <ResponsiveTable
            data={filteredApplications}
            columns={columns}
            onRowSelect={setSelectedApplications}
            selectable={true}
            className="border rounded-lg"
          />
        </CardContent>
      </Card>
    </div>
  )
}
