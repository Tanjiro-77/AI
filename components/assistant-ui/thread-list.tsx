"use client";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  AuiIf,
  ThreadListItemMorePrimitive,
  ThreadListItemPrimitive,
  ThreadListPrimitive,
} from "@assistant-ui/react";
import {
  ArchiveIcon,
  MoreHorizontalIcon,
  PlusIcon,
  MessageSquareIcon,
  SparklesIcon,
  TrashIcon,
  PencilIcon,
  StarIcon,
  ClockIcon,
  TrendingUpIcon,
} from "lucide-react";
import { type FC, useState, useRef } from "react";
import { cn } from "@/lib/utils";

/* ══════════════════════════════════════════
   Main Thread List
══════════════════════════════════════════ */

export const ThreadList: FC = () => {
  return (
    <ThreadListPrimitive.Root className="aui-root aui-thread-list-root flex flex-col gap-3">
      <ThreadListNew />

      <AuiIf condition={({ threads }) => threads.isLoading}>
        <ThreadListSkeleton />
      </AuiIf>

      <AuiIf condition={({ threads }) => !threads.isLoading}>
        <div className="flex flex-col gap-1">
          {/* Section header */}
          <div className="mb-1 flex items-center gap-2 px-3">
            <ClockIcon className="size-3 text-white/20" strokeWidth={2} />
            <span className="text-[11px] font-semibold uppercase tracking-widest text-white/20">
              Recent
            </span>
          </div>

          <ThreadListPrimitive.Items>
            {() => <ThreadListItem />}
          </ThreadListPrimitive.Items>
        </div>
      </AuiIf>
    </ThreadListPrimitive.Root>
  );
};

/* ══════════════════════════════════════════
   New Thread Button
══════════════════════════════════════════ */

const ThreadListNew: FC = () => {
  const [hovered, setHovered] = useState(false);

  return (
    <ThreadListPrimitive.New asChild>
      <button
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className={cn(
          "aui-thread-list-new group relative flex h-11 items-center justify-center gap-2 rounded-xl px-4 text-sm font-medium transition-all duration-300 active:scale-95",
          "overflow-hidden",
        )}
        style={{
          background: hovered
            ? "linear-gradient(135deg, rgba(139,92,246,0.2), rgba(99,102,241,0.15))"
            : "linear-gradient(135deg, rgba(139,92,246,0.15), rgba(99,102,241,0.1))",
          border: hovered
            ? "1px solid rgba(139,92,246,0.4)"
            : "1px solid rgba(139,92,246,0.25)",
          boxShadow: hovered
            ? "0 4px 16px rgba(139,92,246,0.2)"
            : "0 2px 8px rgba(0,0,0,0.3)",
        }}
      >
        {/* Animated gradient overlay */}
        <div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(139,92,246,0.1), transparent)",
            animation: "shimmer 2s infinite",
          }}
        />

        <div
          className="flex size-6 shrink-0 items-center justify-center rounded-lg transition-all duration-300 group-hover:scale-110"
          style={{
            background:
              "linear-gradient(135deg, rgba(139,92,246,1), rgba(99,102,241,0.9))",
            boxShadow: "0 2px 8px rgba(139,92,246,0.3)",
          }}
        >
          <PlusIcon
            className="size-3.5 text-white transition-transform group-hover:rotate-90"
            strokeWidth={2.5}
          />
        </div>

        <span className="relative z-10 flex-1 text-left text-white/80 transition-colors group-hover:text-white">
          New Chat
        </span>

        <SparklesIcon
          className={cn(
            "size-4 transition-all duration-300",
            hovered ? "text-violet-400 rotate-12" : "text-violet-400/40",
          )}
          strokeWidth={2}
        />

        <style jsx>{`
          @keyframes shimmer {
            0% {
              transform: translateX(-100%);
            }
            100% {
              transform: translateX(100%);
            }
          }
        `}</style>
      </button>
    </ThreadListPrimitive.New>
  );
};

/* ══════════════════════════════════════════
   Loading Skeleton
══════════════════════════════════════════ */

const ThreadListSkeleton: FC = () => {
  return (
    <div className="flex flex-col gap-1.5 pt-2">
      {Array.from({ length: 6 }, (_, i) => (
        <div
          key={i}
          role="status"
          aria-label="Loading threads"
          className="aui-thread-list-skeleton-wrapper flex h-10 items-center gap-3 rounded-xl px-3"
          style={{
            background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(255,255,255,0.04)",
          }}
        >
          <Skeleton
            className="size-4 shrink-0 rounded-md"
            style={{ background: "rgba(139,92,246,0.1)" }}
          />
          <Skeleton
            className="h-3 flex-1 rounded-md"
            style={{ background: "rgba(255,255,255,0.05)" }}
          />
          <Skeleton
            className="size-3 shrink-0 rounded-full"
            style={{ background: "rgba(255,255,255,0.03)" }}
          />
        </div>
      ))}
    </div>
  );
};

/* ══════════════════════════════════════════
   Thread List Item
══════════════════════════════════════════ */

const ThreadListItem: FC = () => {
  const [hovered, setHovered] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <ThreadListItemPrimitive.Root
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={cn(
        "aui-thread-list-item group relative flex h-10 items-center gap-2.5 overflow-hidden rounded-xl transition-all duration-200",
        "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-violet-500/40",
      )}
      style={{
        background: "transparent",
      }}
    >
      {/* Spotlight effect */}
      {hovered && (
        <div
          className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300"
          style={{
            background: `radial-gradient(120px circle at ${pos.x}px ${pos.y}px, rgba(139,92,246,0.06), transparent 70%)`,
          }}
        />
      )}

      {/* Active indicator bar */}
      <div
        className="absolute left-0 h-5 w-1 rounded-r-full transition-all duration-200"
        style={{
          background: "linear-gradient(to bottom, rgba(139,92,246,1), rgba(99,102,241,0.8))",
          opacity: 0,
          transform: "scaleY(0)",
        }}
        data-active="group-data-active:opacity-100 group-data-active:scale-y-100"
      />

      {/* Content wrapper */}
      <div className="relative z-10 flex w-full items-center gap-2.5 px-3">
        {/* Icon */}
        <div
          className={cn(
            "flex size-5 shrink-0 items-center justify-center rounded-lg transition-all duration-200",
          )}
          style={{
            background: hovered
              ? "rgba(139,92,246,0.15)"
              : "rgba(255,255,255,0.04)",
          }}
        >
          <MessageSquareIcon
            className={cn(
              "size-3 transition-colors duration-200",
              hovered ? "text-violet-400" : "text-white/30",
            )}
            strokeWidth={2}
          />
        </div>

        {/* Title */}
        <ThreadListItemPrimitive.Trigger className="aui-thread-list-item-trigger flex h-full min-w-0 flex-1 items-center text-start">
          <span
            className={cn(
              "truncate text-[13px] transition-colors duration-200",
              hovered ? "text-white/90" : "text-white/50",
            )}
          >
            <ThreadListItemPrimitive.Title fallback="New Chat" />
          </span>
        </ThreadListItemPrimitive.Trigger>

        {/* More options */}
        <ThreadListItemMore />
      </div>

      {/* Hover background */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 rounded-xl transition-opacity duration-200"
        style={{
          background: "rgba(255,255,255,0.03)",
          opacity: hovered ? 1 : 0,
        }}
      />
    </ThreadListItemPrimitive.Root>
  );
};

/* ══════════════════════════════════════════
   More Options Menu
══════════════════════════════════════════ */

const ThreadListItemMore: FC = () => {
  return (
    <ThreadListItemMorePrimitive.Root>
      <ThreadListItemMorePrimitive.Trigger asChild>
        <button
          className={cn(
            "aui-thread-list-item-more flex size-6 shrink-0 items-center justify-center rounded-lg transition-all duration-200",
            "opacity-0 group-hover:opacity-100 group-focus-within:opacity-100",
            "hover:bg-violet-500/15 hover:text-violet-400",
            "data-[state=open]:opacity-100 data-[state=open]:bg-violet-500/20 data-[state=open]:text-violet-400",
            "active:scale-90",
          )}
          aria-label="More options"
        >
          <MoreHorizontalIcon className="size-3.5" strokeWidth={2} />
        </button>
      </ThreadListItemMorePrimitive.Trigger>

      <ThreadListItemMorePrimitive.Content
        side="bottom"
        align="start"
        className={cn(
          "aui-thread-list-item-more-content z-50 min-w-48 overflow-hidden rounded-xl p-1.5 shadow-2xl",
          "animate-in fade-in-0 zoom-in-95 slide-in-from-top-2 duration-200",
        )}
        style={{
          background: "rgba(20,20,20,0.98)",
          border: "1px solid rgba(255,255,255,0.09)",
          backdropFilter: "blur(40px)",
        }}
      >
        {/* Rename option */}
        <ThreadListItemMorePrimitive.Item
          className={cn(
            "aui-thread-list-item-more-item group/item flex cursor-pointer select-none items-center gap-3 rounded-lg px-3 py-2.5 text-[13px] outline-none transition-colors duration-150",
            "hover:bg-white/[0.05] focus:bg-white/[0.07]",
          )}
        >
          <div className="flex size-6 items-center justify-center rounded-md bg-sky-500/15">
            <PencilIcon className="size-3 text-sky-400" strokeWidth={2} />
          </div>
          <span className="flex-1 font-medium text-white/70">Rename</span>
        </ThreadListItemMorePrimitive.Item>

        {/* Star/Favorite option */}
        <ThreadListItemMorePrimitive.Item
          className={cn(
            "aui-thread-list-item-more-item group/item flex cursor-pointer select-none items-center gap-3 rounded-lg px-3 py-2.5 text-[13px] outline-none transition-colors duration-150",
            "hover:bg-white/[0.05] focus:bg-white/[0.07]",
          )}
        >
          <div className="flex size-6 items-center justify-center rounded-md bg-amber-500/15">
            <StarIcon className="size-3 text-amber-400" strokeWidth={2} />
          </div>
          <span className="flex-1 font-medium text-white/70">Favorite</span>
        </ThreadListItemMorePrimitive.Item>

        {/* Archive option */}
        <ThreadListItemPrimitive.Archive asChild>
          <ThreadListItemMorePrimitive.Item
            className={cn(
              "aui-thread-list-item-more-item group/item flex cursor-pointer select-none items-center gap-3 rounded-lg px-3 py-2.5 text-[13px] outline-none transition-colors duration-150",
              "hover:bg-white/[0.05] focus:bg-white/[0.07]",
            )}
          >
            <div className="flex size-6 items-center justify-center rounded-md bg-violet-500/15">
              <ArchiveIcon className="size-3 text-violet-400" strokeWidth={2} />
            </div>
            <span className="flex-1 font-medium text-white/70">Archive</span>
          </ThreadListItemMorePrimitive.Item>
        </ThreadListItemPrimitive.Archive>

        {/* Divider */}
        <div className="my-1.5 h-px bg-white/[0.06]" />

        {/* Delete option */}
        <ThreadListItemMorePrimitive.Item
          className={cn(
            "aui-thread-list-item-more-item group/item flex cursor-pointer select-none items-center gap-3 rounded-lg px-3 py-2.5 text-[13px] outline-none transition-colors duration-150",
            "hover:bg-red-500/10 focus:bg-red-500/15",
          )}
        >
          <div className="flex size-6 items-center justify-center rounded-md bg-red-500/15 transition-colors group-hover/item:bg-red-500/25">
            <TrashIcon className="size-3 text-red-400" strokeWidth={2} />
          </div>
          <span className="flex-1 font-medium text-red-400/80 transition-colors group-hover/item:text-red-400">
            Delete
          </span>
        </ThreadListItemMorePrimitive.Item>
      </ThreadListItemMorePrimitive.Content>
    </ThreadListItemMorePrimitive.Root>
  );
};