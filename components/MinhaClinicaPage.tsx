"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ROOMS = [
  { id: "01", name: "Sala Acolher", capacity: 2, equipment: "Poltrona, divã, som ambiente", status: "Disponível" },
  { id: "02", name: "Sala Encontro", capacity: 4, equipment: "Sofá duplo, cadeiras, quadro branco", status: "Ocupada" },
  { id: "03", name: "Sala Grupo", capacity: 12, equipment: "Cadeiras em roda, projetor, ar condicionado", status: "Disponível" },
  { id: "04", name: "Sala Online", capacity: 1, equipment: "Webcam HD, ring light, fone", status: "Manutenção" },
];

const PROFESSIONALS = [
  { name: "Dra. Marina Alcântara", crp: "CRP 04/58921", specialty: "Psicodinâmica", patients: 42, split: "70/30", status: "Ativa" },
  { name: "Dr. Felipe Borges", crp: "CRP 04/31245", specialty: "TCC", patients: 35, split: "65/35", status: "Ativo" },
  { name: "Dra. Camila Torres", crp: "CRP 06/89012", specialty: "Gestalt", patients: 28, split: "70/30", status: "Ativa" },
  { name: "Dr. Roberto Lima", crp: "CRP 04/55678", specialty: "Psicanálise", patients: 31, split: "60/40", status: "Ativo" },
  { name: "Dra. Juliana Reis", crp: "CRP 04/44321", specialty: "Sistêmica", patients: 18, split: "75/25", status: "Licença" },
];

const REPASSE_RULES = [
  { type: "Sessão individual", profissional: "70%", clinica: "30%", obs: "Padrão para todos os profissionais" },
  { type: "Terapia de casal", profissional: "65%", clinica: "35%", obs: "Uso obrigatório de sala dupla" },
  { type: "Grupo terapêutico", profissional: "60%", clinica: "40%", obs: "Inclui uso da Sala Grupo" },
  { type: "Convênio Unimed", profissional: "55%", clinica: "45%", obs: "Tabela conveniada fixa" },
  { type: "Sessão social", profissional: "80%", clinica: "20%", obs: "Valor reduzido aprovado pela coord." },
];

const roomStatus: Record<string, { color: string; bg: string }> = {
  Disponível: { color: "var(--c-green)", bg: "var(--c-green-soft)" },
  Ocupada: { color: "var(--c-accent)", bg: "var(--c-accent-soft)" },
  Manutenção: { color: "var(--c-rose)", bg: "var(--c-rose-soft)" },
};

const profStatus: Record<string, { color: string; bg: string }> = {
  Ativa: { color: "var(--c-green)", bg: "var(--c-green-soft)" }, Ativo: { color: "var(--c-green)", bg: "var(--c-green-soft)" },
  Licença: { color: "var(--c-accent)", bg: "var(--c-accent-soft)" },
};

export function MinhaClinicaPage() {
  const [tab, setTab] = useState("salas");
  const tabs = [
    { key: "salas", label: "Salas" },
    { key: "profissionais", label: "Profissionais" },
    { key: "repasses", label: "Regras de Repasse" },
    { key: "dados", label: "Dados da Clínica" },
  ];

  return (
    <div className="max-w-[1100px]">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex justify-between items-end mb-7">
        <div>
          <span className="text-xs font-sans font-semibold text-accent tracking-[0.1em] uppercase">Administração</span>
          <h1 className="text-4xl font-serif italic text-text font-normal mt-1">Minha Clínica</h1>
        </div>
      </motion.div>

      <div className="flex gap-1 bg-surface rounded-xl p-[3px] border border-border mb-6 w-fit">
        {tabs.map(t => (
          <motion.button key={t.key} whileTap={{ scale: 0.95 }} onClick={() => setTab(t.key)}
            className="px-5 py-2 rounded-[9px] border-none text-[13px] font-medium font-sans cursor-pointer transition-all duration-300"
            style={{ background: tab === t.key ? "var(--c-accent-soft)" : "transparent", color: tab === t.key ? "var(--c-accent)" : "var(--c-text-dim)" }}>
            {t.label}
          </motion.button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {tab === "salas" && (
          <motion.div key="salas" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            <div className="grid grid-cols-2 gap-4 mb-6">
              {ROOMS.map((r, i) => {
                const rs = roomStatus[r.status];
                return (
                  <motion.div key={r.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
                    whileHover={{ y: -2 }}
                    className="bg-surface rounded-[20px] border border-border p-6 transition-all duration-300 cursor-pointer">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <span className="text-xs text-text-dim font-sans">Sala {r.id}</span>
                        <h3 className="text-lg font-serif italic text-text mt-0.5">{r.name}</h3>
                      </div>
                      <span className="text-[11px] font-semibold font-sans px-2.5 py-0.5 rounded-lg"
                        style={{ color: rs?.color, background: rs?.bg }}>{r.status}</span>
                    </div>
                    <div className="flex flex-col gap-1.5 text-sm text-text-muted font-sans">
                      <span>👥 Capacidade: {r.capacity} pessoas</span>
                      <span>🪑 {r.equipment}</span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
            <button className="px-5 py-2.5 rounded-xl bg-accent-soft border border-accent/20 text-accent text-sm font-sans font-semibold cursor-pointer">
              + Adicionar sala
            </button>
          </motion.div>
        )}

        {tab === "profissionais" && (
          <motion.div key="prof" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className="bg-surface rounded-[20px] border border-border overflow-hidden">
            <div className="grid grid-cols-[2fr_1.2fr_1fr_80px_80px_80px] px-6 py-3 border-b border-border">
              {["Profissional", "Especialidade", "CRP", "Pac.", "Split", "Status"].map(h => (
                <span key={h} className="text-[11px] font-sans font-semibold text-text-dim uppercase tracking-[0.06em]">{h}</span>
              ))}
            </div>
            {PROFESSIONALS.map((p, i) => {
              const ps = profStatus[p.status] || profStatus.Ativo;
              return (
                <motion.div key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.05 }}
                  className="grid grid-cols-[2fr_1.2fr_1fr_80px_80px_80px] px-6 py-3.5 border-b border-border/30 hover:bg-surface-hover transition-colors items-center cursor-pointer">
                  <div>
                    <div className="text-sm font-sans font-medium text-text">{p.name}</div>
                  </div>
                  <span className="text-sm text-text-muted font-sans">{p.specialty}</span>
                  <span className="text-xs text-text-dim font-sans">{p.crp}</span>
                  <span className="text-sm text-text font-sans font-medium">{p.patients}</span>
                  <span className="text-xs text-accent font-sans font-semibold">{p.split}</span>
                  <span className="text-[11px] font-semibold font-sans px-2 py-0.5 rounded-lg w-fit"
                    style={{ color: ps.color, background: ps.bg }}>{p.status}</span>
                </motion.div>
              );
            })}
          </motion.div>
        )}

        {tab === "repasses" && (
          <motion.div key="repasses" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className="bg-surface rounded-[20px] border border-border overflow-hidden">
            <div className="grid grid-cols-[2fr_1fr_1fr_2fr] px-6 py-3 border-b border-border">
              {["Tipo de Atendimento", "Profissional", "Clínica", "Observação"].map(h => (
                <span key={h} className="text-[11px] font-sans font-semibold text-text-dim uppercase tracking-[0.06em]">{h}</span>
              ))}
            </div>
            {REPASSE_RULES.map((r, i) => (
              <motion.div key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.05 }}
                className="grid grid-cols-[2fr_1fr_1fr_2fr] px-6 py-3.5 border-b border-border/30 hover:bg-surface-hover transition-colors items-center">
                <span className="text-sm font-sans font-medium text-text">{r.type}</span>
                <span className="text-sm font-sans font-semibold text-psi-green">{r.profissional}</span>
                <span className="text-sm font-sans font-semibold text-accent">{r.clinica}</span>
                <span className="text-xs text-text-dim font-sans">{r.obs}</span>
              </motion.div>
            ))}
          </motion.div>
        )}

        {tab === "dados" && (
          <motion.div key="dados" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className="bg-surface rounded-[20px] border border-border p-7 max-w-[700px]">
            <h3 className="text-sm font-sans font-semibold text-accent tracking-[0.08em] uppercase flex items-center gap-2 mb-6">
              <span className="w-4 h-px bg-accent" />Dados da Clínica
            </h3>
            <div className="flex flex-col gap-4">
              {[
                { label: "Nome", value: "Clínica Presença — Psicologia Integrada" },
                { label: "CNPJ", value: "12.345.678/0001-90" },
                { label: "Endereço", value: "Rua dos Guajajaras, 1470 — Funcionários, BH/MG" },
                { label: "Telefone", value: "(31) 3333-4444" },
                { label: "E-mail", value: "contato@clinicapresenca.com.br" },
                { label: "Horário", value: "Seg a Sex: 07:00 — 20:00 · Sáb: 08:00 — 13:00" },
              ].map(f => (
                <div key={f.label} className="flex items-baseline gap-4">
                  <span className="text-xs font-sans font-semibold text-text-dim uppercase tracking-wide w-20 flex-shrink-0">{f.label}</span>
                  <span className="text-sm font-sans text-text">{f.value}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
