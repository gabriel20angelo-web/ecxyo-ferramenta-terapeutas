"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const TABS = [
  { key: "antes", label: "Anotações antes da sessão" },
  { key: "queixa", label: "Queixa do cliente" },
  { key: "resumo", label: "Resumo da sessão" },
  { key: "observacao", label: "Observação" },
  { key: "evolucao", label: "Evolução" },
  { key: "ficha", label: "Ficha de evolução" },
  { key: "anexos", label: "Anexar arquivos" },
];

const MOCK_NOTES: Record<string, string> = {
  antes: "Pontos a abordar: retorno sobre medicação prescrita na quinzena anterior. Observar padrão de sono relatado na última sessão. Verificar se exercício de respiração foi praticado.",
  queixa: "Paciente relata dificuldade em manter foco no trabalho e sensação de apreensão constante. Menciona episódios de insônia nas últimas duas semanas.",
  resumo: "Sessão focada na compreensão dos gatilhos de ansiedade no ambiente de trabalho. Trabalhamos técnica de grounding (5-4-3-2-1) e paciente demonstrou boa adesão durante a prática.",
  observacao: "Paciente apresentou-se mais agitado que o habitual. Notar possível correlação com mudança recente de equipe no trabalho.",
  evolucao: "Progresso gradual na identificação de padrões ansiosos. Paciente já consegue nomear emoções com mais precisão. Vínculo terapêutico fortalecido após sessão anterior sobre história familiar.",
  ficha: "",
};

const MOCK_FILES = [
  { name: "Laudo_psicologico_2026.pdf", size: "2.4 MB", date: "01/03/2026" },
  { name: "Termo_consentimento_assinado.pdf", size: "340 KB", date: "12/01/2026" },
  { name: "Encaminhamento_psiquiatria.pdf", size: "180 KB", date: "15/02/2026" },
];

type Props = { isOpen: boolean; onClose: () => void; patient: string; date: string };

export function ProntuarioModal({ isOpen, onClose, patient, date }: Props) {
  const [activeTab, setActiveTab] = useState("antes");
  const [notes, setNotes] = useState(MOCK_NOTES);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="fixed inset-0 z-[200] flex items-center justify-center" onClick={onClose}>
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />

        {/* Modal */}
        <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          onClick={(e) => e.stopPropagation()}
          className="relative bg-surface rounded-2xl border border-border shadow-xl w-[900px] max-h-[85vh] flex flex-col overflow-hidden">

          {/* Header */}
          <div className="flex items-center justify-between px-7 py-5 border-b border-border">
            <div>
              <h2 className="text-xl font-serif italic text-text">Anotações da sessão {date}</h2>
              <p className="text-sm text-text-dim font-sans font-light mt-0.5">{patient}</p>
            </div>
            <div className="flex items-center gap-3">
              <select className="px-3 py-1.5 rounded-lg bg-card border border-border text-sm font-sans text-text-muted cursor-pointer">
                <option>Opções</option>
                <option>Exportar PDF</option>
                <option>Histórico de alterações</option>
              </select>
              <button onClick={onClose}
                className="w-8 h-8 rounded-lg bg-card border border-border flex items-center justify-center text-text-dim hover:text-text cursor-pointer transition-colors">
                ✕
              </button>
            </div>
          </div>

          {/* Body */}
          <div className="flex flex-1 overflow-hidden">
            {/* Tab sidebar */}
            <div className="w-[220px] border-r border-border py-3 px-2 overflow-y-auto flex-shrink-0 bg-card/50">
              {TABS.map((tab) => (
                <button key={tab.key} onClick={() => setActiveTab(tab.key)}
                  className="w-full text-left px-3 py-2.5 rounded-xl text-[13px] font-sans font-medium cursor-pointer border-none transition-all duration-200 mb-0.5"
                  style={{
                    background: activeTab === tab.key ? "var(--c-accent-soft)" : "transparent",
                    color: activeTab === tab.key ? "var(--c-accent)" : "var(--c-text-muted)",
                  }}>
                  {tab.label}
                </button>
              ))}
              <button className="w-full text-left px-3 py-2.5 text-[13px] font-sans font-medium text-accent cursor-pointer border-none bg-transparent mt-2">
                + Novo campo
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 p-7 overflow-y-auto">
              <AnimatePresence mode="wait">
                <motion.div key={activeTab} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
                  <h3 className="text-sm font-sans font-semibold text-accent uppercase tracking-[0.08em] flex items-center gap-2 mb-4">
                    <span className="w-4 h-px bg-accent" />
                    {TABS.find(t => t.key === activeTab)?.label}
                  </h3>

                  {activeTab === "anexos" ? (
                    <div>
                      {/* Drop zone */}
                      <div className="border-2 border-dashed border-border rounded-xl p-8 text-center mb-5 hover:border-accent/30 transition-colors cursor-pointer">
                        <div className="text-text-dim mb-2 flex justify-center"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg></div>
                        <p className="text-sm text-text-muted font-sans">Arraste arquivos aqui ou clique para selecionar</p>
                        <p className="text-xs text-text-dim font-sans mt-1">Máximo 15 MB por arquivo</p>
                      </div>
                      {/* File list */}
                      <div className="flex flex-col gap-2">
                        {MOCK_FILES.map((f, i) => (
                          <div key={i} className="flex items-center gap-3 px-4 py-3 rounded-xl bg-card border border-border">
                            <span className="text-text-dim"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg></span>
                            <div className="flex-1">
                              <div className="text-sm font-sans font-medium text-text">{f.name}</div>
                              <div className="text-[11px] text-text-dim font-sans">{f.size} · {f.date}</div>
                            </div>
                            <button className="text-xs text-accent font-sans font-medium bg-transparent border-none cursor-pointer">Baixar</button>
                            <button className="text-xs text-psi-rose font-sans font-medium bg-transparent border-none cursor-pointer">Remover</button>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : activeTab === "ficha" ? (
                    <div className="flex flex-col gap-4">
                      {[
                        { label: "CID / Hipótese diagnóstica", placeholder: "Ex.: F41.1 — Ansiedade generalizada" },
                        { label: "Queixa principal", placeholder: "Descrição da queixa..." },
                        { label: "Conduta terapêutica", placeholder: "Abordagem e técnicas utilizadas..." },
                        { label: "Encaminhamentos", placeholder: "Encaminhamentos realizados..." },
                        { label: "Próximos passos", placeholder: "Plano para próximas sessões..." },
                      ].map((field) => (
                        <div key={field.label}>
                          <label className="text-xs font-sans font-semibold text-text-muted uppercase tracking-wide mb-1.5 block">{field.label}</label>
                          <textarea placeholder={field.placeholder} rows={2}
                            className="w-full px-4 py-3 rounded-xl bg-card border border-border text-sm font-sans text-text placeholder:text-text-dim resize-none focus:outline-none focus:border-accent/30 transition-colors" />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div>
                      {/* Toolbar */}
                      <div className="flex items-center gap-1 px-3 py-2 rounded-t-xl bg-card border border-border border-b-0">
                        {["B", "I", "U", "S", "≡", "≡", "≡", "⌘"].map((btn, i) => (
                          <button key={i} className="w-7 h-7 rounded-md flex items-center justify-center text-xs text-text-dim hover:bg-surface hover:text-text transition-colors cursor-pointer border-none bg-transparent font-bold">
                            {btn}
                          </button>
                        ))}
                      </div>
                      <textarea
                        value={notes[activeTab] || ""}
                        onChange={(e) => setNotes({ ...notes, [activeTab]: e.target.value })}
                        rows={12}
                        className="w-full px-4 py-4 rounded-b-xl bg-surface border border-border text-sm font-sans text-text leading-relaxed resize-none focus:outline-none focus:border-accent/30 transition-colors"
                        placeholder="Comece a escrever..."
                      />
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-between px-7 py-4 border-t border-border">
            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-sans font-semibold cursor-pointer border border-psi-couple/25"
              style={{ background: "linear-gradient(135deg, var(--c-couple-soft), var(--c-blue-soft))", color: "var(--c-couple)" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/>
              </svg>
              Produzir com auxílio da IA
            </motion.button>
            <div className="flex gap-3">
              <button onClick={onClose} className="px-5 py-2.5 rounded-xl border border-border text-sm font-sans font-medium text-text-muted cursor-pointer bg-transparent hover:bg-card transition-colors">
                Cancelar
              </button>
              <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                className="px-6 py-2.5 rounded-xl border-none text-sm font-sans font-semibold cursor-pointer text-text"
                style={{ background: "linear-gradient(135deg, var(--c-accent), var(--c-accent))" }}>
                Salvar
              </motion.button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
