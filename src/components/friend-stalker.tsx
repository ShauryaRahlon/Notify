"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { Search, Users } from "lucide-react";
import StyledButton from "@/components/ui/styled-botton";
import { toast } from "sonner";
import { useDebounceValue } from "usehooks-ts";

// Mock response based on the new API
// const MOCK_RESPONSE = {
//   status: "success",
//   message: "retrieved",
//   username: "example_user",
//   githubUrl: "https://github.com/example",
//   twitterUrl: "https://twitter.com/example",
//   linkedinUrl: "https://linkedin.com/in/example",
//   contributions: {
//     points: 100,
//     questionCount: 5,
//     testcaseCount: 10,
//   },
//   profile: {
//     realName: "Example User",
//     userAvatar: "https://assets.leetcode.com/avatar.jpg",
//     birthday: "2000-01-01",
//     ranking: 10000,
//     reputation: 100,
//     websites: ["https://example.com"],
//     countryName: "United States",
//     company: "Example Corp",
//     school: "Example University",
//     skillTags: ["Python", "Algorithms"],
//     aboutMe: "LeetCode enthusiast",
//     starRating: 4.5,
//   },
//   badges: [
//     {
//       name: "Badge 1",
//       icon: "https://assets.leetcode.com/badge1.png",
//     },
//     {
//       name: "Badge 2",
//       icon: "https://assets.leetcode.com/badge2.png",
//     },
//   ],
//   upcomingBadges: [],
//   activeBadge: {},
//   submitStats: {
//     acSubmissionNum: [
//       { difficulty: "Easy", count: 50, submissions: 60 },
//       { difficulty: "Medium", count: 30, submissions: 40 },
//       { difficulty: "Hard", count: 10, submissions: 15 },
//     ],
//   },
//   submissionCalendar: { "1719000000": 2 },
//   recentSubmissions: [
//     {
//       title: "Two Sum",
//       titleSlug: "two-sum",
//       statusDisplay: "Accepted",
//       lang: "Python3",
//       timestamp: "1719000000",
//     },
//     {
//       title: "Add Two Numbers",
//       titleSlug: "add-two-numbers",
//       statusDisplay: "Wrong Answer",
//       lang: "C++",
//       timestamp: "1718990000",
//     },
//   ],
// };

export function FriendStalker() {
  const [username, setUsername] = useState("");
  const [debouncedValue] = useDebounceValue(username, 1000);
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState<any>(null);
  const [showAllSubmissions, setShowAllSubmissions] = useState(false);

  useEffect(() => {
    if (debouncedValue.trim()) {
      handleSearch();
    } else {
      setUserData(null);
    }
  }, [debouncedValue]);

  // Handle search with debounced value
  const handleSearch = async () => {
    if (!debouncedValue.trim()) {
      toast.error("Please enter a LeetCode username to search");
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(
        `https://leetcode-stats.tashif.codes/${debouncedValue}/profile`
      );
      const data = await response.json();
      if (data.message === "user does not exist") {
        // toast.error(`User ${debouncedValue} not found`);
        throw new Error(data.message || "Failed to fetch user data");
      }
      setUserData(data);
      toast.success(`Successfully retrieved ${debouncedValue}'s profile`);
      // toast.success(`Successfully retrieved ${debouncedValue}'s profile`);
    } catch (error) {
      toast.error(
        `Failed to fetch data for ${debouncedValue}. Please check the username and try again.`
      );
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
              disabled={loading}
              placeholder="Enter LeetCode username..."
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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
                      src={userData.profile.userAvatar}
                      alt="avatar"
                      className="rounded-full"
                    />
                  </Avatar>
                  <div className="flex-1 space-y-2 text-center md:text-left">
                    <div className="flex flex-col md:flex-row items-center gap-3 justify-center md:justify-start">
                      <h2 className="text-3xl font-bold text-accent-foreground">
                        {userData.profile.realName || userData.username}
                      </h2>
                      <Badge
                        variant="secondary"
                        className="text-base px-3 py-1"
                      >
                        {userData.username}
                      </Badge>
                    </div>
                    <div className="flex flex-col md:flex-row gap-2 md:gap-6 flex-wrap mt-2 items-center md:items-start justify-center md:justify-start">
                      <span className="text-base text-muted-foreground">
                        Ranking:{" "}
                        <b>#{userData.profile.ranking?.toLocaleString()}</b>
                      </span>
                      <span className="text-base text-muted-foreground">
                        Reputation: <b>{userData.profile.reputation}</b>
                      </span>
                      <span className="text-base text-muted-foreground">
                        Star Rating: <b>{userData.profile.starRating} ⭐</b>
                      </span>
                      <span className="text-base text-muted-foreground">
                        Country: <b>{userData.profile.countryName}</b>
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {userData.profile.skillTags.map(
                        (tag: string, i: number) => (
                          <Badge key={i} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        )
                      )}
                    </div>
                    <div className="mt-2 text-sm text-muted-foreground">
                      {userData.profile.aboutMe}
                    </div>
                    <div className="flex gap-2 mt-2">
                      {userData.githubUrl && (
                        <a
                          href={userData.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline text-xs"
                        >
                          GitHub
                        </a>
                      )}
                      {userData.twitterUrl && (
                        <a
                          href={userData.twitterUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline text-xs"
                        >
                          Twitter
                        </a>
                      )}
                      {userData.linkedinUrl && (
                        <a
                          href={userData.linkedinUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline text-xs"
                        >
                          LinkedIn
                        </a>
                      )}
                    </div>
                  </div>
                  {/* Add Friend Button */}
                  <div className="flex justify-end">
                    <StyledButton
                      onClick={() =>
                        toast(
                          `This feature is not implemented yet. Stay tuned!`,
                          {
                            style: {
                              background: "#f5f5f5",
                              color: "#222",
                              border: "1px solid #e0e0e0",
                            },
                            icon: "ℹ️",
                          }
                        )
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
                    {userData.submitStats.acSubmissionNum.map((s: any) => (
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
                    ))}
                  </CardContent>
                </Card>

                <Card className="border-0 bg-muted/60">
                  <CardHeader>
                    <CardTitle className="text-center">Badges</CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-wrap gap-6 pt-4 justify-center ">
                    {userData.badges.length === 0 && (
                      <span className="text-muted-foreground">
                        No badges yet
                      </span>
                    )}
                    {userData.badges
                      .slice(0, 3)
                      .map((badge: any, i: number) => (
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
                      ))}
                  </CardContent>
                </Card>
              </div>

              {/* Recent Submissions */}
              <Card className="border-0 bg-muted/60">
                <CardHeader>
                  <CardTitle>Recent Submissions</CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="overflow-x-auto w-full">
                    <table className="min-w-full hidden md:table text-sm rounded-lg overflow-hidden">
                      <thead>
                        <tr className="text-left text-muted-foreground bg-background/80">
                          <th className="px-3 py-2 font-semibold table-cell">
                            Title
                          </th>
                          <th className="px-3 py-2 font-semibold table-cell">
                            Status
                          </th>
                          <th className="px-3 py-2 font-semibold table-cell">
                            Language
                          </th>
                          <th className="px-3 py-2 font-semibold table-cell">
                            Time
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {!userData.recentSubmissions ||
                        userData.recentSubmissions.length === 0 ? (
                          <tr className="table-row">
                            <td
                              colSpan={4}
                              className="text-center py-4 text-muted-foreground table-cell"
                            >
                              No recent submissions found.
                            </td>
                          </tr>
                        ) : (
                          (userData.recentSubmissions.length <= 6 ||
                          showAllSubmissions
                            ? userData.recentSubmissions
                            : userData.recentSubmissions.slice(0, 6)
                          ).map((sub: any, i: number) => (
                            <tr
                              key={i}
                              className="border-b last:border-0 hover:bg-accent/10 transition table-row"
                            >
                              <td className="py-2 pr-4 max-w-[180px] truncate table-cell">
                                <a
                                  href={`https://leetcode.com/problems/${sub.titleSlug}/`}
                                  target="_blank"
                                  rel="noopener"
                                  className="text-blue-600 hover:underline"
                                >
                                  {sub.title}
                                </a>
                              </td>
                              <td className="py-2 pr-4 table-cell">
                                <span
                                  className={`px-2 py-1 rounded ${statusColor(sub.statusDisplay)} font-semibold`}
                                >
                                  {sub.statusDisplay}
                                </span>
                              </td>
                              <td className="py-2 pr-4 table-cell">
                                {sub.lang}
                              </td>
                              <td className="py-2 pr-4 whitespace-nowrap table-cell">
                                {new Date(
                                  Number(sub.timestamp) * 1000
                                ).toLocaleString()}
                              </td>
                            </tr>
                          ))
                        )}
                        {userData.recentSubmissions &&
                          userData.recentSubmissions.length > 6 && (
                            <tr className="table-row">
                              <td
                                colSpan={4}
                                className="text-center py-2 table-cell"
                              >
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() =>
                                    setShowAllSubmissions(
                                      (prev: boolean) => !prev
                                    )
                                  }
                                >
                                  {showAllSubmissions
                                    ? "Show Less"
                                    : "Load More"}
                                </Button>
                              </td>
                            </tr>
                          )}
                      </tbody>
                    </table>
                    {/* Mobile card view */}
                    <div className="md:hidden flex flex-col gap-4 mt-4">
                      {userData.recentSubmissions &&
                      userData.recentSubmissions.length > 0 ? (
                        userData.recentSubmissions.map(
                          (sub: any, i: number) => (
                            <div
                              key={i}
                              className="rounded-lg bg-background/80 p-3 shadow-sm border"
                            >
                              <div className="flex items-center justify-between">
                                <a
                                  href={`https://leetcode.com/problems/${sub.titleSlug}/`}
                                  target="_blank"
                                  rel="noopener"
                                  className="text-blue-600 font-semibold hover:underline truncate"
                                >
                                  {sub.title}
                                </a>
                                <span
                                  className={`px-2 py-1 rounded ${statusColor(sub.statusDisplay)} font-semibold text-xs`}
                                >
                                  {sub.statusDisplay}
                                </span>
                              </div>
                              <div className="flex flex-wrap gap-2 mt-2 text-xs text-muted-foreground">
                                <span>
                                  <b>Lang:</b> {sub.lang}
                                </span>
                                <span>
                                  <b>Time:</b>{" "}
                                  {new Date(
                                    Number(sub.timestamp) * 1000
                                  ).toLocaleString()}
                                </span>
                              </div>
                            </div>
                          )
                        )
                      ) : (
                        <div className="text-center py-4 text-muted-foreground">
                          No recent submissions found.
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
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
