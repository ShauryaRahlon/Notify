"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { FriendStalker } from "@/components/friend-stalker";
import { Bell, TrendingUp } from "lucide-react";
import Link from "next/link";
import BlurText from "@/components/ui/BlurText";
import QuickSection from "@/components/quick-section";
import FeaturedContests from "@/components/featured-contests";

import ColourfulText from "@/components/ui/colourful-text";
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
  const [loading, setLoading] = React.useState(false); // Toggle for demo

  // Skeleton Components
  const SkeletonQuickSection = () => (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="h-20 rounded-lg bg-muted animate-pulse" />
      ))}
    </div>
  );
  const SkeletonFeaturedContests = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="h-40 rounded-xl bg-muted animate-pulse" />
      ))}
    </div>
  );
  const SkeletonFriendStalker = () => (
    <div className="flex flex-col gap-4">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="h-16 rounded-lg bg-muted animate-pulse" />
      ))}
    </div>
  );
  const SkeletonQuickActions = () => (
    <div className="rounded-xl p-8 shadow-md bg-card animate-pulse">
      <div className="h-8 w-1/3 mx-auto bg-muted rounded mb-4" />
      <div className="h-4 w-2/3 mx-auto bg-muted rounded mb-6" />
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <div className="h-10 w-40 bg-muted rounded" />
        <div className="h-10 w-40 bg-muted rounded" />
      </div>
    </div>
  );

  return (
    <div className="container mx-auto px-2 sm:px-4 py-8 mt-16 md:mt-10 space-y-10 ">
      {/* Theme Toggle & Logout */}
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
          </DialogFooter>
        </DialogContent>
      </Dialog>
      {/* Hero Section */}
      <section className="text-center space-y-6 mt-10 ">
        <div className="flex items-center justify-center">
          <BlurText
            text="Effortlessly track coding contests. Stay updated, compete, and achieve your best!"
            delay={150}
            animateBy="words"
            direction="top"
            className="mb-8 text-2xl md:text-5xl lg:text-5xl font-bold text-center dark:text-white relative z-2 font-sans"
          />
        </div>
      </section>
      {/* Quick Stats */}
      {loading ? <SkeletonQuickSection /> : <QuickSection />}
      {/* Featured Contests */}
      <section className="space-y-6">
        {loading ? <SkeletonFeaturedContests /> : <FeaturedContests />}
      </section>
      {/* Friend Stalker Section */}
      <section>
        {loading ? <SkeletonFriendStalker /> : <FriendStalker />}
      </section>
      {/* Quick Actions */}
      <section >
        {loading ? (
          <SkeletonQuickActions />
        ) : (
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
        )}
      </section>
    </div>
  );
}
