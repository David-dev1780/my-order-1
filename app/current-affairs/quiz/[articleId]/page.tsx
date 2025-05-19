"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Clock, Coins, Trophy } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/hooks/use-toast"
import { motion, AnimatePresence } from "framer-motion"
import { CelebrationOverlay } from "@/components/celebration-overlay"

export default function CurrentAffairsQuizPage({ params }: { params: { articleId: string } }) {
  const router = useRouter()
  const { toast } = useToast()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
  const [timeLeft, setTimeLeft] = useState(15)
  const [tokens, setTokens] = useState(50)
  const [score, setScore] = useState(0)
  const [showCelebration, setShowCelebration] = useState(false)
  const [exitDirection, setExitDirection] = useState<"left" | "right" | "up" | "down">("left")

  // Get article data based on articleId
  const articleIndex = Number.parseInt(params.articleId)
  const article = currentAffairs[articleIndex] || currentAffairs[0]

  // Get questions for this article
  const questions = quizQuestions.filter((q) => q.articleId === articleIndex) || quizQuestions.slice(0, 5)
  const question = questions[currentQuestion]

  // Handle option selection
  const handleOptionSelect = (option: string) => {
    if (selectedOption !== null) return // Prevent changing answer

    setSelectedOption(option)
    const correct = option === question.correctAnswer
    setIsCorrect(correct)

    if (correct) {
      setScore(score + 1)
      setShowCelebration(true)
      setTokens(tokens + 2)

      // Set random exit direction
      const directions: ["left", "right", "up", "down"] = ["left", "right", "up", "down"]
      setExitDirection(directions[Math.floor(Math.random() * directions.length)])
    } else {
      toast({
        title: "Wrong Answer",
        description: question.explanation,
        variant: "destructive",
      })

      // Set random exit direction
      const directions: ["left", "right", "up", "down"] = ["left", "right", "up", "down"]
      setExitDirection(directions[Math.floor(Math.random() * directions.length)])

      // Move to next question after 2 seconds
      setTimeout(() => {
        proceedToNextQuestion()
      }, 2000)
    }
  }

  // Proceed to next question
  const proceedToNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedOption(null)
      setIsCorrect(null)
      setTimeLeft(15)
    } else {
      // Quiz completed
      completeQuiz()
    }
  }

  // Complete quiz
  const completeQuiz = () => {
    const earnedTokens = score * 2

    toast({
      title: "Quiz Completed!",
      description: `You scored ${score} out of ${questions.length} and earned ${earnedTokens} tokens!`,
    })

    setTimeout(() => {
      router.push("/current-affairs")
    }, 2000)
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
  }, [selectedOption, currentQuestion])

  // Animation variants
  const cardVariants = {
    initial: (direction: string) => {
      return {
        x: direction === "left" ? -300 : direction === "right" ? 300 : 0,
        y: direction === "up" ? -300 : direction === "down" ? 300 : 0,
        opacity: 0,
        scale: 0.8,
      }
    },
    animate: {
      x: 0,
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
    exit: (direction: string) => {
      return {
        x: direction === "left" ? -300 : direction === "right" ? 300 : 0,
        y: direction === "up" ? -300 : direction === "down" ? 300 : 0,
        opacity: 0,
        scale: 0.8,
        transition: {
          duration: 0.5,
          ease: "easeIn",
        },
      }
    },
  }

  return (
    <div className="container mx-auto px-4 py-8 pb-20">
      <CelebrationOverlay
        show={showCelebration}
        onComplete={() => {
          setShowCelebration(false)
          proceedToNextQuestion()
        }}
      />

      <div className="flex items-center mb-6">
        <Button variant="ghost" size="sm" onClick={() => router.push("/current-affairs")} className="mr-2">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back
        </Button>
        <h1 className="text-2xl font-bold">{article.title} - Quiz</h1>
        <div className="ml-auto flex items-center">
          <Coins className="h-4 w-4 mr-1 text-yellow-500" />
          <span className="font-medium">{tokens} tokens</span>
        </div>
      </div>

      {/* Quiz Info Card */}
      <Card className="mb-6 shadow-md overflow-hidden">
        <div className="flex flex-col sm:flex-row">
          <div className="sm:w-1/3 h-40 sm:h-auto bg-muted relative">
            <img src={article.image || "/placeholder.svg"} alt={article.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-primary/60 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-4 text-white">
              <Badge variant="secondary" className="bg-white/20 text-white mb-2">
                {article.category}
              </Badge>
              <h2 className="text-xl font-bold">{article.title}</h2>
            </div>
          </div>
          <div className="flex-1 p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-muted-foreground">Test your knowledge on this article</p>
              </div>
              <Badge variant="outline" className="bg-blue-50 text-blue-800 border-blue-200">
                <Clock className="h-3 w-3 mr-1" />
                {questions.length * 15} seconds
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Trophy className="h-4 w-4 mr-1 text-primary" />
                <span className="text-sm">Earn 2 tokens per correct answer</span>
              </div>
              <div className="flex items-center">
                <span className="text-sm font-medium">
                  Question {currentQuestion + 1} of {questions.length}
                </span>
              </div>
            </div>
          </div>
        </div>
      </Card>

      <div className="w-full max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-2">
          <Badge variant={timeLeft <= 5 ? "destructive" : "outline"} className="animate-pulse">
            {timeLeft} seconds left
          </Badge>
          <Badge variant="outline">
            Score: {score}/{questions.length}
          </Badge>
        </div>

        <Progress value={(currentQuestion / questions.length) * 100} className="mb-6" />

        <AnimatePresence mode="wait" custom={exitDirection}>
          <motion.div
            key={currentQuestion}
            custom={exitDirection}
            variants={cardVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <Card className="mb-6 shadow-md overflow-hidden border-none">
              <div className="bg-gradient-to-r from-primary/10 to-primary/5 p-6">
                <h2 className="text-xl font-bold mb-2">{question.text}</h2>
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
                {selectedOption !== null && isCorrect && (
                  <Button onClick={proceedToNextQuestion}>
                    {currentQuestion < questions.length - 1 ? "Next Question" : "Complete Quiz"}
                  </Button>
                )}
              </CardFooter>
            </Card>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

// Sample quiz questions
const quizQuestions = [
  {
    articleId: 0, // Union Budget
    text: "What is the allocation for infrastructure development in the Union Budget 2025?",
    options: ["₹8 lakh crore", "₹10 lakh crore", "₹12 lakh crore", "₹15 lakh crore"],
    correctAnswer: "₹12 lakh crore",
    explanation: "The Union Budget 2025 has allocated ₹12 lakh crore for infrastructure development.",
    image: "https://placehold.co/600x400/orange/white?text=Budget+Question",
  },
  {
    articleId: 0,
    text: "Which of the following sectors received the second highest allocation in the Union Budget 2025?",
    options: ["Defense", "Education", "Healthcare", "Agriculture"],
    correctAnswer: "Healthcare",
    explanation: "Healthcare received ₹8 lakh crore, the second highest allocation after infrastructure.",
    image: null,
  },
  {
    articleId: 0,
    text: "What is one of the new initiatives announced in the Union Budget 2025?",
    options: ["Space exploration program", "Digital health program", "Universal basic income", "Free higher education"],
    correctAnswer: "Digital health program",
    explanation: "A comprehensive digital health program was among the new initiatives announced.",
    image: null,
  },
  {
    articleId: 1, // Climate Change Summit
    text: "What percentage reduction in carbon emissions did major economies pledge by 2030?",
    options: ["30%", "40%", "50%", "60%"],
    correctAnswer: "50%",
    explanation: "Major economies pledged to reduce carbon emissions by 50% by 2030.",
    image: "https://placehold.co/600x400/blue/white?text=Climate+Question",
  },
  {
    articleId: 1,
    text: "How much funding was announced for developing countries to transition to clean energy?",
    options: ["$50 billion", "$75 billion", "$100 billion", "$150 billion"],
    correctAnswer: "$100 billion",
    explanation:
      "A new global fund of $100 billion was announced to help developing countries transition to clean energy.",
    image: null,
  },
  {
    articleId: 2, // Supreme Court Verdict
    text: "What was the verdict ratio in the Supreme Court judgment on electoral bonds?",
    options: ["3:2", "4:1", "5:0", "2:3"],
    correctAnswer: "4:1",
    explanation: "The Supreme Court declared the electoral bonds scheme unconstitutional in a 4:1 verdict.",
    image: "https://placehold.co/600x400/red/white?text=Supreme+Court+Question",
  },
  {
    articleId: 2,
    text: "What did the Supreme Court order political parties to do regarding donor details?",
    options: [
      "Keep them confidential",
      "Disclose them within two months",
      "Submit them to the Election Commission only",
      "Destroy all records",
    ],
    correctAnswer: "Disclose them within two months",
    explanation: "The court ordered all political parties to disclose donor details within two months.",
    image: null,
  },
  {
    articleId: 3, // Space Mission
    text: "What is the name of ISRO's mission to study Earth's outer atmosphere?",
    options: ["Gaganyaan", "Chandrayaan", "Aakash-1", "Mangalyaan-2"],
    correctAnswer: "Aakash-1",
    explanation: "The mission is named 'Aakash-1' and will deploy a satellite in low Earth orbit.",
    image: "https://placehold.co/600x400/purple/white?text=ISRO+Question",
  },
  {
    articleId: 3,
    text: "What percentage of components in the Aakash-1 mission are manufactured in India?",
    options: ["75%", "85%", "90%", "95%"],
    correctAnswer: "95%",
    explanation:
      "The mission represents a significant advancement in indigenous space technology, with over 95% of components manufactured in India.",
    image: null,
  },
  {
    articleId: 4, // G20 Economic Forum
    text: "What new framework did India propose at the G20 Economic Forum?",
    options: [
      "International trade regulations",
      "Digital currencies cooperation",
      "Climate finance",
      "Global taxation",
    ],
    correctAnswer: "Digital currencies cooperation",
    explanation: "India proposed a new framework for international cooperation on digital currencies.",
    image: "https://placehold.co/600x400/orange/white?text=G20+Question",
  },
  {
    articleId: 5, // Education Policy
    text: "By which year is the New Education Policy expected to be fully implemented across all states?",
    options: ["2024", "2025", "2026", "2030"],
    correctAnswer: "2026",
    explanation: "The government announced full implementation of the New Education Policy across all states by 2026.",
    image: "https://placehold.co/600x400/green/white?text=Education+Question",
  },
  {
    articleId: 6, // Quantum Computing
    text: "How much faster is the new quantum algorithm compared to conventional methods?",
    options: ["50 times", "75 times", "100 times", "200 times"],
    correctAnswer: "100 times",
    explanation: "The algorithm solves complex optimization problems 100 times faster than conventional methods.",
    image: "https://placehold.co/600x400/teal/white?text=Quantum+Question",
  },
]

// Current affairs data
const currentAffairs = [
  {
    title: "Union Budget 2025 Highlights",
    description:
      "The Finance Minister presented the Union Budget 2025 with a focus on infrastructure development, healthcare, and education.",
    category: "Economy",
    date: "May 17, 2025",
    image: "https://placehold.co/600x400/orange/white?text=Budget+2025",
  },
  {
    title: "International Summit on Climate Change",
    description:
      "World leaders gathered in Geneva to discuss measures to combat climate change and reduce carbon emissions by 2030.",
    category: "International",
    date: "May 16, 2025",
    image: "https://placehold.co/600x400/blue/white?text=Climate+Summit",
  },
  {
    title: "Supreme Court Verdict on Electoral Bonds",
    description:
      "The Supreme Court delivered a landmark judgment on the constitutionality of electoral bonds and political funding.",
    category: "Polity",
    date: "May 15, 2025",
    image: "https://placehold.co/600x400/red/white?text=Supreme+Court",
  },
  {
    title: "New Space Mission Announced",
    description:
      "ISRO announced its next mission to study the outer atmosphere of Earth, scheduled for launch in December 2025.",
    category: "Science",
    date: "May 14, 2025",
    image: "https://placehold.co/600x400/purple/white?text=ISRO+Mission",
  },
  {
    title: "G20 Economic Forum",
    description:
      "India hosted the G20 Economic Forum focusing on global economic recovery and sustainable development.",
    category: "Economy",
    date: "May 13, 2025",
    image: "https://placehold.co/600x400/orange/white?text=G20+Forum",
  },
  {
    title: "New Education Policy Implementation",
    description: "The government announced full implementation of the New Education Policy across all states by 2026.",
    category: "Education",
    date: "May 12, 2025",
    image: "https://placehold.co/600x400/green/white?text=Education+Policy",
  },
  {
    title: "Breakthrough in Quantum Computing",
    description: "Indian scientists achieved a significant breakthrough in quantum computing with a new algorithm.",
    category: "Technology",
    date: "May 11, 2025",
    image: "https://placehold.co/600x400/teal/white?text=Quantum+Computing",
  },
]
