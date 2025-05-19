"use client"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, BookOpen, CheckCircle, Clock, FileText, Play, Star } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function SubjectDetailPage({ params }: { params: { examId: string; subjectId: string } }) {
  const router = useRouter()

  // Get subject data
  const subject = subjects.find((s) => s.id === params.subjectId) || subjects[0]

  // Get exam data
  const exam = exams.find((e) => e.id === params.examId) || exams[0]

  // Get topics for this subject
  const subjectTopics = topics.filter((topic) => topic.subjectId === params.subjectId)

  return (
    <div className="container mx-auto px-4 py-8 pb-20">
      <div className="flex items-center mb-6">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => router.push(`/exams/${params.examId}/subjects`)}
          className="mr-2"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back
        </Button>
        <h1 className="text-2xl font-bold">{subject.name}</h1>
      </div>

      {/* Subject Banner */}
      <div className="relative w-full h-48 rounded-xl overflow-hidden mb-6 shadow-lg">
        <img src={subject.image || "/placeholder.svg"} alt={subject.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/80 to-blue-600/50 flex flex-col justify-end p-6">
          <div className="flex items-center mb-2">
            <Badge variant="secondary" className="bg-white/20 text-white mr-2">
              {exam.name}
            </Badge>
            <Badge variant="secondary" className="bg-white/20 text-white">
              {subject.topics} topics
            </Badge>
          </div>
          <h2 className="text-white text-2xl font-bold mb-1">{subject.name}</h2>
          <p className="text-white/90">Master the concepts and ace your exam</p>
        </div>
      </div>

      {/* Progress Card */}
      <Card className="mb-6 overflow-hidden border-none shadow-lg bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 className="text-xl font-bold">Your Progress</h3>
              <p className="text-white/80">Keep going, you're doing great!</p>
            </div>
            <div className="h-16 w-16 rounded-full bg-white/20 backdrop-blur-sm flex flex-col items-center justify-center border-4 border-white/30">
              <span className="text-2xl font-bold">{subject.progress}%</span>
            </div>
          </div>
          <Progress value={subject.progress} className="h-2 bg-white/30" indicatorClassName="bg-white" />
          <div className="flex justify-between mt-2 text-sm text-white/80">
            <span>0%</span>
            <span>50%</span>
            <span>100%</span>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        <Button className="h-auto py-4 bg-gradient-to-br from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 border-none shadow-md">
          <div className="flex flex-col items-center">
            <Play className="h-6 w-6 mb-2" />
            <span>Start Learning</span>
          </div>
        </Button>

        <Button
          variant="outline"
          className="h-auto py-4 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 hover:from-blue-100 hover:to-blue-200 dark:hover:from-blue-800/30 dark:hover:to-blue-700/30"
        >
          <div className="flex flex-col items-center">
            <FileText className="h-6 w-6 mb-2" />
            <span>Practice Tests</span>
          </div>
        </Button>

        <Button
          variant="outline"
          className="h-auto py-4 bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-900/20 dark:to-amber-800/20 hover:from-amber-100 hover:to-amber-200 dark:hover:from-amber-800/30 dark:hover:to-amber-700/30"
        >
          <div className="flex flex-col items-center">
            <Star className="h-6 w-6 mb-2 text-amber-500" />
            <span>Bookmarks</span>
          </div>
        </Button>

        <Button
          variant="outline"
          className="h-auto py-4 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 hover:from-purple-100 hover:to-purple-200 dark:hover:from-purple-800/30 dark:hover:to-purple-700/30"
        >
          <div className="flex flex-col items-center">
            <Clock className="h-6 w-6 mb-2 text-purple-500" />
            <span>Revision</span>
          </div>
        </Button>
      </div>

      {/* Topics List */}
      <Tabs defaultValue="all" className="mb-6">
        <TabsList className="grid grid-cols-3 w-full max-w-md mb-4">
          <TabsTrigger value="all">All Topics</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {subjectTopics.map((topic, index) => (
            <Card
              key={topic.id}
              className={`overflow-hidden transition-all hover:shadow-md ${topic.completed ? "border-green-200 dark:border-green-900" : ""}`}
            >
              <div className="flex flex-col sm:flex-row">
                <div className="sm:w-1/4 h-32 sm:h-auto bg-muted">
                  <img
                    src={topic.image || "/placeholder.svg"}
                    alt={topic.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <div className="flex items-center">
                        <h3 className="font-bold text-lg">
                          {index + 1}. {topic.name}
                        </h3>
                        {topic.completed && (
                          <Badge className="ml-2 bg-green-500">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Completed
                          </Badge>
                        )}
                      </div>
                      <p className="text-muted-foreground text-sm mt-1">{topic.description}</p>
                    </div>
                    <Badge variant="outline">{topic.duration} min</Badge>
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <BookOpen className="h-4 w-4 mr-1" />
                      {topic.questions} questions
                    </div>
                    <Button size="sm" variant={topic.completed ? "outline" : "default"}>
                      {topic.completed ? "Review" : "Start"}
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          {subjectTopics
            .filter((topic) => topic.completed)
            .map((topic, index) => (
              <Card
                key={topic.id}
                className="overflow-hidden transition-all hover:shadow-md border-green-200 dark:border-green-900"
              >
                <div className="flex flex-col sm:flex-row">
                  <div className="sm:w-1/4 h-32 sm:h-auto bg-muted">
                    <img
                      src={topic.image || "/placeholder.svg"}
                      alt={topic.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <div className="flex items-center">
                          <h3 className="font-bold text-lg">
                            {index + 1}. {topic.name}
                          </h3>
                          <Badge className="ml-2 bg-green-500">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Completed
                          </Badge>
                        </div>
                        <p className="text-muted-foreground text-sm mt-1">{topic.description}</p>
                      </div>
                      <Badge variant="outline">{topic.duration} min</Badge>
                    </div>
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <BookOpen className="h-4 w-4 mr-1" />
                        {topic.questions} questions
                      </div>
                      <Button size="sm" variant="outline">
                        Review
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
        </TabsContent>

        <TabsContent value="pending" className="space-y-4">
          {subjectTopics
            .filter((topic) => !topic.completed)
            .map((topic, index) => (
              <Card key={topic.id} className="overflow-hidden transition-all hover:shadow-md">
                <div className="flex flex-col sm:flex-row">
                  <div className="sm:w-1/4 h-32 sm:h-auto bg-muted">
                    <img
                      src={topic.image || "/placeholder.svg"}
                      alt={topic.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-bold text-lg">
                          {index + 1}. {topic.name}
                        </h3>
                        <p className="text-muted-foreground text-sm mt-1">{topic.description}</p>
                      </div>
                      <Badge variant="outline">{topic.duration} min</Badge>
                    </div>
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <BookOpen className="h-4 w-4 mr-1" />
                        {topic.questions} questions
                      </div>
                      <Button size="sm">Start</Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
        </TabsContent>
      </Tabs>
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
]

const topics = [
  {
    id: "ancient-india",
    subjectId: "indian-history",
    name: "Ancient India",
    description: "Study of Indian history from prehistoric times to the 6th century CE",
    duration: 30,
    questions: 25,
    completed: true,
    image: "/placeholder.svg?height=200&width=400&text=Ancient+India",
  },
  {
    id: "medieval-india",
    subjectId: "indian-history",
    name: "Medieval India",
    description: "Study of Indian history from the 7th century to the 18th century",
    duration: 25,
    questions: 20,
    completed: true,
    image: "/placeholder.svg?height=200&width=400&text=Medieval+India",
  },
  {
    id: "modern-india",
    subjectId: "indian-history",
    name: "Modern India",
    description: "Study of Indian history from the 18th century to independence",
    duration: 35,
    questions: 30,
    completed: false,
    image: "/placeholder.svg?height=200&width=400&text=Modern+India",
  },
  {
    id: "indian-national-movement",
    subjectId: "indian-history",
    name: "Indian National Movement",
    description: "Study of the Indian independence movement and freedom struggle",
    duration: 40,
    questions: 35,
    completed: false,
    image: "/placeholder.svg?height=200&width=400&text=National+Movement",
  },
  {
    id: "physical-geography",
    subjectId: "geography",
    name: "Physical Geography",
    description: "Study of natural features of the Earth's surface",
    duration: 30,
    questions: 25,
    completed: true,
    image: "/placeholder.svg?height=200&width=400&text=Physical+Geography",
  },
  {
    id: "indian-geography",
    subjectId: "geography",
    name: "Indian Geography",
    description: "Study of geographical features of India",
    duration: 25,
    questions: 20,
    completed: true,
    image: "/placeholder.svg?height=200&width=400&text=Indian+Geography",
  },
  {
    id: "world-geography",
    subjectId: "geography",
    name: "World Geography",
    description: "Study of geographical features around the world",
    duration: 20,
    questions: 15,
    completed: false,
    image: "/placeholder.svg?height=200&width=400&text=World+Geography",
  },
]
