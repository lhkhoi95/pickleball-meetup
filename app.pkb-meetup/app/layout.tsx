import type { Metadata } from "next";
import { Montserrat_Alternates, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ClerkProvider } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import { Navbar } from "@/components/Navbar";
import { Toaster } from "@/components/ui/sonner";

const fontObj = Montserrat_Alternates({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const fontMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Pickleball Meetup",
  description: "Connect with Players, Join Games, Have Fun",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isLoggedIn = await currentUser();

  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={`${fontObj.className} ${fontMono.variable} antialiased`}>
        <ClerkProvider
          appearance={{
            elements: {
              footerAction: "hidden",
              footer: "hidden",
            },
          }}
        >
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
            {isLoggedIn && <Navbar />}
            {children}
            <Toaster />
          </ThemeProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
