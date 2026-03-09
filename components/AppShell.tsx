"use client";
import { useState, useEffect, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { GrainOverlay } from "./ui";
import { Sidebar } from "./Sidebar";
import { DashboardPage } from "./DashboardPage";
import { ClientesPage } from "./ClientesPage";
import { AgendaPage } from "./AgendaPage";
import { FinanceiroPage } from "./FinanceiroPage";
import { DocumentosPage } from "./DocumentosPage";
import { RelatoriosPage } from "./RelatoriosPage";
import { ComunidadePage } from "./ComunidadePage";
import { ProfilePage } from "./ProfilePage";
import { SupervisaoPage } from "./SupervisaoPage";

const LABELS: Record<string,string> = {
  dashboard:"Painel", clientes:"Clientes", agenda:"Agenda", financeiro:"Financeiro",
  documentos:"Documentos", relatorios:"Relatórios", comunidade:"Comunidade",
  marketing:"Perfil Público", supervisao:"Supervisão",
};

export function AppShell() {
  const [activePage, setActivePage] = useState("dashboard");
  const [collapsed, setCollapsed] = useState(false);
  const [agendaView, setAgendaView] = useState("week");
  const [selectedService, setSelectedService] = useState(0);
  const [selectedSlot, setSelectedSlot] = useState<string|null>(null);
  const [navigateToPatient, setNavigateToPatient] = useState<string|null>(null);

  // Theme
  const [theme, setTheme] = useState("dark");
  useEffect(() => {
    const saved = typeof window !== "undefined" ? localStorage.getItem("presenca-theme") : null;
    if (saved) { setTheme(saved); document.documentElement.setAttribute("data-theme", saved); }
  }, []);

  const toggleTheme = useCallback(() => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next === "dark" ? "" : "light");
    localStorage.setItem("presenca-theme", next);
  }, [theme]);

  const handleNavigateToPatient = (name:string) => { setNavigateToPatient(name); setActivePage("clientes"); };

  const renderPage = () => {
    switch(activePage) {
      case "dashboard": return <DashboardPage onNavigateToPatient={handleNavigateToPatient} />;
      case "clientes": return <ClientesPage initialPatient={navigateToPatient} onClearPatient={() => setNavigateToPatient(null)} />;
      case "agenda": return <AgendaPage agendaView={agendaView} setAgendaView={setAgendaView} />;
      case "financeiro": return <FinanceiroPage />;
      case "documentos": return <DocumentosPage />;
      case "relatorios": return <RelatoriosPage />;
      case "comunidade": return <ComunidadePage />;
      case "marketing": return <ProfilePage selectedService={selectedService} setSelectedService={setSelectedService} selectedSlot={selectedSlot} setSelectedSlot={setSelectedSlot} />;
      case "supervisao": return <SupervisaoPage />;
      default: return <DashboardPage onNavigateToPatient={handleNavigateToPatient} />;
    }
  };

  return (
    <div className="min-h-screen transition-colors duration-300" style={{ background:"var(--c-bg)" }}>
      <GrainOverlay />
      <Sidebar activePage={activePage} setActivePage={setActivePage} collapsed={collapsed} setCollapsed={setCollapsed} theme={theme} toggleTheme={toggleTheme} />
      <motion.main initial={false} animate={{marginLeft:collapsed?76:230}}
        transition={{duration:0.3,ease:[0.22,1,0.36,1]}} className="min-h-screen relative z-[1]">
        <div className="sticky top-0 z-40 flex items-center justify-between px-8 py-4 transition-colors duration-300"
          style={{background:"var(--c-nav-blur)",backdropFilter:"blur(20px) saturate(180%)",borderBottom:"1px solid var(--c-border)"}}>
          <span className="text-[13px] font-sans" style={{color:"var(--c-text-dim)"}}>{LABELS[activePage]||""}</span>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-sans cursor-pointer transition-colors"
              style={{background:"var(--c-surface)",border:"1px solid var(--c-border)",color:"var(--c-text-dim)"}}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              Buscar cliente...
            </div>
            <motion.div whileHover={{scale:1.05}} className="relative w-9 h-9 rounded-xl flex items-center justify-center cursor-pointer transition-colors"
              style={{background:"var(--c-surface)",border:"1px solid var(--c-border)",color:"var(--c-text-dim)"}}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
              <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full text-[9px] font-sans font-bold flex items-center justify-center"
                style={{background:"var(--c-rose)",color:"var(--c-bg)"}}>3</div>
            </motion.div>
          </div>
        </div>
        <div className="p-8">
          <AnimatePresence mode="wait">
            <motion.div key={activePage} initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-8}}
              transition={{duration:0.3,ease:[0.22,1,0.36,1]}}>
              {renderPage()}
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.main>
    </div>
  );
}
