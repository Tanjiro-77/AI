"use client";

import {
  ComposerAddAttachment,
  ComposerAttachments,
  UserMessageAttachments,
} from "@/components/assistant-ui/attachment";
import { MarkdownText } from "@/components/assistant-ui/markdown-text";
import { Reasoning } from "@/components/assistant-ui/reasoning";
import { ToolFallback } from "@/components/assistant-ui/tool-fallback";
import { TooltipIconButton } from "@/components/assistant-ui/tooltip-icon-button";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  ActionBarMorePrimitive,
  ActionBarPrimitive,
  AuiIf,
  BranchPickerPrimitive,
  ComposerPrimitive,
  ErrorPrimitive,
  MessagePrimitive,
  SuggestionPrimitive,
  ThreadPrimitive,
  useAuiState,
} from "@assistant-ui/react";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  CheckIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CopyIcon,
  DownloadIcon,
  MoreHorizontalIcon,
  PencilIcon,
  RefreshCwIcon,
  SquareIcon,
  SparklesIcon,
  AlertCircleIcon,
  Lightbulb,
  Code2,
  FileText,
  Zap,
  User,
  Bot,
  Send,
} from "lucide-react";
import { type FC, useState, useEffect, useRef } from "react";

/* ══════════════════════════════════════════
   Main Thread Component
══════════════════════════════════════════ */

export const Thread: FC = () => {
  return (
    <ThreadPrimitive.Root
      className="aui-root aui-thread-root @container flex h-full flex-col"
      style={{
        ["--thread-max-width" as string]: "52rem",
        ["--composer-radius" as string]: "20px",
        ["--composer-padding" as string]: "14px",
        background: "#080808",
      }}
    >
      <ThreadPrimitive.Viewport
        turnAnchor="top"
        data-slot="aui_thread-viewport"
        className="relative flex flex-1 flex-col overflow-x-hidden overflow-y-scroll scroll-smooth"
        style={{
          scrollbarWidth: "thin",
          scrollbarColor: "rgba(139,92,246,0.3) transparent",
        }}
      >
        <div className="mx-auto flex w-full max-w-(--thread-max-width) flex-1 flex-col px-4 pt-8 sm:px-6">
          <AuiIf condition={(s) => s.thread.isEmpty}>
            <ThreadWelcome />
          </AuiIf>

          <div
            data-slot="aui_message-group"
            className="mb-16 flex flex-col gap-y-8 empty:hidden"
          >
            <ThreadPrimitive.Messages>
              {() => <ThreadMessage />}
            </ThreadPrimitive.Messages>
          </div>

          <ThreadPrimitive.ViewportFooter className="aui-thread-viewport-footer sticky bottom-0 mt-auto flex flex-col gap-5 overflow-visible pb-8 pt-6">
            <ThreadScrollToBottom />
            <Composer />
          </ThreadPrimitive.ViewportFooter>
        </div>
      </ThreadPrimitive.Viewport>
    </ThreadPrimitive.Root>
  );
};

/* ══════════════════════════════════════════
   Thread Message Router
══════════════════════════════════════════ */

const ThreadMessage: FC = () => {
  const role = useAuiState((s) => s.message.role);
  const isEditing = useAuiState((s) => s.message.composer.isEditing);

  if (isEditing) return <EditComposer />;
  if (role === "user") return <UserMessage />;
  return <AssistantMessage />;
};

/* ══════════════════════════════════════════
   Scroll to Bottom Button
══════════════════════════════════════════ */

const ThreadScrollToBottom: FC = () => {
  return (
    <ThreadPrimitive.ScrollToBottom asChild>
      <button
        className={cn(
          "aui-thread-scroll-to-bottom group absolute -top-16 z-20 self-center",
          "flex size-11 items-center justify-center rounded-full transition-all duration-300 disabled:invisible",
          "shadow-2xl shadow-black/60",
        )}
        style={{
          background: "rgba(20,20,20,0.95)",
          border: "1px solid rgba(255,255,255,0.1)",
          backdropFilter: "blur(20px)",
        }}
        aria-label="Scroll to bottom"
      >
        <ArrowDownIcon className="size-4 text-white/60 transition-colors group-hover:text-violet-400" strokeWidth={2} />
      </button>
    </ThreadPrimitive.ScrollToBottom>
  );
};

/* ══════════════════════════════════════════
   Welcome Screen
══════════════════════════════════════════ */

const SUGGESTION_ICONS = [
  {
    icon: Lightbulb,
    gradient: "from-amber-500/15 to-orange-500/10",
    color: "text-amber-400",
  },
  {
    icon: Code2,
    gradient: "from-emerald-500/15 to-teal-500/10",
    color: "text-emerald-400",
  },
  {
    icon: FileText,
    gradient: "from-sky-500/15 to-blue-500/10",
    color: "text-sky-400",
  },
  {
    icon: Zap,
    gradient: "from-violet-500/15 to-purple-500/10",
    color: "text-violet-400",
  },
];

const ThreadWelcome: FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((i) => (i + 1) % 4);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="aui-thread-welcome-root my-auto flex grow flex-col justify-center">
      <div className="aui-thread-welcome-center flex w-full flex-col items-center justify-center gap-8 px-4 py-12 text-center">

        {/* Animated icon with glow */}
        <div className="fade-in zoom-in-95 relative animate-in fill-mode-both duration-500">
          <div
            className="absolute inset-0 animate-pulse rounded-3xl blur-2xl"
            style={{
              background: "radial-gradient(circle, rgba(139,92,246,0.4), transparent 70%)",
              animation: "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
            }}
          />
          <div
            className="relative flex size-20 items-center justify-center rounded-3xl shadow-2xl"
            style={{
              background: "linear-gradient(135deg, rgba(139,92,246,1), rgba(99,102,241,0.8))",
              boxShadow: "0 0 80px rgba(139,92,246,0.4)",
            }}
          >
            <SparklesIcon className="size-9 text-white" strokeWidth={2} />
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-t from-black/20 to-white/10" />
          </div>
        </div>

        {/* Heading */}
        <div className="fade-in slide-in-from-bottom-2 animate-in fill-mode-both delay-100 duration-500">
          <h1 className="mb-3 text-4xl font-bold tracking-[-0.02em] text-white sm:text-5xl">
            Welcome to{" "}
            <span className="bg-gradient-to-r from-violet-300 via-purple-300 to-indigo-300 bg-clip-text text-transparent">
              Neurox
            </span>
          </h1>
          <p className="mx-auto max-w-md text-[15px] leading-relaxed text-white/40">
            Your intelligent AI companion. Ask me anything — from brainstorming to coding.
          </p>
        </div>

        {/* Rotating capability badges */}
        <div className="fade-in slide-in-from-bottom-3 flex animate-in flex-wrap justify-center gap-2 delay-200 fill-mode-both duration-500">
          {["Write", "Code", "Analyze", "Create"].map((label, i) => (
            <div
              key={label}
              className={cn(
                "rounded-full px-3.5 py-1.5 text-[12px] font-medium transition-all duration-500",
                i === activeIndex
                  ? "bg-violet-500/20 text-violet-300 shadow-lg shadow-violet-500/20 scale-105"
                  : "bg-white/[0.04] text-white/30",
              )}
              style={{
                border: i === activeIndex ? "1px solid rgba(139,92,246,0.4)" : "1px solid rgba(255,255,255,0.06)",
              }}
            >
              {label}
            </div>
          ))}
        </div>
      </div>

      {/* Suggestions grid */}
      <ThreadSuggestions />
    </div>
  );
};

/* ══════════════════════════════════════════
   Suggestion Chips — FIXED VERSION
══════════════════════════════════════════ */

const ThreadSuggestions: FC = () => {
  return (
    <div className="aui-thread-welcome-suggestions grid w-full gap-3 pb-8 sm:grid-cols-2">
      <ThreadPrimitive.Suggestions>
        {({ suggestion }) => (
          <ThreadSuggestionCard suggestion={suggestion} />
        )}
      </ThreadPrimitive.Suggestions>
    </div>
  );
};

const ThreadSuggestionCard: FC<{
  suggestion: {
    title?: string;
    text?: string;
    description?: string;
  };
}> = ({ suggestion }) => {
  const [hovered, setHovered] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const ref = useRef<HTMLButtonElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  // Get suggestion text from the runtime
  const title = suggestion.title || suggestion.text || "Ask me anything";
  const description = suggestion.description || "";

  // Get icon styling based on title hash (to keep consistent colors)
  const iconIndex = title.length % SUGGESTION_ICONS.length;
  const iconConfig = SUGGESTION_ICONS[iconIndex];
  const Icon = iconConfig.icon;
  const gradient = iconConfig.gradient;
  const color = iconConfig.color;

  return (
    <div className="fade-in slide-in-from-bottom-4 animate-in fill-mode-both">
      <SuggestionPrimitive.Trigger send asChild>
        <button
          ref={ref}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          className={cn(
            "group relative w-full overflow-hidden rounded-2xl p-4 text-left transition-all duration-300 active:scale-95",
            "sm:p-5",
          )}
          style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.07)",
            transform: hovered ? "translateY(-2px)" : "translateY(0)",
            boxShadow: hovered
              ? "0 12px 40px rgba(0,0,0,0.6), 0 0 0 1px rgba(139,92,246,0.2)"
              : "0 4px 12px rgba(0,0,0,0.4)",
          }}
        >
          {/* Spotlight */}
          {hovered && (
            <div
              className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300"
              style={{
                background: `radial-gradient(140px circle at ${pos.x}px ${pos.y}px, rgba(139,92,246,0.08), transparent 70%)`,
              }}
            />
          )}

          <div className="relative z-10 flex items-start gap-3.5">
            <div
              className={cn(
                "flex size-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br shadow-lg transition-all duration-300 group-hover:scale-105",
                gradient,
              )}
            >
              <Icon className={cn("size-4.5", color)} strokeWidth={2} />
            </div>
            <div className="flex-1 space-y-1">
              <p className="font-semibold text-[14px] text-white/85 transition-colors group-hover:text-white">
                {title}
              </p>
              {description && (
                <p className="text-[13px] leading-relaxed text-white/35">
                  {description}
                </p>
              )}
            </div>
          </div>
        </button>
      </SuggestionPrimitive.Trigger>
    </div>
  );
};

/* ══════════════════════════════════════════
   Composer (Input Area)
══════════════════════════════════════════ */

const Composer: FC = () => {
  const isStreaming = useAuiState((s) => s.thread.isRunning);

  return (
    <ComposerPrimitive.Root className="aui-composer-root relative flex w-full flex-col">

      {/* Streaming badge */}
      {isStreaming && (
        <div
          className="absolute -top-12 left-4 flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[12px] backdrop-blur-xl"
          style={{
            background: "rgba(139,92,246,0.15)",
            border: "1px solid rgba(139,92,246,0.3)",
          }}
        >
          <span className="relative flex size-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-violet-400 opacity-75" />
            <span className="relative inline-flex size-2 rounded-full bg-violet-400" />
          </span>
          <span className="font-medium text-violet-300">Neurox is typing...</span>
        </div>
      )}

      <ComposerPrimitive.AttachmentDropzone asChild>
        <div
          data-slot="aui_composer-shell"
          className={cn(
            "flex w-full flex-col gap-2.5 rounded-(--composer-radius) p-(--composer-padding) shadow-2xl transition-all duration-300",
            "focus-within:shadow-violet-500/20",
            "data-[dragging=true]:border-dashed data-[dragging=true]:border-violet-500",
          )}
          style={{
            background: "rgba(20,20,20,0.95)",
            border: "1px solid rgba(255,255,255,0.09)",
            backdropFilter: "blur(40px)",
          }}
        >
          <ComposerAttachments />

          <div className="flex items-end gap-2">
            <ComposerPrimitive.Input
              placeholder="Message Neurox..."
              className="aui-composer-input flex-1 max-h-40 min-h-12 resize-none bg-transparent px-2 py-3 text-[14px] text-white/90 outline-none placeholder:text-white/25"
              rows={1}
              autoFocus
              aria-label="Message input"
            />

            <ComposerAction />
          </div>
        </div>
      </ComposerPrimitive.AttachmentDropzone>
    </ComposerPrimitive.Root>
  );
};

/* ══════════════════════════════════════════
   Composer Actions (Send/Cancel)
══════════════════════════════════════════ */

const ComposerAction: FC = () => {
  return (
    <div className="aui-composer-action-wrapper flex items-center gap-1.5">
      <ComposerAddAttachment />

      <AuiIf condition={(s) => !s.thread.isRunning}>
        <ComposerPrimitive.Send asChild>
          <button
            type="button"
            className={cn(
              "aui-composer-send group relative flex size-9 items-center justify-center rounded-xl transition-all duration-200 active:scale-95",
              "disabled:cursor-not-allowed disabled:opacity-40",
            )}
            style={{
              background: "linear-gradient(135deg, rgba(139,92,246,1), rgba(99,102,241,0.9))",
              boxShadow: "0 4px 16px rgba(139,92,246,0.4)",
            }}
            aria-label="Send message"
          >
            <Send className="size-4 text-white transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={2.5} fill="white" />
          </button>
        </ComposerPrimitive.Send>
      </AuiIf>

      <AuiIf condition={(s) => s.thread.isRunning}>
        <ComposerPrimitive.Cancel asChild>
          <button
            type="button"
            className="aui-composer-cancel flex size-9 items-center justify-center rounded-xl transition-all duration-200 active:scale-95"
            style={{
              background: "rgba(239,68,68,0.9)",
              boxShadow: "0 4px 16px rgba(239,68,68,0.4)",
            }}
            aria-label="Stop generating"
          >
            <SquareIcon className="size-3.5 fill-white text-white" strokeWidth={0} />
          </button>
        </ComposerPrimitive.Cancel>
      </AuiIf>
    </div>
  );
};

/* ══════════════════════════════════════════
   Message Error
══════════════════════════════════════════ */

const MessageError: FC = () => {
  return (
    <MessagePrimitive.Error>
      <ErrorPrimitive.Root
        className="aui-message-error-root mt-4 flex items-start gap-3 rounded-xl p-4 text-[13px]"
        style={{
          background: "rgba(239,68,68,0.1)",
          border: "1px solid rgba(239,68,68,0.3)",
        }}
      >
        <AlertCircleIcon className="size-4 shrink-0 text-red-400" strokeWidth={2} />
        <ErrorPrimitive.Message className="aui-message-error-message flex-1 leading-relaxed text-red-400" />
      </ErrorPrimitive.Root>
    </MessagePrimitive.Error>
  );
};

/* ══════════════════════════════════════════
   Typing Indicator
══════════════════════════════════════════ */

const TypingIndicator: FC = () => {
  return (
    <div className="fade-in slide-in-from-bottom-2 mb-3 flex animate-in items-center gap-3 duration-300">
      <div
        className="flex size-8 shrink-0 items-center justify-center rounded-full shadow-lg"
        style={{
          background: "linear-gradient(135deg, rgba(139,92,246,1), rgba(99,102,241,0.9))",
        }}
      >
        <Bot className="size-4 text-white" strokeWidth={2} />
      </div>

      <div className="flex items-center gap-1.5">
        <span className="size-2 animate-bounce rounded-full bg-violet-400 [animation-delay:-0.3s]" />
        <span className="size-2 animate-bounce rounded-full bg-violet-400 [animation-delay:-0.15s]" />
        <span className="size-2 animate-bounce rounded-full bg-violet-400" />
      </div>

      <span className="text-[13px] text-white/30">Thinking...</span>
    </div>
  );
};

/* ══════════════════════════════════════════
   Assistant Message
══════════════════════════════════════════ */

const AssistantMessage: FC = () => {
  const isStreaming = useAuiState((s) => s.message.status?.type === "running");

  return (
    <MessagePrimitive.Root
      data-slot="aui_assistant-message-root"
      data-role="assistant"
      className="fade-in slide-in-from-bottom-2 group relative animate-in duration-300"
    >
      <div className="flex items-start gap-3">
        {/* AI Avatar */}
        <div
          className="mt-1 flex size-8 shrink-0 items-center justify-center rounded-full shadow-lg"
          style={{
            background: "linear-gradient(135deg, rgba(139,92,246,1), rgba(99,102,241,0.9))",
          }}
        >
          <Bot className="size-4 text-white" strokeWidth={2} />
        </div>

        {/* Message content */}
        <div className="flex-1 min-w-0">
          {isStreaming && <TypingIndicator />}

          <div
            data-slot="aui_assistant-message-content"
            className="wrap-break-word rounded-2xl px-4 py-3 text-[14px] leading-[1.7] text-white/80"
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <MessagePrimitive.Parts>
              {({ part }) => {
                if (part.type === "text") return <MarkdownText />;
                if (part.type === "reasoning") return <Reasoning {...part} />;
                if (part.type === "tool-call")
                  return part.toolUI ?? <ToolFallback {...part} />;
                return null;
              }}
            </MessagePrimitive.Parts>
            <MessageError />
          </div>

          {/* Action bar */}
          <div className="ml-1 mt-1 flex items-center gap-1">
            <BranchPicker />
            <AssistantActionBar />
          </div>
        </div>
      </div>
    </MessagePrimitive.Root>
  );
};

/* ══════════════════════════════════════════
   Assistant Action Bar
══════════════════════════════════════════ */

const AssistantActionBar: FC = () => {
  return (
    <ActionBarPrimitive.Root
      hideWhenRunning
      autohide="not-last"
      className="aui-assistant-action-bar-root flex gap-0.5 opacity-0 transition-opacity group-hover:opacity-100"
    >
      <ActionBarPrimitive.Copy asChild>
        <TooltipIconButton
          tooltip="Copy"
          className="size-7 rounded-lg text-white/30 transition-all hover:bg-white/[0.06] hover:text-violet-400"
        >
          <AuiIf condition={(s) => s.message.isCopied}>
            <CheckIcon className="size-3.5 text-emerald-400" strokeWidth={2.5} />
          </AuiIf>
          <AuiIf condition={(s) => !s.message.isCopied}>
            <CopyIcon className="size-3.5" strokeWidth={2} />
          </AuiIf>
        </TooltipIconButton>
      </ActionBarPrimitive.Copy>

      <ActionBarPrimitive.Reload asChild>
        <TooltipIconButton
          tooltip="Regenerate"
          className="size-7 rounded-lg text-white/30 transition-all hover:bg-white/[0.06] hover:text-violet-400"
        >
          <RefreshCwIcon className="size-3.5" strokeWidth={2} />
        </TooltipIconButton>
      </ActionBarPrimitive.Reload>

      <ActionBarMorePrimitive.Root>
        <ActionBarMorePrimitive.Trigger asChild>
          <TooltipIconButton
            tooltip="More"
            className="size-7 rounded-lg text-white/30 transition-all hover:bg-white/[0.06] hover:text-violet-400 data-[state=open]:bg-white/[0.06] data-[state=open]:text-violet-400"
          >
            <MoreHorizontalIcon className="size-3.5" strokeWidth={2} />
          </TooltipIconButton>
        </ActionBarMorePrimitive.Trigger>

        <ActionBarMorePrimitive.Content
          side="bottom"
          align="start"
          className={cn(
            "aui-action-bar-more-content z-50 min-w-48 overflow-hidden rounded-xl p-1.5 shadow-2xl",
            "animate-in fade-in-0 zoom-in-95 slide-in-from-top-2 duration-200",
          )}
          style={{
            background: "rgba(20,20,20,0.98)",
            border: "1px solid rgba(255,255,255,0.09)",
            backdropFilter: "blur(40px)",
          }}
        >
          <ActionBarPrimitive.ExportMarkdown asChild>
            <button className="aui-action-bar-more-item group/item flex w-full cursor-pointer select-none items-center gap-3 rounded-lg px-3 py-2.5 text-[13px] outline-none transition-colors hover:bg-white/[0.05]">
              <div className="flex size-6 items-center justify-center rounded-md bg-violet-500/15">
                <DownloadIcon className="size-3 text-violet-400" strokeWidth={2} />
              </div>
              <span className="flex-1 font-medium text-white/70">Export Markdown</span>
            </button>
          </ActionBarPrimitive.ExportMarkdown>
        </ActionBarMorePrimitive.Content>
      </ActionBarMorePrimitive.Root>
    </ActionBarPrimitive.Root>
  );
};

/* ══════════════════════════════════════════
   User Message
══════════════════════════════════════════ */

const UserMessage: FC = () => {
  return (
    <MessagePrimitive.Root
      data-slot="aui_user-message-root"
      className="fade-in slide-in-from-bottom-2 group flex animate-in justify-end gap-3 duration-300"
      data-role="user"
    >
      <div className="flex max-w-[80%] flex-col items-end gap-2">
        <UserMessageAttachments />

        <div className="relative">
          <div
            className="aui-user-message-content wrap-break-word peer rounded-2xl px-4 py-3 text-[14px] leading-[1.7] text-white/90 shadow-lg empty:hidden"
            style={{
              background: "linear-gradient(135deg, rgba(139,92,246,0.15), rgba(99,102,241,0.1))",
              border: "1px solid rgba(139,92,246,0.25)",
            }}
          >
            <MessagePrimitive.Parts />
          </div>

          <div className="absolute top-1/2 right-full -translate-y-1/2 pr-2 opacity-0 transition-opacity peer-hover:opacity-100 group-hover:opacity-100">
            <UserActionBar />
          </div>
        </div>

        <BranchPicker className="-mr-1" />
      </div>

      {/* User avatar */}
      <div
        className="mt-1 flex size-8 shrink-0 items-center justify-center rounded-full shadow-md"
        style={{
          background: "rgba(255,255,255,0.08)",
          border: "1px solid rgba(255,255,255,0.12)",
        }}
      >
        <User className="size-4 text-white/60" strokeWidth={2} />
      </div>
    </MessagePrimitive.Root>
  );
};

/* ══════════════════════════════════════════
   User Action Bar
══════════════════════════════════════════ */

const UserActionBar: FC = () => {
  return (
    <ActionBarPrimitive.Root
      hideWhenRunning
      autohide="not-last"
      className="aui-user-action-bar-root flex"
    >
      <ActionBarPrimitive.Edit asChild>
        <TooltipIconButton
          tooltip="Edit"
          className="size-7 rounded-lg text-white/30 transition-all hover:bg-white/[0.06] hover:text-violet-400"
        >
          <PencilIcon className="size-3.5" strokeWidth={2} />
        </TooltipIconButton>
      </ActionBarPrimitive.Edit>
    </ActionBarPrimitive.Root>
  );
};

/* ══════════════════════════════════════════
   Edit Composer
══════════════════════════════════════════ */

const EditComposer: FC = () => {
  return (
    <MessagePrimitive.Root
      data-slot="aui_edit-composer-wrapper"
      className="flex justify-end"
    >
      <ComposerPrimitive.Root
        className="aui-edit-composer-root flex w-full max-w-[80%] flex-col rounded-2xl shadow-xl"
        style={{
          background: "linear-gradient(135deg, rgba(139,92,246,0.15), rgba(99,102,241,0.1))",
          border: "1px solid rgba(139,92,246,0.3)",
        }}
      >
        <ComposerPrimitive.Input
          className="aui-edit-composer-input min-h-20 w-full resize-none bg-transparent p-4 text-[14px] text-white/90 outline-none"
          autoFocus
        />
        <div className="aui-edit-composer-footer flex items-center justify-end gap-2 p-3">
          <ComposerPrimitive.Cancel asChild>
            <Button
              variant="ghost"
              size="sm"
              className="text-white/50 transition-colors hover:bg-white/[0.06] hover:text-white/80"
            >
              Cancel
            </Button>
          </ComposerPrimitive.Cancel>
          <ComposerPrimitive.Send asChild>
            <Button
              size="sm"
              className="shadow-lg shadow-violet-500/25"
              style={{
                background: "linear-gradient(135deg, rgba(139,92,246,1), rgba(99,102,241,0.9))",
              }}
            >
              Update
            </Button>
          </ComposerPrimitive.Send>
        </div>
      </ComposerPrimitive.Root>
    </MessagePrimitive.Root>
  );
};

/* ══════════════════════════════════════════
   Branch Picker
══════════════════════════════════════════ */

const BranchPicker: FC<BranchPickerPrimitive.Root.Props> = ({
  className,
  ...rest
}) => {
  return (
    <BranchPickerPrimitive.Root
      hideWhenSingleBranch
      className={cn(
        "aui-branch-picker-root inline-flex items-center gap-1 rounded-lg px-2 py-1 text-[11px] backdrop-blur-sm",
        className,
      )}
      style={{
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.06)",
      }}
      {...rest}
    >
      <BranchPickerPrimitive.Previous asChild>
        <button className="flex size-5 items-center justify-center rounded text-white/30 transition-all hover:bg-white/[0.06] hover:text-violet-400">
          <ChevronLeftIcon className="size-3" strokeWidth={2.5} />
        </button>
      </BranchPickerPrimitive.Previous>

      <span className="aui-branch-picker-state font-mono font-medium tabular-nums text-white/40">
        <BranchPickerPrimitive.Number /> / <BranchPickerPrimitive.Count />
      </span>

      <BranchPickerPrimitive.Next asChild>
        <button className="flex size-5 items-center justify-center rounded text-white/30 transition-all hover:bg-white/[0.06] hover:text-violet-400">
          <ChevronRightIcon className="size-3" strokeWidth={2.5} />
        </button>
      </BranchPickerPrimitive.Next>
    </BranchPickerPrimitive.Root>
  );
};