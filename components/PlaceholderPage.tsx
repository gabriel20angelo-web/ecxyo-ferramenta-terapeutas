"use client";
import { motion } from "framer-motion";

export function PlaceholderPage({ title, sub }: { title: string; sub: string }) {
  return (
    <div className="max-w-[800px]">
      <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} className="mb-8">
        <span className="text-xs font-sans font-semibold text-accent tracking-[0.1em] uppercase">Em breve</span>
        <h1 className="text-4xl font-serif italic text-text font-normal mt-1">{title}</h1>
      </motion.div>
      <motion.div initial={{opacity:0,y:15}} animate={{opacity:1,y:0}} transition={{delay:0.1}}
        className="bg-surface rounded-[20px] border border-border p-12 text-center">
        <div className="text-5xl mb-4 opacity-20">◇</div>
        <h2 className="text-xl font-serif italic text-text-muted mb-2">{sub}</h2>
        <p className="text-sm text-text-dim font-sans font-light max-w-md mx-auto leading-relaxed">
          Esta página será implementada nas próximas fases do projeto.
        </p>
      </motion.div>
    </div>
  );
}
