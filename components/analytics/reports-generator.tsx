"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Download, FileText, Calendar, Users, Building2, BarChart3 } from "lucide-react"

export function ReportsGenerator() {
  const [selectedReports, setSelectedReports] = useState<string[]>([])

  const reportTypes = [
    {
      id: "placement-summary",
      title: "Placement Summary Report",
      description: "Overall placement statistics and trends",
      icon: BarChart3,
      estimatedTime: "2-3 minutes",
    },
    {
      id: "student-wise",
      title: "Student-wise Report",
      description: "Individual student placement details",
      icon: Users,
      estimatedTime: "3-5 minutes",
    },
    {
      id: "company-wise",
      title: "Company-wise Report",
      description: "Company recruitment statistics",
      icon: Building2,
      estimatedTime: "2-3 minutes",
    },
    {
      id: "department-wise",
      title: "Department-wise Report",
      description: "Department performance analysis",
      icon: FileText,
      estimatedTime: "2-3 minutes",
    },
    {
      id: "salary-analysis",
      title: "Salary Analysis Report",
      description: "Package distribution and trends",
      icon: BarChart3,
      estimatedTime: "1-2 minutes",
    },
    {
      id: "interview-report",
      title: "Interview Performance Report",
      description: "Interview statistics and outcomes",
      icon: Calendar,
      estimatedTime: "2-3 minutes",
    },
  ]

  const recentReports = [
    {
      id: 1,
      name: "Placement Summary - Q4 2024",
      type: "placement-summary",
      generatedDate: "2024-01-10",
      size: "2.3 MB",
      status: "Ready",
    },
    {
      id: 2,
      name: "Department Performance - Dec 2024",
      type: "department-wise",
      generatedDate: "2024-01-08",
      size: "1.8 MB",
      status: "Ready",
    },
    {
      id: 3,
      name: "Company Recruitment Analysis",
      type: "company-wise",
      generatedDate: "2024-01-05",
      size: "3.1 MB",
      status: "Ready",
    },
    {
      id: 4,
      name: "Student Applications Report",
      type: "student-wise",
      generatedDate: "2024-01-03",
      size: "4.2 MB",
      status: "Generating",
    },
  ]

  const handleReportSelection = (reportId: string, checked: boolean) => {
    if (checked) {
      setSelectedReports([...selectedReports, reportId])
    } else {
      setSelectedReports(selectedReports.filter((id) => id !== reportId))
    }
  }

  const getStatusBadge = (status: string) => {
    return <Badge variant={status === "Ready" ? "default" : "secondary"}>{status}</Badge>
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Reports Generator</h2>
        <p className="text-gray-600">Generate comprehensive placement reports</p>
      </div>

      {/* Report Generator */}
      <Card>
        <CardHeader>
          <CardTitle>Generate New Report</CardTitle>
          <CardDescription>Select report types and configure parameters</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Report Types Selection */}
          <div>
            <Label className="text-base font-semibold">Select Report Types</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
              {reportTypes.map((report) => (
                <div key={report.id} className="flex items-start space-x-3 p-4 border rounded-lg">
                  <Checkbox
                    id={report.id}
                    checked={selectedReports.includes(report.id)}
                    onCheckedChange={(checked) => handleReportSelection(report.id, checked as boolean)}
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <report.icon className="h-4 w-4 text-cyan-600" />
                      <Label htmlFor={report.id} className="font-medium cursor-pointer">
                        {report.title}
                      </Label>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{report.description}</p>
                    <Badge variant="outline" className="text-xs">
                      {report.estimatedTime}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Report Configuration */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="academic-year">Academic Year</Label>
              <Select defaultValue="2024">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2024">2023-2024</SelectItem>
                  <SelectItem value="2023">2022-2023</SelectItem>
                  <SelectItem value="2022">2021-2022</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="date-from">From Date</Label>
              <Input id="date-from" type="date" defaultValue="2023-08-01" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="date-to">To Date</Label>
              <Input id="date-to" type="date" defaultValue="2024-01-15" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="department">Department Filter</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="All Departments" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  <SelectItem value="cse">Computer Science</SelectItem>
                  <SelectItem value="it">Information Technology</SelectItem>
                  <SelectItem value="ece">Electronics & Communication</SelectItem>
                  <SelectItem value="mech">Mechanical</SelectItem>
                  <SelectItem value="civil">Civil</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="format">Report Format</Label>
              <Select defaultValue="pdf">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pdf">PDF</SelectItem>
                  <SelectItem value="excel">Excel</SelectItem>
                  <SelectItem value="csv">CSV</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button className="bg-cyan-600 hover:bg-cyan-700" disabled={selectedReports.length === 0}>
              <FileText className="h-4 w-4 mr-2" />
              Generate Reports ({selectedReports.length})
            </Button>
            <Button variant="outline">
              <Calendar className="h-4 w-4 mr-2" />
              Schedule Report
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Recent Reports */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Reports</CardTitle>
          <CardDescription>Previously generated reports</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentReports.map((report) => (
              <div key={report.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-violet-600 rounded-lg flex items-center justify-center">
                    <FileText className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{report.name}</h3>
                    <p className="text-sm text-gray-600">
                      Generated on {report.generatedDate} • {report.size}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {getStatusBadge(report.status)}
                  {report.status === "Ready" && (
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
