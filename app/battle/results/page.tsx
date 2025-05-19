"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Coins, Download, Share2, Trophy, Users } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import confetti from "canvas-confetti"
import { useEffect, useState } from "react"

export default function BattleResultsPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const roomId = searchParams.get("roomId") || ""
  const score = Number.parseInt(searchParams.get("score") || "0")
  const total = Number.parseInt(searchParams.get("total") || "5")
  const percentage = Math.round((score / total) * 100)
  const [showAd, setShowAd] = useState(true)
  const [tokensEarned, setTokensEarned] = useState(0)

  // Mock battle results
  const battleResults = {
    players: [
      { name: "You", score: score, avatar: "YO", rank: 1 },
      { name: "Rahul", score: Math.max(0, score - 1), avatar: "RK", rank: 2 },
      { name: "Anjali", score: Math.max(0, score - 2), avatar: "AP", rank: 3 },
    ]
      .sort((a, b) => b.score - a.score)
      .map((player, index) => ({ ...player, rank: index + 1 })),
  }

  // Calculate tokens earned based on performance
  useEffect(() => {
    const yourRank = battleResults.players.find((p) => p.name === "You")?.rank || 3
    const baseTokens = 5
    const rankBonus = yourRank === 1 ? 10 : yourRank === 2 ? 5 : 0
    const accuracyBonus = Math.floor((score / total) * 10)

    const totalTokens = baseTokens + rankBonus + accuracyBonus
    setTokensEarned(totalTokens)
  }, [score, total])

  // Trigger confetti effect on load
  useEffect(() => {
    const yourRank = battleResults.players.find((p) => p.name === "You")?.rank || 3

    if (yourRank === 1) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      })
    }
  }, [])

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
          <h1 className="text-2xl font-bold">Battle Results</h1>
        </div>

        <div className="w-full max-w-md mx-auto">
          <Card className="border-2 border-primary/20 shadow-lg overflow-hidden">
            <div className="h-40 bg-gradient-to-r from-primary to-purple-600 relative flex items-center justify-center">
              <Trophy className="h-20 w-20 text-white/90" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                <h2 className="text-white text-xl font-bold">Battle Results</h2>
              </div>
            </div>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Battle Completed!</CardTitle>
              <CardDescription>Room ID: {roomId}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Leaderboard */}
              <div className="space-y-3">
                <h3 className="font-semibold text-lg">Leaderboard</h3>
                {battleResults.players.map((player, index) => (
                  <div
                    key={index}
                    className={`flex items-center justify-between p-3 rounded-lg ${
                      player.name === "You" ? "bg-primary/10 border-2 border-primary/20" : "bg-muted/50"
                    }`}
                  >
                    <div className="flex items-center">
                      <div
                        className={`
                        h-8 w-8 rounded-full flex items-center justify-center mr-3
                        ${player.rank === 1 ? "bg-yellow-500" : player.rank === 2 ? "bg-gray-400" : "bg-amber-600"}
                        text-white font-bold
                      `}
                      >
                        {player.rank}
                      </div>
                      <div className="flex items-center">
                        <div
                          className={`h-8 w-8 rounded-full ${player.name === "You" ? "bg-primary" : "bg-primary/20"} flex items-center justify-center mr-2`}
                        >
                          <span className="text-xs font-medium">{player.avatar}</span>
                        </div>
                        <span className="font-medium">{player.name}</span>
                      </div>
                    </div>
                    <span className="font-bold">{player.score} pts</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col items-center justify-center">
                <div className="text-2xl font-bold mb-2">Your Performance</div>
                <div className="text-4xl font-bold">{percentage}%</div>
                <div className="text-muted-foreground">
                  You scored {score} out of {total}
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Accuracy</span>
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

              <div className="p-4 rounded-lg bg-gradient-to-r from-yellow-500/20 to-amber-500/20 border border-yellow-500/30">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Coins className="h-5 w-5 mr-2 text-yellow-500" />
                    <span className="font-medium">Tokens Earned</span>
                  </div>
                  <span className="text-xl font-bold">{tokensEarned}</span>
                </div>
                <div className="text-sm text-muted-foreground mt-1">
                  {battleResults.players.find((p) => p.name === "You")?.rank === 1
                    ? "Congratulations on your victory!"
                    : "Keep practicing to improve your rank!"}
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-2">
              <Button className="w-full" onClick={() => router.push("/battle")}>
                <Users className="h-4 w-4 mr-2" />
                New Battle
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
