"use client";

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
  onSetReminder?: (contestId: string) => void;
  onViewDetails?: (contest: Contest) => void;
}
import axios from "axios";
async function addReminder(contest: Contest) {
  // This function can be used to set a reminder for the contest
  // You can implement the logic to save the reminder in your database
  try {
    const response = await axios.post("/api/set-reminder", {
      contest,
    });
    if (response.data.success) {
      return {
        success: true,
        message: "Reminder set successfully.",
      };
    } else if (response.data.message) {
      return {
        success: false,
        message: response.data.message,
      };
    }
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
}: ContestCardProps) {
  const [reminderSet, setReminderSet] = useState(false);

  // Platform color mapping for dot and border
  const getPlatformColor = (platform: string) => {
    switch (platform.toLowerCase()) {
      case "leetcode":
        return "#FFA116"; // orange
      case "codechef":
        return "#5B4638"; // brown
      case "codeforces":
        return "#888888"; // grey
      default:
        return "#6366f1"; // fallback (indigo)
    }
  };

  const handleSetReminder = () => {
    addReminder(contest).then((result) => {
      if (result && result.success) {
        toast("Reminder set successfully!");
      } else {
        toast((result && result.message) || "Failed to set reminder.");
      }
    });
    if (reminderSet) {
      // If reminder is already set, remove it
      setReminderSet(false);
      onSetReminder?.(contest.code);
      toast("Reminder removed: You will no longer be notified about this contest");
      return;
    }
    setReminderSet(!reminderSet);
    onSetReminder?.(contest.code);
    toast(
      reminderSet
        ? "Reminder removed: You will no longer be notified about this contest"
        : "Reminder set: You will be notified 1 hour before the contest starts"
    );
  };

  const startTime =
    contest.startTime instanceof Date
      ? contest.startTime
      : new Date(contest.startTime);
  const isStartingSoon = startTime.getTime() - Date.now() < 60 * 60 * 1000; // 1 hour

  return (
    <Card
      className="group hover:shadow-lg transition-all duration-200 border-l-4"
      style={{ borderLeftColor: getPlatformColor(contest.platform) }}
    >
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

      <CardContent className="space-y-3">
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

      <CardFooter className="flex space-x-2 pt-3">
        <Button
          variant={reminderSet ? "default" : "outline"}
          size="sm"
          onClick={handleSetReminder}
          className="flex-1"
        >
          <Bell
            className={`h-4 w-4 mr-1 ${reminderSet ? "fill-current" : ""}`}
          />
          {reminderSet ? "Reminder Set" : "Set Reminder"}
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => window.open(contest.url, "_blank")}
        >
          <ExternalLink className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}
