"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { CheckCircle2, XCircle, Clock, ArrowLeft, HelpCircle, ChevronRight } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import CelebrationOverlay from "@/components/celebration-overlay"

// Mock data for quiz questions
const quizQuestions = [
  {
    id: 1,
    question: "Which of the following is NOT a fundamental right guaranteed by the Indian Constitution?",
    options: ["Right to Equality", "Right to Freedom", "Right to Property", "Right to Freedom of Religion"],
    correctAnswer: "Right to Property",
    explanation:
      "Right to Property was originally a fundamental right but was removed by the 44th Amendment in 1978. It is now a legal right under Article 300A.",
  },
  {
    id: 2,
    question: "Who among the following is known as the 'Father of the Indian Constitution'?",
    options: ["Mahatma Gandhi", "Jawaharlal Nehru", "B.R. Ambedkar", "Sardar Vallabhbhai Patel"],
    correctAnswer: "B.R. Ambedkar",
    explanation:
      "Dr. B.R. Ambedkar was the Chairman of the Drafting Committee of the Indian Constitution and played a pivotal role in its creation.",
  },
  {
    id: 3,
    question: "Which Article of the Indian Constitution abolishes untouchability?",
    options: ["Article 14", "Article 15", "Article 17", "Article 21"],
    correctAnswer: "Article 17",
    explanation:
      "Article 17 of the Indian Constitution abolishes the practice of untouchability in any form and makes its practice punishable by law.",
  },
  {
    id: 4,
    question: "The concept of 'Judicial Review' in the Indian Constitution is borrowed from which country?",
    options: ["United Kingdom", "United States", "Canada", "Australia"],
    correctAnswer: "United States",
    explanation:
      "The concept of Judicial Review, which gives the judiciary the power to review the constitutionality of laws, is borrowed from the Constitution of the United States.",
  },
  {
    id: 5,
    question: "Which of the following is NOT a Directive Principle of State Policy?",
    options: [
      "Equal pay for equal work",
      "Uniform civil code for citizens",
      "Protection of monuments of historic interest",
      "Equal justice and free legal aid",
    ],
    correctAnswer: "Equal justice and free legal aid",
    explanation:
      "Equal justice and free legal aid is a Fundamental Right under Article 39A, not a Directive Principle of State Policy.",
  },
  {
    id: 6,
    question: "The President of India can be removed from office by:",
    options: [
      "A resolution passed by the Parliament",
      "The Prime Minister's recommendation",
      "Impeachment by Parliament",
      "A decision of the Supreme Court",
    ],
    correctAnswer: "Impeachment by Parliament",
    explanation:
      "The President of India can be removed from office by impeachment for violation of the Constitution, which requires a special majority in both Houses of Parliament.",
  },
  {
    id: 7,
    question: "Which of the following is NOT a Union Territory of India?",
    options: ["Puducherry", "Chandigarh", "Meghalaya", "Ladakh"],
    correctAnswer: "Meghalaya",
    explanation: "Meghalaya is a full-fledged state of India, not a Union Territory.",
  },
  {
    id: 8,
    question: "The maximum strength of the Lok Sabha as envisaged by the Constitution is:",
    options: ["545", "552", "550", "530"],
    correctAnswer: "552",
    explanation:
      "The maximum strength of the Lok Sabha as envisaged by the Constitution is 552 (530 members from states, 20 from Union Territories, and 2 nominated from the Anglo-Indian community).",
  },
  {
    id: 9,
    question: "Which of the following is NOT a feature of the Indian federal system?",
    options: [
      "Division of powers between Centre and States",
      "Independent Judiciary",
      "Single Citizenship",
      "Separate Constitutions for Centre and States",
    ],
    correctAnswer: "Separate Constitutions for Centre and States",
    explanation:
      "India has a single Constitution for both the Centre and States, unlike some federal systems like the USA where states have their own constitutions.",
  },
  {
    id: 10,
    question: "The Preamble to the Indian Constitution was amended by which Constitutional Amendment?",
    options: ["42nd Amendment", "44th Amendment", "73rd Amendment", "86th Amendment"],
    correctAnswer: "42nd Amendment",
    explanation:
      "The Preamble was amended by the 42nd Constitutional Amendment Act, 1976, which added the words 'Socialist', 'Secular', and 'Integrity' to the Preamble.",
  },
]

export default function SubjectQuizPage({ params }: { params: { examId: string; subjectId: string } }) {
  const router = useRouter()
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [isAnswered, setIsAnswered] = useState(false)
  const [score, setScore] = useState(0)
  const [answers, setAnswers] = useState<Array<string | null>>(Array(quizQuestions.length).fill(null))
  const [timeLeft, setTimeLeft] = useState(600) // 10 minutes in seconds
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [showCelebration, setShowCelebration] = useState(false)
  const [exitDirection, setExitDirection] = useState<"left" | "right" | "up" | "down">("left")

  // Timer countdown
  useEffect(() => {
    if (timeLeft > 0 && !quizCompleted) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    } else if (timeLeft === 0 && !quizCompleted) {
      finishQuiz()
    }
  }, [timeLeft, quizCompleted])

  // Format time as MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  // Handle option selection
  const handleOptionSelect = (option: string) => {
    if (isAnswered) return
    setSelectedOption(option)
    setIsAnswered(true)

    // Update answers array
    const newAnswers = [...answers]
    newAnswers[currentQuestionIndex] = option
    setAnswers(newAnswers)

    // Update score if correct
    if (option === quizQuestions[currentQuestionIndex].correctAnswer) {
      setScore(score + 1)
      setExitDirection("right") // Correct answers go right
    } else {
      setExitDirection("left") // Wrong answers go left
    }

    // Auto-advance to next question after delay
    setTimeout(() => {
      if (currentQuestionIndex < quizQuestions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1)
        setSelectedOption(null)
        setIsAnswered(false)
      } else {
        finishQuiz()
      }
    }, 1500)
  }

  // Skip current question
  const skipQuestion = () => {
    if (isAnswered) return

    setExitDirection("up") // Skipped questions go up

    // Update answers array with null (skipped)
    const newAnswers = [...answers]
    newAnswers[currentQuestionIndex] = null
    setAnswers(newAnswers)

    // Move to next question
    setTimeout(() => {
      if (currentQuestionIndex < quizQuestions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1)
      } else {
        finishQuiz()
      }
    }, 500)
  }

  // Finish quiz and show results
  const finishQuiz = () => {
    setQuizCompleted(true)

    // Show celebration if score is good
    if (score / quizQuestions.length >= 0.7) {
      setShowCelebration(true)
      setTimeout(() => setShowCelebration(false), 3000)
    }

    // Navigate to results page after delay
    setTimeout(() => {
      router.push(`/exams/${params.examId}/results?score=${score}&total=${quizQuestions.length}`)
    }, 3000)
  }

  // Current question
  const currentQuestion = quizQuestions[currentQuestionIndex]

  // Progress percentage
  const progress = ((currentQuestionIndex + 1) / quizQuestions.length) * 100

  return (
    <div className="container mx-auto px-4 py-6 pb-20">
      {showCelebration && <CelebrationOverlay />}

      <div className="mb-6 flex items-center justify-between">
        <Button variant="ghost" size="sm" onClick={() => router.back()}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>

        <div className="flex items-center">
          <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
          <span className={`font-mono ${timeLeft < 60 ? "text-red-500 animate-pulse" : ""}`}>
            {formatTime(timeLeft)}
          </span>
        </div>
      </div>

      <div className="mb-4">
        <Progress value={progress} className="h-2" />
        <div className="mt-2 flex justify-between text-sm text-muted-foreground">
          <span>
            Question {currentQuestionIndex + 1} of {quizQuestions.length}
          </span>
          <span>
            Score: {score}/{currentQuestionIndex}
          </span>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestionIndex}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{
            opacity: 0,
            x: exitDirection === "left" ? -100 : exitDirection === "right" ? 100 : 0,
            y: exitDirection === "up" ? -100 : exitDirection === "down" ? 100 : 0,
          }}
          transition={{ duration: 0.3 }}
        >
          <Card className="mb-6 shadow-lg border-none">
            <CardHeader>
              <CardTitle className="text-xl">{currentQuestion.question}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {currentQuestion.options.map((option, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className={`w-full justify-start text-left h-auto py-3 px-4 ${
                      selectedOption === option
                        ? option === currentQuestion.correctAnswer
                          ? "border-green-500 bg-green-50 dark:bg-green-900/20"
                          : "border-red-500 bg-red-50 dark:bg-red-900/20"
                        : ""
                    }`}
                    onClick={() => handleOptionSelect(option)}
                    disabled={isAnswered}
                  >
                    <div className="flex items-center w-full">
                      <span className="mr-2 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border">
                        {String.fromCharCode(65 + index)}
                      </span>
                      <span className="flex-1">{option}</span>
                      {isAnswered && option === currentQuestion.correctAnswer && (
                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                      )}
                      {isAnswered && selectedOption === option && option !== currentQuestion.correctAnswer && (
                        <XCircle className="h-5 w-5 text-red-500" />
                      )}
                    </div>
                  </Button>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="ghost" onClick={skipQuestion} disabled={isAnswered}>
                <HelpCircle className="mr-2 h-4 w-4" />
                Skip
              </Button>

              {isAnswered && (
                <div className="text-sm p-3 rounded-lg bg-muted">
                  <p className="font-medium mb-1">Explanation:</p>
                  <p>{currentQuestion.explanation}</p>
                </div>
              )}

              {currentQuestionIndex < quizQuestions.length - 1 ? (
                <Button
                  onClick={() => {
                    setExitDirection("down")
                    setCurrentQuestionIndex(currentQuestionIndex + 1)
                    setSelectedOption(null)
                    setIsAnswered(false)
                  }}
                  disabled={!isAnswered}
                >
                  Next
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              ) : (
                <Button onClick={finishQuiz} disabled={!isAnswered}>
                  Finish Quiz
                </Button>
              )}
            </CardFooter>
          </Card>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
