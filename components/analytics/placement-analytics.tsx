"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { TrendingUp, Users, Building2, Award, Download } from "lucide-react"

export function PlacementAnalytics() {
  const placementStats = [
    { title: "Total Students Placed", value: "342", change: "+23%", icon: Users },
    { title: "Companies Visited", value: "87", change: "+12%", icon: Building2 },
    { title: "Average Package", value: "₹8.5 LPA", change: "+15%", icon: Award },
    { title: "Placement Rate", value: "78%", change: "+5%", icon: TrendingUp },
  ]

  const monthlyPlacements = [
    { month: "Aug", placements: 45, applications: 120 },
    { month: "Sep", placements: 67, applications: 180 },
    { month: "Oct", placements: 89, applications: 220 },
    { month: "Nov", placements: 78, applications: 195 },
    { month: "Dec", placements: 92, applications: 240 },
    { month: "Jan", placements: 71, applications: 185 },
  ]

  const departmentData = [
    { department: "Computer Science", placed: 89, total: 120, percentage: 74 },
    { department: "Information Technology", placed: 67, total: 85, percentage: 79 },
    { department: "Electronics & Communication", placed: 45, total: 75, percentage: 60 },
    { department: "Mechanical", placed: 34, total: 65, percentage: 52 },
    { department: "Civil", placed: 28, total: 55, percentage: 51 },
    { department: "Electrical", placed: 31, total: 60, percentage: 52 },
  ]

  const salaryDistribution = [
    { range: "3-5 LPA", count: 89, color: "#ef4444" },
    { range: "5-8 LPA", count: 134, color: "#f97316" },
    { range: "8-12 LPA", count: 78, color: "#eab308" },
    { range: "12-18 LPA", count: 32, color: "#22c55e" },
    { range: "18+ LPA", count: 9, color: "#3b82f6" },
  ]

  const topCompanies = [
    { name: "TechCorp", hires: 23, avgPackage: "12.5 LPA" },
    { name: "InnovateSoft", hires: 18, avgPackage: "10.2 LPA" },
    { name: "DataSystems", hires: 15, avgPackage: "9.8 LPA" },
    { name: "CloudTech", hires: 12, avgPackage: "11.5 LPA" },
    { name: "StartupXYZ", hires: 10, avgPackage: "8.5 LPA" },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Placement Analytics</h2>
          <p className="text-gray-600">Comprehensive placement statistics and trends</p>
        </div>
        <div className="flex gap-3">
          <Select defaultValue="2024">
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2024">2024</SelectItem>
              <SelectItem value="2023">2023</SelectItem>
              <SelectItem value="2022">2022</SelectItem>
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
        {placementStats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-cyan-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
              <p className="text-xs text-green-600 mt-1">{stat.change} from last year</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Monthly Trends */}
      <Card>
        <CardHeader>
          <CardTitle>Monthly Placement Trends</CardTitle>
          <CardDescription>Placements and applications over the academic year</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyPlacements}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="placements" stroke="#0891b2" strokeWidth={2} name="Placements" />
              <Line type="monotone" dataKey="applications" stroke="#7c3aed" strokeWidth={2} name="Applications" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Department-wise Performance */}
        <Card>
          <CardHeader>
            <CardTitle>Department-wise Placement</CardTitle>
            <CardDescription>Placement statistics by department</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {departmentData.map((dept, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-900">{dept.department}</span>
                    <span className="text-sm text-gray-600">
                      {dept.placed}/{dept.total} ({dept.percentage}%)
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-cyan-600 h-2 rounded-full" style={{ width: `${dept.percentage}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Salary Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Salary Distribution</CardTitle>
            <CardDescription>Distribution of placement packages</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={salaryDistribution}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="count"
                  label={({ range, count }) => `${range}: ${count}`}
                >
                  {salaryDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Top Companies */}
      <Card>
        <CardHeader>
          <CardTitle>Top Recruiting Companies</CardTitle>
          <CardDescription>Companies with highest number of hires</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {topCompanies.map((company, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-violet-600 rounded-lg flex items-center justify-center">
                    <Building2 className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{company.name}</h3>
                    <p className="text-sm text-gray-600">Average Package: {company.avgPackage}</p>
                  </div>
                </div>
                <Badge variant="outline" className="text-lg px-3 py-1">
                  {company.hires} hires
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
