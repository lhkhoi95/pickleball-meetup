import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { toast } from "sonner";
import { COLORS } from "./constants";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function showToast({
  message,
  type,
}: {
  message: string;
  type: "success" | "error";
}) {
  if (type === "success") {
    return toast.success(message, {
      style: {
        background: COLORS.success,
        color: "#fff",
      },
      position: "top-center",
      icon: "🎉",
    });
  } else {
    return toast.error(message, {
      style: {
        background: COLORS.error,
        color: "#fff",
      },
      position: "top-center",
      icon: "❌",
    });
  }
}
