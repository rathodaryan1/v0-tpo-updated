"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit, Trash2, Users, Clock, MapPin } from "lucide-react"

export function DriveManagement() {
  const [showCreateForm, setShowCreateForm] = useState(false)

  const drives = [
    {
      id: 1,
      title: "Software Engineer - Full Stack",
      description: "Looking for experienced full-stack developers with React and Node.js expertise",
      location: "Bangalore",
      salary: "12-18 LPA",
      applications: 89,
      deadline: "2024-01-15",
      status: "Active",
      requirements: ["B.Tech/M.Tech in CS/IT", "CGPA > 7.5", "React, Node.js experience"],
      createdAt: "2024-01-01",
    },
    {
      id: 2,
      title: "Data Analyst",
      description: "Seeking data analysts with strong analytical and visualization skills",
      location: "Mumbai",
      salary: "8-12 LPA",
      applications: 67,
      deadline: "2024-01-20",
      status: "Active",
      requirements: ["B.Tech/M.Tech/MCA", "CGPA > 7.0", "Python, SQL, Tableau"],
      createdAt: "2024-01-05",
    },
    {
      id: 3,
      title: "Product Manager",
      description: "Product manager role for our fintech division",
      location: "Delhi",
      salary: "15-22 LPA",
      applications: 91,
      deadline: "2024-01-10",
      status: "Closed",
      requirements: ["MBA/B.Tech", "CGPA > 8.0", "2+ years experience preferred"],
      createdAt: "2023-12-20",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Drive Management</h2>
          <p className="text-gray-600">Create and manage your recruitment drives</p>
        </div>
        <Button onClick={() => setShowCreateForm(true)} className="bg-cyan-600 hover:bg-cyan-700">
          <Plus className="h-4 w-4 mr-2" />
          Create New Drive
        </Button>
      </div>

      {showCreateForm && (
        <Card>
          <CardHeader>
            <CardTitle>Create New Drive</CardTitle>
            <CardDescription>Fill in the details for your new recruitment drive</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Job Title</Label>
                <Input id="title" placeholder="e.g., Software Engineer" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input id="location" placeholder="e.g., Bangalore" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Job Description</Label>
              <Textarea id="description" placeholder="Describe the role and responsibilities..." />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="salary">Salary Range</Label>
                <Input id="salary" placeholder="e.g., 10-15 LPA" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="deadline">Application Deadline</Label>
                <Input id="deadline" type="date" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="positions">Number of Positions</Label>
                <Input id="positions" type="number" placeholder="e.g., 5" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="requirements">Requirements</Label>
              <Textarea id="requirements" placeholder="List the requirements (one per line)..." />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="minCgpa">Minimum CGPA</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select minimum CGPA" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="6.0">6.0</SelectItem>
                    <SelectItem value="6.5">6.5</SelectItem>
                    <SelectItem value="7.0">7.0</SelectItem>
                    <SelectItem value="7.5">7.5</SelectItem>
                    <SelectItem value="8.0">8.0</SelectItem>
                    <SelectItem value="8.5">8.5</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="branches">Eligible Branches</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select branches" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cse">Computer Science</SelectItem>
                    <SelectItem value="it">Information Technology</SelectItem>
                    <SelectItem value="ece">Electronics & Communication</SelectItem>
                    <SelectItem value="eee">Electrical & Electronics</SelectItem>
                    <SelectItem value="mech">Mechanical</SelectItem>
                    <SelectItem value="civil">Civil</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <Button className="bg-cyan-600 hover:bg-cyan-700">Create Drive</Button>
              <Button variant="outline" onClick={() => setShowCreateForm(false)}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-6">
        {drives.map((drive) => (
          <Card key={drive.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <CardTitle className="text-xl">{drive.title}</CardTitle>
                    <Badge variant={drive.status === "Active" ? "default" : "secondary"}>{drive.status}</Badge>
                  </div>
                  <CardDescription className="text-base">{drive.description}</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <MapPin className="h-4 w-4" />
                  {drive.location}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Users className="h-4 w-4" />
                  {drive.applications} applications
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Clock className="h-4 w-4" />
                  Deadline: {drive.deadline}
                </div>
                <div className="text-sm font-semibold text-green-600">{drive.salary}</div>
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold text-gray-900">Requirements:</h4>
                <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                  {drive.requirements.map((req, index) => (
                    <li key={index}>{req}</li>
                  ))}
                </ul>
              </div>

              <div className="flex gap-3 mt-4 pt-4 border-t">
                <Button variant="outline">View Applications</Button>
                <Button variant="outline">Schedule Interviews</Button>
                <Button variant="outline">Download Reports</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
