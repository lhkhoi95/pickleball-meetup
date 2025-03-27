import { redirect } from "next/navigation";
import { currentUser, getAuth } from "@clerk/nextjs/server";
import LandingPage from "@/components/landing-page/LandingPage";
import { getUser } from "@/lib/serverApis";

export default async function Home() {
  const user = await currentUser();

  if (user) {
    // const dbUser = await getUser(user?.emailAddresses.toString() || "");
    console.log("USERS:", user?.primaryEmailAddress?.emailAddress);

    redirect("/dashboard");
  }

  return (
    <main>
      <LandingPage />
    </main>
  );
}
