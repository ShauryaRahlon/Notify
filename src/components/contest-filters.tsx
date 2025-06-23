"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { platformNames } from "@/lib/mock-data";

interface ContestFiltersProps {
  selectedPlatforms: string[];
  onPlatformsChange: (platforms: string[]) => void;
}

export function ContestFilters({
  selectedPlatforms,
  onPlatformsChange,
}: ContestFiltersProps) {
  const handlePlatformChange = (platform: string, checked: boolean) => {
    if (checked) {
      onPlatformsChange([...selectedPlatforms, platform]);
    } else {
      onPlatformsChange(selectedPlatforms.filter((p) => p !== platform));
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Platforms</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {Object.entries(platformNames).map(([key, name]) => (
            <div key={key} className="flex items-center space-x-2">
              <Checkbox
                id={key}
                checked={selectedPlatforms.includes(key)}
                onCheckedChange={(checked) =>
                  handlePlatformChange(key, checked as boolean)
                }
              />
              <Label htmlFor={key} className="text-sm font-normal">
                {name}
              </Label>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
