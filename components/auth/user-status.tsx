"use client";

import { Settings } from "lucide-react";
import { useAuth } from "@/contexts/auth";

export const UserStatus = () => {
  const { user } = useAuth();
  if (!user) return null;

  return (
    <div style={{position:'sticky'}} className="flex items-center justify-between bg-[#f5f5f5] px-3 py-2 shadow-[0_-2px_4px_0_rgba(0,0,0,0.06)]">
      {/* 头像 + 昵称 */}
      <div className="flex items-center gap-2">
        <img
          src={user.avatar || 'https://via.placeholder.com/32'}
          alt="头像"
          className="h-8 w-8 rounded-full"
        />
        <span className="text-sm">{user.name}</span>
      </div>

      {/* 设置图标 */}
      <Settings className="size-4 cursor-pointer" />
    </div>
  );
};
