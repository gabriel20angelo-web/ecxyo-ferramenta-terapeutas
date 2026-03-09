"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ── SVG ICONS ──
const Icons = {
  calendar: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  ),
  chevronLeft: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="15 18 9 12 15 6" />
    </svg>
  ),
  chevronRight: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 18 15 12 9 6" />
    </svg>
  ),
  clock: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  ),
  alert: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  ),
  check: (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  ),
  checkCircle: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  ),
  wallet: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="1" y="5" width="22" height="16" rx="2" ry="2" />
      <path d="M1 10h22" />
    </svg>
  ),
  trendingUp: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
      <polyline points="17 6 23 6 23 12" />
    </svg>
  ),
  trendingDown: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="23 18 13.5 8.5 8.5 13.5 1 6" />
      <polyline points="17 18 23 18 23 12" />
    </svg>
  ),
  clipboardList: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
      <line x1="12" y1="11" x2="12" y2="17" />
      <line x1="9" y1="14" x2="15" y2="14" />
    </svg>
  ),
  listTodo: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="5" width="4" height="4" rx="1" />
      <rect x="3" y="15" width="4" height="4" rx="1" />
      <line x1="11" y1="7" x2="21" y2="7" />
      <line x1="11" y1="17" x2="21" y2="17" />
    </svg>
  ),
};

// ── MOCK DATA ──
type Session = {
  patient: string;
  initials: string;
  color: string;
  time: string;
  end: string;
  type: "individual" | "couple" | "group";
  payment: "pago" | "parcial" | "pagar" | "isento";
  note: string;
};

const SESSIONS_BY_DAY: Record<string, { label: string; weekday: string; sessions: Session[] }> = {
  hoje: {
    label: "10 de Março",
    weekday: "Segunda-feira",
    sessions: [
      { patient: "Lucas Mendonça", initials: "LM", color: "var(--c-green)", time: "07:00", end: "07:50", type: "individual", payment: "pago", note: "12ª sessão" },
      { patient: "Ana Beatriz Souza", initials: "AB", color: "var(--c-blue)", time: "08:00", end: "08:50", type: "individual", payment: "pago", note: "Vínculo terapêutico" },
      { patient: "Rafael & Camila", initials: "RC", color: "var(--c-couple)", time: "09:00", end: "10:20", type: "couple", payment: "parcial", note: "Comunicação" },
      { patient: "Juliana Ferreira", initials: "JF", color: "var(--c-accent)", time: "14:00", end: "14:50", type: "individual", payment: "pagar", note: "1ª sessão" },
      { patient: "Thiago Akira", initials: "TA", color: "var(--c-green)", time: "15:00", end: "15:50", type: "individual", payment: "isento", note: "Grounding" },
      { patient: "Grupo Gestantes", initials: "GG", color: "var(--c-blue)", time: "16:00", end: "17:30", type: "group", payment: "pago", note: "Encontro 8/12" },
      { patient: "Mariana Costa", initials: "MC", color: "var(--c-rose)", time: "18:00", end: "18:50", type: "individual", payment: "pagar", note: "Reagendar?" },
    ],
  },
  amanha: {
    label: "11 de Março",
    weekday: "Terça-feira",
    sessions: [
      { patient: "Pedro Henrique", initials: "PH", color: "var(--c-green)", time: "07:00", end: "07:50", type: "individual", payment: "pago", note: "Sessão regular" },
      { patient: "Carla Santos", initials: "CS", color: "var(--c-accent)", time: "08:00", end: "08:50", type: "individual", payment: "pago", note: "Retorno" },
      { patient: "Beatriz Lima", initials: "BL", color: "var(--c-couple)", time: "09:00", end: "09:50", type: "individual", payment: "pago", note: "Ansiedade social" },
      { patient: "Grupo Leitura", initials: "GL", color: "var(--c-blue)", time: "14:00", end: "15:30", type: "group", payment: "pago", note: "Cap. 4 Van der Kolk" },
      { patient: "Fernanda Moura", initials: "FM", color: "var(--c-green)", time: "16:00", end: "16:50", type: "individual", payment: "parcial", note: "Acompanhamento" },
    ],
  },
  depois: {
    label: "12 de Março",
    weekday: "Quarta-feira",
    sessions: [
      { patient: "Lucas Mendonça", initials: "LM", color: "var(--c-green)", time: "08:00", end: "08:50", type: "individual", payment: "pago", note: "Exposição gradual" },
      { patient: "Roberto Almeida", initials: "RA", color: "var(--c-accent)", time: "09:00", end: "09:50", type: "individual", payment: "pago", note: "Sessão regular" },
      { patient: "Ana Beatriz Souza", initials: "AB", color: "var(--c-blue)", time: "14:00", end: "14:50", type: "individual", payment: "pagar", note: "Retorno" },
      { patient: "Marcos Vinicius", initials: "MV", color: "var(--c-rose)", time: "15:00", end: "15:50", type: "individual", payment: "isento", note: "Social" },
    ],
  },
};

type Pendencia = { id: number; date: string; text: string; selected: boolean };
const INITIAL_PENDENCIAS: Pendencia[] = [
  { id: 1, date: "10/03", text: "Juliana Ferreira solicitou agendamento para 11/03 às 09:30", selected: false },
  { id: 2, date: "10/03", text: "Mariana Costa cancelou sessão de hoje às 18:00 — reagendar", selected: false },
  { id: 3, date: "09/03", text: "Pedro Henrique se cadastrou usando o link de agendamento", selected: false },
  { id: 4, date: "08/03", text: "Devolutiva de avaliação pendente — Bernardo Costa", selected: false },
  { id: 5, date: "07/03", text: "Laudo psicológico de Alessandra vence em 15 dias", selected: false },
];

type Tarefa = { id: number; text: string; done: boolean; category: string };
const INITIAL_TAREFAS: Tarefa[] = [
  { id: 1, text: "Ler cap. 3 — Van der Kolk", done: false, category: "Estudo" },
  { id: 2, text: "Preencher prontuário Aline Pimentel", done: false, category: "Admin" },
  { id: 3, text: "Preparar material grupo gestantes", done: false, category: "Clínico" },
  { id: 4, text: "Agendar retorno com psiquiatra (Lucas)", done: false, category: "Encam." },
  { id: 5, text: "Pesquisar artigo exposição gradual", done: true, category: "Estudo" },
  { id: 6, text: "Responder e-mail supervisora", done: true, category: "Admin" },
];

const CHART_DATA = [
  { month: "Out", receita: 4800, despesa: 920 },
  { month: "Nov", receita: 5200, despesa: 880 },
  { month: "Dez", receita: 4500, despesa: 1050 },
  { month: "Jan", receita: 5100, despesa: 900 },
  { month: "Fev", receita: 5987, despesa: 987 },
  { month: "Mar", receita: 3200, despesa: 650 },
];

// ── PAYMENT BADGE ──
const paymentConfig: Record<string, { label: string; color: string; bg: string; icon: React.ReactNode }> = {
  pago: {
    label: "Pago", color: "var(--c-green)", bg: "var(--c-green-soft)",
    icon: <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--c-green)" strokeWidth="3" strokeLinecap="round"><polyline points="20 6 9 17 4 12" /></svg>,
  },
  parcial: {
    label: "Parcial", color: "var(--c-accent)", bg: "var(--c-accent-soft)",
    icon: <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--c-accent)" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>,
  },
  pagar: {
    label: "A pagar", color: "var(--c-rose)", bg: "var(--c-rose-soft)",
    icon: <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--c-rose)" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>,
  },
  isento: {
    label: "Isento", color: "var(--c-text-muted)", bg: "var(--c-text-dim)",
    icon: <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--c-text-muted)" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10" /><line x1="8" y1="12" x2="16" y2="12" /></svg>,
  },
};

const WEEK_OVERVIEW = [
  { day: "Seg", sessions: 7, date: "10" },
  { day: "Ter", sessions: 5, date: "11" },
  { day: "Qua", sessions: 4, date: "12" },
  { day: "Qui", sessions: 6, date: "13" },
  { day: "Sex", sessions: 5, date: "14" },
];

type SmartAlert = { icon: React.ReactNode; text: string; time: string; color: string; bg: string; patient?: string };
const SMART_ALERTS: SmartAlert[] = [
  {
    icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>,
    text: "Mariana Costa cancelou às 18:00 — Laura Mendes (lista de espera) se encaixa nesse horário",
    time: "há 2h", color: "var(--c-rose)", bg: "var(--c-rose-soft)", patient: "Mariana Costa",
  },
  {
    icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
    text: "Bernardo Costa sem sessão há 22 dias — considerar contato ativo",
    time: "risco", color: "var(--c-accent)", bg: "var(--c-accent-soft)", patient: "Bernardo Costa",
  },
  {
    icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>,
    text: "Laudo psicológico de Alessandra vence em 5 dias",
    time: "prazo", color: "var(--c-blue)", bg: "var(--c-blue-soft)",
  },
];

// ── COMPONENT ──
type Props = { onNavigateToPatient?: (name: string) => void };

export function DashboardPage({ onNavigateToPatient }: Props) {
  const [activeDay, setActiveDay] = useState<"hoje" | "amanha" | "depois">("hoje");
  const [pendencias, setPendencias] = useState(INITIAL_PENDENCIAS);
  const [tarefas, setTarefas] = useState(INITIAL_TAREFAS);
  const [newTarefa, setNewTarefa] = useState("");
  const [bottomTab, setBottomTab] = useState<"pendencias" | "tarefas">("pendencias");
  const [confirmed, setConfirmed] = useState<Set<string>>(new Set());
  const [whatsappModal, setWhatsappModal] = useState<{patient:string;phone:string;time:string;day:string}|null>(null);
  const [msgTemplate, setMsgTemplate] = useState("Olá, {nome}! 😊\n\nPassando pra confirmar sua sessão de amanhã, {dia}, às {horario}.\n\nTudo certo pra você? Se precisar remarcar, me avise com antecedência.\n\nAbraço,\nDra. Marina");

  const PATIENT_PHONES: Record<string,string> = {
    "Lucas Mendonça":"+5531987654321","Ana Beatriz Souza":"+5531912345678","Rafael & Camila":"+5531998761234",
    "Juliana Ferreira":"+5531945678901","Thiago Akira":"+5531934567890","Grupo Gestantes":"+5531900000000",
    "Mariana Costa":"+5531923456789","Pedro Henrique":"+5531988776655","Carla Santos":"+5531944332211",
    "Beatriz Lima":"+5531977665544","Fernanda Moura":"+5531944332211","Roberto Almeida":"+5531955667788",
  };

  const buildMessage = (patient:string, time:string, day:string) => {
    return msgTemplate.replace("{nome}", patient.split(" ")[0]).replace("{dia}", day).replace("{horario}", time);
  };

  const handleConfirm = (patient:string, time:string, e:React.MouseEvent) => {
    e.stopPropagation();
    const dayLabel = activeDay === "hoje" ? dayData.weekday + ", " + dayData.label : dayData.weekday + ", " + dayData.label;
    setWhatsappModal({ patient, phone: PATIENT_PHONES[patient] || "+55319999999999", time, day: dayLabel });
  };

  const sendWhatsApp = () => {
    if (!whatsappModal) return;
    const msg = buildMessage(whatsappModal.patient, whatsappModal.time, whatsappModal.day);
    const url = `https://wa.me/${whatsappModal.phone.replace(/\D/g,"")}?text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank");
    setConfirmed(prev => new Set(prev).add(`${activeDay}-${whatsappModal.patient}`));
    setWhatsappModal(null);
  };

  const dayData = SESSIONS_BY_DAY[activeDay];
  const dayKeys: ("hoje" | "amanha" | "depois")[] = ["hoje", "amanha", "depois"];
  const dayIdx = dayKeys.indexOf(activeDay);

  // Next session (first of today)
  const nextSession = SESSIONS_BY_DAY.hoje.sessions[0];
  const nextCountdown = "23 min";
  const nextSessionPreNote = "Retomar técnica de grounding. Verificar padrão de sono.";

  const togglePendencia = (id: number) => {
    setPendencias((prev) => prev.map((p) => (p.id === id ? { ...p, selected: !p.selected } : p)));
  };
  const toggleTarefa = (id: number) => {
    setTarefas((prev) => prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  };
  const dismissSelected = () => {
    setPendencias((prev) => prev.filter((p) => !p.selected));
  };

  const maxChart = Math.max(...CHART_DATA.map((d) => d.receita));

  return (
    <div className="max-w-[1200px]">
      {/* ── HEADER ── */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <span className="text-xs font-sans font-semibold text-accent tracking-[0.1em] uppercase">
          {dayData.weekday}, {dayData.label}
        </span>
        <h1 className="text-4xl font-serif italic text-text font-normal mt-1">Bom dia, Marina</h1>
      </motion.div>

      {/* ── PRÓXIMA SESSÃO ── */}
      <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }}
        className="mb-6 rounded-[20px] border overflow-hidden"
        style={{ background: "var(--c-surface)", borderColor: "var(--c-accent-soft)" }}>
        <div className="flex items-stretch">
          {/* Left accent bar */}
          <div className="w-1.5 flex-shrink-0" style={{ background: "var(--c-accent)" }} />
          <div className="flex-1 p-5 flex items-center gap-5">
            {/* Avatar */}
            <div className="w-14 h-14 rounded-full flex items-center justify-center text-base font-sans font-bold flex-shrink-0"
              style={{ background: "var(--c-green-soft)", color: "var(--c-green)" }}>
              {nextSession.initials}
            </div>
            {/* Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2.5">
                <span className="text-[10px] font-sans font-semibold uppercase tracking-[0.1em]" style={{ color: "var(--c-accent)" }}>Próxima sessão</span>
                <span className="text-[11px] font-sans font-semibold px-2.5 py-1 rounded-full flex items-center gap-1.5" style={{ background: "var(--c-accent-soft)", color: "var(--c-accent)" }}>
                  {Icons.clock} em {nextCountdown}
                </span>
              </div>
              <h2 className="text-xl font-serif italic mt-1" style={{ color: "var(--c-text)" }}>{nextSession.patient}</h2>
              <div className="flex items-center gap-3 mt-1">
                <span className="text-xs font-sans flex items-center gap-1" style={{ color: "var(--c-text-dim)" }}>
                  {Icons.clock} {nextSession.time} — {nextSession.end}
                </span>
                {nextSessionPreNote && (
                  <span className="text-xs font-sans" style={{ color: "var(--c-text-muted)" }}>
                    {nextSessionPreNote}
                  </span>
                )}
              </div>
            </div>
            {/* Actions */}
            <div className="flex gap-2 flex-shrink-0">
              <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                onClick={() => onNavigateToPatient?.(nextSession.patient)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-sans font-semibold cursor-pointer border-none"
                style={{ background: "var(--c-accent)", color: "var(--c-bg)" }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                Abrir prontuário
              </motion.button>
              <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-sans font-semibold cursor-pointer"
                style={{ background: "var(--c-green-soft)", color: "var(--c-green)", border: "1px solid var(--c-green-soft)" }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                Iniciar sessão
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ── ALERTAS + SEMANA ── */}
      <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12 }}
        className="grid grid-cols-[1fr_auto] gap-5 mb-6">

        {/* Alertas inteligentes */}
        <div className="flex flex-col gap-2">
          {SMART_ALERTS.map((a, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 + i * 0.05 }}
              className="flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-colors"
              style={{ background: "var(--c-surface)", border: "1px solid var(--c-border)" }}
              onClick={() => a.patient && onNavigateToPatient?.(a.patient)}>
              <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ background: a.bg, color: a.color }}>
                {a.icon}
              </div>
              <p className="text-[13px] font-sans flex-1" style={{ color: "var(--c-text)" }}>{a.text}</p>
              <span className="text-[10px] font-sans flex-shrink-0" style={{ color: "var(--c-text-dim)" }}>{a.time}</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--c-text-dim)" strokeWidth="2" strokeLinecap="round"><polyline points="9 18 15 12 9 6"/></svg>
            </motion.div>
          ))}
        </div>

        {/* Mini-resumo da semana */}
        <div className="rounded-[16px] p-4 flex flex-col gap-2 min-w-[260px]"
          style={{ background: "var(--c-surface)", border: "1px solid var(--c-border)" }}>
          <div className="flex items-center gap-2 mb-1">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--c-accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
            </svg>
            <span className="text-[10px] font-sans font-semibold uppercase tracking-[0.1em]" style={{ color: "var(--c-accent)" }}>Semana</span>
          </div>
          <div className="flex gap-2">
            {WEEK_OVERVIEW.map((d, i) => {
              const fill = d.sessions / 8;
              const isToday = d.day === "Seg";
              return (
                <div key={i} className="flex-1 flex flex-col items-center gap-1.5">
                  <span className="text-[10px] font-sans font-semibold" style={{ color: isToday ? "var(--c-accent)" : "var(--c-text-dim)" }}>{d.day}</span>
                  {/* Bar */}
                  <div className="w-full h-16 rounded-md overflow-hidden relative" style={{ background: "var(--c-card)" }}>
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: `${fill * 100}%` }}
                      transition={{ delay: 0.3 + i * 0.06, duration: 0.5, ease: "easeOut" }}
                      className="absolute bottom-0 left-0 right-0 rounded-md"
                      style={{
                        background: isToday
                          ? "linear-gradient(to top, var(--c-accent-soft), var(--c-accent))"
                          : fill > 0.7
                          ? "var(--c-green)"
                          : "var(--c-green-soft)",
                        opacity: isToday ? 1 : fill > 0.7 ? 0.7 : 0.5,
                      }}
                    />
                  </div>
                  <span className="text-[11px] font-sans font-semibold" style={{ color: isToday ? "var(--c-accent)" : "var(--c-text-muted)" }}>{d.sessions}</span>
                </div>
              );
            })}
          </div>
        </div>
      </motion.div>

      {/* ── MAIN GRID: Left (sessions + bottom) | Right (financial) ── */}
      <div className="grid grid-cols-[1fr_340px] gap-6">
        {/* ═══ LEFT COLUMN ═══ */}
        <div className="flex flex-col gap-6">
          {/* ── SESSIONS SECTION ── */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-surface rounded-[20px] border border-border overflow-hidden"
          >
            {/* Day navigator */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-border">
              <div className="flex items-center gap-3">
                <span className="text-accent">{Icons.calendar}</span>
                <h2 className="text-sm font-sans font-semibold text-accent tracking-[0.08em] uppercase">
                  Sessões — {activeDay === "hoje" ? "Hoje" : activeDay === "amanha" ? "Amanhã" : "Depois de amanhã"}
                </h2>
                <span className="text-xs text-text-dim font-sans ml-1">
                  {dayData.sessions.length} sessões
                </span>
              </div>
              <div className="flex items-center gap-1">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  disabled={dayIdx === 0}
                  onClick={() => setActiveDay(dayKeys[dayIdx - 1])}
                  className="w-8 h-8 rounded-lg flex items-center justify-center cursor-pointer border-none transition-colors"
                  style={{
                    background: dayIdx === 0 ? "transparent" : "var(--c-border)",
                    color: dayIdx === 0 ? "var(--c-border)" : "var(--c-text-muted)",
                    opacity: dayIdx === 0 ? 0.3 : 1,
                  }}
                >
                  {Icons.chevronLeft}
                </motion.button>
                {dayKeys.map((dk) => (
                  <motion.button
                    key={dk}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setActiveDay(dk)}
                    className="px-3.5 py-1.5 rounded-lg border-none text-xs font-sans font-medium cursor-pointer transition-all duration-200"
                    style={{
                      background: activeDay === dk ? "var(--c-accent-soft)" : "transparent",
                      color: activeDay === dk ? "var(--c-accent)" : "var(--c-text-dim)",
                    }}
                  >
                    {dk === "hoje" ? "Hoje" : dk === "amanha" ? "Amanhã" : "Depois"}
                  </motion.button>
                ))}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  disabled={dayIdx === 2}
                  onClick={() => setActiveDay(dayKeys[dayIdx + 1])}
                  className="w-8 h-8 rounded-lg flex items-center justify-center cursor-pointer border-none transition-colors"
                  style={{
                    background: dayIdx === 2 ? "transparent" : "var(--c-border)",
                    color: dayIdx === 2 ? "var(--c-border)" : "var(--c-text-muted)",
                    opacity: dayIdx === 2 ? 0.3 : 1,
                  }}
                >
                  {Icons.chevronRight}
                </motion.button>
              </div>
            </div>

            {/* Session list */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeDay}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.25 }}
              >
                {dayData.sessions.map((s, i) => {
                  const pm = paymentConfig[s.payment];
                  return (
                    <motion.div
                      key={`${activeDay}-${i}`}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.04, duration: 0.3 }}
                      onClick={() => onNavigateToPatient?.(s.patient)}
                      className="flex items-center gap-4 px-6 py-3.5 border-b border-border/30 last:border-0 hover:bg-surface-hover transition-colors cursor-pointer group"
                    >
                      {/* Avatar */}
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-sans font-bold flex-shrink-0 transition-transform duration-200 group-hover:scale-105"
                        style={{ background: `${s.color}20`, color: s.color }}
                      >
                        {s.initials}
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <span className="text-sm font-sans font-medium text-text truncate group-hover:text-accent transition-colors block">
                          {s.patient}
                        </span>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <span className="text-text-dim">{Icons.clock}</span>
                          <span className="text-xs text-text-dim font-sans">
                            {s.time} — {s.end}
                          </span>
                        </div>
                      </div>

                      {/* Confirm + Payment */}
                      <div className="flex items-center gap-2 flex-shrink-0">
                        {confirmed.has(`${activeDay}-${s.patient}`) ? (
                          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg"
                            style={{ background: "var(--c-green-soft)", color: "var(--c-green)" }}>
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
                            <span className="text-[11px] font-sans font-semibold">Confirmado</span>
                          </div>
                        ) : (
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={(e) => handleConfirm(s.patient, s.time, e)}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg cursor-pointer border-none transition-all duration-200 opacity-0 group-hover:opacity-100"
                            style={{ background: "#25D36618", color: "#25D366" }}>
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/></svg>
                            <span className="text-[11px] font-sans font-semibold">Confirmar</span>
                          </motion.button>
                        )}
                        <div
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg"
                          style={{ background: pm.bg, color: pm.color }}
                        >
                          {pm.icon}
                          <span className="text-[11px] font-sans font-semibold">{pm.label}</span>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            </AnimatePresence>
          </motion.section>

          {/* ── PENDÊNCIAS / TAREFAS (toggle único) ── */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="bg-surface rounded-[20px] border border-border overflow-hidden"
          >
            {/* Header with toggle */}
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-border">
              <div className="flex items-center gap-1 bg-card rounded-lg p-[3px]">
                <button
                  onClick={() => setBottomTab("pendencias")}
                  className="flex items-center gap-2 px-3.5 py-1.5 rounded-md border-none text-xs font-sans font-semibold cursor-pointer transition-all duration-200"
                  style={{
                    background: bottomTab === "pendencias" ? "var(--c-rose-soft)" : "transparent",
                    color: bottomTab === "pendencias" ? "var(--c-rose)" : "var(--c-text-dim)",
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
                  </svg>
                  Pendências
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full" style={{ background: bottomTab === "pendencias" ? "var(--c-rose-soft)" : "var(--c-border)", color: bottomTab === "pendencias" ? "var(--c-rose)" : "var(--c-text-dim)" }}>
                    {pendencias.length}
                  </span>
                </button>
                <button
                  onClick={() => setBottomTab("tarefas")}
                  className="flex items-center gap-2 px-3.5 py-1.5 rounded-md border-none text-xs font-sans font-semibold cursor-pointer transition-all duration-200"
                  style={{
                    background: bottomTab === "tarefas" ? "var(--c-accent-soft)" : "transparent",
                    color: bottomTab === "tarefas" ? "var(--c-accent)" : "var(--c-text-dim)",
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="5" width="4" height="4" rx="1" /><rect x="3" y="15" width="4" height="4" rx="1" /><line x1="11" y1="7" x2="21" y2="7" /><line x1="11" y1="17" x2="21" y2="17" />
                  </svg>
                  Tarefas
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full" style={{ background: bottomTab === "tarefas" ? "var(--c-accent-soft)" : "var(--c-border)", color: bottomTab === "tarefas" ? "var(--c-accent)" : "var(--c-text-dim)" }}>
                    {tarefas.filter((t) => !t.done).length}
                  </span>
                </button>
              </div>

              {/* Action button */}
              {bottomTab === "pendencias" && pendencias.some((p) => p.selected) && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  onClick={dismissSelected}
                  className="text-[11px] text-accent font-sans font-semibold px-2.5 py-1 rounded-lg bg-accent-soft border border-accent/20 cursor-pointer"
                >
                  Resolver ({pendencias.filter((p) => p.selected).length})
                </motion.button>
              )}
            </div>

            {/* Content */}
            <AnimatePresence mode="wait">
              {bottomTab === "pendencias" ? (
                <motion.div
                  key="pend"
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 8 }}
                  transition={{ duration: 0.2 }}
                  className="max-h-[280px] overflow-y-auto"
                >
                  {pendencias.map((p, i) => (
                    <div
                      key={p.id}
                      className="flex items-start gap-3 px-5 py-3 border-b border-border/20 hover:bg-surface-hover transition-colors cursor-pointer"
                      onClick={() => togglePendencia(p.id)}
                    >
                      <div
                        className="w-[18px] h-[18px] rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-all duration-200"
                        style={{
                          borderColor: p.selected ? "var(--c-accent)" : "var(--c-border)",
                          background: p.selected ? "var(--c-accent-soft)" : "transparent",
                        }}
                      >
                        {p.selected && (
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="var(--c-accent)" strokeWidth="3" strokeLinecap="round">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[13px] text-text font-sans font-light leading-snug">{p.text}</p>
                        <span className="text-[10px] text-text-dim font-sans mt-1 block">{p.date}</span>
                      </div>
                    </div>
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  key="taref"
                  initial={{ opacity: 0, x: 8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -8 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="max-h-[230px] overflow-y-auto">
                    {tarefas.map((t) => (
                      <div
                        key={t.id}
                        className="flex items-center gap-3 px-5 py-2.5 hover:bg-surface-hover transition-colors cursor-pointer"
                        onClick={() => toggleTarefa(t.id)}
                      >
                        <div
                          className="w-[18px] h-[18px] rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-all duration-200"
                          style={{
                            borderColor: t.done ? "var(--c-green)" : "var(--c-border)",
                            background: t.done ? "var(--c-green-soft)" : "transparent",
                          }}
                        >
                          {t.done && (
                            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="var(--c-green)" strokeWidth="3" strokeLinecap="round">
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                          )}
                        </div>
                        <span
                          className="text-[13px] font-sans leading-snug"
                          style={{
                            color: t.done ? "var(--c-text-dim)" : "var(--c-text)",
                            textDecoration: t.done ? "line-through" : "none",
                          }}
                        >
                          {t.text}
                        </span>
                      </div>
                    ))}
                  </div>
                  {/* Add task */}
                  <div className="px-5 py-3 border-t border-border">
                    <div className="flex gap-2">
                      <input
                        value={newTarefa}
                        onChange={(e) => setNewTarefa(e.target.value)}
                        placeholder="Nova tarefa..."
                        onKeyDown={(e) => {
                          if (e.key === "Enter" && newTarefa.trim()) {
                            setTarefas((prev) => [...prev, { id: Date.now(), text: newTarefa.trim(), done: false, category: "Pessoal" }]);
                            setNewTarefa("");
                          }
                        }}
                        className="flex-1 px-3 py-2 rounded-lg bg-card border border-border text-xs font-sans text-text placeholder:text-text-dim focus:outline-none focus:border-accent/30 transition-colors"
                      />
                      <button
                        onClick={() => {
                          if (newTarefa.trim()) {
                            setTarefas((prev) => [...prev, { id: Date.now(), text: newTarefa.trim(), done: false, category: "Pessoal" }]);
                            setNewTarefa("");
                          }
                        }}
                        className="px-3 py-2 rounded-lg bg-accent-soft border border-accent/20 text-accent text-xs font-sans font-semibold cursor-pointer"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.section>
        </div>

        {/* ═══ RIGHT COLUMN — FINANCIAL ═══ */}
        <div className="flex flex-col gap-5">
          {/* Saldo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="bg-surface rounded-[20px] border border-border p-6"
          >
            <div className="flex items-center gap-2.5 mb-4">
              <span className="text-accent">{Icons.wallet}</span>
              <h3 className="text-xs font-sans font-semibold text-accent tracking-[0.08em] uppercase">
                Saldo atual
              </h3>
            </div>
            <div className="text-[36px] font-serif italic text-text leading-none">
              R$ 5.000
            </div>
            <span className="text-[11px] text-text-dim font-sans mt-1 block">Março 2026</span>
          </motion.div>

          {/* Receitas */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-surface rounded-[20px] border border-border p-5"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-psi-green">{Icons.trendingUp}</span>
                <span className="text-xs font-sans font-semibold text-psi-green tracking-[0.06em] uppercase">Receitas</span>
              </div>
              <span className="text-xl font-serif italic text-psi-green">R$ 5.987</span>
            </div>
            <div className="flex gap-2 mt-2">
              <span className="text-[10px] font-sans text-text-dim">Pago: R$ 3.987</span>
              <span className="text-[10px] font-sans text-text-dim">·</span>
              <span className="text-[10px] font-sans text-text-dim">A receber: R$ 2.000</span>
            </div>
          </motion.div>

          {/* Despesas */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="bg-surface rounded-[20px] border border-border p-5"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-psi-rose">{Icons.trendingDown}</span>
                <span className="text-xs font-sans font-semibold text-psi-rose tracking-[0.06em] uppercase">Despesas</span>
              </div>
              <span className="text-xl font-serif italic text-psi-rose">R$ 987</span>
            </div>
            <div className="flex gap-2 mt-2">
              <span className="text-[10px] font-sans text-text-dim">Pago: R$ 787</span>
              <span className="text-[10px] font-sans text-text-dim">·</span>
              <span className="text-[10px] font-sans text-text-dim">A pagar: R$ 200</span>
            </div>
          </motion.div>

          {/* Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-surface rounded-[20px] border border-border p-6"
          >
            <h3 className="text-xs font-sans font-semibold text-accent tracking-[0.08em] uppercase mb-5 flex items-center gap-2">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--c-accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="20" x2="18" y2="10" />
                <line x1="12" y1="20" x2="12" y2="4" />
                <line x1="6" y1="20" x2="6" y2="14" />
              </svg>
              Receitas × Despesas
            </h3>
            <div className="flex items-end gap-2 h-32">
              {CHART_DATA.map((d, i) => {
                const recH = (d.receita / maxChart) * 100;
                const despH = (d.despesa / maxChart) * 100;
                const isCurrent = i === CHART_DATA.length - 1;
                return (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1 group">
                    <div className="flex gap-[2px] items-end w-full h-24 relative">
                      {/* Receita bar */}
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: `${recH}%` }}
                        transition={{ delay: 0.4 + i * 0.06, duration: 0.5, ease: "easeOut" }}
                        className="flex-1 rounded-t-sm transition-opacity"
                        style={{
                          background: isCurrent
                            ? "linear-gradient(to top, var(--c-green-soft), var(--c-green))"
                            : "var(--c-green-soft)",
                        }}
                      />
                      {/* Despesa bar */}
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: `${despH}%` }}
                        transition={{ delay: 0.45 + i * 0.06, duration: 0.5 }}
                        className="flex-1 rounded-t-sm"
                        style={{
                          background: isCurrent
                            ? "linear-gradient(to top, var(--c-rose-soft), var(--c-rose))"
                            : "var(--c-rose-soft)",
                        }}
                      />
                      {/* Tooltip on hover */}
                      <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-card border border-border rounded-lg px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
                        <span className="text-[10px] text-psi-green font-sans font-semibold">
                          R$ {(d.receita / 1000).toFixed(1)}k
                        </span>
                        <span className="text-[10px] text-text-dim font-sans mx-1">·</span>
                        <span className="text-[10px] text-psi-rose font-sans font-semibold">
                          R$ {d.despesa}
                        </span>
                      </div>
                    </div>
                    <span
                      className="text-[10px] font-sans"
                      style={{ color: isCurrent ? "var(--c-accent)" : "var(--c-text-dim)" }}
                    >
                      {d.month}
                    </span>
                  </div>
                );
              })}
            </div>
            {/* Legend */}
            <div className="flex gap-4 mt-4">
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-sm bg-psi-green" />
                <span className="text-[10px] text-text-dim font-sans">Receitas</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-sm bg-psi-rose" />
                <span className="text-[10px] text-text-dim font-sans">Despesas</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── WHATSAPP CONFIRMATION MODAL ── */}
      <AnimatePresence>
        {whatsappModal && (
          <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
            className="fixed inset-0 z-[9998] flex items-center justify-center"
            onClick={() => setWhatsappModal(null)}>
            <div className="absolute inset-0" style={{background:"rgba(0,0,0,0.5)",backdropFilter:"blur(4px)"}} />
            <motion.div initial={{opacity:0,scale:0.95,y:20}} animate={{opacity:1,scale:1,y:0}} exit={{opacity:0,scale:0.95,y:20}}
              className="relative z-10 w-full max-w-[520px] rounded-[24px] overflow-hidden"
              style={{background:"var(--c-surface)",border:"1px solid var(--c-border)",boxShadow:"0 24px 80px var(--c-shadow)"}}
              onClick={e => e.stopPropagation()}>

              {/* Header */}
              <div className="px-7 pt-6 pb-4" style={{borderBottom:"1px solid var(--c-border)"}}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{background:"#25D36618"}}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="#25D366"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/></svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-serif italic" style={{color:"var(--c-text)"}}>Confirmar sessão</h3>
                    <p className="text-xs font-sans" style={{color:"var(--c-text-dim)"}}>
                      Enviar confirmação para <span style={{color:"var(--c-accent)"}}>{whatsappModal.patient}</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Session info */}
              <div className="px-7 py-3" style={{background:"var(--c-card)"}}>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1.5">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--c-text-dim)" strokeWidth="2" strokeLinecap="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/></svg>
                    <span className="text-xs font-sans" style={{color:"var(--c-text-muted)"}}>{whatsappModal.day}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--c-text-dim)" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                    <span className="text-xs font-sans" style={{color:"var(--c-text-muted)"}}>{whatsappModal.time}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--c-text-dim)" strokeWidth="2" strokeLinecap="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72"/></svg>
                    <span className="text-xs font-sans" style={{color:"var(--c-text-muted)"}}>{whatsappModal.phone}</span>
                  </div>
                </div>
              </div>

              {/* Message editor */}
              <div className="px-7 py-5">
                <div className="flex items-center justify-between mb-3">
                  <label className="text-xs font-sans font-semibold uppercase tracking-[0.08em]" style={{color:"var(--c-accent)"}}>Mensagem</label>
                  <div className="flex items-center gap-1 text-[10px] font-sans" style={{color:"var(--c-text-dim)"}}>
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
                    Variáveis: {"{nome}"}, {"{dia}"}, {"{horario}"}
                  </div>
                </div>
                <textarea
                  value={buildMessage(whatsappModal.patient, whatsappModal.time, whatsappModal.day)}
                  onChange={e => {
                    const val = e.target.value;
                    const restored = val
                      .replace(whatsappModal.patient.split(" ")[0], "{nome}")
                      .replace(whatsappModal.day, "{dia}")
                      .replace(whatsappModal.time, "{horario}");
                    setMsgTemplate(restored);
                  }}
                  rows={7}
                  className="w-full px-4 py-3 rounded-xl text-sm font-sans leading-relaxed resize-none focus:outline-none transition-colors"
                  style={{background:"var(--c-card)",border:"1px solid var(--c-border)",color:"var(--c-text)"}}
                />

                {/* Preview bubble */}
                <div className="mt-3 p-4 rounded-xl rounded-bl-sm" style={{background:"#DCF8C6",color:"#111B21"}}>
                  <p className="text-[13px] font-sans leading-relaxed whitespace-pre-line">
                    {buildMessage(whatsappModal.patient, whatsappModal.time, whatsappModal.day)}
                  </p>
                  <div className="flex justify-end mt-1">
                    <span className="text-[10px]" style={{color:"#667781"}}>10:30 ✓✓</span>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="px-7 py-4 flex justify-between items-center" style={{borderTop:"1px solid var(--c-border)"}}>
                <button onClick={() => {
                  setMsgTemplate("Olá, {nome}! 😊\n\nPassando pra confirmar sua sessão de amanhã, {dia}, às {horario}.\n\nTudo certo pra você? Se precisar remarcar, me avise com antecedência.\n\nAbraço,\nDra. Marina");
                }}
                  className="text-xs font-sans cursor-pointer bg-transparent border-none" style={{color:"var(--c-text-dim)"}}>
                  Restaurar padrão
                </button>
                <div className="flex gap-3">
                  <button onClick={() => setWhatsappModal(null)}
                    className="px-5 py-2.5 rounded-xl text-sm font-sans font-medium cursor-pointer bg-transparent transition-colors"
                    style={{border:"1px solid var(--c-border)",color:"var(--c-text-muted)"}}>
                    Cancelar
                  </button>
                  <motion.button whileHover={{scale:1.02}} whileTap={{scale:0.98}} onClick={sendWhatsApp}
                    className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-sans font-semibold cursor-pointer border-none"
                    style={{background:"#25D366",color:"#FFFFFF"}}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/></svg>
                    Enviar pelo WhatsApp
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
