"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ── ICONS ──
const Ic = {
  users: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  cal: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
  dollar: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>,
  book: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>,
  alert: <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>,
  check: <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>,
  edit: <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>,
  search: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
  plus: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
  download: <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>,
  wa: <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/></svg>,
  clipboard: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="8" y="2" width="8" height="4" rx="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/></svg>,
  info: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>,
  target: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>,
  trending: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>,
  msg: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>,
  pin: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="12" y1="17" x2="12" y2="22"/><path d="M5 17h14v-1.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V6h1a2 2 0 0 0 0-4H8a2 2 0 0 0 0 4h1v4.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24z"/></svg>,
  eye: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>,
  refresh: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></svg>,
  globe: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>,
};

// ── DATA ──
const SUPERVISANDOS = [
  {name:"Dra. Marina Alcântara",crp:"CRP 04/58921",specialty:"Psicodinâmica",patients:42,freq:"Quinzenal",since:"Mar/2024",status:"Ativo",nextDate:"18/03",paid:true,phone:"+5531987654321",
   competencias:{manejo:7,vinculo:9,contratransferencia:6,tecnica:7,etica:9},
   alerts:[{text:"Caso Lucas — risco moderado, verificar exposição",type:"risk"},{text:"Sobrecarga: 42 pacientes",type:"warn"}],
   devPlan:[{goal:"Desenvolver confrontação terapêutica",progress:40,status:"Em andamento"},{goal:"Manejo de pacientes borderline",progress:20,status:"Iniciando"},{goal:"Encerramento de processo — altas",progress:60,status:"Em andamento"}]},
  {name:"Dr. Felipe Borges",crp:"CRP 04/31245",specialty:"TCC",patients:35,freq:"Quinzenal",since:"Jun/2024",status:"Ativo",nextDate:"20/03",paid:true,phone:"+5531912345678",
   competencias:{manejo:8,vinculo:6,contratransferencia:5,tecnica:9,etica:8},
   alerts:[{text:"Paciente Sandra — ideação passiva, monitorar",type:"critical"}],
   devPlan:[{goal:"Escuta emocional — acolher antes de resolver",progress:35,status:"Em andamento"},{goal:"Flexibilidade no enquadre",progress:50,status:"Em andamento"}]},
  {name:"Dra. Camila Torres",crp:"CRP 06/89012",specialty:"Gestalt",patients:28,freq:"Mensal",since:"Set/2024",status:"Ativo",nextDate:"25/03",paid:false,phone:"+5531900000000",
   competencias:{manejo:7,vinculo:8,contratransferencia:7,tecnica:6,etica:8},alerts:[],
   devPlan:[{goal:"Trabalho com cadeira vazia",progress:55,status:"Em andamento"}]},
  {name:"Dr. Roberto Lima",crp:"CRP 04/55678",specialty:"Psicanálise",patients:31,freq:"Quinzenal",since:"Jan/2025",status:"Ativo",nextDate:"19/03",paid:true,phone:"+5531955667788",
   competencias:{manejo:6,vinculo:7,contratransferencia:8,tecnica:7,etica:9},alerts:[],
   devPlan:[{goal:"Comunicação de interpretações",progress:45,status:"Em andamento"}]},
  {name:"Dra. Juliana Reis",crp:"CRP 04/44321",specialty:"Sistêmica",patients:18,freq:"Mensal",since:"Ago/2024",status:"Licença",nextDate:"—",paid:false,phone:"+5531944321000",
   competencias:{manejo:5,vinculo:7,contratransferencia:5,tecnica:6,etica:7},alerts:[],devPlan:[]},
];

type CaseNote = {patient:string;theme:string;date:string;notes:string;directives:string;risk:string;followUp:string;followUpDue?:string;followUpDone?:boolean};
const CASE_NOTES: Record<string,CaseNote[]> = {
  "Dra. Marina Alcântara": [
    {patient:"Lucas Mendonça",theme:"Exposição gradual — ansiedade social",date:"04/03/2026",notes:"Supervisanda relata progresso no grounding, mas resistência à exposição. Paciente evita situações no trabalho.",directives:"Iniciar exposição hierárquica: 1) almoçar com colega, 2) reunião pequena, 3) apresentação.",risk:"Moderado — atenção à aliança",followUp:"Verificar se iniciou exposição",followUpDue:"18/03",followUpDone:false},
    {patient:"Rafael & Camila (casal)",theme:"Dinâmica de poder no casal",date:"04/03/2026",notes:"Padrão perseguidor-distanciador. Marina identificou mas precisa cuidar da aliança com ambos.",directives:"Usar linguagem sistêmica. Reformular queixas como necessidades.",risk:"Baixo",followUp:"Pedir feedback de ambos sobre aliança",followUpDue:"18/03",followUpDone:false},
    {patient:"Abrana Peixoto",theme:"Transferência paterna",date:"18/02/2026",notes:"Caso complexo. Transferência paterna evidente. Marina fica 'maternalizada'.",directives:"Manter registro de contratransferência. Evitar reasseguramento excessivo.",risk:"Baixo",followUp:"Revisitar contratransferência",followUpDue:"04/03",followUpDone:true},
  ],
  "Dr. Felipe Borges": [
    {patient:"Sandra Almeida",theme:"Reestruturação cognitiva — depressão",date:"06/03/2026",notes:"Felipe relata dificuldade com paciente que intelectualiza. Discutimos downward arrow.",directives:"Alternar registro de pensamentos com cadeira vazia. Explorar emoção no aqui-agora.",risk:"Moderado — ideação passiva",followUp:"Monitorar ideação. Protocolo de segurança.",followUpDue:"20/03",followUpDone:false},
    {patient:"Miguel Santos",theme:"TDAH adulto — adesão",date:"06/03/2026",notes:"Paciente faltou 3 sessões. Felipe frustrado.",directives:"Sessões mais curtas (30min). Lembrete WhatsApp 2h antes.",risk:"Alto — risco de abandono",followUp:"Se faltar próxima, contato ativo",followUpDue:"13/03",followUpDone:false},
  ],
  "Dra. Camila Torres": [
    {patient:"Flávia Costa",theme:"Luto complicado — 18 meses",date:"25/02/2026",notes:"Camila preocupada com estagnação. Paciente evita falar da perda.",directives:"Propor cadeira vazia quando vínculo permitir. Atenção ao aniversário de morte.",risk:"Moderado",followUp:"Preparação para aniversário",followUpDue:"25/03",followUpDone:false},
  ],
};

const SESSIONS = [
  {date:"04/03",day:"Ter",time:"20:00",duration:"90 min",supervisandos:["Dra. Marina Alcântara","Dr. Felipe Borges"],type:"Grupo",cases:4,status:"Realizada",pauta:"",ata:"Presentes: Marina, Felipe. Casos: Lucas (exposição), Rafael&Camila (aliança), Sandra (ideação), Miguel (adesão). Próximos passos definidos."},
  {date:"25/02",day:"Ter",time:"20:00",duration:"60 min",supervisandos:["Dra. Camila Torres"],type:"Individual",cases:2,status:"Realizada",pauta:"",ata:"Presente: Camila. Caso Flávia (luto). Discutido cadeira vazia e timing."},
  {date:"18/03",day:"Ter",time:"20:00",duration:"90 min",supervisandos:["Dra. Marina Alcântara","Dr. Felipe Borges"],type:"Grupo",cases:0,status:"Agendada",pauta:"1. Follow-up Lucas — exposição iniciada?\n2. Follow-up Rafael&Camila — feedback aliança\n3. Sandra — protocolo segurança\n4. Caso novo Marina?",ata:""},
  {date:"19/03",day:"Qua",time:"14:00",duration:"60 min",supervisandos:["Dr. Roberto Lima"],type:"Individual",cases:0,status:"Agendada",pauta:"1. Apresentação caso novo\n2. Questões de interpretação",ata:""},
  {date:"20/03",day:"Qui",time:"20:00",duration:"60 min",supervisandos:["Dr. Felipe Borges"],type:"Individual",cases:0,status:"Agendada",pauta:"1. Sandra — ideação\n2. Miguel — adesão",ata:""},
];

const FINANCIAL = [
  {s:"Dra. Marina Alcântara",month:"Mar/2026",sessions:2,value:500,status:"Pago",method:"PIX · 05/03"},
  {s:"Dr. Felipe Borges",month:"Mar/2026",sessions:2,value:500,status:"Pago",method:"PIX · 05/03"},
  {s:"Dra. Camila Torres",month:"Mar/2026",sessions:1,value:300,status:"Pendente",method:"—"},
  {s:"Dr. Roberto Lima",month:"Mar/2026",sessions:2,value:500,status:"Pago",method:"Transf. · 02/03"},
  {s:"Dra. Juliana Reis",month:"Mar/2026",sessions:0,value:0,status:"Licença",method:"—"},
];

const LIBRARY = [
  {name:"Protocolo de Segurança — Ideação Suicida",type:"Protocolo",date:"Jan/2026",shared:["Marina","Felipe"]},
  {name:"Artigo: Exposição Gradual em Ansiedade Social",type:"Artigo",date:"Fev/2026",shared:["Marina"]},
  {name:"Escala de Ansiedade de Beck (BAI)",type:"Escala",date:"Jan/2026",shared:["Todos"]},
  {name:"Guia de Contratransferência",type:"Material",date:"Mar/2026",shared:["Marina","Camila"]},
  {name:"Cadeira Vazia — Técnica Gestalt (vídeo)",type:"Vídeo",date:"Fev/2026",shared:["Camila"]},
  {name:"Genograma — Modelo e instruções",type:"Template",date:"Jan/2026",shared:["Todos"]},
  {name:"Resolução CFP 06/2019 — Laudos",type:"Legislação",date:"Jan/2026",shared:["Todos"]},
  {name:"Checklist Primeira Sessão",type:"Template",date:"Mar/2026",shared:["Marina","Felipe","Roberto"]},
  {name:"O Corpo Guarda as Marcas — Fichamento",type:"Fichamento",date:"Mar/2026",shared:["Todos"]},
];

const PROFILE_DATA: Record<string,{personality:string;clinicalStyle:string;strengths:string[];growth:string[];blindSpots:string;countertransference:string;learningStyle:string;notes:{date:string;note:string}[]}> = {
  "Dra. Marina Alcântara": {
    personality:"Empática e acolhedora, com tendência natural ao cuidado. Sensível às nuances emocionais. Às vezes a empatia excessiva dificulta confrontações.",
    clinicalStyle:"Abordagem psicodinâmica com boa base teórica. Faz leituras transferenciais pertinentes mas demora a comunicá-las.",
    strengths:["Construção de aliança terapêutica","Escuta profunda e identificação de conteúdos latentes","Registro clínico detalhado","Bom manejo de trauma","Pontual, ética, comprometida"],
    growth:["Confrontação terapêutica","Manejo de pacientes borderline","Encerramento de processo","Distinguir demanda do paciente vs. própria"],
    blindSpots:"Tende a se 'maternalizar' com pacientes que apresentam figuras paternas ausentes.",
    countertransference:"Ansiedade diante de pacientes que expressam raiva. Reasseguramento excessivo. Com homens jovens, ativa dinâmica materna.",
    learningStyle:"Aprende melhor por exemplificação e role-playing. Precisa de tempo para processar.",
    notes:[{date:"04/03",note:"Marina trouxe caso do Lucas com boa leitura. Mais segura com exposição."},{date:"18/02",note:"Discussão profunda sobre contratransferência com Abrana. Momento de crescimento."},{date:"04/02",note:"Excelente no manejo do casal. Absorveu rápido equidistância sistêmica."}],
  },
  "Dr. Felipe Borges": {
    personality:"Direto, pragmático, orientado a resultados. Bom humor. Impaciente com processos longos.",
    clinicalStyle:"TCC clássica com boa fundamentação. Estruturado. Começando a integrar elementos experienciais.",
    strengths:["Clareza na psicoeducação","Registros de pensamentos criativos","Manejo firme de limites","Planejamento estruturado"],
    growth:["Escuta emocional","Flexibilidade no enquadre","Trabalho com emoções primárias","Tolerância à incerteza"],
    blindSpots:"Frustração quando pacientes não aderem às tarefas. Interpreta como resistência.",
    countertransference:"Irritação com pacientes que intelectualizam. Compete com masculinos da mesma faixa.",
    learningStyle:"Prefere protocolos e evidências. Aceita feedback direto. Gosta de metas claras.",
    notes:[{date:"06/03",note:"Felipe trouxe Sandra com frustração. Trabalhamos a frustração dele antes do caso."},{date:"06/03",note:"Caso Miguel — frustração com faltas. Importante: frustração como dado clínico."}],
  },
};

const riskC:Record<string,{c:string;bg:string}> = {Baixo:{c:"var(--c-green)",bg:"var(--c-green-soft)"},Moderado:{c:"var(--c-accent)",bg:"var(--c-accent-soft)"},Alto:{c:"var(--c-rose)",bg:"var(--c-rose-soft)"}};
const finC:Record<string,{c:string;bg:string}> = {Pago:{c:"var(--c-green)",bg:"var(--c-green-soft)"},Pendente:{c:"var(--c-accent)",bg:"var(--c-accent-soft)"},"Licença":{c:"var(--c-text-dim)",bg:"var(--c-card)"}};
const libTypeC:Record<string,string> = {Protocolo:"var(--c-rose)",Artigo:"var(--c-blue)",Escala:"var(--c-green)",Material:"var(--c-accent)",Vídeo:"var(--c-couple)",Template:"var(--c-blue)",Legislação:"var(--c-text-dim)",Fichamento:"var(--c-accent)"};

// ── COMPONENT ──
export function SupervisaoPage() {
  const [tab, setTab] = useState("supervisandos");
  const [selectedTherapist, setSelectedTherapist] = useState<string|null>(null);
  const [detailTab, setDetailTab] = useState<"casos"|"perfil">("casos");
  const [expandedCase, setExpandedCase] = useState<number|null>(0);
  const [editingProfile, setEditingProfile] = useState(false);
  const [pautaModal, setPautaModal] = useState<number|null>(null);
  const [ataModal, setAtaModal] = useState<number|null>(null);
  const [cobModal, setCobModal] = useState<typeof FINANCIAL[0]|null>(null);
  const [libSearch, setLibSearch] = useState("");
  const [libFilter, setLibFilter] = useState("Todos");
  const [uploadModal, setUploadModal] = useState(false);

  const tabs = [
    {key:"supervisandos",label:"Supervisandos",icon:Ic.users},
    {key:"sessoes",label:"Sessões",icon:Ic.cal},
    {key:"financeiro",label:"Financeiro",icon:Ic.dollar},
    {key:"biblioteca",label:"Biblioteca",icon:Ic.book},
  ];

  // ── COMPETENCY RADAR (simplified bar version) ──
  const CompetencyChart = ({comp}:{comp:Record<string,number>}) => {
    const labels:Record<string,string> = {manejo:"Manejo clínico",vinculo:"Vínculo",contratransferencia:"Contratransf.",tecnica:"Técnica",etica:"Ética"};
    return (
      <div className="flex flex-col gap-2">
        {Object.entries(comp).map(([k,v]) => (
          <div key={k} className="flex items-center gap-3">
            <span className="text-[10px] font-sans w-24 text-right flex-shrink-0" style={{color:"var(--c-text-dim)"}}>{labels[k]||k}</span>
            <div className="flex-1 h-4 rounded-full overflow-hidden" style={{background:"var(--c-card)"}}>
              <motion.div initial={{width:0}} animate={{width:`${(v/10)*100}%`}} transition={{duration:0.6,delay:0.1}}
                className="h-full rounded-full" style={{background:v>=8?"var(--c-green)":v>=6?"var(--c-accent)":"var(--c-rose)",opacity:0.7}}/>
            </div>
            <span className="text-xs font-sans font-semibold w-6" style={{color:v>=8?"var(--c-green)":v>=6?"var(--c-accent)":"var(--c-rose)"}}>{v}</span>
          </div>
        ))}
      </div>
    );
  };

  // ── THERAPIST DETAIL ──
  if (selectedTherapist) {
    const t = SUPERVISANDOS.find(s=>s.name===selectedTherapist)!;
    const cases = CASE_NOTES[selectedTherapist]||[];
    const profile = PROFILE_DATA[selectedTherapist];
    const pendingFollowUps = cases.filter(c=>c.followUpDue&&!c.followUpDone);

    return (
      <div className="max-w-[1200px]">
        <motion.button initial={{opacity:0,x:-10}} animate={{opacity:1,x:0}}
          onClick={()=>{setSelectedTherapist(null);setDetailTab("casos");}}
          className="flex items-center gap-2 text-sm font-sans font-medium mb-5 cursor-pointer bg-transparent border-none transition-colors"
          style={{color:"var(--c-text-dim)"}}>‹ Voltar</motion.button>

        {/* Header */}
        <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} className="rounded-[20px] p-6 mb-6"
          style={{background:"var(--c-surface)",border:"1px solid var(--c-border)"}}>
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 rounded-full flex items-center justify-center text-lg font-serif italic"
              style={{background:"var(--c-couple-soft)",color:"var(--c-couple)"}}>{t.name.split(" ").pop()?.charAt(0)}</div>
            <div className="flex-1">
              <h1 className="text-2xl font-serif italic" style={{color:"var(--c-text)"}}>{t.name}</h1>
              <div className="flex items-center gap-3 mt-1 flex-wrap">
                <span className="text-xs font-sans" style={{color:"var(--c-text-dim)"}}>{t.crp} · {t.specialty} · {t.freq}</span>
              </div>
              {/* Alerts */}
              {t.alerts.length > 0 && (
                <div className="flex gap-2 mt-2">
                  {t.alerts.map((a,i) => (
                    <span key={i} className="flex items-center gap-1.5 text-[10px] font-sans font-semibold px-2.5 py-1 rounded-lg"
                      style={{background:a.type==="critical"?"var(--c-rose-soft)":"var(--c-accent-soft)",color:a.type==="critical"?"var(--c-rose)":"var(--c-accent)"}}>
                      {Ic.alert} {a.text}
                    </span>
                  ))}
                </div>
              )}
            </div>
            <div className="flex gap-2">
              <button className="px-4 py-2 rounded-xl text-sm font-sans font-medium cursor-pointer border-none" style={{background:"var(--c-couple-soft)",color:"var(--c-couple)"}}>+ Anotar caso</button>
              <button className="px-4 py-2 rounded-xl text-sm font-sans font-medium cursor-pointer" style={{background:"var(--c-card)",border:"1px solid var(--c-border)",color:"var(--c-text-muted)"}}>
                {Ic.download} Contrato PDF
              </button>
            </div>
          </div>
          {/* Competency chart */}
          <div className="mt-5 pt-5" style={{borderTop:"1px solid var(--c-border)"}}>
            <div className="grid grid-cols-[1fr_1fr] gap-6">
              <div>
                <h3 className="text-[10px] font-sans font-semibold uppercase tracking-[0.08em] mb-3" style={{color:"var(--c-couple)"}}>Competências</h3>
                <CompetencyChart comp={t.competencias}/>
              </div>
              <div>
                <h3 className="text-[10px] font-sans font-semibold uppercase tracking-[0.08em] mb-3" style={{color:"var(--c-accent)"}}>Plano de desenvolvimento</h3>
                {t.devPlan.map((d,i) => (
                  <div key={i} className="mb-3">
                    <div className="flex justify-between text-[11px] font-sans mb-1">
                      <span style={{color:"var(--c-text-muted)"}}>{d.goal}</span>
                      <span style={{color:d.progress>=60?"var(--c-green)":"var(--c-accent)"}}>{d.progress}%</span>
                    </div>
                    <div className="h-1.5 rounded-full overflow-hidden" style={{background:"var(--c-card)"}}>
                      <motion.div initial={{width:0}} animate={{width:`${d.progress}%`}} transition={{duration:0.5,delay:0.2+i*0.1}}
                        className="h-full rounded-full" style={{background:d.progress>=60?"var(--c-green)":"var(--c-accent)"}}/>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Detail tabs */}
        <div className="flex gap-1 mb-6">
          <button onClick={()=>setDetailTab("casos")} className="flex items-center gap-2 px-4 py-2 rounded-xl border-none text-[13px] font-sans font-medium cursor-pointer transition-all"
            style={{background:detailTab==="casos"?"var(--c-couple-soft)":"transparent",color:detailTab==="casos"?"var(--c-couple)":"var(--c-text-dim)"}}>
            {Ic.clipboard} Casos {cases.length > 0 && <span className="text-[10px] px-1.5 py-0.5 rounded-full font-bold" style={{background:"var(--c-couple-soft)",color:"var(--c-couple)"}}>{cases.length}</span>}
          </button>
          <button onClick={()=>setDetailTab("perfil")} className="flex items-center gap-2 px-4 py-2 rounded-xl border-none text-[13px] font-sans font-medium cursor-pointer transition-all"
            style={{background:detailTab==="perfil"?"var(--c-couple-soft)":"transparent",color:detailTab==="perfil"?"var(--c-couple)":"var(--c-text-dim)"}}>
            {Ic.info} Sobre o terapeuta
          </button>
        </div>

        <AnimatePresence mode="wait">
          {detailTab === "casos" ? (
            <motion.div key="casos" initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} exit={{opacity:0}}>
              {/* Follow-up tasks */}
              {pendingFollowUps.length > 0 && (
                <div className="mb-5 rounded-[16px] p-4" style={{background:"var(--c-accent-soft)",border:"1px solid var(--c-accent-soft)"}}>
                  <h4 className="text-[10px] font-sans font-semibold uppercase tracking-[0.08em] mb-2" style={{color:"var(--c-accent)"}}>Follow-ups pendentes</h4>
                  {pendingFollowUps.map((c,i) => (
                    <div key={i} className="flex items-center gap-3 py-1.5">
                      <div className="w-4 h-4 rounded border-2 flex items-center justify-center cursor-pointer" style={{borderColor:"var(--c-accent)"}}/>
                      <span className="text-xs font-sans" style={{color:"var(--c-text)"}}>{c.followUp}</span>
                      <span className="text-[10px] font-sans ml-auto" style={{color:"var(--c-accent)"}}>até {c.followUpDue}</span>
                    </div>
                  ))}
                </div>
              )}
              {/* Timeline */}
              <div className="relative pl-8">
                <div className="absolute left-3 top-0 bottom-0 w-px" style={{background:"var(--c-border)"}}/>
                {cases.map((c,i) => {
                  const isExp = expandedCase === i;
                  const rk = riskC[c.risk.split(" —")[0]] || riskC.Baixo;
                  return (
                    <motion.div key={i} initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{delay:i*0.06}}
                      className="relative mb-4">
                      <div className="absolute -left-5 top-4 w-3 h-3 rounded-full border-2" style={{borderColor:"var(--c-couple)",background:i===0?"var(--c-couple)":"transparent"}}/>
                      <div className="rounded-[18px] border overflow-hidden cursor-pointer" style={{background:"var(--c-surface)",borderColor:isExp?"var(--c-couple-soft)":"var(--c-border)"}}
                        onClick={()=>setExpandedCase(isExp?null:i)}>
                        <div className="px-6 py-4 flex items-center justify-between">
                          <div>
                            <div className="flex items-center gap-3">
                              <span className="text-sm font-sans font-medium" style={{color:"var(--c-text)"}}>{c.patient}</span>
                              <span className="text-[11px] font-semibold px-2 py-0.5 rounded-lg" style={{color:rk.c,background:rk.bg}}>Risco: {c.risk.split(" —")[0]}</span>
                              {c.followUpDue && !c.followUpDone && <span className="text-[10px] font-sans font-semibold px-2 py-0.5 rounded-lg" style={{background:"var(--c-accent-soft)",color:"var(--c-accent)"}}>Follow-up: {c.followUpDue}</span>}
                              {c.followUpDone && <span className="text-[10px] font-sans" style={{color:"var(--c-green)"}}>{Ic.check} Concluído</span>}
                            </div>
                            <div className="flex gap-3 mt-1">
                              <span className="text-xs font-sans" style={{color:"var(--c-text-dim)"}}>{c.date}</span>
                              <span className="text-xs font-sans" style={{color:"var(--c-couple)"}}>{c.theme}</span>
                            </div>
                          </div>
                          <span style={{color:"var(--c-text-dim)",transform:isExp?"rotate(180deg)":"rotate(0)",transition:"transform 0.2s"}}>▾</span>
                        </div>
                        <AnimatePresence>
                          {isExp && (
                            <motion.div initial={{height:0,opacity:0}} animate={{height:"auto",opacity:1}} exit={{height:0,opacity:0}} className="overflow-hidden">
                              <div className="px-6 pb-5 grid grid-cols-2 gap-4" style={{borderTop:"1px solid var(--c-border)",paddingTop:"1rem"}}>
                                <div className="rounded-xl p-4" style={{background:"var(--c-card)",border:"1px solid var(--c-border)"}}>
                                  <h4 className="text-[11px] font-sans font-semibold uppercase tracking-[0.08em] mb-2 flex items-center gap-2" style={{color:"var(--c-couple)"}}>{Ic.msg} Discussão</h4>
                                  <p className="text-sm font-sans font-light leading-relaxed" style={{color:"var(--c-text-muted)"}}>{c.notes}</p>
                                </div>
                                <div className="rounded-xl p-4" style={{background:"var(--c-card)",border:"1px solid var(--c-border)"}}>
                                  <h4 className="text-[11px] font-sans font-semibold uppercase tracking-[0.08em] mb-2 flex items-center gap-2" style={{color:"var(--c-accent)"}}>{Ic.pin} Direcionamentos</h4>
                                  <p className="text-sm font-sans font-light leading-relaxed" style={{color:"var(--c-text-muted)"}}>{c.directives}</p>
                                </div>
                                <div className="rounded-xl p-4" style={{background:"var(--c-card)",border:"1px solid var(--c-border)"}}>
                                  <h4 className="text-[11px] font-sans font-semibold uppercase tracking-[0.08em] mb-2 flex items-center gap-2" style={{color:"var(--c-rose)"}}>{Ic.alert} Risco</h4>
                                  <p className="text-sm font-sans font-light leading-relaxed" style={{color:"var(--c-text-muted)"}}>{c.risk}</p>
                                </div>
                                <div className="rounded-xl p-4" style={{background:"var(--c-card)",border:"1px solid var(--c-border)"}}>
                                  <h4 className="text-[11px] font-sans font-semibold uppercase tracking-[0.08em] mb-2 flex items-center gap-2" style={{color:"var(--c-green)"}}>{Ic.refresh} Follow-up</h4>
                                  <p className="text-sm font-sans font-light leading-relaxed" style={{color:"var(--c-text-muted)"}}>{c.followUp}</p>
                                  {c.followUpDue && <p className="text-[10px] font-sans font-semibold mt-2" style={{color:"var(--c-accent)"}}>Prazo: {c.followUpDue}</p>}
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          ) : (
            <motion.div key="perfil" initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} exit={{opacity:0}}>
              {profile ? (
                <div className="flex flex-col gap-5">
                  <div className="flex justify-end">
                    <button onClick={()=>setEditingProfile(!editingProfile)} className="flex items-center gap-1.5 text-xs font-sans font-medium cursor-pointer bg-transparent border-none"
                      style={{color:"var(--c-couple)"}}>{Ic.edit} {editingProfile?"Salvar":"Editar perfil"}</button>
                  </div>
                  <div className="grid grid-cols-2 gap-5">
                    {[{t:"Personalidade",d:profile.personality,c:"var(--c-couple)",ic:Ic.globe},{t:"Estilo clínico",d:profile.clinicalStyle,c:"var(--c-accent)",ic:Ic.target}].map(s => (
                      <div key={s.t} className="rounded-[20px] p-6" style={{background:"var(--c-surface)",border:"1px solid var(--c-border)"}}>
                        <h3 className="text-[11px] font-sans font-semibold uppercase tracking-[0.08em] mb-3 flex items-center gap-2" style={{color:s.c}}>{s.ic} {s.t}</h3>
                        {editingProfile ? <textarea defaultValue={s.d} rows={4} className="w-full px-3 py-2 rounded-xl text-sm font-sans resize-none focus:outline-none" style={{background:"var(--c-card)",border:"1px solid var(--c-border)",color:"var(--c-text)"}}/> :
                          <p className="text-sm font-sans font-light leading-relaxed" style={{color:"var(--c-text-muted)"}}>{s.d}</p>}
                      </div>
                    ))}
                  </div>
                  <div className="grid grid-cols-2 gap-5">
                    <div className="rounded-[20px] p-6" style={{background:"var(--c-surface)",border:"1px solid var(--c-border)"}}>
                      <h3 className="text-[11px] font-sans font-semibold uppercase tracking-[0.08em] mb-3 flex items-center gap-2" style={{color:"var(--c-green)"}}>{Ic.trending} Pontos fortes</h3>
                      {profile.strengths.map((s,i) => <div key={i} className="flex items-start gap-2 mb-1.5"><div className="w-1.5 h-1.5 rounded-full mt-1.5" style={{background:"var(--c-green)"}}/><span className="text-sm font-sans font-light" style={{color:"var(--c-text-muted)"}}>{s}</span></div>)}
                    </div>
                    <div className="rounded-[20px] p-6" style={{background:"var(--c-surface)",border:"1px solid var(--c-border)"}}>
                      <h3 className="text-[11px] font-sans font-semibold uppercase tracking-[0.08em] mb-3 flex items-center gap-2" style={{color:"var(--c-accent)"}}>{Ic.target} Desenvolvimento</h3>
                      {profile.growth.map((g,i) => <div key={i} className="flex items-start gap-2 mb-1.5"><div className="w-1.5 h-1.5 rounded-full mt-1.5" style={{background:"var(--c-accent)"}}/><span className="text-sm font-sans font-light" style={{color:"var(--c-text-muted)"}}>{g}</span></div>)}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-5">
                    <div className="rounded-[20px] p-6" style={{background:"var(--c-surface)",border:"1px solid var(--c-border)"}}>
                      <h3 className="text-[11px] font-sans font-semibold uppercase tracking-[0.08em] mb-3 flex items-center gap-2" style={{color:"var(--c-rose)"}}>{Ic.eye} Pontos cegos</h3>
                      <p className="text-sm font-sans font-light leading-relaxed" style={{color:"var(--c-text-muted)"}}>{profile.blindSpots}</p>
                    </div>
                    <div className="rounded-[20px] p-6" style={{background:"var(--c-surface)",border:"1px solid var(--c-border)"}}>
                      <h3 className="text-[11px] font-sans font-semibold uppercase tracking-[0.08em] mb-3 flex items-center gap-2" style={{color:"var(--c-blue)"}}>{Ic.refresh} Contratransferência</h3>
                      <p className="text-sm font-sans font-light leading-relaxed" style={{color:"var(--c-text-muted)"}}>{profile.countertransference}</p>
                    </div>
                  </div>
                  {/* Diary */}
                  <div className="rounded-[20px] p-6" style={{background:"var(--c-surface)",border:"1px solid var(--c-border)"}}>
                    <h3 className="text-[11px] font-sans font-semibold uppercase tracking-[0.08em] mb-3 flex items-center gap-2" style={{color:"var(--c-couple)"}}>{Ic.edit} Diário do supervisor</h3>
                    <div className="relative pl-8">
                      <div className="absolute left-3 top-0 bottom-0 w-px" style={{background:"var(--c-border)"}}/>
                      {profile.notes.map((n,i) => (
                        <div key={i} className="relative mb-4">
                          <div className="absolute -left-5 top-1 w-3 h-3 rounded-full border-2" style={{borderColor:"var(--c-couple)",background:i===0?"var(--c-couple)":"transparent"}}/>
                          <div className="text-xs font-serif italic mb-1" style={{color:"var(--c-couple)"}}>{n.date}</div>
                          <p className="text-sm font-sans font-light leading-relaxed" style={{color:"var(--c-text-muted)"}}>{n.note}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : <div className="rounded-[20px] p-12 text-center" style={{background:"var(--c-surface)",border:"1px solid var(--c-border)"}}><p className="text-sm font-sans" style={{color:"var(--c-text-dim)"}}>Sem perfil registrado.</p></div>}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  // ── MAIN PAGE ──
  return (
    <div className="max-w-[1200px]">
      <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} className="flex justify-between items-end mb-7">
        <div>
          <span className="text-xs font-sans font-semibold tracking-[0.1em] uppercase" style={{color:"var(--c-couple)"}}>Área do Supervisor</span>
          <h1 className="text-4xl font-serif italic font-normal mt-1" style={{color:"var(--c-text)"}}>Supervisão</h1>
          <p className="text-sm font-sans font-light mt-1" style={{color:"var(--c-text-dim)"}}>
            <span className="font-medium" style={{color:"var(--c-couple)"}}>{SUPERVISANDOS.filter(s=>s.status==="Ativo").length} supervisandos</span> ativos ·
            <span className="font-medium ml-1" style={{color:"var(--c-accent)"}}>{SESSIONS.filter(s=>s.status==="Agendada").length} sessões</span> agendadas
          </p>
        </div>
        <button className="px-5 py-2.5 rounded-xl text-sm font-sans font-semibold cursor-pointer border-none" style={{background:"var(--c-couple-soft)",color:"var(--c-couple)"}}>+ Agendar supervisão</button>
      </motion.div>

      <div className="flex gap-1 mb-6">
        {tabs.map(t => (
          <button key={t.key} onClick={()=>setTab(t.key)} className="flex items-center gap-2 px-4 py-2 rounded-xl border-none text-[13px] font-sans font-medium cursor-pointer transition-all"
            style={{background:tab===t.key?"var(--c-couple-soft)":"transparent",color:tab===t.key?"var(--c-couple)":"var(--c-text-dim)"}}>{t.icon} {t.label}</button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {/* ══ SUPERVISANDOS ══ */}
        {tab === "supervisandos" && (
          <motion.div key="sup" initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} exit={{opacity:0}}>
            <div className="grid grid-cols-4 gap-3 mb-6">
              {[{l:"Supervisandos",v:String(SUPERVISANDOS.filter(s=>s.status==="Ativo").length),c:"var(--c-couple)"},{l:"Casos ativos",v:String(Object.values(CASE_NOTES).flat().length),c:"var(--c-accent)"},{l:"Receita mês",v:"R$ 1.800",c:"var(--c-green)"},{l:"Horas/mês",v:"7.5h",c:"var(--c-blue)"}].map((s,i) => (
                <motion.div key={s.l} initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{delay:0.05+i*0.04}}
                  className="rounded-[16px] p-5" style={{background:"var(--c-surface)",border:"1px solid var(--c-border)"}}>
                  <div className="text-[10px] font-sans font-semibold uppercase tracking-[0.06em]" style={{color:"var(--c-text-dim)"}}>{s.l}</div>
                  <div className="text-[28px] font-serif italic mt-1" style={{color:s.c}}>{s.v}</div>
                </motion.div>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-4">
              {SUPERVISANDOS.map((s,i) => {
                const cases = CASE_NOTES[s.name]||[];
                const hasAlerts = s.alerts.length > 0;
                return (
                  <motion.div key={i} initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{delay:0.1+i*0.05}}
                    onClick={()=>setSelectedTherapist(s.name)}
                    className="rounded-[20px] p-6 cursor-pointer transition-all group" style={{background:"var(--c-surface)",border:`1px solid ${hasAlerts?"var(--c-accent-soft)":"var(--c-border)"}`}}>
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full flex items-center justify-center text-base font-serif italic flex-shrink-0"
                        style={{background:"var(--c-couple-soft)",color:"var(--c-couple)"}}>{s.name.split(" ").pop()?.charAt(0)}</div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-base font-sans font-medium transition-colors" style={{color:"var(--c-text)"}}>{s.name}</span>
                          <span className="text-[11px] font-semibold px-2 py-0.5 rounded-lg" style={{color:s.status==="Ativo"?"var(--c-green)":"var(--c-text-dim)",background:s.status==="Ativo"?"var(--c-green-soft)":"var(--c-card)"}}>{s.status}</span>
                        </div>
                        <div className="text-xs font-sans mt-0.5" style={{color:"var(--c-text-dim)"}}>{s.crp} · {s.specialty} · {s.freq}</div>
                        {hasAlerts && <div className="mt-2">{s.alerts.map((a,j) => <span key={j} className="flex items-center gap-1 text-[10px] font-sans font-semibold" style={{color:a.type==="critical"?"var(--c-rose)":"var(--c-accent)"}}>{Ic.alert} {a.text}</span>)}</div>}
                        <div className="flex gap-4 mt-3">
                          <div className="text-center"><div className="text-lg font-serif italic" style={{color:"var(--c-couple)"}}>{cases.length}</div><div className="text-[10px] font-sans" style={{color:"var(--c-text-dim)"}}>Casos</div></div>
                          <div className="text-center"><div className="text-lg font-serif italic" style={{color:"var(--c-accent)"}}>{s.patients}</div><div className="text-[10px] font-sans" style={{color:"var(--c-text-dim)"}}>Pacientes</div></div>
                        </div>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <div className="text-xs font-sans" style={{color:"var(--c-text-dim)"}}>Próxima</div>
                        <div className="text-sm font-serif italic" style={{color:"var(--c-accent)"}}>{s.nextDate}</div>
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md mt-1 inline-block" style={{background:s.paid?"var(--c-green-soft)":"var(--c-accent-soft)",color:s.paid?"var(--c-green)":"var(--c-accent)"}}>{s.paid?"Pago":"Pendente"}</span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* ══ SESSÕES ══ */}
        {tab === "sessoes" && (
          <motion.div key="sess" initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} exit={{opacity:0}}>
            <div className="flex flex-col gap-3">
              {SESSIONS.map((s,i) => {
                const isPast = s.status === "Realizada";
                return (
                  <motion.div key={i} initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{delay:i*0.04}}
                    className="flex items-center rounded-[18px] overflow-hidden" style={{background:isPast?"var(--c-surface)":"var(--c-couple-soft)",border:"1px solid var(--c-border)"}}>
                    <div className="w-20 py-5 flex flex-col items-center justify-center flex-shrink-0" style={{borderRight:"1px solid var(--c-border)"}}>
                      <div className="text-xl font-serif italic" style={{color:isPast?"var(--c-text-dim)":"var(--c-couple)"}}>{s.date.split("/")[0]}</div>
                      <div className="text-[10px] font-sans" style={{color:"var(--c-text-dim)"}}>{s.day} · {s.date.split("/")[1]}</div>
                    </div>
                    <div className="flex-1 py-4 px-5">
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-sans font-medium" style={{color:"var(--c-text)"}}>{s.time} · {s.duration}</span>
                        <span className="text-[11px] font-semibold px-2 py-0.5 rounded-lg" style={{color:s.type==="Grupo"?"var(--c-blue)":"var(--c-couple)",background:s.type==="Grupo"?"var(--c-blue-soft)":"var(--c-couple-soft)"}}>{s.type}</span>
                        <span className="text-[11px] font-semibold px-2 py-0.5 rounded-lg" style={{color:isPast?"var(--c-green)":"var(--c-accent)",background:isPast?"var(--c-green-soft)":"var(--c-accent-soft)"}}>{s.status}</span>
                      </div>
                      <div className="flex gap-2 mt-1.5">
                        {s.supervisandos.map((name,j) => <span key={j} className="text-xs font-sans px-2 py-0.5 rounded-md" style={{background:"var(--c-card)",color:"var(--c-text-dim)",border:"1px solid var(--c-border)"}}>{name.split(" ")[0]} {name.split(" ").pop()}</span>)}
                        {isPast && <span className="text-xs font-sans ml-2" style={{color:"var(--c-text-dim)"}}>{s.cases} casos</span>}
                      </div>
                    </div>
                    <div className="px-5 flex gap-2 flex-shrink-0">
                      {isPast ? (
                        <>
                          <button onClick={()=>setAtaModal(i)} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-sans font-medium cursor-pointer border-none"
                            style={{background:"var(--c-couple-soft)",color:"var(--c-couple)"}}>{Ic.clipboard} Ata</button>
                          <button className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-[11px] font-sans font-medium cursor-pointer border-none"
                            style={{background:"var(--c-card)",color:"var(--c-text-dim)",border:"1px solid var(--c-border)"}}>{Ic.download} PDF</button>
                        </>
                      ) : (
                        <button onClick={()=>setPautaModal(i)} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-sans font-semibold cursor-pointer border-none"
                          style={{background:"var(--c-accent-soft)",color:"var(--c-accent)"}}>{Ic.edit} Pauta</button>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* ══ FINANCEIRO ══ */}
        {tab === "financeiro" && (
          <motion.div key="fin" initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} exit={{opacity:0}}>
            <div className="grid grid-cols-4 gap-3 mb-6">
              {[{l:"Receita Mar",v:"R$ 1.800",c:"var(--c-green)"},{l:"Pendente",v:"R$ 300",c:"var(--c-accent)"},{l:"Sessões",v:"5",c:"var(--c-couple)"},{l:"Horas",v:"7.5h",c:"var(--c-blue)"}].map((s,i) => (
                <div key={s.l} className="rounded-[16px] p-5" style={{background:"var(--c-surface)",border:"1px solid var(--c-border)"}}>
                  <div className="text-[10px] font-sans font-semibold uppercase tracking-[0.06em]" style={{color:"var(--c-text-dim)"}}>{s.l}</div>
                  <div className="text-[28px] font-serif italic mt-1" style={{color:s.c}}>{s.v}</div>
                </div>
              ))}
            </div>
            <div className="rounded-[20px] overflow-hidden" style={{background:"var(--c-surface)",border:"1px solid var(--c-border)"}}>
              <div className="grid grid-cols-[2fr_1fr_80px_1fr_1fr_100px] px-6 py-2.5" style={{borderBottom:"1px solid var(--c-border)"}}>
                {["Supervisando","Mês","Sessões","Valor","Status","Ação"].map(h => <span key={h} className="text-[10px] font-sans font-semibold uppercase tracking-[0.06em]" style={{color:"var(--c-text-dim)"}}>{h}</span>)}
              </div>
              {FINANCIAL.map((f,i) => (
                <div key={i} className="grid grid-cols-[2fr_1fr_80px_1fr_1fr_100px] px-6 py-3.5 items-center" style={{borderBottom:"1px solid var(--c-border)"}}>
                  <span className="text-sm font-sans font-medium" style={{color:"var(--c-text)"}}>{f.s}</span>
                  <span className="text-sm font-sans" style={{color:"var(--c-text-dim)"}}>{f.month}</span>
                  <span className="text-sm font-sans text-center" style={{color:"var(--c-text-muted)"}}>{f.sessions}</span>
                  <span className="text-sm font-sans font-medium" style={{color:"var(--c-green)"}}>R$ {f.value}</span>
                  <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-lg w-fit" style={{color:finC[f.status]?.c,background:finC[f.status]?.bg}}>{f.status}</span>
                  <div>
                    {f.status === "Pendente" && (
                      <button onClick={()=>setCobModal(f)} className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-[10px] font-sans font-semibold cursor-pointer border-none"
                        style={{background:"#25D36618",color:"#25D366"}}>{Ic.wa} Cobrar</button>
                    )}
                    {f.status === "Pago" && <span className="text-[10px] font-sans" style={{color:"var(--c-text-dim)"}}>{f.method}</span>}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* ══ BIBLIOTECA ══ */}
        {tab === "biblioteca" && (
          <motion.div key="bib" initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} exit={{opacity:0}}>
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 px-3 py-2 rounded-xl" style={{background:"var(--c-surface)",border:"1px solid var(--c-border)"}}>
                  {Ic.search}
                  <input value={libSearch} onChange={e=>setLibSearch(e.target.value)} placeholder="Buscar material..."
                    className="bg-transparent border-none outline-none text-sm font-sans w-[160px]" style={{color:"var(--c-text)"}}/>
                </div>
                <div className="flex gap-1.5">
                  {["Todos","Protocolo","Artigo","Escala","Template","Vídeo"].map(f => (
                    <button key={f} onClick={()=>setLibFilter(f)} className="px-2.5 py-1 rounded-lg text-[11px] font-sans font-medium cursor-pointer border-none transition-all"
                      style={{background:libFilter===f?"var(--c-couple-soft)":"transparent",color:libFilter===f?"var(--c-couple)":"var(--c-text-dim)"}}>{f}</button>
                  ))}
                </div>
              </div>
              <button onClick={()=>setUploadModal(true)} className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-sans font-semibold cursor-pointer border-none"
                style={{background:"var(--c-couple-soft)",color:"var(--c-couple)"}}>{Ic.plus} Adicionar material</button>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {LIBRARY.filter(m=>libFilter==="Todos"||m.type===libFilter).filter(m=>!libSearch||m.name.toLowerCase().includes(libSearch.toLowerCase())).map((m,i) => (
                <motion.div key={i} initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{delay:0.05+i*0.03}}
                  className="rounded-[18px] p-5 cursor-pointer transition-all group" style={{background:"var(--c-surface)",border:"1px solid var(--c-border)"}}>
                  <div className="mb-2" style={{color:"var(--c-accent)"}}>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                  </div>
                  <h3 className="text-sm font-sans font-medium leading-snug" style={{color:"var(--c-text)"}}>{m.name}</h3>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-[10px] font-sans font-semibold px-2 py-0.5 rounded-md" style={{color:libTypeC[m.type]||"var(--c-text-dim)",background:"var(--c-card)"}}>{m.type}</span>
                    <span className="text-[10px] font-sans" style={{color:"var(--c-text-dim)"}}>{m.date}</span>
                  </div>
                  <div className="flex items-center gap-1 mt-2">
                    <span className="text-[10px] font-sans" style={{color:"var(--c-text-dim)"}}>Compartilhado: {m.shared.join(", ")}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── MODALS ── */}
      <AnimatePresence>
        {/* Pauta */}
        {pautaModal !== null && (
          <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="fixed inset-0 z-[9998] flex items-center justify-center" onClick={()=>setPautaModal(null)}>
            <div className="absolute inset-0" style={{background:"rgba(0,0,0,0.5)",backdropFilter:"blur(4px)"}}/>
            <motion.div initial={{opacity:0,scale:0.95}} animate={{opacity:1,scale:1}} exit={{opacity:0,scale:0.95}}
              className="relative z-10 w-full max-w-[480px] rounded-[20px] overflow-hidden" style={{background:"var(--c-surface)",border:"1px solid var(--c-border)"}} onClick={e=>e.stopPropagation()}>
              <div className="px-6 pt-5 pb-4" style={{borderBottom:"1px solid var(--c-border)"}}>
                <h3 className="text-lg font-serif italic" style={{color:"var(--c-text)"}}>Pauta — {SESSIONS[pautaModal].date}</h3>
                <p className="text-xs font-sans" style={{color:"var(--c-text-dim)"}}>{SESSIONS[pautaModal].supervisandos.join(", ")}</p>
              </div>
              <div className="px-6 py-5">
                <textarea defaultValue={SESSIONS[pautaModal].pauta} rows={8} placeholder="Temas a abordar na supervisão..."
                  className="w-full px-4 py-3 rounded-xl text-sm font-sans resize-none focus:outline-none" style={{background:"var(--c-card)",border:"1px solid var(--c-border)",color:"var(--c-text)"}}/>
              </div>
              <div className="px-6 py-4 flex justify-end gap-3" style={{borderTop:"1px solid var(--c-border)"}}>
                <button onClick={()=>setPautaModal(null)} className="px-5 py-2.5 rounded-xl text-sm font-sans font-medium cursor-pointer bg-transparent" style={{border:"1px solid var(--c-border)",color:"var(--c-text-muted)"}}>Fechar</button>
                <button onClick={()=>setPautaModal(null)} className="px-6 py-2.5 rounded-xl text-sm font-sans font-semibold cursor-pointer border-none" style={{background:"var(--c-accent)",color:"var(--c-bg)"}}>Salvar pauta</button>
              </div>
            </motion.div>
          </motion.div>
        )}
        {/* Ata */}
        {ataModal !== null && (
          <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="fixed inset-0 z-[9998] flex items-center justify-center" onClick={()=>setAtaModal(null)}>
            <div className="absolute inset-0" style={{background:"rgba(0,0,0,0.5)",backdropFilter:"blur(4px)"}}/>
            <motion.div initial={{opacity:0,scale:0.95}} animate={{opacity:1,scale:1}} exit={{opacity:0,scale:0.95}}
              className="relative z-10 w-full max-w-[520px] rounded-[20px] overflow-hidden" style={{background:"var(--c-surface)",border:"1px solid var(--c-border)"}} onClick={e=>e.stopPropagation()}>
              <div className="px-6 pt-5 pb-4 flex justify-between items-center" style={{borderBottom:"1px solid var(--c-border)"}}>
                <div>
                  <h3 className="text-lg font-serif italic" style={{color:"var(--c-text)"}}>Ata de supervisão — {SESSIONS[ataModal].date}</h3>
                  <p className="text-xs font-sans" style={{color:"var(--c-text-dim)"}}>{SESSIONS[ataModal].type} · {SESSIONS[ataModal].duration}</p>
                </div>
                <button className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-[11px] font-sans font-semibold cursor-pointer border-none" style={{background:"var(--c-accent-soft)",color:"var(--c-accent)"}}>{Ic.download} Exportar PDF</button>
              </div>
              <div className="px-6 py-5">
                <div className="p-4 rounded-xl" style={{background:"var(--c-card)",border:"1px solid var(--c-border)"}}>
                  <p className="text-sm font-sans font-light leading-relaxed whitespace-pre-line" style={{color:"var(--c-text-muted)"}}>{SESSIONS[ataModal].ata}</p>
                </div>
              </div>
              <div className="px-6 py-4 flex justify-end" style={{borderTop:"1px solid var(--c-border)"}}>
                <button onClick={()=>setAtaModal(null)} className="px-5 py-2.5 rounded-xl text-sm font-sans font-medium cursor-pointer bg-transparent" style={{border:"1px solid var(--c-border)",color:"var(--c-text-muted)"}}>Fechar</button>
              </div>
            </motion.div>
          </motion.div>
        )}
        {/* Cobrança WhatsApp */}
        {cobModal && (
          <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="fixed inset-0 z-[9998] flex items-center justify-center" onClick={()=>setCobModal(null)}>
            <div className="absolute inset-0" style={{background:"rgba(0,0,0,0.5)",backdropFilter:"blur(4px)"}}/>
            <motion.div initial={{opacity:0,scale:0.95}} animate={{opacity:1,scale:1}} exit={{opacity:0,scale:0.95}}
              className="relative z-10 w-full max-w-[440px] rounded-[20px] overflow-hidden" style={{background:"var(--c-surface)",border:"1px solid var(--c-border)"}} onClick={e=>e.stopPropagation()}>
              <div className="px-6 pt-5 pb-4" style={{borderBottom:"1px solid var(--c-border)"}}>
                <h3 className="text-lg font-serif italic" style={{color:"var(--c-text)"}}>Cobrar supervisão</h3>
                <p className="text-xs font-sans" style={{color:"var(--c-text-dim)"}}>{cobModal.s} · R$ {cobModal.value}</p>
              </div>
              <div className="px-6 py-5">
                <div className="p-4 rounded-xl rounded-bl-sm" style={{background:"#DCF8C6",color:"#111B21"}}>
                  <p className="text-[13px] font-sans leading-relaxed whitespace-pre-line">
                    {`Olá, ${cobModal.s.split(" ").pop()}! 😊\n\nLembrando do pagamento da supervisão de ${cobModal.month}: R$ ${cobModal.value} (${cobModal.sessions} sessões).\n\nPIX: supervisor@presenca.com\n\nAbraço!`}
                  </p>
                </div>
              </div>
              <div className="px-6 py-4 flex justify-end gap-3" style={{borderTop:"1px solid var(--c-border)"}}>
                <button onClick={()=>setCobModal(null)} className="px-5 py-2.5 rounded-xl text-sm font-sans font-medium cursor-pointer bg-transparent" style={{border:"1px solid var(--c-border)",color:"var(--c-text-muted)"}}>Cancelar</button>
                <button onClick={()=>{
                  const phone = SUPERVISANDOS.find(s=>s.name===cobModal.s)?.phone||"";
                  const msg = `Olá, ${cobModal.s.split(" ").pop()}! 😊\n\nLembrando do pagamento da supervisão de ${cobModal.month}: R$ ${cobModal.value} (${cobModal.sessions} sessões).\n\nPIX: supervisor@presenca.com\n\nAbraço!`;
                  window.open(`https://wa.me/${phone.replace(/\D/g,"")}?text=${encodeURIComponent(msg)}`,"_blank");
                  setCobModal(null);
                }} className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-sans font-semibold cursor-pointer border-none" style={{background:"#25D366",color:"#FFF"}}>{Ic.wa} Enviar</button>
              </div>
            </motion.div>
          </motion.div>
        )}
        {/* Upload */}
        {uploadModal && (
          <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="fixed inset-0 z-[9998] flex items-center justify-center" onClick={()=>setUploadModal(false)}>
            <div className="absolute inset-0" style={{background:"rgba(0,0,0,0.5)",backdropFilter:"blur(4px)"}}/>
            <motion.div initial={{opacity:0,scale:0.95}} animate={{opacity:1,scale:1}} exit={{opacity:0,scale:0.95}}
              className="relative z-10 w-full max-w-[440px] rounded-[20px] overflow-hidden" style={{background:"var(--c-surface)",border:"1px solid var(--c-border)"}} onClick={e=>e.stopPropagation()}>
              <div className="px-6 pt-5 pb-4" style={{borderBottom:"1px solid var(--c-border)"}}>
                <h3 className="text-lg font-serif italic" style={{color:"var(--c-text)"}}>Adicionar material</h3>
              </div>
              <div className="px-6 py-5 flex flex-col gap-4">
                <input placeholder="Nome do material" className="w-full px-4 py-3 rounded-xl text-sm font-sans focus:outline-none" style={{background:"var(--c-card)",border:"1px solid var(--c-border)",color:"var(--c-text)"}}/>
                <div className="flex flex-wrap gap-1.5">
                  {["Protocolo","Artigo","Escala","Template","Vídeo","Material"].map(t => (
                    <button key={t} className="px-3 py-1.5 rounded-lg text-[11px] font-sans font-medium cursor-pointer border-none" style={{background:"var(--c-card)",color:libTypeC[t]||"var(--c-text-dim)",border:"1px solid var(--c-border)"}}>{t}</button>
                  ))}
                </div>
                <div className="border-2 border-dashed rounded-xl p-8 text-center cursor-pointer" style={{borderColor:"var(--c-border)"}}>
                  <p className="text-sm font-sans" style={{color:"var(--c-text-dim)"}}>Arraste ou clique para upload</p>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  <span className="text-[10px] font-sans" style={{color:"var(--c-text-dim)"}}>Compartilhar com:</span>
                  {SUPERVISANDOS.filter(s=>s.status==="Ativo").map(s => (
                    <button key={s.name} className="px-2 py-0.5 rounded-md text-[10px] font-sans cursor-pointer border-none" style={{background:"var(--c-card)",color:"var(--c-text-muted)",border:"1px solid var(--c-border)"}}>{s.name.split(" ")[0]} {s.name.split(" ").pop()}</button>
                  ))}
                </div>
              </div>
              <div className="px-6 py-4 flex justify-end gap-3" style={{borderTop:"1px solid var(--c-border)"}}>
                <button onClick={()=>setUploadModal(false)} className="px-5 py-2.5 rounded-xl text-sm font-sans font-medium cursor-pointer bg-transparent" style={{border:"1px solid var(--c-border)",color:"var(--c-text-muted)"}}>Cancelar</button>
                <button onClick={()=>setUploadModal(false)} className="px-6 py-2.5 rounded-xl text-sm font-sans font-semibold cursor-pointer border-none" style={{background:"var(--c-couple)",color:"var(--c-bg)"}}>Adicionar</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
