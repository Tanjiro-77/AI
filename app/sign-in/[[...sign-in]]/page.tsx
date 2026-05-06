"use client";

import { SignIn } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { Sparkles, Brain, Zap, Shield, ArrowRight } from "lucide-react";
import Link from "next/link";

const highlights = [
  {
    icon: Brain,
    text: "Pick up where you left off",
  },
  {
    icon: Zap,
    text: "Access your conversation history",
  },
  {
    icon: Shield,
    text: "Your data stays private & secure",
  },
];

export default function SignInPage() {
  return (
    <main className="relative grid min-h-dvh overflow-hidden bg-background lg:grid-cols-2">

      {/* ── Background Effects ── */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        {/* Gradient blobs */}
        <div className="absolute -left-1/4 top-0 size-[500px] rounded-full bg-violet-500/10 blur-3xl" />
        <div className="absolute -right-1/4 bottom-0 size-[400px] rounded-full bg-indigo-500/10 blur-3xl" />
        <div className="absolute left-1/2 top-1/2 size-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-500/8 blur-3xl" />

        {/* Dot grid */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "radial-gradient(circle, hsl(var(--muted-foreground)) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
      </div>

      {/* ══════════════════════════════════════════
          LEFT PANEL — Branding & Features
      ══════════════════════════════════════════ */}
      <div className="hidden flex-col justify-between p-12 lg:flex">

        {/* Logo */}
        <Link href="/" className="group flex w-fit items-center gap-2.5">
          <div className="relative flex size-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 shadow-lg shadow-violet-500/25 transition-transform duration-300 group-hover:scale-105">
            <Sparkles className="size-4 text-white" />
            <span className="absolute -right-0.5 -top-0.5 size-2.5 animate-pulse rounded-full border-2 border-background bg-emerald-400" />
          </div>
          <span className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-lg font-bold tracking-tight text-transparent">
            Neurox
          </span>
        </Link>

        {/* Main content */}
        <div className="flex flex-col gap-10">
          {/* Hero text */}
          <div className="flex flex-col gap-4">
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-4 py-1.5 text-sm text-violet-400 backdrop-blur-sm">
              <Sparkles className="size-3.5" />
              <span>Your AI companion awaits</span>
            </div>

            <h1 className="text-4xl font-extrabold leading-tight tracking-tight xl:text-5xl">
              Welcome back to{" "}
              <span className="bg-gradient-to-r from-violet-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
                Neurox
              </span>
            </h1>

            <p className="max-w-md text-base leading-relaxed text-muted-foreground">
              Continue your intelligent conversations. Your AI assistant is
              ready to help you achieve more, faster.
            </p>
          </div>

          {/* Feature highlights */}
          <div className="flex flex-col gap-3">
            {highlights.map(({ icon: Icon, text }) => (
              <div
                key={text}
                className="group flex items-center gap-3 rounded-xl border border-border/40 bg-background/40 p-4 backdrop-blur-sm transition-all duration-300 hover:-translate-x-1 hover:border-violet-500/30 hover:bg-background/60"
              >
                <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500/15 to-indigo-500/15 ring-1 ring-violet-500/20 transition-transform duration-300 group-hover:scale-110">
                  <Icon className="size-4 text-violet-400" />
                </div>
                <p className="font-medium text-foreground">{text}</p>
              </div>
            ))}
          </div>

          {/* CTA for new users */}
          <div className="flex flex-col gap-3 rounded-2xl border border-border/40 bg-gradient-to-br from-violet-500/5 to-indigo-500/5 p-6 backdrop-blur-sm">
            <p className="text-sm font-medium text-foreground">
              Don't have an account yet?
            </p>
            <Link
              href="/sign-up"
              className="group inline-flex w-fit items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-violet-500/25 transition-all duration-300 hover:shadow-violet-500/40 hover:opacity-90"
            >
              Create free account
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>

        {/* Footer */}
        <p className="text-xs text-muted-foreground/50">
          © {new Date().getFullYear()} Neurox · Secure sign-in
        </p>
      </div>

      {/* ══════════════════════════════════════════
          RIGHT PANEL — Sign-In Form
      ══════════════════════════════════════════ */}
      <div className="flex flex-col items-center justify-center px-6 py-12 lg:border-l lg:border-border/40 lg:bg-muted/10 lg:backdrop-blur-sm">

        {/* Mobile logo */}
        <Link
          href="/"
          className="group mb-8 flex items-center gap-2.5 lg:hidden"
        >
          <div className="relative flex size-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 shadow-lg shadow-violet-500/25 transition-transform duration-300 group-hover:scale-105">
            <Sparkles className="size-4 text-white" />
            <span className="absolute -right-0.5 -top-0.5 size-2.5 animate-pulse rounded-full border-2 border-background bg-emerald-400" />
          </div>
          <span className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-lg font-bold tracking-tight text-transparent">
            Neurox
          </span>
        </Link>

        {/* Form header */}
        <div className="mb-6 w-full max-w-sm text-center lg:text-left">
          <h2 className="text-2xl font-bold tracking-tight text-foreground">
            Sign in to your account
          </h2>
          <p className="mt-1.5 text-sm text-muted-foreground">
            New to Neurox?{" "}
            <Link
              href="/sign-up"
              className="font-medium text-violet-400 underline-offset-4 transition-colors duration-200 hover:text-violet-300 hover:underline"
            >
              Create an account
            </Link>
          </p>
        </div>

        {/* Clerk Sign-In widget */}
        <div className="w-full max-w-sm">
          <SignIn
            path="/sign-in"
            routing="path"
            signUpUrl="/sign-up"
            appearance={{
              baseTheme: dark,
              variables: {
                colorPrimary: "#7c3aed", // violet-600
                colorBackground: "#0f0f12",
                colorInputBackground: "#18181f",
                colorInputText: "#f4f4f5",
                colorText: "#f4f4f5",
                colorTextSecondary: "#a1a1aa",
                borderRadius: "0.75rem",
                fontFamily: "inherit",
              },
              elements: {
                // Card container
                card: "bg-background/60 border border-border/50 shadow-2xl shadow-black/30 backdrop-blur-md rounded-2xl",

                // Hide default header
                headerTitle: "hidden",
                headerSubtitle: "hidden",

                // Social buttons
                socialButtonsBlockButton:
                  "border border-border/60 bg-muted/40 hover:bg-muted/70 transition-all duration-300 rounded-xl",
                socialButtonsBlockButtonText: "font-medium text-foreground",

                // Divider
                dividerLine: "bg-border/50",
                dividerText: "text-muted-foreground text-xs",

                // Form inputs
                formFieldInput:
                  "rounded-xl border border-border/60 bg-muted/30 text-foreground placeholder:text-muted-foreground/50 focus:ring-2 focus:ring-violet-500/40 focus:border-violet-500/60 transition-all duration-300",
                formFieldLabel: "text-sm font-medium text-muted-foreground",

                // Submit button
                formButtonPrimary:
                  "bg-gradient-to-r from-violet-600 to-indigo-600 hover:opacity-90 transition-all duration-300 shadow-lg shadow-violet-500/25 hover:shadow-violet-500/35 rounded-xl font-semibold",

                // Links
                footerActionLink:
                  "text-violet-400 hover:text-violet-300 font-medium transition-colors duration-200",

                // Footer
                footer: "hidden",
              },
            }}
          />
        </div>

        {/* Trust indicators */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-xs text-muted-foreground/60">
          <span className="flex items-center gap-1.5">
            <Shield className="size-3.5 text-emerald-500" />
            SSL secured
          </span>
          <span className="flex items-center gap-1.5">
            <Sparkles className="size-3.5 text-violet-400" />
            Instant access
          </span>
          <span className="flex items-center gap-1.5">
            <Zap className="size-3.5 text-indigo-400" />
            Always free
          </span>
        </div>

        {/* Mobile CTA */}
        <div className="mt-8 flex flex-col gap-3 rounded-2xl border border-border/40 bg-gradient-to-br from-violet-500/5 to-indigo-500/5 p-4 backdrop-blur-sm lg:hidden">
          <p className="text-center text-sm font-medium text-foreground">
            Don't have an account?
          </p>
          <Link
            href="/sign-up"
            className="group inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-violet-500/25 transition-all duration-300 hover:shadow-violet-500/40 hover:opacity-90"
          >
            Create free account
            <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>

    </main>
  );
}