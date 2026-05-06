"use client";

import { memo, useCallback, useRef, useState } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { BrainIcon, ChevronDownIcon, SparklesIcon } from "lucide-react";
import {
  useScrollLock,
  useAuiState,
  type ReasoningMessagePartComponent,
  type ReasoningGroupComponent,
} from "@assistant-ui/react";
import { MarkdownText } from "@/components/assistant-ui/markdown-text";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";

const ANIMATION_DURATION = 300;

// ══════════════════════════════════════════
//  Variants
// ══════════════════════════════════════════

const reasoningVariants = cva(
  "aui-reasoning-root group/reasoning-root mb-4 w-full transition-all duration-300",
  {
    variants: {
      variant: {
        outline:
          "rounded-xl border border-border/50 bg-background/40 p-3 backdrop-blur-sm hover:border-violet-500/30 hover:bg-background/60",
        ghost: "p-2",
        muted:
          "rounded-xl border border-border/40 bg-gradient-to-br from-violet-500/5 to-indigo-500/5 p-3 backdrop-blur-sm hover:from-violet-500/8 hover:to-indigo-500/8",
      },
    },
    defaultVariants: {
      variant: "muted",
    },
  },
);

// ══════════════════════════════════════════
//  Types
// ══════════════════════════════════════════

export type ReasoningRootProps = Omit<
  React.ComponentProps<typeof Collapsible>,
  "open" | "onOpenChange"
> &
  VariantProps<typeof reasoningVariants> & {
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    defaultOpen?: boolean;
  };

// ══════════════════════════════════════════
//  Root Component
// ══════════════════════════════════════════

function ReasoningRoot({
  className,
  variant,
  open: controlledOpen,
  onOpenChange: controlledOnOpenChange,
  defaultOpen = false,
  children,
  ...props
}: ReasoningRootProps) {
  const collapsibleRef = useRef<HTMLDivElement>(null);
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
  const lockScroll = useScrollLock(collapsibleRef, ANIMATION_DURATION);

  const isControlled = controlledOpen !== undefined;
  const isOpen = isControlled ? controlledOpen : uncontrolledOpen;

  const handleOpenChange = useCallback(
    (open: boolean) => {
      if (!open) {
        lockScroll();
      }
      if (!isControlled) {
        setUncontrolledOpen(open);
      }
      controlledOnOpenChange?.(open);
    },
    [lockScroll, isControlled, controlledOnOpenChange],
  );

  return (
    <Collapsible
      ref={collapsibleRef}
      data-slot="reasoning-root"
      data-variant={variant}
      open={isOpen}
      onOpenChange={handleOpenChange}
      className={cn(reasoningVariants({ variant, className }))}
      style={
        {
          "--animation-duration": `${ANIMATION_DURATION}ms`,
        } as React.CSSProperties
      }
      {...props}
    >
      {children}
    </Collapsible>
  );
}

// ══════════════════════════════════════════
//  Fade Overlay
// ══════════════════════════════════════════

function ReasoningFade({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="reasoning-fade"
      className={cn(
        "aui-reasoning-fade pointer-events-none absolute inset-x-0 bottom-0 z-10 h-12",
        "bg-[linear-gradient(to_top,var(--color-background),transparent)]",
        "group-data-[variant=muted]/reasoning-root:bg-[linear-gradient(to_top,hsl(var(--background)),transparent)]",
        "group-data-[variant=outline]/reasoning-root:bg-[linear-gradient(to_top,hsl(var(--background)/0.4),transparent)]",
        "animate-in fade-in-0 duration-300",
        "group-data-[state=open]/collapsible-content:animate-out",
        "group-data-[state=open]/collapsible-content:fade-out-0",
        "group-data-[state=open]/collapsible-content:delay-200",
        "group-data-[state=open]/collapsible-content:fill-mode-forwards",
        className,
      )}
      {...props}
    />
  );
}

// ══════════════════════════════════════════
//  Trigger Button
// ══════════════════════════════════════════

function ReasoningTrigger({
  active,
  duration,
  className,
  ...props
}: React.ComponentProps<typeof CollapsibleTrigger> & {
  active?: boolean;
  duration?: number;
}) {
  const durationText = duration ? ` • ${duration}s` : "";

  return (
    <CollapsibleTrigger
      data-slot="reasoning-trigger"
      className={cn(
        "aui-reasoning-trigger group/trigger flex w-full items-center gap-2.5 rounded-lg py-2 px-1 text-sm transition-all duration-200 hover:bg-muted/50",
        className,
      )}
      {...props}
    >
      {/* Icon */}
      <div className="relative flex size-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500/20 to-indigo-500/20 ring-1 ring-violet-500/30 transition-all duration-200 group-hover/trigger:scale-105 group-hover/trigger:ring-violet-500/50">
        <BrainIcon
          data-slot="reasoning-trigger-icon"
          className="aui-reasoning-trigger-icon size-4 text-violet-400"
          strokeWidth={2}
        />
        {active && (
          <SparklesIcon className="absolute -right-0.5 -top-0.5 size-3 animate-pulse text-emerald-400" />
        )}
      </div>

      {/* Label */}
      <span
        data-slot="reasoning-trigger-label"
        className="aui-reasoning-trigger-label-wrapper relative inline-block flex-1 text-left leading-none"
      >
        <span className="font-medium text-foreground">
          Thinking process
          <span className="text-muted-foreground">{durationText}</span>
        </span>

        {/* Shimmer effect when active */}
        {active && (
          <span
            aria-hidden
            data-slot="reasoning-trigger-shimmer"
            className="shimmer pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-violet-400/20 to-transparent motion-reduce:animate-none"
          />
        )}
      </span>

      {/* Chevron */}
      <ChevronDownIcon
        data-slot="reasoning-trigger-chevron"
        className={cn(
          "aui-reasoning-trigger-chevron size-4 shrink-0 text-muted-foreground transition-transform duration-300 ease-out",
          "group-data-[state=closed]/trigger:-rotate-90",
          "group-data-[state=open]/trigger:rotate-0",
        )}
        strokeWidth={2}
      />
    </CollapsibleTrigger>
  );
}

// ══════════════════════════════════════════
//  Content Container
// ══════════════════════════════════════════

function ReasoningContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof CollapsibleContent>) {
  return (
    <CollapsibleContent
      data-slot="reasoning-content"
      className={cn(
        "aui-reasoning-content group/collapsible-content relative overflow-hidden text-sm outline-none",
        "ease-out",
        "data-[state=closed]:animate-collapsible-up",
        "data-[state=open]:animate-collapsible-down",
        "data-[state=closed]:fill-mode-forwards",
        "data-[state=closed]:pointer-events-none",
        "data-[state=open]:duration-300",
        "data-[state=closed]:duration-300",
        className,
      )}
      {...props}
    >
      {children}
      <ReasoningFade />
    </CollapsibleContent>
  );
}

// ══════════════════════════════════════════
//  Text Content
// ══════════════════════════════════════════

function ReasoningText({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="reasoning-text"
      className={cn(
        "aui-reasoning-text relative z-0 max-h-80 space-y-3 overflow-y-auto rounded-lg px-2 pt-2 pb-3 leading-relaxed text-muted-foreground",
        // Scrollbar styling
        "scrollbar-thin scrollbar-track-transparent scrollbar-thumb-violet-500/20 hover:scrollbar-thumb-violet-500/40",
        // Animations
        "transform-gpu transition-[transform,opacity]",
        "group-data-[state=open]/collapsible-content:animate-in",
        "group-data-[state=closed]/collapsible-content:animate-out",
        "group-data-[state=open]/collapsible-content:fade-in-0",
        "group-data-[state=closed]/collapsible-content:fade-out-0",
        "group-data-[state=open]/collapsible-content:slide-in-from-top-2",
        "group-data-[state=closed]/collapsible-content:slide-out-to-top-2",
        "group-data-[state=open]/collapsible-content:duration-300",
        "group-data-[state=closed]/collapsible-content:duration-200",
        className,
      )}
      {...props}
    />
  );
}

// ══════════════════════════════════════════
//  Main Reasoning Component
// ══════════════════════════════════════════

const ReasoningImpl: ReasoningMessagePartComponent = () => <MarkdownText />;

const ReasoningGroupImpl: ReasoningGroupComponent = ({
  children,
  startIndex,
  endIndex,
}) => {
  const isReasoningStreaming = useAuiState((s) => {
    if (s.message.status?.type !== "running") return false;
    const lastIndex = s.message.parts.length - 1;
    if (lastIndex < 0) return false;
    const lastType = s.message.parts[lastIndex]?.type;
    if (lastType !== "reasoning") return false;
    return lastIndex >= startIndex && lastIndex <= endIndex;
  });

  return (
    <ReasoningRoot defaultOpen={isReasoningStreaming}>
      <ReasoningTrigger active={isReasoningStreaming} />
      <ReasoningContent aria-busy={isReasoningStreaming}>
        <ReasoningText>{children}</ReasoningText>
      </ReasoningContent>
    </ReasoningRoot>
  );
};

// ══════════════════════════════════════════
//  Exports
// ══════════════════════════════════════════

const Reasoning = memo(
  ReasoningImpl,
) as unknown as ReasoningMessagePartComponent & {
  Root: typeof ReasoningRoot;
  Trigger: typeof ReasoningTrigger;
  Content: typeof ReasoningContent;
  Text: typeof ReasoningText;
  Fade: typeof ReasoningFade;
};

Reasoning.displayName = "Reasoning";
Reasoning.Root = ReasoningRoot;
Reasoning.Trigger = ReasoningTrigger;
Reasoning.Content = ReasoningContent;
Reasoning.Text = ReasoningText;
Reasoning.Fade = ReasoningFade;

const ReasoningGroup = memo(ReasoningGroupImpl);
ReasoningGroup.displayName = "ReasoningGroup";

export {
  Reasoning,
  ReasoningGroup,
  ReasoningRoot,
  ReasoningTrigger,
  ReasoningContent,
  ReasoningText,
  ReasoningFade,
  reasoningVariants,
};