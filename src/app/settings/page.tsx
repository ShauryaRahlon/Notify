"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import type { UserSettings } from "@/lib/types"
import { platformNames } from "@/lib/mock-data"
import { useToast } from "@/hooks/use-toast"
import { Bell, Mail, Globe } from "lucide-react"

export default function SettingsPage() {
  const { toast } = useToast()
  const [settings, setSettings] = useState<UserSettings>({
    emailPreferences: {
      oneHour: true,
      oneDay: true,
      oneWeek: false,
    },
    platformPreferences: {
      leetcode: true,
      codeforces: true,
      gfg: false,
      atcoder: true,
      codechef: false,
    },
    timezone: "UTC",
    notifications: {
      email: true,
      browser: true,
      push: false,
    },
  })

  const handleSave = () => {
    // In a real app, this would save to a backend
    toast({
      title: "Settings saved",
      description: "Your preferences have been updated successfully.",
    })
  }

  const updateEmailPreferences = (key: keyof typeof settings.emailPreferences, value: boolean) => {
    setSettings((prev) => ({
      ...prev,
      emailPreferences: {
        ...prev.emailPreferences,
        [key]: value,
      },
    }))
  }

  const updatePlatformPreferences = (key: keyof typeof settings.platformPreferences, value: boolean) => {
    setSettings((prev) => ({
      ...prev,
      platformPreferences: {
        ...prev.platformPreferences,
        [key]: value,
      },
    }))
  }

  const updateNotifications = (key: keyof typeof settings.notifications, value: boolean) => {
    setSettings((prev) => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [key]: value,
      },
    }))
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-muted-foreground">Manage your contest tracking preferences and notifications</p>
        </div>

        {/* Email Preferences */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Mail className="h-5 w-5" />
              <span>Email Reminders</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="one-hour" className="flex flex-col space-y-1">
                <span>1 Hour Before</span>
                <span className="text-sm text-muted-foreground">Get notified 1 hour before contest starts</span>
              </Label>
              <Switch
                id="one-hour"
                checked={settings.emailPreferences.oneHour}
                onCheckedChange={(value) => updateEmailPreferences("oneHour", value)}
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <Label htmlFor="one-day" className="flex flex-col space-y-1">
                <span>1 Day Before</span>
                <span className="text-sm text-muted-foreground">Get notified 1 day before contest starts</span>
              </Label>
              <Switch
                id="one-day"
                checked={settings.emailPreferences.oneDay}
                onCheckedChange={(value) => updateEmailPreferences("oneDay", value)}
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <Label htmlFor="one-week" className="flex flex-col space-y-1">
                <span>1 Week Before</span>
                <span className="text-sm text-muted-foreground">Get notified 1 week before contest starts</span>
              </Label>
              <Switch
                id="one-week"
                checked={settings.emailPreferences.oneWeek}
                onCheckedChange={(value) => updateEmailPreferences("oneWeek", value)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Platform Preferences */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Globe className="h-5 w-5" />
              <span>Platform Preferences</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {Object.entries(platformNames).map(([key, name], index) => (
              <div key={key}>
                <div className="flex items-center justify-between">
                  <Label htmlFor={key} className="flex flex-col space-y-1">
                    <span>{name}</span>
                    <span className="text-sm text-muted-foreground">Track contests from {name}</span>
                  </Label>
                  <Switch
                    id={key}
                    checked={settings.platformPreferences[key as keyof typeof settings.platformPreferences]}
                    onCheckedChange={(value) =>
                      updatePlatformPreferences(key as keyof typeof settings.platformPreferences, value)
                    }
                  />
                </div>
                {index < Object.entries(platformNames).length - 1 && <Separator className="mt-4" />}
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Timezone */}
        <Card>
          <CardHeader>
            <CardTitle>Timezone</CardTitle>
          </CardHeader>
          <CardContent>
            <Select
              value={settings.timezone}
              onValueChange={(value) => setSettings((prev) => ({ ...prev, timezone: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select timezone" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="UTC">UTC</SelectItem>
                <SelectItem value="America/New_York">Eastern Time (ET)</SelectItem>
                <SelectItem value="America/Chicago">Central Time (CT)</SelectItem>
                <SelectItem value="America/Denver">Mountain Time (MT)</SelectItem>
                <SelectItem value="America/Los_Angeles">Pacific Time (PT)</SelectItem>
                <SelectItem value="Europe/London">London (GMT)</SelectItem>
                <SelectItem value="Europe/Paris">Paris (CET)</SelectItem>
                <SelectItem value="Asia/Tokyo">Tokyo (JST)</SelectItem>
                <SelectItem value="Asia/Shanghai">Shanghai (CST)</SelectItem>
                <SelectItem value="Asia/Kolkata">India (IST)</SelectItem>
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        {/* Notification Types */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Bell className="h-5 w-5" />
              <span>Notification Types</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="email-notif" className="flex flex-col space-y-1">
                <span>Email Notifications</span>
                <span className="text-sm text-muted-foreground">Receive notifications via email</span>
              </Label>
              <Switch
                id="email-notif"
                checked={settings.notifications.email}
                onCheckedChange={(value) => updateNotifications("email", value)}
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <Label htmlFor="browser-notif" className="flex flex-col space-y-1">
                <span>Browser Notifications</span>
                <span className="text-sm text-muted-foreground">Show notifications in your browser</span>
              </Label>
              <Switch
                id="browser-notif"
                checked={settings.notifications.browser}
                onCheckedChange={(value) => updateNotifications("browser", value)}
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <Label htmlFor="push-notif" className="flex flex-col space-y-1">
                <span>Push Notifications</span>
                <span className="text-sm text-muted-foreground">Receive push notifications on mobile</span>
              </Label>
              <Switch
                id="push-notif"
                checked={settings.notifications.push}
                onCheckedChange={(value) => updateNotifications("push", value)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Save Button */}
        <div className="flex justify-end">
          <Button onClick={handleSave} size="lg">
            Save Settings
          </Button>
        </div>
      </div>
    </div>
  )
}
