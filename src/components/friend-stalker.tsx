"use client";
import axios from "axios";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  Search,
  TrendingUp,
  TrendingDown,
  Trophy,
  Users,
  Target,
  Calendar,
  Clock,
} from "lucide-react";
import StyledButton from "@/components/ui/styled-botton";
import type { LeetCodeContestRating, LeetCodeBadges } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";

export function FriendStalker() {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState<any>(null);
  const { toast } = useToast();

  const handleSearch = async () => {
    if (!username.trim()) {
      toast({
        title: "Username required",
        description: "Please enter a LeetCode username to search",
        variant: "destructive",
      });
      return;
    }
    setLoading(true);
    try {
      const response = await axios.get(
        `/api/search-username?username=${username}`
      );
      if (response.data.success === false) {
        toast({
          title: "Error",
          description: response.data.message,
          variant: "destructive",
        });
        setUserData(null);
        return;
      }
      setUserData(response.data.message);
      toast({
        title: "Profile found!",
        description: `Successfully retrieved ${username}'s profile`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to fetch data for ${username}. Please check the username and try again.`,
        variant: "destructive",
      });
      setUserData(null);
    } finally {
      setLoading(false);
    }
  };

  // Helper for status color
  const statusColor = (status: string) => {
    switch (status) {
      case "Accepted":
        return "bg-green-100 text-green-700";
      case "Wrong Answer":
        return "bg-red-100 text-red-700";
      case "Time Limit Exceeded":
        return "bg-yellow-100 text-yellow-700";
      case "Compile Error":
        return "bg-gray-100 text-gray-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="space-y-6">
      <Card className="shadow-xl border-2 border-accent/30 bg-gradient-to-br from-background to-muted/50">
        <CardHeader>
          <CardTitle className="flex flex-col sm:flex-row items-center sm:justify-between gap-2 text-3xl font-bold tracking-tight">
            <span className="flex items-center space-x-2">
              <Users className="h-6 w-6 " />
              <span>Stalk Your Friend 👀</span>
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col sm:flex-row gap-2 items-center w-full">
            <Input
              placeholder="Enter LeetCode username..."
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSearch()}
              className="flex-1 max-w-full shadow-sm w-full sm:w-auto"
            />
            <Button
              onClick={handleSearch}
              disabled={loading}
              className="w-full sm:w-auto text-lg"
            >
              <Search className="h-4 w-4 " />
              {loading ? "Searching..." : "Stalk"}
            </Button>
          </div>

          {userData && (
            <div className="space-y-10">
              
              {/* Profile Card */}
              <Card className="bg-card/80 border-0 shadow-none">
                <CardContent className="flex flex-col md:flex-row items-center gap-8 pt-8">
                  <Avatar className="h-24 w-24 ring-4 ring-accent">
                    <img
                      src={userData.matchedUser.profile.userAvatar}
                      alt="avatar"
                      className="rounded-full"
                    />
                  </Avatar>
                  <div className="flex-1 space-y-2 text-center md:text-left">
                    <div className="flex flex-col md:flex-row items-center gap-3 justify-center md:justify-start">
                      <h2 className="text-3xl font-bold text-accent-foreground">
                        {userData.matchedUser.profile.realName ||
                          userData.matchedUser.username}
                      </h2>
                      <Badge
                        variant="secondary"
                        className="text-base px-3 py-1"
                      >
                        {userData.matchedUser.username}
                      </Badge>
                    </div>
                    <div className="flex flex-col md:flex-row gap-2 md:gap-6 flex-wrap mt-2 items-center md:items-start justify-center md:justify-start">
                      <span className="text-base text-muted-foreground">
                        Ranking:{" "}
                        <b>
                          #
                          {userData.matchedUser.profile.ranking?.toLocaleString()}
                        </b>
                      </span>
                      <span className="text-base text-muted-foreground">
                        Reputation:{" "}
                        <b>{userData.matchedUser.profile.reputation}</b>
                      </span>
                      <span className="text-base text-muted-foreground">
                        Star Rating:{" "}
                        <b>{userData.matchedUser.profile.starRating} ⭐</b>
                      </span>
                    </div>
                  </div>
                  {/* Add Friend Button */}
              <div className="flex justify-end">
                <StyledButton
                  onClick={() =>
                    toast({
                      title: "Friend Request Sent",
                      description: `You sent a friend request to ${userData.matchedUser.username}`,
                    })
                  }
                >
                  Add Friend
                </StyledButton>
              </div>
                </CardContent>
              </Card>

              {/* Questions & Submission Stats */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 row-auto">
                
                <Card className="border-0 bg-muted/60">
                  <CardHeader>
                    <CardTitle>Accepted Submissions</CardTitle>
                  </CardHeader>
                  <CardContent className="grid grid-cols-2 gap-4 pt-4">
                    {userData.matchedUser.submitStats.acSubmissionNum.map(
                      (s: any) => (
                        <div
                          key={s.difficulty}
                          className="flex flex-col items-center bg-background/80 rounded-lg p-3 shadow-sm w-full"
                        >
                          <span
                            className={`text-lg font-bold text-accent-foreground ${
                              s.difficulty === "Easy"
                                ? "text-green-500"
                                : s.difficulty === "Medium"
                                ? "text-yellow-500"
                                : "text-red-500"
                                
                            }`}
                          >
                            {s.difficulty}
                          </span>
                          <span className="text-2xl  text-foreground">
                            {s.count}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            ({s.submissions} submissions)
                          </span>
                        </div>
                      )
                    )}
                  </CardContent>
                </Card>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card className="border-0 bg-muted/60">
                  <CardHeader>
                    <CardTitle className= "text-center">Badges</CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-wrap gap-6 pt-4 justify-center ">
                    {userData.matchedUser.badges.length === 0 && (
                      <span className="text-muted-foreground">
                        No badges yet
                      </span>
                    )}
                    {userData.matchedUser.badges.slice(0, 3).map(
                      (badge: any, i: number) => (
                        <div key={i} className="flex flex-col items-center">
                          <img
                            src={badge.icon}
                            alt={badge.name}
                            className="h-14 w-14 rounded-full border-2 border-accent shadow"
                          />
                          <span className="text-xs mt-1 text-accent-foreground font-medium">
                            {badge.name}
                          </span>
                        </div>
                      )
                    )}
                  </CardContent>
                </Card>
                 <Card className="border-0 bg-muted/60">
                  <CardHeader>
                    <CardTitle className="text-center">Upcoming Badges</CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-wrap gap-6 pt-4 justify-center">
                    {userData.matchedUser.upcomingBadges.length === 0 && (
                      <span className="text-muted-foreground">
                        No upcoming badges
                      </span>
                    )}
                    {userData.matchedUser.upcomingBadges.slice(0, 3).map(
                      (badge: any, i: number) => (
                        <div key={i} className="flex flex-col items-center">
                          <img
                            src={badge.icon}
                            alt={badge.name}
                            className="h-14 w-14 rounded-full border-2 border-accent shadow"
                          />
                          <span className="text-xs mt-1 text-accent-foreground font-medium">
                            {badge.name}
                          </span>
                        </div>
                      )
                    )}
                  </CardContent>
                </Card>
                
           
               </div>
               
              
              </div>
                
              {/* Recent Submissions */}
              <Card className="border-0 bg-muted/60">
                <CardHeader>
                  <CardTitle>Recent Submissions</CardTitle>
                </CardHeader>
                <CardContent className="overflow-x-auto pt-4">
                  <table className="min-w-full text-sm rounded-lg overflow-hidden">
                    <thead>
                      <tr className="text-left text-muted-foreground bg-background/80">
                        <th className="px-3 py-2">Title</th>
                        <th className="px-3 py-2">Status</th>
                        <th className="px-3 py-2">Language</th>
                        <th className="px-3 py-2">Time</th>
                      </tr>
                    </thead>
                    <tbody>
                      {userData.recentSubmissionList.map(
                        (sub: any, i: number) => (
                          <tr
                            key={i}
                            className="border-b last:border-0 hover:bg-accent/10 transition"
                          >
                            <td className="py-2 pr-4 max-w-[180px] truncate">
                              <a
                                href={`https://leetcode.com/problems/${sub.titleSlug}/`}
                                target="_blank"
                                rel="noopener"
                                className="text-blue-600 hover:underline"
                              >
                                {sub.title}
                              </a>
                            </td>
                            <td className="py-2 pr-4">
                              <span
                                className={`px-2 py-1 rounded ${statusColor(sub.statusDisplay)} font-semibold`}
                              >
                                {sub.statusDisplay}
                              </span>
                            </td>
                            <td className="py-2 pr-4">{sub.lang}</td>
                            <td className="py-2 pr-4 whitespace-nowrap">
                              {new Date(
                                Number(sub.timestamp) * 1000
                              ).toLocaleString()}
                            </td>
                          </tr>
                        )
                      )}
                    </tbody>
                  </table>
                </CardContent>
              </Card>

              {/* Badges */}
              
            </div>
          )}

          {!userData && !loading && (
            <div className="text-center py-12 text-muted-foreground flex flex-col items-center gap-2">
              <Users className="h-16 w-16 mx-auto mb-4 opacity-50" />
              <p className="text-lg font-semibold">
                Enter a LeetCode username to start stalking! 😈
              </p>
              <p className="text-sm mt-2">
                View profile, questions, submissions, and badges
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
