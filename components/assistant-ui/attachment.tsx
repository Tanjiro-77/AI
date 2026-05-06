"use client";

import {
  type PropsWithChildren,
  useEffect,
  useState,
  useRef,
  type FC,
} from "react";
import {
  XIcon,
  PlusIcon,
  FileText,
  ImageIcon,
  FileIcon,
  Paperclip,
  Eye,
  Download,
  ZoomIn,
  ZoomOut,
  RotateCw,
  Maximize2,
  X,
  File,
  FileCode,
  FileSpreadsheet,
  FileArchive,
  Music,
  Video,
} from "lucide-react";
import {
  AttachmentPrimitive,
  ComposerPrimitive,
  MessagePrimitive,
  useAuiState,
  useAui,
} from "@assistant-ui/react";
import { useShallow } from "zustand/shallow";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { TooltipIconButton } from "@/components/assistant-ui/tooltip-icon-button";
import { cn } from "@/lib/utils";

/* ══════════════════════════════════════════
   Hooks
══════════════════════════════════════════ */

const useFileSrc = (file: File | undefined) => {
  const [src, setSrc] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (!file) {
      setSrc(undefined);
      return;
    }
    const objectUrl = URL.createObjectURL(file);
    setSrc(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [file]);

  return src;
};

const useAttachmentSrc = () => {
  const { file, src } = useAuiState(
    useShallow((s): { file?: File; src?: string } => {
      if (s.attachment.type !== "image") return {};
      if (s.attachment.file) return { file: s.attachment.file };
      const src = s.attachment.content?.filter((c) => c.type === "image")[0]
        ?.image;
      if (!src) return {};
      return { src };
    }),
  );
  return useFileSrc(file) ?? src;
};

/* ══════════════════════════════════════════
   File Type Utilities
══════════════════════════════════════════ */

type FileKind =
  | "image"
  | "document"
  | "code"
  | "spreadsheet"
  | "archive"
  | "audio"
  | "video"
  | "file";

const getFileKind = (name: string): FileKind => {
  const ext = name.split(".").pop()?.toLowerCase() ?? "";
  if (["jpg", "jpeg", "png", "gif", "webp", "svg", "avif"].includes(ext))
    return "image";
  if (["pdf", "doc", "docx", "txt", "md", "rtf"].includes(ext))
    return "document";
  if (
    ["js", "ts", "tsx", "jsx", "py", "rs", "go", "java", "cpp", "c", "css", "html"].includes(ext)
  )
    return "code";
  if (["xls", "xlsx", "csv"].includes(ext)) return "spreadsheet";
  if (["zip", "tar", "gz", "rar", "7z"].includes(ext)) return "archive";
  if (["mp3", "wav", "ogg", "flac", "aac"].includes(ext)) return "audio";
  if (["mp4", "mov", "avi", "mkv", "webm"].includes(ext)) return "video";
  return "file";
};

const fileKindConfig: Record<
  FileKind,
  { icon: FC<{ className?: string }>; gradient: string; glow: string; label: string; bg: string }
> = {
  image: {
    icon: ImageIcon,
    gradient: "from-violet-500 to-purple-600",
    glow: "shadow-violet-500/30",
    label: "Image",
    bg: "bg-violet-500/10",
  },
  document: {
    icon: FileText,
    gradient: "from-sky-400 to-blue-500",
    glow: "shadow-sky-500/30",
    label: "Document",
    bg: "bg-sky-500/10",
  },
  code: {
    icon: FileCode,
    gradient: "from-emerald-400 to-teal-500",
    glow: "shadow-emerald-500/30",
    label: "Code",
    bg: "bg-emerald-500/10",
  },
  spreadsheet: {
    icon: FileSpreadsheet,
    gradient: "from-green-400 to-emerald-500",
    glow: "shadow-green-500/30",
    label: "Spreadsheet",
    bg: "bg-green-500/10",
  },
  archive: {
    icon: FileArchive,
    gradient: "from-amber-400 to-orange-500",
    glow: "shadow-amber-500/30",
    label: "Archive",
    bg: "bg-amber-500/10",
  },
  audio: {
    icon: Music,
    gradient: "from-pink-400 to-rose-500",
    glow: "shadow-pink-500/30",
    label: "Audio",
    bg: "bg-pink-500/10",
  },
  video: {
    icon: Video,
    gradient: "from-red-400 to-orange-500",
    glow: "shadow-red-500/30",
    label: "Video",
    bg: "bg-red-500/10",
  },
  file: {
    icon: FileIcon,
    gradient: "from-slate-400 to-slate-500",
    glow: "shadow-slate-500/20",
    label: "File",
    bg: "bg-slate-500/10",
  },
};

/* ══════════════════════════════════════════
   macOS Dot Button
══════════════════════════════════════════ */

const MacDot: FC<{ color: string; hoverChar: string; onClick?: () => void }> =
  ({ color, hoverChar, onClick }) => {
    const [hovered, setHovered] = useState(false);
    return (
      <button
        onClick={onClick}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="relative size-3 rounded-full transition-all hover:brightness-110 active:brightness-90"
        style={{ backgroundColor: color }}
      >
        <span
          className="absolute inset-0 flex items-center justify-center text-[7px] font-bold transition-opacity duration-150"
          style={{ opacity: hovered ? 1 : 0, color: "rgba(0,0,0,0.5)" }}
        >
          {hoverChar}
        </span>
      </button>
    );
  };

/* ══════════════════════════════════════════
   Image Preview — with zoom + rotate
══════════════════════════════════════════ */

const AttachmentPreview: FC<{ src: string; name?: string }> = ({
  src,
  name,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const imgRef = useRef<HTMLImageElement>(null);

  const handleZoomIn = () => setZoom((z) => Math.min(z + 0.25, 4));
  const handleZoomOut = () => setZoom((z) => Math.max(z - 0.25, 0.25));
  const handleRotate = () => setRotation((r) => (r + 90) % 360);
  const handleReset = () => {
    setZoom(1);
    setRotation(0);
    setOffset({ x: 0, y: 0 });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoom <= 1) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX - offset.x, y: e.clientY - offset.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setOffset({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    });
  };

  const handleMouseUp = () => setIsDragging(false);

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.1 : 0.1;
    setZoom((z) => Math.max(0.25, Math.min(4, z + delta)));
  };

  return (
    <div className="flex flex-col overflow-hidden rounded-2xl">
      {/* macOS title bar */}
      <div
        className="flex items-center gap-3 px-4 py-3"
        style={{
          background: "rgba(255,255,255,0.04)",
          borderBottom: "1px solid rgba(255,255,255,0.07)",
        }}
      >
        <div className="flex items-center gap-1.5">
          <MacDot color="#FF5F57" hoverChar="✕" />
          <MacDot color="#FEBC2E" hoverChar="−" />
          <MacDot color="#28C840" hoverChar="+" />
        </div>
        <span className="flex-1 text-center text-[12px] text-white/35 truncate">
          {name ?? "Image Preview"} — Neurox
        </span>
        <div className="flex items-center gap-1 rounded-lg border border-white/[0.07] bg-white/[0.05] px-2.5 py-1 text-[11px] text-white/30">
          {Math.round(zoom * 100)}%
        </div>
      </div>

      {/* Toolbar */}
      <div
        className="flex items-center justify-center gap-1 px-4 py-2"
        style={{
          background: "rgba(255,255,255,0.02)",
          borderBottom: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        {[
          { icon: ZoomOut, label: "Zoom out", action: handleZoomOut, disabled: zoom <= 0.25 },
          { icon: ZoomIn, label: "Zoom in", action: handleZoomIn, disabled: zoom >= 4 },
          { icon: RotateCw, label: "Rotate", action: handleRotate, disabled: false },
          { icon: Maximize2, label: "Reset", action: handleReset, disabled: false },
        ].map(({ icon: Icon, label, action, disabled }) => (
          <button
            key={label}
            onClick={action}
            disabled={disabled}
            title={label}
            className={cn(
              "flex size-8 items-center justify-center rounded-lg transition-all",
              disabled
                ? "cursor-not-allowed text-white/20"
                : "text-white/50 hover:bg-white/[0.07] hover:text-white/80 active:scale-95",
            )}
          >
            <Icon className="size-3.5" />
          </button>
        ))}

        <div className="mx-1 h-4 w-px bg-white/10" />

        <a
          href={src}
          download={name}
          title="Download"
          className="flex size-8 items-center justify-center rounded-lg text-white/50 transition-all hover:bg-white/[0.07] hover:text-white/80 active:scale-95"
        >
          <Download className="size-3.5" />
        </a>
      </div>

      {/* Canvas */}
      <div
        className="relative flex min-h-[400px] max-h-[65vh] items-center justify-center overflow-hidden"
        style={{ background: "rgba(0,0,0,0.4)", cursor: isDragging ? "grabbing" : zoom > 1 ? "grab" : "default" }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onWheel={handleWheel}
      >
        {/* Checkerboard bg for transparent images */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(45deg,#fff 25%,transparent 25%),linear-gradient(-45deg,#fff 25%,transparent 25%),linear-gradient(45deg,transparent 75%,#fff 75%),linear-gradient(-45deg,transparent 75%,#fff 75%)",
            backgroundSize: "20px 20px",
            backgroundPosition: "0 0,0 10px,10px -10px,-10px 0px",
          }}
        />

        {!isLoaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative">
              <div className="size-10 animate-spin rounded-full border-2 border-violet-500/20 border-t-violet-500" />
              <div className="absolute inset-0 size-10 animate-ping rounded-full border border-violet-500/10" />
            </div>
          </div>
        )}

        <img
          ref={imgRef}
          src={src}
          alt="Attachment preview"
          className={cn(
            "block max-h-full max-w-full select-none object-contain transition-opacity duration-300",
            isLoaded ? "opacity-100" : "opacity-0",
          )}
          style={{
            transform: `scale(${zoom}) rotate(${rotation}deg) translate(${offset.x / zoom}px, ${offset.y / zoom}px)`,
            transition: isDragging ? "none" : "transform 0.2s cubic-bezier(0.34,1.56,0.64,1)",
            transformOrigin: "center",
          }}
          onLoad={() => setIsLoaded(true)}
          draggable={false}
        />
      </div>

      {/* Status bar */}
      <div
        className="flex items-center justify-between px-4 py-2"
        style={{
          background: "rgba(255,255,255,0.02)",
          borderTop: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        <span className="text-[11px] text-white/20">
          Scroll to zoom · Drag to pan
        </span>
        {name && (
          <span className="max-w-[200px] truncate text-[11px] text-white/20">
            {name}
          </span>
        )}
      </div>
    </div>
  );
};

/* ══════════════════════════════════════════
   Attachment Preview Dialog
══════════════════════════════════════════ */

const AttachmentPreviewDialog: FC<PropsWithChildren> = ({ children }) => {
  const src = useAttachmentSrc();
  const name = useAuiState((s) =>
    "name" in s.attachment ? (s.attachment.name as string) : undefined,
  );

  if (!src) return <>{children}</>;

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent
        className="max-w-4xl border-0 bg-transparent p-0 shadow-none [&>button]:hidden"
        style={{ backdropFilter: "blur(40px)" }}
      >
        <DialogTitle className="sr-only">Image Preview — Neurox</DialogTitle>

        {/* Outer macOS window frame */}
        <div
          className="overflow-hidden rounded-2xl shadow-2xl"
          style={{
            background: "rgba(14,14,14,0.97)",
            border: "1px solid rgba(255,255,255,0.09)",
            boxShadow: "0 40px 120px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.05)",
          }}
        >
          <AttachmentPreview src={src} name={name} />
        </div>
      </DialogContent>
    </Dialog>
  );
};

/* ══════════════════════════════════════════
   File Type Icon — rich non-image fallback
══════════════════════════════════════════ */

const FileTypeDisplay: FC<{ name: string; compact?: boolean }> = ({
  name,
  compact = false,
}) => {
  const kind = getFileKind(name);
  const config = fileKindConfig[kind];
  const Icon = config.icon;
  const ext = name.split(".").pop()?.toUpperCase() ?? "FILE";

  if (compact) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center gap-1">
        <div
          className={cn(
            "flex size-8 items-center justify-center rounded-xl bg-gradient-to-br shadow-lg",
            config.gradient,
            config.glow,
          )}
        >
          <Icon className="size-4 text-white" />
        </div>
        <span className="text-[8px] font-bold tracking-wider text-white/40">
          {ext.slice(0, 4)}
        </span>
      </div>
    );
  }

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-2 p-2">
      <div
        className={cn(
          "flex size-10 items-center justify-center rounded-xl bg-gradient-to-br shadow-lg",
          config.gradient,
          config.glow,
        )}
      >
        <Icon className="size-5 text-white" />
      </div>
      <div className="text-center">
        <p className="text-[10px] font-semibold text-white/60">{config.label}</p>
        <p className="text-[9px] text-white/30">.{ext.toLowerCase()}</p>
      </div>
    </div>
  );
};

/* ══════════════════════════════════════════
   Attachment Thumbnail
══════════════════════════════════════════ */

const AttachmentThumb: FC<{ isLarge?: boolean }> = ({ isLarge }) => {
  const src = useAttachmentSrc();
  const type = useAuiState((s) => s.attachment.type);
  const name = useAuiState((s) =>
    "name" in s.attachment ? (s.attachment.name as string) : "file",
  );

  if (src) {
    return (
      <Avatar className="size-full rounded-none">
        <AvatarImage src={src} alt="Attachment" className="object-cover" />
        <AvatarFallback className="rounded-none bg-[#1a1a1a]">
          <FileTypeDisplay name={name ?? "file"} compact={!isLarge} />
        </AvatarFallback>
      </Avatar>
    );
  }

  return <FileTypeDisplay name={name ?? "file"} compact={!isLarge} />;
};

/* ══════════════════════════════════════════
   Attachment Remove Button
══════════════════════════════════════════ */

const AttachmentRemove: FC = () => {
  const [hovered, setHovered] = useState(false);

  return (
    <AttachmentPrimitive.Remove asChild>
      <button
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className={cn(
          "absolute -right-1.5 -top-1.5 z-20 flex size-5 items-center justify-center rounded-full transition-all duration-200",
          hovered
            ? "scale-110 bg-red-500 shadow-lg shadow-red-500/40"
            : "bg-[#2a2a2a] shadow-md shadow-black/60",
        )}
        style={{
          border: "1.5px solid rgba(255,255,255,0.1)",
        }}
        aria-label="Remove attachment"
      >
        <XIcon
          className={cn(
            "size-2.5 transition-colors duration-200",
            hovered ? "text-white" : "text-white/50",
          )}
          strokeWidth={2.5}
        />
      </button>
    </AttachmentPrimitive.Remove>
  );
};

/* ══════════════════════════════════════════
   Spotlight hover effect hook
══════════════════════════════════════════ */

const useSpotlight = () => {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return { ref, pos, hovered, setHovered, handleMouseMove };
};

/* ══════════════════════════════════════════
   Main Attachment UI
══════════════════════════════════════════ */

const AttachmentUI: FC = () => {
  const aui = useAui();
  const isComposer = aui.attachment.source !== "message";
  const isImage = useAuiState((s) => s.attachment.type === "image");
  const name = useAuiState((s) =>
    "name" in s.attachment ? (s.attachment.name as string) : "Attachment",
  );
  const isLarge = isImage && isComposer;
  const { ref, pos, hovered, setHovered, handleMouseMove } = useSpotlight();

  return (
    <Tooltip>
      <AttachmentPrimitive.Root
        className={cn(
          "relative transition-all duration-300",
          isLarge ? "size-24" : "size-16",
        )}
      >
        <AttachmentPreviewDialog>
          <TooltipTrigger asChild>
            <div
              ref={ref}
              onMouseMove={handleMouseMove}
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
              className={cn(
                "group relative cursor-pointer overflow-hidden transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.04]",
                isLarge ? "size-24" : "size-16",
              )}
              style={{
                borderRadius: "14px",
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                boxShadow: hovered
                  ? "0 8px 24px rgba(0,0,0,0.5), 0 0 0 1px rgba(139,92,246,0.2)"
                  : "0 2px 8px rgba(0,0,0,0.4)",
              }}
              role="button"
              tabIndex={0}
              aria-label={`${name} — click to preview`}
            >
              {/* Spotlight glow */}
              {hovered && (
                <div
                  className="pointer-events-none absolute inset-0 z-10 transition-opacity duration-200"
                  style={{
                    background: `radial-gradient(80px circle at ${pos.x}px ${pos.y}px, rgba(139,92,246,0.12), transparent 70%)`,
                  }}
                />
              )}

              {/* Thumbnail */}
              <AttachmentThumb isLarge={isLarge} />

              {/* Hover overlay with eye icon */}
              <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-1 bg-black/50 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                <Eye className="size-4 text-white" />
                <span className="text-[9px] font-medium text-white/70">
                  Preview
                </span>
              </div>

              {/* Inner shine */}
              <div className="pointer-events-none absolute inset-0 rounded-[14px] bg-gradient-to-t from-black/30 via-transparent to-white/[0.04]" />
            </div>
          </TooltipTrigger>
        </AttachmentPreviewDialog>

        {/* Remove button */}
        {isComposer && <AttachmentRemove />}

        {/* Image — live corner badge */}
        {isImage && (
          <div
            className="pointer-events-none absolute bottom-1 left-1 z-20 flex items-center gap-0.5 rounded-md px-1.5 py-0.5"
            style={{
              background: "rgba(0,0,0,0.65)",
              border: "1px solid rgba(255,255,255,0.08)",
              backdropFilter: "blur(8px)",
            }}
          >
            <ImageIcon className="size-2 text-violet-400" />
            <span className="text-[8px] font-medium text-white/50">IMG</span>
          </div>
        )}
      </AttachmentPrimitive.Root>

      {/* Tooltip */}
      <TooltipContent
        side="top"
        className="max-w-[220px] overflow-hidden rounded-xl border-0 p-0 shadow-2xl"
        style={{
          background: "rgba(20,20,20,0.97)",
          border: "1px solid rgba(255,255,255,0.09)",
          backdropFilter: "blur(20px)",
        }}
      >
        <div className="flex items-center gap-2.5 px-3 py-2">
          {/* Mini icon */}
          <div
            className={cn(
              "flex size-7 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br",
              fileKindConfig[getFileKind(name ?? "file")].gradient,
            )}
          >
            {(() => {
              const Icon = fileKindConfig[getFileKind(name ?? "file")].icon;
              return <Icon className="size-3.5 text-white" />;
            })()}
          </div>
          <div className="min-w-0">
            <p className="max-w-[160px] truncate text-[12px] font-medium text-white/80">
              <AttachmentPrimitive.Name />
            </p>
            <p className="text-[10px] text-white/30">
              {fileKindConfig[getFileKind(name ?? "file")].label}
            </p>
          </div>
        </div>
      </TooltipContent>
    </Tooltip>
  );
};

/* ══════════════════════════════════════════
   User Message Attachments
══════════════════════════════════════════ */

export const UserMessageAttachments: FC = () => {
  return (
    <div className="col-span-full col-start-1 row-start-1 flex w-full flex-row justify-end gap-2 pb-2">
      <MessagePrimitive.Attachments>
        {() => <AttachmentUI />}
      </MessagePrimitive.Attachments>
    </div>
  );
};

/* ══════════════════════════════════════════
   Composer Attachments
══════════════════════════════════════════ */

export const ComposerAttachments: FC = () => {
  return (
    <div
      className="flex w-full flex-row items-end gap-2.5 overflow-x-auto pb-2 empty:hidden"
      style={{
        /* Custom scrollbar */
        scrollbarWidth: "thin",
        scrollbarColor: "rgba(139,92,246,0.3) transparent",
      }}
    >
      <ComposerPrimitive.Attachments>
        {() => <AttachmentUI />}
      </ComposerPrimitive.Attachments>
    </div>
  );
};

/* ══════════════════════════════════════════
   Add Attachment Button
══════════════════════════════════════════ */

export const ComposerAddAttachment: FC = () => {
  const [hovered, setHovered] = useState(false);

  return (
    <ComposerPrimitive.AddAttachment asChild>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className={cn(
              "group relative flex size-9 items-center justify-center rounded-xl transition-all duration-300 active:scale-95",
              hovered
                ? "bg-violet-500/15 shadow-lg shadow-violet-500/20"
                : "bg-white/[0.05]",
            )}
            style={{
              border: hovered
                ? "1px solid rgba(139,92,246,0.35)"
                : "1px solid rgba(255,255,255,0.08)",
            }}
            aria-label="Attach file"
          >
            {/* Spotlight */}
            <Paperclip
              className={cn(
                "size-4 transition-all duration-300",
                hovered
                  ? "-rotate-12 text-violet-400"
                  : "text-white/40",
              )}
              strokeWidth={2}
            />

            {/* Animated plus badge */}
            <span
              className={cn(
                "absolute -right-1 -top-1 flex size-4 items-center justify-center rounded-full transition-all duration-300",
                hovered
                  ? "scale-100 opacity-100 bg-violet-500 shadow-sm shadow-violet-500/50"
                  : "scale-75 opacity-0 bg-violet-500",
              )}
            >
              <PlusIcon className="size-2.5 text-white" strokeWidth={3} />
            </span>
          </button>
        </TooltipTrigger>

        <TooltipContent
          side="top"
          className="rounded-xl border-0 px-3 py-1.5 text-[12px] shadow-xl"
          style={{
            background: "rgba(20,20,20,0.97)",
            border: "1px solid rgba(255,255,255,0.09)",
            backdropFilter: "blur(20px)",
            color: "rgba(255,255,255,0.75)",
          }}
        >
          Attach file
          <span className="ml-2 rounded-md bg-white/[0.08] px-1.5 py-0.5 text-[10px] text-white/30">
            ⌘ U
          </span>
        </TooltipContent>
      </Tooltip>
    </ComposerPrimitive.AddAttachment>
  );
};