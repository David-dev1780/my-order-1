"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { ArrowLeft, ArrowRight, Check, BookOpen, Trophy, Users, Bell, Gift, Zap } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function OnboardingPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(0)

  const steps = [
    {
      title: "Welcome to QuizMaster",
      description: "Your ultimate companion for competitive exam preparation",
      image: "/placeholder.svg?height=300&width=600&text=Welcome",
    },
    {
      title: "Practice with Quizzes",
      description: "Take subject-wise quizzes and full-length mock tests to improve your knowledge",
      image: "/placeholder.svg?height=300&width=600&text=Quizzes",
    },
    {
      title: "Stay Updated with Current Affairs",
      description: "Read daily current affairs in a TikTok-style format and test your knowledge",
      image: "/placeholder.svg?height=300&width=600&text=Current+Affairs",
    },
    {
      title: "Battle with Friends",
      description: "Challenge your friends to quiz battles and climb the leaderboard",
      image: "/placeholder.svg?height=300&width=600&text=Battle",
    },
    {
      title: "Complete Tasks, Earn Tokens",
      description: "Earn tokens by completing daily tasks and use them to unlock premium content",
      image: "/placeholder.svg?height=300&width=600&text=Tasks",
    },
  ]

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      // Complete onboarding
      router.push("/dashboard")
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSkip = () => {
    router.push("/dashboard")
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-purple-50 to-white">
      {/* Progress indicator */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-gray-200 z-10">
        <div
          className="h-full bg-primary transition-all duration-300 ease-in-out"
          style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
        ></div>
      </div>

      {/* Skip button */}
      <div className="fixed top-4 right-4 z-10">
        <Button variant="ghost" onClick={handleSkip}>
          Skip
        </Button>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Main content */}
          <div className="mb-8">
            <div className="relative w-full h-64 rounded-xl overflow-hidden mb-6">
              <Image
                src={steps[currentStep].image || "/placeholder.svg"}
                alt={steps[currentStep].title}
                fill
                className="object-cover"
              />
            </div>

            <h1 className="text-2xl font-bold text-center mb-2">{steps[currentStep].title}</h1>
            <p className="text-center text-gray-600">{steps[currentStep].description}</p>
          </div>

          {/* App preview */}
          <Card className="mb-8 border-none shadow-lg overflow-hidden">
            <CardContent className="p-0">
              <Tabs defaultValue="features" className="w-full">
                <TabsList className="w-full grid grid-cols-3">
                  <TabsTrigger value="features">Features</TabsTrigger>
                  <TabsTrigger value="exams">Exams</TabsTrigger>
                  <TabsTrigger value="rewards">Rewards</TabsTrigger>
                </TabsList>

                <TabsContent value="features" className="p-4 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                      <BookOpen className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-medium">Interactive Quizzes</h3>
                      <p className="text-sm text-gray-500">Practice with thousands of questions</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
                      <Bell className="h-5 w-5 text-amber-600" />
                    </div>
                    <div>
                      <h3 className="font-medium">Current Affairs</h3>
                      <p className="text-sm text-gray-500">Stay updated with daily news</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                      <Users className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-medium">Multiplayer Battles</h3>
                      <p className="text-sm text-gray-500">Challenge friends to quiz battles</p>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="exams" className="p-4 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                      <Trophy className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-medium">UPSC Civil Services</h3>
                      <p className="text-sm text-gray-500">Prelims & Mains preparation</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                      <Zap className="h-5 w-5 text-red-600" />
                    </div>
                    <div>
                      <h3 className="font-medium">Banking & SSC</h3>
                      <p className="text-sm text-gray-500">Complete preparation for all exams</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
                      <BookOpen className="h-5 w-5 text-indigo-600" />
                    </div>
                    <div>
                      <h3 className="font-medium">State Services</h3>
                      <p className="text-sm text-gray-500">State-specific exam preparation</p>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="rewards" className="p-4 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center">
                      <Gift className="h-5 w-5 text-yellow-600" />
                    </div>
                    <div>
                      <h3 className="font-medium">Daily Rewards</h3>
                      <p className="text-sm text-gray-500">Earn tokens for daily logins</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center">
                      <Check className="h-5 w-5 text-teal-600" />
                    </div>
                    <div>
                      <h3 className="font-medium">Task Completion</h3>
                      <p className="text-sm text-gray-500">Earn by completing daily tasks</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center">
                      <Users className="h-5 w-5 text-pink-600" />
                    </div>
                    <div>
                      <h3 className="font-medium">Referral Bonuses</h3>
                      <p className="text-sm text-gray-500">Invite friends to earn more</p>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Navigation buttons */}
          <div className="flex justify-between">
            <Button variant="outline" onClick={handleBack} disabled={currentStep === 0}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>

            <Button onClick={handleNext}>
              {currentStep === steps.length - 1 ? (
                <>
                  Get Started
                  <Check className="ml-2 h-4 w-4" />
                </>
              ) : (
                <>
                  Next
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Dots indicator */}
      <div className="flex justify-center pb-8">
        {steps.map((_, index) => (
          <button
            key={index}
            className={`w-2.5 h-2.5 rounded-full mx-1 ${currentStep === index ? "bg-primary" : "bg-gray-300"}`}
            onClick={() => setCurrentStep(index)}
          />
        ))}
      </div>
    </div>
  )
}
