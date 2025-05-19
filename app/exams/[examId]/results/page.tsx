"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Download, Share2, Trophy } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import confetti from "canvas-confetti"
import { useEffect, useState } from "react"

export default function ResultsPage({ params }: { params: { examId: string } }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const score = Number.parseInt(searchParams.get("score") || "0")
  const total = Number.parseInt(searchParams.get("total") || "5")
  const percentage = Math.round((score / total) * 100)

  // Get exam data based on examId
  const exam = exams.find((e) => e.id === params.examId) || {
    name: "Exam",
    id: "exam",
    image: "/placeholder.svg?height=200&width=400&text=Exam",
  }

  // Trigger confetti effect on load
  useEffect(() => {
    if (percentage > 70) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      })
    }
  }, [percentage])

  const [showAd, setShowAd] = useState(true)

  return (
    <>
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
              <Button onClick={() => setShowAd(false)}>View Your Results</Button>
            </CardContent>
          </Card>
        </div>
      )}
      <div className="container mx-auto px-4 py-8 pb-20">
        <div className="flex items-center mb-6">
          <Button variant="ghost" size="sm" onClick={() => router.push("/")} className="mr-2">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Dashboard
          </Button>
          <h1 className="text-2xl font-bold">{exam.name} Results</h1>
        </div>

        <div className="w-full max-w-md mx-auto">
          <Card className="border-2 border-primary/20 shadow-lg overflow-hidden">
            <div className="h-40 bg-muted relative">
              <img src={exam.image || "/placeholder.svg"} alt={exam.name} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                <h2 className="text-white text-xl font-bold">{exam.name} Results</h2>
              </div>
            </div>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Quiz Completed!</CardTitle>
              <CardDescription>Here's how you performed</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col items-center justify-center">
                <div className="relative w-32 h-32 mb-4">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Trophy
                      className={`h-16 w-16 ${percentage >= 80 ? "text-yellow-500" : percentage >= 60 ? "text-gray-400" : "text-orange-400"}`}
                    />
                  </div>
                  <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="10"
                      strokeLinecap="round"
                      className="text-muted/20"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="10"
                      strokeLinecap="round"
                      strokeDasharray="283"
                      strokeDashoffset={283 - (283 * percentage) / 100}
                      className={`${
                        percentage >= 80
                          ? "text-green-500"
                          : percentage >= 60
                            ? "text-blue-500"
                            : percentage >= 40
                              ? "text-orange-500"
                              : "text-red-500"
                      }`}
                    />
                  </svg>
                </div>
                <div className="text-4xl font-bold">{percentage}%</div>
                <div className="text-muted-foreground">
                  You scored {score} out of {total}
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Performance</span>
                  <span className="font-medium">
                    {percentage >= 80
                      ? "Excellent"
                      : percentage >= 60
                        ? "Good"
                        : percentage >= 40
                          ? "Average"
                          : "Needs Improvement"}
                  </span>
                </div>
                <Progress value={percentage} className="h-2" />
              </div>

              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="p-3 rounded-lg bg-muted/50">
                  <div className="text-2xl font-bold">{total}</div>
                  <div className="text-xs text-muted-foreground">Questions</div>
                </div>
                <div className="p-3 rounded-lg bg-muted/50">
                  <div className="text-2xl font-bold">{score}</div>
                  <div className="text-xs text-muted-foreground">Correct</div>
                </div>
                <div className="p-3 rounded-lg bg-muted/50">
                  <div className="text-2xl font-bold">{total - score}</div>
                  <div className="text-xs text-muted-foreground">Incorrect</div>
                </div>
                <div className="p-3 rounded-lg bg-muted/50">
                  <div className="text-2xl font-bold">{score}</div>
                  <div className="text-xs text-muted-foreground">Tokens Earned</div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-2">
              <Button className="w-full" onClick={() => router.push(`/exams/${params.examId}`)}>
                Try Again
              </Button>
              <div className="flex gap-2 w-full">
                <Button variant="outline" className="flex-1">
                  <Download className="h-4 w-4 mr-2" />
                  Save Results
                </Button>
                <Button variant="outline" className="flex-1">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share Results
                </Button>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </>
  )
}

const exams = [
  {
    id: "upsc-prelims",
    name: "UPSC Prelims",
    image: "/placeholder.svg?height=200&width=400&text=UPSC+Prelims",
  },
  {
    id: "mpsc-prelims",
    name: "MPSC Prelims",
    image: "/placeholder.svg?height=200&width=400&text=MPSC+Prelims",
  },
  {
    id: "ssc-cgl",
    name: "SSC CGL",
    image: "/placeholder.svg?height=200&width=400&text=SSC+CGL",
  },
  {
    id: "banking",
    name: "Banking",
    image: "/placeholder.svg?height=200&width=400&text=Banking",
  },
  {
    id: "railways",
    name: "Railways",
    image: "/placeholder.svg?height=200&width=400&text=Railways",
  },
  {
    id: "current-affairs",
    name: "Current Affairs",
    image: "/placeholder.svg?height=200&width=400&text=Current+Affairs",
  },
]
