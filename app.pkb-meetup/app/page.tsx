import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs/server";
import LandingPage from "@/components/landing-page/LandingPage";
import { getUserByEmail } from "@/lib/serverApis";

export default async function Home() {
  const user = await currentUser();

  if (user) {
    const dbUser = await getUserByEmail(user?.primaryEmailAddress?.emailAddress || "");


    // User is not in the database, redirect to onboarding page
    if (!dbUser) {
      return redirect("/onboarding");
    }

    redirect("/dashboard");
  }

  return (
    <main>
      <LandingPage />
    </main>
  );
}
