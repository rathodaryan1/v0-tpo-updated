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
import { Search, CheckCircle, XCircle, Eye, Mail, Phone, Building2, Globe } from "lucide-react"

const companyRequests = [
  {
    id: 1,
    name: "TechVision Solutions",
    industry: "Information Technology",
    contactPerson: "Sarah Johnson",
    email: "hr@techvision.com",
    phone: "+91 9876543210",
    website: "www.techvision.com",
    submittedAt: "2024-01-12",
    status: "Pending",
    description: "Leading software development company specializing in web and mobile applications.",
  },
  {
    id: 2,
    name: "Global Finance Corp",
    industry: "Finance & Banking",
    contactPerson: "Michael Chen",
    email: "recruitment@globalfinance.com",
    phone: "+91 9876543211",
    website: "www.globalfinance.com",
    submittedAt: "2024-01-11",
    status: "Pending",
    description: "International financial services company with focus on digital banking solutions.",
  },
  {
    id: 3,
    name: "InnovateTech Systems",
    industry: "Software Development",
    contactPerson: "Priya Sharma",
    email: "careers@innovatetech.com",
    phone: "+91 9876543212",
    website: "www.innovatetech.com",
    submittedAt: "2024-01-09",
    status: "Pending",
    description: "Innovative technology company focused on AI and machine learning solutions.",
  },
]

export function CompanyApprovals() {
  const [selectedRequests, setSelectedRequests] = useState<number[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedRequest, setSelectedRequest] = useState<number | null>(null)
  const [feedback, setFeedback] = useState("")

  const filteredRequests = companyRequests.filter(
    (request) =>
      request.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.industry.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.contactPerson.toLowerCase().includes(searchTerm.toLowerCase()),
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

  const handleApprove = (requestId: number) => {
    console.log(`Approved company request ${requestId}`)
  }

  const handleReject = (requestId: number) => {
    console.log(`Rejected company request ${requestId} with feedback: ${feedback}`)
  }

  const selectedRequestData = companyRequests.find((r) => r.id === selectedRequest)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Company Approvals</h1>
          <p className="text-muted-foreground mt-1">Review and approve new company registrations</p>
        </div>
        <Badge variant="outline" className="px-3 py-1">
          {companyRequests.length} Pending
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Requests Table */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Company Registration Requests</CardTitle>
              <CardDescription>New companies seeking to recruit from your college</CardDescription>
            </CardHeader>
            <CardContent>
              {/* Search */}
              <div className="relative mb-6">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search company requests..."
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
                      <TableHead>Company</TableHead>
                      <TableHead>Industry</TableHead>
                      <TableHead>Contact Person</TableHead>
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
                        <TableCell>{request.industry}</TableCell>
                        <TableCell>{request.contactPerson}</TableCell>
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
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="h-5 w-5" />
                  Company Details
                </CardTitle>
                <CardDescription>Review company information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div>
                    <Label className="text-sm font-medium">Company Name</Label>
                    <p className="text-sm font-medium">{selectedRequestData.name}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Industry</Label>
                    <p className="text-sm">{selectedRequestData.industry}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Contact Person</Label>
                    <p className="text-sm">{selectedRequestData.contactPerson}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Contact Information</Label>
                    <div className="space-y-1">
                      <p className="text-sm flex items-center gap-2">
                        <Mail className="h-3 w-3" />
                        {selectedRequestData.email}
                      </p>
                      <p className="text-sm flex items-center gap-2">
                        <Phone className="h-3 w-3" />
                        {selectedRequestData.phone}
                      </p>
                      <p className="text-sm flex items-center gap-2">
                        <Globe className="h-3 w-3" />
                        {selectedRequestData.website}
                      </p>
                    </div>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Description</Label>
                    <p className="text-sm text-muted-foreground">{selectedRequestData.description}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Submitted Date</Label>
                    <p className="text-sm">{selectedRequestData.submittedAt}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="feedback">Feedback (Optional)</Label>
                  <Textarea
                    id="feedback"
                    placeholder="Add any feedback or requirements..."
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                  />
                </div>

                <div className="flex gap-2 pt-4 border-t">
                  <Button onClick={() => handleApprove(selectedRequestData.id)} className="flex-1">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Approve
                  </Button>
                  <Button variant="destructive" onClick={() => handleReject(selectedRequestData.id)} className="flex-1">
                    <XCircle className="h-4 w-4 mr-2" />
                    Reject
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Building2 className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">Select a Request</h3>
                <p className="text-muted-foreground text-center text-sm">
                  Choose a company request to review details and make approval decisions.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
