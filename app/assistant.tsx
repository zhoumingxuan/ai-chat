"use client";

import { AssistantRuntimeProvider } from "@assistant-ui/react";
import { useChatRuntime } from "@assistant-ui/react-ai-sdk";
import { Thread } from "@/components/assistant-ui/thread";
import { ThreadList } from "@/components/assistant-ui/thread-list";
import {
  CompositeAttachmentAdapter,
  SimpleImageAttachmentAdapter,
  SimpleTextAttachmentAdapter,
} from "@assistant-ui/react";
import { LoginForm } from "@/components/auth/login-form";
import { UserStatus } from "@/components/auth/user-status";
import { useAuth } from "@/contexts/auth";

export const Assistant = () => {
  const { user } = useAuth();

  const runtime = useChatRuntime({
    api: "/api/chat",
    adapters: {
      attachments: new CompositeAttachmentAdapter([
        new SimpleImageAttachmentAdapter(),
        new SimpleTextAttachmentAdapter(),
      ]),
    },
  });

  if (!user) {
    return (
      <div className="flex h-dvh items-center justify-center bg-[#f5f5f5]">
        <LoginForm />
      </div>
    );
  }

  return (
    <AssistantRuntimeProvider runtime={runtime}>
      <div className="grid h-dvh grid-cols-[240px_1fr] gap-x-2">
        <div className="flex flex-col">
          <ThreadList />
          <UserStatus />
        </div>
        <Thread />
      </div>
    </AssistantRuntimeProvider>
  );
};
