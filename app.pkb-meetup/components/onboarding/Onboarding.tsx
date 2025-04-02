"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { LocationSearch } from "./LocationSearch";
import { FREQUENCY, SKILL_LEVELS } from "@/lib/constants";

export default function Onboarding() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        location: "",
        skillLevel: "",
        frequency: "",
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await fetch("/api/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error("Failed to create user");
            }

            // Redirect to dashboard after successful submission
            router.push("/dashboard");
        } catch (error) {
            console.error("Error submitting form:", error);
            // Here you might want to show an error message to the user
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="container mx-auto max-w-2xl py-8">
            <Card>
                <CardHeader>
                    <CardTitle>Welcome to Pickleball Meetup!</CardTitle>
                    <CardDescription>
                        Let's get to know you better to find the perfect pickleball matches.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="location">Where do you usually play?</Label>
                            <LocationSearch
                                value={formData.location}
                                onChange={(value: string) => setFormData({ ...formData, location: value })}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="skill-level">What's your skill level?</Label>
                            <Select
                                value={formData.skillLevel}
                                onValueChange={(value: string) => setFormData({ ...formData, skillLevel: value })}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select your skill level" />
                                </SelectTrigger>
                                <SelectContent>
                                    {SKILL_LEVELS.map((level: SkillLevel) => (
                                        <SelectItem key={level.value} value={level.value}>
                                            {level.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="frequency">How often do you play?</Label>
                            <Select
                                value={formData.frequency}
                                onValueChange={(value: string) => setFormData({ ...formData, frequency: value })}
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
                        </div>

                        <Button type="submit" className="w-full" disabled={isLoading}>
                            {isLoading ? "Setting up..." : "Complete Setup"}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}