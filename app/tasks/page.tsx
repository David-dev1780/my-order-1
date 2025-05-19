"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ArrowLeft,
  Bell,
  BookOpen,
  Calendar,
  Check,
  CheckCircle,
  Clock,
  Coins,
  Gift,
  Lock,
  RotateCw,
  Trophy,
  Users,
} from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"

export default function TasksPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [tokens, setTokens] = useState(50)
  const [dailyProgress, setDailyProgress] = useState(0)
  const [weeklyProgress, setWeeklyProgress] = useState(0)
  const [completedTasks, setCompletedTasks] = useState<string[]>([])
  const [verifyingTask, setVerifyingTask] = useState<string | null>(null)

  // Calculate progress on mount
  useEffect(() => {
    const dailyCompleted = dailyTasks.filter((task) => completedTasks.includes(task.id)).length
    const weeklyCompleted = weeklyTasks.filter((task) => completedTasks.includes(task.id)).length

    setDailyProgress(Math.round((dailyCompleted / dailyTasks.length) * 100))
    setWeeklyProgress(Math.round((weeklyCompleted / weeklyTasks.length) * 100))
  }, [completedTasks])

  // Handle task completion
  const handleCompleteTask = (taskId: string, taskType: string, reward: number) => {
    if (completedTasks.includes(taskId)) {
      toast({
        title: "Task Already Completed",
        description: "You've already completed this task today.",
      })
      return
    }

    // For tasks that need verification, simulate verification process
    if (taskType === "quiz" || taskType === "battle" || taskType === "current-affairs") {
      setVerifyingTask(taskId)

      // Simulate verification delay
      setTimeout(() => {
        setVerifyingTask(null)
        completeTask(taskId, reward)

        // Navigate to the appropriate section based on task type
        if (taskType === "quiz") {
          router.push("/exams/upsc-prelims")
        } else if (taskType === "battle") {
          router.push("/battle")
        } else if (taskType === "current-affairs") {
          router.push("/current-affairs")
        }
      }, 1500)
    } else {
      // For tasks that don't need verification
      completeTask(taskId, reward)
    }
  }

  // Complete task and award tokens
  const completeTask = (taskId: string, reward: number) => {
    setCompletedTasks((prev) => [...prev, taskId])
    setTokens((prev) => prev + reward)

    toast({
      title: "Task Completed!",
      description: `You earned ${reward} tokens.`,
    })
  }

  return (
    <div className="container mx-auto px-4 py-8 pb-20">
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="sm" onClick={() => router.push("/")} className="mr-2">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back
        </Button>
        <h1 className="text-2xl font-bold">Daily Tasks</h1>
        <div className="ml-auto">
          <Badge
            variant="outline"
            className="bg-gradient-to-r from-yellow-100 to-amber-100 dark:from-yellow-900/20 dark:to-amber-800/20 text-yellow-800 dark:text-yellow-300 border-yellow-200 dark:border-yellow-800/30 px-3 py-1"
          >
            <Coins className="h-3.5 w-3.5 mr-1 text-yellow-600 dark:text-yellow-400" />
            <span className="font-medium">{tokens} tokens</span>
          </Badge>
        </div>
      </div>

      {/* Progress Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <Card className="bg-gradient-to-br from-primary/10 to-primary/5">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Daily Progress</CardTitle>
            <CardDescription>Complete daily tasks to earn tokens</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progress</span>
                <span className="font-medium">{dailyProgress}%</span>
              </div>
              <Progress value={dailyProgress} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500/10 to-purple-500/5">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Weekly Progress</CardTitle>
            <CardDescription>Complete weekly tasks for bonus rewards</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progress</span>
                <span className="font-medium">{weeklyProgress}%</span>
              </div>
              <Progress value={weeklyProgress} className="h-2" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tasks Tabs */}
      <Tabs defaultValue="daily" className="mb-6">
        <TabsList className="grid grid-cols-2 w-full max-w-md mb-4">
          <TabsTrigger value="daily">Daily Tasks</TabsTrigger>
          <TabsTrigger value="weekly">Weekly Tasks</TabsTrigger>
        </TabsList>

        <TabsContent value="daily" className="space-y-4">
          {dailyTasks.map((task) => (
            <Card
              key={task.id}
              className={
                completedTasks.includes(task.id) ? "border-green-500/30 bg-green-50/50 dark:bg-green-900/10" : ""
              }
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className={`h-10 w-10 rounded-full flex items-center justify-center mr-3 ${task.iconBg}`}>
                      <task.icon className={`h-5 w-5 ${task.iconColor}`} />
                    </div>
                    <div>
                      <h3 className="font-medium">{task.title}</h3>
                      <p className="text-sm text-muted-foreground">{task.description}</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <Badge className="mb-2 bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300">
                      <Coins className="h-3 w-3 mr-1" />
                      {task.reward} tokens
                    </Badge>
                    {completedTasks.includes(task.id) ? (
                      <Button
                        variant="outline"
                        size="sm"
                        className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 border-green-200"
                        disabled
                      >
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Completed
                      </Button>
                    ) : verifyingTask === task.id ? (
                      <Button variant="outline" size="sm" disabled>
                        <RotateCw className="h-4 w-4 mr-1 animate-spin" />
                        Verifying...
                      </Button>
                    ) : (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleCompleteTask(task.id, task.type, task.reward)}
                      >
                        {task.buttonText}
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="weekly" className="space-y-4">
          {weeklyTasks.map((task) => (
            <Card
              key={task.id}
              className={
                completedTasks.includes(task.id) ? "border-green-500/30 bg-green-50/50 dark:bg-green-900/10" : ""
              }
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className={`h-10 w-10 rounded-full flex items-center justify-center mr-3 ${task.iconBg}`}>
                      <task.icon className={`h-5 w-5 ${task.iconColor}`} />
                    </div>
                    <div>
                      <h3 className="font-medium">{task.title}</h3>
                      <p className="text-sm text-muted-foreground">{task.description}</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <Badge className="mb-2 bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300">
                      <Coins className="h-3 w-3 mr-1" />
                      {task.reward} tokens
                    </Badge>
                    {completedTasks.includes(task.id) ? (
                      <Button
                        variant="outline"
                        size="sm"
                        className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 border-green-200"
                        disabled
                      >
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Completed
                      </Button>
                    ) : verifyingTask === task.id ? (
                      <Button variant="outline" size="sm" disabled>
                        <RotateCw className="h-4 w-4 mr-1 animate-spin" />
                        Verifying...
                      </Button>
                    ) : (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleCompleteTask(task.id, task.type, task.reward)}
                      >
                        {task.buttonText}
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>

      {/* Invite & Earn Section */}
      <Card className="mb-6 overflow-hidden border-none shadow-lg bg-gradient-to-r from-primary/90 to-purple-600 text-primary-foreground">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Gift className="h-5 w-5 mr-2" />
            Invite & Earn
          </CardTitle>
          <CardDescription className="text-primary-foreground/80">
            Invite your friends and earn tokens when they join
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 bg-white/10 rounded-lg">
            <h3 className="font-medium text-lg mb-2">Your Referral Code</h3>
            <div className="flex">
              <div className="bg-white/20 rounded-l-md p-3 flex-1 font-mono text-center">QUIZ2025</div>
              <Button variant="secondary" className="rounded-l-none">
                Copy
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="p-3 rounded-lg bg-white/10">
              <div className="text-2xl font-bold">50</div>
              <div className="text-xs text-primary-foreground/80">Tokens per Referral</div>
            </div>
            <div className="p-3 rounded-lg bg-white/10">
              <div className="text-2xl font-bold">3</div>
              <div className="text-xs text-primary-foreground/80">Friends Invited</div>
            </div>
            <div className="p-3 rounded-lg bg-white/10">
              <div className="text-2xl font-bold">150</div>
              <div className="text-xs text-primary-foreground/80">Tokens Earned</div>
            </div>
          </div>

          <Button variant="secondary" className="w-full">
            <Users className="h-4 w-4 mr-2" />
            Invite Friends
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

// Daily tasks data
const dailyTasks = [
  {
    id: "daily-quiz",
    title: "Complete a Daily Quiz",
    description: "Complete at least one quiz from any category",
    reward: 10,
    type: "quiz",
    icon: BookOpen,
    iconBg: "bg-blue-100 dark:bg-blue-900/30",
    iconColor: "text-blue-600 dark:text-blue-400",
    buttonText: "Start Quiz",
  },
  {
    id: "current-affairs",
    title: "Read Current Affairs",
    description: "Read at least 3 current affairs articles",
    reward: 5,
    type: "current-affairs",
    icon: Bell,
    iconBg: "bg-amber-100 dark:bg-amber-900/30",
    iconColor: "text-amber-600 dark:text-amber-400",
    buttonText: "Read Now",
  },
  {
    id: "battle-friend",
    title: "Battle with a Friend",
    description: "Complete a battle quiz with a friend",
    reward: 15,
    type: "battle",
    icon: Users,
    iconBg: "bg-purple-100 dark:bg-purple-900/30",
    iconColor: "text-purple-600 dark:text-purple-400",
    buttonText: "Start Battle",
  },
  {
    id: "login-streak",
    title: "Daily Login",
    description: "Log in to the app today",
    reward: 2,
    type: "login",
    icon: Check,
    iconBg: "bg-green-100 dark:bg-green-900/30",
    iconColor: "text-green-600 dark:text-green-400",
    buttonText: "Claim",
  },
  {
    id: "share-result",
    title: "Share Your Results",
    description: "Share a quiz result on social media",
    reward: 5,
    type: "share",
    icon: Gift,
    iconBg: "bg-pink-100 dark:bg-pink-900/30",
    iconColor: "text-pink-600 dark:text-pink-400",
    buttonText: "Share",
  },
]

// Weekly tasks data
const weeklyTasks = [
  {
    id: "weekly-streak",
    title: "7-Day Streak",
    description: "Log in for 7 consecutive days",
    reward: 25,
    type: "streak",
    icon: Calendar,
    iconBg: "bg-indigo-100 dark:bg-indigo-900/30",
    iconColor: "text-indigo-600 dark:text-indigo-400",
    buttonText: "Check Progress",
  },
  {
    id: "complete-10-quizzes",
    title: "Quiz Master",
    description: "Complete 10 quizzes this week",
    reward: 30,
    type: "quiz-count",
    icon: Trophy,
    iconBg: "bg-yellow-100 dark:bg-yellow-900/30",
    iconColor: "text-yellow-600 dark:text-yellow-400",
    buttonText: "Track Progress",
  },
  {
    id: "win-3-battles",
    title: "Battle Champion",
    description: "Win 3 battles this week",
    reward: 40,
    type: "battle-wins",
    icon: Trophy,
    iconBg: "bg-red-100 dark:bg-red-900/30",
    iconColor: "text-red-600 dark:text-red-400",
    buttonText: "Start Battle",
  },
  {
    id: "premium-content",
    title: "Premium Content",
    description: "Unlock a premium current affairs article",
    reward: 20,
    type: "premium",
    icon: Lock,
    iconBg: "bg-amber-100 dark:bg-amber-900/30",
    iconColor: "text-amber-600 dark:text-amber-400",
    buttonText: "Unlock Content",
  },
  {
    id: "study-time",
    title: "Study Champion",
    description: "Spend at least 2 hours in the app this week",
    reward: 15,
    type: "time",
    icon: Clock,
    iconBg: "bg-cyan-100 dark:bg-cyan-900/30",
    iconColor: "text-cyan-600 dark:text-cyan-400",
    buttonText: "Check Time",
  },
]
