"use client";

import { useContext, useMemo, useState } from "react";
import { ContestContext } from "@/context/ContestProvider";
import { ContestCard } from "@/components/contest-card";
import { ContestFilters } from "@/components/contest-filters";
import { ContestDetailModal } from "@/components/contest-detail-modal";
import type { Contest } from "@/model/Contest";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter, Grid, List } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
export default function ContestsPage() {
  const { contest, contestLoading, reminder, reminderLoading } =
    useContext(ContestContext);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<string>("startTime");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedContest, setSelectedContest] = useState<Contest | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  const filteredAndSortedContests = useMemo(() => {
    const filtered = contest.filter((contest: Contest) => {
      const matchesSearch =
        contest.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        contest.platform?.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesPlatform =
        selectedPlatforms.length === 0 ||
        selectedPlatforms.includes(contest.platform?.toLowerCase());
      return matchesSearch && matchesPlatform;
    });
    filtered.sort((a: Contest, b: Contest) => {
      switch (sortBy) {
        case "startTime":
          return (
            new Date(a.startTime).getTime() - new Date(b.startTime).getTime()
          );
        case "platform":
          return a.platform.localeCompare(b.platform);
        case "duration":
          return a.duration - b.duration;
        case "name":
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });
    return filtered;
  }, [contest, searchQuery, selectedPlatforms, sortBy]);

  // ContestCard skeleton for loading state
  const ContestCardSkeleton = () => (
    <div className="h-40 rounded-xl bg-muted animate-pulse flex flex-col p-4 gap-2">
      <div className="h-6 w-1/2 bg-muted-foreground/30 rounded mb-2" />
      <div className="h-4 w-1/3 bg-muted-foreground/20 rounded mb-4" />
      <div className="flex-1" />
      <div className="h-4 w-1/4 bg-muted-foreground/10 rounded" />
    </div>
  );

  return (
    <div className="container mx-auto px-4 mt-20 py-8">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">All Contests</h1>
              <p className="text-muted-foreground">
                {filteredAndSortedContests.length} contests found
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() =>
                  setViewMode(viewMode === "grid" ? "list" : "grid")
                }
              >
                {viewMode === "grid" ? (
                  <List className="h-4 w-4" />
                ) : (
                  <Grid className="h-4 w-4" />
                )}
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="md:hidden"
              >
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
            </div>
          </div>
          {/* Search and Sort */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search contests or platforms..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="startTime">Start Time</SelectItem>
                <SelectItem value="platform">Platform</SelectItem>
                <SelectItem value="duration">Duration</SelectItem>
                <SelectItem value="name">Name</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filters Sidebar */}
          <div
            className={`lg:w-64 ${showFilters ? "block" : "hidden lg:block"}`}
          >
            <ContestFilters
              selectedPlatforms={selectedPlatforms}
              onPlatformsChange={setSelectedPlatforms}
            />
          </div>
          {/* Contest Grid/List */}
          <div className="flex-1">
            {contestLoading || reminderLoading ? (
              <div
                className={
                  viewMode === "grid"
                    ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
                    : "space-y-4"
                }
              >
                {Array.from({ length: viewMode === "grid" ? 6 : 3 }).map(
                  (_, i) => (
                    <ContestCardSkeleton key={i} />
                  )
                )}
              </div>
            ) : filteredAndSortedContests.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-muted-foreground text-lg">
                  No contests found
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  Try adjusting your search or filter criteria
                </p>
              </div>
            ) : (
              <div
                className={
                  viewMode === "grid"
                    ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
                    : "space-y-4"
                }
              >
                {filteredAndSortedContests.map((contest: Contest) => (
                  <ContestCard
                    key={contest.code}
                    contest={contest}
                    reminders={reminder}
                    onViewDetails={setSelectedContest}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Contest Detail Modal */}
      <ContestDetailModal
        contest={selectedContest as Contest}
        isOpen={!!selectedContest}
        onClose={() => setSelectedContest(null)}
      />
    </div>
  );
}
