"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { paymentMap } from "@/lib/tokens";
import { ProntuarioModal } from "./ProntuarioModal";

// ── MOCK DATA ──
const PATIENTS = [
  { name:"Lucas Mendonça", status:"Ativo", email:"lucas@email.com", phone:"+55 31 98765-4321", since:"01/01/2025", sessions:24, nextSession:"12/03 às 07:00", risk:"Baixo", plan:"Semanal · R$ 220", lastSession:"06/03", daysSince:4, debt:0 },
  { name:"Ana Beatriz Souza", status:"Ativo", email:"anab@email.com", phone:"+55 31 91234-5678", since:"15/06/2024", sessions:18, nextSession:"12/03 às 08:00", risk:"Baixo", plan:"Semanal · R$ 220", lastSession:"05/03", daysSince:5, debt:0 },
  { name:"Rafael & Camila", status:"Ativo", email:"rafael@email.com", phone:"+55 31 99876-1234", since:"10/10/2025", sessions:5, nextSession:"12/03 às 09:00", risk:"Baixo", plan:"Quinzenal · R$ 350", lastSession:"27/02", daysSince:11, debt:175 },
  { name:"Juliana Ferreira", status:"Ativo", email:"juliana@email.com", phone:"+55 31 94567-8901", since:"01/03/2026", sessions:1, nextSession:"12/03 às 14:00", risk:"Baixo", plan:"Semanal · R$ 220", lastSession:"—", daysSince:0, debt:220 },
  { name:"Thiago Akira", status:"Ativo", email:"thiago@email.com", phone:"+55 31 93456-7890", since:"06/09/2024", sessions:15, nextSession:"12/03 às 15:00", risk:"Baixo", plan:"Semanal · R$ 220", lastSession:"06/03", daysSince:4, debt:0 },
  { name:"Mariana Costa", status:"Ativo", email:"mariana@email.com", phone:"+55 31 92345-6789", since:"20/11/2025", sessions:3, nextSession:"—", risk:"Médio", plan:"Semanal · R$ 220", lastSession:"20/02", daysSince:18, debt:220 },
  { name:"Abrana Peixoto", status:"Ativo", email:"abra@email.com", phone:"+55 34 99999-9999", since:"12/04/2023", sessions:24, nextSession:"12/03 às 11:00", risk:"Baixo", plan:"Semanal · R$ 220", lastSession:"06/03", daysSince:4, debt:0 },
  { name:"Bernardo Costa", status:"Ativo", email:"bernardo@email.com", phone:"+55 31 5550-0120", since:"18/09/2022", sessions:28, nextSession:"14/03 às 09:00", risk:"Baixo", plan:"Semanal · R$ 220", lastSession:"15/02", daysSince:23, debt:0 },
  { name:"Camila Oliveira", status:"Inativo", email:"camila@email.com", phone:"+55 31 9900-0099", since:"16/08/2023", sessions:6, nextSession:"—", risk:"Alto", plan:"Semanal · R$ 180", lastSession:"20/01", daysSince:49, debt:360 },
  { name:"Marcos Vinicius", status:"Desistente", email:"marcos@email.com", phone:"+55 31 7766-5544", since:"20/05/2023", sessions:2, nextSession:"—", risk:"Alto", plan:"Avulso · R$ 220", lastSession:"15/01", daysSince:54, debt:0 },
  { name:"Pedro Henrique", status:"Ativo", email:"pedro@email.com", phone:"+55 31 98877-6655", since:"01/02/2026", sessions:6, nextSession:"11/03 às 07:00", risk:"Baixo", plan:"Semanal · R$ 220", lastSession:"04/03", daysSince:6, debt:0 },
  { name:"Carla Santos", status:"Ativo", email:"carla@email.com", phone:"+55 31 94433-2211", since:"10/08/2025", sessions:12, nextSession:"11/03 às 08:00", risk:"Baixo", plan:"Semanal · R$ 220", lastSession:"04/03", daysSince:6, debt:0 },
  { name:"Beatriz Lima", status:"Ativo", email:"beatriz@email.com", phone:"+55 31 97766-5544", since:"05/11/2025", sessions:8, nextSession:"11/03 às 09:00", risk:"Baixo", plan:"Semanal · R$ 220", lastSession:"04/03", daysSince:6, debt:0 },
  { name:"Fernanda Moura", status:"Ativo", email:"fernanda@email.com", phone:"+55 31 4433-2211", since:"03/01/2024", sessions:12, nextSession:"11/03 às 16:00", risk:"Baixo", plan:"Semanal · R$ 220", lastSession:"04/03", daysSince:6, debt:110 },
  { name:"Roberto Almeida", status:"Ativo", email:"roberto@email.com", phone:"+55 31 95566-7788", since:"20/03/2025", sessions:10, nextSession:"12/03 às 09:00", risk:"Baixo", plan:"Semanal · R$ 220", lastSession:"05/03", daysSince:5, debt:0 },
];

const SESSIONS_DETAIL = [
  { date:"06/03/2026", time:"11:00", payment:"pago", preNotes:"Retomar técnica grounding. Verificar sono.", sessionNotes:"Paciente relatou melhora no sono após exercício de respiração. Trabalhamos escala de ansiedade — nota 6/10 (era 8 há 2 semanas). Introduzimos journaling como tarefa.", evolution:"Progresso: identificação de gatilhos mais rápida. Desafio: ainda evita situações sociais no trabalho.", supervision:"Discutido com Dra. Torres — sugestão de trabalhar exposição gradual nas próximas sessões.", mood:"😊" },
  { date:"27/02/2026", time:"11:00", payment:"pago", preNotes:"Verificar efeito da nova dosagem. Perguntar sobre relação com irmã.", sessionNotes:"Paciente relata melhora significativa com Escitalopram 10mg. Menos episódios de pânico (1 na semana vs 3 antes). Abordamos dinâmica com irmã — resistência inicial mas abriu sobre ciúmes na infância.", evolution:"Medicação estabilizando. Vínculo terapêutico fortalecido — paciente chorou pela primeira vez em sessão.", supervision:"", mood:"😐" },
  { date:"20/02/2026", time:"11:00", payment:"pago", preNotes:"Foco em padrões de evitação.", sessionNotes:"Exploração de padrões de evitação em relações íntimas. Paciente identificou paralelo com relação paterna. Momento de insight importante. Encerramento com respiração diafragmática.", evolution:"Insight significativo sobre origem dos padrões. Paciente motivado para mudança.", supervision:"Supervisão com Prof. Roberto — validou hipótese psicodinâmica. Sugeriu explorar transferência.", mood:"🤔" },
  { date:"13/02/2026", time:"11:00", payment:"parcial", preNotes:"Sessão sobre família. Preparar genograma.", sessionNotes:"Construção de genograma familiar. Paciente surpreso com padrões repetitivos entre gerações (avô, pai, ele — todos com dificuldade em expressar afeto). Resistência ao falar da mãe.", evolution:"Genograma revelou padrões transgeracionais. Paciente precisa de mais tempo para processar.", supervision:"", mood:"😟" },
  { date:"06/02/2026", time:"11:00", payment:"pago", preNotes:"Retomar questão do trabalho. Checar tarefas.", sessionNotes:"Foco na ansiedade no ambiente de trabalho. Paciente aplicou técnica de grounding durante reunião e conseguiu se manter presente. Celebramos a conquista. Definimos meta: uma interação social voluntária por semana.", evolution:"Primeira aplicação prática bem-sucedida de técnica fora do consultório.", supervision:"", mood:"😊" },
];

const PATIENT_TASKS = [
  { text:"Ler capítulo 3 — 'O Corpo Guarda as Marcas'", done:false, due:"15/03", category:"Estudo" },
  { text:"Praticar grounding 5-4-3-2-1 diariamente", done:true, due:"Recorrente", category:"Exercício" },
  { text:"Preencher diário de ansiedade (escala 1-10)", done:false, due:"Diário", category:"Tarefa" },
  { text:"Escrever carta para o pai (não enviar)", done:false, due:"20/03", category:"Terapêutico" },
  { text:"Preparar devolutiva de avaliação", done:false, due:"18/03", category:"Admin" },
  { text:"Pesquisar artigo sobre exposição gradual", done:true, due:"10/03", category:"Estudo" },
  { text:"Agendar retorno com psiquiatra", done:false, due:"25/03", category:"Encaminhamento" },
];

const PATIENT_DOCS = [
  { name:"Laudo_psicologico_2026.pdf", size:"2.4 MB", date:"01/03/2026", type:"Laudo", by:"Dra. Marina" },
  { name:"Termo_consentimento_assinado.pdf", size:"340 KB", date:"12/01/2026", type:"Termo", by:"Paciente" },
  { name:"Encaminhamento_psiquiatria.pdf", size:"180 KB", date:"15/02/2026", type:"Encaminhamento", by:"Dra. Marina" },
  { name:"Genograma_familiar.png", size:"890 KB", date:"13/02/2026", type:"Material", by:"Sessão" },
  { name:"Escala_ansiedade_beck.pdf", size:"120 KB", date:"06/01/2026", type:"Avaliação", by:"Dra. Marina" },
];

const PATIENT_FINANCIAL = [
  { date:"06/03/2026", desc:"Sessão individual", value:"R$ 220", status:"Pago", method:"PIX" },
  { date:"27/02/2026", desc:"Sessão individual", value:"R$ 220", status:"Pago", method:"PIX" },
  { date:"20/02/2026", desc:"Sessão individual", value:"R$ 220", status:"Pago", method:"Cartão" },
  { date:"13/02/2026", desc:"Sessão individual", value:"R$ 220", status:"Parcial", method:"PIX — faltam R$ 110" },
  { date:"06/02/2026", desc:"Sessão individual", value:"R$ 220", status:"Pago", method:"PIX" },
];

const MEDICATIONS = [
  { name:"Escitalopram 10mg", dose:"1x manhã", prescriber:"Dr. Fernandes", since:"Jan/2026", status:"Ativo" },
  { name:"Melatonina 3mg", dose:"1x noite", prescriber:"Dr. Fernandes", since:"Fev/2026", status:"Ativo" },
];

const sc:Record<string,{color:string;bg:string}> = {
  Ativo:{color:"var(--c-green)",bg:"var(--c-green-soft)"}, Inativo:{color:"var(--c-text-muted)",bg:"var(--c-text-dim)"}, Desistente:{color:"var(--c-rose)",bg:"var(--c-rose-soft)"},
};
const pc:Record<string,{color:string;bg:string}> = { Alta:{color:"var(--c-rose)",bg:"var(--c-rose-soft)"}, Média:{color:"var(--c-accent)",bg:"var(--c-accent-soft)"}, Normal:{color:"var(--c-blue)",bg:"var(--c-blue-soft)"} };
const catColors:Record<string,string> = { Estudo:"var(--c-blue)", "Exercício":"var(--c-green)", Tarefa:"var(--c-accent)", "Terapêutico":"var(--c-couple)", Admin:"var(--c-text-muted)", Encaminhamento:"var(--c-rose)" };
const WAIT_LIST = [
  { name:"Laura Mendes", specialty:"Ansiedade", since:"01/03/2026", priority:"Alta" },
  { name:"Gabriel Rocha", specialty:"Depressão", since:"15/02/2026", priority:"Média" },
  { name:"Diego Ferreira", specialty:"Terapia de Casal", since:"05/03/2026", priority:"Alta" },
];
const GROUPS = [
  { id:"012", name:"Grupo de Gestantes", type:"Grupo", professional:"Marina Alcântara", since:"12/04/2023", members:8 },
  { id:"045", name:"Mariane e Gustavo", type:"Casal", professional:"Marina Alcântara", since:"12/04/2023", members:2 },
];

// ── COMPONENT ──
export function ClientesPage({ initialPatient, onClearPatient }:{ initialPatient?:string|null; onClearPatient?:()=>void }) {
  const [tab, setTab] = useState("listagem");
  const [selectedPatient, setSelectedPatient] = useState<string|null>(initialPatient||null);
  const [patientTab, setPatientTab] = useState("sessoes");
  const [prontuarioOpen, setProntuarioOpen] = useState(false);
  const [prontuarioDate, setProntuarioDate] = useState("06/03/2026");
  const [expandedSession, setExpandedSession] = useState<number|null>(0);
  const [newTask, setNewTask] = useState("");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("Todos");
  const [generalNotes, setGeneralNotes] = useState("Paciente vem demonstrando engajamento crescente no processo terapêutico. Importante manter foco na exposição gradual conforme alinhado em supervisão. Atenção à questão familiar — tema sensível que precisa de timing adequado.\n\nContato de emergência: Mãe — Maria (31) 99887-6655\nPsiquiatra: Dr. Fernandes — (31) 3333-2222");

  useEffect(() => { if (initialPatient) setSelectedPatient(initialPatient); }, [initialPatient]);

  // ── PATIENT DETAIL ──
  if (selectedPatient) {
    const p = PATIENTS.find(pt => pt.name === selectedPatient);
    if (!p) { setSelectedPatient(null); return null; }
    const tabs = [
      { key:"sessoes", label:"Sessões", icon:<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg> },
      { key:"evolucao", label:"Evolução", icon:<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg> },
      { key:"tarefas", label:"Tarefas", icon:<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg> },
      { key:"notas", label:"Anotações Gerais", icon:<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg> },
      { key:"financeiro", label:"Financeiro", icon:<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg> },
      { key:"documentos", label:"Documentos", icon:<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg> },
      { key:"anamnese", label:"Anamnese", icon:<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="8" y="2" width="8" height="4" rx="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><line x1="12" y1="11" x2="12" y2="17"/><line x1="9" y1="14" x2="15" y2="14"/></svg> },
      { key:"medicacao", label:"Medicação", icon:<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M10.5 1.5H8A6.5 6.5 0 0 0 1.5 8v0A6.5 6.5 0 0 0 8 14.5h0a6.5 6.5 0 0 0 6.5-6.5V5.5"/><path d="M14 10l4.5 4.5"/><path d="M18.5 14.5L14 10"/><circle cx="18.5" cy="18.5" r="3.5"/></svg> },
      { key:"cadastro", label:"Cadastro", icon:<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg> },
    ];

    return (
      <div className="max-w-[1200px]">
        <ProntuarioModal isOpen={prontuarioOpen} onClose={() => setProntuarioOpen(false)} patient={p.name} date={prontuarioDate} />

        <motion.button initial={{opacity:0,x:-10}} animate={{opacity:1,x:0}} onClick={() => {setSelectedPatient(null);setPatientTab("sessoes");onClearPatient?.();}}
          className="flex items-center gap-2 text-text-dim text-sm font-sans font-medium mb-5 cursor-pointer bg-transparent border-none hover:text-accent transition-colors">
          ‹ Voltar para clientes
        </motion.button>

        {/* Patient header */}
        <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} className="bg-surface rounded-[20px] border border-border p-6 mb-6">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-full flex items-center justify-center text-xl font-serif italic"
              style={{background:"linear-gradient(135deg, var(--c-accent-soft), var(--c-green-soft))",color:"var(--c-accent)"}}>{p.name.charAt(0)}</div>
            <div className="flex-1">
              <h1 className="text-2xl font-serif italic text-text">{p.name}</h1>
              <div className="flex items-center gap-3 mt-1 flex-wrap">
                <span className="text-[11px] font-semibold font-sans px-2.5 py-0.5 rounded-lg" style={{color:sc[p.status]?.color,background:sc[p.status]?.bg}}>{p.status}</span>
                <span className="text-xs text-text-dim font-sans">{p.sessions} sessões</span>
                <span className="text-xs text-text-dim font-sans">Desde {p.since}</span>
                <span className="text-xs text-text-dim font-sans">Plano: {p.plan}</span>
                {p.nextSession !== "—" && <span className="text-xs text-accent font-sans font-medium">Próxima: {p.nextSession}</span>}
              </div>
            </div>
            <div className="flex gap-2">
              <button className="px-4 py-2 rounded-xl bg-accent-soft border border-accent/20 text-accent text-sm font-sans font-medium cursor-pointer">+ Agendar</button>
              <button className="px-4 py-2 rounded-xl bg-surface border border-border text-text-muted text-sm font-sans font-medium cursor-pointer">Editar</button>
            </div>
          </div>

          {/* Quick stats */}
          <div className="grid grid-cols-3 gap-3 mt-5">
            {[
              {l:"Sessões/mês",v:"4",c:"var(--c-green)"},{l:"Taxa presença",v:"96%",c:"var(--c-accent)"},{l:"Última sessão",v:"06/03",c:"var(--c-blue)"},
            ].map(s => (
              <div key={s.l} className="bg-card rounded-xl p-3.5 border border-border">
                <div className="text-[10px] font-sans font-semibold text-text-dim uppercase tracking-[0.06em]">{s.l}</div>
                <div className="text-lg font-serif italic mt-0.5" style={{color:s.c}}>{s.v}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Tabs + content */}
        <div className="grid grid-cols-[210px_1fr] gap-5">
          <motion.nav initial={{opacity:0,x:-15}} animate={{opacity:1,x:0}} className="flex flex-col gap-0.5 sticky top-[80px] self-start">
            {tabs.map(t => {
              const active = patientTab === t.key;
              return (
                <button key={t.key} onClick={() => setPatientTab(t.key)}
                  className="text-left px-4 py-2.5 rounded-xl text-[13px] font-sans font-medium cursor-pointer border-none transition-all duration-200 flex items-center gap-2.5"
                  style={{background:active?"var(--c-accent-soft)":"transparent",color:active?"var(--c-accent)":"var(--c-text-dim)"}}>
                  <span className="flex-shrink-0" style={{color:active?"var(--c-accent)":"var(--c-text-dim)"}}>{t.icon}</span>{t.label}
                </button>
              );
            })}
          </motion.nav>

          <div>
            <AnimatePresence mode="wait">
              {/* ── SESSÕES ── */}
              {patientTab === "sessoes" && (
                <motion.div key="sess" initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} exit={{opacity:0}}>
                  <div className="flex flex-col gap-3">
                    {SESSIONS_DETAIL.map((s, i) => {
                      const isExp = expandedSession === i;
                      const pm = paymentMap[s.payment];
                      return (
                        <motion.div key={i} initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{delay:i*0.05}}
                          className="bg-surface rounded-[20px] border overflow-hidden transition-all duration-300"
                          style={{borderColor:isExp?"var(--c-accent-soft)":"var(--c-border)"}}>
                          {/* Session header */}
                          <div className="flex items-center px-6 py-4 cursor-pointer hover:bg-surface-hover transition-colors"
                            onClick={() => setExpandedSession(isExp ? null : i)}>
                            <div className="text-center flex-shrink-0 w-16 mr-4">
                              <div className="text-base font-serif italic text-accent">{s.date.split("/")[0]}/{s.date.split("/")[1]}</div>
                              <div className="text-[10px] text-text-dim font-sans">{s.date.split("/")[2]}</div>
                            </div>
                            <div className="w-1.5 h-1.5 rounded-full bg-accent mr-4 flex-shrink-0"/>
                            <div className="flex-1">
                              <div className="flex items-center gap-3">
                                <span className="text-sm text-text font-sans font-medium">{s.time}</span>
                                <span className="text-[11px] font-semibold px-2 py-0.5 rounded-lg" style={{color:pm?.color,background:pm?.bg}}>{pm?.label}</span>
                              </div>
                              <p className="text-xs text-text-dim font-sans font-light mt-0.5 line-clamp-1">{s.sessionNotes.slice(0,80)}...</p>
                            </div>
                            <div className="flex items-center gap-2 flex-shrink-0">
                              {s.supervision && <span className="text-[10px] font-sans font-semibold px-2 py-0.5 rounded-md bg-psi-couple-soft text-psi-couple">Supervisão</span>}
                              <button onClick={(e) => {e.stopPropagation();setProntuarioDate(s.date);setProntuarioOpen(true);}}
                                className="text-xs text-accent font-sans font-medium px-3 py-1.5 rounded-lg border border-accent/20 bg-accent-soft cursor-pointer hover:bg-accent/15 transition-colors">
                                Prontuário
                              </button>
                              <span className="text-text-dim text-sm transition-transform" style={{transform:isExp?"rotate(180deg)":"rotate(0deg)"}}>▾</span>
                            </div>
                          </div>

                          {/* Expanded content */}
                          <AnimatePresence>
                            {isExp && (
                              <motion.div initial={{height:0,opacity:0}} animate={{height:"auto",opacity:1}} exit={{height:0,opacity:0}} className="overflow-hidden">
                                <div className="px-6 pb-5 grid grid-cols-2 gap-4 border-t border-border pt-4">
                                  {/* Pre-session */}
                                  <div className="bg-card rounded-xl p-4 border border-border">
                                    <h4 className="text-[11px] font-sans font-semibold text-D4A853 uppercase tracking-[0.08em] mb-2 flex items-center gap-2">
                                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="8" y="2" width="8" height="4" rx="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><line x1="12" y1="11" x2="12" y2="17"/><line x1="9" y1="14" x2="15" y2="14"/></svg>
                                      Anotação pré-sessão
                                    </h4>
                                    <p className="text-sm text-text-muted font-sans font-light leading-relaxed">{s.preNotes}</p>
                                  </div>
                                  <div className="bg-card rounded-xl p-4 border border-border">
                                    <h4 className="text-[11px] font-sans font-semibold text-accent uppercase tracking-[0.08em] mb-2 flex items-center gap-2">
                                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
                                      Registro da sessão
                                    </h4>
                                    <p className="text-sm text-text-muted font-sans font-light leading-relaxed">{s.sessionNotes}</p>
                                  </div>
                                  <div className="bg-card rounded-xl p-4 border border-border">
                                    <h4 className="text-[11px] font-sans font-semibold text-psi-green uppercase tracking-[0.08em] mb-2 flex items-center gap-2">
                                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>
                                      Evolução
                                    </h4>
                                    <p className="text-sm text-text-muted font-sans font-light leading-relaxed">{s.evolution}</p>
                                  </div>
                                  <div className="bg-card rounded-xl p-4 border border-border" style={{opacity:s.supervision?1:0.4}}>
                                    <h4 className="text-[11px] font-sans font-semibold text-psi-couple uppercase tracking-[0.08em] mb-2 flex items-center gap-2">
                                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                                      Supervisão
                                    </h4>
                                    <p className="text-sm text-text-muted font-sans font-light leading-relaxed">{s.supervision || "Sem registro de supervisão para esta sessão."}</p>
                                  </div>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </motion.div>
                      );
                    })}
                  </div>
                </motion.div>
              )}

              {/* ── EVOLUÇÃO ── */}
              {patientTab === "evolucao" && (
                <motion.div key="evo" initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} exit={{opacity:0}} className="bg-surface rounded-[20px] border border-border p-7">
                  <h3 className="text-sm font-sans font-semibold text-accent tracking-[0.08em] uppercase flex items-center gap-2 mb-5"><span className="w-4 h-px bg-accent"/>Linha de evolução</h3>
                  <div className="relative pl-8">
                    <div className="absolute left-3 top-0 bottom-0 w-px bg-border"/>
                    {SESSIONS_DETAIL.map((s,i) => (
                      <div key={i} className="relative mb-6 last:mb-0">
                        <div className="absolute -left-5 top-1 w-3 h-3 rounded-full border-2 border-accent" style={{background:i===0?"var(--c-accent)":"transparent"}}/>
                        <div className="flex items-baseline gap-3 mb-1">
                          <span className="text-sm font-serif italic text-accent">{s.date}</span>
                        </div>
                        <p className="text-sm text-text font-sans font-light leading-relaxed">{s.evolution}</p>
                        {s.supervision && <p className="text-xs text-psi-couple font-sans mt-1 italic">Supervisão: {s.supervision.slice(0,80)}...</p>}
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* ── TAREFAS ── */}
              {patientTab === "tarefas" && (
                <motion.div key="tasks" initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} exit={{opacity:0}} className="bg-surface rounded-[20px] border border-border p-7">
                  <div className="flex justify-between items-center mb-5">
                    <h3 className="text-sm font-sans font-semibold text-accent tracking-[0.08em] uppercase flex items-center gap-2"><span className="w-4 h-px bg-accent"/>Tarefas</h3>
                    <div className="flex gap-2 text-[11px] font-sans text-text-dim">
                      <span>{PATIENT_TASKS.filter(t=>t.done).length}/{PATIENT_TASKS.length} concluídas</span>
                    </div>
                  </div>
                  {/* Add task */}
                  <div className="flex gap-2 mb-5">
                    <input value={newTask} onChange={e=>setNewTask(e.target.value)} placeholder="Nova tarefa..." className="flex-1 px-4 py-2.5 rounded-xl bg-card border border-border text-sm font-sans text-text placeholder:text-text-dim focus:outline-none focus:border-accent/30 transition-colors"/>
                    <button className="px-4 py-2.5 rounded-xl bg-accent-soft border border-accent/20 text-accent text-sm font-sans font-semibold cursor-pointer">Adicionar</button>
                  </div>
                  <div className="flex flex-col gap-2">
                    {PATIENT_TASKS.map((t,i) => (
                      <motion.div key={i} initial={{opacity:0,x:-8}} animate={{opacity:1,x:0}} transition={{delay:i*0.04}}
                        className="flex items-start gap-3 py-3 px-4 rounded-xl hover:bg-surface-hover transition-colors cursor-pointer border border-transparent hover:border-border">
                        <div className="w-[18px] h-[18px] rounded-md border-2 flex items-center justify-center flex-shrink-0 mt-0.5"
                          style={{borderColor:t.done?"var(--c-green)":"var(--c-border)",background:t.done?"var(--c-green-soft)":"transparent"}}>
                          {t.done && <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="var(--c-green)" strokeWidth="3" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>}
                        </div>
                        <div className="flex-1">
                          <span className="text-sm font-sans" style={{color:t.done?"var(--c-text-dim)":"var(--c-text)",textDecoration:t.done?"line-through":"none"}}>{t.text}</span>
                          <div className="flex gap-2 mt-1">
                            <span className="text-[10px] font-sans font-semibold px-2 py-0.5 rounded-md" style={{color:catColors[t.category]||"var(--c-text-muted)",background:(catColors[t.category]||"var(--c-text-muted)")+"18"}}>{t.category}</span>
                            <span className="text-[10px] text-text-dim font-sans">{t.due}</span>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* ── ANOTAÇÕES GERAIS ── */}
              {patientTab === "notas" && (
                <motion.div key="notas" initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} exit={{opacity:0}} className="bg-surface rounded-[20px] border border-border p-7">
                  <h3 className="text-sm font-sans font-semibold text-accent tracking-[0.08em] uppercase flex items-center gap-2 mb-5"><span className="w-4 h-px bg-accent"/>Anotações gerais do caso</h3>
                  <textarea value={generalNotes} onChange={e=>setGeneralNotes(e.target.value)} rows={14}
                    className="w-full px-5 py-4 rounded-xl bg-card border border-border text-sm font-sans text-text leading-relaxed resize-none focus:outline-none focus:border-accent/30 transition-colors"/>
                  <div className="flex justify-between items-center mt-3">
                    <span className="text-[11px] text-text-dim font-sans">Última edição: 06/03/2026 às 12:30</span>
                    <button className="px-5 py-2 rounded-xl text-sm font-sans font-semibold cursor-pointer border-none text-text" style={{background:"linear-gradient(135deg,var(--c-accent),var(--c-accent))"}}>Salvar</button>
                  </div>
                </motion.div>
              )}

              {/* ── FINANCEIRO ── */}
              {patientTab === "financeiro" && (
                <motion.div key="fin" initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} exit={{opacity:0}}>
                  <div className="grid grid-cols-3 gap-3 mb-5">
                    {[{l:"Total pago",v:"R$ 4.840",c:"var(--c-green)"},{l:"Pendente",v:"R$ 110",c:"var(--c-accent)"},{l:"Ticket médio",v:"R$ 216",c:"var(--c-blue)"}].map(s => (
                      <div key={s.l} className="bg-surface rounded-xl p-5 border border-border">
                        <div className="text-[10px] font-sans font-semibold text-text-dim uppercase tracking-[0.06em]">{s.l}</div>
                        <div className="text-2xl font-serif italic mt-1" style={{color:s.c}}>{s.v}</div>
                      </div>
                    ))}
                  </div>
                  <div className="bg-surface rounded-[20px] border border-border overflow-hidden">
                    <div className="grid grid-cols-[1.5fr_2fr_1fr_1fr_1.5fr] px-6 py-3 border-b border-border">
                      {["Data","Descrição","Valor","Status","Método"].map(h => <span key={h} className="text-[11px] font-sans font-semibold text-text-dim uppercase tracking-[0.06em]">{h}</span>)}
                    </div>
                    {PATIENT_FINANCIAL.map((f,i) => (
                      <div key={i} className="grid grid-cols-[1.5fr_2fr_1fr_1fr_1.5fr] px-6 py-3.5 border-b border-border/30 hover:bg-surface-hover transition-colors items-center">
                        <span className="text-sm text-text-dim font-sans">{f.date}</span>
                        <span className="text-sm font-sans text-text">{f.desc}</span>
                        <span className="text-sm font-sans font-medium text-psi-green">{f.value}</span>
                        <span className="text-[11px] font-semibold font-sans px-2 py-0.5 rounded-lg w-fit" style={{color:paymentMap[f.status.toLowerCase()]?.color,background:paymentMap[f.status.toLowerCase()]?.bg}}>{f.status}</span>
                        <span className="text-xs text-text-dim font-sans">{f.method}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* ── DOCUMENTOS ── */}
              {patientTab === "documentos" && (
                <motion.div key="docs" initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} exit={{opacity:0}} className="bg-surface rounded-[20px] border border-border p-7">
                  <h3 className="text-sm font-sans font-semibold text-accent tracking-[0.08em] uppercase flex items-center gap-2 mb-5"><span className="w-4 h-px bg-accent"/>Documentos e arquivos</h3>
                  <div className="border-2 border-dashed border-border rounded-xl p-6 text-center mb-5 hover:border-accent/30 transition-colors cursor-pointer">
                    <div className="flex justify-center mb-2 text-text-dim">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
                    </div>
                    <p className="text-sm text-text-muted font-sans">Arraste arquivos ou clique para upload (máx. 15 MB)</p>
                  </div>
                  <div className="flex flex-col gap-2">
                    {PATIENT_DOCS.map((d,i) => (
                      <motion.div key={i} initial={{opacity:0}} animate={{opacity:1}} transition={{delay:i*0.04}}
                        className="flex items-center gap-3 px-4 py-3 rounded-xl bg-card border border-border hover:border-border-light transition-colors">
                        <span className="text-text-dim"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg></span>
                        <div className="flex-1">
                          <div className="text-sm font-sans font-medium text-text">{d.name}</div>
                          <div className="text-[11px] text-text-dim font-sans">{d.size} · {d.date} · por {d.by}</div>
                        </div>
                        <span className="text-[11px] font-sans font-semibold px-2 py-0.5 rounded-md bg-accent-soft text-accent">{d.type}</span>
                        <button className="text-xs text-accent font-sans font-medium bg-transparent border-none cursor-pointer">Baixar</button>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* ── ANAMNESE ── */}
              {patientTab === "anamnese" && (
                <motion.div key="anam" initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} exit={{opacity:0}} className="bg-surface rounded-[20px] border border-border p-7">
                  <h3 className="text-sm font-sans font-semibold text-accent tracking-[0.08em] uppercase flex items-center gap-2 mb-5"><span className="w-4 h-px bg-accent"/>Anamnese</h3>
                  <div className="flex flex-col gap-4">
                    {[
                      {l:"Queixa principal",v:"Ansiedade generalizada com episódios de pânico. Dificuldade em manter relacionamentos estáveis."},
                      {l:"História da queixa",v:"Sintomas iniciaram há 3 anos após término. Piora gradual com impacto no trabalho."},
                      {l:"Histórico familiar",v:"Mãe com depressão. Pai ausente desde os 12. Irmã mais velha com TOC."},
                      {l:"Medicação em uso",v:"Escitalopram 10mg (manhã) — Dr. Fernandes. Melatonina 3mg (noite)."},
                      {l:"Tratamentos anteriores",v:"TCC breve (12 sessões) em 2022. Melhora parcial."},
                    ].map(f => (
                      <div key={f.l}>
                        <label className="text-xs font-sans font-semibold text-text-dim uppercase tracking-wide mb-1.5 block">{f.l}</label>
                        <textarea defaultValue={f.v} rows={2} className="w-full px-4 py-3 rounded-xl bg-card border border-border text-sm font-sans text-text resize-none focus:outline-none focus:border-accent/30 transition-colors"/>
                      </div>
                    ))}
                    <button className="self-end px-5 py-2.5 rounded-xl border-none text-sm font-sans font-semibold cursor-pointer text-text" style={{background:"linear-gradient(135deg,var(--c-accent),var(--c-accent))"}}>Salvar anamnese</button>
                  </div>
                </motion.div>
              )}

              {/* ── MEDICAÇÃO ── */}
              {patientTab === "medicacao" && (
                <motion.div key="med" initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} exit={{opacity:0}} className="bg-surface rounded-[20px] border border-border p-7">
                  <h3 className="text-sm font-sans font-semibold text-accent tracking-[0.08em] uppercase flex items-center gap-2 mb-5"><span className="w-4 h-px bg-accent"/>Medicação em uso</h3>
                  <div className="flex flex-col gap-3">
                    {MEDICATIONS.map((m,i) => (
                      <div key={i} className="flex items-center gap-4 px-5 py-4 rounded-xl bg-card border border-border">
                        <span className="text-psi-green"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M8.5 8.5l7 7"/><path d="M16.5 4.5a4.95 4.95 0 0 1 0 7l-8 8a4.95 4.95 0 0 1-7-7l8-8a4.95 4.95 0 0 1 7 0z"/></svg></span>
                        <div className="flex-1">
                          <div className="text-sm font-sans font-medium text-text">{m.name}</div>
                          <div className="text-xs text-text-dim font-sans">{m.dose} · Prescrito por {m.prescriber} · Desde {m.since}</div>
                        </div>
                        <span className="text-[11px] font-semibold font-sans px-2.5 py-0.5 rounded-lg bg-psi-green-soft text-psi-green">{m.status}</span>
                      </div>
                    ))}
                  </div>
                  <button className="mt-4 text-xs text-accent font-sans font-medium bg-transparent border-none cursor-pointer">+ Adicionar medicação</button>
                </motion.div>
              )}

              {/* ── CADASTRO ── */}
              {patientTab === "cadastro" && (
                <motion.div key="cad" initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} exit={{opacity:0}} className="bg-surface rounded-[20px] border border-border p-7">
                  <h3 className="text-sm font-sans font-semibold text-accent tracking-[0.08em] uppercase flex items-center gap-2 mb-5"><span className="w-4 h-px bg-accent"/>Dados cadastrais</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      {l:"Nome completo",v:p.name},{l:"E-mail",v:p.email},{l:"Telefone / WhatsApp",v:p.phone},{l:"Data de nascimento",v:"15/06/1998"},
                      {l:"CPF",v:"123.456.789-00"},{l:"Endereço",v:"Rua das Flores, 123 — Savassi, BH/MG"},
                      {l:"Contato de emergência",v:"Maria (mãe) — (31) 99887-6655"},{l:"Convênio",v:"Particular"},
                    ].map(f => (
                      <div key={f.l}>
                        <label className="text-xs font-sans font-semibold text-text-dim uppercase tracking-wide mb-1.5 block">{f.l}</label>
                        <input defaultValue={f.v} className="w-full px-4 py-3 rounded-xl bg-card border border-border text-sm font-sans text-text focus:outline-none focus:border-accent/30 transition-colors"/>
                      </div>
                    ))}
                  </div>
                  <button className="mt-5 px-5 py-2.5 rounded-xl border-none text-sm font-sans font-semibold cursor-pointer text-text" style={{background:"linear-gradient(135deg,var(--c-accent),var(--c-accent))"}}>Salvar cadastro</button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    );
  }

  // ── LISTING ──
  return (
    <div className="max-w-[1100px]">
      <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} className="flex justify-between items-end mb-7">
        <div>
          <span className="text-xs font-sans font-semibold text-accent tracking-[0.1em] uppercase">Gestão</span>
          <h1 className="text-4xl font-serif italic text-text font-normal mt-1">Clientes</h1>
        </div>
        <button className="px-5 py-2.5 rounded-xl bg-accent-soft border border-accent/20 text-accent text-sm font-sans font-semibold cursor-pointer">+ Adicionar cliente</button>
      </motion.div>

      <div className="flex gap-1 bg-surface rounded-xl p-[3px] border border-border mb-6 w-fit">
        {[{key:"listagem",label:"Clientes"},{key:"espera",label:"Lista de Espera"},{key:"grupos",label:"Grupos"}].map(t => (
          <motion.button key={t.key} whileTap={{scale:0.95}} onClick={() => setTab(t.key)}
            className="px-5 py-2 rounded-[9px] border-none text-[13px] font-medium font-sans cursor-pointer transition-all duration-300"
            style={{background:tab===t.key?"var(--c-accent-soft)":"transparent",color:tab===t.key?"var(--c-accent)":"var(--c-text-dim)"}}>{t.label}</motion.button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {tab === "listagem" && (
          <motion.div key="list" initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} exit={{opacity:0}}>
            {/* Search + Filters */}
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl flex-1 max-w-[320px] transition-colors"
                style={{background:"var(--c-surface)",border:"1px solid var(--c-border)"}}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--c-text-dim)" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Buscar paciente..."
                  className="bg-transparent border-none outline-none text-sm font-sans flex-1" style={{color:"var(--c-text)"}} />
                {search && <button onClick={() => setSearch("")} className="text-xs bg-transparent border-none cursor-pointer" style={{color:"var(--c-text-dim)"}}>✕</button>}
              </div>
              <div className="flex gap-1.5">
                {[
                  {key:"Todos",count:PATIENTS.length},
                  {key:"Ativo",count:PATIENTS.filter(p=>p.status==="Ativo").length},
                  {key:"Inativo",count:PATIENTS.filter(p=>p.status==="Inativo").length},
                  {key:"Desistente",count:PATIENTS.filter(p=>p.status==="Desistente").length},
                ].map(f => (
                  <button key={f.key} onClick={() => setStatusFilter(f.key)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-sans font-medium cursor-pointer border-none transition-all duration-200"
                    style={{
                      background:statusFilter===f.key?"var(--c-accent-soft)":"transparent",
                      color:statusFilter===f.key?"var(--c-accent)":"var(--c-text-dim)",
                    }}>
                    {f.key === "Todos" ? f.key : f.key}
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full" style={{
                      background:statusFilter===f.key?"var(--c-accent-soft)":"var(--c-card)",
                      color:statusFilter===f.key?"var(--c-accent)":"var(--c-text-dim)",
                    }}>{f.count}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Table */}
            <div className="rounded-[20px] border overflow-hidden" style={{background:"var(--c-surface)",borderColor:"var(--c-border)"}}>
              <div className="grid grid-cols-[2.5fr_70px_70px_1.2fr_90px_70px] px-6 py-3" style={{borderBottom:"1px solid var(--c-border)"}}>
                {["Nome","Status","Recência","Próxima sessão","Débito","Sess."].map(h =>
                  <span key={h} className="text-[10px] font-sans font-semibold uppercase tracking-[0.06em]" style={{color:"var(--c-text-dim)"}}>{h}</span>
                )}
              </div>
              {PATIENTS
                .filter(p => statusFilter === "Todos" || p.status === statusFilter)
                .filter(p => !search || p.name.toLowerCase().includes(search.toLowerCase()))
                .map((p,i) => {
                  const recencyColor = p.daysSince <= 7 ? "var(--c-green)" : p.daysSince <= 21 ? "var(--c-accent)" : "var(--c-rose)";
                  const recencyBg = p.daysSince <= 7 ? "var(--c-green-soft)" : p.daysSince <= 21 ? "var(--c-accent-soft)" : "var(--c-rose-soft)";
                  const recencyLabel = p.daysSince === 0 ? "Nova" : p.daysSince <= 7 ? `${p.daysSince}d` : p.daysSince <= 21 ? `${p.daysSince}d` : `${p.daysSince}d`;
                  return (
                    <motion.div key={i} initial={{opacity:0}} animate={{opacity:1}} transition={{delay:i*0.03}}
                      className="grid grid-cols-[2.5fr_70px_70px_1.2fr_90px_70px] px-6 py-3 items-center cursor-pointer transition-colors group relative"
                      style={{borderBottom:"1px solid var(--c-border)",background:"transparent"}}
                      onClick={() => setSelectedPatient(p.name)}
                      onMouseEnter={e => (e.currentTarget.style.background = "var(--c-surface-hover)")}
                      onMouseLeave={e => (e.currentTarget.style.background = "transparent")}>
                      {/* Name + avatar + recency dot */}
                      <div className="flex items-center gap-3">
                        <div className="relative flex-shrink-0">
                          <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-serif italic"
                            style={{background:"var(--c-accent-soft)",color:"var(--c-accent)"}}>{p.name.charAt(0)}</div>
                        </div>
                        <span className="text-sm font-sans font-medium" style={{color:"var(--c-text)"}}>{p.name}</span>
                      </div>
                      {/* Status */}
                      <span className="text-[11px] font-semibold font-sans px-2 py-0.5 rounded-lg w-fit" style={{color:sc[p.status]?.color,background:sc[p.status]?.bg}}>{p.status}</span>
                      {/* Recency indicator */}
                      <div className="flex items-center gap-1.5">
                        <div className="w-2 h-2 rounded-full flex-shrink-0" style={{background:recencyColor}} />
                        <span className="text-[11px] font-sans font-medium" style={{color:recencyColor}}>{recencyLabel}</span>
                      </div>
                      {/* Next session */}
                      <span className="text-sm font-sans" style={{color:"var(--c-text-dim)"}}>{p.nextSession}</span>
                      {/* Debt */}
                      {p.debt > 0 ? (
                        <span className="text-[12px] font-sans font-semibold" style={{color:"var(--c-rose)"}}>R$ {p.debt}</span>
                      ) : (
                        <span className="text-[11px] font-sans" style={{color:"var(--c-text-dim)"}}>—</span>
                      )}
                      {/* Sessions */}
                      <span className="text-sm font-sans font-medium" style={{color:"var(--c-text-muted)"}}>{p.sessions}</span>
                      {/* Hover actions */}
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <motion.button whileHover={{scale:1.1}} whileTap={{scale:0.9}}
                          onClick={e => {e.stopPropagation();}}
                          className="w-8 h-8 rounded-lg flex items-center justify-center cursor-pointer border-none" title="WhatsApp"
                          style={{background:"#25D36618",color:"#25D366"}}>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/></svg>
                        </motion.button>
                        <motion.button whileHover={{scale:1.1}} whileTap={{scale:0.9}}
                          onClick={e => {e.stopPropagation();}}
                          className="w-8 h-8 rounded-lg flex items-center justify-center cursor-pointer border-none" title="Agendar"
                          style={{background:"var(--c-accent-soft)",color:"var(--c-accent)"}}>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                        </motion.button>
                        <motion.button whileHover={{scale:1.1}} whileTap={{scale:0.9}}
                          onClick={e => {e.stopPropagation();setSelectedPatient(p.name);}}
                          className="w-8 h-8 rounded-lg flex items-center justify-center cursor-pointer border-none" title="Prontuário"
                          style={{background:"var(--c-blue-soft)",color:"var(--c-blue)"}}>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                        </motion.button>
                      </div>
                    </motion.div>
                  );
                })}
              {/* Empty state */}
              {PATIENTS
                .filter(p => statusFilter === "Todos" || p.status === statusFilter)
                .filter(p => !search || p.name.toLowerCase().includes(search.toLowerCase()))
                .length === 0 && (
                  <div className="px-6 py-12 text-center">
                    <p className="text-sm font-sans" style={{color:"var(--c-text-dim)"}}>Nenhum paciente encontrado.</p>
                  </div>
                )}
            </div>
          </motion.div>
        )}
        {tab === "espera" && (
          <motion.div key="esp" initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} exit={{opacity:0}} className="bg-surface rounded-[20px] border border-border overflow-hidden">
            <div className="grid grid-cols-[2fr_1.5fr_1fr_1fr_120px] px-6 py-3 border-b border-border">
              {["Nome","Especialidade","Desde","Prioridade","Ação"].map(h => <span key={h} className="text-[11px] font-sans font-semibold text-text-dim uppercase tracking-[0.06em]">{h}</span>)}
            </div>
            {WAIT_LIST.map((w,i) => (
              <div key={i} className="grid grid-cols-[2fr_1.5fr_1fr_1fr_120px] px-6 py-3.5 border-b border-border/30 hover:bg-surface-hover transition-colors items-center">
                <span className="text-sm font-sans font-medium text-text">{w.name}</span><span className="text-sm text-text-dim font-sans">{w.specialty}</span>
                <span className="text-sm text-text-dim font-sans">{w.since}</span>
                <span className="text-[11px] font-semibold font-sans px-2.5 py-0.5 rounded-lg w-fit" style={{color:pc[w.priority]?.color,background:pc[w.priority]?.bg}}>{w.priority}</span>
                <button className="text-xs text-accent font-sans font-medium border border-accent/20 rounded-lg px-3 py-1.5 cursor-pointer bg-transparent">Notificar</button>
              </div>
            ))}
          </motion.div>
        )}
        {tab === "grupos" && (
          <motion.div key="grp" initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} exit={{opacity:0}} className="bg-surface rounded-[20px] border border-border overflow-hidden">
            <div className="grid grid-cols-[80px_2fr_1fr_1.5fr_80px] px-6 py-3 border-b border-border">
              {["ID","Nome","Tipo","Profissional","Memb."].map(h => <span key={h} className="text-[11px] font-sans font-semibold text-text-dim uppercase tracking-[0.06em]">{h}</span>)}
            </div>
            {GROUPS.map((g,i) => (
              <div key={i} className="grid grid-cols-[80px_2fr_1fr_1.5fr_80px] px-6 py-3.5 border-b border-border/30 hover:bg-surface-hover transition-colors items-center cursor-pointer">
                <span className="text-sm text-text-dim font-sans">{g.id}</span><span className="text-sm font-sans font-medium text-text">{g.name}</span>
                <span className="text-[11px] font-sans font-semibold px-2.5 py-0.5 rounded-lg w-fit bg-psi-blue-soft text-psi-blue">{g.type}</span>
                <span className="text-sm text-text-dim font-sans">{g.professional}</span><span className="text-sm text-text-muted font-sans font-medium">{g.members}</span>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
