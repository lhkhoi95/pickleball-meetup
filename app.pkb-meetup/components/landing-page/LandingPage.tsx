"use client";

import Image from "next/image";
import React from "react";
import { SignInButton, SignUpButton } from "@clerk/nextjs";
import { Button } from "../ui/button";
import { motion } from "framer-motion";

export default function LandingPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 md:p-8">
      {/* Top Section: Content */}
      <motion.div
        className="w-full flex flex-col items-center justify-center mb-8 md:mb-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.h2
          className="text-3xl md:text-4xl font-extrabold text-center mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Pickleball Meetup
        </motion.h2>
        <motion.h1
          className="text-xl md:text-5xl font-bold text-center mb-6 bg-gradient-to-r from-purple-500 to-indigo-500 text-transparent bg-clip-text"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, type: "spring", stiffness: 100 }}
        >
          Connect with Players, Join Games, Have Fun
        </motion.h1>
        <motion.p
          className="text-lg md:text-xl text-center mb-8 max-w-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          Join our community of pickleball enthusiasts. Find games, meet
          players, and improve your skills.
        </motion.p>
        <motion.div
          className="flex flex-col md:flex-row gap-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <SignInButton>
            <Button className="py-3 px-6 rounded-lg hover:scale-105 transition-transform">
              Sign In
            </Button>
          </SignInButton>
          <SignUpButton>
            <Button
              variant="secondary"
              className="py-3 px-6 rounded-lg hover:scale-105 transition-transform"
            >
              Register
            </Button>
          </SignUpButton>
        </motion.div>
      </motion.div>

      {/* Bottom Section: Image */}
      <motion.div
        className="w-full max-w-4xl"
        initial={{ opacity: 0, scale: 0.8, y: 200 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{
          delay: 1,
          duration: 0.8,
          type: "spring",
          stiffness: 100,
          damping: 20,
        }}
      >
        <Image
          src="/landing-page/landing_image.png"
          alt="Landing Page"
          width={1200}
          height={800}
          className="w-full h-auto rounded-xl shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)] hover:shadow-[0_20px_60px_rgba(8,_112,_184,_0.8)] transition-all duration-300 hover:scale-[1.02]"
          priority={true}
        />
      </motion.div>
    </div>
  );
}
