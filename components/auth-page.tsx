"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { EnvSetupChecker } from "@/components/env-setup-checker"
import { GraduationCap, Building2, Users, UserCheck } from "lucide-react"

export function AuthPage() {
  const [activeTab, setActiveTab] = useState("login")
  const [userType, setUserType] = useState<"student" | "faculty" | "admin" | "company">("student")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [supabaseConfigured, setSupabaseConfigured] = useState<boolean | null>(null)
  const [registerLoading, setRegisterLoading] = useState(false);
  const router = useRouter()

  useEffect(() => {
    // Check if Supabase is configured
    const checkSupabase = async () => {
      try {
        const { createServerClient } = await import('@/lib/supabase/client')
        createServerClient()
        setSupabaseConfigured(true)
      } catch {
        setSupabaseConfigured(false)
      }
    }
    checkSupabase()
  }, [])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        // Store user data in localStorage for demo purposes
        localStorage.setItem('userRole', data.user.role)
        localStorage.setItem('userEmail', data.user.email)
        localStorage.setItem('userName', `${data.user.firstName} ${data.user.lastName}`)
        
        // Redirect based on role
        const redirects = {
          student: "/student/dashboard",
          faculty: "/faculty/dashboard", 
          admin: "/admin/dashboard",
          company: "/company/dashboard"
        }
        
        router.push(redirects[data.user.role as keyof typeof redirects])
      } else {
        alert(data.error || 'Login failed')
        setIsLoading(false)
      }
    } catch (error) {
      console.error('Login error:', error)
      alert('Login failed. Please try again.')
      setIsLoading(false)
    }
  }

  // Registration handler
  const handleRegister = async (userType: string, formData: Record<string, any>) => {
    setRegisterLoading(true);
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, userType }),
      });
      const data = await response.json();
      if (response.ok) {
        alert('Registration successful! Please check your email for verification.');
        setActiveTab('login');
      } else {
        alert(data.error || 'Registration failed');
      }
    } catch (error) {
      alert('Registration failed. Please try again.');
    }
    setRegisterLoading(false);
  };

  // Show setup checker if Supabase is not configured
  if (supabaseConfigured === false) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-card flex items-center justify-center p-4">
        <div className="w-full max-w-2xl">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <GraduationCap className="h-12 w-12 text-primary" />
            </div>
            <h1 className="text-3xl font-bold text-foreground">TPO Portal</h1>
            <p className="text-muted-foreground mt-2">Training & Placement Office</p>
          </div>
          <EnvSetupChecker />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-card flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <GraduationCap className="h-12 w-12 text-primary" />
          </div>
          <h1 className="text-3xl font-bold text-foreground">TPO Portal</h1>
          <p className="text-muted-foreground mt-2">Training & Placement Office</p>
        </div>

        <Card className="shadow-lg">
          <CardHeader className="space-y-1">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="register">Register</TabsTrigger>
              </TabsList>

              <TabsContent value="login" className="space-y-4 mt-6">
                <CardTitle className="text-2xl text-center">Welcome Back</CardTitle>
                <CardDescription className="text-center">Sign in to your TPO account</CardDescription>

                <div className="bg-muted/50 rounded-lg p-4 space-y-3">
                  <h3 className="font-semibold text-sm text-center">Demo Credentials</h3>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="space-y-1">
                      <div className="font-medium text-primary">Student</div>
                      <div>student@demo.com</div>
                      <div>password123</div>
                    </div>
                    <div className="space-y-1">
                      <div className="font-medium text-primary">Faculty</div>
                      <div>faculty@demo.com</div>
                      <div>password123</div>
                    </div>
                    <div className="space-y-1">
                      <div className="font-medium text-primary">Admin</div>
                      <div>admin@demo.com</div>
                      <div>password123</div>
                    </div>
                    <div className="space-y-1">
                      <div className="font-medium text-primary">Company</div>
                      <div>company@demo.com</div>
                      <div>password123</div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="userType">Login as</Label>
                    <Select value={userType} onValueChange={(value: any) => setUserType(value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="student">
                          <div className="flex items-center gap-2">
                            <GraduationCap className="h-4 w-4" />
                            Student
                          </div>
                        </SelectItem>
                        <SelectItem value="faculty">
                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4" />
                            Faculty
                          </div>
                        </SelectItem>
                        <SelectItem value="admin">
                          <div className="flex items-center gap-2">
                            <UserCheck className="h-4 w-4" />
                            Admin (TPO)
                          </div>
                        </SelectItem>
                        <SelectItem value="company">
                          <div className="flex items-center gap-2">
                            <Building2 className="h-4 w-4" />
                            Company
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button className="w-full" size="lg" onClick={handleLogin} disabled={isLoading}>
                    {isLoading ? "Signing In..." : "Sign In"}
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="register" className="space-y-4 mt-6">
                <CardTitle className="text-2xl text-center">Create Account</CardTitle>
                <CardDescription className="text-center">Register for TPO Portal access</CardDescription>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="registerType">Register as</Label>
                    <Select value={userType} onValueChange={(value: any) => setUserType(value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="student">
                          <div className="flex items-center gap-2">
                            <GraduationCap className="h-4 w-4" />
                            Student
                          </div>
                        </SelectItem>
                        <SelectItem value="faculty">
                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4" />
                            Faculty
                          </div>
                        </SelectItem>
                        <SelectItem value="company">
                          <div className="flex items-center gap-2">
                            <Building2 className="h-4 w-4" />
                            Company
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  {userType === "student" && (
                    <StudentRegistrationForm
                      onRegister={(formData) => handleRegister("student", formData)}
                      loading={registerLoading}
                    />
                  )}
                  {userType === "faculty" && (
                    <FacultyRegistrationForm
                      onRegister={(formData) => handleRegister("faculty", formData)}
                      loading={registerLoading}
                    />
                  )}
                  {userType === "company" && (
                    <CompanyRegistrationForm
                      onRegister={(formData) => handleRegister("company", formData)}
                      loading={registerLoading}
                    />
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </CardHeader>
        </Card>

        <div className="mt-6 text-center">
          <p className="text-sm text-muted-foreground">Need help? Contact your TPO administrator</p>
        </div>
      </div>
    </div>
  )
}

function StudentRegistrationForm({ onRegister, loading }: { onRegister: (data: any) => void, loading: boolean }) {
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", rollNumber: "", branch: "", password: "" });
  return (
    <form
      className="space-y-4"
      onSubmit={e => {
        e.preventDefault();
        onRegister(form);
      }}
    >
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">First Name</Label>
          <Input id="firstName" value={form.firstName} onChange={e => setForm(f => ({ ...f, firstName: e.target.value }))} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName">Last Name</Label>
          <Input id="lastName" value={form.lastName} onChange={e => setForm(f => ({ ...f, lastName: e.target.value }))} />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="rollNumber">Roll Number</Label>
        <Input id="rollNumber" value={form.rollNumber} onChange={e => setForm(f => ({ ...f, rollNumber: e.target.value }))} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="branch">Branch</Label>
        <Select value={form.branch} onValueChange={value => setForm(f => ({ ...f, branch: value }))}>
          <SelectTrigger>
            <SelectValue placeholder="Select your branch" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="cse">Computer Science Engineering</SelectItem>
            <SelectItem value="ece">Electronics & Communication</SelectItem>
            <SelectItem value="me">Mechanical Engineering</SelectItem>
            <SelectItem value="ce">Civil Engineering</SelectItem>
            <SelectItem value="ee">Electrical Engineering</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input id="password" type="password" value={form.password} onChange={e => setForm(f => ({ ...f, password: e.target.value }))} />
      </div>
      <Badge variant="outline" className="w-full justify-center py-2">
        Email verification required after registration
      </Badge>
      <Button className="w-full" size="lg" type="submit" disabled={loading}>
        {loading ? "Registering..." : "Register as Student"}
      </Button>
    </form>
  );
}

function FacultyRegistrationForm({ onRegister, loading }: { onRegister: (data: any) => void, loading: boolean }) {
  const [form, setForm] = useState({ facultyName: "", facultyEmail: "", employeeId: "", department: "", facultyPassword: "" });
  return (
    <form
      className="space-y-4"
      onSubmit={e => {
        e.preventDefault();
        onRegister(form);
      }}
    >
      <div className="space-y-2">
        <Label htmlFor="facultyName">Full Name</Label>
        <Input id="facultyName" value={form.facultyName} onChange={e => setForm(f => ({ ...f, facultyName: e.target.value }))} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="facultyEmail">Email</Label>
        <Input id="facultyEmail" type="email" value={form.facultyEmail} onChange={e => setForm(f => ({ ...f, facultyEmail: e.target.value }))} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="employeeId">Employee ID</Label>
        <Input id="employeeId" value={form.employeeId} onChange={e => setForm(f => ({ ...f, employeeId: e.target.value }))} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="department">Department</Label>
        <Select value={form.department} onValueChange={value => setForm(f => ({ ...f, department: value }))}>
          <SelectTrigger>
            <SelectValue placeholder="Select department" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="cse">Computer Science Engineering</SelectItem>
            <SelectItem value="ece">Electronics & Communication</SelectItem>
            <SelectItem value="me">Mechanical Engineering</SelectItem>
            <SelectItem value="ce">Civil Engineering</SelectItem>
            <SelectItem value="ee">Electrical Engineering</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="facultyPassword">Password</Label>
        <Input id="facultyPassword" type="password" value={form.facultyPassword} onChange={e => setForm(f => ({ ...f, facultyPassword: e.target.value }))} />
      </div>
      <Badge variant="outline" className="w-full justify-center py-2">
        Admin approval required
      </Badge>
      <Button className="w-full" size="lg" type="submit" disabled={loading}>
        {loading ? "Registering..." : "Register as Faculty"}
      </Button>
    </form>
  );
}

function CompanyRegistrationForm({ onRegister, loading }: { onRegister: (data: any) => void, loading: boolean }) {
  const [form, setForm] = useState({ companyName: "", industry: "", contactPerson: "", companyEmail: "", companyPhone: "", companyPassword: "" });
  return (
    <form
      className="space-y-4"
      onSubmit={e => {
        e.preventDefault();
        onRegister(form);
      }}
    >
      <div className="space-y-2">
        <Label htmlFor="companyName">Company Name</Label>
        <Input id="companyName" value={form.companyName} onChange={e => setForm(f => ({ ...f, companyName: e.target.value }))} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="industry">Industry</Label>
        <Select value={form.industry} onValueChange={value => setForm(f => ({ ...f, industry: value }))}>
          <SelectTrigger>
            <SelectValue placeholder="Select industry" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="it">Information Technology</SelectItem>
            <SelectItem value="finance">Finance & Banking</SelectItem>
            <SelectItem value="manufacturing">Manufacturing</SelectItem>
            <SelectItem value="consulting">Consulting</SelectItem>
            <SelectItem value="healthcare">Healthcare</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="contactPerson">Contact Person</Label>
        <Input id="contactPerson" value={form.contactPerson} onChange={e => setForm(f => ({ ...f, contactPerson: e.target.value }))} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="companyEmail">Email</Label>
        <Input id="companyEmail" type="email" value={form.companyEmail} onChange={e => setForm(f => ({ ...f, companyEmail: e.target.value }))} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="companyPhone">Phone Number</Label>
        <Input id="companyPhone" value={form.companyPhone} onChange={e => setForm(f => ({ ...f, companyPhone: e.target.value }))} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="companyPassword">Password</Label>
        <Input id="companyPassword" type="password" value={form.companyPassword} onChange={e => setForm(f => ({ ...f, companyPassword: e.target.value }))} />
      </div>
      <Badge variant="outline" className="w-full justify-center py-2">
        Admin approval required
      </Badge>
      <Button className="w-full" size="lg" type="submit" disabled={loading}>
        {loading ? "Registering..." : "Register as Company"}
      </Button>
    </form>
  );
}
