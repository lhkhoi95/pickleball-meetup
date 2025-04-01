"use client"
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { LocationSearch } from "./LocationSearch";

type SkillLevel = {
    value: string;
    label: string;
};

const SKILL_LEVELS = [
    { value: "1.0-2.0", label: "Beginner (1.0-2.0)" },
    { value: "2.5-3.0", label: "Intermediate (2.5-3.0)" },
    { value: "3.5-4.0", label: "Advanced (3.5-4.0)" },
    { value: "4.5-5.0", label: "Expert (4.5+)" },
];

const FREQUENCY = [
    { value: "1", label: "Once a week" },
    { value: "2-3", label: "2-3 times a week" },
    { value: "4-5", label: "4-5 times a week" },
    { value: "6+", label: "6+ times a week" },
];

export default function Onboarding() {
    const [formData, setFormData] = useState({
        location: "",
        skillLevel: "",
        frequency: "",
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // TODO: Submit form data to your API
        console.log(formData);
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

                        <Button type="submit" className="w-full">
                            Complete Setup
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}