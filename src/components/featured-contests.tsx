"use client ";
import React,{useEffect,useState} from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ContestCard } from '@/components/contest-card';
import { Contest } from '@/model/Contest';
const loadData = async () => {
  try {
    const response = await fetch('/api/get-contests');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data.message as Contest[];
  } catch (error) {
    console.error('Failed to fetch contests:', error);
    return [];
  }
}

export default function FeaturedContests() {
    const [featuredContests, setFeaturedContests] = useState<Contest[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const contests = await loadData();
            setFeaturedContests(contests);
        };
        fetchData();
    }, []);

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
            {featuredContests.length > 0 ? (
                featuredContests.map((contest) => (
                <ContestCard key={contest.code} contest={contest} />
                ))
            ) : (
                <p className="text-muted-foreground">No contests available at the moment.</p>
            )}
        </div>
      </>
  );
}