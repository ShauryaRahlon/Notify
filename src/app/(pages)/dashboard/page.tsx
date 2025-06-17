import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ContestCard } from "@/components/contest-card";
import { FriendStalker } from "@/components/friend-stalker";
import { mockContests, mockStats } from "@/lib/mock-data";
import { Calendar, Clock, Bell, Star, TrendingUp } from "lucide-react";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";


export default function Dashboard() {
  const featuredContests = mockContests.slice(0, 6);
  const upcomingToday = mockContests.filter((contest) => {
    const today = new Date();
    const contestDate = new Date(contest.startTime);
    return contestDate.toDateString() === today.toDateString();
  });

  return (
    <div className="container mx-auto px-2 sm:px-4 py-8 space-y-10">
      {/* Theme Toggle & Accent Picker */}
      <div className="flex flex-col sm:flex-row justify-end items-center gap-4">
      
        <ThemeToggle />
      </div>
      {/* Hero Section */}
      <section className="text-center space-y-6 py-12 bg-gradient-to-br from-accent/10 to-background rounded-xl shadow-md">
        <h1 className="text-4xl md:text-6xl font-extrabold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-300 dark:via-purple-300 dark:to-pink-300 bg-clip-text text-transparent drop-shadow-lg">
          Track, Compete, Win.
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Discover, track, and get notified for coding contests across all major
          platforms. Stay ahead, improve your skills, and never miss a chance to
          compete!
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <Button size="lg" className="shadow-md" asChild>
            <Link href="/contests">
              <Calendar className="mr-2 h-5 w-5" />
              Explore Contests
            </Link>
          </Button>
          <Button variant="outline" size="lg" className="shadow-md" asChild>
            <Link href="/settings">
              <Bell className="mr-2 h-5 w-5" />
              Set Reminders
            </Link>
          </Button>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-l-4 border-l-blue-500 bg-background/80 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-semibold tracking-wide">
              Upcoming Contests
            </CardTitle>
            <Calendar className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-extrabold text-blue-600 dark:text-blue-300">
              {mockStats.totalUpcoming}
            </div>
            <p className="text-xs text-muted-foreground">
              Across all platforms
            </p>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-green-500 bg-background/80 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-semibold tracking-wide">
              Today's Contests
            </CardTitle>
            <Clock className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-extrabold text-green-600 dark:text-green-300">
              {upcomingToday.length}
            </div>
            <p className="text-xs text-muted-foreground">Starting today</p>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-purple-500 bg-background/80 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-semibold tracking-wide">
              Active Reminders
            </CardTitle>
            <Bell className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-extrabold text-purple-600 dark:text-purple-300">
              {mockStats.activeReminders}
            </div>
            <p className="text-xs text-muted-foreground">Notifications set</p>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-orange-500 bg-background/80 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-semibold tracking-wide">
              Favorite Contests
            </CardTitle>
            <Star className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-extrabold text-orange-600 dark:text-orange-300">
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
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-center md:text-left">
            <h2 className="text-3xl font-bold mb-1">Featured Contests</h2>
            <p className="text-muted-foreground">
              Upcoming contests you might be interested in
            </p>
          </div>
          <Button variant="outline" className="shadow-sm" asChild>
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
      <section className="bg-gradient-to-r from-accent/10 to-background rounded-xl p-8 shadow-md">
        <div className="text-center space-y-4">
          <h3 className="text-2xl font-bold">Ready to compete?</h3>
          <p className="text-muted-foreground">
            Set up your preferences and never miss another contest
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild className="shadow">
              <Link href="/settings">
                <Bell className="mr-2 h-4 w-4" />
                Configure Reminders
              </Link>
            </Button>
            <Button variant="outline" asChild className="shadow">
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
