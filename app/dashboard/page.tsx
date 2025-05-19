"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Bell, BookOpen, Coins, Gift, LineChart, Trophy, Users, X } from "lucide-react"
import { Progress } from "@/components/ui/progress"

export default function Dashboard() {
  const [showAd, setShowAd] = useState(true)
  const [activeExams, setActiveExams] = useState(3)
  const [completedToday, setCompletedToday] = useState(0)
  const [tokens, setTokens] = useState(156)
  const [streakDays, setStreakDays] = useState(5)
  const router = useRouter()

  // Simulate activity for demo purposes
  useEffect(() => {
    const interval = setInterval(() => {
      setCompletedToday((prev) => Math.min(prev + 1, 12))
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  // Navigate to current affairs in TikTok style
  const goToCurrentAffairs = () => {
    router.push("/current-affairs")
  }

  return (
    <div className="container mx-auto px-4 pb-20">
      {showAd && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50">
          <Card className="w-full max-w-md mx-auto border-2 border-yellow-500 animate-pulse relative">
            <Button variant="ghost" size="icon" className="absolute top-2 right-2" onClick={() => setShowAd(false)}>
              <X className="h-4 w-4" />
            </Button>
            <CardHeader>
              <CardTitle className="text-center">Advertisement</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <div className="w-full h-40 bg-muted rounded-lg flex items-center justify-center mb-4 overflow-hidden">
                <img
                  src="/placeholder.svg?height=160&width=400"
                  alt="Advertisement"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-center text-muted-foreground mb-4">This is a sponsored message</p>
              <Button onClick={() => setShowAd(false)}>Continue to App</Button>
            </CardContent>
          </Card>
        </div>
      )}

      <div className="flex flex-col py-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              QuizMaster
            </h1>
            <p className="text-muted-foreground">Welcome back, Rahul!</p>
          </div>
          <div className="flex items-center gap-3">
            <Badge
              variant="outline"
              className="bg-gradient-to-r from-yellow-100 to-amber-100 dark:from-yellow-900/20 dark:to-amber-800/20 text-yellow-800 dark:text-yellow-300 border-yellow-200 dark:border-yellow-800/30 px-3 py-1"
            >
              <Coins className="h-3.5 w-3.5 mr-1 text-yellow-600 dark:text-yellow-400" />
              <span className="font-medium">{tokens} tokens</span>
            </Badge>
            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center text-primary-foreground">
              <span className="font-medium">RK</span>
            </div>
          </div>
        </div>

        {/* Daily Streak */}
        <Card className="mb-6 overflow-hidden border-none shadow-lg bg-gradient-to-r from-primary/90 to-purple-600 text-primary-foreground">
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="text-xl font-bold">Daily Streak</h3>
                <p className="text-primary-foreground/80">Keep learning to maintain your streak!</p>
              </div>
              <div className="h-16 w-16 rounded-full bg-primary-foreground/20 backdrop-blur-sm flex flex-col items-center justify-center border-4 border-primary-foreground">
                <span className="text-2xl font-bold">{streakDays}</span>
                <span className="text-xs">days</span>
              </div>
            </div>
            <div className="flex gap-2 mb-2">
              {Array.from({ length: 7 }).map((_, i) => (
                <div
                  key={i}
                  className={`flex-1 h-2 rounded-full ${i < streakDays ? "bg-primary-foreground" : "bg-primary-foreground/30"}`}
                ></div>
              ))}
            </div>
            <div className="flex justify-between text-xs text-primary-foreground/80">
              <span>Mon</span>
              <span>Tue</span>
              <span>Wed</span>
              <span>Thu</span>
              <span>Fri</span>
              <span>Sat</span>
              <span>Sun</span>
            </div>
          </CardContent>
        </Card>

        {/* Daily Tasks Card */}
        <Card className="mb-6 overflow-hidden border-none shadow-lg bg-gradient-to-r from-green-500/90 to-emerald-600 text-white">
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="text-xl font-bold">Daily Tasks</h3>
                <p className="text-white/80">Complete tasks to earn tokens</p>
              </div>
              <Button variant="secondary" onClick={() => router.push("/tasks")}>
                <Gift className="h-4 w-4 mr-2" />
                View All
              </Button>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-2 bg-white/10 rounded-lg">
                <div className="flex items-center">
                  <BookOpen className="h-5 w-5 mr-2" />
                  <span>Complete a Quiz</span>
                </div>
                <Badge className="bg-white/20 text-white">+10 tokens</Badge>
              </div>
              <div className="flex justify-between items-center p-2 bg-white/10 rounded-lg">
                <div className="flex items-center">
                  <Bell className="h-5 w-5 mr-2" />
                  <span>Read Current Affairs</span>
                </div>
                <Badge className="bg-white/20 text-white">+5 tokens</Badge>
              </div>
              <div className="flex justify-between items-center p-2 bg-white/10 rounded-lg">
                <div className="flex items-center">
                  <Users className="h-5 w-5 mr-2" />
                  <span>Invite a Friend</span>
                </div>
                <Badge className="bg-white/20 text-white">+50 tokens</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <Card className="shadow-md hover:shadow-lg transition-shadow bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20">
            <CardContent className="p-4">
              <div className="flex flex-col">
                <span className="text-muted-foreground text-sm">Quizzes Completed</span>
                <div className="flex items-end justify-between">
                  <span className="text-3xl font-bold">42</span>
                  <Badge
                    variant="outline"
                    className="bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400"
                  >
                    +3 today
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-md hover:shadow-lg transition-shadow bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20">
            <CardContent className="p-4">
              <div className="flex flex-col">
                <span className="text-muted-foreground text-sm">Accuracy</span>
                <div className="flex items-end justify-between">
                  <span className="text-3xl font-bold">78%</span>
                  <LineChart className="h-5 w-5 text-green-600 dark:text-green-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-md hover:shadow-lg transition-shadow bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-900/20 dark:to-amber-800/20">
            <CardContent className="p-4">
              <div className="flex flex-col">
                <span className="text-muted-foreground text-sm">Battle Wins</span>
                <div className="flex items-end justify-between">
                  <span className="text-3xl font-bold">8</span>
                  <Trophy className="h-5 w-5 text-amber-500 dark:text-amber-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-md hover:shadow-lg transition-shadow bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20">
            <CardContent className="p-4">
              <div className="flex flex-col">
                <span className="text-muted-foreground text-sm">Rank</span>
                <div className="flex items-end justify-between">
                  <span className="text-3xl font-bold">#24</span>
                  <Badge variant="outline" className="bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400">
                    Top 5%
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Today's Activity */}
        <Card className="mb-6 shadow-md bg-gradient-to-br from-background to-muted/30">
          <CardHeader className="pb-2">
            <CardTitle>Today's Activity</CardTitle>
            <CardDescription>Your learning progress for today</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Daily Goal (12 questions)</span>
                  <span className="font-medium">{completedToday}/12 completed</span>
                </div>
                <Progress value={(completedToday / 12) * 100} className="h-2" />
              </div>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="flex flex-col">
                  <span className="text-muted-foreground text-sm">Active Exams</span>
                  <span className="font-medium">{activeExams} exams</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-muted-foreground text-sm">Time Spent</span>
                  <span className="font-medium">1h 24m</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Current Affairs Card */}
        <Card
          className="mb-6 overflow-hidden border-none shadow-lg cursor-pointer hover:shadow-xl transition-shadow"
          onClick={goToCurrentAffairs}
        >
          <div className="relative h-64">
            <img
              src="/placeholder.svg?height=400&width=800&text=Current+Affairs"
              alt="Current Affairs"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>
            <div className="absolute inset-0 flex flex-col justify-end p-6">
              <Badge className="self-start mb-2 bg-primary">Latest News</Badge>
              <h2 className="text-white text-2xl font-bold mb-2">Current Affairs</h2>
              <p className="text-white/80 mb-4">Stay updated with the latest news and events from around the world</p>
              <Button className="self-start bg-white text-black hover:bg-white/90">
                <Bell className="h-4 w-4 mr-2" />
                View TikTok Style
              </Button>
            </div>
          </div>
        </Card>

        {/* Exam Categories */}
        <h2 className="text-xl font-bold mb-4">Exam Categories</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
          {examCategories.map((category) => (
            <Card
              key={category.id}
              className="overflow-hidden shadow-md hover:shadow-lg transition-all border-none cursor-pointer"
              onClick={() => router.push(`/subjects/${category.id}`)}
            >
              <div className="h-32 bg-muted relative">
                <img
                  src={category.image || "/placeholder.svg"}
                  alt={category.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-3 text-white">
                  <h3 className="font-bold text-lg">{category.name}</h3>
                  <p className="text-sm text-white/80">{category.exams} exams</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Button
            className="h-auto py-4 bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 border-none shadow-md"
            onClick={() => router.push("/exams/upsc-prelims")}
          >
            <div className="flex flex-col items-center">
              <BookOpen className="h-6 w-6 mb-2" />
              <span>Start Quiz</span>
            </div>
          </Button>

          <Button
            className="h-auto py-4 bg-gradient-to-br from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 border-none shadow-md"
            onClick={() => router.push("/battle")}
          >
            <div className="flex flex-col items-center">
              <Users className="h-6 w-6 mb-2" />
              <span>Battle Friends</span>
            </div>
          </Button>

          <Button
            className="h-auto py-4 bg-gradient-to-br from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 border-none shadow-md"
            onClick={goToCurrentAffairs}
          >
            <div className="flex flex-col items-center">
              <Bell className="h-6 w-6 mb-2" />
              <span>Current Affairs</span>
            </div>
          </Button>

          <Button
            className="h-auto py-4 bg-gradient-to-br from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 border-none shadow-md"
            onClick={() => router.push("/invite")}
          >
            <div className="flex flex-col items-center">
              <Gift className="h-6 w-6 mb-2" />
              <span>Invite & Earn</span>
            </div>
          </Button>
        </div>
      </div>
    </div>
  )
}

const examCategories = [
  {
    id: "civil-services",
    name: "Civil Services",
    exams: 5,
    image: "/placeholder.svg?height=200&width=400&text=Civil+Services",
  },
  {
    id: "banking",
    name: "Banking & Insurance",
    exams: 8,
    image: "/placeholder.svg?height=200&width=400&text=Banking",
  },
  {
    id: "engineering",
    name: "Engineering Entrance",
    exams: 6,
    image: "/placeholder.svg?height=200&width=400&text=Engineering",
  },
  {
    id: "medical",
    name: "Medical Entrance",
    exams: 4,
    image: "/placeholder.svg?height=200&width=400&text=Medical",
  },
  {
    id: "defence",
    name: "Defence Services",
    exams: 7,
    image: "/placeholder.svg?height=200&width=400&text=Defence",
  },
  {
    id: "teaching",
    name: "Teaching Exams",
    exams: 3,
    image: "/placeholder.svg?height=200&width=400&text=Teaching",
  },
]
