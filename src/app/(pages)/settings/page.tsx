"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

import { Separator } from "@/components/ui/separator";
import type { UserSettings } from "@/lib/types";
import { platformNames } from "@/lib/mock-data";
import { toast } from 'sonner';
import { Bell, Mail, Globe } from "lucide-react";
import axios from "axios";

// async function fetchSettings() {
//   const response = await axios.get("/api/settings");
//   return response.data as UserSettings;
// }

export default function SettingsPage() {
  const [settings, setSettings] = useState<UserSettings>({
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
        toast.error("Failed to load settings. Please try again later.");
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
      toast.success("Your preferences have been updated successfully.");
    } catch (error) {
      console.error("Settings save error:", error);
      toast.error("Failed to save settings. Please try again.");
    }
  };


  const updatePlatformPreferences = (
    key: keyof UserSettings["platformPreferences"],
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
    key: keyof UserSettings["notifications"],
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
    <div className="container mx-auto px-4 py-8 max-w-4xl mt-10">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-muted-foreground">
            Manage your contest tracking preferences and notifications
          </p>
        </div>

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
