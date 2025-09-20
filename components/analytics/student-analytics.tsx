"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts"
import { User, BookOpen, Award, Calendar, Target } from "lucide-react"

export function StudentAnalytics() {
  const personalStats = [
    { title: "Applications Sent", value: "12", icon: User },
    { title: "Interviews Attended", value: "5", icon: Calendar },
    { title: "Offers Received", value: "2", icon: Award },
    { title: "Profile Completion", value: "85%", icon: Target },
  ]

  const applicationTrend = [
    { month: "Sep", applications: 2, interviews: 1, offers: 0 },
    { month: "Oct", applications: 4, interviews: 2, offers: 1 },
    { month: "Nov", applications: 3, interviews: 1, offers: 0 },
    { month: "Dec", applications: 2, interviews: 1, offers: 1 },
    { month: "Jan", applications: 1, interviews: 0, offers: 0 },
  ]

  const skillsProgress = [
    { skill: "Technical Skills", progress: 90, target: 95 },
    { skill: "Communication", progress: 75, target: 85 },
    { skill: "Problem Solving", progress: 85, target: 90 },
    { skill: "Leadership", progress: 60, target: 80 },
    { skill: "Teamwork", progress: 80, target: 85 },
  ]

  const upcomingDeadlines = [
    { company: "TechCorp", position: "Software Engineer", deadline: "2024-01-20", daysLeft: 5 },
    { company: "DataSystems", position: "Data Analyst", deadline: "2024-01-25", daysLeft: 10 },
    { company: "CloudTech", position: "DevOps Engineer", deadline: "2024-01-30", daysLeft: 15 },
  ]

  const recentActivity = [
    { action: "Applied to TechCorp - Software Engineer", date: "2024-01-10", type: "application" },
    { action: "Interview scheduled with InnovateSoft", date: "2024-01-09", type: "interview" },
    { action: "Offer received from StartupXYZ", date: "2024-01-08", type: "offer" },
    { action: "Profile updated - Added new project", date: "2024-01-07", type: "profile" },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">My Analytics</h2>
        <p className="text-gray-600">Track your placement journey and progress</p>
      </div>

      {/* Personal Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {personalStats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-cyan-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Application Trends */}
      <Card>
        <CardHeader>
          <CardTitle>Application Activity</CardTitle>
          <CardDescription>Your application, interview, and offer trends</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={applicationTrend}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="applications" stroke="#0891b2" strokeWidth={2} name="Applications" />
              <Line type="monotone" dataKey="interviews" stroke="#7c3aed" strokeWidth={2} name="Interviews" />
              <Line type="monotone" dataKey="offers" stroke="#059669" strokeWidth={2} name="Offers" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Skills Progress */}
        <Card>
          <CardHeader>
            <CardTitle>Skills Development</CardTitle>
            <CardDescription>Track your skill improvement progress</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {skillsProgress.map((skill, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-900">{skill.skill}</span>
                    <span className="text-sm text-gray-600">
                      {skill.progress}% / {skill.target}%
                    </span>
                  </div>
                  <div className="space-y-1">
                    <Progress value={skill.progress} className="h-2" />
                    <div className="text-xs text-gray-500">Target: {skill.target}%</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Deadlines */}
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Deadlines</CardTitle>
            <CardDescription>Don't miss these application deadlines</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingDeadlines.map((deadline, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <h3 className="font-semibold text-gray-900">{deadline.company}</h3>
                    <p className="text-sm text-gray-600">{deadline.position}</p>
                    <p className="text-xs text-gray-500">Deadline: {deadline.deadline}</p>
                  </div>
                  <Badge
                    variant={deadline.daysLeft <= 5 ? "destructive" : deadline.daysLeft <= 10 ? "default" : "secondary"}
                  >
                    {deadline.daysLeft} days left
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Your latest placement-related activities</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center gap-4 p-3 border rounded-lg">
                <div className="w-8 h-8 rounded-full bg-cyan-100 flex items-center justify-center">
                  {activity.type === "application" && <User className="h-4 w-4 text-cyan-600" />}
                  {activity.type === "interview" && <Calendar className="h-4 w-4 text-cyan-600" />}
                  {activity.type === "offer" && <Award className="h-4 w-4 text-cyan-600" />}
                  {activity.type === "profile" && <BookOpen className="h-4 w-4 text-cyan-600" />}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                  <p className="text-xs text-gray-500">{activity.date}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
