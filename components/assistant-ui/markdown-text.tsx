"use client";

import "@assistant-ui/react-markdown/styles/dot.css";

import {
  type CodeHeaderProps,
  MarkdownTextPrimitive,
  unstable_memoizeMarkdownComponents as memoizeMarkdownComponents,
  useIsMarkdownCodeBlock,
} from "@assistant-ui/react-markdown";
import remarkGfm from "remark-gfm";
import { type FC, memo, useState, useRef, useEffect } from "react";
import {
  CheckIcon,
  CopyIcon,
  CodeIcon,
  TerminalIcon,
  ChevronDown,
  ChevronUp,
  Maximize2,
  Minimize2,
  WrapText,
  Download,
  Hash,
  Link2,
  Quote,
  List,
  Table,
  ExternalLink,
} from "lucide-react";

import { TooltipIconButton } from "@/components/assistant-ui/tooltip-icon-button";
import { cn } from "@/lib/utils";

/* ══════════════════════════════════════════
   Copy Hook
══════════════════════════════════════════ */

const useCopyToClipboard = ({ copiedDuration = 2000 } = {}) => {
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = (value: string) => {
    if (!value) return;
    navigator.clipboard.writeText(value).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), copiedDuration);
    });
  };

  return { isCopied, copyToClipboard };
};

/* ══════════════════════════════════════════
   Language Config — icon + color per lang
══════════════════════════════════════════ */

type LangConfig = {
  label: string;
  color: string;
  dot: string;
  gradient: string;
};

const LANG_MAP: Record<string, LangConfig> = {
  javascript: {
    label: "JavaScript",
    color: "text-yellow-400",
    dot: "bg-yellow-400",
    gradient: "from-yellow-500/15 to-amber-500/10",
  },
  js: {
    label: "JavaScript",
    color: "text-yellow-400",
    dot: "bg-yellow-400",
    gradient: "from-yellow-500/15 to-amber-500/10",
  },
  typescript: {
    label: "TypeScript",
    color: "text-sky-400",
    dot: "bg-sky-400",
    gradient: "from-sky-500/15 to-blue-500/10",
  },
  ts: {
    label: "TypeScript",
    color: "text-sky-400",
    dot: "bg-sky-400",
    gradient: "from-sky-500/15 to-blue-500/10",
  },
  tsx: {
    label: "TSX",
    color: "text-sky-400",
    dot: "bg-sky-400",
    gradient: "from-sky-500/15 to-blue-500/10",
  },
  jsx: {
    label: "JSX",
    color: "text-yellow-400",
    dot: "bg-yellow-400",
    gradient: "from-yellow-500/15 to-amber-500/10",
  },
  python: {
    label: "Python",
    color: "text-blue-400",
    dot: "bg-blue-400",
    gradient: "from-blue-500/15 to-indigo-500/10",
  },
  py: {
    label: "Python",
    color: "text-blue-400",
    dot: "bg-blue-400",
    gradient: "from-blue-500/15 to-indigo-500/10",
  },
  rust: {
    label: "Rust",
    color: "text-orange-400",
    dot: "bg-orange-400",
    gradient: "from-orange-500/15 to-red-500/10",
  },
  rs: {
    label: "Rust",
    color: "text-orange-400",
    dot: "bg-orange-400",
    gradient: "from-orange-500/15 to-red-500/10",
  },
  go: {
    label: "Go",
    color: "text-cyan-400",
    dot: "bg-cyan-400",
    gradient: "from-cyan-500/15 to-teal-500/10",
  },
  java: {
    label: "Java",
    color: "text-red-400",
    dot: "bg-red-400",
    gradient: "from-red-500/15 to-orange-500/10",
  },
  cpp: {
    label: "C++",
    color: "text-violet-400",
    dot: "bg-violet-400",
    gradient: "from-violet-500/15 to-purple-500/10",
  },
  c: {
    label: "C",
    color: "text-violet-400",
    dot: "bg-violet-400",
    gradient: "from-violet-500/15 to-purple-500/10",
  },
  css: {
    label: "CSS",
    color: "text-pink-400",
    dot: "bg-pink-400",
    gradient: "from-pink-500/15 to-rose-500/10",
  },
  html: {
    label: "HTML",
    color: "text-orange-400",
    dot: "bg-orange-400",
    gradient: "from-orange-500/15 to-red-500/10",
  },
  sql: {
    label: "SQL",
    color: "text-emerald-400",
    dot: "bg-emerald-400",
    gradient: "from-emerald-500/15 to-teal-500/10",
  },
  bash: {
    label: "Bash",
    color: "text-green-400",
    dot: "bg-green-400",
    gradient: "from-green-500/15 to-emerald-500/10",
  },
  sh: {
    label: "Shell",
    color: "text-green-400",
    dot: "bg-green-400",
    gradient: "from-green-500/15 to-emerald-500/10",
  },
  zsh: {
    label: "Zsh",
    color: "text-green-400",
    dot: "bg-green-400",
    gradient: "from-green-500/15 to-emerald-500/10",
  },
  json: {
    label: "JSON",
    color: "text-amber-400",
    dot: "bg-amber-400",
    gradient: "from-amber-500/15 to-yellow-500/10",
  },
  yaml: {
    label: "YAML",
    color: "text-rose-400",
    dot: "bg-rose-400",
    gradient: "from-rose-500/15 to-pink-500/10",
  },
  yml: {
    label: "YAML",
    color: "text-rose-400",
    dot: "bg-rose-400",
    gradient: "from-rose-500/15 to-pink-500/10",
  },
  markdown: {
    label: "Markdown",
    color: "text-slate-400",
    dot: "bg-slate-400",
    gradient: "from-slate-500/15 to-gray-500/10",
  },
  md: {
    label: "Markdown",
    color: "text-slate-400",
    dot: "bg-slate-400",
    gradient: "from-slate-500/15 to-gray-500/10",
  },
  plaintext: {
    label: "Plain Text",
    color: "text-white/40",
    dot: "bg-white/30",
    gradient: "from-white/5 to-transparent",
  },
};

const getLangConfig = (lang?: string): LangConfig =>
  LANG_MAP[lang?.toLowerCase() ?? ""] ?? {
    label: lang ?? "Plain Text",
    color: "text-white/40",
    dot: "bg-white/30",
    gradient: "from-white/5 to-transparent",
  };

/* ══════════════════════════════════════════
   macOS Traffic Dot
══════════════════════════════════════════ */

const MacDot: FC<{ color: string; char: string }> = ({ color, char }) => {
  const [h, setH] = useState(false);
  return (
    <span
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      className="relative size-3 rounded-full transition-all hover:brightness-110"
      style={{ backgroundColor: color, display: "inline-flex", alignItems: "center", justifyContent: "center" }}
    >
      <span
        className="absolute text-[7px] font-bold transition-opacity duration-100"
        style={{ opacity: h ? 1 : 0, color: "rgba(0,0,0,0.5)" }}
      >
        {char}
      </span>
    </span>
  );
};

/* ══════════════════════════════════════════
   Code Block Header
══════════════════════════════════════════ */

const CodeHeader: FC<CodeHeaderProps> = ({ language, code }) => {
  const { isCopied, copyToClipboard } = useCopyToClipboard();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isWrapped, setIsWrapped] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const langKey = language?.toLowerCase() ?? "plaintext";
  const cfg = getLangConfig(langKey);
  const isTerminal = !language || ["bash", "sh", "zsh", "shell"].includes(langKey);
  const lineCount = code?.split("\n").length ?? 0;

  const handleDownload = () => {
    if (!code) return;
    const ext = language ?? "txt";
    const blob = new Blob([code], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `snippet.${ext}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div
      className="mt-4 overflow-hidden rounded-t-2xl"
      style={{
        border: "1px solid rgba(255,255,255,0.08)",
        borderBottom: "none",
      }}
      data-collapsed={isCollapsed}
      data-wrapped={isWrapped}
      data-expanded={isExpanded}
    >
      {/* Title bar */}
      <div
        className={cn(
          "flex items-center gap-3 px-4 py-2.5",
          `bg-gradient-to-r ${cfg.gradient}`,
        )}
        style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
      >
        {/* macOS dots */}
        <div className="flex items-center gap-1.5">
          <MacDot color="#FF5F57" char="✕" />
          <MacDot color="#FEBC2E" char="−" />
          <MacDot color="#28C840" char="+" />
        </div>

        {/* Divider */}
        <div className="h-4 w-px bg-white/10" />

        {/* Language badge */}
        <div className="flex items-center gap-2">
          {isTerminal ? (
            <TerminalIcon className="size-3.5 text-white/40" strokeWidth={2} />
          ) : (
            <CodeIcon className={cn("size-3.5", cfg.color)} strokeWidth={2} />
          )}
          <span className={cn("font-mono text-[12px] font-semibold tracking-wide", cfg.color)}>
            {cfg.label}
          </span>
          <span
            className="rounded-full px-1.5 py-0.5 text-[10px] text-white/30"
            style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.07)" }}
          >
            {lineCount} {lineCount === 1 ? "line" : "lines"}
          </span>
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Action buttons */}
        <div className="flex items-center gap-0.5">
          {/* Wrap toggle */}
          <ActionBtn
            tooltip={isWrapped ? "Disable wrap" : "Wrap lines"}
            active={isWrapped}
            onClick={() => setIsWrapped((w) => !w)}
          >
            <WrapText className="size-3.5" />
          </ActionBtn>

          {/* Collapse */}
          <ActionBtn
            tooltip={isCollapsed ? "Expand" : "Collapse"}
            onClick={() => setIsCollapsed((c) => !c)}
          >
            {isCollapsed ? (
              <ChevronDown className="size-3.5" />
            ) : (
              <ChevronUp className="size-3.5" />
            )}
          </ActionBtn>

          {/* Full screen */}
          <ActionBtn
            tooltip={isExpanded ? "Exit fullscreen" : "Fullscreen"}
            active={isExpanded}
            onClick={() => setIsExpanded((e) => !e)}
          >
            {isExpanded ? (
              <Minimize2 className="size-3.5" />
            ) : (
              <Maximize2 className="size-3.5" />
            )}
          </ActionBtn>

          {/* Download */}
          <ActionBtn tooltip="Download" onClick={handleDownload}>
            <Download className="size-3.5" />
          </ActionBtn>

          {/* Divider */}
          <div className="mx-1 h-4 w-px bg-white/10" />

          {/* Copy */}
          <button
            onClick={() => code && copyToClipboard(code)}
            disabled={isCopied}
            className={cn(
              "flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-[12px] font-medium transition-all duration-200 active:scale-95",
              isCopied
                ? "bg-emerald-500/15 text-emerald-400"
                : "text-white/50 hover:bg-white/[0.07] hover:text-white/80",
            )}
            style={{ border: "1px solid rgba(255,255,255,0.07)" }}
          >
            {isCopied ? (
              <>
                <CheckIcon className="size-3 text-emerald-400" strokeWidth={2.5} />
                Copied!
              </>
            ) : (
              <>
                <CopyIcon className="size-3" strokeWidth={2} />
                Copy
              </>
            )}
          </button>
        </div>
      </div>

      {/* Language dot strip */}
      <div
        className="h-0.5 w-full"
        style={{
          background: `linear-gradient(90deg, ${langKey === "javascript" || langKey === "js"
            ? "rgba(251,191,36,0.5)"
            : langKey === "typescript" || langKey === "ts" || langKey === "tsx"
              ? "rgba(56,189,248,0.5)"
              : langKey === "python" || langKey === "py"
                ? "rgba(96,165,250,0.5)"
                : langKey === "rust" || langKey === "rs"
                  ? "rgba(251,146,60,0.5)"
                  : langKey === "go"
                    ? "rgba(34,211,238,0.5)"
                    : "rgba(139,92,246,0.4)"
            } 0%, transparent 100%)`,
        }}
      />
    </div>
  );
};

/* ── Action button inside code header ── */
const ActionBtn: FC<{
  tooltip: string;
  onClick: () => void;
  active?: boolean;
  children: React.ReactNode;
}> = ({ tooltip, onClick, active, children }) => (
  <TooltipIconButton
    tooltip={tooltip}
    onClick={onClick}
    className={cn(
      "size-7 rounded-lg transition-all duration-200 active:scale-95",
      active
        ? "bg-violet-500/15 text-violet-400"
        : "text-white/35 hover:bg-white/[0.07] hover:text-white/70",
    )}
  >
    {children}
  </TooltipIconButton>
);

/* ══════════════════════════════════════════
   Heading anchor helper
══════════════════════════════════════════ */

const HeadingAnchor: FC<{ id: string }> = ({ id }) => {
  const [copied, setCopied] = useState(false);

  const copy = () => {
    const url = `${window.location.href.split("#")[0]}#${id}`;
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <button
      onClick={copy}
      className="ml-2 inline-flex items-center opacity-0 transition-all duration-200 group-hover:opacity-100"
      title="Copy link"
    >
      {copied ? (
        <CheckIcon className="size-3.5 text-emerald-400" />
      ) : (
        <Link2 className="size-3.5 text-white/30 hover:text-violet-400 transition-colors" />
      )}
    </button>
  );
};

const makeId = (children: React.ReactNode): string =>
  String(children).toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]/g, "");

/* ══════════════════════════════════════════
   Main Markdown Component
══════════════════════════════════════════ */

const MarkdownTextImpl = () => (
  <MarkdownTextPrimitive
    remarkPlugins={[remarkGfm]}
    className="aui-md"
    components={defaultComponents}
  />
);

export const MarkdownText = memo(MarkdownTextImpl);

/* ══════════════════════════════════════════
   Component Overrides
══════════════════════════════════════════ */

const defaultComponents = memoizeMarkdownComponents({

  /* ── Headings ── */
  h1: ({ className, children, ...props }) => {
    const id = makeId(children);
    return (
      <h1
        id={id}
        className={cn(
          "group aui-md-h1 mb-4 mt-8 flex items-center scroll-m-20 text-2xl font-bold tracking-tight text-white/90 first:mt-0 last:mb-0",
          className,
        )}
        {...props}
      >
        <span className="mr-2 text-violet-500/50">#</span>
        {children}
        <HeadingAnchor id={id} />
      </h1>
    );
  },

  h2: ({ className, children, ...props }) => {
    const id = makeId(children);
    return (
      <h2
        id={id}
        className={cn(
          "group aui-md-h2 mb-3 mt-7 flex items-center scroll-m-20 text-xl font-bold tracking-tight text-white/85 first:mt-0 last:mb-0",
          className,
        )}
        {...props}
      >
        <div
          className="mr-3 h-5 w-0.5 shrink-0 rounded-full bg-gradient-to-b from-violet-400 to-indigo-400"
        />
        {children}
        <HeadingAnchor id={id} />
      </h2>
    );
  },

  h3: ({ className, children, ...props }) => {
    const id = makeId(children);
    return (
      <h3
        id={id}
        className={cn(
          "group aui-md-h3 mb-2 mt-5 flex items-center scroll-m-20 text-lg font-semibold tracking-tight text-white/80 first:mt-0 last:mb-0",
          className,
        )}
        {...props}
      >
        <span className="mr-1.5 text-violet-400/60">›</span>
        {children}
        <HeadingAnchor id={id} />
      </h3>
    );
  },

  h4: ({ className, children, ...props }) => {
    const id = makeId(children);
    return (
      <h4
        id={id}
        className={cn(
          "group aui-md-h4 mb-2 mt-4 flex items-center scroll-m-20 text-base font-semibold text-white/75 first:mt-0 last:mb-0",
          className,
        )}
        {...props}
      >
        {children}
        <HeadingAnchor id={id} />
      </h4>
    );
  },

  h5: ({ className, ...props }) => (
    <h5
      className={cn(
        "aui-md-h5 mb-1.5 mt-3 text-sm font-semibold text-white/70 first:mt-0 last:mb-0",
        className,
      )}
      {...props}
    />
  ),

  h6: ({ className, ...props }) => (
    <h6
      className={cn(
        "aui-md-h6 mb-1.5 mt-3 text-sm font-medium text-white/40 first:mt-0 last:mb-0",
        className,
      )}
      {...props}
    />
  ),

  /* ── Paragraph ── */
  p: ({ className, ...props }) => (
    <p
      className={cn(
        "aui-md-p my-3 text-[15px] leading-[1.75] text-white/75 first:mt-0 last:mb-0",
        className,
      )}
      {...props}
    />
  ),

  /* ── Links ── */
  a: ({ className, href, children, ...props }) => (
    <a
      href={href}
      target={href?.startsWith("http") ? "_blank" : undefined}
      rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
      className={cn(
        "aui-md-a inline-flex items-center gap-0.5 font-medium text-violet-400 underline decoration-violet-400/30 underline-offset-3 transition-all duration-200 hover:text-violet-300 hover:decoration-violet-300/60",
        className,
      )}
      {...props}
    >
      {children}
      {href?.startsWith("http") && (
        <ExternalLink className="mb-0.5 ml-0.5 size-3 opacity-50" />
      )}
    </a>
  ),

  /* ── Blockquote ── */
  blockquote: ({ className, ...props }) => (
    <blockquote
      className={cn(
        "aui-md-blockquote group relative my-5 overflow-hidden rounded-xl py-4 pr-5 pl-5 text-[14px] leading-relaxed text-white/55 italic",
        className,
      )}
      style={{
        background: "rgba(139,92,246,0.06)",
        border: "1px solid rgba(139,92,246,0.18)",
        borderLeft: "3px solid rgba(139,92,246,0.6)",
      }}
      {...props}
    >
      {/* Quote icon */}
      <Quote
        className="absolute right-3 top-3 size-6 text-violet-500/10 transition-all duration-300 group-hover:text-violet-500/20"
        strokeWidth={1.5}
      />
      {props.children}
    </blockquote>
  ),

  /* ── Lists ── */
  ul: ({ className, ...props }) => (
    <ul
      className={cn(
        "aui-md-ul my-3 space-y-1.5 pl-0 text-[15px] text-white/70",
        className,
      )}
      {...props}
    />
  ),

  ol: ({ className, ...props }) => (
    <ol
      className={cn(
        "aui-md-ol my-3 space-y-1.5 pl-0 text-[15px] text-white/70",
        className,
      )}
      {...props}
    />
  ),

  li: ({ className, children, ...props }) => (
    <li
      className={cn(
        "aui-md-li flex items-start gap-2.5 leading-relaxed",
        className,
      )}
      {...props}
    >
      <span
        className="mt-[6px] size-1.5 shrink-0 rounded-full bg-gradient-to-br from-violet-400 to-indigo-400"
        aria-hidden
      />
      <span className="flex-1">{children}</span>
    </li>
  ),

  /* ── HR ── */
  hr: ({ className, ...props }) => (
    <div className="my-8 flex items-center gap-3">
      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <span className="size-1 rounded-full bg-violet-500/40" />
      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </div>
  ),

  /* ── Tables ── */
  table: ({ className, ...props }) => (
    <div
      className="my-5 overflow-hidden rounded-xl"
      style={{ border: "1px solid rgba(255,255,255,0.07)" }}
    >
      <div className="overflow-x-auto">
        <table
          className={cn("aui-md-table w-full border-separate border-spacing-0 text-[14px]", className)}
          {...props}
        />
      </div>
    </div>
  ),

  th: ({ className, ...props }) => (
    <th
      className={cn(
        "aui-md-th px-4 py-3 text-left text-[12px] font-semibold uppercase tracking-wider text-white/40 [[align=center]]:text-center [[align=right]]:text-right",
        className,
      )}
      style={{
        background: "rgba(255,255,255,0.04)",
        borderBottom: "1px solid rgba(255,255,255,0.07)",
      }}
      {...props}
    />
  ),

  td: ({ className, ...props }) => (
    <td
      className={cn(
        "aui-md-td px-4 py-3 text-left text-white/65 [[align=center]]:text-center [[align=right]]:text-right",
        className,
      )}
      style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}
      {...props}
    />
  ),

  tr: ({ className, ...props }) => (
    <tr
      className={cn(
        "aui-md-tr transition-colors duration-150 hover:bg-white/[0.025] [&:last-child>td]:border-b-0",
        className,
      )}
      {...props}
    />
  ),

  /* ── Code block <pre> ── */
  pre: ({ className, children, ...props }) => (
    <pre
      className={cn(
        "aui-md-pre overflow-x-auto rounded-b-2xl p-5 font-mono text-[13px] leading-[1.7] text-white/80",
        className,
      )}
      style={{
        background: "rgba(10,10,10,0.8)",
        border: "1px solid rgba(255,255,255,0.07)",
        borderTop: "none",
        backdropFilter: "blur(20px)",
      }}
      {...props}
    >
      {children}
    </pre>
  ),

  /* ── Inline code ── */
  code: function Code({ className, ...props }) {
    const isCodeBlock = useIsMarkdownCodeBlock();
    return (
      <code
        className={cn(
          !isCodeBlock &&
          "aui-md-inline-code rounded-lg px-1.5 py-0.5 font-mono text-[0.88em] font-medium text-violet-300",
          className,
        )}
        style={
          !isCodeBlock
            ? {
              background: "rgba(139,92,246,0.12)",
              border: "1px solid rgba(139,92,246,0.22)",
            }
            : undefined
        }
        {...props}
      />
    );
  },

  /* ── Strong ── */
  strong: ({ className, ...props }) => (
    <strong
      className={cn("font-semibold text-white/90", className)}
      {...props}
    />
  ),

  /* ── Em ── */
  em: ({ className, ...props }) => (
    <em
      className={cn("italic text-white/65", className)}
      {...props}
    />
  ),

  /* ── Strikethrough ── */
  del: ({ className, ...props }) => (
    <del
      className={cn("text-white/30 line-through decoration-white/30", className)}
      {...props}
    />
  ),

  /* ── Superscript ── */
  sup: ({ className, ...props }) => (
    <sup
      className={cn(
        "aui-md-sup [&>a]:font-semibold [&>a]:text-[11px] [&>a]:text-violet-400 [&>a]:no-underline [&>a]:transition-colors [&>a:hover]:text-violet-300",
        className,
      )}
      {...props}
    />
  ),

  CodeHeader,
});