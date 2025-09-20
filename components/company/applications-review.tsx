"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Filter, Download, Eye, CheckCircle, XCircle, Clock } from "lucide-react"

export function ApplicationsReview() {
  const [selectedApplications, setSelectedApplications] = useState<number[]>([])
  const [filterStatus, setFilterStatus] = useState("all")
  const [filterDrive, setFilterDrive] = useState("all")

  const applications = [
    {
      id: 1,
      student: "Rahul Sharma",
      email: "rahul.sharma@college.edu",
      phone: "+91 9876543210",
      cgpa: "8.5",
      branch: "Computer Science",
      year: "4th Year",
      drive: "Software Engineer - Full Stack",
      appliedDate: "2024-01-08",
      status: "Under Review",
      resume: "rahul_resume.pdf",
      skills: ["React", "Node.js", "Python", "MongoDB"],
    },
    {
      id: 2,
      student: "Priya Patel",
      email: "priya.patel@college.edu",
      phone: "+91 9876543211",
      cgpa: "9.1",
      branch: "Information Technology",
      year: "4th Year",
      drive: "Data Analyst",
      appliedDate: "2024-01-07",
      status: "Shortlisted",
      resume: "priya_resume.pdf",
      skills: ["Python", "SQL", "Tableau", "R"],
    },
    {
      id: 3,
      student: "Amit Kumar",
      email: "amit.kumar@college.edu",
      phone: "+91 9876543212",
      cgpa: "8.8",
      branch: "Computer Science",
      year: "4th Year",
      drive: "Software Engineer - Full Stack",
      appliedDate: "2024-01-06",
      status: "Interview Scheduled",
      resume: "amit_resume.pdf",
      skills: ["Java", "Spring Boot", "React", "MySQL"],
    },
    {
      id: 4,
      student: "Sneha Reddy",
      email: "sneha.reddy@college.edu",
      phone: "+91 9876543213",
      cgpa: "9.3",
      branch: "Computer Science",
      year: "4th Year",
      drive: "Product Manager",
      appliedDate: "2024-01-05",
      status: "Offer Extended",
      resume: "sneha_resume.pdf",
      skills: ["Product Management", "Analytics", "SQL", "Figma"],
    },
    {
      id: 5,
      student: "Vikash Singh",
      email: "vikash.singh@college.edu",
      phone: "+91 9876543214",
      cgpa: "7.8",
      branch: "Electronics & Communication",
      year: "4th Year",
      drive: "Data Analyst",
      appliedDate: "2024-01-04",
      status: "Rejected",
      resume: "vikash_resume.pdf",
      skills: ["Python", "Excel", "PowerBI"],
    },
  ]

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedApplications(applications.map((app) => app.id))
    } else {
      setSelectedApplications([])
    }
  }

  const handleSelectApplication = (id: number, checked: boolean) => {
    if (checked) {
      setSelectedApplications([...selectedApplications, id])
    } else {
      setSelectedApplications(selectedApplications.filter((appId) => appId !== id))
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Under Review":
        return (
          <Badge variant="secondary">
            <Clock className="h-3 w-3 mr-1" />
            {status}
          </Badge>
        )
      case "Shortlisted":
        return (
          <Badge variant="default">
            <CheckCircle className="h-3 w-3 mr-1" />
            {status}
          </Badge>
        )
      case "Interview Scheduled":
        return (
          <Badge variant="outline">
            <Eye className="h-3 w-3 mr-1" />
            {status}
          </Badge>
        )
      case "Offer Extended":
        return (
          <Badge className="bg-green-600">
            <CheckCircle className="h-3 w-3 mr-1" />
            {status}
          </Badge>
        )
      case "Rejected":
        return (
          <Badge variant="destructive">
            <XCircle className="h-3 w-3 mr-1" />
            {status}
          </Badge>
        )
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const filteredApplications = applications.filter((app) => {
    if (filterStatus !== "all" && app.status !== filterStatus) return false
    if (filterDrive !== "all" && app.drive !== filterDrive) return false
    return true
  })

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Applications Review</h2>
        <p className="text-gray-600">Review and manage student applications</p>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Filters & Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex-1 min-w-64">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input placeholder="Search students..." className="pl-10" />
              </div>
            </div>

            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="Under Review">Under Review</SelectItem>
                <SelectItem value="Shortlisted">Shortlisted</SelectItem>
                <SelectItem value="Interview Scheduled">Interview Scheduled</SelectItem>
                <SelectItem value="Offer Extended">Offer Extended</SelectItem>
                <SelectItem value="Rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filterDrive} onValueChange={setFilterDrive}>
              <SelectTrigger className="w-64">
                <SelectValue placeholder="Filter by drive" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Drives</SelectItem>
                <SelectItem value="Software Engineer - Full Stack">Software Engineer - Full Stack</SelectItem>
                <SelectItem value="Data Analyst">Data Analyst</SelectItem>
                <SelectItem value="Product Manager">Product Manager</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              More Filters
            </Button>
          </div>

          {selectedApplications.length > 0 && (
            <div className="flex gap-3 mt-4 pt-4 border-t">
              <Button className="bg-green-600 hover:bg-green-700">
                <CheckCircle className="h-4 w-4 mr-2" />
                Shortlist Selected ({selectedApplications.length})
              </Button>
              <Button variant="outline">
                <Eye className="h-4 w-4 mr-2" />
                Schedule Interview
              </Button>
              <Button variant="outline">
                <XCircle className="h-4 w-4 mr-2" />
                Reject Selected
              </Button>
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Download Resumes
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Applications Table */}
      <Card>
        <CardHeader>
          <CardTitle>Applications ({filteredApplications.length})</CardTitle>
          <CardDescription>Review student applications and take actions</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">
                  <Checkbox
                    checked={selectedApplications.length === applications.length}
                    onCheckedChange={handleSelectAll}
                  />
                </TableHead>
                <TableHead>Student</TableHead>
                <TableHead>Drive</TableHead>
                <TableHead>CGPA</TableHead>
                <TableHead>Branch</TableHead>
                <TableHead>Applied Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredApplications.map((application) => (
                <TableRow key={application.id}>
                  <TableCell>
                    <Checkbox
                      checked={selectedApplications.includes(application.id)}
                      onCheckedChange={(checked) => handleSelectApplication(application.id, checked as boolean)}
                    />
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-semibold text-gray-900">{application.student}</div>
                      <div className="text-sm text-gray-600">{application.email}</div>
                      <div className="text-xs text-gray-500">{application.phone}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm font-medium">{application.drive}</div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="font-mono">
                      {application.cgpa}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">{application.branch}</div>
                    <div className="text-xs text-gray-500">{application.year}</div>
                  </TableCell>
                  <TableCell className="text-sm text-gray-600">{application.appliedDate}</TableCell>
                  <TableCell>{getStatusBadge(application.status)}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
