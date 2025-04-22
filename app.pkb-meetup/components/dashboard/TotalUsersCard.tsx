import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Users } from "lucide-react";
import { useApi } from "@/hooks/useApi";
import { Button } from "../ui/button";
import PlayersList from "./PlayersList";

export default function TotalUsersCard() {
  const { data: users, error, isLoading } = useApi<User[]>("/api/v1/users");
  const [showPlayers, setShowPlayers] = React.useState(false);

  if (isLoading) {
    return <TotalUsersCardLoading />;
  }

  if (error) {
    throw new Error("Failed to load users data");
  }

  function handleChallenge(playerId: string) {
    // Handle challenge logic here
    console.log(`Challenging player with ID: ${playerId}`);
  }

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Players</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <p className="text-xs text-muted-foreground">
            <span className="font-bold">{users?.length}</span> Total registered
            players
          </p>
        </CardContent>
        <Button
          variant="link"
          className="text-xs"
          onClick={() => setShowPlayers(true)}
        >
          View all players
        </Button>
      </Card>
      {showPlayers && (
        <PlayersList
          players={users || []}
          onClose={() => setShowPlayers(false)}
          onChallenge={(playerId) => handleChallenge(playerId)}
        />
      )}
    </>
  );
}

export function TotalUsersCardLoading() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Players Met</CardTitle>
        <Users className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold animate-pulse bg-muted h-6 w-16 rounded"></div>
        <p className="text-xs text-muted-foreground mt-2">Loading players...</p>
      </CardContent>
    </Card>
  );
}
