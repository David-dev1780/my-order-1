"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, BookOpen, ListChecks } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function ExamPage({ params }: { params: { examId: string } }) {
  const router = useRouter()
  const { toast } = useToast()
  const [tokens, setTokens] = useState(50)

  // Get exam data based on examId
  const exam = exams.find((e) => e.id === params.examId) || exams[0]

  // Get subjects for this exam
  const examSubjects = subjects.filter((subject) => subject.examId === params.examId)

  return (
    <div className="container mx-auto px-4 py-8 pb-20">
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="sm" onClick={() => router.push(`/subjects/${exam.categoryId}`)} className="mr-2">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back
        </Button>
        <h1 className="text-2xl font-bold">{exam.name}</h1>
        <div className="ml-auto flex items-center gap-4">
          <Button variant="outline" size="sm" onClick={() => router.push(`/exams/${params.examId}/subjects`)}>
            <ListChecks className="h-4 w-4 mr-2" />
            View Subjects
          </Button>
        </div>
      </div>

      {/* Exam Info Card */}
      <Card className="mb-6 shadow-md overflow-hidden">
        <div className="flex flex-col sm:flex-row">
          <div className="sm:w-1/3 h-40 sm:h-auto bg-muted relative">
            <img src={exam.image || "/placeholder.svg"} alt={exam.name} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-primary/60 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-4 text-white">
              <Badge variant="secondary" className="bg-white/20 text-white mb-2">
                {exam.categoryId}
              </Badge>
              <h2 className="text-xl font-bold">{exam.name}</h2>
            </div>
          </div>
          <div className="flex-1 p-6">
            <div className="mb-4">
              <p className="text-muted-foreground">{exam.description}</p>
            </div>
            <div className="flex flex-wrap gap-2 mb-4">
              {exam.subjects.map((subject, i) => (
                <Badge key={i} variant="outline" className="text-xs">
                  {subject}
                </Badge>
              ))}
            </div>
            <div className="flex items-center">
              <BookOpen className="h-4 w-4 mr-1 text-primary" />
              <span className="text-sm">{exam.questions.length} questions</span>
            </div>
          </div>
        </div>
      </Card>

      {/* Subject Selection */}
      <h2 className="text-xl font-bold mb-4">Select a Subject to Start</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {examSubjects.map((subject) => (
          <Card
            key={subject.id}
            className="overflow-hidden hover:shadow-lg transition-all cursor-pointer border-none"
            onClick={() => router.push(`/exams/${params.examId}/subject-quiz/${subject.id}`)}
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
            </div>
            <CardContent className="p-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <BookOpen className="h-4 w-4 mr-1 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">{subject.topics} topics</span>
                </div>
                <Button
                  variant="default"
                  className="bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90"
                  size="sm"
                >
                  Start Quiz
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Full Exam Option */}
      <Card className="mb-6 overflow-hidden border-none shadow-lg bg-gradient-to-r from-primary/90 to-purple-600 text-primary-foreground">
        <CardHeader>
          <CardTitle className="flex items-center">
            <BookOpen className="h-5 w-5 mr-2" />
            Full Exam Mode
          </CardTitle>
        </CardHeader>
        <CardContent className="pb-6">
          <p className="mb-4">Take a comprehensive quiz covering all subjects in this exam.</p>
          <Button
            variant="secondary"
            className="w-full sm:w-auto"
            onClick={() => router.push(`/exams/${params.examId}/full-quiz`)}
          >
            Start Full Exam
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

const exams = [
  {
    id: "upsc-prelims",
    name: "UPSC Prelims",
    description: "Civil Services Preliminary Examination",
    categoryId: "civil-services",
    questions: [
      {
        text: "Which of the following is the highest civilian award in India?",
        options: ["Padma Shri", "Padma Bhushan", "Padma Vibhushan", "Bharat Ratna"],
        correctAnswer: "Bharat Ratna",
        explanation: "Bharat Ratna is the highest civilian award in India.",
        image: "/placeholder.svg?height=200&width=400&text=Civilian+Awards",
        subjectId: "general-studies",
      },
      {
        text: "Who was the first Prime Minister of India?",
        options: ["Mahatma Gandhi", "Jawaharlal Nehru", "Sardar Vallabhbhai Patel", "Dr. B.R. Ambedkar"],
        correctAnswer: "Jawaharlal Nehru",
        explanation: "Jawaharlal Nehru was the first Prime Minister of India (1947-1964).",
        image: "/placeholder.svg?height=200&width=400&text=Prime+Ministers",
        subjectId: "indian-history",
      },
      {
        text: "Which Article of the Indian Constitution abolishes untouchability?",
        options: ["Article 14", "Article 15", "Article 17", "Article 21"],
        correctAnswer: "Article 17",
        explanation: "Article 17 of the Indian Constitution abolishes untouchability.",
        image: "/placeholder.svg?height=200&width=400&text=Constitution",
        subjectId: "polity",
      },
      {
        text: "The Preamble to the Indian Constitution was amended by which Constitutional Amendment?",
        options: ["42nd Amendment", "44th Amendment", "73rd Amendment", "86th Amendment"],
        correctAnswer: "42nd Amendment",
        explanation:
          "The 42nd Amendment (1976) added the words 'socialist', 'secular' and 'integrity' to the Preamble.",
        image: "/placeholder.svg?height=200&width=400&text=Preamble",
        subjectId: "polity",
      },
      {
        text: "Which of the following rivers does NOT flow into the Arabian Sea?",
        options: ["Narmada", "Tapti", "Godavari", "Sabarmati"],
        correctAnswer: "Godavari",
        explanation: "Godavari flows into the Bay of Bengal, not the Arabian Sea.",
        image: "/placeholder.svg?height=200&width=400&text=Rivers",
        subjectId: "geography",
      },
    ],
    duration: 120,
    popularity: 98,
    completed: true,
    subjects: ["General Studies", "CSAT"],
    updatedAt: "2025-05-10",
    image: "/placeholder.svg?height=200&width=400&text=UPSC+Prelims",
  },
  {
    id: "mpsc-prelims",
    name: "MPSC Prelims",
    description: "Maharashtra Public Service Commission Preliminary Exam",
    categoryId: "civil-services",
    questions: [
      {
        text: "Which of the following is the state animal of Maharashtra?",
        options: ["Tiger", "Lion", "Indian Giant Squirrel", "Elephant"],
        correctAnswer: "Indian Giant Squirrel",
        explanation: "The Indian Giant Squirrel (Shekru) is the state animal of Maharashtra.",
        image: "/placeholder.svg?height=200&width=400&text=State+Symbols",
        subjectId: "maharashtra-history",
      },
      {
        text: "Who was the first Chief Minister of Maharashtra?",
        options: ["Y. B. Chavan", "Vasantrao Naik", "Shankarrao Chavan", "Vasantdada Patil"],
        correctAnswer: "Y. B. Chavan",
        explanation: "Y. B. Chavan was the first Chief Minister of Maharashtra (1960-1962).",
        image: "/placeholder.svg?height=200&width=400&text=Maharashtra+CMs",
        subjectId: "maharashtra-history",
      },
      {
        text: "Which fort was the capital of Shivaji Maharaj's kingdom?",
        options: ["Raigad", "Pratapgad", "Sinhagad", "Torna"],
        correctAnswer: "Raigad",
        explanation: "Raigad Fort was the capital of Shivaji Maharaj's kingdom.",
        image: "/placeholder.svg?height=200&width=400&text=Maratha+Forts",
        subjectId: "maharashtra-history",
      },
      {
        text: "Which district in Maharashtra has the highest literacy rate?",
        options: ["Mumbai", "Pune", "Nagpur", "Kolhapur"],
        correctAnswer: "Mumbai",
        explanation: "Mumbai has the highest literacy rate among districts in Maharashtra.",
        image: "/placeholder.svg?height=200&width=400&text=Maharashtra+Districts",
        subjectId: "maharashtra-geography",
      },
      {
        text: "The Ajanta Caves are located in which district of Maharashtra?",
        options: ["Aurangabad", "Jalgaon", "Nashik", "Ahmednagar"],
        correctAnswer: "Aurangabad",
        explanation: "The Ajanta Caves are located in Aurangabad district of Maharashtra.",
        image: "/placeholder.svg?height=200&width=400&text=Ajanta+Caves",
        subjectId: "maharashtra-history",
      },
    ],
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
    questions: [
      {
        text: "If FRIEND is coded as HUMJTK, how is CANDLE coded?",
        options: ["EDRIRL", "DCQHQK", "ESJFME", "FYOBOC"],
        correctAnswer: "EDRIRL",
        explanation: "Each letter is replaced by the letter that follows it in the alphabet by 2 positions.",
        image: "/placeholder.svg?height=200&width=400&text=Coding+Decoding",
        subjectId: "reasoning",
      },
      {
        text: "A train running at the speed of 60 km/hr crosses a pole in 9 seconds. What is the length of the train?",
        options: ["120 meters", "150 meters", "180 meters", "324 meters"],
        correctAnswer: "150 meters",
        explanation: "Length = Speed × Time = (60 × 5/18) × 9 = 150 meters",
        image: "/placeholder.svg?height=200&width=400&text=Train+Problems",
        subjectId: "quantitative-aptitude",
      },
      {
        text: "The average of 20 numbers is zero. Of them, at most, how many may be greater than zero?",
        options: ["0", "1", "10", "19"],
        correctAnswer: "19",
        explanation:
          "If 19 numbers are positive and 1 is negative, the sum can still be zero if the negative number is large enough.",
        image: "/placeholder.svg?height=200&width=400&text=Average+Problems",
        subjectId: "quantitative-aptitude",
      },
      {
        text: "Which of the following is the largest landlocked country in the world?",
        options: ["Mongolia", "Kazakhstan", "Afghanistan", "Bolivia"],
        correctAnswer: "Kazakhstan",
        explanation: "Kazakhstan is the largest landlocked country in the world by land area.",
        image: "/placeholder.svg?height=200&width=400&text=World+Geography",
        subjectId: "general-awareness",
      },
      {
        text: "Who is the author of the book 'Wings of Fire'?",
        options: ["Arundhati Roy", "A.P.J. Abdul Kalam", "Vikram Seth", "Chetan Bhagat"],
        correctAnswer: "A.P.J. Abdul Kalam",
        explanation: "'Wings of Fire' is an autobiography of A.P.J. Abdul Kalam, former President of India.",
        image: "/placeholder.svg?height=200&width=400&text=Famous+Books",
        subjectId: "english",
      },
    ],
    duration: 60,
    popularity: 90,
    completed: false,
    subjects: ["Reasoning", "Quantitative Aptitude", "English", "General Awareness"],
    updatedAt: "2025-05-15",
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
    id: "maharashtra-geography",
    examId: "mpsc-prelims",
    name: "Maharashtra Geography",
    topics: 6,
    duration: 30,
    progress: 50,
    image: "/placeholder.svg?height=200&width=400&text=Maharashtra+Geography",
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
  {
    id: "general-awareness",
    examId: "ssc-cgl",
    name: "General Awareness",
    topics: 8,
    duration: 40,
    progress: 55,
    image: "/placeholder.svg?height=200&width=400&text=General+Awareness",
  },
]
