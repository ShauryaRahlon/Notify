"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { FriendStalker } from "@/components/friend-stalker";
import { Calendar, Clock, Bell, Star, TrendingUp, LogOut } from "lucide-react";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import QuickSection from "@/components/quick-section";
import FeaturedContests from "@/components/featured-contests";
import { signOut } from "next-auth/react";
import ScrollVelocity from "@/components/ui/ScrollVelocity";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";

export default function Dashboard() {
  const [logoutOpen, setLogoutOpen] = React.useState(false);
  return (
    <div className="container mx-auto px-2 sm:px-4 py-8 space-y-10">
      {/* Theme Toggle & Logout */}
      <div className="flex flex-col sm:flex-row justify-end items-center gap-4">
        <ThemeToggle />
        <Button
          variant="outline"
          size="icon"
          onClick={() => setLogoutOpen(true)}
          title="Logout"
        >
          <LogOut className="h-5 w-5" />
        </Button>
      </div>
      <Dialog open={logoutOpen} onOpenChange={setLogoutOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Are you sure you want to logout?</DialogTitle>
            <DialogDescription>
              You will be redirected to the sign-in page.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex gap-2 justify-end">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button
              variant="destructive"
              onClick={() => {
                setLogoutOpen(false);
                signOut({ callbackUrl: "/sign-in" });
              }}
            >
              Logout
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      {/* Hero Section */}
      <section className="text-center space-y-6 py-12 bg-gradient-to-br from-accent/10 to-background rounded-xl shadow-md">
        <h1 className="text-4xl md:text-6xl font-extrabold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-300 dark:via-purple-300 dark:to-pink-300 bg-clip-text text-transparent drop-shadow-lg">
          Track, Compete, Win.
        </h1>
        <ScrollVelocity
          texts={[
            "Get notified for coding contests.",
            "Never miss a chance to compete!",
          ]}
          numCopies={6}
          velocity={70}
          className=" text-2xl tracking-normal text-warning-foreground font-light max-w-2xl mx-auto"
        />

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
      <QuickSection />

      {/* Friend Stalker Section */}
      <section>
        <FriendStalker />
      </section>

      {/* Featured Contests */}
      <section className="space-y-6">
        <FeaturedContests />
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
