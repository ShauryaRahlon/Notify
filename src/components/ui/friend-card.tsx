"use client";
import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import axios from "axios";
import { toast } from "sonner";
import { CodeforcesResponse } from "@/types/CodeforcesResponse";
import { LeetcodeResponse } from "@/types/LeetcodeResponse";
import { Button } from "@/components/ui/button";

type UnifiedUser = LeetcodeResponse | CodeforcesResponse;
interface ApiFriendEntry {
  user: UnifiedUser;
}

export default function FriendCard() {
  const [users, setUsers] = useState<UnifiedUser[]>([]);
  const [loading, setLoading] = useState(true);
  // Track which user is being removed
  const [removing, setRemoving] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get<{ success: boolean; message: ApiFriendEntry[] }>("/api/get-friends")
      .then(({ data }) => {
        if (data.success) {
          setUsers(data.message.map((entry) => entry.user));
        } else {
          toast.error("Failed to load friends.");
        }
      })
      .catch(() => toast.error("Error fetching friends."))
      .finally(() => setLoading(false));
  }, []);

  // Skeleton loader for friend cards
  const FriendCardSkeleton = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {[...Array(3)].map((_, idx) => (
        <Card
          key={idx}
          className="flex flex-col h-full shadow-lg animate-pulse"
        >
          <CardHeader className="flex items-center space-x-4 px-6 py-4">
            <div className="flex justify-center items-center w-full m-0">
              <div className="w-16 h-16 rounded-full bg-muted" />
            </div>
            <div className="flex-1">
              <div className="h-6 w-24 bg-muted rounded mb-2 mx-auto" />
              <div className="h-4 w-20 bg-muted rounded mx-auto" />
            </div>
          </CardHeader>
          <Separator />
          <CardContent className="flex-1 px-6 py-4">
            <div className="h-4 w-32 bg-muted rounded mb-2" />
            <div className="h-3 w-24 bg-muted rounded mb-2" />
            <div className="h-3 w-20 bg-muted rounded mb-2" />
            <div className="h-3 w-16 bg-muted rounded mb-2" />
            <div className="flex gap-2 mt-2">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-4 w-8 bg-muted rounded" />
              ))}
            </div>
          </CardContent>
          <CardFooter className="px-6 py-3 mt-auto flex flex-col space-y-2">
            <div className="h-10 w-full bg-muted rounded mb-2" />
            <div className="h-10 w-full bg-muted rounded" />
          </CardFooter>
        </Card>
      ))}
    </div>
  );

  if (loading) return <FriendCardSkeleton />;
  if (!users.length)
    return (
      <p className="text-center py-10 text-muted-foreground">
        No friends found.
      </p>
    );

  const isLeetCode = (u: UnifiedUser): u is LeetcodeResponse =>
    "submitStats" in u;

  // Remove friend and update users state
  const removeFriend = async (username: string, platform: string) => {
    try {
      setRemoving(username + "-" + platform); // Mark as removing
      const res = await axios.post("/api/remove-friend", {
        username,
        f_platform: platform,
      });
      if (res.data.success) {
        toast.success("Friend removed successfully!");
        setUsers((prevUsers) =>
          prevUsers.filter((user) => {
            if (isLeetCode(user)) {
              // Use both username and unique LeetCode id if available
              return !(
                user.username === username &&
                platform === "leetcode" &&
                // Add extra check for user.profile.userAvatar or another unique property if needed
                user.profile.userAvatar !== res.data.avatar // fallback: always false if not provided
              );
            } else {
              return !(user.handle === username && platform === "codeforces");
            }
          })
        );
      } else {
        toast.error("Failed to remove friend. Please try again later.");
      }
    } catch (error) {
      console.error("Error removing friend:", error);
      toast.error("Failed to remove friend. Please try again later.");
    } finally {
      setRemoving(null); // Reset removing state
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {users.map((user, idx) => {
        const key = isLeetCode(user) ? user.username : user.handle;
        const platform = isLeetCode(user) ? "leetcode" : "codeforces";
        const recent = isLeetCode(user)
          ? user.submitStats.acSubmissionNum
          : user.rating_history.slice(-5);

        const isRemoving = removing === key + "-" + platform;

        const handleRemove = async () => {
          await removeFriend(key, platform);
        };

        return (
          <Card
            key={key || idx}
            className="flex flex-col h-full shadow-lg hover:shadow-xl transition-shadow"
          >
            <CardHeader className="flex items-center space-x-4 px-6 py-4">
              <div className="flex justify-center items-center w-full m-0">
                <Avatar className="w-16 h-16">
                  <AvatarImage
                    src={
                      isLeetCode(user) ? user.profile.userAvatar : user.avatar
                    }
                    alt={key}
                  />
                  <AvatarFallback>{key.charAt(0).toUpperCase()}</AvatarFallback>
                </Avatar>
              </div>
              <div className="flex-1">
                <CardTitle className="text-xl text-center font-semibold truncate">
                  {key}
                </CardTitle>
                <CardDescription className="flex items-center space-x-2 text-sm text-muted-foreground">
                  {isLeetCode(user) ? (
                    <>
                      <Badge variant="outline" className="border-orange-500">
                        LeetCode
                      </Badge>
                      <span>Rank #{user.profile.ranking}</span>
                    </>
                  ) : (
                    <>
                      <Badge variant="outline" className="border-blue-500">
                        Codeforces
                      </Badge>
                      <span>
                        {user.rank} ({user.rating})
                      </span>
                    </>
                  )}
                </CardDescription>
              </div>
            </CardHeader>

            <Separator />

            <CardContent className="flex-1 px-6 py-4">
              <Tabs defaultValue="overview">
                <TabsList className="mb-4 w-full flex justify-between">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="stats">Stats</TabsTrigger>
                </TabsList>

                <TabsContent value="overview">
                  {isLeetCode(user) ? (
                    <div className="space-y-2">
                      <p className="text-sm">
                        {user.profile.realName || "N/A"}
                      </p>
                      {user.profile.company && (
                        <p className="text-sm">
                          Company: {user.profile.company}
                        </p>
                      )}
                      {user.profile.school && (
                        <p className="text-sm">School: {user.profile.school}</p>
                      )}
                      {user.profile.countryName && (
                        <p className="text-sm">
                          Country: {user.profile.countryName}
                        </p>
                      )}
                      <p className="text-sm">
                        Reputation: {user.profile.reputation}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {user.upcomingBadges.map((badge) => (
                          <img
                            key={badge.name}
                            src={badge.icon}
                            alt={badge.name}
                            title={badge.name}
                            className="w-6 h-6"
                          />
                        ))}
                      </div>
                      <div className="flex space-x-4 text-sm">
                        <p>⭐ {user.profile.starRating} stars</p>
                        <p>💡 {user.contributions.points} pts</p>
                        <p>❓ {user.contributions.questionCount} qs</p>
                      </div>
                      {user.profile.aboutMe && (
                        <p className="mt-2 text-xs text-muted-foreground truncate">
                          {user.profile.aboutMe}
                        </p>
                      )}
                    </div>
                  ) : (
                    <div className="space-y-2 text-sm">
                      <p>Max Rating: {user.maxRating}</p>
                      <p>Solved: {user.solved_problems_count}</p>
                      <p>Contests: {user.contests_count}</p>
                      <p>Org: {user.organization || "—"}</p>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="stats">
                  <ScrollArea className="h-full">
                    {recent.map((item) => (
                      <div
                        key={
                          isLeetCode(user)
                            ? (item as any).difficulty
                            : (item as any).contestId
                        }
                        className="flex justify-between py-1 text-sm"
                      >
                        <span className="truncate">
                          {isLeetCode(user)
                            ? (item as any).difficulty
                            : (item as any).contestName}
                        </span>
                        <span>
                          {isLeetCode(user)
                            ? `${(item as any).count}/${(item as any).submissions}`
                            : (item as any).newRating}
                        </span>
                      </div>
                    ))}
                  </ScrollArea>
                </TabsContent>
              </Tabs>
            </CardContent>

            <CardFooter className="px-6 py-3 mt-auto flex flex-col space-y-2">
              <Button
                variant="outline"
                className="w-full"
                onClick={handleRemove}
                disabled={isRemoving || loading}
              >
                {isRemoving ? "Removing..." : "Remove Friend"}
              </Button>
              <Button variant="outline" className="w-full">
                <a
                  href={
                    isLeetCode(user)
                      ? `https://leetcode.com/${user.username}`
                      : `https://codeforces.com/profile/${user.handle}`
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full"
                >
                  View Profile
                </a>
              </Button>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
}
