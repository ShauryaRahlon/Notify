"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { FriendStalker } from "@/components/friend-stalker";
import { Bell, TrendingUp } from "lucide-react";
import Link from "next/link";

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
  return (
    <div className="container mx-auto px-2 sm:px-4 py-20 space-y-10 ">
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
        <div className="flex items-center justify-center relative overflow-hidden">
          <h1 className="text-2xl md:text-5xl lg:text-5xl font-bold text-center dark:text-white relative z-2 font-sans">
            Track <ColourfulText text="Contests" /> effortlessly <br />
            Stay ahead, compete, and win!
          </h1>
        </div>

        {/* <TextScroll
          text="Get notified for coding contests. Never miss a chance to compete!"
          default_velocity={5}
          className="font-display text-center text-xl font-normal tracking-normal  text-black dark:text-white md:text-3xl md:leading-[2rem] "
        /> */}

        {/* <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
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
        </div> */}
      </section>

      {/* Quick Stats */}
      <QuickSection />
      {/* Featured Contests */}
      <section className="space-y-6">
        <FeaturedContests />
      </section>

      {/* Friend Stalker Section */}
      <section>
        <FriendStalker />
      </section>

      {/* Quick Actions */}
      <section className="rounded-xl p-8 shadow-md">
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
