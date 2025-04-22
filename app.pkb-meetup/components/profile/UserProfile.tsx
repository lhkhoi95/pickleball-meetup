"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LocationSearch } from "@/components/onboarding/LocationSearch";
import { FREQUENCY, SKILL_LEVELS } from "@/lib/constants";
import { useUserStore } from "@/store/useStore";
import Image from "next/image";
import { useState } from "react";
import { showToast } from "@/lib/utils";

const profileSchema = z.object({
  location: z.string().min(1, "Location is required"),
  skillLevel: z.string().min(1, "Skill level is required"),
  frequency: z.string().min(1, "Playing frequency is required"),
});

type ProfileFormData = z.infer<typeof profileSchema>;

export default function UserProfile({ user }: { user: User }) {
  const setUser = useUserStore((state) => state.setUser);
  const [initialLocation] = useState(user?.location || ""); // Store initial location

  const {
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      location: initialLocation,
      skillLevel: user?.skillLevel || "",
      frequency: user?.frequency || "",
    },
  });

  const onSubmit = async (data: ProfileFormData) => {
    try {
      const response = await fetch(`/api/users/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: user?.id, ...data }),
      });

      if (!response.ok) {
        showToast({
          message: "Failed to update profile",
          type: "error",
        });
        throw new Error("Failed to update profile");
      }

      const updatedUser = await response.json();
      setUser(updatedUser);
      showToast({
        message: "Profile updated successfully",
        type: "success",
      });
    } catch (error) {
      showToast({
        message: "Failed to update profile",
        type: "error",
      });
      throw error;
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4">
      <Card className="max-w-2xl w-full">
        <CardHeader className="flex flex-col items-center space-y-2">
          <CardTitle className="mt-2">Profile Settings</CardTitle>
          <Image
            src={user.imageUrl}
            alt="Landing Page"
            width={100}
            height={100}
            className="rounded-full"
            priority={true}
          />
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input value={user?.email} disabled />
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <LocationSearch
                value={watch("location")}
                onChange={(value) =>
                  setValue("location", value, { shouldValidate: true })
                }
              />
              {errors.location && (
                <p className="text-sm text-red-500">
                  {errors.location.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="skillLevel">Skill Level</Label>
              <Select
                value={watch("skillLevel")}
                onValueChange={(value) =>
                  setValue("skillLevel", value, { shouldValidate: true })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select your skill level" />
                </SelectTrigger>
                <SelectContent>
                  {SKILL_LEVELS.map((level) => (
                    <SelectItem key={level.value} value={level.value}>
                      {level.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.skillLevel && (
                <p className="text-sm text-red-500">
                  {errors.skillLevel.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="frequency">Playing Frequency</Label>
              <Select
                value={watch("frequency")}
                onValueChange={(value) =>
                  setValue("frequency", value, { shouldValidate: true })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select playing frequency" />
                </SelectTrigger>
                <SelectContent>
                  {FREQUENCY.map((freq) => (
                    <SelectItem key={freq.value} value={freq.value}>
                      {freq.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.frequency && (
                <p className="text-sm text-red-500">
                  {errors.frequency.message}
                </p>
              )}
            </div>

            <Button type="submit" className="w-full">
              Save Changes
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
