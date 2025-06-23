"use client ";
import React, { useContext } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ContestCard } from "@/components/contest-card";
import { ContestContext } from "@/context/ContestProvider";

export default function FeaturedContests() {
  const { contest, contestLoading,reminder,reminderLoading } = useContext(ContestContext);

  // Skeleton for contest cards
  const ContestCardSkeleton = () => (
    <div className="h-40 rounded-xl bg-muted animate-pulse flex flex-col p-4 gap-2">
      <div className="h-6 w-1/2 bg-muted-foreground/30 rounded mb-2" />
      <div className="h-4 w-1/3 bg-muted-foreground/20 rounded mb-4" />
      <div className="flex-1" />
      <div className="h-4 w-1/4 bg-muted-foreground/10 rounded" />
    </div>
  );

  return (
    <>
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
        {(contestLoading || reminderLoading) ? (
          Array.from({ length: 3 }).map((_, i) => (
            <ContestCardSkeleton key={i} />
          ))
        ) : contest.length > 0 ? (
          [...contest]
            .reverse()
            .slice(0, 3)
            .map((contest) => (
              <ContestCard key={contest.code} contest={contest} reminders={reminder} />
            ))
        ) : (
          <p className="text-muted-foreground">
            No contests available at the moment.
          </p>
        )}
      </div>
    </>
  );
}
