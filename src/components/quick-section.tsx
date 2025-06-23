"use client";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Calendar, Clock, Bell, Star } from "lucide-react";
import React, { useState } from "react";

import { ContestContext } from "@/context/ContestProvider";
import { useContext } from "react";
import { Contest } from "@/model/Contest";
import { Reminder } from "@/model/Reminder";
// Replace these with your actual data sources or props


export default function QuickSection() {
  const {contest, reminder, contestLoading, reminderLoading, getContest, getReminder} = useContext(ContestContext);
  
  
  React.useEffect(() => {
    getContest();
    getReminder();
  }
  , []);
 

  // Skeleton for cards
  const CardSkeleton = ({ color }: { color: string }) => (
    <Card
      className={`border-l-4 border-l-${color}-500 bg-background/80 shadow-sm animate-pulse`}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="h-4 w-24 bg-muted rounded" />
      </CardHeader>
      <CardContent>
        <div className={`h-10 w-2/3 bg-muted rounded mb-2`} />
        <div className="h-3 w-1/2 bg-muted rounded" />
      </CardContent>
    </Card>
  );

  if (contestLoading || reminderLoading) {
    return (
      <section className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-3">
        <CardSkeleton color="blue" />
        <CardSkeleton color="green" />
        <CardSkeleton color="purple" />
      </section>
    );
  }

  return (
    <section className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-3">
      <Card className="border-l-4 border-l-blue-500 bg-background/80 shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-semibold tracking-wide">
            Upcoming Contests
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-4xl font-extrabold text-blue-600  flex justify-between dark:text-blue-300 items-center">
            {contest.length > 0 &&
              contest.filter(
                (c:Contest) => new Date(c.startTime) > new Date()
              ).length}{" "}
            <Calendar className="h-8 w-8  text-blue-500" />
          </div>

          <p className="text-xs text-muted-foreground">Across all platforms</p>
        </CardContent>
      </Card>
      <Card className="border-l-4 border-l-green-500 bg-background/80 shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-semibold tracking-wide">
            Today's Contests
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-4xl font-extrabold text-green-600 dark:text-green-300 flex justify-between items-center">
            {contest.length > 0 &&
              contest.filter((c:Contest) => {
                const now = new Date();
                const today = new Date(
                  now.getFullYear(),
                  now.getMonth(),
                  now.getDate()
                );
                const tomorrow = new Date(today);
                tomorrow.setDate(today.getDate() + 1);
                const start = new Date(c.startTime);
                const end = new Date(c.endTime);
                return start >= today && end < tomorrow;
              }).length}
            <Clock className="h-8 w-8 text-green-500" />
          </div>
          <p className="text-xs text-muted-foreground">Starting today</p>
        </CardContent>
      </Card>
      <Card className="border-l-4 border-l-purple-500 bg-background/80 shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-semibold tracking-wide">
            Active Reminders
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-4xl font-extrabold text-purple-600 dark:text-purple-300 flex justify-between items-center">
            {reminder.filter((r:Reminder) => r.contest).length}
            <Bell className="h-8 w-8 text-purple-500" />
          </div>
          <p className="text-xs text-muted-foreground">Notifications set</p>
        </CardContent>
      </Card>
      {/* <Card className="border-l-4 border-l-orange-500 bg-background/80 shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-semibold tracking-wide">
            Favorite Contests
          </CardTitle>
          <Star className="h-4 w-4 text-orange-500" />
        </CardHeader>
      </Card> */}
    </section>
  );
}
