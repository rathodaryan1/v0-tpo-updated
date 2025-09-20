"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { TrendingUp, Users, Building2, Award, Download, Calendar } from "lucide-react"

export function AdminAnalytics() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Analytics & Reports</h1>
          <p className="text-muted-foreground mt-1">Comprehensive placement analytics and insights</p>
        </div>
        <div className="flex items-center gap-2">
          <Select defaultValue="current-year">
            <SelectTrigger className="w-48">
              <Calendar className="h-4 w-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="current-year">Current Academic Year</SelectItem>
              <SelectItem value="last-year">Last Academic Year</SelectItem>
              <SelectItem value="all-time">All Time</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overall Placement Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">78.5%</div>
            <p className="text-xs text-muted-foreground">+5.2% from last year</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Students Placed</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">342</div>
            <p className="text-xs text-muted-foreground">Out of 436 eligible</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Partner Companies</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45</div>
            <p className="text-xs text-muted-foreground">+12 new this year</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Package</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹9.2 LPA</div>
            <p className="text-xs text-muted-foreground">+8.5% from last year</p>
          </CardContent>
        </Card>
      </div>

      {/* Department-wise Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Department-wise Placements</CardTitle>
            <CardDescription>Placement statistics by department</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { dept: "Computer Science Engineering", placed: 89, total: 105, rate: 84.8 },
                { dept: "Electronics & Communication", placed: 67, total: 85, rate: 78.8 },
                { dept: "Mechanical Engineering", placed: 45, total: 72, rate: 62.5 },
                { dept: "Civil Engineering", placed: 38, total: 68, rate: 55.9 },
                { dept: "Electrical Engineering", placed: 42, total: 58, rate: 72.4 },
              ].map((dept, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{dept.dept}</span>
                    <Badge variant="outline">{dept.rate}%</Badge>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full" style={{ width: `${dept.rate}%` }} />
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>{dept.placed} placed</span>
                    <span>{dept.total} total</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Package Distribution</CardTitle>
            <CardDescription>Salary package ranges and student distribution</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { range: "₹15+ LPA", count: 28, percentage: 8.2 },
                { range: "₹10-15 LPA", count: 89, percentage: 26.0 },
                { range: "₹7-10 LPA", count: 145, percentage: 42.4 },
                { range: "₹5-7 LPA", count: 65, percentage: 19.0 },
                { range: "₹3-5 LPA", count: 15, percentage: 4.4 },
              ].map((pkg, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="space-y-1">
                    <p className="font-medium">{pkg.range}</p>
                    <p className="text-sm text-muted-foreground">{pkg.count} students</p>
                  </div>
                  <Badge variant="outline">{pkg.percentage}%</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Company Analysis */}
      <Card>
        <CardHeader>
          <CardTitle>Top Recruiting Companies</CardTitle>
          <CardDescription>Companies with highest student intake</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { company: "TechCorp Inc.", hired: 25, package: "₹12 LPA", type: "IT Services" },
              { company: "DataSys Solutions", hired: 18, package: "₹8 LPA", type: "Analytics" },
              { company: "WebFlow Technologies", hired: 15, package: "₹10 LPA", type: "Product" },
              { company: "CloudTech Systems", hired: 12, package: "₹15 LPA", type: "Cloud" },
              { company: "AI Innovations", hired: 10, package: "₹18 LPA", type: "AI/ML" },
              { company: "FinTech Solutions", hired: 8, package: "₹14 LPA", type: "Finance" },
            ].map((company, index) => (
              <div key={index} className="p-4 border rounded-lg space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">{company.company}</h4>
                  <Badge variant="outline">{company.hired} hired</Badge>
                </div>
                <p className="text-sm text-muted-foreground">{company.type}</p>
                <p className="text-sm font-medium text-primary">Avg: {company.package}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Trends Analysis */}
      <Card>
        <CardHeader>
          <CardTitle>Yearly Trends</CardTitle>
          <CardDescription>Placement trends over the years</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { year: "2023-24", students: 342, rate: 78.5, avgPackage: "₹9.2 LPA" },
              { year: "2022-23", students: 298, rate: 73.3, avgPackage: "₹8.5 LPA" },
              { year: "2021-22", students: 267, rate: 69.8, avgPackage: "₹7.8 LPA" },
              { year: "2020-21", students: 234, rate: 65.2, avgPackage: "₹7.2 LPA" },
            ].map((year, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="space-y-1">
                  <p className="font-medium">{year.year}</p>
                  <p className="text-sm text-muted-foreground">{year.students} students placed</p>
                </div>
                <div className="text-right space-y-1">
                  <Badge variant="outline">{year.rate}%</Badge>
                  <p className="text-sm text-muted-foreground">{year.avgPackage}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
