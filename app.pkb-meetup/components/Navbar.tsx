"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SignInButton, useUser, SignOutButton } from "@clerk/nextjs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { COLORS, USER_DROPDOWN_ITEMS } from "@/lib/constants";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { redirect } from "next/navigation";
import { useState } from "react";

export function Navbar() {
  const { isSignedIn, user } = useUser();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav
      className={`flex items-center bg-${COLORS.navbar} justify-between p-4 border-b `}
    >
      <div className="flex items-center space-x-4 hover:cursor-pointer text-amber-300">
        <Link
          href="/"
          className="text-2xl font-bold  transition-transform duration-200 flex items-center gap-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="w-8 h-8"
          >
            {/* Main yellow ball */}
            <circle cx="12" cy="12" r="10" fill="#FCD34D" />

            {/* Pickleball holes pattern */}
            <circle cx="8" cy="8" r="1.2" fill="#000000" opacity="0.8" />
            <circle cx="12" cy="8" r="1.2" fill="#000000" opacity="0.8" />
            <circle cx="16" cy="8" r="1.2" fill="#000000" opacity="0.8" />

            <circle cx="6" cy="12" r="1.2" fill="#000000" opacity="0.8" />
            <circle cx="10" cy="12" r="1.2" fill="#000000" opacity="0.8" />
            <circle cx="14" cy="12" r="1.2" fill="#000000" opacity="0.8" />
            <circle cx="18" cy="12" r="1.2" fill="#000000" opacity="0.8" />

            <circle cx="8" cy="16" r="1.2" fill="#000000" opacity="0.8" />
            <circle cx="12" cy="16" r="1.2" fill="#000000" opacity="0.8" />
            <circle cx="16" cy="16" r="1.2" fill="#000000" opacity="0.8" />
          </svg>
          Pickleball Meetup
        </Link>
      </div>

      <div className="flex items-center space-x-4">
        {isSignedIn ? (
          <div className="flex items-center space-x-4">
            <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="cursor-pointer hover:bg-zinc-500 transition-colors duration-200"
                >
                  <Avatar>
                    <AvatarImage src={user.imageUrl || "/dummy-avatar.png"} />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-bold leading-none">
                    {user.firstName}
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-40 font-medium">
                {/* Display Users options dropdown menu */}
                {USER_DROPDOWN_ITEMS.map((option) => (
                  <DropdownMenuCheckboxItem
                    key={option.label}
                    className="cursor-pointer"
                    onClick={() => {
                      setIsOpen(false); // Close dropdown
                      redirect(option.redirectTo);
                    }}
                  >
                    {option.label}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <div className="text-sm font-medium">
              <SignOutButton redirectUrl="/">
                <Button
                  variant="ghost"
                  className="cursor-pointer hover:bg-zinc-500 transition-colors duration-200 font-bold"
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
