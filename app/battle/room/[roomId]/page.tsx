"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Clock, Crown, MessageSquare, Send, Users } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/hooks/use-toast"
import { CelebrationOverlay } from "@/components/celebration-overlay"

export default function BattleRoomPage({ params }: { params: { roomId: string } }) {
  const router = useRouter()
  const { toast } = useToast()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
  const [timeLeft, setTimeLeft] = useState(10)
  const [score, setScore] = useState(0)
  const [battleStarted, setBattleStarted] = useState(false)
  const [chatMessage, setChatMessage] = useState("")
  const [messages, setMessages] = useState<{ user: string; message: string }[]>([
    { user: "System", message: "Welcome to Battle Room! The quiz will start soon." },
    { user: "Rahul", message: "Hi everyone, ready to compete?" },
    { user: "Anjali", message: "Good luck to all!" },
  ])
  const [startY, setStartY] = useState(0)
  const [showCelebration, setShowCelebration] = useState(false)
  const [countdown, setCountdown] = useState(5)

  // Mock battle data
  const battleData = {
    roomId: params.roomId,
    players: [
      { name: "You", score: score, avatar: "YO", isReady: true, isHost: false },
      { name: "Rahul", score: Math.floor(Math.random() * 3), avatar: "RK", isReady: true, isHost: true },
      { name: "Anjali", score: Math.floor(Math.random() * 3), avatar: "AP", isReady: true, isHost: false },
    ],
    questions: [
      {
        text: "Which of the following is NOT a fundamental right guaranteed by the Indian Constitution?",
        options: ["Right to Equality", "Right to Freedom", "Right to Property", "Right to Freedom of Religion"],
        correctAnswer: "Right to Property",
        explanation:
          "Right to Property was removed from the list of Fundamental Rights by the 44th Amendment Act, 1978.",
      },
      {
        text: "Who was the first woman to become the Prime Minister of India?",
        options: ["Sonia Gandhi", "Indira Gandhi", "Sarojini Naidu", "Pratibha Patil"],
        correctAnswer: "Indira Gandhi",
        explanation: "Indira Gandhi was the first and, to date, only female Prime Minister of India.",
      },
      {
        text: "Which of the following rivers flows through the most number of countries?",
        options: ["Nile", "Amazon", "Danube", "Ganges"],
        correctAnswer: "Danube",
        explanation: "The Danube flows through 10 countries, more than any other river in the world.",
      },
      {
        text: "Which of the following is the largest planet in our solar system?",
        options: ["Earth", "Saturn", "Jupiter", "Neptune"],
        correctAnswer: "Jupiter",
        explanation: "Jupiter is the largest planet in our solar system.",
      },
      {
        text: "Who wrote the book 'Discovery of India'?",
        options: ["Mahatma Gandhi", "Jawaharlal Nehru", "Rabindranath Tagore", "Dr. B.R. Ambedkar"],
        correctAnswer: "Jawaharlal Nehru",
        explanation: "The book was written by Jawaharlal Nehru during his imprisonment at Ahmednagar fort.",
      },
    ],
  }

  const question = battleData.questions[currentQuestion]

  // Handle touch start
  const handleTouchStart = (e: React.TouchEvent) => {
    if (!battleStarted || selectedOption !== null) return
    setStartY(e.touches[0].clientY)
  }

  // Handle touch move
  const handleTouchMove = (e: React.TouchEvent) => {
    if (!battleStarted || selectedOption !== null) return

    const currentY = e.touches[0].clientY
    const diff = startY - currentY

    // Threshold for swipe detection
    if (Math.abs(diff) > 100) {
      if (diff > 0 && currentQuestion < battleData.questions.length - 1) {
        // Swipe up - skip question (in battle mode, this is considered a forfeit for the question)
        toast({
          title: "Question Skipped",
          description: "You forfeited this question.",
        })
        setCurrentQuestion(currentQuestion + 1)
        setSelectedOption(null)
        setIsCorrect(null)
        setTimeLeft(10)
      }
      setStartY(currentY)
    }
  }

  // Handle option selection
  const handleOptionSelect = (option: string) => {
    if (selectedOption !== null) return // Prevent changing answer

    setSelectedOption(option)
    const correct = option === question.correctAnswer
    setIsCorrect(correct)

    if (correct) {
      setScore(score + 1)
      setShowCelebration(true)

      // Update player score in real-time
      const updatedPlayers = [...battleData.players]
      const playerIndex = updatedPlayers.findIndex((p) => p.name === "You")
      if (playerIndex !== -1) {
        updatedPlayers[playerIndex].score = score + 1
      }

      // Simulate opponent answering
      setTimeout(() => {
        const opponentIndex = Math.floor(Math.random() * (battleData.players.length - 1)) + 1
        const correctChance = Math.random() > 0.5
        if (correctChance) {
          updatedPlayers[opponentIndex].score += 1
          setMessages([
            ...messages,
            {
              user: "System",
              message: `${battleData.players[opponentIndex].name} answered correctly!`,
            },
          ])
        }
      }, 1000)
    } else {
      toast({
        title: "Wrong Answer",
        description: question.explanation,
        variant: "destructive",
      })
    }
  }

  // Timer effect
  useEffect(() => {
    if (!battleStarted) return

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
  }, [battleStarted, selectedOption])

  // Start battle countdown
  useEffect(() => {
    if (battleStarted) return

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          setBattleStarted(true)
          toast({
            title: "Battle Started!",
            description: "Good luck!",
          })
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  // Move to next question after celebration
  const handleCelebrationComplete = () => {
    setShowCelebration(false)

    // Move to next question after 1 second
    setTimeout(() => {
      if (currentQuestion < battleData.questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1)
        setSelectedOption(null)
        setIsCorrect(null)
        setTimeLeft(10)
      } else {
        // Battle completed
        router.push(`/battle/results?roomId=${params.roomId}&score=${score}&total=${battleData.questions.length}`)
      }
    }, 1000)
  }

  const handleSendMessage = () => {
    if (!chatMessage.trim()) return

    setMessages([...messages, { user: "You", message: chatMessage }])
    setChatMessage("")

    // Simulate opponent response
    setTimeout(() => {
      const responses = [
        "Good luck!",
        "That was a tough one!",
        "I knew that answer!",
        "How are you doing so far?",
        "Let's focus on the next question!",
      ]
      const randomResponse = responses[Math.floor(Math.random() * responses.length)]
      const opponent = Math.random() > 0.5 ? "Rahul" : "Anjali"

      setMessages((prev) => [...prev, { user: opponent, message: randomResponse }])
    }, 2000)
  }

  return (
    <div className="container mx-auto px-4 py-8 pb-20" onTouchStart={handleTouchStart} onTouchMove={handleTouchMove}>
      <CelebrationOverlay show={showCelebration} onComplete={handleCelebrationComplete} message="Correct Answer!" />

      <div className="flex items-center mb-6">
        <Button variant="ghost" size="sm" onClick={() => router.push("/battle")} className="mr-2">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Leave Battle
        </Button>
        <h1 className="text-2xl font-bold">Battle Room: {params.roomId}</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          {!battleStarted ? (
            <Card className="border-2 border-primary/20">
              <CardHeader>
                <CardTitle className="text-center">Battle Starting Soon...</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <div className="text-6xl font-bold mb-4">{countdown}</div>
                <p className="text-muted-foreground">Get ready for the battle!</p>
              </CardContent>
            </Card>
          ) : (
            <>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">
                  Question {currentQuestion + 1} of {battleData.questions.length}
                </span>
                <Badge variant={timeLeft <= 3 ? "destructive" : "outline"} className="animate-pulse">
                  <Clock className="h-3 w-3 mr-1" />
                  {timeLeft} seconds left
                </Badge>
              </div>

              <Progress value={(currentQuestion / battleData.questions.length) * 100} className="mb-6" />

              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>{question.text}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {question.options.map((option, index) => (
                    <div
                      key={index}
                      onClick={() => selectedOption === null && handleOptionSelect(option)}
                      className={`
                        p-4 rounded-lg border-2 cursor-pointer transition-all
                        ${selectedOption === option && isCorrect ? "border-green-500 bg-green-50 dark:bg-green-900/20" : ""}
                        ${selectedOption === option && !isCorrect ? "border-red-500 bg-red-50 dark:bg-red-900/20" : ""}
                        ${selectedOption === null ? "hover:border-primary/50" : ""}
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
                  <div className="text-sm text-muted-foreground text-center mt-4">
                    Swipe up to skip question (counts as incorrect)
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="h-5 w-5 mr-2 text-primary" />
                Players
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {battleData.players.map((player, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div
                      className={`h-8 w-8 rounded-full ${player.name === "You" ? "bg-primary text-primary-foreground" : "bg-primary/20"} flex items-center justify-center mr-2`}
                    >
                      <span className="text-xs font-medium">{player.avatar}</span>
                    </div>
                    <div>
                      <div className="flex items-center">
                        <span className="font-medium">{player.name}</span>
                        {player.isHost && <Crown className="h-3 w-3 ml-1 text-yellow-500" />}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Score: {player.name === "You" ? score : player.score}
                      </div>
                    </div>
                  </div>
                  <Badge variant={player.isReady ? "default" : "outline"}>{player.isReady ? "Ready" : "Waiting"}</Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <MessageSquare className="h-5 w-5 mr-2 text-primary" />
                Chat
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="h-[300px] overflow-y-auto border rounded-md p-2 space-y-2">
                {messages.map((msg, index) => (
                  <div key={index} className={`flex ${msg.user === "You" ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-[80%] rounded-lg px-3 py-2 ${
                        msg.user === "You"
                          ? "bg-primary text-primary-foreground"
                          : msg.user === "System"
                            ? "bg-muted italic"
                            : "bg-muted/50"
                      }`}
                    >
                      {msg.user !== "You" && <div className="text-xs font-medium mb-1">{msg.user}</div>}
                      <div className="text-sm">{msg.message}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Type a message..."
                  className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors"
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                />
                <Button size="sm" onClick={handleSendMessage}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
