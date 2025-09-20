"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Download, FileSpreadsheet, FileText, Calendar } from "lucide-react"

export function ExportData() {
  const [selectedData, setSelectedData] = useState<string[]>([])
  const [exportFormat, setExportFormat] = useState("excel")
  const [dateRange, setDateRange] = useState("all")

  const dataOptions = [
    { id: "profiles", label: "Student Profiles", description: "Basic info, academic details, skills" },
    { id: "applications", label: "Job Applications", description: "Application history and status" },
    { id: "placements", label: "Placement Data", description: "Successful placements and packages" },
    { id: "interviews", label: "Interview Schedule", description: "Upcoming and past interviews" },
    { id: "companies", label: "Company Information", description: "Recruiting companies and drives" },
  ]

  const handleDataSelection = (dataId: string, checked: boolean) => {
    if (checked) {
      setSelectedData([...selectedData, dataId])
    } else {
      setSelectedData(selectedData.filter((id) => id !== dataId))
    }
  }

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedData(dataOptions.map((option) => option.id))
    } else {
      setSelectedData([])
    }
  }

  const handleExport = () => {
    console.log("Exporting data:", { selectedData, exportFormat, dateRange })
    // Handle export logic
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Export Data</h1>
          <p className="text-muted-foreground mt-1">Export student and placement data for analysis</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Export Configuration */}
        <Card>
          <CardHeader>
            <CardTitle>Export Configuration</CardTitle>
            <CardDescription>Select the data you want to export</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Data Selection */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-base font-medium">Select Data to Export</Label>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleSelectAll(selectedData.length !== dataOptions.length)}
                >
                  {selectedData.length === dataOptions.length ? "Deselect All" : "Select All"}
                </Button>
              </div>
              <div className="space-y-3">
                {dataOptions.map((option) => (
                  <div key={option.id} className="flex items-start space-x-3 p-3 border rounded-lg">
                    <Checkbox
                      id={option.id}
                      checked={selectedData.includes(option.id)}
                      onCheckedChange={(checked) => handleDataSelection(option.id, checked as boolean)}
                    />
                    <div className="space-y-1">
                      <Label htmlFor={option.id} className="font-medium cursor-pointer">
                        {option.label}
                      </Label>
                      <p className="text-sm text-muted-foreground">{option.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Export Format */}
            <div className="space-y-2">
              <Label>Export Format</Label>
              <Select value={exportFormat} onValueChange={setExportFormat}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="excel">
                    <div className="flex items-center gap-2">
                      <FileSpreadsheet className="h-4 w-4" />
                      Excel (.xlsx)
                    </div>
                  </SelectItem>
                  <SelectItem value="pdf">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      PDF Report
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Date Range */}
            <div className="space-y-2">
              <Label>Date Range</Label>
              <Select value={dateRange} onValueChange={setDateRange}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Time</SelectItem>
                  <SelectItem value="current-year">Current Academic Year</SelectItem>
                  <SelectItem value="last-month">Last Month</SelectItem>
                  <SelectItem value="last-3-months">Last 3 Months</SelectItem>
                  <SelectItem value="custom">Custom Range</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button onClick={handleExport} disabled={selectedData.length === 0} className="w-full" size="lg">
              <Download className="h-4 w-4 mr-2" />
              Export Selected Data
            </Button>
          </CardContent>
        </Card>

        {/* Export Preview */}
        <Card>
          <CardHeader>
            <CardTitle>Export Preview</CardTitle>
            <CardDescription>Summary of data to be exported</CardDescription>
          </CardHeader>
          <CardContent>
            {selectedData.length === 0 ? (
              <div className="text-center py-8">
                <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">Select data to see export preview</p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="font-medium">Selected Items:</p>
                    <p className="text-muted-foreground">{selectedData.length} data types</p>
                  </div>
                  <div>
                    <p className="font-medium">Format:</p>
                    <p className="text-muted-foreground capitalize">{exportFormat}</p>
                  </div>
                  <div>
                    <p className="font-medium">Date Range:</p>
                    <p className="text-muted-foreground">{dateRange.replace("-", " ")}</p>
                  </div>
                  <div>
                    <p className="font-medium">Department:</p>
                    <p className="text-muted-foreground">Computer Science</p>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <p className="font-medium mb-2">Estimated Data:</p>
                  <div className="space-y-2 text-sm">
                    {selectedData.includes("profiles") && (
                      <div className="flex justify-between">
                        <span>Student Profiles</span>
                        <span className="text-muted-foreground">156 records</span>
                      </div>
                    )}
                    {selectedData.includes("applications") && (
                      <div className="flex justify-between">
                        <span>Job Applications</span>
                        <span className="text-muted-foreground">342 records</span>
                      </div>
                    )}
                    {selectedData.includes("placements") && (
                      <div className="flex justify-between">
                        <span>Placements</span>
                        <span className="text-muted-foreground">45 records</span>
                      </div>
                    )}
                    {selectedData.includes("interviews") && (
                      <div className="flex justify-between">
                        <span>Interviews</span>
                        <span className="text-muted-foreground">89 records</span>
                      </div>
                    )}
                    {selectedData.includes("companies") && (
                      <div className="flex justify-between">
                        <span>Companies</span>
                        <span className="text-muted-foreground">23 records</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Recent Exports */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Exports</CardTitle>
          <CardDescription>Your recent data exports</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              {
                name: "Student Profiles - December 2024",
                date: "2024-01-10",
                format: "Excel",
                size: "2.3 MB",
              },
              {
                name: "Placement Report - Q4 2024",
                date: "2024-01-08",
                format: "PDF",
                size: "1.8 MB",
              },
              {
                name: "Application Data - Full Year",
                date: "2024-01-05",
                format: "Excel",
                size: "4.1 MB",
              },
            ].map((export_, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="space-y-1">
                  <p className="font-medium text-sm">{export_.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {export_.date} • {export_.format} • {export_.size}
                  </p>
                </div>
                <Button size="sm" variant="outline">
                  <Download className="h-4 w-4 mr-1" />
                  Download
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
