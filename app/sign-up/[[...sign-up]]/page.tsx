"use client";

import { SignUp } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import {
  Sparkles,
  Brain,
  Zap,
  Shield,
  Check,
  Star,
  ArrowLeft,
  Lock,
  Globe,
  Cpu,
} from "lucide-react";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";

/* ─────────────────────────── data ── */

const perks = [
  {
    icon: Brain,
    title: "Intelligent Conversations",
    description: "AI that truly understands context, tone, and nuance.",
    gradient: "from-violet-500 to-purple-600",
    glow: "shadow-violet-500/20",
    tag: "AI Core",
  },
  {
    icon: Zap,
    title: "Instant Responses",
    description: "Sub-second answers powered by edge inference.",
    gradient: "from-amber-400 to-orange-500",
    glow: "shadow-amber-500/20",
    tag: "Speed",
  },
  {
    icon: Shield,
    title: "Private by Default",
    description: "Zero-knowledge architecture. Your data stays yours.",
    gradient: "from-emerald-400 to-teal-500",
    glow: "shadow-emerald-500/20",
    tag: "Security",
  },
];

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Engineer @ Stripe",
    avatar: "SC",
    color: "from-violet-400 to-purple-500",
    text: "Best AI tool I've used. Period.",
    stars: 5,
  },
  {
    name: "Marcus R.",
    role: "Designer @ Figma",
    avatar: "MR",
    color: "from-pink-400 to-rose-500",
    text: "Neurox 3x'd my workflow speed.",
    stars: 5,
  },
  {
    name: "Aisha J.",
    role: "Lead @ DeepMind",
    avatar: "AJ",
    color: "from-emerald-400 to-teal-500",
    text: "Genuinely impressive accuracy.",
    stars: 5,
  },
];

const floatingBadges = [
  { icon: Lock, label: "SOC 2 Certified", color: "text-emerald-400" },
  { icon: Globe, label: "180+ Countries", color: "text-sky-400" },
  { icon: Cpu, label: "GPT-4 Powered", color: "text-violet-400" },
];

/* ─────────────────────────── page ── */

export default function SignUpPage() {
  const [mounted, setMounted] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const leftRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);

    const handleMouse = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouse);

    const interval = setInterval(() => {
      setActiveTestimonial((p) => (p + 1) % testimonials.length);
    }, 3000);

    return () => {
      window.removeEventListener("mousemove", handleMouse);
      clearInterval(interval);
    };
  }, []);

  return (
    <main className="relative flex min-h-dvh overflow-hidden bg-[#080808] text-white selection:bg-violet-500/30">

      {/* ── Cursor glow ── */}
      {mounted && (
        <div
          className="pointer-events-none fixed z-0 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-700 ease-out"
          style={{
            left: mousePos.x,
            top: mousePos.y,
            background:
              "radial-gradient(circle, rgba(139,92,246,0.07) 0%, transparent 70%)",
          }}
        />
      )}

      {/* ── Ambient blobs ── */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute -top-1/4 left-0 h-[700px] w-[700px] -translate-x-1/2 rounded-full bg-violet-600/[0.08] blur-[140px]" />
        <div className="absolute -bottom-1/4 right-0 h-[500px] w-[500px] translate-x-1/3 rounded-full bg-indigo-600/[0.06] blur-[120px]" />
        <div className="absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-600/[0.04] blur-[100px]" />

        {/* Grid */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* ════════════════════════════════════════
          LEFT PANEL — branding + perks
      ════════════════════════════════════════ */}
      <div
        ref={leftRef}
        className="relative z-10 hidden flex-col justify-between overflow-hidden lg:flex lg:w-[55%] lg:p-12 xl:p-16"
        style={{
          borderRight: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        {/* macOS traffic lights */}
        <div className="mb-6 flex items-center gap-1.5">
          <MacDot color="#FF5F57" hoverChar="✕" />
          <MacDot color="#FEBC2E" hoverChar="−" />
          <MacDot color="#28C840" hoverChar="+" />
          <div className="ml-4 flex items-center gap-1.5 rounded-lg border border-white/[0.07] bg-white/[0.04] px-3 py-1">
            <span className="size-1.5 rounded-full bg-emerald-400" />
            <span className="text-[11px] text-white/30">neurox.ai</span>
          </div>
        </div>

        {/* Back link */}
        <Link
          href="/"
          className="mb-auto flex w-fit items-center gap-1.5 text-[13px] text-white/30 transition-colors hover:text-white/60"
        >
          <ArrowLeft className="size-3.5" />
          Back to home
        </Link>

        {/* Main content */}
        <div className="flex flex-col gap-10 py-8">

          {/* Logo */}
          <Link href="/" className="group flex w-fit items-center gap-2.5">
            <div className="relative flex size-10 items-center justify-center rounded-[12px] bg-gradient-to-br from-violet-500 to-indigo-600 shadow-xl shadow-violet-500/40 transition-all group-hover:scale-105 group-hover:shadow-violet-500/60">
              <Sparkles className="size-4.5 text-white" />
              <div className="absolute inset-0 rounded-[12px] bg-gradient-to-t from-black/20 to-white/10" />
              <span className="absolute -right-0.5 -top-0.5 size-2.5 rounded-full border-2 border-[#080808] bg-emerald-400" />
            </div>
            <span className="text-xl font-bold tracking-tight text-white/90">
              Neurox
            </span>
          </Link>

          {/* Headline */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 w-fit rounded-full border border-white/[0.08] bg-white/[0.05] px-3.5 py-1.5 text-[12px] backdrop-blur-xl">
              <span className="relative flex size-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex size-1.5 rounded-full bg-emerald-400" />
              </span>
              <span className="text-white/50">Neurox v3 — Now available</span>
            </div>

            <h1 className="text-4xl font-bold leading-[1.1] tracking-[-0.03em] xl:text-5xl">
              <span className="text-white/90">Start your journey</span>
              <br />
              <span className="text-white/90">with{" "}</span>
              <span className="bg-gradient-to-r from-violet-300 via-purple-300 to-indigo-300 bg-clip-text text-transparent">
                Neurox AI
              </span>
            </h1>

            <p className="max-w-sm text-[15px] leading-relaxed text-white/40">
              Join thousands experiencing smarter, faster, and more intuitive
              AI — completely free to start. No credit card required.
            </p>
          </div>

          {/* Perks */}
          <div className="flex flex-col gap-3">
            {perks.map(({ icon: Icon, title, description, gradient, glow, tag }) => (
              <PerkCard
                key={title}
                Icon={Icon}
                title={title}
                description={description}
                gradient={gradient}
                glow={glow}
                tag={tag}
              />
            ))}
          </div>

          {/* Floating badges */}
          <div className="flex flex-wrap gap-2">
            {floatingBadges.map(({ icon: Icon, label, color }) => (
              <div
                key={label}
                className="flex items-center gap-1.5 rounded-full border border-white/[0.07] bg-white/[0.04] px-3 py-1.5 text-[12px] backdrop-blur-sm"
              >
                <Icon className={`size-3 ${color}`} />
                <span className="text-white/40">{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonial carousel */}
        <div className="space-y-4">
          <div
            className="rounded-2xl p-5 transition-all duration-500"
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.07)",
            }}
          >
            <div className="mb-3 flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="size-3.5 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <p
              key={activeTestimonial}
              className="mb-4 text-[14px] leading-relaxed text-white/55"
              style={{ animation: "fadeIn 0.5s ease forwards" }}
            >
              &ldquo;{testimonials[activeTestimonial].text}&rdquo;
            </p>
            <div className="flex items-center gap-3">
              <div
                className={`flex size-8 items-center justify-center rounded-full bg-gradient-to-br ${testimonials[activeTestimonial].color} text-[11px] font-bold text-white shadow-md`}
              >
                {testimonials[activeTestimonial].avatar}
              </div>
              <div>
                <p className="text-[13px] font-semibold text-white/80">
                  {testimonials[activeTestimonial].name}
                </p>
                <p className="text-[11px] text-white/30">
                  {testimonials[activeTestimonial].role}
                </p>
              </div>
            </div>
          </div>

          {/* Dots */}
          <div className="flex items-center gap-1.5">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveTestimonial(i)}
                className="h-1 rounded-full transition-all duration-300"
                style={{
                  width: i === activeTestimonial ? "24px" : "6px",
                  background:
                    i === activeTestimonial
                      ? "rgba(167,139,250,0.8)"
                      : "rgba(255,255,255,0.15)",
                }}
              />
            ))}
          </div>
        </div>

        {/* Footer */}
        <p className="mt-6 text-[11px] text-white/20">
          © {new Date().getFullYear()} Neurox Inc. · All rights reserved
        </p>
      </div>

      {/* ════════════════════════════════════════
          RIGHT PANEL — Clerk widget
      ════════════════════════════════════════ */}
      <div className="relative z-10 flex w-full flex-col items-center justify-center px-5 py-12 lg:w-[45%]">

        {/* macOS traffic lights — mobile only */}
        <div className="mb-6 flex w-full items-center gap-1.5 lg:hidden">
          <MacDot color="#FF5F57" hoverChar="✕" />
          <MacDot color="#FEBC2E" hoverChar="−" />
          <MacDot color="#28C840" hoverChar="+" />
        </div>

        {/* Mobile logo */}
        <Link
          href="/"
          className="group mb-8 flex items-center gap-2.5 lg:hidden"
        >
          <div className="relative flex size-9 items-center justify-center rounded-[10px] bg-gradient-to-br from-violet-500 to-indigo-600 shadow-lg shadow-violet-500/40 transition-all group-hover:scale-105">
            <Sparkles className="size-4 text-white" />
            <div className="absolute inset-0 rounded-[10px] bg-gradient-to-t from-black/20 to-white/10" />
            <span className="absolute -right-0.5 -top-0.5 size-2.5 rounded-full border-2 border-[#080808] bg-emerald-400" />
          </div>
          <span className="text-lg font-bold tracking-tight">Neurox</span>
        </Link>

        {/* Card wrapper — macOS window look */}
        <div className="w-full max-w-[400px]">

          {/* Window title bar */}
          <div
            className="flex items-center gap-3 rounded-t-2xl border-x border-t px-4 py-3"
            style={{
              background: "rgba(255,255,255,0.04)",
              borderColor: "rgba(255,255,255,0.08)",
            }}
          >
            {/* Traffic lights on desktop inside card */}
            <div className="hidden items-center gap-1.5 lg:flex">
              <MacDot color="#FF5F57" hoverChar="✕" size="sm" />
              <MacDot color="#FEBC2E" hoverChar="−" size="sm" />
              <MacDot color="#28C840" hoverChar="+" size="sm" />
            </div>
            <div className="flex flex-1 items-center justify-center gap-1.5">
              <Sparkles className="size-3 text-violet-400" />
              <span className="text-[12px] text-white/35">
                Create Account — Neurox
              </span>
            </div>
          </div>

          {/* Card body */}
          <div
            className="rounded-b-2xl border-x border-b p-6"
            style={{
              background: "rgba(14,14,14,0.95)",
              borderColor: "rgba(255,255,255,0.08)",
              backdropFilter: "blur(40px)",
            }}
          >
            {/* Heading inside card */}
            <div className="mb-5 text-center">
              <h2 className="text-xl font-bold tracking-tight text-white/90">
                Create your account
              </h2>
              <p className="mt-1 text-[13px] text-white/35">
                Already have an account?{" "}
                <Link
                  href="/sign-in"
                  className="text-violet-400 transition-colors hover:text-violet-300"
                >
                  Sign in
                </Link>
              </p>
            </div>

            {/* Clerk widget */}
            <SignUp
              path="/sign-up"
              routing="path"
              signInUrl="/sign-in"
              appearance={{
                baseTheme: dark,
                variables: {
                  colorPrimary: "#7c3aed",
                  colorBackground: "transparent",
                  colorInputBackground: "rgba(255,255,255,0.05)",
                  colorInputText: "#f4f4f5",
                  colorText: "#f4f4f5",
                  colorTextSecondary: "#a1a1aa",
                  borderRadius: "0.875rem",
                  fontFamily: "inherit",
                  fontSize: "14px",
                },
                elements: {
                  /* Card shell — transparent, we provide our own */
                  card: "shadow-none bg-transparent p-0",
                  cardBox: "shadow-none",
                  headerTitle: "hidden",
                  headerSubtitle: "hidden",

                  /* Social buttons */
                  socialButtonsBlockButton:
                    "border border-white/[0.09] bg-white/[0.05] hover:bg-white/[0.09] transition-all rounded-xl h-10 text-white/70 hover:text-white",
                  socialButtonsBlockButtonText:
                    "text-[13px] font-medium",
                  socialButtonsBlockButtonArrow: "hidden",

                  /* Divider */
                  dividerLine: "bg-white/[0.07]",
                  dividerText: "text-white/25 text-[12px]",

                  /* Form */
                  formFieldLabel: "text-[12px] font-medium text-white/40 mb-1",
                  formFieldInput:
                    "rounded-xl border border-white/[0.09] bg-white/[0.05] text-white/90 placeholder:text-white/20 text-[14px] h-10 focus:ring-2 focus:ring-violet-500/40 focus:border-violet-500/50 transition-all",
                  formFieldInputShowPasswordButton: "text-white/30 hover:text-white/60",

                  /* Submit */
                  formButtonPrimary:
                    "h-10 rounded-xl bg-white text-[14px] font-semibold text-black transition-all hover:bg-white/90 shadow-lg shadow-white/10 hover:shadow-white/20 active:scale-95",

                  /* Footer */
                  footer: "hidden",
                  footerActionLink: "text-violet-400 hover:text-violet-300",

                  /* Identity preview */
                  identityPreviewText: "text-white/60",
                  identityPreviewEditButton: "text-violet-400",

                  /* Alert */
                  alert: "rounded-xl border border-red-500/20 bg-red-500/10 text-red-400",
                  alertText: "text-[13px]",
                },
              }}
            />

            {/* Trust strip inside card */}
            <div
              className="mt-5 flex items-center justify-center gap-4 rounded-xl p-3"
              style={{
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.05)",
              }}
            >
              {[
                { icon: Shield, label: "SSL encrypted", color: "text-emerald-400" },
                { icon: Zap, label: "Free forever", color: "text-violet-400" },
                { icon: Lock, label: "No spam", color: "text-sky-400" },
              ].map(({ icon: Icon, label, color }) => (
                <div
                  key={label}
                  className="flex items-center gap-1 text-[11px] text-white/30"
                >
                  <Icon className={`size-3 ${color}`} />
                  {label}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Perks checklist — mobile only */}
        <div className="mt-8 w-full max-w-[400px] space-y-2 lg:hidden">
          {perks.map(({ title }) => (
            <div key={title} className="flex items-center gap-2 text-[13px] text-white/40">
              <Check className="size-4 shrink-0 text-emerald-400" />
              {title}
            </div>
          ))}
        </div>
      </div>

      {/* ── Animations ── */}
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0);   }
        }
      `}</style>
    </main>
  );
}

/* ─────────────────────── sub-components ── */

function MacDot({
  color,
  hoverChar,
  size = "md",
}: {
  color: string;
  hoverChar: string;
  size?: "sm" | "md";
}) {
  const [hovered, setHovered] = useState(false);
  const dim = size === "sm" ? "size-2.5" : "size-3";
  const text = size === "sm" ? "text-[6px]" : "text-[7px]";

  return (
    <button
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`relative ${dim} rounded-full transition-all hover:brightness-110`}
      style={{ backgroundColor: color }}
    >
      <span
        className={`absolute inset-0 flex items-center justify-center ${text} font-bold transition-opacity duration-150`}
        style={{
          opacity: hovered ? 1 : 0,
          color: "rgba(0,0,0,0.5)",
        }}
      >
        {hoverChar}
      </span>
    </button>
  );
}

function PerkCard({
  Icon,
  title,
  description,
  gradient,
  glow,
  tag,
}: {
  Icon: React.ElementType;
  title: string;
  description: string;
  gradient: string;
  glow: string;
  tag: string;
}) {
  const [hovered, setHovered] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative overflow-hidden rounded-xl p-4 transition-all duration-300"
      style={{
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.07)",
      }}
    >
      {/* Spotlight */}
      {hovered && (
        <div
          className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300"
          style={{
            background: `radial-gradient(160px circle at ${pos.x}px ${pos.y}px, rgba(139,92,246,0.07), transparent 70%)`,
          }}
        />
      )}

      <div className="relative z-10 flex items-start gap-3.5">
        <div
          className={`flex size-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${gradient} shadow-lg ${glow} transition-transform duration-300 group-hover:scale-105`}
        >
          <Icon className="size-4.5 text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="mb-0.5 flex items-center gap-2">
            <p className="text-[14px] font-semibold text-white/85">{title}</p>
            <span className="rounded-full border border-white/[0.07] bg-white/[0.04] px-2 py-0.5 text-[10px] text-white/30">
              {tag}
            </span>
          </div>
          <p className="text-[13px] leading-relaxed text-white/40">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}