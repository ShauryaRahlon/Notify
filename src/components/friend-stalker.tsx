"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Search, TrendingUp, TrendingDown, Trophy, Users, Target, Calendar, Clock } from "lucide-react"
import { getLeetCodeContestRating, getLeetCodeBadges } from "@/lib/leetcode-api"
import type { LeetCodeContestRating, LeetCodeBadges } from "@/lib/types"
import { useToast } from "@/hooks/use-toast"
import { format } from "date-fns"

export function FriendStalker() {
  const [username, setUsername] = useState("")
  const [loading, setLoading] = useState(false)
  const [contestData, setContestData] = useState<LeetCodeContestRating | null>(null)
  const [badgesData, setBadgesData] = useState<LeetCodeBadges | null>(null)
  const [activeTab, setActiveTab] = useState("rating")
  const { toast } = useToast()

  const handleSearch = async () => {
    if (!username.trim()) {
      toast({
        title: "Username required",
        description: "Please enter a LeetCode username to search",
        variant: "destructive",
      })
      return
    }

    setLoading(true)
    try {
      if (activeTab === "rating") {
        const data = await getLeetCodeContestRating(username)
        setContestData(data)
        if (data.status !== "success") {
          throw new Error(data.message)
        }
      } else {
        const data = await getLeetCodeBadges(username)
        setBadgesData(data)
        if (data.status !== "success") {
          throw new Error(data.message)
        }
      }

      toast({
        title: "Profile found!",
        description: `Successfully retrieved ${username}'s ${activeTab === "rating" ? "contest rating" : "badges"}`,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to fetch data for ${username}. Please check the username and try again.`,
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const getRatingColor = (rating: number) => {
    if (rating >= 2100) return "text-red-500"
    if (rating >= 1900) return "text-orange-500"
    if (rating >= 1600) return "text-purple-500"
    if (rating >= 1400) return "text-blue-500"
    return "text-gray-500"
  }

  const getBadgeColor = (category: string) => {
    switch (category.toLowerCase()) {
      case "contest":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300"
      case "study plan":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      case "annual":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
      case "achievement":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Users className="h-5 w-5" />
            <span>Stalk Your Friend 👀</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex space-x-2">
            <Input
              placeholder="Enter LeetCode username..."
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSearch()}
              className="flex-1"
            />
            <Button onClick={handleSearch} disabled={loading}>
              <Search className="h-4 w-4 mr-2" />
              {loading ? "Searching..." : "Stalk"}
            </Button>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="rating">Contest Rating</TabsTrigger>
              <TabsTrigger value="badges">Badges</TabsTrigger>
            </TabsList>

            <TabsContent value="rating" className="space-y-4">
              {contestData && (
                <div className="space-y-6">
                  {/* Profile Overview */}
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-center space-x-4">
                        <Avatar className="h-16 w-16">
                          <AvatarFallback className="text-lg font-bold">
                            {username.slice(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div className="space-y-1">
                          <h3 className="text-2xl font-bold">{username}</h3>
                          <div className="flex items-center space-x-2">
                            <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white">
                              {contestData.badge.name}
                            </Badge>
                            <span className={`text-2xl font-bold ${getRatingColor(contestData.rating)}`}>
                              {contestData.rating}
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <Card>
                      <CardContent className="pt-6">
                        <div className="flex items-center space-x-2">
                          <Trophy className="h-5 w-5 text-yellow-500" />
                          <div>
                            <p className="text-sm text-muted-foreground">Global Ranking</p>
                            <p className="text-2xl font-bold">#{contestData.globalRanking.toLocaleString()}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="pt-6">
                        <div className="flex items-center space-x-2">
                          <Target className="h-5 w-5 text-green-500" />
                          <div>
                            <p className="text-sm text-muted-foreground">Top Percentage</p>
                            <p className="text-2xl font-bold">{contestData.topPercentage.toFixed(2)}%</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="pt-6">
                        <div className="flex items-center space-x-2">
                          <Calendar className="h-5 w-5 text-blue-500" />
                          <div>
                            <p className="text-sm text-muted-foreground">Contests Attended</p>
                            <p className="text-2xl font-bold">{contestData.attendedContestsCount}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="pt-6">
                        <div className="flex items-center space-x-2">
                          <Users className="h-5 w-5 text-purple-500" />
                          <div>
                            <p className="text-sm text-muted-foreground">Total Participants</p>
                            <p className="text-2xl font-bold">{contestData.totalParticipants.toLocaleString()}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Contest History */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Recent Contest History</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {contestData.contestHistory.map((contest, index) => (
                          <div key={index}>
                            <div className="flex items-center justify-between">
                              <div className="space-y-1">
                                <h4 className="font-medium">{contest.contest.title}</h4>
                                <p className="text-sm text-muted-foreground">
                                  {format(new Date(contest.contest.startTime * 1000), "MMM dd, yyyy")}
                                </p>
                              </div>
                              <div className="text-right space-y-1">
                                <div className="flex items-center space-x-2">
                                  <span className={`font-bold ${getRatingColor(contest.rating)}`}>
                                    {contest.rating}
                                  </span>
                                  {contest.trendDirection === "UP" ? (
                                    <TrendingUp className="h-4 w-4 text-green-500" />
                                  ) : contest.trendDirection === "DOWN" ? (
                                    <TrendingDown className="h-4 w-4 text-red-500" />
                                  ) : null}
                                </div>
                                <p className="text-sm text-muted-foreground">
                                  Rank #{contest.ranking.toLocaleString()}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center justify-between text-sm text-muted-foreground mt-2">
                              <span>
                                Solved: {contest.problemsSolved}/{contest.totalProblems}
                              </span>
                              <span>
                                <Clock className="h-3 w-3 inline mr-1" />
                                {Math.floor(contest.finishTimeInSeconds / 60)}m {contest.finishTimeInSeconds % 60}s
                              </span>
                            </div>
                            {index < contestData.contestHistory.length - 1 && <Separator className="mt-4" />}
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </TabsContent>

            <TabsContent value="badges" className="space-y-4">
              {badgesData && (
                <div className="space-y-6">
                  {/* Badges Overview */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <span>Badge Collection</span>
                        <Badge variant="secondary">{badgesData.totalBadges} Total</Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {badgesData.badges.map((badge) => (
                          <Card key={badge.id} className="relative overflow-hidden">
                            <CardContent className="pt-6">
                              <div className="flex items-center space-x-3">
                                <div className="text-3xl">{badge.icon}</div>
                                <div className="space-y-1">
                                  <h4 className="font-medium">{badge.displayName}</h4>
                                  <Badge className={getBadgeColor(badge.category)} variant="secondary">
                                    {badge.category}
                                  </Badge>
                                  <p className="text-xs text-muted-foreground">
                                    Earned: {format(new Date(badge.creationDate), "MMM dd, yyyy")}
                                  </p>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Badge Categories */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Badge Categories</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {Object.entries(
                          badgesData.badges.reduce(
                            (acc, badge) => {
                              acc[badge.category] = (acc[badge.category] || 0) + 1
                              return acc
                            },
                            {} as Record<string, number>,
                          ),
                        ).map(([category, count]) => (
                          <div key={category} className="text-center">
                            <div className="text-2xl font-bold">{count}</div>
                            <div className="text-sm text-muted-foreground">{category}</div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </TabsContent>
          </Tabs>

          {!contestData && !badgesData && !loading && (
            <div className="text-center py-8 text-muted-foreground">
              <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>Enter a LeetCode username to start stalking! 😈</p>
              <p className="text-sm mt-2">View contest ratings, rankings, and badge collections</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
