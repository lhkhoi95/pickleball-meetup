import { headers } from "next/headers";

export async function getUserByEmail(email: string) {
  const headersData = Object.fromEntries((await headers()).entries());
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/email/${email}`,
    {
      headers: {
        "Content-Type": "application/json",
        ...headersData,
      },
      cache: "no-store",
    }
  );

  if (res.status === 404) {
    return null; // User not found
  }

  if (!res.ok) {
    throw new Error("Failed to fetch user.");
  }

  return res.json();
}
