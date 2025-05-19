"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { User, Settings, Award, Clock, BookOpen, LogOut, ChevronRight, Edit, Camera, Shield, Bell } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"

export default function ProfilePage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("overview")

  const handleLogout = () => {
    // Clear user data and redirect to login
    localStorage.removeItem("user_logged_in")
    router.push("/login")
  }

  return (
    <div className="container mx-auto px-4 pb-20 pt-6">
      {/* Profile Header */}
      <div className="flex flex-col items-center mb-6">
        <div className="relative">
          <div className="h-24 w-24 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center text-primary-foreground text-3xl font-bold">
            RK
          </div>
          <button className="absolute bottom-0 right-0 bg-primary text-white p-1.5 rounded-full">
            <Camera className="h-4 w-4" />
          </button>
        </div>
        <h1 className="text-2xl font-bold mt-3">Rahul Kumar</h1>
        <p className="text-muted-foreground">rahul.kumar@example.com</p>
        <div className="flex items-center gap-2 mt-1">
          <Badge variant="outline" className="bg-green-50 text-green-700">
            UPSC Aspirant
          </Badge>
          <Badge variant="outline" className="bg-blue-50 text-blue-700">
            Premium
          </Badge>
        </div>
      </div>

      {/* Profile Tabs */}
      <Tabs defaultValue="overview" className="mb-6" onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-4 mb-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <Card className="mb-6">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Study Progress</CardTitle>
              <CardDescription>Your overall progress across all exams</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>UPSC Prelims</span>
                    <span className="font-medium">65%</span>
                  </div>
                  <Progress value={65} className="h-2" />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>UPSC Mains</span>
                    <span className="font-medium">42%</span>
                  </div>
                  <Progress value={42} className="h-2" />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Current Affairs</span>
                    <span className="font-medium">78%</span>
                  </div>
                  <Progress value={78} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <BookOpen className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Quizzes Completed</p>
                    <p className="text-xl font-bold">42</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center">
                    <Award className="h-5 w-5 text-amber-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Battle Wins</p>
                    <p className="text-xl font-bold">8</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Account Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <User className="h-5 w-5 text-gray-500" />
                  <div>
                    <p className="text-sm text-muted-foreground">Account Type</p>
                    <p className="font-medium">Premium</p>
                  </div>
                </div>
                <Badge>Active</Badge>
              </div>

              <Separator />

              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-gray-500" />
                  <div>
                    <p className="text-sm text-muted-foreground">Member Since</p>
                    <p className="font-medium">June 2023</p>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <Shield className="h-5 w-5 text-gray-500" />
                  <div>
                    <p className="text-sm text-muted-foreground">Privacy Settings</p>
                    <p className="font-medium">Public Profile</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  <Edit className="h-4 w-4 mr-1" />
                  Edit
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activity">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Your learning activity in the past 30 days</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    date: "Today",
                    activity: "Completed UPSC Prelims Mock Test",
                    time: "2 hours ago",
                    icon: BookOpen,
                    color: "blue",
                  },
                  {
                    date: "Today",
                    activity: "Read 5 Current Affairs Articles",
                    time: "4 hours ago",
                    icon: Clock,
                    color: "green",
                  },
                  {
                    date: "Yesterday",
                    activity: "Won Battle against Amit",
                    time: "1 day ago",
                    icon: Award,
                    color: "amber",
                  },
                  {
                    date: "May 15, 2023",
                    activity: "Completed Geography Quiz",
                    time: "2 days ago",
                    icon: BookOpen,
                    color: "purple",
                  },
                  {
                    date: "May 14, 2023",
                    activity: "Earned 50 Tokens",
                    time: "3 days ago",
                    icon: Award,
                    color: "yellow",
                  },
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div
                      className={`h-10 w-10 rounded-full bg-${item.color}-100 flex items-center justify-center mt-1`}
                    >
                      <item.icon className={`h-5 w-5 text-${item.color}-600`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <p className="font-medium">{item.activity}</p>
                        <p className="text-sm text-muted-foreground">{item.time}</p>
                      </div>
                      <p className="text-sm text-muted-foreground">{item.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="achievements">
          <Card>
            <CardHeader>
              <CardTitle>Your Achievements</CardTitle>
              <CardDescription>Badges and rewards you've earned</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {[
                  { name: "Quiz Master", description: "Complete 50 quizzes", progress: 84, icon: BookOpen },
                  { name: "Current Affairs Pro", description: "Read 100 articles", progress: 65, icon: Clock },
                  { name: "Battle Champion", description: "Win 20 battles", progress: 40, icon: Award },
                  { name: "Perfect Score", description: "Get 100% in 5 quizzes", progress: 60, icon: Award },
                  { name: "Daily Streak", description: "30 days continuous usage", progress: 70, icon: Clock },
                  {
                    name: "Subject Expert",
                    description: "Master all topics in a subject",
                    progress: 30,
                    icon: BookOpen,
                  },
                ].map((badge, index) => (
                  <Card key={index} className="overflow-hidden">
                    <div
                      className={`h-2 bg-gradient-to-r from-primary to-purple-600`}
                      style={{ width: `${badge.progress}%` }}
                    ></div>
                    <CardContent className="p-4">
                      <div className="flex flex-col items-center text-center">
                        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                          <badge.icon className="h-6 w-6 text-primary" />
                        </div>
                        <h3 className="font-medium text-sm">{badge.name}</h3>
                        <p className="text-xs text-muted-foreground mt-1">{badge.description}</p>
                        <p className="text-xs font-medium mt-2">{badge.progress}% complete</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
              <CardDescription>Manage your account preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                {[
                  { icon: User, title: "Personal Information", description: "Update your name and contact details" },
                  { icon: Settings, title: "Preferences", description: "Customize your learning experience" },
                  { icon: Bell, title: "Notifications", description: "Manage your notification settings" },
                  { icon: Shield, title: "Privacy & Security", description: "Control your privacy settings" },
                  { icon: BookOpen, title: "Study Preferences", description: "Set your study goals and preferences" },
                ].map((setting, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 rounded-lg border hover:bg-gray-50 cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
                        <setting.icon className="h-5 w-5 text-gray-600" />
                      </div>
                      <div>
                        <p className="font-medium">{setting.title}</p>
                        <p className="text-sm text-muted-foreground">{setting.description}</p>
                      </div>
                    </div>
                    <ChevronRight className="h-5 w-5 text-gray-400" />
                  </div>
                ))}

                <Button variant="destructive" className="w-full mt-4" onClick={handleLogout}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Log Out
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
