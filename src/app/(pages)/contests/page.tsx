"use client";

import { useState, useMemo, useEffect } from "react";
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
  const [contests, setContests] = useState<Contest[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("startTime");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedContest, setSelectedContest] = useState<Contest | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const fetchContests = async () => {
      setLoading(true);
      try {
        const response = await fetch("/api/get-contests");
        const data = await response.json();
        // Normalize contests to match UI type
        const normalized = (data.message || []).map((c: any) => ({
          id: c.code || c._id || c.id || c.name,
          title: c.name || c.title,
          platform: c.platform?.toLowerCase?.() || c.platform,
          startTime: new Date(c.startTime),
          duration: c.duration,
          url: c.url,
          difficulty: c.difficulty || undefined,
          description: c.description || undefined,
          participants: c.participants || undefined,
          prizes: c.prizes || undefined,
          // fallback for other fields if needed
        }));
        setContests(normalized);
      } catch (e) {
        setContests([]);
      } finally {
        setLoading(false);
      }
    };
    fetchContests();
  }, []);

  const filteredAndSortedContests = useMemo(() => {
    let filtered = contests.filter((contest) => {
      const matchesSearch =
        contest.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        contest.platform?.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesPlatform =
        selectedPlatforms.length === 0 ||
        selectedPlatforms.includes(contest.platform);
      const matchesDifficulty =
        !selectedDifficulty ||
        selectedDifficulty === "all" ||
        contest.difficulty === selectedDifficulty;
      return matchesSearch && matchesPlatform && matchesDifficulty;
    });
    filtered.sort((a, b) => {
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
        case "title":
          return (a.title || a.name).localeCompare(b.title || b.name);
        default:
          return 0;
      }
    });
    return filtered;
  }, [contests, searchQuery, selectedPlatforms, selectedDifficulty, sortBy]);

  return (
    <div className="container mx-auto px-4 py-8">
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
              selectedDifficulty={selectedDifficulty}
              onDifficultyChange={setSelectedDifficulty}
            />
          </div>
          {/* Contest Grid/List */}
          <div className="flex-1">
            {loading ? (
              <div className="text-center py-12 text-muted-foreground">
                Loading contests...
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
                {filteredAndSortedContests.map((contest) => (
                  <ContestCard
                    key={contest.code}
                    contest={contest}
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
        contest={selectedContest as any}
        isOpen={!!selectedContest}
        onClose={() => setSelectedContest(null)}
      />
    </div>
  );
}
