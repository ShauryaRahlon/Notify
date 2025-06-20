"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

import { Separator } from "@/components/ui/separator";
import type { UserSettings } from "@/lib/types";
import { platformNames } from "@/lib/mock-data";
import { useToast } from "@/hooks/use-toast";
import { Bell, Mail, Globe } from "lucide-react";
import axios from "axios";

async function fetchSettings() {
  const response = await axios.get("/api/settings");
  return response.data as UserSettings;
}

export default function SettingsPage() {
  const { toast } = useToast();
  const [settings, setSettings] = useState<UserSettings>({
    emailPreferences: {
      oneHour: true,
      oneDay: true,
    },
    platformPreferences: {
      leetcode: true,
      codeforces: true,
      codechef: true,
    },
    notifications: {
      email: true,
      browser: true,
      push: false,
    },
  });

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const userSettings = await axios.get("/api/change-settings");
        setSettings(userSettings.data);
      } catch (error) {
        console.error("Failed to fetch settings:", error);
        toast({
          title: "Error",
          description: "Failed to load settings. Please try again later.",
          variant: "destructive",
        });
      }
    };
    loadSettings();
  }, []);

  const handleSave = async () => {
    try {
      const res = await axios.post("/api/change-settings", settings);
      if (!res.data.success) {
        throw new Error("Failed to save settings");
      }
      if (res.data.success) {
        alert("Settings saved successfully!");
        // Optionally, you can update the local state with the new settings
        console.log("Settings save response:", res.data);
        toast({
          title: "Settings saved",
          description: "Your preferences have been updated successfully.",
        });
      }
    } catch (error) {
      console.error("Settings save error:", error);
      toast({
        title: "Error",
        description: "Failed to save settings. Please try again.",
        variant: "destructive",
      });
    }
  };

  const updateEmailPreferences = (
    key: keyof typeof settings.emailPreferences,
    value: boolean
  ) => {
    setSettings((prev) => ({
      ...prev,
      emailPreferences: {
        ...prev.emailPreferences,
        [key]: value,
      },
    }));
  };

  const updatePlatformPreferences = (
    key: keyof typeof settings.platformPreferences,
    value: boolean
  ) => {
    setSettings((prev) => ({
      ...prev,
      platformPreferences: {
        ...prev.platformPreferences,
        [key]: value,
      },
    }));
  };

  const updateNotifications = (
    key: keyof typeof settings.notifications,
    value: boolean
  ) => {
    setSettings((prev) => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [key]: value,
      },
    }));
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-muted-foreground">
            Manage your contest tracking preferences and notifications
          </p>
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
                <span className="text-sm text-muted-foreground">
                  Get notified 1 hour before contest starts
                </span>
              </Label>
              <Switch
                id="one-hour"
                checked={settings.emailPreferences.oneHour}
                onCheckedChange={(value) =>
                  updateEmailPreferences("oneHour", value)
                }
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <Label htmlFor="one-day" className="flex flex-col space-y-1">
                <span>1 Day Before</span>
                <span className="text-sm text-muted-foreground">
                  Get notified 1 day before contest starts
                </span>
              </Label>
              <Switch
                id="one-day"
                checked={settings.emailPreferences.oneDay}
                onCheckedChange={(value) =>
                  updateEmailPreferences("oneDay", value)
                }
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
                    <span className="text-sm text-muted-foreground">
                      Track contests from {name}
                    </span>
                  </Label>
                  <Switch
                    id={key}
                    checked={
                      settings.platformPreferences[
                        key as keyof typeof settings.platformPreferences
                      ]
                    }
                    onCheckedChange={(value) =>
                      updatePlatformPreferences(
                        key as keyof typeof settings.platformPreferences,
                        value
                      )
                    }
                  />
                </div>
                {index < Object.entries(platformNames).length - 1 && (
                  <Separator className="mt-4" />
                )}
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Timezone */}

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
                <span className="text-sm text-muted-foreground">
                  Receive notifications via email
                </span>
              </Label>
              <Switch
                id="email-notif"
                checked={settings.notifications.email}
                onCheckedChange={(value) => updateNotifications("email", value)}
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <Label
                htmlFor="browser-notif"
                className="flex flex-col space-y-1"
              >
                <span>Browser Notifications</span>
                <span className="text-sm text-muted-foreground">
                  Show notifications in your browser
                </span>
              </Label>
              <Switch
                id="browser-notif"
                checked={settings.notifications.browser}
                onCheckedChange={(value) =>
                  updateNotifications("browser", value)
                }
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <Label htmlFor="push-notif" className="flex flex-col space-y-1">
                <span>Push Notifications</span>
                <span className="text-sm text-muted-foreground">
                  Receive push notifications on mobile
                </span>
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
  );
}
