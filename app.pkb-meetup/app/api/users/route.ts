import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Add a new user
export async function POST(request: Request) {
  try {
    const user = await currentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await request.json();

    const newUser = {
      id: user.id,
      email: user.emailAddresses[0].emailAddress,
      name: `${user.firstName} ${user.lastName}`,
      location: data.location,
      skillLevel: data.skillLevel,
      frequency: data.frequency,
      imageUrl: user.imageUrl,
    };

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    });

    if (!res.ok) {
      throw new Error("Failed to create user");
    }

    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      { error: "Failed to create user" },
      { status: 500 }
    );
  }
}

// Update user
export async function PUT(request: Request) {
  try {
    const data: User = await request.json();

    const updatedUser = {
      skillLevel: data.skillLevel,
      frequency: data.frequency,
      location: data.location,
    };

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/${data.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedUser),
      }
    );

    if (!res.ok) {
      throw new Error("Failed to update user");
    }
    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      { error: "Failed to create user" },
      { status: 500 }
    );
  }
}
