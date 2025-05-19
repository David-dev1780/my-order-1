"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, BookOpen, CheckCircle, Clock, LineChart } from "lucide-react"
import { Progress } from "@/components/ui/progress"

export default function ExamSubjectsPage({ params }: { params: { examId: string } }) {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("all")

  // Get exam data based on examId
  const exam = exams.find((e) => e.id === params.examId) || exams[0]

  // Get subjects for this exam
  const examSubjects = subjects.filter((subject) => subject.examId === params.examId)

  return (
    <div className="container mx-auto px-4 py-8 pb-20">
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="sm" onClick={() => router.push(`/exams/${params.examId}`)} className="mr-2">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back
        </Button>
        <h1 className="text-2xl font-bold">{exam.name} Subjects</h1>
      </div>

      {/* Exam Banner */}
      <div className="relative w-full h-48 rounded-xl overflow-hidden mb-6 shadow-lg">
        <img src={exam.image || "/placeholder.svg"} alt={exam.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary/30 flex flex-col justify-end p-6">
          <h2 className="text-white text-2xl font-bold mb-2">{exam.name}</h2>
          <p className="text-white/90">{exam.description}</p>
          <div className="flex mt-2 gap-2">
            <Badge variant="secondary" className="bg-white/20 text-white">
              {examSubjects.length} Subjects
            </Badge>
            <Badge variant="secondary" className="bg-white/20 text-white">
              {exam.questions} Questions
            </Badge>
          </div>
        </div>
      </div>

      {/* Overall Progress */}
      <Card className="mb-6 overflow-hidden border-none shadow-lg bg-gradient-to-r from-primary/90 to-primary text-primary-foreground">
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 className="text-xl font-bold">Overall Progress</h3>
              <p className="text-primary-foreground/80">Your progress across all subjects</p>
            </div>
            <div className="h-16 w-16 rounded-full bg-primary-foreground/20 backdrop-blur-sm flex flex-col items-center justify-center border-4 border-primary-foreground">
              <span className="text-2xl font-bold">65%</span>
            </div>
          </div>
          <Progress value={65} className="h-2 bg-primary-foreground/30" indicatorClassName="bg-primary-foreground" />
          <div className="flex justify-between mt-2 text-sm text-primary-foreground/80">
            <span>Beginner</span>
            <span>Intermediate</span>
            <span>Advanced</span>
          </div>
        </CardContent>
      </Card>

      {/* Subject Tabs */}
      <div className="flex overflow-x-auto pb-2 mb-4 gap-2 scrollbar-hide">
        <Button
          variant={activeTab === "all" ? "default" : "outline"}
          className="rounded-full"
          onClick={() => setActiveTab("all")}
        >
          All Subjects
        </Button>
        <Button
          variant={activeTab === "progress" ? "default" : "outline"}
          className="rounded-full"
          onClick={() => setActiveTab("progress")}
        >
          In Progress
        </Button>
        <Button
          variant={activeTab === "completed" ? "default" : "outline"}
          className="rounded-full"
          onClick={() => setActiveTab("completed")}
        >
          Completed
        </Button>
        <Button
          variant={activeTab === "not-started" ? "default" : "outline"}
          className="rounded-full"
          onClick={() => setActiveTab("not-started")}
        >
          Not Started
        </Button>
      </div>

      {/* Subjects Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {examSubjects
          .filter((subject) => {
            if (activeTab === "all") return true
            if (activeTab === "progress") return subject.progress > 0 && subject.progress < 100
            if (activeTab === "completed") return subject.progress === 100
            if (activeTab === "not-started") return subject.progress === 0
            return true
          })
          .map((subject) => (
            <Card
              key={subject.id}
              className="overflow-hidden hover:shadow-lg transition-all cursor-pointer"
              onClick={() => router.push(`/exams/${params.examId}/subjects/${subject.id}`)}
            >
              <div className="h-32 relative">
                <img
                  src={subject.image || "/placeholder.svg"}
                  alt={subject.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-3 text-white">
                  <h3 className="font-bold text-lg">{subject.name}</h3>
                </div>
                {subject.progress === 100 && (
                  <div className="absolute top-2 right-2">
                    <Badge className="bg-green-500">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Completed
                    </Badge>
                  </div>
                )}
              </div>
              <CardContent className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center">
                    <BookOpen className="h-4 w-4 mr-1 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">{subject.topics} topics</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">{subject.duration} min</span>
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>Progress</span>
                    <span className="font-medium">{subject.progress}%</span>
                  </div>
                  <Progress value={subject.progress} className="h-2" />
                </div>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <Button variant="outline" className="w-full">
                  {subject.progress === 0 ? "Start Learning" : subject.progress === 100 ? "Review" : "Continue"}
                </Button>
              </CardFooter>
            </Card>
          ))}
      </div>

      {/* Stats Section */}
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Your Performance</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card className="shadow-md bg-gradient-to-br from-blue-500/10 to-blue-600/5">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Accuracy</p>
                  <p className="text-2xl font-bold">78%</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center">
                  <LineChart className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-md bg-gradient-to-br from-green-500/10 to-green-600/5">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Completed Topics</p>
                  <p className="text-2xl font-bold">24/56</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center">
                  <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-md bg-gradient-to-br from-purple-500/10 to-purple-600/5">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Time Spent</p>
                  <p className="text-2xl font-bold">12h 45m</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center">
                  <Clock className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

const exams = [
  {
    id: "upsc-prelims",
    name: "UPSC Prelims",
    description: "Civil Services Preliminary Examination",
    questions: 100,
    image: "/placeholder.svg?height=200&width=400&text=UPSC+Prelims",
  },
  {
    id: "mpsc-prelims",
    name: "MPSC Prelims",
    description: "Maharashtra Public Service Commission Preliminary Exam",
    questions: 80,
    image: "/placeholder.svg?height=200&width=400&text=MPSC+Prelims",
  },
  {
    id: "ssc-cgl",
    name: "SSC CGL",
    description: "Staff Selection Commission Combined Graduate Level",
    questions: 100,
    image: "/placeholder.svg?height=200&width=400&text=SSC+CGL",
  },
]

const subjects = [
  {
    id: "general-studies",
    examId: "upsc-prelims",
    name: "General Studies",
    topics: 15,
    duration: 120,
    progress: 75,
    image: "/placeholder.svg?height=200&width=400&text=General+Studies",
  },
  {
    id: "csat",
    examId: "upsc-prelims",
    name: "CSAT",
    topics: 10,
    duration: 90,
    progress: 40,
    image: "/placeholder.svg?height=200&width=400&text=CSAT",
  },
  {
    id: "indian-history",
    examId: "upsc-prelims",
    name: "Indian History",
    topics: 12,
    duration: 60,
    progress: 100,
    image: "/placeholder.svg?height=200&width=400&text=Indian+History",
  },
  {
    id: "geography",
    examId: "upsc-prelims",
    name: "Geography",
    topics: 8,
    duration: 45,
    progress: 60,
    image: "/placeholder.svg?height=200&width=400&text=Geography",
  },
  {
    id: "polity",
    examId: "upsc-prelims",
    name: "Indian Polity",
    topics: 10,
    duration: 60,
    progress: 0,
    image: "/placeholder.svg?height=200&width=400&text=Indian+Polity",
  },
  {
    id: "economy",
    examId: "upsc-prelims",
    name: "Economy",
    topics: 9,
    duration: 50,
    progress: 20,
    image: "/placeholder.svg?height=200&width=400&text=Economy",
  },
  {
    id: "maharashtra-history",
    examId: "mpsc-prelims",
    name: "Maharashtra History",
    topics: 8,
    duration: 45,
    progress: 90,
    image: "/placeholder.svg?height=200&width=400&text=Maharashtra+History",
  },
  {
    id: "marathi-language",
    examId: "mpsc-prelims",
    name: "Marathi Language",
    topics: 6,
    duration: 30,
    progress: 50,
    image: "/placeholder.svg?height=200&width=400&text=Marathi+Language",
  },
  {
    id: "reasoning",
    examId: "ssc-cgl",
    name: "Reasoning",
    topics: 12,
    duration: 60,
    progress: 65,
    image: "/placeholder.svg?height=200&width=400&text=Reasoning",
  },
  {
    id: "quantitative-aptitude",
    examId: "ssc-cgl",
    name: "Quantitative Aptitude",
    topics: 15,
    duration: 75,
    progress: 30,
    image: "/placeholder.svg?height=200&width=400&text=Quantitative+Aptitude",
  },
  {
    id: "english",
    examId: "ssc-cgl",
    name: "English",
    topics: 10,
    duration: 45,
    progress: 80,
    image: "/placeholder.svg?height=200&width=400&text=English",
  },
]
