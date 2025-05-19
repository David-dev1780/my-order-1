"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ArrowLeft,
  Check,
  Clipboard,
  Coins,
  Copy,
  Facebook,
  Gift,
  Instagram,
  Mail,
  Twitter,
  Users,
  PhoneIcon as WhatsApp,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"

export default function InvitePage() {
  const router = useRouter()
  const { toast } = useToast()
  const [referralCode] = useState("QUIZ2025")
  const [referralLink] = useState("https://quizmaster.app/join?ref=QUIZ2025")
  const [email, setEmail] = useState("")
  const [invitedFriends, setInvitedFriends] = useState<string[]>([])
  const [copiedText, setCopiedText] = useState<string | null>(null)

  // Handle copy to clipboard
  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text)
    setCopiedText(type)

    toast({
      title: "Copied to clipboard!",
      description: `${type === "code" ? "Referral code" : "Referral link"} copied to clipboard.`,
    })

    // Reset copied state after 2 seconds
    setTimeout(() => {
      setCopiedText(null)
    }, 2000)
  }

  // Handle email invitation
  const handleEmailInvite = () => {
    if (!email) {
      toast({
        title: "Email Required",
        description: "Please enter your friend's email address.",
        variant: "destructive",
      })
      return
    }

    if (!email.includes("@") || !email.includes(".")) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      })
      return
    }

    if (invitedFriends.includes(email)) {
      toast({
        title: "Already Invited",
        description: "You've already invited this friend.",
        variant: "destructive",
      })
      return
    }

    // Simulate sending invitation
    setInvitedFriends([...invitedFriends, email])
    setEmail("")

    toast({
      title: "Invitation Sent!",
      description: "Your friend will receive an invitation email shortly.",
    })
  }

  // Handle social share
  const handleSocialShare = (platform: string) => {
    toast({
      title: `Sharing on ${platform}`,
      description: "Opening share dialog...",
    })

    // In a real app, this would open the appropriate share dialog
  }

  return (
    <div className="container mx-auto px-4 py-8 pb-20">
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="sm" onClick={() => router.push("/")} className="mr-2">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back
        </Button>
        <h1 className="text-2xl font-bold">Invite & Earn</h1>
      </div>

      {/* Hero Banner */}
      <Card className="mb-6 overflow-hidden border-none shadow-lg bg-gradient-to-r from-primary/90 to-purple-600 text-primary-foreground">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-2">Invite Friends, Earn Rewards</h2>
              <p className="text-primary-foreground/80 mb-4">
                Share your referral code with friends and earn 50 tokens for each friend who joins QuizMaster using your
                code.
              </p>
              <div className="flex flex-col sm:flex-row gap-2">
                <Button variant="secondary" className="sm:flex-1" onClick={() => router.push("/tasks")}>
                  <Gift className="h-4 w-4 mr-2" />
                  View All Tasks
                </Button>
                <Button variant="outline" className="bg-white/20 text-white hover:bg-white/30 sm:flex-1">
                  <Users className="h-4 w-4 mr-2" />
                  My Referrals
                </Button>
              </div>
            </div>
            <div className="flex-shrink-0 flex items-center justify-center">
              <div className="h-32 w-32 rounded-full bg-white/20 flex flex-col items-center justify-center">
                <Coins className="h-10 w-10 text-yellow-300 mb-1" />
                <div className="text-2xl font-bold">50</div>
                <div className="text-xs">tokens per referral</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Referral Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20">
          <CardContent className="p-4">
            <div className="flex flex-col items-center text-center">
              <Users className="h-6 w-6 mb-2 text-blue-600 dark:text-blue-400" />
              <div className="text-2xl font-bold">3</div>
              <div className="text-xs text-muted-foreground">Friends Invited</div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20">
          <CardContent className="p-4">
            <div className="flex flex-col items-center text-center">
              <Check className="h-6 w-6 mb-2 text-green-600 dark:text-green-400" />
              <div className="text-2xl font-bold">2</div>
              <div className="text-xs text-muted-foreground">Friends Joined</div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20">
          <CardContent className="p-4">
            <div className="flex flex-col items-center text-center">
              <Coins className="h-6 w-6 mb-2 text-yellow-600 dark:text-yellow-400" />
              <div className="text-2xl font-bold">100</div>
              <div className="text-xs text-muted-foreground">Tokens Earned</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Referral Code and Link */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Your Referral Details</CardTitle>
          <CardDescription>Share these with your friends to earn rewards</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-1 block">Referral Code</label>
            <div className="flex">
              <div className="bg-muted rounded-l-md p-3 flex-1 font-mono text-center">{referralCode}</div>
              <Button
                variant={copiedText === "code" ? "default" : "outline"}
                className="rounded-l-none"
                onClick={() => handleCopy(referralCode, "code")}
              >
                {copiedText === "code" ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium mb-1 block">Referral Link</label>
            <div className="flex">
              <div className="bg-muted rounded-l-md p-3 flex-1 font-mono text-xs sm:text-sm overflow-hidden text-ellipsis whitespace-nowrap">
                {referralLink}
              </div>
              <Button
                variant={copiedText === "link" ? "default" : "outline"}
                className="rounded-l-none"
                onClick={() => handleCopy(referralLink, "link")}
              >
                {copiedText === "link" ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Invite Methods */}
      <Tabs defaultValue="email" className="mb-6">
        <TabsList className="grid grid-cols-2 w-full max-w-md mb-4">
          <TabsTrigger value="email">Email Invite</TabsTrigger>
          <TabsTrigger value="social">Social Share</TabsTrigger>
        </TabsList>

        <TabsContent value="email">
          <Card>
            <CardHeader>
              <CardTitle>Invite via Email</CardTitle>
              <CardDescription>Send an invitation email to your friends</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  type="email"
                  placeholder="friend@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Button onClick={handleEmailInvite}>
                  <Mail className="h-4 w-4 mr-2" />
                  Invite
                </Button>
              </div>

              {invitedFriends.length > 0 && (
                <div>
                  <h3 className="text-sm font-medium mb-2">Recently Invited</h3>
                  <div className="space-y-2">
                    {invitedFriends.map((friend, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-muted rounded-md">
                        <span>{friend}</span>
                        <Badge variant="outline">Pending</Badge>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="social">
          <Card>
            <CardHeader>
              <CardTitle>Share on Social Media</CardTitle>
              <CardDescription>Spread the word on your favorite platforms</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <Button
                  variant="outline"
                  className="flex flex-col h-auto py-4"
                  onClick={() => handleSocialShare("WhatsApp")}
                >
                  <WhatsApp className="h-6 w-6 mb-2 text-green-600" />
                  <span>WhatsApp</span>
                </Button>

                <Button
                  variant="outline"
                  className="flex flex-col h-auto py-4"
                  onClick={() => handleSocialShare("Facebook")}
                >
                  <Facebook className="h-6 w-6 mb-2 text-blue-600" />
                  <span>Facebook</span>
                </Button>

                <Button
                  variant="outline"
                  className="flex flex-col h-auto py-4"
                  onClick={() => handleSocialShare("Twitter")}
                >
                  <Twitter className="h-6 w-6 mb-2 text-blue-400" />
                  <span>Twitter</span>
                </Button>

                <Button
                  variant="outline"
                  className="flex flex-col h-auto py-4"
                  onClick={() => handleSocialShare("Instagram")}
                >
                  <Instagram className="h-6 w-6 mb-2 text-pink-600" />
                  <span>Instagram</span>
                </Button>
              </div>

              <div className="mt-4 p-4 bg-muted rounded-lg">
                <h3 className="text-sm font-medium mb-2">Suggested Message</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  Join me on QuizMaster, the best app for competitive exam preparation! Use my referral code{" "}
                  {referralCode} to get started.
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    handleCopy(
                      "Join me on QuizMaster, the best app for competitive exam preparation! Use my referral code " +
                        referralCode +
                        " to get started.",
                      "message",
                    )
                  }
                >
                  <Clipboard className="h-4 w-4 mr-1" />
                  Copy Message
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* How It Works */}
      <Card>
        <CardHeader>
          <CardTitle>How It Works</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold mr-3 flex-shrink-0">
                1
              </div>
              <div>
                <h3 className="font-medium">Share Your Code</h3>
                <p className="text-sm text-muted-foreground">Share your unique referral code or link with friends</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold mr-3 flex-shrink-0">
                2
              </div>
              <div>
                <h3 className="font-medium">Friends Join QuizMaster</h3>
                <p className="text-sm text-muted-foreground">
                  Your friends download the app and enter your referral code
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold mr-3 flex-shrink-0">
                3
              </div>
              <div>
                <h3 className="font-medium">Both Get Rewarded</h3>
                <p className="text-sm text-muted-foreground">
                  You earn 50 tokens for each friend who joins, and they get 20 bonus tokens
                </p>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full" onClick={() => router.push("/tasks")}>
            <Gift className="h-4 w-4 mr-2" />
            View All Reward Tasks
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
