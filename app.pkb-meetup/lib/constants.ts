export const COLORS = {
  navbar: "#171717",
  success: "#379D00",
  error: "#f44336",
};
export const GOOGLE_API_PLACES_URL =
  "https://maps.googleapis.com/maps/api/place/autocomplete/json?";

export const SKILL_LEVELS = [
  { value: "1.0-2.0", label: "Beginner (1.0-2.0)" },
  { value: "2.5-3.0", label: "Intermediate (2.5-3.0)" },
  { value: "3.5-4.0", label: "Advanced (3.5-4.0)" },
  { value: "4.5-5.0", label: "Expert (4.5+)" },
];

export const FREQUENCY = [
  { value: "1", label: "Once a week" },
  { value: "2-3", label: "2-3 times a week" },
  { value: "4-5", label: "4-5 times a week" },
  { value: "6+", label: "6+ times a week" },
];

export const USER_DROPDOWN_ITEMS = [
  { label: "Profile", redirectTo: "/profile" },
  { label: "Dashboard", redirectTo: "/dashboard" },
  { label: "Activities", redirectTo: "/activities" },
  { label: "Settings", redirectTo: "/settings" },
];
