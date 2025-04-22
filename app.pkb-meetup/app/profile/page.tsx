import UserProfile from "@/components/profile/UserProfile";
import { getUserByEmail } from "@/lib/serverApis";
import { currentUser } from "@clerk/nextjs/server";

export default async function Page() {
  const clerkUser = await currentUser();
  const dbUser: User = await getUserByEmail(
    clerkUser?.primaryEmailAddress?.emailAddress as string
  );
  return (
    <>
      <UserProfile user={dbUser} />
    </>
  );
}
