"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"
import { Users, Calendar, Award, Download, Building2 } from "lucide-react"

export function CompanyAnalytics() {
  const recruitmentStats = [
    { title: "Active Drives", value: "3", change: "+1 this month", icon: Calendar },
    { title: "Total Applications", value: "247", change: "+45 this week", icon: Users },
    { title: "Interviews Conducted", value: "89", change: "+12 today", icon: Building2 },
    { title: "Offers Extended", value: "34", change: "+8 this week", icon: Award },
  ]

  const applicationsByDrive = [
    { drive: "Software Engineer", applications: 89, shortlisted: 23, selected: 12 },
    { drive: "Data Analyst", applications: 67, shortlisted: 18, selected: 8 },
    { drive: "Product Manager", applications: 91, shortlisted: 15, selected: 5 },
  ]

  const candidateQuality = [
    { cgpa: "9.0+", count: 45, color: "#059669" },
    { cgpa: "8.0-8.9", count: 89, color: "#0891b2" },
    { cgpa: "7.0-7.9", count: 78, color: "#7c3aed" },
    { cgpa: "6.0-6.9", count: 35, color: "#dc2626" },
  ]

  const departmentDistribution = [
    { department: "Computer Science", applications: 89, selected: 12 },
    { department: "Information Technology", applications: 67, selected: 8 },
    { department: "Electronics", applications: 45, selected: 6 },
    { department: "Mechanical", applications: 34, selected: 4 },
    { department: "Civil", applications: 12, selected: 2 },
  ]

  const interviewFunnel = [
    { stage: "Applications", count: 247 },
    { stage: "Screening", count: 156 },
    { stage: "Technical", count: 89 },
    { stage: "HR Round", count: 56 },
    { stage: "Final", count: 34 },
    { stage: "Selected", count: 23 },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Recruitment Analytics</h2>
          <p className="text-gray-600">Insights into your recruitment performance</p>
        </div>
        <div className="flex gap-3">
          <Select defaultValue="all">
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Drives</SelectItem>
              <SelectItem value="software">Software Engineer</SelectItem>
              <SelectItem value="data">Data Analyst</SelectItem>
              <SelectItem value="product">Product Manager</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {recruitmentStats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-cyan-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
              <p className="text-xs text-green-600 mt-1">{stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Applications by Drive */}
      <Card>
        <CardHeader>
          <CardTitle>Drive Performance</CardTitle>
          <CardDescription>Applications, shortlisted, and selected candidates by drive</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={applicationsByDrive}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="drive" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="applications" fill="#0891b2" name="Applications" />
              <Bar dataKey="shortlisted" fill="#7c3aed" name="Shortlisted" />
              <Bar dataKey="selected" fill="#059669" name="Selected" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Candidate Quality */}
        <Card>
          <CardHeader>
            <CardTitle>Candidate Quality (CGPA)</CardTitle>
            <CardDescription>Distribution of candidates by CGPA</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={candidateQuality}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="count"
                  label={({ cgpa, count }) => `${cgpa}: ${count}`}
                >
                  {candidateQuality.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Department Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Department-wise Applications</CardTitle>
            <CardDescription>Applications and selections by department</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {departmentDistribution.map((dept, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-900">{dept.department}</span>
                    <span className="text-sm text-gray-600">
                      {dept.selected}/{dept.applications} selected
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-cyan-600 h-2 rounded-full"
                      style={{ width: `${(dept.selected / dept.applications) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Interview Funnel */}
      <Card>
        <CardHeader>
          <CardTitle>Interview Funnel</CardTitle>
          <CardDescription>Candidate progression through interview stages</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {interviewFunnel.map((stage, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className="w-24 text-sm font-medium text-gray-900">{stage.stage}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <div className="flex-1 bg-gray-200 rounded-full h-6 relative">
                      <div
                        className="bg-gradient-to-r from-cyan-500 to-violet-600 h-6 rounded-full flex items-center justify-center text-white text-sm font-medium"
                        style={{ width: `${(stage.count / interviewFunnel[0].count) * 100}%` }}
                      >
                        {stage.count}
                      </div>
                    </div>
                    <div className="text-sm text-gray-600 w-16">
                      {Math.round((stage.count / interviewFunnel[0].count) * 100)}%
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
