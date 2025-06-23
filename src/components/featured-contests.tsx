"use client ";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ContestCard } from "@/components/contest-card";
import { Contest } from "@/model/Contest";
const loadData = async () => {
  try {
    const response = await fetch("/api/get-contests");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data.message as Contest[];
  } catch (error) {
    console.error("Failed to fetch contests:", error);
    return [];
  }
};

export default function FeaturedContests() {
  const [featuredContests, setFeaturedContests] = useState<Contest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const contests = await loadData();
      setFeaturedContests(contests);
      setLoading(false);
    };
    fetchData();
  }, []);

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
        {loading ? (
          Array.from({ length: 3 }).map((_, i) => (
            <ContestCardSkeleton key={i} />
          ))
        ) : featuredContests.length > 0 ? (
          [...featuredContests]
            .reverse()
            .slice(0, 3)
            .map((contest) => (
              <ContestCard key={contest.code} contest={contest} />
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
