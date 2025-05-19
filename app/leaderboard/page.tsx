"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Award, Crown, Medal, Trophy } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default function LeaderboardPage() {
  const router = useRouter()

  return (
    <div className="container mx-auto px-4 py-8 pb-20">
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="sm" onClick={() => router.push("/")} className="mr-2">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back
        </Button>
        <h1 className="text-2xl font-bold">Leaderboard</h1>
      </div>

      <div className="w-full max-w-md mx-auto">
        <Tabs defaultValue="global">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="global">Global</TabsTrigger>
            <TabsTrigger value="friends">Friends</TabsTrigger>
            <TabsTrigger value="exams">By Exam</TabsTrigger>
          </TabsList>

          <TabsContent value="global">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Trophy className="h-5 w-5 mr-2 text-yellow-500" />
                  Global Rankings
                </CardTitle>
                <CardDescription>Top performers across all exams</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded-lg">
                    <div className="flex items-center">
                      <div className="relative mr-3">
                        <div className="h-10 w-10 rounded-full bg-yellow-500 flex items-center justify-center">
                          <span className="text-white font-bold">1</span>
                        </div>
                        <Crown className="h-4 w-4 text-yellow-500 absolute -top-2 -right-2" />
                      </div>
                      <div>
                        <div className="font-medium">Rahul Sharma</div>
                        <div className="text-xs text-muted-foreground">UPSC Expert</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold">9,845</div>
                      <div className="text-xs text-muted-foreground">points</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between bg-gray-50 dark:bg-gray-800/50 p-3 rounded-lg">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-gray-400 flex items-center justify-center mr-3">
                        <span className="text-white font-bold">2</span>
                      </div>
                      <div>
                        <div className="font-medium">Priya Patel</div>
                        <div className="text-xs text-muted-foreground">SSC Champion</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold">8,721</div>
                      <div className="text-xs text-muted-foreground">points</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between bg-orange-50 dark:bg-orange-900/20 p-3 rounded-lg">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-orange-400 flex items-center justify-center mr-3">
                        <span className="text-white font-bold">3</span>
                      </div>
                      <div>
                        <div className="font-medium">Amit Kumar</div>
                        <div className="text-xs text-muted-foreground">Banking Pro</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold">7,654</div>
                      <div className="text-xs text-muted-foreground">points</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-lg border">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center mr-3">
                        <span className="font-bold">4</span>
                      </div>
                      <div>
                        <div className="font-medium">Sneha Gupta</div>
                        <div className="text-xs text-muted-foreground">MPSC Specialist</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold">6,932</div>
                      <div className="text-xs text-muted-foreground">points</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-lg border">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center mr-3">
                        <span className="font-bold">5</span>
                      </div>
                      <div>
                        <div className="font-medium">Vikram Singh</div>
                        <div className="text-xs text-muted-foreground">Current Affairs Expert</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold">6,547</div>
                      <div className="text-xs text-muted-foreground">points</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg border-2 border-blue-200 dark:border-blue-800">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center mr-3">
                        <span className="text-white font-bold">24</span>
                      </div>
                      <div>
                        <div className="font-medium">You</div>
                        <div className="text-xs text-muted-foreground">Rising Star</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold">2,845</div>
                      <div className="text-xs text-muted-foreground">points</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="friends">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Medal className="h-5 w-5 mr-2 text-primary" />
                  Friends Rankings
                </CardTitle>
                <CardDescription>See how you compare with your friends</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded-lg">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-yellow-500 flex items-center justify-center mr-3">
                        <span className="text-white font-bold">1</span>
                      </div>
                      <div>
                        <div className="font-medium">Rahul Kumar</div>
                        <div className="text-xs text-muted-foreground">UPSC Expert</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold">5,432</div>
                      <div className="text-xs text-muted-foreground">points</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between bg-gray-50 dark:bg-gray-800/50 p-3 rounded-lg">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-gray-400 flex items-center justify-center mr-3">
                        <span className="text-white font-bold">2</span>
                      </div>
                      <div>
                        <div className="font-medium">Anjali Patel</div>
                        <div className="text-xs text-muted-foreground">SSC Champion</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold">4,876</div>
                      <div className="text-xs text-muted-foreground">points</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg border-2 border-blue-200 dark:border-blue-800">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center mr-3">
                        <span className="text-white font-bold">3</span>
                      </div>
                      <div>
                        <div className="font-medium">You</div>
                        <div className="text-xs text-muted-foreground">Rising Star</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold">2,845</div>
                      <div className="text-xs text-muted-foreground">points</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-lg border">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center mr-3">
                        <span className="font-bold">4</span>
                      </div>
                      <div>
                        <div className="font-medium">Deepak Verma</div>
                        <div className="text-xs text-muted-foreground">MPSC Aspirant</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold">2,103</div>
                      <div className="text-xs text-muted-foreground">points</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-lg border">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center mr-3">
                        <span className="font-bold">5</span>
                      </div>
                      <div>
                        <div className="font-medium">Neha Sharma</div>
                        <div className="text-xs text-muted-foreground">Banking Enthusiast</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold">1,876</div>
                      <div className="text-xs text-muted-foreground">points</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="exams">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Award className="h-5 w-5 mr-2 text-primary" />
                  Exam Rankings
                </CardTitle>
                <CardDescription>Top performers by exam category</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <h3 className="font-medium">UPSC</h3>
                      <Badge variant="outline" className="ml-2">
                        Top 5
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between p-2 rounded-md bg-muted/50">
                        <span>Rahul Sharma</span>
                        <span className="font-medium">9,845 pts</span>
                      </div>
                      <div className="flex items-center justify-between p-2 rounded-md bg-muted/50">
                        <span>Priya Patel</span>
                        <span className="font-medium">8,721 pts</span>
                      </div>
                      <div className="flex items-center justify-between p-2 rounded-md bg-muted/50">
                        <span>Amit Kumar</span>
                        <span className="font-medium">7,654 pts</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center">
                      <h3 className="font-medium">MPSC</h3>
                      <Badge variant="outline" className="ml-2">
                        Top 5
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between p-2 rounded-md bg-muted/50">
                        <span>Sneha Gupta</span>
                        <span className="font-medium">6,932 pts</span>
                      </div>
                      <div className="flex items-center justify-between p-2 rounded-md bg-muted/50">
                        <span>Vikram Singh</span>
                        <span className="font-medium">6,547 pts</span>
                      </div>
                      <div className="flex items-center justify-between p-2 rounded-md bg-muted/50">
                        <span>Deepak Verma</span>
                        <span className="font-medium">5,876 pts</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center">
                      <h3 className="font-medium">SSC</h3>
                      <Badge variant="outline" className="ml-2">
                        Top 5
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between p-2 rounded-md bg-muted/50">
                        <span>Anjali Patel</span>
                        <span className="font-medium">7,845 pts</span>
                      </div>
                      <div className="flex items-center justify-between p-2 rounded-md bg-muted/50">
                        <span>Rajesh Kumar</span>
                        <span className="font-medium">7,321 pts</span>
                      </div>
                      <div className="flex items-center justify-between p-2 rounded-md bg-blue-100 dark:bg-blue-900/20 font-medium">
                        <span>You</span>
                        <span>2,845 pts</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
