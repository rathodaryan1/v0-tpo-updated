"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Search, Filter, Eye, Edit, Calendar, Building2, Users, Upload } from "lucide-react"

const drives = [
  {
    id: 1,
    company: "TechCorp Inc.",
    role: "Software Engineer",
    package: "₹12 LPA",
    eligibility: "CGPA ≥ 7.5",
    lastDate: "2024-01-20",
    status: "Upcoming",
    applicants: 45,
    branch: "CSE, ECE",
  },
  {
    id: 2,
    company: "DataSys Solutions",
    role: "Data Analyst",
    package: "₹8 LPA",
    eligibility: "CGPA ≥ 7.0",
    lastDate: "2024-01-25",
    status: "Ongoing",
    applicants: 32,
    branch: "CSE, IT",
  },
  {
    id: 3,
    company: "WebFlow Technologies",
    role: "Frontend Developer",
    package: "₹10 LPA",
    eligibility: "CGPA ≥ 7.5",
    lastDate: "2024-01-15",
    status: "Completed",
    applicants: 28,
    branch: "CSE",
  },
]

export function DriveManagement() {
  const [activeTab, setActiveTab] = useState("list")
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredDrives = drives.filter((drive) => {
    const matchesSearch =
      drive.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      drive.role.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || drive.status.toLowerCase() === statusFilter.toLowerCase()
    return matchesSearch && matchesStatus
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Upcoming":
        return <Badge variant="outline">Upcoming</Badge>
      case "Ongoing":
        return <Badge variant="default">Ongoing</Badge>
      case "Completed":
        return (
          <Badge variant="secondary" className="bg-green-100 text-green-800 border-green-200">
            Completed
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Drive Management</h1>
          <p className="text-muted-foreground mt-1">Create and manage placement drives</p>
        </div>
        <Button onClick={() => setActiveTab("create")}>
          <Plus className="h-4 w-4 mr-2" />
          Create New Drive
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="list">Drive List</TabsTrigger>
          <TabsTrigger value="create">Create Drive</TabsTrigger>
        </TabsList>

        <TabsContent value="list" className="space-y-6">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <Building2 className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Total Drives</p>
                    <p className="text-2xl font-bold">{drives.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div>
                  <p className="text-sm font-medium">Ongoing</p>
                  <p className="text-2xl font-bold text-blue-600">
                    {drives.filter((d) => d.status === "Ongoing").length}
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div>
                  <p className="text-sm font-medium">Upcoming</p>
                  <p className="text-2xl font-bold text-orange-600">
                    {drives.filter((d) => d.status === "Upcoming").length}
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div>
                  <p className="text-sm font-medium">Total Applicants</p>
                  <p className="text-2xl font-bold">{drives.reduce((sum, drive) => sum + drive.applicants, 0)}</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Placement Drives</CardTitle>
              <CardDescription>Manage all placement drives and their details</CardDescription>
            </CardHeader>
            <CardContent>
              {/* Filters */}
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search drives..."
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
                    <SelectItem value="upcoming">Upcoming</SelectItem>
                    <SelectItem value="ongoing">Ongoing</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Drives Table */}
              <div className="border rounded-lg">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Company</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Package</TableHead>
                      <TableHead>Eligibility</TableHead>
                      <TableHead>Last Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Applicants</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredDrives.map((drive) => (
                      <TableRow key={drive.id}>
                        <TableCell>
                          <div className="space-y-1">
                            <p className="font-medium">{drive.company}</p>
                            <p className="text-sm text-muted-foreground">{drive.branch}</p>
                          </div>
                        </TableCell>
                        <TableCell>{drive.role}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{drive.package}</Badge>
                        </TableCell>
                        <TableCell className="text-sm">{drive.eligibility}</TableCell>
                        <TableCell className="text-sm text-muted-foreground">{drive.lastDate}</TableCell>
                        <TableCell>{getStatusBadge(drive.status)}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Users className="h-3 w-3" />
                            {drive.applicants}
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Button size="sm" variant="outline">
                              <Eye className="h-4 w-4 mr-1" />
                              View
                            </Button>
                            <Button size="sm" variant="outline">
                              <Edit className="h-4 w-4 mr-1" />
                              Edit
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="create" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Create New Drive</CardTitle>
              <CardDescription>Add a new placement drive for companies</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="company">Company</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select company" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="techcorp">TechCorp Inc.</SelectItem>
                        <SelectItem value="datasys">DataSys Solutions</SelectItem>
                        <SelectItem value="webflow">WebFlow Technologies</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="role">Job Role</Label>
                    <Input id="role" placeholder="e.g., Software Engineer" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="package">Package (LPA)</Label>
                    <Input id="package" placeholder="e.g., 12" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="eligibility">Eligibility Criteria</Label>
                    <Input id="eligibility" placeholder="e.g., CGPA ≥ 7.5" />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="branches">Eligible Branches</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select branches" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cse">Computer Science Engineering</SelectItem>
                        <SelectItem value="ece">Electronics & Communication</SelectItem>
                        <SelectItem value="me">Mechanical Engineering</SelectItem>
                        <SelectItem value="ce">Civil Engineering</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastDate">Application Last Date</Label>
                    <Input id="lastDate" type="date" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="interviewDate">Interview Date</Label>
                    <Input id="interviewDate" type="datetime-local" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Interview Location</Label>
                    <Input id="location" placeholder="e.g., Seminar Hall 1" />
                  </div>
                </div>
              </div>

              <div className="mt-6 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="process">Selection Process</Label>
                  <Textarea
                    id="process"
                    placeholder="Describe the selection process (e.g., Online Test, Group Discussion, Technical Interview, HR Interview)"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Job Description</Label>
                  <Textarea id="description" placeholder="Detailed job description and requirements" />
                </div>
                <div className="space-y-2">
                  <Label>Company Brochure</Label>
                  <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                    <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground mb-2">Upload company brochure (PDF)</p>
                    <Button variant="outline" size="sm">
                      Choose File
                    </Button>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-6 pt-6 border-t">
                <Button variant="outline" onClick={() => setActiveTab("list")}>
                  Cancel
                </Button>
                <Button>
                  <Calendar className="h-4 w-4 mr-2" />
                  Create Drive
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
