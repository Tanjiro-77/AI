"use client";

import { useMemo } from "react";
import { AssistantRuntimeProvider, AssistantCloud } from "@assistant-ui/react";
import {
  useChatRuntime,
  AssistantChatTransport,
} from "@assistant-ui/react-ai-sdk";
import { lastAssistantMessageIsCompleteWithToolCalls } from "ai";
import { Thread } from "@/components/assistant-ui/thread";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { ThreadListSidebar } from "@/components/assistant-ui/threadlist-sidebar";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { useAuth, UserButton, useUser } from "@clerk/nextjs";
import { Sparkles } from "lucide-react";

export const Assistant = () => {
  const { getToken } = useAuth();
  const { user } = useUser();

  const cloud = useMemo(
    () =>
      new AssistantCloud({
        baseUrl: process.env.NEXT_PUBLIC_ASSISTANT_BASE_URL!,
        authToken: async () => {
          const token = await getToken({ template: "assistant-ui" });
          if (!token) throw new Error("Missing Clerk JWT");
          return token;
        },
      }),
    [getToken],
  );

  const runtime = useChatRuntime({
    cloud,
    sendAutomaticallyWhen: lastAssistantMessageIsCompleteWithToolCalls,
    transport: new AssistantChatTransport({
      api: "/api/chat",
    }),
  });

  return (
    <AssistantRuntimeProvider runtime={runtime}>
      <SidebarProvider>
        <div className="flex h-dvh w-full overflow-hidden bg-background">

          {/* ── Sidebar ── */}
          <ThreadListSidebar />

          {/* ── Main Content ── */}
          <SidebarInset className="flex flex-col overflow-hidden">

            {/* ── Header ── */}
            <header className="relative z-10 flex h-16 shrink-0 items-center gap-3 border-b border-border/60 bg-background/80 px-4 backdrop-blur-md">

              {/* Left — sidebar trigger + logo */}
              <div className="flex items-center gap-3">
                <SidebarTrigger className="text-muted-foreground transition-colors hover:text-foreground" />

                <Separator orientation="vertical" className="h-5 bg-border/60" />

                {/* Neurox logo mark */}
                <div className="flex items-center gap-2">
                  <div className="relative flex size-7 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 shadow-md shadow-violet-500/25">
                    <Sparkles className="size-3.5 text-white" />
                    {/* live indicator */}
                    <span className="absolute -right-0.5 -top-0.5 size-2 rounded-full border border-background bg-emerald-400" />
                  </div>
                  <span className="hidden bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-sm font-bold tracking-tight text-transparent sm:inline">
                    Neurox
                  </span>
                </div>
              </div>

              {/* Centre — breadcrumb */}
              <Breadcrumb className="hidden md:flex">
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbPage className="flex items-center gap-1.5 rounded-md bg-muted/60 px-2.5 py-1 text-xs font-medium text-muted-foreground">
                      <span className="size-1.5 rounded-full bg-violet-400" />
                      AI Chat
                    </BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>

              {/* Right — user info */}
              <div className="ml-auto flex items-center gap-3">
                {/* Greeting */}
                <div className="hidden flex-col items-end sm:flex">
                  <span className="text-xs font-medium text-foreground/80">
                    {user?.firstName
                      ? `Hey, ${user.firstName} 👋`
                      : "Welcome back 👋"}
                  </span>
                  <span className="text-[10px] text-muted-foreground/60">
                    {user?.primaryEmailAddress?.emailAddress ?? ""}
                  </span>
                </div>

                <Separator orientation="vertical" className="hidden h-5 bg-border/60 sm:block" />

                {/* Avatar */}
                <UserButton
                  appearance={{
                    elements: {
                      avatarBox:
                        "size-8 ring-2 ring-violet-500/30 transition-all hover:ring-violet-500/60",
                    },
                  }}
                />
              </div>
            </header>

            {/* ── Chat area ── */}
            <div className="relative flex flex-1 flex-col overflow-hidden">

              {/* Subtle ambient glow behind the thread */}
              <div className="pointer-events-none absolute inset-0 -z-10">
                <div className="absolute left-1/2 top-1/3 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-500/5 blur-3xl" />
              </div>

              <Thread />
            </div>

          </SidebarInset>
        </div>
      </SidebarProvider>
    </AssistantRuntimeProvider>
  );
};