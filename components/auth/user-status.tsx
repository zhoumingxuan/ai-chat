"use client";

import { Settings } from "lucide-react";
import { useAuth } from "@/contexts/auth";

export const UserStatus = () => {
  const { user } = useAuth();
  if (!user) return null;

  return (
    <div className="flex items-center justify-between border-t px-3 py-2 bg-[#f5f5f5]">
      <div className="flex items-center gap-2">
        {/* If no avatar, show placeholder */}
        <img
          src={user.avatar || "https://via.placeholder.com/32"}
          alt="avatar"
          className="h-8 w-8 rounded-full"
        />
        <span className="text-sm">{user.name}</span>
      </div>
      <Settings className="size-4 cursor-pointer" />
    </div>
  );
};
