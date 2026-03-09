"use client";
import { motion } from "framer-motion";

const S = "24";
const W = "1.8";
const NAV = [
  { key:"dashboard", label:"Painel", icon:<svg width={S} height={S} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={W} strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="9" rx="1"/><rect x="14" y="3" width="7" height="5" rx="1"/><rect x="14" y="12" width="7" height="9" rx="1"/><rect x="3" y="16" width="7" height="5" rx="1"/></svg> },
  { key:"clientes", label:"Clientes", icon:<svg width={S} height={S} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={W} strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg> },
  { key:"agenda", label:"Agenda", icon:<svg width={S} height={S} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={W} strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg> },
  { key:"financeiro", label:"Financeiro", icon:<svg width={S} height={S} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={W} strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg> },
  { key:"documentos", label:"Documentos", icon:<svg width={S} height={S} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={W} strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg> },
  { key:"relatorios", label:"Relatórios", icon:<svg width={S} height={S} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={W} strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg> },
  { key:"comunidade", label:"Comunidade", icon:<svg width={S} height={S} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={W} strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg> },
  { key:"marketing", label:"Perfil", icon:<svg width={S} height={S} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={W} strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg> },
  { key:"supervisao", label:"Supervisão", icon:<svg width={S} height={S} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={W} strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg> },
];

const SunIcon = <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>;
const MoonIcon = <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>;

type P = { activePage:string; setActivePage:(p:string)=>void; collapsed:boolean; setCollapsed:(c:boolean)=>void; theme:string; toggleTheme:()=>void };

export function Sidebar({ activePage, setActivePage, collapsed, setCollapsed, theme, toggleTheme }:P) {
  return (
    <motion.aside initial={false} animate={{ width: collapsed ? 76 : 230 }}
      transition={{ duration:0.3, ease:[0.22,1,0.36,1] }}
      className="fixed left-0 top-0 bottom-0 z-50 flex flex-col transition-colors duration-300"
      style={{ background:"var(--c-surface)", borderRight:"1px solid var(--c-border)" }}>

      <div className="flex items-center gap-3 px-5 py-5 cursor-pointer" onClick={() => setCollapsed(!collapsed)}
        style={{ borderBottom:"1px solid var(--c-border)" }}>
        <div className="w-[38px] h-[38px] rounded-[10px] flex items-center justify-center p-0.5 flex-shrink-0"
          style={{ background:`linear-gradient(135deg, var(--c-accent), var(--c-green))` }}>
          <div className="w-full h-full rounded-lg flex items-center justify-center font-serif italic text-[18px] transition-colors"
            style={{ background:"var(--c-surface)", color:"var(--c-accent)" }}>p</div>
        </div>
        {!collapsed && <motion.span initial={{opacity:0,x:-8}} animate={{opacity:1,x:0}}
          className="text-xl font-serif italic tracking-tight whitespace-nowrap" style={{color:"var(--c-text)"}}>presença</motion.span>}
      </div>

      <nav className="flex-1 py-3 px-2.5 flex flex-col gap-1 overflow-y-auto">
        {NAV.map(item => {
          if (item.key === "divider") return <div key="div" className="h-px my-3 mx-2" style={{background:"var(--c-border)"}}/>;
          const isActive = activePage === item.key;
          return (
            <motion.button key={item.key} whileTap={{scale:0.96}} onClick={() => setActivePage(item.key)}
              className="relative flex items-center gap-3.5 rounded-xl border-none cursor-pointer transition-all duration-200 group"
              style={{ padding:collapsed?"12px 0":"12px 16px", justifyContent:collapsed?"center":"flex-start",
                background:isActive?"var(--c-accent-soft)":"transparent", color:isActive?"var(--c-accent)":"var(--c-text-dim)" }}>
              {isActive && <motion.div layoutId="sidebarActive" className="absolute left-0 top-[18%] bottom-[18%] w-[3px] rounded-r-full"
                style={{background:"var(--c-accent)"}} transition={{type:"spring",stiffness:400,damping:30}}/>}
              <span className="flex-shrink-0 transition-colors duration-200" style={{color:isActive?"var(--c-accent)":"var(--c-text-dim)"}}>{item.icon}</span>
              {!collapsed && <motion.span initial={{opacity:0,x:-5}} animate={{opacity:1,x:0}}
                className="text-[14px] font-medium font-sans whitespace-nowrap" style={{color:isActive?"var(--c-accent)":"var(--c-text-muted)"}}>{item.label}</motion.span>}
              {collapsed && <div className="absolute left-full ml-2 px-2.5 py-1.5 rounded-lg text-xs font-sans font-medium whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-50 shadow-lg"
                style={{background:"var(--c-card)",border:"1px solid var(--c-border)",color:"var(--c-text-muted)"}}>{item.label}</div>}
            </motion.button>
          );
        })}
      </nav>

      {/* Bottom: theme toggle + user */}
      <div style={{ borderTop:"1px solid var(--c-border)" }}>
        {/* Theme toggle */}
        <div className="px-3 pt-3 pb-1" style={{ display:"flex", justifyContent:collapsed?"center":"flex-start", paddingLeft:collapsed?"0":"16px" }}>
          <motion.button whileHover={{scale:1.08}} whileTap={{scale:0.92}} onClick={toggleTheme}
            className="flex items-center gap-2.5 rounded-xl border-none cursor-pointer transition-all duration-300"
            style={{ padding:collapsed?"10px":"8px 14px", background:"var(--c-card)", border:"1px solid var(--c-border)", color:"var(--c-text-muted)" }}>
            <motion.div animate={{rotate: theme === "light" ? 0 : 180}} transition={{duration:0.4, ease:"easeInOut"}}>
              {theme === "light" ? MoonIcon : SunIcon}
            </motion.div>
            {!collapsed && <motion.span initial={{opacity:0}} animate={{opacity:1}} className="text-xs font-sans font-medium">
              {theme === "light" ? "Modo escuro" : "Modo claro"}
            </motion.span>}
          </motion.button>
        </div>

        {/* User */}
        <div className="p-3 flex items-center gap-3" style={{justifyContent:collapsed?"center":"flex-start"}}>
          <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-serif italic font-semibold flex-shrink-0"
            style={{background:`linear-gradient(135deg, var(--c-accent-soft), var(--c-green-soft))`,border:"1.5px solid var(--c-accent-soft)",color:"var(--c-accent)"}}>M</div>
          {!collapsed && <motion.div initial={{opacity:0}} animate={{opacity:1}} className="overflow-hidden">
            <div className="text-sm font-medium font-sans truncate" style={{color:"var(--c-text)"}}>Dra. Marina</div>
            <div className="text-[11px] font-sans" style={{color:"var(--c-text-dim)"}}>CRP 04/58921</div>
          </motion.div>}
        </div>
      </div>
    </motion.aside>
  );
}
