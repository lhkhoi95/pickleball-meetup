"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SignInButton, useUser, SignOutButton } from "@clerk/nextjs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { COLORS } from "@/lib/constants";

export function Navbar() {
  const { isSignedIn, user } = useUser();

  return (
    <nav
      className={`flex items-center bg-${COLORS.navbar} justify-between p-4 border-b `}
    >
      <div className="flex items-center space-x-4 hover:cursor-pointer">
        <Link
          href="/"
          className="text-2xl font-bold  hover:scale-105 transition-transform duration-200 flex items-center gap-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-8 h-8 animate-spin-slow text-yellow-500"
          >
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
            <path d="M12 6c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z" />
          </svg>
          Pickleball Meetup
        </Link>
      </div>

      <div className="flex items-center space-x-4">
        {isSignedIn ? (
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarImage src={user.imageUrl || "/dummy-avatar.png"} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <span className="text-sm font-medium leading-none">
              {user.firstName}
            </span>
            <div className="text-sm font-medium">
              <SignOutButton redirectUrl="/">
                <Button
                  variant="ghost"
                  className="cursor-pointer hover:bg-zinc-500 transition-colors duration-200"
                >
                  Sign Out
                </Button>
              </SignOutButton>
            </div>
          </div>
        ) : (
          <SignInButton>
            <Button className="cursor-pointer">Sign In</Button>
          </SignInButton>
        )}
      </div>
    </nav>
  );
}
