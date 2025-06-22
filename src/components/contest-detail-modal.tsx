"use client"

import { Contest } from "@/model/Contest"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Clock, ExternalLink, Bell, Calendar } from "lucide-react"
import { platformNames, platformColors } from "@/lib/mock-data"
import { format } from "date-fns"
import { useState, useEffect } from "react"

interface ContestDetailModalProps {
  contest: Contest | null
  isOpen: boolean
  onClose: () => void
}

export function ContestDetailModal({ contest, isOpen, onClose }: ContestDetailModalProps) {
  const [timeLeft, setTimeLeft] = useState<string>("")

  useEffect(() => {
    if (!contest) return

    const updateCountdown = () => {
      const now = new Date().getTime()
      const contestStart = new Date(contest.startTime).getTime()
      const difference = contestStart - now

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24))
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
        const seconds = Math.floor((difference % (1000 * 60)) / 1000)

        if (days > 0) {
          setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`)
        } else if (hours > 0) {
          setTimeLeft(`${hours}h ${minutes}m ${seconds}s`)
        } else {
          setTimeLeft(`${minutes}m ${seconds}s`)
        }
      } else {
        setTimeLeft("Contest has started!")
      }
    }

    updateCountdown()
    const interval = setInterval(updateCountdown, 1000)

    return () => clearInterval(interval)
  }, [contest])

  if (!contest) return null

  const getDifficultyColor = (difficulty?: string) => {
    switch (difficulty) {
      case "easy":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "medium":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
      case "hard":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center space-x-2 mb-2">
            <div className={`w-3 h-3 rounded-full ${platformColors[contest.platform as keyof typeof platformColors]}`} />
            <span className="text-sm font-medium text-muted-foreground">{platformNames[contest.platform as keyof typeof platformNames]}</span>
          </div>
          <DialogTitle className="text-2xl">{contest.name}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Countdown Timer */}
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-900/50 dark:to-gray-800/50 rounded-lg p-6 text-center">
            <div className="text-sm text-muted-foreground mb-2">Time until contest starts</div>
            <div className="text-3xl font-bold text-primary">{timeLeft}</div>
          </div>

          {/* Contest Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{format(contest.startTime, "EEEE, MMMM dd, yyyy")}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">
                  {format(contest.startTime, "HH:mm")} ({Math.floor(contest.duration / 60)}h {contest.duration % 60}m)
                </span>
              </div>
            </div>
          </div>

          <Separator />

          {/* Description */}


          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Button className="flex-1">
              <Bell className="h-4 w-4 mr-2" />
              Set Reminder
            </Button>
            <Button variant="outline" className="flex-1" onClick={() => window.open(contest.url, "_blank")}>
              <ExternalLink className="h-4 w-4 mr-2" />
              Go to Contest
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
