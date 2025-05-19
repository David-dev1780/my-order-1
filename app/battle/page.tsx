"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Copy, Crown, Share2, Swords, Users, Zap } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"

export default function BattlePage() {
  const router = useRouter()
  const { toast } = useToast()
  const [inviteId, setInviteId] = useState("")
  const [roomCreated, setRoomCreated] = useState(false)
  const [roomId, setRoomId] = useState("")

  const handleCreateRoom = () => {
    // Generate a random room ID
    const newRoomId = Math.random().toString(36).substring(2, 8).toUpperCase()
    setRoomId(newRoomId)
    setRoomCreated(true)

    toast({
      title: "Battle Room Created!",
      description: `Your room ID is ${newRoomId}. Share it with your friends to start the battle.`,
    })
  }

  const handleCopyInvite = () => {
    navigator.clipboard.writeText(roomId)
    toast({
      title: "Copied to clipboard!",
      description: "Share this code with your friends to join the battle.",
    })
  }

  const handleJoinRoom = () => {
    if (!inviteId) {
      toast({
        title: "Error",
        description: "Please enter an invite ID",
        variant: "destructive",
      })
      return
    }

    toast({
      title: "Joining Battle Room",
      description: `Connecting to room ${inviteId}...`,
    })

    // Simulate joining a room
    setTimeout(() => {
      router.push(`/battle/room/${inviteId}`)
    }, 1500)
  }

  return (
    <div className="container mx-auto px-4 py-8 pb-20">
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="sm" onClick={() => router.push("/")} className="mr-2">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back
        </Button>
        <h1 className="text-2xl font-bold">Battle With Friends</h1>
      </div>

      {/* Battle Pass Promo Card */}
      <Card className="mb-6 overflow-hidden border-none shadow-lg bg-gradient-to-r from-primary/90 to-purple-600 text-primary-foreground">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-2">Battle Pass</h2>
              <p className="text-primary-foreground/80 mb-4">
                Upgrade your battle experience with a Battle Pass! Get unlimited battles, exclusive themes, and earn
                more tokens.
              </p>
              <Button variant="secondary" onClick={() => router.push("/battle/purchase")}>
                <Zap className="h-4 w-4 mr-2" />
                Get Battle Pass
              </Button>
            </div>
            <div className="flex-shrink-0 flex items-center justify-center">
              <div className="h-24 w-24 rounded-full bg-white/20 flex flex-col items-center justify-center">
                <Swords className="h-10 w-10 text-white mb-1" />
                <div className="text-xs">Premium</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="w-full max-w-md mx-auto">
        {!roomCreated ? (
          <Tabs defaultValue="create">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="create">Create Battle</TabsTrigger>
              <TabsTrigger value="join">Join Battle</TabsTrigger>
            </TabsList>

            <TabsContent value="create">
              <Card>
                <CardHeader>
                  <CardTitle>Create a Battle Room</CardTitle>
                  <CardDescription>Challenge your friends to a quiz battle</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium">Select Exam Category</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {["UPSC", "MPSC", "SSC", "Current Affairs"].map((category) => (
                        <Button key={category} variant="outline" className="justify-start">
                          {category}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-sm font-medium">Battle Settings</h3>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="space-y-1">
                        <label className="text-xs text-muted-foreground">Number of Questions</label>
                        <select className="w-full h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm">
                          <option>5</option>
                          <option>10</option>
                          <option>15</option>
                          <option>20</option>
                        </select>
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs text-muted-foreground">Time per Question</label>
                        <select className="w-full h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm">
                          <option>10 seconds</option>
                          <option>15 seconds</option>
                          <option>20 seconds</option>
                          <option>30 seconds</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <input type="checkbox" id="token-battle" className="mr-2" />
                    <label htmlFor="token-battle" className="text-sm">
                      Token Battle (Each player spends 10 tokens)
                    </label>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" onClick={handleCreateRoom}>
                    <Users className="h-4 w-4 mr-2" />
                    Create Battle Room
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="join">
              <Card>
                <CardHeader>
                  <CardTitle>Join a Battle Room</CardTitle>
                  <CardDescription>Enter the invite code shared by your friend</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Invite Code</label>
                    <Input
                      placeholder="Enter 6-digit code (e.g., AB12CD)"
                      value={inviteId}
                      onChange={(e) => setInviteId(e.target.value.toUpperCase())}
                      maxLength={6}
                      className="text-center text-lg tracking-widest font-medium"
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" onClick={handleJoinRoom}>
                    Join Battle
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        ) : (
          <Card className="border-2 border-primary/20">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Battle Room Created</CardTitle>
                <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300">
                  Active
                </Badge>
              </div>
              <CardDescription>Share this code with your friends</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col items-center">
                <div className="text-3xl font-bold tracking-widest mb-2">{roomId}</div>
                <Button variant="outline" size="sm" onClick={handleCopyInvite}>
                  <Copy className="h-4 w-4 mr-2" />
                  Copy Invite Code
                </Button>
              </div>

              <div className="border rounded-lg p-4">
                <h3 className="font-medium mb-3">Waiting for players...</h3>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center mr-2 text-primary-foreground">
                      <Crown className="h-4 w-4" />
                    </div>
                    <span>You (Host)</span>
                    <Badge className="ml-auto">Ready</Badge>
                  </div>
                  <div className="flex items-center text-muted-foreground">
                    <div className="h-8 w-8 rounded-full border-2 border-dashed flex items-center justify-center mr-2">
                      <Users className="h-4 w-4" />
                    </div>
                    <span>Waiting for player...</span>
                  </div>
                  <div className="flex items-center text-muted-foreground">
                    <div className="h-8 w-8 rounded-full border-2 border-dashed flex items-center justify-center mr-2">
                      <Users className="h-4 w-4" />
                    </div>
                    <span>Waiting for player...</span>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-2">
              <Button className="w-full">Start Battle (1/3 players)</Button>
              <Button variant="outline" className="w-full">
                <Share2 className="h-4 w-4 mr-2" />
                Share Invite Link
              </Button>
              <Button variant="ghost" className="w-full" onClick={() => setRoomCreated(false)}>
                Cancel
              </Button>
            </CardFooter>
          </Card>
        )}
      </div>
    </div>
  )
}
