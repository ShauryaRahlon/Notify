"use client";
import { Reminder } from "@/model/Reminder";
import type { Contest } from "@/model/Contest";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, ExternalLink, Bell } from "lucide-react";
import { platformNames } from "@/lib/mock-data";
import { formatDistanceToNow, format } from "date-fns";
import { useState } from "react";
import { toast } from "sonner";

interface ContestCardProps {
  contest: Contest;
  reminders: Reminder[];
  onSetReminder?: (contestId: string) => void;
  onViewDetails?: (contest: Contest) => void;
}
import axios from "axios";
async function addReminder(contest: Contest) {
  try {
    const response = await axios.post("/api/set-reminder", { contest });
    return {
      success: response.data.success,
      message: response.data.message,
    };
  } catch (error) {
    console.error("Error setting reminder:", error);
    return {
      success: false,
      message: "Failed to set reminder.",
    };
  }
}

export function ContestCard({
  contest,
  onSetReminder,
  reminders,
}: ContestCardProps) {
  // Function to check if reminder is set for this contest
  const isReminderSet = () => {
    return reminders?.some(
      (reminder) => reminder.contest?.code === contest.code
    );
  };

  const [reminderSet, setReminderSet] = useState(isReminderSet());

  // Platform color mapping for dot and border
  const getPlatformColor = (platform: string) => {
    switch (platform.toLowerCase()) {
      case "leetcode":
        return "#FFA116"; // orange
      case "codechef":
        return "#A0522D"; // downbrown (saddlebrown)
      case "codeforces":
        return "#1F8ACB"; // blue
      default:
        return "#6366f1"; // fallback (indigo)
    }
  };

  const handleSetReminder = () => {
    addReminder(contest).then((result) => {
      if (result && result.success) {
        const isSetting = !reminderSet;
        setReminderSet(isSetting);
        onSetReminder?.(contest.code);
        toast(
          isSetting
            ? "Reminder set: You will be notified 1 hour before the contest starts"
            : "Reminder removed: You will no longer be notified about this contest"
        );
      } else {
        toast((result && result.message) || "Failed to set reminder.");
      }
    });
  };

  const startTime =
    contest.startTime instanceof Date
      ? contest.startTime
      : new Date(contest.startTime);
  const isStartingSoon = startTime.getTime() - Date.now() < 60 * 60 * 1000; // 1 hour

  return (
    <Card
      className="group hover:shadow-lg transition-all duration-200 border-l-4 h-full flex flex-col"
      style={{ borderLeftColor: getPlatformColor(contest.platform) }}
    >
      <a href={contest.url} target="_blank" rel="noopener noreferrer"></a>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: getPlatformColor(contest.platform) }}
            />
            <span className="text-sm font-medium text-muted-foreground">
              {platformNames[contest.platform as keyof typeof platformNames] ||
                contest.platform}
            </span>
          </div>
          {isStartingSoon && (
            <Badge variant="destructive" className="text-xs">
              Starting Soon
            </Badge>
          )}
        </div>
        <h3 className="font-semibold text-lg leading-tight group-hover:text-primary transition-colors">
          {contest.name}
        </h3>
      </CardHeader>
      <a href={contest.url} target="_blank" rel="noopener noreferrer">
        <CardContent className="space-y-3 flex-1">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-1 text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>{format(contest.startTime, "MMM dd, HH:mm")}</span>
            </div>
            <span className="text-muted-foreground">
              {Math.floor(contest.duration / 60)}h {contest.duration % 60}m
            </span>
          </div>

          <div className="text-sm text-muted-foreground">
            Starts {formatDistanceToNow(contest.startTime, { addSuffix: true })}
          </div>
        </CardContent>
      </a>
      <CardFooter className="flex space-x-2 pt-3 mt-auto">
        <Button
          type="button"
          variant={reminderSet ? "default" : "outline"}
          size="sm"
          onClick={handleSetReminder}
          className="flex-1 min-w-0"
        >
          <Bell
            className={`h-4 w-4 mr-1 ${reminderSet ? "fill-current" : ""}`}
          />
          {reminderSet ? "Reminder Set" : "Set Reminder"}
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => window.open(contest.url, "_blank")}
          className="min-w-0"
        >
          <ExternalLink className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}
