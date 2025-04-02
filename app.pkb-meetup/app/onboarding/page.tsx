import Onboarding from "@/components/onboarding/Onboarding";
import { getUserByEmail } from "@/lib/serverApis";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function Page() {
    const clerkUser = await currentUser();
    const dbUser = await getUserByEmail(clerkUser?.emailAddresses[0].emailAddress || "");
    if (dbUser) {
        redirect("/dashboard");
    }

    return (
        <>
            <Onboarding />
        </>
    );
}
