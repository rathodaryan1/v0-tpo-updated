"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Calendar, Clock, Video, MapPin, Plus, Edit, Trash2 } from "lucide-react"

export function InterviewManagement() {
  const [showScheduleForm, setShowScheduleForm] = useState(false)

  const interviews = [
    {
      id: 1,
      student: "Amit Kumar",
      drive: "Software Engineer - Full Stack",
      date: "2024-01-15",
      time: "10:00 AM",
      type: "Technical",
      mode: "Online",
      interviewer: "John Smith",
      status: "Scheduled",
      meetingLink: "https://meet.google.com/abc-def-ghi",
    },
    {
      id: 2,
      student: "Priya Patel",
      drive: "Data Analyst",
      date: "2024-01-15",
      time: "2:00 PM",
      type: "HR",
      mode: "In-person",
      interviewer: "Sarah Johnson",
      status: "Scheduled",
      location: "Conference Room A",
    },
    {
      id: 3,
      student: "Rahul Sharma",
      drive: "Software Engineer - Full Stack",
      date: "2024-01-14",
      time: "11:00 AM",
      type: "Technical",
      mode: "Online",
      interviewer: "Mike Wilson",
      status: "Completed",
      result: "Selected",
      feedback: "Strong technical skills, good problem-solving approach",
    },
    {
      id: 4,
      student: "Sneha Reddy",
      drive: "Product Manager",
      date: "2024-01-13",
      time: "3:00 PM",
      type: "Managerial",
      mode: "In-person",
      interviewer: "Lisa Chen",
      status: "Completed",
      result: "Selected",
      feedback: "Excellent leadership qualities and strategic thinking",
    },
  ]

  const getStatusBadge = (status: string, result?: string) => {
    if (status === "Completed") {
      return (
        <div className="flex flex-col gap-1">
          <Badge variant="outline">{status}</Badge>
          {result && (
            <Badge variant={result === "Selected" ? "default" : "destructive"} className="text-xs">
              {result}
            </Badge>
          )}
        </div>
      )
    }
    return <Badge variant={status === "Scheduled" ? "default" : "secondary"}>{status}</Badge>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Interview Management</h2>
          <p className="text-gray-600">Schedule and manage interviews</p>
        </div>
        <Button onClick={() => setShowScheduleForm(true)} className="bg-cyan-600 hover:bg-cyan-700">
          <Plus className="h-4 w-4 mr-2" />
          Schedule Interview
        </Button>
      </div>

      {showScheduleForm && (
        <Card>
          <CardHeader>
            <CardTitle>Schedule New Interview</CardTitle>
            <CardDescription>Schedule an interview for a shortlisted candidate</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="student">Select Student</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose student" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="student1">Amit Kumar - Software Engineer</SelectItem>
                    <SelectItem value="student2">Priya Patel - Data Analyst</SelectItem>
                    <SelectItem value="student3">Rahul Sharma - Software Engineer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="interviewer">Interviewer</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select interviewer" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="john">John Smith - Technical Lead</SelectItem>
                    <SelectItem value="sarah">Sarah Johnson - HR Manager</SelectItem>
                    <SelectItem value="mike">Mike Wilson - Senior Developer</SelectItem>
                    <SelectItem value="lisa">Lisa Chen - Product Director</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="date">Interview Date</Label>
                <Input id="date" type="date" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="time">Time</Label>
                <Input id="time" type="time" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="type">Interview Type</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="technical">Technical</SelectItem>
                    <SelectItem value="hr">HR</SelectItem>
                    <SelectItem value="managerial">Managerial</SelectItem>
                    <SelectItem value="final">Final Round</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="mode">Interview Mode</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select mode" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="online">Online</SelectItem>
                    <SelectItem value="in-person">In-person</SelectItem>
                    <SelectItem value="phone">Phone</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location/Meeting Link</Label>
                <Input id="location" placeholder="Conference room or meeting link" />
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <Button className="bg-cyan-600 hover:bg-cyan-700">Schedule Interview</Button>
              <Button variant="outline" onClick={() => setShowScheduleForm(false)}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Upcoming Interviews */}
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Interviews</CardTitle>
          <CardDescription>Interviews scheduled for the next few days</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {interviews
              .filter((interview) => interview.status === "Scheduled")
              .map((interview) => (
                <div key={interview.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-gray-900">{interview.student}</h3>
                      <Badge variant="outline">{interview.type}</Badge>
                      <Badge variant={interview.mode === "Online" ? "default" : "secondary"}>
                        {interview.mode === "Online" ? (
                          <Video className="h-3 w-3 mr-1" />
                        ) : (
                          <MapPin className="h-3 w-3 mr-1" />
                        )}
                        {interview.mode}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-1">{interview.drive}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {interview.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {interview.time}
                      </span>
                      <span>Interviewer: {interview.interviewer}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {getStatusBadge(interview.status)}
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>

      {/* Interview History */}
      <Card>
        <CardHeader>
          <CardTitle>Interview History</CardTitle>
          <CardDescription>Completed interviews and results</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student</TableHead>
                <TableHead>Drive</TableHead>
                <TableHead>Date & Time</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Interviewer</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Feedback</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {interviews
                .filter((interview) => interview.status === "Completed")
                .map((interview) => (
                  <TableRow key={interview.id}>
                    <TableCell className="font-semibold">{interview.student}</TableCell>
                    <TableCell className="text-sm">{interview.drive}</TableCell>
                    <TableCell className="text-sm">
                      {interview.date} at {interview.time}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{interview.type}</Badge>
                    </TableCell>
                    <TableCell className="text-sm">{interview.interviewer}</TableCell>
                    <TableCell>{getStatusBadge(interview.status, interview.result)}</TableCell>
                    <TableCell className="text-sm max-w-xs truncate">{interview.feedback}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
