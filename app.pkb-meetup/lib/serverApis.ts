export async function getUserByEmail(email: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/email/${email}`,
    {
      headers: {
        "Content-Type": "application/json",
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

export async function getUserById(userId: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/${userId}`,
    {
      headers: {
        "Content-Type": "application/json",
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
