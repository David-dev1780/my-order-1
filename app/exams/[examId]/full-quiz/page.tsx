"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, BookOpen, Clock, Coins, Info } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/hooks/use-toast"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { CelebrationOverlay } from "@/components/celebration-overlay"

export default function FullQuizPage({ params }: { params: { examId: string } }) {
  const router = useRouter()
  const { toast } = useToast()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
  const [timeLeft, setTimeLeft] = useState(10)
  const [tokens, setTokens] = useState(50)
  const [score, setScore] = useState(0)
  const [showAd, setShowAd] = useState(false)
  const [startY, setStartY] = useState(0)
  const [showCelebration, setShowCelebration] = useState(false)

  // Get exam data based on examId
  const exam = exams.find((e) => e.id === params.examId) || exams[0]
  const question = exam.questions[currentQuestion]

  // Handle option selection
  const handleOptionSelect = (option: string) => {
    if (selectedOption !== null) return // Prevent changing answer

    setSelectedOption(option)
    const correct = option === question.correctAnswer
    setIsCorrect(correct)

    if (correct) {
      setScore(score + 1)
      setShowCelebration(true)
      setTokens(tokens + 1)
    } else {
      toast({
        title: "Wrong Answer",
        description: question.explanation,
        variant: "destructive",
      })

      // Move to next question after 2 seconds
      setTimeout(() => {
        proceedToNextQuestion()
      }, 2000)
    }
  }

  // Proceed to next question
  const proceedToNextQuestion = () => {
    if (currentQuestion < exam.questions.length - 1) {
      // Show ad after every 2 questions
      if ((currentQuestion + 1) % 2 === 0) {
        setShowAd(true)
      } else {
        setCurrentQuestion(currentQuestion + 1)
        setSelectedOption(null)
        setIsCorrect(null)
        setTimeLeft(10)
      }
    } else {
      // Quiz completed
      router.push(`/exams/${params.examId}/results?score=${score}&total=${exam.questions.length}`)
    }
  }

  // Close advertisement and proceed to next question
  const closeAd = () => {
    setShowAd(false)
    setCurrentQuestion(currentQuestion + 1)
    setSelectedOption(null)
    setIsCorrect(null)
    setTimeLeft(10)
  }

  // Handle touch start
  const handleTouchStart = (e: React.TouchEvent) => {
    setStartY(e.touches[0].clientY)
  }

  // Handle touch move
  const handleTouchMove = (e: React.TouchEvent) => {
    if (selectedOption !== null) return // Don't allow swiping if answer selected

    const currentY = e.touches[0].clientY
    const diff = startY - currentY

    // Threshold for swipe detection
    if (Math.abs(diff) > 100) {
      if (diff > 0 && currentQuestion < exam.questions.length - 1) {
        // Swipe up - skip question (costs 2 tokens)
        if (tokens >= 2) {
          setTokens(tokens - 2)
          toast({
            title: "Question Skipped",
            description: "You spent 2 tokens to skip this question.",
          })
          setCurrentQuestion(currentQuestion + 1)
          setSelectedOption(null)
          setIsCorrect(null)
          setTimeLeft(10)
        } else {
          toast({
            title: "Not Enough Tokens",
            description: "You need 2 tokens to skip a question.",
            variant: "destructive",
          })
        }
      }
      setStartY(currentY)
    }
  }

  // Timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          if (selectedOption === null) {
            handleOptionSelect("timeout")
          }
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [selectedOption])

  // Get subject for current question
  const getSubjectForQuestion = (question: any) => {
    if (!question.subjectId) return null

    const subject = subjects.find((s) => s.id === question.subjectId)
    return subject ? subject.name : null
  }

  return (
    <div className="container mx-auto px-4 py-8 pb-20" onTouchStart={handleTouchStart} onTouchMove={handleTouchMove}>
      <CelebrationOverlay
        show={showCelebration}
        onComplete={() => {
          setShowCelebration(false)
          proceedToNextQuestion()
        }}
      />

      <div className="flex items-center mb-6">
        <Button variant="ghost" size="sm" onClick={() => router.push(`/exams/${params.examId}`)} className="mr-2">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back
        </Button>
        <h1 className="text-2xl font-bold">{exam.name}</h1>
        <div className="ml-auto flex items-center">
          <Coins className="h-4 w-4 mr-1 text-yellow-500" />
          <span className="font-medium">{tokens} tokens</span>
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
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-muted-foreground">{exam.description}</p>
              </div>
              <Badge variant="outline" className="bg-blue-50 text-blue-800 border-blue-200">
                <Clock className="h-3 w-3 mr-1" />
                {exam.duration} min
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <BookOpen className="h-4 w-4 mr-1 text-primary" />
                <span className="text-sm">{exam.questions.length} questions</span>
              </div>
              <div className="flex items-center">
                <span className="text-sm font-medium">
                  Question {currentQuestion + 1} of {exam.questions.length}
                </span>
              </div>
            </div>
          </div>
        </div>
      </Card>

      <div className="w-full max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex items-center cursor-help">
                  <Info className="h-4 w-4 mr-1 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Swipe up to skip (costs 2 tokens)</span>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Swipe up to skip this question. It will cost you 2 tokens.</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <Badge variant={timeLeft <= 3 ? "destructive" : "outline"} className="animate-pulse">
            {timeLeft} seconds left
          </Badge>
        </div>

        <Progress value={(currentQuestion / exam.questions.length) * 100} className="mb-6" />

        <Card className="mb-6 shadow-md overflow-hidden border-none">
          <div className="bg-gradient-to-r from-primary/10 to-primary/5 p-6">
            <div className="flex justify-between items-start mb-2">
              <h2 className="text-xl font-bold">{question.text}</h2>
              {getSubjectForQuestion(question) && (
                <Badge className="bg-gradient-to-r from-purple-500 to-blue-500 text-white">
                  {getSubjectForQuestion(question)}
                </Badge>
              )}
            </div>
            {question.description && <p className="text-muted-foreground">{question.description}</p>}
          </div>
          {question.image && (
            <div className="h-48 bg-muted overflow-hidden">
              <img
                src={question.image || "/placeholder.svg"}
                alt="Question illustration"
                className="w-full h-full object-contain"
              />
            </div>
          )}
          <CardContent className="space-y-4 p-6">
            {question.options.map((option, index) => (
              <div
                key={index}
                onClick={() => selectedOption === null && handleOptionSelect(option)}
                className={`
                  p-4 rounded-lg border-2 cursor-pointer transition-all
                  ${selectedOption === option && isCorrect ? "border-green-500 bg-green-50 dark:bg-green-900/20" : ""}
                  ${selectedOption === option && !isCorrect ? "border-red-500 bg-red-50 dark:bg-red-900/20" : ""}
                  ${selectedOption === null ? "hover:border-primary/50 hover:bg-muted/50" : ""}
                  ${option === question.correctAnswer && selectedOption !== null ? "border-green-500" : ""}
                  ${selectedOption === null ? "border-muted" : ""}
                `}
              >
                <div className="flex items-center">
                  <div
                    className={`
                    h-6 w-6 rounded-full flex items-center justify-center mr-3 text-xs font-medium
                    ${selectedOption === option && isCorrect ? "bg-green-500 text-white" : ""}
                    ${selectedOption === option && !isCorrect ? "bg-red-500 text-white" : ""}
                    ${selectedOption === null ? "bg-muted text-muted-foreground" : ""}
                    ${option === question.correctAnswer && selectedOption !== null ? "bg-green-500 text-white" : ""}
                  `}
                  >
                    {String.fromCharCode(65 + index)}
                  </div>
                  <span className="flex-1">{option}</span>
                </div>
              </div>
            ))}
          </CardContent>
          <CardFooter className="flex justify-between p-6 bg-gradient-to-r from-primary/5 to-primary/10">
            <div className="text-sm text-muted-foreground">Select an option to continue</div>
            <div className="text-sm font-medium">
              Score: {score}/{currentQuestion}
            </div>
          </CardFooter>
        </Card>
        {showAd && (
          <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50">
            <Card className="w-full max-w-md mx-auto border-2 border-yellow-500 animate-pulse shadow-xl">
              <CardHeader>
                <CardTitle className="text-center">Advertisement</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <div className="w-full h-40 bg-muted rounded-lg flex items-center justify-center mb-4 overflow-hidden">
                  <img
                    src="/placeholder.svg?height=160&width=400&text=Advertisement"
                    alt="Advertisement"
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-center text-muted-foreground mb-4">This is a sponsored message</p>
                <Button onClick={closeAd}>Continue to Next Question</Button>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
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
