"use client";

import Link from "next/link";
import { SignInButton, SignUpButton, UserButton, useAuth } from "@clerk/nextjs";
import {
  Sparkles,
  Zap,
  Shield,
  Brain,
  ArrowRight,
  MessageCircle,
  ChevronRight,
  Star,
  Command,
  Cpu,
  Globe,
  Lock,
  Layers,
  BarChart3,
  Check,
  Infinity,
  Moon,
  Sun,
  Wand2,
  Code2,
  FileText,
  ImageIcon,
  Music,
  Calculator,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";

/* ─────────────────────────────────────────── data ── */

const features = [
  {
    icon: Brain,
    title: "Deep Intelligence",
    description:
      "Context-aware reasoning that understands nuance, tone, and intent across every conversation.",
    gradient: "from-violet-500 to-purple-600",
    shadow: "shadow-violet-500/25",
    tag: "AI Core",
  },
  {
    icon: Zap,
    title: "Real-Time Speed",
    description:
      "Sub-second responses powered by our globally distributed edge inference network.",
    gradient: "from-amber-400 to-orange-500",
    shadow: "shadow-amber-500/25",
    tag: "Performance",
  },
  {
    icon: Shield,
    title: "Privacy First",
    description:
      "Zero-knowledge architecture. Your data never trains our models. Ever.",
    gradient: "from-emerald-400 to-teal-500",
    shadow: "shadow-emerald-500/25",
    tag: "Security",
  },
  {
    icon: Globe,
    title: "100+ Languages",
    description:
      "Communicate fluently in over 100 languages with native-level comprehension.",
    gradient: "from-sky-400 to-blue-500",
    shadow: "shadow-sky-500/25",
    tag: "Global",
  },
  {
    icon: Layers,
    title: "Multi-Modal",
    description:
      "Text, code, images, and documents — Neurox handles every format natively.",
    gradient: "from-pink-400 to-rose-500",
    shadow: "shadow-pink-500/25",
    tag: "Versatile",
  },
  {
    icon: BarChart3,
    title: "Smart Analytics",
    description:
      "Track your productivity, conversation insights, and usage patterns visually.",
    gradient: "from-indigo-400 to-violet-500",
    shadow: "shadow-indigo-500/25",
    tag: "Insights",
  },
];

const capabilities = [
  { icon: Code2, label: "Code & Debug" },
  { icon: FileText, label: "Write & Edit" },
  { icon: ImageIcon, label: "Image Analysis" },
  { icon: Calculator, label: "Math & Science" },
  { icon: Music, label: "Creative Arts" },
  { icon: Globe, label: "Translation" },
  { icon: BarChart3, label: "Data Analysis" },
  { icon: Wand2, label: "Brainstorming" },
];

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Perfect for getting started",
    features: [
      "50 messages / day",
      "GPT-3.5 powered",
      "Standard response speed",
      "Community support",
    ],
    cta: "Get started",
    highlighted: false,
  },
  {
    name: "Pro",
    price: "$20",
    period: "per month",
    description: "For power users & professionals",
    features: [
      "Unlimited messages",
      "GPT-4 powered",
      "Priority speed",
      "Image analysis",
      "Advanced memory",
      "Priority support",
    ],
    cta: "Start free trial",
    highlighted: true,
  },
  {
    name: "Team",
    price: "$49",
    period: "per month",
    description: "Built for teams & businesses",
    features: [
      "Everything in Pro",
      "Up to 10 members",
      "Shared workspaces",
      "Admin controls",
      "Custom integrations",
      "SLA guarantee",
    ],
    cta: "Contact sales",
    highlighted: false,
  },
];

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Senior Engineer @ Stripe",
    avatar: "SC",
    avatarColor: "from-violet-400 to-purple-500",
    text: "Neurox has completely transformed how I debug complex systems. It's like having a senior engineer available 24/7.",
    stars: 5,
  },
  {
    name: "Marcus Rivera",
    role: "Product Designer @ Figma",
    avatar: "MR",
    avatarColor: "from-pink-400 to-rose-500",
    text: "The creative suggestions Neurox provides are genuinely impressive. My design workflow is 3x faster.",
    stars: 5,
  },
  {
    name: "Aisha Johnson",
    role: "Research Lead @ DeepMind",
    avatar: "AJ",
    avatarColor: "from-emerald-400 to-teal-500",
    text: "The accuracy and depth of technical explanations rival any resource I've used in my research career.",
    stars: 5,
  },
];

const stats = [
  { value: "10M+", label: "Conversations daily" },
  { value: "180+", label: "Countries served" },
  { value: "99.97%", label: "Uptime SLA" },
  { value: "< 800ms", label: "Avg response time" },
];

const suggestions = [
  "Debug my TypeScript error",
  "Write a cover letter",
  "Explain black holes",
  "Plan my startup launch",
  "Translate to Japanese",
  "Review my code",
];

/* ─────────────────────────────────────── component ── */

export default function Home() {
  const { isSignedIn } = useAuth();
  const [mounted, setMounted] = useState(false);
  const [activeWord, setActiveWord] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);

  const rotatingWords = ["Smarter", "Faster", "Deeper", "Better"];

  useEffect(() => {
    setMounted(true);

    const wordInterval = setInterval(() => {
      setActiveWord((p) => (p + 1) % rotatingWords.length);
    }, 2200);

    const handleMouse = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    const handleScroll = () => setScrollY(window.scrollY);

    window.addEventListener("mousemove", handleMouse);
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      clearInterval(wordInterval);
      window.removeEventListener("mousemove", handleMouse);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#080808] text-white overflow-x-hidden selection:bg-violet-500/30 selection:text-white">

      {/* ── Cursor glow follower ── */}
      {mounted && (
        <div
          className="pointer-events-none fixed z-0 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-700 ease-out"
          style={{
            left: mousePos.x,
            top: mousePos.y,
            background:
              "radial-gradient(circle, rgba(139,92,246,0.06) 0%, transparent 70%)",
          }}
        />
      )}

      {/* ── Fixed ambient blobs ── */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute -top-1/4 left-1/2 h-[900px] w-[900px] -translate-x-1/2 rounded-full bg-violet-600/[0.07] blur-[160px]" />
        <div className="absolute -bottom-1/4 -left-1/4 h-[600px] w-[600px] rounded-full bg-indigo-600/[0.05] blur-[120px]" />
        <div className="absolute -bottom-1/4 -right-1/4 h-[500px] w-[500px] rounded-full bg-purple-600/[0.04] blur-[120px]" />
        {/* Grid lines */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* ══════════════════════════════ HEADER ══ */}
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background:
            scrollY > 20
              ? "rgba(8,8,8,0.85)"
              : "transparent",
          backdropFilter: scrollY > 20 ? "blur(20px) saturate(180%)" : "none",
          borderBottom:
            scrollY > 20
              ? "1px solid rgba(255,255,255,0.06)"
              : "1px solid transparent",
        }}
      >
        {/* macOS-style traffic lights row */}
        {scrollY <= 20 && (
          <div className="flex items-center gap-1.5 px-5 pt-3">
            <span className="size-3 rounded-full bg-[#FF5F57] shadow-sm" />
            <span className="size-3 rounded-full bg-[#FEBC2E] shadow-sm" />
            <span className="size-3 rounded-full bg-[#28C840] shadow-sm" />
          </div>
        )}

        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
          {/* Logo */}
          <Link href="/" className="group flex items-center gap-2.5">
            <div className="relative flex size-8 items-center justify-center rounded-[10px] bg-gradient-to-br from-violet-500 to-indigo-600 shadow-lg shadow-violet-500/40 transition-all duration-300 group-hover:shadow-violet-500/60 group-hover:scale-105">
              <Sparkles className="size-3.5 text-white" />
              <div className="absolute inset-0 rounded-[10px] bg-gradient-to-t from-black/20 to-white/10" />
            </div>
            <span className="text-[15px] font-semibold tracking-tight">
              Neurox
            </span>
          </Link>

          {/* Center nav */}
          <nav className="hidden items-center gap-0.5 rounded-xl border border-white/[0.07] bg-white/[0.04] p-1 backdrop-blur-xl md:flex">
            {["Features", "Pricing", "About", "Blog"].map((item) => (
              <button
                key={item}
                className="rounded-lg px-4 py-1.5 text-[13px] text-white/50 transition-all hover:bg-white/[0.07] hover:text-white/90"
              >
                {item}
              </button>
            ))}
          </nav>

          {/* Auth */}
          <div className="flex items-center gap-2">
            {isSignedIn ? (
              <div className="flex items-center gap-2">
                <Link
                  href="/chat"
                  className="flex items-center gap-1.5 rounded-xl bg-white px-4 py-1.5 text-[13px] font-semibold text-black transition-all hover:bg-white/90 hover:shadow-lg hover:shadow-white/10"
                >
                  <MessageCircle className="size-3.5" />
                  Open Chat
                </Link>
                <UserButton
                  appearance={{
                    elements: {
                      avatarBox: "size-7 ring-1 ring-white/10",
                    },
                  }}
                />
              </div>
            ) : (
              <div className="flex items-center gap-1.5">
                <SignInButton>
                  <button className="rounded-xl px-4 py-1.5 text-[13px] text-white/50 transition-all hover:bg-white/[0.06] hover:text-white/80">
                    Log in
                  </button>
                </SignInButton>
                <SignUpButton>
                  <button className="rounded-xl bg-white px-4 py-1.5 text-[13px] font-semibold text-black transition-all hover:bg-white/90 hover:shadow-lg hover:shadow-white/10 active:scale-95">
                    Sign up free
                  </button>
                </SignUpButton>
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="relative z-10">

        {/* ══════════════════════════════ HERO ══ */}
        <section
          ref={heroRef}
          className="relative flex min-h-screen flex-col items-center justify-center px-5 pt-32 pb-20"
        >
          {/* Announcement badge */}
          <div className="mb-8 flex items-center gap-2 rounded-full border border-white/[0.09] bg-white/[0.05] px-4 py-2 text-[13px] backdrop-blur-xl transition-all hover:border-white/[0.15] hover:bg-white/[0.08] cursor-pointer">
            <span className="rounded-full bg-violet-500/20 px-2 py-0.5 text-[11px] font-semibold text-violet-400 ring-1 ring-violet-500/30">
              NEW
            </span>
            <span className="text-white/50">
              Neurox v3 is here — 10x smarter than ever
            </span>
            <ChevronRight className="size-3.5 text-white/30" />
          </div>

          {/* Headline */}
          <h1 className="mb-6 max-w-4xl text-center text-6xl font-bold leading-[1.05] tracking-[-0.04em] sm:text-7xl md:text-8xl">
            <span className="block text-white/90">Your AI thinks</span>
            <span className="block">
              <span
                key={activeWord}
                className="inline-block bg-gradient-to-r from-violet-300 via-purple-300 to-indigo-300 bg-clip-text text-transparent"
                style={{
                  animation: mounted ? "heroWordIn 0.5s cubic-bezier(0.34,1.56,0.64,1) forwards" : "none",
                }}
              >
                {rotatingWords[activeWord]}
              </span>
            </span>
            <span className="block text-white/30">than you expect.</span>
          </h1>

          {/* Sub */}
          <p className="mb-10 max-w-lg text-center text-[17px] leading-relaxed text-white/40">
            The AI assistant that understands context, remembers your
            preferences, and helps you accomplish more — effortlessly.
          </p>

          {/* CTA row */}
          <div className="mb-12 flex flex-wrap items-center justify-center gap-3">
            {isSignedIn ? (
              <Link
                href="/chat"
                className="group flex h-12 items-center gap-2 rounded-xl bg-white px-7 text-[15px] font-semibold text-black shadow-2xl shadow-white/10 transition-all hover:bg-white/90 hover:shadow-white/20 active:scale-95"
              >
                Open Neurox
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            ) : (
              <>
                <SignUpButton>
                  <button className="group flex h-12 items-center gap-2 rounded-xl bg-white px-7 text-[15px] font-semibold text-black shadow-2xl shadow-white/10 transition-all hover:bg-white/90 hover:shadow-white/20 active:scale-95">
                    Start for free
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                  </button>
                </SignUpButton>
                <SignInButton>
                  <button className="flex h-12 items-center gap-2 rounded-xl border border-white/[0.1] bg-white/[0.05] px-7 text-[15px] font-medium text-white/70 backdrop-blur-xl transition-all hover:border-white/[0.18] hover:bg-white/[0.08] hover:text-white active:scale-95">
                    <Command className="size-4 text-white/40" />
                    Log in
                  </button>
                </SignInButton>
              </>
            )}
          </div>

          {/* Trust row */}
          <div className="mb-16 flex flex-wrap items-center justify-center gap-6 text-[13px] text-white/25">
            {[
              "No credit card",
              "Free plan forever",
              "Cancel anytime",
              "SOC 2 certified",
            ].map((item, i) => (
              <span key={item} className="flex items-center gap-1.5">
                <Check className="size-3 text-emerald-400/70" />
                {item}
              </span>
            ))}
          </div>

          {/* ── macOS App Window mockup ── */}
          <div className="w-full max-w-4xl">
            <MacWindow />
          </div>

          {/* Capability pills */}
          <div className="mt-12 flex flex-wrap justify-center gap-2.5">
            {capabilities.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-2 rounded-full border border-white/[0.07] bg-white/[0.04] px-3.5 py-2 text-[13px] text-white/45 backdrop-blur-sm transition-all hover:border-white/[0.14] hover:bg-white/[0.07] hover:text-white/75"
              >
                <Icon className="size-3.5" />
                {label}
              </div>
            ))}
          </div>
        </section>

        {/* ══════════════════════════════ STATS ══ */}
        <section className="border-y border-white/[0.05] bg-white/[0.02] py-12">
          <div className="mx-auto grid max-w-4xl grid-cols-2 gap-8 px-6 sm:grid-cols-4">
            {stats.map(({ value, label }) => (
              <div key={label} className="flex flex-col items-center gap-1.5">
                <span className="text-3xl font-bold tracking-tight text-white">
                  {value}
                </span>
                <span className="text-[13px] text-white/30">{label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ══════════════════════════════ FEATURES ══ */}
        <section className="px-5 py-28">
          <div className="mx-auto max-w-5xl">
            <div className="mb-16 flex flex-col items-center gap-3 text-center">
              <span className="rounded-full border border-violet-500/20 bg-violet-500/10 px-3.5 py-1 text-[12px] font-semibold uppercase tracking-widest text-violet-400">
                Features
              </span>
              <h2 className="text-4xl font-bold tracking-[-0.03em] text-white sm:text-5xl">
                Built to be the last
                <br />
                <span className="text-white/30">AI you&apos;ll ever need</span>
              </h2>
              <p className="max-w-md text-[15px] text-white/40">
                Every feature is crafted with obsessive attention to detail.
                Because you deserve tools that just work.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {features.map(({ icon: Icon, title, description, gradient, shadow, tag }) => (
                <FeatureCard
                  key={title}
                  Icon={Icon}
                  title={title}
                  description={description}
                  gradient={gradient}
                  shadow={shadow}
                  tag={tag}
                />
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════ HOW IT WORKS ══ */}
        <section className="px-5 py-24 border-t border-white/[0.05]">
          <div className="mx-auto max-w-4xl">
            <div className="mb-16 flex flex-col items-center gap-3 text-center">
              <span className="rounded-full border border-white/10 bg-white/5 px-3.5 py-1 text-[12px] font-semibold uppercase tracking-widest text-white/40">
                How it works
              </span>
              <h2 className="text-4xl font-bold tracking-[-0.03em] text-white">
                Three steps to genius
              </h2>
            </div>

            <div className="relative grid gap-8 sm:grid-cols-3">
              {/* Connector line */}
              <div className="absolute left-[16.67%] right-[16.67%] top-8 hidden h-px bg-gradient-to-r from-transparent via-white/10 to-transparent sm:block" />

              {[
                {
                  step: "01",
                  title: "Ask anything",
                  desc: "Type naturally. No prompts, no syntax. Just talk like you would to a brilliant friend.",
                  color: "text-violet-400",
                  bg: "bg-violet-500/10",
                  border: "border-violet-500/20",
                },
                {
                  step: "02",
                  title: "Neurox thinks",
                  desc: "Our model analyzes context, memory, and intent to craft the perfect response.",
                  color: "text-indigo-400",
                  bg: "bg-indigo-500/10",
                  border: "border-indigo-500/20",
                },
                {
                  step: "03",
                  title: "You accomplish",
                  desc: "Get actionable, accurate results instantly. Iterate, refine, and ship faster.",
                  color: "text-purple-400",
                  bg: "bg-purple-500/10",
                  border: "border-purple-500/20",
                },
              ].map(({ step, title, desc, color, bg, border }) => (
                <div key={step} className="flex flex-col items-center gap-4 text-center">
                  <div
                    className={`flex size-16 items-center justify-center rounded-2xl border ${border} ${bg}`}
                  >
                    <span className={`text-xl font-bold ${color}`}>{step}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-white">{title}</h3>
                  <p className="text-[14px] leading-relaxed text-white/40">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════ TESTIMONIALS ══ */}
        <section className="px-5 py-24 border-t border-white/[0.05]">
          <div className="mx-auto max-w-5xl">
            <div className="mb-16 flex flex-col items-center gap-3 text-center">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="size-5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <h2 className="text-4xl font-bold tracking-[-0.03em] text-white">
                Loved by builders
              </h2>
              <p className="text-[15px] text-white/40">
                Join 10,000+ professionals who rely on Neurox every day.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {testimonials.map((t) => (
                <TestimonialCard key={t.name} {...t} />
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════ PRICING ══ */}
        <section className="px-5 py-24 border-t border-white/[0.05]">
          <div className="mx-auto max-w-5xl">
            <div className="mb-16 flex flex-col items-center gap-3 text-center">
              <span className="rounded-full border border-white/10 bg-white/5 px-3.5 py-1 text-[12px] font-semibold uppercase tracking-widest text-white/40">
                Pricing
              </span>
              <h2 className="text-4xl font-bold tracking-[-0.03em] text-white">
                Simple, honest pricing
              </h2>
              <p className="text-[15px] text-white/40">
                No hidden fees. No surprises. Just great AI.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {plans.map((plan) => (
                <PricingCard key={plan.name} {...plan} isSignedIn={!!isSignedIn} />
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════ FINAL CTA ══ */}
        <section className="px-5 py-24">
          <div className="mx-auto max-w-3xl overflow-hidden rounded-3xl border border-white/[0.08] bg-gradient-to-b from-[#161616] to-[#0f0f0f] p-16 text-center shadow-2xl shadow-black/60">
            {/* Top decoration */}
            <div className="mb-8 flex justify-center">
              <div className="relative flex size-20 items-center justify-center rounded-3xl bg-gradient-to-br from-violet-500 to-indigo-600 shadow-2xl shadow-violet-500/40">
                <Sparkles className="size-8 text-white" />
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-t from-black/20 to-white/10" />
                {/* Pulse rings */}
                <div className="absolute inset-0 animate-ping rounded-3xl bg-violet-500/20" style={{ animationDuration: "3s" }} />
              </div>
            </div>

            <h2 className="mb-4 text-4xl font-bold tracking-[-0.03em] text-white sm:text-5xl">
              Start thinking smarter{" "}
              <span className="text-white/30">today</span>
            </h2>
            <p className="mb-10 text-[16px] text-white/40">
              Join millions of people using Neurox to work faster,
              think clearer, and create without limits.
            </p>

            {isSignedIn ? (
              <Link
                href="/chat"
                className="group inline-flex h-14 items-center gap-2.5 rounded-2xl bg-white px-10 text-[16px] font-semibold text-black shadow-2xl shadow-white/10 transition-all hover:bg-white/90 hover:shadow-white/20 active:scale-95"
              >
                Open Neurox
                <ArrowRight className="size-5 transition-transform group-hover:translate-x-0.5" />
              </Link>
            ) : (
              <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
                <SignUpButton>
                  <button className="group flex h-14 items-center gap-2.5 rounded-2xl bg-white px-10 text-[16px] font-semibold text-black shadow-2xl shadow-white/10 transition-all hover:bg-white/90 hover:shadow-white/20 active:scale-95">
                    Get started — it&apos;s free
                    <ArrowRight className="size-5 transition-transform group-hover:translate-x-0.5" />
                  </button>
                </SignUpButton>
                <SignInButton>
                  <button className="flex h-14 items-center gap-2 rounded-2xl border border-white/[0.1] bg-white/[0.05] px-10 text-[16px] font-medium text-white/60 transition-all hover:border-white/[0.18] hover:text-white">
                    Log in
                  </button>
                </SignInButton>
              </div>
            )}

            <p className="mt-6 text-[13px] text-white/20">
              No credit card required · SOC 2 certified · Cancel anytime
            </p>
          </div>
        </section>
      </main>

      {/* ══════════════════════════════ FOOTER ══ */}
      <footer className="border-t border-white/[0.05] px-5 py-12">
        <div className="mx-auto max-w-5xl">
          <div className="mb-10 grid grid-cols-2 gap-8 sm:grid-cols-4">
            {/* Brand */}
            <div className="col-span-2 sm:col-span-1">
              <div className="mb-4 flex items-center gap-2">
                <div className="flex size-7 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 shadow-md shadow-violet-500/30">
                  <Sparkles className="size-3.5 text-white" />
                </div>
                <span className="font-semibold">Neurox</span>
              </div>
              <p className="text-[13px] leading-relaxed text-white/30">
                The AI assistant that actually understands you.
              </p>
            </div>

            {/* Links */}
            {[
              { title: "Product", links: ["Features", "Pricing", "Changelog", "Roadmap"] },
              { title: "Company", links: ["About", "Blog", "Careers", "Press"] },
              { title: "Legal", links: ["Privacy", "Terms", "Security", "Status"] },
            ].map(({ title, links }) => (
              <div key={title}>
                <p className="mb-3 text-[12px] font-semibold uppercase tracking-widest text-white/20">
                  {title}
                </p>
                <ul className="space-y-2">
                  {links.map((link) => (
                    <li key={link}>
                      <button className="text-[13px] text-white/40 transition-colors hover:text-white/70">
                        {link}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="flex flex-col items-center justify-between gap-4 border-t border-white/[0.05] pt-8 sm:flex-row">
            <p className="text-[12px] text-white/20">
              © {new Date().getFullYear()} Neurox Inc. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              {["Twitter", "GitHub", "Discord"].map((s) => (
                <button
                  key={s}
                  className="text-[13px] text-white/25 transition-colors hover:text-white/50"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>
      </footer>

      {/* ── Global animations ── */}
      <style jsx global>{`
        @keyframes heroWordIn {
          from { opacity: 0; transform: translateY(12px) scale(0.95); }
          to   { opacity: 1; transform: translateY(0)   scale(1);    }
        }
        @keyframes floatUp {
          0%, 100% { transform: translateY(0px);  }
          50%       { transform: translateY(-8px); }
        }
        @keyframes shimmer {
          from { background-position: -200% center; }
          to   { background-position:  200% center; }
        }
      `}</style>
    </div>
  );
}

/* ═══════════════════════════════════════ SUB-COMPONENTS ══ */

/* macOS window mockup */
function MacWindow() {
  const [typing, setTyping] = useState("");
  const fullText = "Explain quantum entanglement like I'm 10...";

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i <= fullText.length) {
        setTyping(fullText.slice(0, i));
        i++;
      } else {
        setTimeout(() => { i = 0; }, 2000);
      }
    }, 60);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="overflow-hidden rounded-2xl shadow-[0_40px_120px_rgba(0,0,0,0.8)]"
      style={{
        border: "1px solid rgba(255,255,255,0.1)",
        background: "rgba(18,18,18,0.95)",
        backdropFilter: "blur(40px)",
      }}
    >
      {/* Title bar */}
      <div
        className="flex items-center gap-3 border-b px-5 py-3.5"
        style={{
          borderColor: "rgba(255,255,255,0.07)",
          background: "rgba(255,255,255,0.03)",
        }}
      >
        {/* Traffic lights */}
        <div className="flex items-center gap-1.5">
          <button className="group relative size-3 rounded-full bg-[#FF5F57] shadow-sm transition-all hover:brightness-110">
            <span className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 text-[7px] text-[#7a1b17]">✕</span>
          </button>
          <button className="group relative size-3 rounded-full bg-[#FEBC2E] shadow-sm transition-all hover:brightness-110">
            <span className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 text-[7px] text-[#7a5500]">−</span>
          </button>
          <button className="group relative size-3 rounded-full bg-[#28C840] shadow-sm transition-all hover:brightness-110">
            <span className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 text-[7px] text-[#0d5c16]">+</span>
          </button>
        </div>

        {/* Title */}
        <div className="flex flex-1 items-center justify-center gap-1.5">
          <Sparkles className="size-3 text-violet-400" />
          <span className="text-[13px] font-medium text-white/40">
            Neurox — New Conversation
          </span>
        </div>

        {/* Window controls */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 rounded-lg border border-white/[0.07] bg-white/[0.05] px-2.5 py-1">
            <span className="size-1.5 rounded-full bg-emerald-400" />
            <span className="text-[11px] text-white/30">GPT-4</span>
          </div>
        </div>
      </div>

      {/* Sidebar + Chat layout */}
      <div className="flex h-[500px]">
        {/* Sidebar */}
        <div
          className="hidden w-56 shrink-0 flex-col gap-1 border-r p-3 sm:flex"
          style={{ borderColor: "rgba(255,255,255,0.05)" }}
        >
          <button className="flex items-center gap-2.5 rounded-xl bg-white/[0.07] px-3 py-2.5 text-left">
            <MessageCircle className="size-3.5 text-white/50" />
            <span className="text-[13px] text-white/70">New chat</span>
          </button>

          <div className="mt-3 mb-1 px-3 text-[10px] font-semibold uppercase tracking-widest text-white/20">
            Recent
          </div>

          {[
            "Explain quantum physics",
            "React performance tips",
            "Marketing strategy",
            "Python data analysis",
            "UX design principles",
          ].map((item, i) => (
            <button
              key={item}
              className={`flex items-center gap-2 rounded-xl px-3 py-2 text-left transition-colors ${i === 0
                ? "bg-white/[0.06] text-white/70"
                : "text-white/30 hover:bg-white/[0.04] hover:text-white/50"
                }`}
            >
              <span className="truncate text-[12px]">{item}</span>
            </button>
          ))}
        </div>

        {/* Main chat */}
        <div className="flex flex-1 flex-col">
          {/* Messages */}
          <div className="flex-1 space-y-5 overflow-auto p-6">
            {/* User message */}
            <div className="flex justify-end">
              <div
                className="max-w-[70%] rounded-2xl rounded-tr-sm px-4 py-3 text-[14px] leading-relaxed text-white/85"
                style={{ background: "rgba(255,255,255,0.08)" }}
              >
                What makes a great product?
              </div>
            </div>

            {/* AI response */}
            <div className="flex items-start gap-3">
              <div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 shadow-md shadow-violet-500/30">
                <Sparkles className="size-3 text-white" />
              </div>
              <div className="max-w-[80%] space-y-3">
                <div className="text-[14px] leading-relaxed text-white/70">
                  Great products nail three things:
                </div>
                <div
                  className="space-y-2 rounded-xl p-3 text-[13px]"
                  style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}
                >
                  {[
                    { emoji: "🎯", text: "Solve a real pain", sub: "Users pay for relief, not features" },
                    { emoji: "✨", text: "Delightful to use", sub: "Emotion drives retention" },
                    { emoji: "⚡", text: "Fast & reliable", sub: "Performance is a feature" },
                  ].map(({ emoji, text, sub }) => (
                    <div key={text} className="flex items-start gap-2.5">
                      <span className="mt-0.5 text-base">{emoji}</span>
                      <div>
                        <span className="font-medium text-white/70">{text}</span>
                        <span className="ml-2 text-white/30">{sub}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-[13px] text-white/35">
                  The magic is in the intersection of all three. Miss one and
                  users churn. Nail all three and you have a cult product. 🚀
                </p>
              </div>
            </div>
          </div>

          {/* Input bar */}
          <div className="border-t p-4" style={{ borderColor: "rgba(255,255,255,0.05)" }}>
            <div
              className="flex items-center gap-3 rounded-xl px-4 py-3"
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.09)",
              }}
            >
              <span className="flex-1 text-[14px] text-white/25">
                {typing}
                <span className="ml-0.5 inline-block h-4 w-0.5 animate-pulse bg-white/40" />
              </span>
              <button
                className="flex size-8 items-center justify-center rounded-lg bg-white/10 transition-colors hover:bg-white/15"
              >
                <ArrowRight className="size-3.5 text-white/60" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* Feature card with spotlight hover */
function FeatureCard({
  Icon, title, description, gradient, shadow, tag,
}: {
  Icon: React.ElementType;
  title: string;
  description: string;
  gradient: string;
  shadow: string;
  tag: string;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative overflow-hidden rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1"
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
            background: `radial-gradient(200px circle at ${pos.x}px ${pos.y}px, rgba(139,92,246,0.08), transparent 70%)`,
          }}
        />
      )}

      {/* Tag */}
      <div className="relative z-10 mb-4 flex items-center justify-between">
        <div
          className={`inline-flex size-11 items-center justify-center rounded-xl bg-gradient-to-br ${gradient} shadow-lg ${shadow}`}
        >
          <Icon className="size-5 text-white" />
        </div>
        <span className="rounded-full border border-white/[0.07] bg-white/[0.04] px-2.5 py-0.5 text-[11px] text-white/30">
          {tag}
        </span>
      </div>

      <h3 className="relative z-10 mb-2 text-[15px] font-semibold text-white/90">
        {title}
      </h3>
      <p className="relative z-10 text-[13px] leading-relaxed text-white/40">
        {description}
      </p>
    </div>
  );
}

/* Testimonial card */
function TestimonialCard({
  name, role, avatar, avatarColor, text, stars,
}: {
  name: string;
  role: string;
  avatar: string;
  avatarColor: string;
  text: string;
  stars: number;
}) {
  return (
    <div
      className="flex flex-col gap-4 rounded-2xl p-6 transition-all hover:-translate-y-1"
      style={{
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.07)",
      }}
    >
      <div className="flex gap-0.5">
        {[...Array(stars)].map((_, i) => (
          <Star key={i} className="size-3.5 fill-amber-400 text-amber-400" />
        ))}
      </div>
      <p className="flex-1 text-[14px] leading-relaxed text-white/55">&ldquo;{text}&rdquo;</p>
      <div className="flex items-center gap-3">
        <div
          className={`flex size-9 items-center justify-center rounded-full bg-gradient-to-br ${avatarColor} text-[12px] font-bold text-white shadow-md`}
        >
          {avatar}
        </div>
        <div>
          <p className="text-[13px] font-semibold text-white/80">{name}</p>
          <p className="text-[12px] text-white/30">{role}</p>
        </div>
      </div>
    </div>
  );
}

/* Pricing card */
function PricingCard({
  name, price, period, description, features, cta, highlighted, isSignedIn,
}: {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  cta: string;
  highlighted: boolean;
  isSignedIn: boolean;
}) {
  return (
    <div
      className={`relative flex flex-col rounded-2xl p-6 transition-all hover:-translate-y-1 ${highlighted ? "shadow-2xl shadow-violet-500/20" : ""
        }`}
      style={{
        background: highlighted
          ? "linear-gradient(135deg, rgba(139,92,246,0.15), rgba(99,102,241,0.08))"
          : "rgba(255,255,255,0.03)",
        border: highlighted
          ? "1px solid rgba(139,92,246,0.35)"
          : "1px solid rgba(255,255,255,0.07)",
      }}
    >
      {highlighted && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span className="rounded-full bg-gradient-to-r from-violet-500 to-indigo-500 px-3.5 py-1 text-[11px] font-semibold text-white shadow-lg shadow-violet-500/30">
            Most popular
          </span>
        </div>
      )}

      <div className="mb-6">
        <p className="mb-1 text-[13px] font-semibold text-white/50">{name}</p>
        <div className="flex items-end gap-1.5">
          <span className="text-4xl font-bold tracking-tight text-white">{price}</span>
          <span className="mb-1 text-[13px] text-white/30">/{period}</span>
        </div>
        <p className="mt-1.5 text-[13px] text-white/35">{description}</p>
      </div>

      <ul className="mb-8 flex-1 space-y-2.5">
        {features.map((f) => (
          <li key={f} className="flex items-center gap-2.5 text-[13px] text-white/55">
            <Check
              className={`size-4 shrink-0 ${highlighted ? "text-violet-400" : "text-white/30"}`}
            />
            {f}
          </li>
        ))}
      </ul>

      <button
        className={`w-full rounded-xl py-2.5 text-[14px] font-semibold transition-all active:scale-95 ${highlighted
          ? "bg-gradient-to-r from-violet-500 to-indigo-500 text-white shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40"
          : "border border-white/[0.1] bg-white/[0.05] text-white/60 hover:bg-white/[0.08] hover:text-white/80"
          }`}
      >
        {cta}
      </button>
    </div>
  );
}