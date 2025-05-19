"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, BookOpen, CheckCircle, Clock, Filter, Search, AArrowUpIcon as SortAscending } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function SubjectPage({ params }: { params: { categoryId: string } }) {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [filterCompleted, setFilterCompleted] = useState<string | null>(null)
  const [sortBy, setSortBy] = useState<"popularity" | "name" | "questions">("popularity")

  // Get category data
  const category = examCategories.find((c) => c.id === params.categoryId) || examCategories[0]

  // Get exams for this category
  const categoryExams = exams.filter((exam) => exam.categoryId === params.categoryId)

  // Filter and sort exams
  const filteredExams = categoryExams
    .filter((exam) => {
      // Apply search filter
      if (searchQuery && !exam.name.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false
      }

      // Apply completed filter
      if (filterCompleted === "completed" && !exam.completed) {
        return false
      }
      if (filterCompleted === "not-completed" && exam.completed) {
        return false
      }

      return true
    })
    .sort((a, b) => {
      // Apply sorting
      if (sortBy === "name") {
        return a.name.localeCompare(b.name)
      } else if (sortBy === "questions") {
        return b.questions - a.questions
      } else {
        // popularity (default)
        return b.popularity - a.popularity
      }
    })

  return (
    <div className="container mx-auto px-4 py-6 pb-20">
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="sm" onClick={() => router.push("/")} className="mr-2">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back
        </Button>
        <h1 className="text-2xl font-bold">{category.name}</h1>
      </div>

      {/* Hero Banner */}
      <div className="relative w-full h-48 rounded-xl overflow-hidden mb-6 shadow-md">
        <img src={category.image || "/placeholder.svg"} alt={category.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/70 to-purple-600/50 flex flex-col justify-end p-6">
          <h2 className="text-white text-2xl font-bold mb-2">{category.name} Exams</h2>
          <p className="text-white/80">{category.description}</p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search exams..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setFilterCompleted(null)}>All Exams</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilterCompleted("completed")}>Completed</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilterCompleted("not-completed")}>Not Completed</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <SortAscending className="h-4 w-4 mr-2" />
                Sort
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setSortBy("popularity")}>Popularity</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortBy("name")}>Name</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortBy("questions")}>Number of Questions</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="all" className="mb-6">
        <TabsList className="grid grid-cols-3 w-full max-w-md mb-4">
          <TabsTrigger value="all">All Exams</TabsTrigger>
          <TabsTrigger value="popular">Popular</TabsTrigger>
          <TabsTrigger value="recent">Recent</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredExams.map((exam) => (
              <Link href={`/exams/${exam.id}`} key={exam.id} className="block">
                <Card className="h-full hover:shadow-md transition-all overflow-hidden border-none">
                  <div className="h-32 bg-muted relative">
                    <img
                      src={exam.image || "/placeholder.svg"}
                      alt={exam.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                    {exam.completed && (
                      <div className="absolute top-2 right-2">
                        <Badge className="bg-green-500">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Completed
                        </Badge>
                      </div>
                    )}
                    <div className="absolute bottom-0 left-0 p-3 text-white">
                      <h3 className="font-bold text-lg">{exam.name}</h3>
                    </div>
                  </div>
                  <CardContent className="pb-2 pt-4">
                    <p className="text-muted-foreground text-sm mb-2">{exam.description}</p>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {exam.subjects.map((subject, i) => (
                        <Badge key={i} variant="outline" className="text-xs">
                          {subject}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <BookOpen className="h-4 w-4 mr-1" />
                        {exam.questions} questions
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {exam.duration} min
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button
                      variant="default"
                      className="w-full bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90"
                    >
                      Start Quiz
                    </Button>
                  </CardFooter>
                </Card>
              </Link>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="popular">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredExams
              .sort((a, b) => b.popularity - a.popularity)
              .slice(0, 6)
              .map((exam) => (
                <Link href={`/exams/${exam.id}`} key={exam.id} className="block">
                  <Card className="h-full hover:shadow-md transition-all overflow-hidden border-none">
                    <div className="h-32 bg-muted relative">
                      <img
                        src={exam.image || "/placeholder.svg"}
                        alt={exam.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                      {exam.completed && (
                        <div className="absolute top-2 right-2">
                          <Badge className="bg-green-500">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Completed
                          </Badge>
                        </div>
                      )}
                      <div className="absolute bottom-0 left-0 p-3 text-white">
                        <h3 className="font-bold text-lg">{exam.name}</h3>
                      </div>
                    </div>
                    <CardContent className="pb-2 pt-4">
                      <p className="text-muted-foreground text-sm mb-2">{exam.description}</p>
                      <div className="flex flex-wrap gap-2 mb-2">
                        {exam.subjects.map((subject, i) => (
                          <Badge key={i} variant="outline" className="text-xs">
                            {subject}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <div className="flex items-center">
                          <BookOpen className="h-4 w-4 mr-1" />
                          {exam.questions} questions
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          {exam.duration} min
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button
                        variant="default"
                        className="w-full bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90"
                      >
                        Start Quiz
                      </Button>
                    </CardFooter>
                  </Card>
                </Link>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="recent">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredExams
              .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
              .slice(0, 6)
              .map((exam) => (
                <Link href={`/exams/${exam.id}`} key={exam.id} className="block">
                  <Card className="h-full hover:shadow-md transition-all overflow-hidden border-none">
                    <div className="h-32 bg-muted relative">
                      <img
                        src={exam.image || "/placeholder.svg"}
                        alt={exam.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                      {exam.completed && (
                        <div className="absolute top-2 right-2">
                          <Badge className="bg-green-500">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Completed
                          </Badge>
                        </div>
                      )}
                      <div className="absolute bottom-0 left-0 p-3 text-white">
                        <h3 className="font-bold text-lg">{exam.name}</h3>
                      </div>
                    </div>
                    <CardContent className="pb-2 pt-4">
                      <p className="text-muted-foreground text-sm mb-2">{exam.description}</p>
                      <div className="flex flex-wrap gap-2 mb-2">
                        {exam.subjects.map((subject, i) => (
                          <Badge key={i} variant="outline" className="text-xs">
                            {subject}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <div className="flex items-center">
                          <BookOpen className="h-4 w-4 mr-1" />
                          {exam.questions} questions
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          {exam.duration} min
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button
                        variant="default"
                        className="w-full bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90"
                      >
                        Start Quiz
                      </Button>
                    </CardFooter>
                  </Card>
                </Link>
              ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

const examCategories = [
  {
    id: "civil-services",
    name: "Civil Services",
    exams: 5,
    description: "Prepare for UPSC, MPSC, and other civil service exams",
    image: "/placeholder.svg?height=400&width=800&text=Civil+Services",
  },
  {
    id: "banking",
    name: "Banking & Insurance",
    exams: 8,
    description: "Prepare for bank PO, clerk, and insurance exams",
    image: "/placeholder.svg?height=400&width=800&text=Banking",
  },
  {
    id: "engineering",
    name: "Engineering Entrance",
    exams: 6,
    description: "Prepare for JEE, GATE, and other engineering entrance exams",
    image: "/placeholder.svg?height=400&width=800&text=Engineering",
  },
  {
    id: "medical",
    name: "Medical Entrance",
    exams: 4,
    description: "Prepare for NEET, AIIMS, and other medical entrance exams",
    image: "/placeholder.svg?height=400&width=800&text=Medical",
  },
  {
    id: "defence",
    name: "Defence Services",
    exams: 7,
    description: "Prepare for NDA, CDS, AFCAT, and other defence exams",
    image: "/placeholder.svg?height=400&width=800&text=Defence",
  },
  {
    id: "teaching",
    name: "Teaching Exams",
    exams: 3,
    description: "Prepare for CTET, TET, and other teaching exams",
    image: "/placeholder.svg?height=400&width=800&text=Teaching",
  },
]

const exams = [
  {
    id: "upsc-prelims",
    name: "UPSC Prelims",
    description: "Civil Services Preliminary Examination",
    categoryId: "civil-services",
    questions: 100,
    duration: 120,
    popularity: 98,
    completed: true,
    subjects: ["General Studies", "CSAT"],
    updatedAt: "2025-05-10",
    image: "/placeholder.svg?height=200&width=400&text=UPSC+Prelims",
  },
  {
    id: "upsc-mains",
    name: "UPSC Mains",
    description: "Civil Services Main Examination",
    categoryId: "civil-services",
    questions: 250,
    duration: 180,
    popularity: 95,
    completed: false,
    subjects: ["Essay", "GS-I", "GS-II", "GS-III", "GS-IV"],
    updatedAt: "2025-05-12",
    image: "/placeholder.svg?height=200&width=400&text=UPSC+Mains",
  },
  {
    id: "mpsc-prelims",
    name: "MPSC Prelims",
    description: "Maharashtra Public Service Commission Preliminary Exam",
    categoryId: "civil-services",
    questions: 80,
    duration: 90,
    popularity: 85,
    completed: true,
    subjects: ["General Studies", "CSAT"],
    updatedAt: "2025-05-05",
    image: "/placeholder.svg?height=200&width=400&text=MPSC+Prelims",
  },
  {
    id: "ssc-cgl",
    name: "SSC CGL",
    description: "Staff Selection Commission Combined Graduate Level",
    categoryId: "civil-services",
    questions: 100,
    duration: 60,
    popularity: 90,
    completed: false,
    subjects: ["Reasoning", "Quantitative Aptitude", "English", "General Awareness"],
    updatedAt: "2025-05-15",
    image: "/placeholder.svg?height=200&width=400&text=SSC+CGL",
  },
  {
    id: "ias-interview",
    name: "IAS Interview Preparation",
    description: "Personality Test for Civil Services",
    categoryId: "civil-services",
    questions: 50,
    duration: 45,
    popularity: 80,
    completed: false,
    subjects: ["Current Affairs", "Ethics", "Governance"],
    updatedAt: "2025-05-01",
    image: "/placeholder.svg?height=200&width=400&text=IAS+Interview",
  },
  {
    id: "sbi-po",
    name: "SBI PO",
    description: "State Bank of India Probationary Officer",
    categoryId: "banking",
    questions: 100,
    duration: 60,
    popularity: 92,
    completed: true,
    subjects: ["Reasoning", "Quantitative Aptitude", "English", "Banking Awareness"],
    updatedAt: "2025-05-08",
    image: "/placeholder.svg?height=200&width=400&text=SBI+PO",
  },
  {
    id: "ibps-po",
    name: "IBPS PO",
    description: "Institute of Banking Personnel Selection Probationary Officer",
    categoryId: "banking",
    questions: 100,
    duration: 60,
    popularity: 88,
    completed: false,
    subjects: ["Reasoning", "Quantitative Aptitude", "English", "Banking Awareness"],
    updatedAt: "2025-05-11",
    image: "/placeholder.svg?height=200&width=400&text=IBPS+PO",
  },
  {
    id: "rbi-grade-b",
    name: "RBI Grade B",
    description: "Reserve Bank of India Grade B Officer",
    categoryId: "banking",
    questions: 120,
    duration: 120,
    popularity: 85,
    completed: false,
    subjects: ["General Awareness", "English", "Quantitative Aptitude", "Reasoning", "Finance & Management"],
    updatedAt: "2025-05-14",
    image: "/placeholder.svg?height=200&width=400&text=RBI+Grade+B",
  },
]
