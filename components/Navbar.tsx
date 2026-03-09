"use client";

import { motion } from "framer-motion";

type NavbarProps = {
  page: string;
  setPage: (page: string) => void;
};

export function Navbar({ page, setPage }: NavbarProps) {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="flex justify-between items-center px-9 py-4 sticky top-0 z-[100]"
      style={{
        background: "rgba(12,11,9,0.88)",
        backdropFilter: "blur(20px) saturate(180%)",
        borderBottom: "1px solid #2A2621",
      }}
    >
      {/* Logo */}
      <div className="flex items-center gap-3">
        <div
          className="w-[34px] h-[34px] rounded-[10px] flex items-center justify-center p-0.5"
          style={{
            background:
              "conic-gradient(from 180deg, #D4A853, #7EBF8E, #D4A853)",
          }}
        >
          <div className="w-full h-full rounded-lg bg-bg flex items-center justify-center text-accent font-serif italic text-[17px]">
            p
          </div>
        </div>
        <span className="text-xl text-text font-serif italic tracking-tight">
          presença
        </span>
      </div>

      {/* Page tabs */}
      <div className="flex gap-0.5 bg-surface rounded-xl p-[3px] border border-border">
        {[
          { key: "profile", label: "Perfil" },
          { key: "agenda", label: "Agenda" },
        ].map((p) => (
          <motion.button
            key={p.key}
            whileTap={{ scale: 0.95 }}
            onClick={() => setPage(p.key)}
            className="relative px-5 py-2 rounded-[9px] border-none text-[13px] font-medium font-sans cursor-pointer transition-all duration-300"
            style={{
              background:
                page === p.key ? "rgba(212,168,83,0.1)" : "transparent",
              color: page === p.key ? "#D4A853" : "#6B6355",
            }}
          >
            {page === p.key && (
              <motion.div
                layoutId="navIndicator"
                className="absolute bottom-[3px] left-[30%] right-[30%] h-[2px] rounded-sm bg-accent"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
            {p.label}
          </motion.button>
        ))}
      </div>

      {/* Avatar */}
      <motion.div
        whileHover={{ scale: 1.08 }}
        className="w-9 h-9 rounded-full flex items-center justify-center text-accent text-sm font-serif italic font-semibold cursor-pointer"
        style={{
          background:
            "linear-gradient(135deg, rgba(212,168,83,0.25), rgba(126,191,142,0.25))",
          border: "1.5px solid rgba(212,168,83,0.2)",
        }}
      >
        M
      </motion.div>
    </motion.nav>
  );
}
