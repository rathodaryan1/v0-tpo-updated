"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Search, CheckCircle, XCircle, Eye, Mail, Phone } from "lucide-react"

const facultyRequests = [
  {
    id: 1,
    name: "Dr. Rajesh Kumar",
    email: "rajesh.kumar@college.edu",
    phone: "+91 9876543210",
    employeeId: "FAC001",
    department: "Mechanical Engineering",
    submittedAt: "2024-01-11",
    status: "Pending",
    experience: "15 years",
    qualification: "Ph.D. in Mechanical Engineering",
  },
  {
    id: 2,
    name: "Prof. Anita Sharma",
    email: "anita.sharma@college.edu",
    phone: "+91 9876543211",
    employeeId: "FAC002",
    department: "Electronics & Communication",
    submittedAt: "2024-01-10",
    status: "Pending",
    experience: "12 years",
    qualification: "M.Tech in ECE, Ph.D. pursuing",
  },
  {
    id: 3,
    name: "Dr. Suresh Patel",
    email: "suresh.patel@college.edu",
    phone: "+91 9876543212",
    employeeId: "FAC003",
    department: "Civil Engineering",
    submittedAt: "2024-01-08",
    status: "Pending",
    experience: "18 years",
    qualification: "Ph.D. in Civil Engineering",
  },
]

export function FacultyApprovals() {
  const [selectedRequests, setSelectedRequests] = useState<number[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedRequest, setSelectedRequest] = useState<number | null>(null)
  const [feedback, setFeedback] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const filteredRequests = facultyRequests.filter(
    (request) =>
      request.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedRequests(filteredRequests.map((request) => request.id))
    } else {
      setSelectedRequests([])
    }
  }

  const handleSelectRequest = (id: number, checked: boolean) => {
    if (checked) {
      setSelectedRequests([...selectedRequests, id])
    } else {
      setSelectedRequests(selectedRequests.filter((requestId) => requestId !== id))
    }
  }

  const handleApprove = async (requestId: number) => {
    try {
      setIsSubmitting(true)
      // In real data, we would have profileId; here we map demo id to placeholder
      const profileId = crypto.randomUUID()
      const res = await fetch('/api/admin/approvals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ profileId, approve: true }),
      })
      if (!res.ok) {
        const data = await res.json()
        alert(data.error || 'Failed to approve')
        return
      }
      alert('Approved successfully')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleReject = async (requestId: number) => {
    try {
      setIsSubmitting(true)
      const profileId = crypto.randomUUID()
      const res = await fetch('/api/admin/approvals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ profileId, approve: false, feedback }),
      })
      if (!res.ok) {
        const data = await res.json()
        alert(data.error || 'Failed to reject')
        return
      }
      alert('Rejected successfully')
    } finally {
      setIsSubmitting(false)
    }
  }

  const selectedRequestData = facultyRequests.find((r) => r.id === selectedRequest)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Faculty Approvals</h1>
          <p className="text-muted-foreground mt-1">Review and approve new faculty registrations</p>
        </div>
        <Badge variant="outline" className="px-3 py-1">
          {facultyRequests.length} Pending
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Requests Table */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Faculty Registration Requests</CardTitle>
              <CardDescription>New faculty members awaiting approval</CardDescription>
            </CardHeader>
            <CardContent>
              {/* Search */}
              <div className="relative mb-6">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search faculty requests..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Bulk Actions */}
              {selectedRequests.length > 0 && (
                <div className="flex items-center gap-2 mb-4 p-3 bg-muted rounded-lg">
                  <span className="text-sm font-medium">{selectedRequests.length} selected</span>
                  <Button size="sm" variant="default">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Bulk Approve
                  </Button>
                  <Button size="sm" variant="outline">
                    <XCircle className="h-4 w-4 mr-2" />
                    Bulk Reject
                  </Button>
                </div>
              )}

              {/* Requests Table */}
              <div className="border rounded-lg">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-12">
                        <Checkbox
                          checked={selectedRequests.length === filteredRequests.length}
                          onCheckedChange={handleSelectAll}
                        />
                      </TableHead>
                      <TableHead>Faculty</TableHead>
                      <TableHead>Department</TableHead>
                      <TableHead>Employee ID</TableHead>
                      <TableHead>Submitted</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredRequests.map((request) => (
                      <TableRow key={request.id} className={selectedRequest === request.id ? "bg-muted/50" : ""}>
                        <TableCell>
                          <Checkbox
                            checked={selectedRequests.includes(request.id)}
                            onCheckedChange={(checked) => handleSelectRequest(request.id, checked as boolean)}
                          />
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <p className="font-medium">{request.name}</p>
                            <p className="text-sm text-muted-foreground">{request.email}</p>
                          </div>
                        </TableCell>
                        <TableCell>{request.department}</TableCell>
                        <TableCell className="font-mono">{request.employeeId}</TableCell>
                        <TableCell className="text-sm text-muted-foreground">{request.submittedAt}</TableCell>
                        <TableCell className="text-right">
                          <Button size="sm" variant="outline" onClick={() => setSelectedRequest(request.id)}>
                            <Eye className="h-4 w-4 mr-1" />
                            Review
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Request Details */}
        <div className="lg:col-span-1">
          {selectedRequestData ? (
            <Card>
              <CardHeader>
                <CardTitle>Faculty Details</CardTitle>
                <CardDescription>Review faculty information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div>
                    <Label className="text-sm font-medium">Name</Label>
                    <p className="text-sm">{selectedRequestData.name}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Department</Label>
                    <p className="text-sm">{selectedRequestData.department}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Employee ID</Label>
                    <p className="text-sm font-mono">{selectedRequestData.employeeId}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Contact</Label>
                    <div className="space-y-1">
                      <p className="text-sm flex items-center gap-2">
                        <Mail className="h-3 w-3" />
                        {selectedRequestData.email}
                      </p>
                      <p className="text-sm flex items-center gap-2">
                        <Phone className="h-3 w-3" />
                        {selectedRequestData.phone}
                      </p>
                    </div>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Experience</Label>
                    <p className="text-sm">{selectedRequestData.experience}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Qualification</Label>
                    <p className="text-sm">{selectedRequestData.qualification}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="feedback">Feedback (Optional)</Label>
                  <Textarea
                    id="feedback"
                    placeholder="Add any feedback..."
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                  />
                </div>

                <div className="flex gap-2 pt-4 border-t">
                  <Button disabled={isSubmitting} onClick={() => handleApprove(selectedRequestData.id)} className="flex-1">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Approve
                  </Button>
                  <Button disabled={isSubmitting} variant="destructive" onClick={() => handleReject(selectedRequestData.id)} className="flex-1">
                    <XCircle className="h-4 w-4 mr-2" />
                    Reject
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Eye className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">Select a Request</h3>
                <p className="text-muted-foreground text-center text-sm">
                  Choose a faculty request to review details and make approval decisions.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
