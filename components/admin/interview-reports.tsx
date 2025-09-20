"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Upload, Download, Users, CheckCircle, XCircle, Clock } from "lucide-react"

const interviewData = [
  {
    id: 1,
    company: "TechCorp Inc.",
    role: "Software Engineer",
    date: "2024-01-15",
    totalStudents: 45,
    attended: 42,
    selected: 12,
    status: "Completed",
  },
  {
    id: 2,
    company: "DataSys Solutions",
    role: "Data Analyst",
    date: "2024-01-18",
    totalStudents: 32,
    attended: 30,
    selected: 8,
    status: "Completed",
  },
  {
    id: 3,
    company: "WebFlow Technologies",
    role: "Frontend Developer",
    date: "2024-01-20",
    totalStudents: 28,
    attended: 0,
    selected: 0,
    status: "Upcoming",
  },
]

const studentList = [
  {
    id: 1,
    name: "Rahul Kumar",
    rollNo: "CS2021001",
    branch: "CSE",
    cgpa: "8.5",
    attended: true,
    selected: true,
  },
  {
    id: 2,
    name: "Priya Sharma",
    rollNo: "CS2021002",
    branch: "CSE",
    cgpa: "9.1",
    attended: true,
    selected: false,
  },
  {
    id: 3,
    name: "Amit Singh",
    rollNo: "CS2021003",
    branch: "CSE",
    cgpa: "7.8",
    attended: false,
    selected: false,
  },
]

export function InterviewReports() {
  const [activeTab, setActiveTab] = useState("reports")
  const [selectedStudents, setSelectedStudents] = useState<number[]>([])
  const [searchTerm, setSearchTerm] = useState("")

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedStudents(studentList.map((student) => student.id))
    } else {
      setSelectedStudents([])
    }
  }

  const handleSelectStudent = (id: number, checked: boolean) => {
    if (checked) {
      setSelectedStudents([...selectedStudents, id])
    } else {
      setSelectedStudents(selectedStudents.filter((studentId) => studentId !== id))
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Completed":
        return (
          <Badge variant="default" className="bg-green-100 text-green-800 border-green-200">
            Completed
          </Badge>
        )
      case "Upcoming":
        return <Badge variant="outline">Upcoming</Badge>
      case "Ongoing":
        return <Badge variant="default">Ongoing</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Interview Reports</h1>
          <p className="text-muted-foreground mt-1">Manage interview attendance and results</p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="reports">Interview Reports</TabsTrigger>
          <TabsTrigger value="attendance">Mark Attendance</TabsTrigger>
          <TabsTrigger value="results">Upload Results</TabsTrigger>
        </TabsList>

        <TabsContent value="reports" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Interview Summary</CardTitle>
              <CardDescription>Overview of all interview drives and their outcomes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border rounded-lg">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Company</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Total Students</TableHead>
                      <TableHead>Attended</TableHead>
                      <TableHead>Selected</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {interviewData.map((interview) => (
                      <TableRow key={interview.id}>
                        <TableCell className="font-medium">{interview.company}</TableCell>
                        <TableCell>{interview.role}</TableCell>
                        <TableCell>{interview.date}</TableCell>
                        <TableCell>{interview.totalStudents}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Users className="h-3 w-3" />
                            {interview.attended}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                            {interview.selected}
                          </Badge>
                        </TableCell>
                        <TableCell>{getStatusBadge(interview.status)}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Button size="sm" variant="outline">
                              <Download className="h-4 w-4 mr-1" />
                              Export
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

        <TabsContent value="attendance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Mark Attendance</CardTitle>
              <CardDescription>Track student attendance for interviews</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 border rounded-lg">
                    <p className="text-sm font-medium">Company</p>
                    <p className="text-lg">WebFlow Technologies</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <p className="text-sm font-medium">Role</p>
                    <p className="text-lg">Frontend Developer</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <p className="text-sm font-medium">Date</p>
                    <p className="text-lg">Jan 20, 2024</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search students..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {selectedStudents.length} of {studentList.length} marked present
                  </div>
                </div>

                <div className="border rounded-lg">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-12">
                          <Checkbox
                            checked={selectedStudents.length === studentList.length}
                            onCheckedChange={handleSelectAll}
                          />
                        </TableHead>
                        <TableHead>Student</TableHead>
                        <TableHead>Roll Number</TableHead>
                        <TableHead>Branch</TableHead>
                        <TableHead>CGPA</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {studentList.map((student) => (
                        <TableRow key={student.id}>
                          <TableCell>
                            <Checkbox
                              checked={selectedStudents.includes(student.id)}
                              onCheckedChange={(checked) => handleSelectStudent(student.id, checked as boolean)}
                            />
                          </TableCell>
                          <TableCell className="font-medium">{student.name}</TableCell>
                          <TableCell className="font-mono">{student.rollNo}</TableCell>
                          <TableCell>{student.branch}</TableCell>
                          <TableCell>
                            <Badge variant="outline">{student.cgpa}</Badge>
                          </TableCell>
                          <TableCell>
                            {selectedStudents.includes(student.id) ? (
                              <Badge variant="default" className="bg-green-100 text-green-800 border-green-200">
                                Present
                              </Badge>
                            ) : (
                              <Badge variant="outline">Absent</Badge>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                <div className="flex justify-end">
                  <Button>
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Save Attendance
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="results" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Upload Interview Results</CardTitle>
              <CardDescription>Upload selected student list and offer letters</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Selected Students List</h4>
                    <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                      <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground mb-2">Upload Excel file with selected students</p>
                      <Button variant="outline" size="sm">
                        Choose File
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Offer Letters</h4>
                    <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                      <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground mb-2">Upload offer letters (ZIP file)</p>
                      <Button variant="outline" size="sm">
                        Choose File
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium">Manual Selection</h4>
                <div className="border rounded-lg">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-12">
                          <Checkbox />
                        </TableHead>
                        <TableHead>Student</TableHead>
                        <TableHead>Roll Number</TableHead>
                        <TableHead>Branch</TableHead>
                        <TableHead>CGPA</TableHead>
                        <TableHead>Attended</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {studentList.map((student) => (
                        <TableRow key={student.id}>
                          <TableCell>
                            <Checkbox />
                          </TableCell>
                          <TableCell className="font-medium">{student.name}</TableCell>
                          <TableCell className="font-mono">{student.rollNo}</TableCell>
                          <TableCell>{student.branch}</TableCell>
                          <TableCell>
                            <Badge variant="outline">{student.cgpa}</Badge>
                          </TableCell>
                          <TableCell>
                            {student.attended ? (
                              <CheckCircle className="h-4 w-4 text-green-600" />
                            ) : (
                              <XCircle className="h-4 w-4 text-red-600" />
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t">
                <Button variant="outline">
                  <Clock className="h-4 w-4 mr-2" />
                  Save Draft
                </Button>
                <Button>
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Finalize Results
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
