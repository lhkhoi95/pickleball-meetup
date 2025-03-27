import { headers } from 'next/headers';

export async function getUser(email: string) {
  const headersData = await headers();
  const res = await fetch(`${process.env.API_URL}/api/v1/users/${email}`, {
    headers: {
      'Content-Type': 'application/json',
      ...headersData,
    },
    cache: 'no-store'
  });

  if (!res.ok) {
    throw new Error('Failed to fetch user');
  }

  return res.json();
}