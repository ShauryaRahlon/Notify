import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ContestCard } from "@/components/contest-card";
import { FriendStalker } from "@/components/friend-stalker";
import { mockContests, mockStats } from "@/lib/mock-data";
import { Calendar, Clock, Bell, Star, TrendingUp } from "lucide-react";
import Link from "next/link";

export default function Dashboard() {
  const featuredContests = mockContests.slice(0, 6);
  const upcomingToday = mockContests.filter((contest) => {
    const today = new Date();
    const contestDate = new Date(contest.startTime);
    return contestDate.toDateString() === today.toDateString();
  });

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Hero Section */}
      <section className="text-center space-y-4 py-12">
        <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-gray-800 via-gray-700 to-black dark:from-gray-200 dark:via-gray-300 dark:to-white bg-clip-text text-transparent">
          Never Miss a Contest
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Track coding contests from all major platforms. Set smart reminders
          and stay ahead of the competition.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <Button size="lg" asChild>
            <Link href="/contests">
              <Calendar className="mr-2 h-5 w-5" />
              View All Contests
            </Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link href="/settings">
              <Bell className="mr-2 h-5 w-5" />
              Manage Reminders
            </Link>
          </Button>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-l-4 border-l-blue-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Upcoming Contests
            </CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockStats.totalUpcoming}</div>
            <p className="text-xs text-muted-foreground">
              Across all platforms
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Today's Contests
            </CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{upcomingToday.length}</div>
            <p className="text-xs text-muted-foreground">Starting today</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Active Reminders
            </CardTitle>
            <Bell className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockStats.activeReminders}
            </div>
            <p className="text-xs text-muted-foreground">Notifications set</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-orange-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Favorite Contests
            </CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockStats.favoriteContests}
            </div>
            <p className="text-xs text-muted-foreground">Bookmarked</p>
          </CardContent>
        </Card>
      </section>

      {/* Friend Stalker Section */}
      <section>
        <FriendStalker />
      </section>

      {/* Featured Contests */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold">Featured Contests</h2>
            <p className="text-muted-foreground">
              Upcoming contests you might be interested in
            </p>
          </div>
          <Button variant="outline" asChild>
            <Link href="/contests">View All</Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredContests.map((contest) => (
            <ContestCard key={contest.id} contest={contest} />
          ))}
        </div>
      </section>

      {/* Quick Actions */}
      <section className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-900/50 dark:to-gray-800/50 rounded-lg p-8">
        <div className="text-center space-y-4">
          <h3 className="text-2xl font-bold">Ready to compete?</h3>
          <p className="text-muted-foreground">
            Set up your preferences and never miss another contest
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild>
              <Link href="/settings">
                <Bell className="mr-2 h-4 w-4" />
                Configure Reminders
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/contests">
                <TrendingUp className="mr-2 h-4 w-4" />
                Browse Contests
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
