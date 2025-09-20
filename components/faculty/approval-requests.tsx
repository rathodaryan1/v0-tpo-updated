"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CheckCircle, XCircle, Clock, User, FileText, Upload } from "lucide-react"

const approvalRequests = [
  {
    id: 1,
    student: "Rahul Kumar",
    rollNo: "CS2021001",
    type: "Profile Update",
    description: "Updated skills and added new certification",
    submittedAt: "2024-01-13 10:30 AM",
    changes: {
      skills: { old: ["JavaScript", "React"], new: ["JavaScript", "React", "Node.js", "MongoDB"] },
      certifications: { old: [], new: ["AWS Cloud Practitioner"] },
    },
  },
  {
    id: 2,
    student: "Priya Sharma",
    rollNo: "CS2021002",
    type: "Document Upload",
    description: "Uploaded updated resume with recent internship experience",
    submittedAt: "2024-01-13 09:15 AM",
    changes: {
      resume: { old: "resume_v1.pdf", new: "resume_v2.pdf" },
    },
  },
  {
    id: 3,
    student: "Amit Singh",
    rollNo: "CS2021003",
    type: "Academic Info",
    description: "Updated CGPA for latest semester",
    submittedAt: "2024-01-12 04:45 PM",
    changes: {
      cgpa: { old: "7.6", new: "7.8" },
      semester: { old: "7", new: "8" },
    },
  },
]

export function ApprovalRequests() {
  const [selectedRequest, setSelectedRequest] = useState<number | null>(null)
  const [feedback, setFeedback] = useState("")

  const handleApprove = (requestId: number) => {
    console.log(`Approved request ${requestId}`)
    // Handle approval logic
  }

  const handleReject = (requestId: number) => {
    console.log(`Rejected request ${requestId} with feedback: ${feedback}`)
    // Handle rejection logic
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Approval Requests</h1>
          <p className="text-muted-foreground mt-1">Review and approve student profile updates</p>
        </div>
        <Badge variant="outline" className="px-3 py-1">
          {approvalRequests.length} Pending
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Requests List */}
        <div className="lg:col-span-1 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Pending Requests</CardTitle>
              <CardDescription>Click on a request to review details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {approvalRequests.map((request) => (
                <div
                  key={request.id}
                  className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                    selectedRequest === request.id ? "border-primary bg-primary/5" : "hover:bg-muted/50"
                  }`}
                  onClick={() => setSelectedRequest(request.id)}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="space-y-1">
                      <p className="font-medium text-sm">{request.student}</p>
                      <p className="text-xs text-muted-foreground">{request.rollNo}</p>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {request.type}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">{request.description}</p>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    {request.submittedAt}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Request Details */}
        <div className="lg:col-span-2">
          {selectedRequest ? (
            <RequestDetails
              request={approvalRequests.find((r) => r.id === selectedRequest)!}
              feedback={feedback}
              setFeedback={setFeedback}
              onApprove={handleApprove}
              onReject={handleReject}
            />
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <FileText className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">Select a Request</h3>
                <p className="text-muted-foreground text-center">
                  Choose a request from the list to review the details and make approval decisions.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}

function RequestDetails({
  request,
  feedback,
  setFeedback,
  onApprove,
  onReject,
}: {
  request: any
  feedback: string
  setFeedback: (feedback: string) => void
  onApprove: (id: number) => void
  onReject: (id: number) => void
}) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              {request.student}
            </CardTitle>
            <CardDescription>
              {request.rollNo} • {request.type}
            </CardDescription>
          </div>
          <Badge variant="outline">{request.submittedAt}</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h4 className="font-medium mb-2">Description</h4>
          <p className="text-sm text-muted-foreground">{request.description}</p>
        </div>

        <div>
          <h4 className="font-medium mb-4">Changes Made</h4>
          <Tabs defaultValue="changes" className="w-full">
            <TabsList>
              <TabsTrigger value="changes">Changes</TabsTrigger>
              <TabsTrigger value="documents">Documents</TabsTrigger>
            </TabsList>
            <TabsContent value="changes" className="space-y-4">
              {Object.entries(request.changes).map(([field, change]: [string, any]) => (
                <div key={field} className="border rounded-lg p-4">
                  <h5 className="font-medium capitalize mb-3">{field}</h5>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-xs text-muted-foreground">Previous</Label>
                      <div className="mt-1 p-2 bg-red-50 border border-red-200 rounded text-sm">
                        {Array.isArray(change.old) ? change.old.join(", ") : change.old || "None"}
                      </div>
                    </div>
                    <div>
                      <Label className="text-xs text-muted-foreground">Updated</Label>
                      <div className="mt-1 p-2 bg-green-50 border border-green-200 rounded text-sm">
                        {Array.isArray(change.new) ? change.new.join(", ") : change.new}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </TabsContent>
            <TabsContent value="documents" className="space-y-4">
              <div className="border rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Upload className="h-4 w-4" />
                  <span className="font-medium">Uploaded Files</span>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-2 bg-muted rounded">
                    <span className="text-sm">resume_v2.pdf</span>
                    <Button size="sm" variant="outline">
                      View
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-3">
          <Label htmlFor="feedback">Feedback (Optional)</Label>
          <Textarea
            id="feedback"
            placeholder="Add any feedback or comments for the student..."
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
          />
        </div>

        <div className="flex gap-3 pt-4 border-t">
          <Button onClick={() => onApprove(request.id)} className="flex-1">
            <CheckCircle className="h-4 w-4 mr-2" />
            Approve Changes
          </Button>
          <Button variant="destructive" onClick={() => onReject(request.id)} className="flex-1">
            <XCircle className="h-4 w-4 mr-2" />
            Request Corrections
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
