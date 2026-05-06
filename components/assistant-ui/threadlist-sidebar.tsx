"use client";

import type * as React from "react";
import {
  MessagesSquare,
  Sparkles,
  Plus,
  Settings,
  User,
  LogOut,
  Moon,
  Sun,
  Zap,
  Crown,
} from "lucide-react";
import Link from "next/link";
import { UserButton, useUser } from "@clerk/nextjs";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { ThreadList } from "@/components/assistant-ui/thread-list";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";

/* ══════════════════════════════════════════
   Thread List Sidebar
══════════════════════════════════════════ */

export function ThreadListSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar
      className="border-r-0"
      style={{
        background: "#0a0a0a",
        borderRight: "1px solid rgba(255,255,255,0.06)",
      }}
      {...props}
    >
      <SidebarHeader className="aui-sidebar-header px-4 py-4">
        <SidebarHeaderContent />
      </SidebarHeader>

      <SidebarContent className="aui-sidebar-content px-3 py-2">
        <ThreadList />
      </SidebarContent>

      <SidebarFooter className="aui-sidebar-footer p-4">
        <SidebarFooterContent />
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}

/* ══════════════════════════════════════════
   Header Content
══════════════════════════════════════════ */

function SidebarHeaderContent() {
  return (
    <div className="space-y-3">
      {/* Logo/Brand */}
      <SidebarMenu>
        <SidebarMenuItem>
          <Link
            href="/"
            className="group flex items-center gap-3 rounded-xl p-2 transition-all duration-300 hover:bg-white/[0.04]"
          >
            {/* Logo Icon */}
            <div
              className="relative flex size-10 shrink-0 items-center justify-center rounded-xl shadow-lg transition-all duration-300 group-hover:scale-105"
              style={{
                background:
                  "linear-gradient(135deg, rgba(139,92,246,1), rgba(99,102,241,0.9))",
                boxShadow: "0 4px 16px rgba(139,92,246,0.3)",
              }}
            >
              <Sparkles className="size-5 text-white" strokeWidth={2} />
              <div className="absolute inset-0 rounded-xl bg-gradient-to-t from-black/20 to-white/10" />

              {/* Status dot */}
              <span className="absolute -right-0.5 -top-0.5 flex size-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex size-2.5 rounded-full border-2 border-[#0a0a0a] bg-emerald-400" />
              </span>
            </div>

            {/* Brand Text */}
            <div className="flex flex-1 flex-col gap-0.5 leading-none">
              <span className="bg-gradient-to-r from-violet-300 via-purple-300 to-indigo-300 bg-clip-text text-base font-bold tracking-tight text-transparent">
                Neurox
              </span>
              <span className="text-xs text-white/30">AI Assistant</span>
            </div>
          </Link>
        </SidebarMenuItem>
      </SidebarMenu>

      {/* New Chat Button */}
      <Link href="/chat">
        <button
          className="group flex w-full items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-medium transition-all duration-300 active:scale-95"
          style={{
            background:
              "linear-gradient(135deg, rgba(139,92,246,0.15), rgba(99,102,241,0.1))",
            border: "1px solid rgba(139,92,246,0.25)",
          }}
        >
          <Plus className="size-4 text-violet-400 transition-transform group-hover:rotate-90" strokeWidth={2.5} />
          <span className="text-white/70 transition-colors group-hover:text-white">
            New Chat
          </span>
        </button>
      </Link>
    </div>
  );
}

/* ══════════════════════════════════════════
   Footer Content
══════════════════════════════════════════ */

function SidebarFooterContent() {
  const { user } = useUser();
  const [showUpgrade, setShowUpgrade] = useState(true);

  return (
    <div className="space-y-3">
      {/* Upgrade Banner (Optional - can be hidden) */}
      {showUpgrade && (
        <div
          className="relative overflow-hidden rounded-xl p-4"
          style={{
            background:
              "linear-gradient(135deg, rgba(139,92,246,0.12), rgba(99,102,241,0.08))",
            border: "1px solid rgba(139,92,246,0.2)",
          }}
        >
          {/* Glow effect */}
          <div
            className="pointer-events-none absolute -right-10 -top-10 size-32 rounded-full blur-3xl"
            style={{
              background:
                "radial-gradient(circle, rgba(139,92,246,0.3), transparent 70%)",
            }}
          />

          <div className="relative space-y-2.5">
            <div className="flex items-center gap-2">
              <div className="flex size-7 items-center justify-center rounded-lg bg-gradient-to-br from-amber-400 to-orange-500 shadow-lg shadow-amber-500/30">
                <Crown className="size-3.5 text-white" strokeWidth={2.5} />
              </div>
              <span className="text-sm font-semibold text-white/90">
                Upgrade to Pro
              </span>
            </div>

            <p className="text-xs leading-relaxed text-white/40">
              Unlock unlimited messages, GPT-4, and priority support.
            </p>

            <button
              className="flex w-full items-center justify-center gap-1.5 rounded-lg py-2 text-xs font-medium transition-all active:scale-95"
              style={{
                background:
                  "linear-gradient(135deg, rgba(139,92,246,1), rgba(99,102,241,0.9))",
              }}
            >
              <Zap className="size-3 fill-white text-white" strokeWidth={2} />
              <span className="text-white">Upgrade Now</span>
            </button>
          </div>

          {/* Close button */}
          <button
            onClick={() => setShowUpgrade(false)}
            className="absolute right-2 top-2 flex size-5 items-center justify-center rounded-md text-white/30 transition-all hover:bg-white/[0.08] hover:text-white/60"
          >
            ✕
          </button>
        </div>
      )}

      {/* User Profile */}
      <div
        className="group relative overflow-hidden rounded-xl p-3 transition-all duration-300 hover:bg-white/[0.03]"
        style={{
          border: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <div className="flex items-center gap-3">
          {/* User Avatar */}
          {user ? (
            <div className="relative">
              <UserButton
                appearance={{
                  elements: {
                    avatarBox: "size-9 rounded-xl ring-1 ring-white/10",
                  },
                }}
              />
              <span className="absolute -bottom-0.5 -right-0.5 size-2.5 rounded-full border-2 border-[#0a0a0a] bg-emerald-400" />
            </div>
          ) : (
            <div
              className="flex size-9 items-center justify-center rounded-xl"
              style={{
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <User className="size-4 text-white/40" strokeWidth={2} />
            </div>
          )}

          {/* User Info */}
          <div className="flex-1 overflow-hidden">
            <p className="truncate text-sm font-medium text-white/80">
              {user?.fullName || user?.username || "Guest User"}
            </p>
            <p className="truncate text-xs text-white/30">
              {user?.primaryEmailAddress?.emailAddress || "Not signed in"}
            </p>
          </div>

          {/* Settings Icon */}
          <button
            className="flex size-7 items-center justify-center rounded-lg text-white/30 opacity-0 transition-all hover:bg-white/[0.06] hover:text-violet-400 group-hover:opacity-100"
            aria-label="Settings"
          >
            <Settings className="size-3.5" strokeWidth={2} />
          </button>
        </div>
      </div>

      {/* Footer Info */}
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-1.5">
          <span className="relative flex size-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex size-1.5 rounded-full bg-emerald-400" />
          </span>
          <span className="text-[11px] text-white/25">All systems operational</span>
        </div>

        <span className="font-mono text-[10px] text-white/20">v1.5.3</span>
      </div>
    </div>
  );
}