"use client";
import { motion } from "framer-motion";

export function GrainOverlay() {
  return (
    <div className="fixed inset-0 pointer-events-none z-[9999]"
      style={{
        opacity: "var(--c-grain)",
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
        backgroundSize: "200px 200px",
        animation: "grain 8s steps(10) infinite",
      }} />
  );
}

export function Badge({ children, color, bg }: { children: React.ReactNode; color?: string; bg?: string }) {
  return (
    <motion.span whileHover={{ scale: 1.05, y: -1 }}
      className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-medium font-sans cursor-default tracking-wide"
      style={{ color: color || "var(--c-accent)", background: bg || "var(--c-accent-soft)", border: `1px solid ${color || "var(--c-accent)"}20` }}>
      {children}
    </motion.span>
  );
}

export function SectionTitle({ children, sub }: { children: React.ReactNode; sub?: string }) {
  return (
    <div className="mb-5">
      <h3 className="text-xs font-sans font-semibold uppercase tracking-[0.12em] flex items-center gap-3" style={{ color: "var(--c-accent)" }}>
        <span className="w-5 h-px" style={{ background: "var(--c-accent)" }} />{children}
      </h3>
      {sub && <p className="text-sm font-sans font-light mt-1.5" style={{ color: "var(--c-text-dim)" }}>{sub}</p>}
    </div>
  );
}
