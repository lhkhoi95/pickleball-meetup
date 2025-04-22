import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { Swords } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useUserStore } from "@/store/useStore";

export default function PlayersList({
  players,
  onClose,
  onChallenge,
}: {
  players: User[];
  onClose: () => void;
  onChallenge: (playerId: string) => void;
}) {
  const currentUser = useUserStore((state) => state.user);

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-yellow-500">
            Available Players
          </DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-4">
            {players
              .filter((player) => player.id !== currentUser?.id)
              .map((player) => (
                <div
                  key={player.id}
                  className={cn(
                    "flex items-center gap-4 p-4 rounded-lg",
                    "bg-gradient-to-r from-white to-gray-50 dark:from-gray-950 dark:to-gray-900",
                    "border border-gray-200 dark:border-gray-800",
                    "shadow-md hover:shadow-lg transition-all duration-200"
                  )}
                >
                  <Avatar className="border-2 border-yellow-200 dark:border-yellow-900">
                    <AvatarImage
                      src={player.imageUrl || ""}
                      alt={player.name}
                    />
                    <AvatarFallback className="bg-gradient-to-r from-yellow-500 to-pink-500 text-white">
                      {player.name?.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h4 className="text-sm font-semibold">{player.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      Skill Level: {player.skillLevel}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {player.location}
                    </p>
                  </div>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => onChallenge(player.id)}
                          className="hover:bg-yellow-100 dark:hover:bg-yellow-900 transition-colors"
                        >
                          <Swords className="h-5 w-5 text-yellow-500" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Challenge</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              ))}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
