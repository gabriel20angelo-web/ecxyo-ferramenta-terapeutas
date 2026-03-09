"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ── ICONS ──
const Ic = {
  dollar: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>,
  up: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>,
  down: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="23 18 13.5 8.5 8.5 13.5 1 6"/><polyline points="17 18 23 18 23 12"/></svg>,
  search: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
  plus: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
  whatsapp: <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/></svg>,
  alert: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>,
  chart: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>,
};

// ── DATA ──
const RECEITAS = [
  { id:1, patient:"Lucas Mendonça", date:"10/03", value:220, method:"PIX", status:"Pago", type:"Individual" },
  { id:2, patient:"Ana Beatriz Souza", date:"10/03", value:220, method:"PIX", status:"Pago", type:"Individual" },
  { id:3, patient:"Rafael & Camila", date:"10/03", value:175, method:"PIX", status:"Parcial", type:"Casal", pending:175 },
  { id:4, patient:"Thiago Akira", date:"10/03", value:220, method:"Cartão", status:"Pago", type:"Individual" },
  { id:5, patient:"Grupo Gestantes", date:"10/03", value:480, method:"PIX", status:"Pago", type:"Grupo" },
  { id:6, patient:"Juliana Ferreira", date:"10/03", value:220, method:"—", status:"Pendente", type:"Individual" },
  { id:7, patient:"Pedro Henrique", date:"04/03", value:220, method:"PIX", status:"Pago", type:"Individual" },
  { id:8, patient:"Carla Santos", date:"04/03", value:220, method:"Cartão", status:"Pago", type:"Individual" },
  { id:9, patient:"Beatriz Lima", date:"04/03", value:220, method:"PIX", status:"Pago", type:"Individual" },
  { id:10, patient:"Fernanda Moura", date:"04/03", value:110, method:"PIX", status:"Parcial", type:"Individual", pending:110 },
  { id:11, patient:"Roberto Almeida", date:"05/03", value:220, method:"—", status:"Pendente", type:"Individual" },
  { id:12, patient:"Abrana Peixoto", date:"06/03", value:220, method:"PIX", status:"Pago", type:"Individual" },
];

const DESPESAS = [
  { id:1, desc:"Aluguel Sala", date:"05/03", value:450, category:"Aluguel", status:"Pago", recurrent:true },
  { id:2, desc:"Supervisão Clínica", date:"01/03", value:350, category:"Supervisão", status:"Pago", recurrent:true },
  { id:3, desc:"Software Prontuário", date:"01/03", value:89, category:"Software", status:"Pago", recurrent:true },
  { id:4, desc:"Material Psicoeducativo", date:"08/03", value:65, category:"Material", status:"Pago", recurrent:false },
  { id:5, desc:"Contabilidade", date:"10/03", value:200, category:"Imposto", status:"A pagar", recurrent:true },
  { id:6, desc:"Plataforma Agendamento", date:"01/03", value:49, category:"Software", status:"Pago", recurrent:true },
  { id:7, desc:"Curso Atualização TCC", date:"15/03", value:180, category:"Formação", status:"A pagar", recurrent:false },
];

const COBRANCAS = [
  { patient:"Rafael & Camila", phone:"+5531998761234", total:175, sessions:1, lastSession:"10/03", daysSince:0, plan:"Quinzenal · R$ 350" },
  { patient:"Juliana Ferreira", phone:"+5531945678901", total:220, sessions:1, lastSession:"10/03", daysSince:0, plan:"Semanal · R$ 220" },
  { patient:"Fernanda Moura", phone:"+5531944332211", total:110, sessions:1, lastSession:"04/03", daysSince:6, plan:"Semanal · R$ 220" },
  { patient:"Roberto Almeida", phone:"+5531955667788", total:220, sessions:1, lastSession:"05/03", daysSince:5, plan:"Semanal · R$ 220" },
  { patient:"Camila Oliveira", phone:"+5531990000099", total:360, sessions:2, lastSession:"20/01", daysSince:49, plan:"Semanal · R$ 180" },
  { patient:"Mariana Costa", phone:"+5531923456789", total:220, sessions:1, lastSession:"20/02", daysSince:18, plan:"Semanal · R$ 220" },
];

const CHART = [
  {m:"Jan",rp:3200,rnp:800,d:850},{m:"Fev",rp:3800,rnp:1200,d:920},{m:"Mar",rp:4100,rnp:1400,d:1050},
  {m:"Abr",rp:3600,rnp:600,d:880},{m:"Mai",rp:3900,rnp:900,d:900},{m:"Jun",rp:3500,rnp:700,d:870},
  {m:"Jul",rp:3700,rnp:800,d:920},{m:"Ago",rp:4000,rnp:1000,d:950},{m:"Set",rp:3800,rnp:900,d:880},
  {m:"Out",rp:4200,rnp:1100,d:1000},{m:"Nov",rp:4500,rnp:800,d:950},{m:"Dez",rp:3000,rnp:500,d:800},
];

const sc:Record<string,{c:string;bg:string}> = {
  Pago:{c:"var(--c-green)",bg:"var(--c-green-soft)"},Parcial:{c:"var(--c-accent)",bg:"var(--c-accent-soft)"},
  Pendente:{c:"var(--c-rose)",bg:"var(--c-rose-soft)"},"A pagar":{c:"var(--c-rose)",bg:"var(--c-rose-soft)"},
};
const catC:Record<string,string> = {Aluguel:"var(--c-rose)",Supervisão:"var(--c-couple)",Software:"var(--c-blue)",Material:"var(--c-accent)",Imposto:"var(--c-text-dim)",Formação:"var(--c-green)"};

export function FinanceiroPage() {
  const [tab, setTab] = useState("painel");
  const [recSearch, setRecSearch] = useState("");
  const [recFilter, setRecFilter] = useState("Todos");
  const [despSearch, setDespSearch] = useState("");
  const [cobModal, setCobModal] = useState<typeof COBRANCAS[0]|null>(null);
  const [receitasList, setReceitasList] = useState(RECEITAS);
  const [despesasList, setDespesasList] = useState(DESPESAS);
  const [cobSent, setCobSent] = useState<Set<string>>(new Set());
  const [cobPaid, setCobPaid] = useState<Set<string>>(new Set());
  const [addDespModal, setAddDespModal] = useState(false);
  const [newDesp, setNewDesp] = useState({desc:"",value:"",category:"Aluguel",recurrent:false});

  const totalRec = receitasList.reduce((a,r) => a+r.value, 0);
  const totalPago = receitasList.filter(r=>r.status==="Pago").reduce((a,r) => a+r.value, 0);
  const totalPendente = receitasList.filter(r=>r.status!=="Pago").reduce((a,r) => a+r.value, 0) + receitasList.filter(r=>r.pending).reduce((a,r) => a+(r.pending||0), 0);
  const totalDesp = despesasList.reduce((a,d) => a+d.value, 0);
  const totalDespPago = despesasList.filter(d=>d.status==="Pago").reduce((a,d) => a+d.value, 0);
  const totalCob = COBRANCAS.filter(c => !cobPaid.has(c.patient)).reduce((a,c) => a+c.total, 0);
  const maxChart = Math.max(...CHART.map(d => d.rp+d.rnp));
  const inadimplencia = totalRec > 0 ? ((totalCob / totalRec) * 100).toFixed(1) : "0";

  // Previous month comparison
  const prevRec = 4200; const prevDesp = 920; const prevResult = prevRec - prevDesp;
  const currResult = totalPago - totalDespPago;
  const recDiff = totalRec > 0 ? (((totalRec - prevRec) / prevRec) * 100).toFixed(0) : "0";
  const despDiff = totalDesp > 0 ? (((totalDesp - prevDesp) / prevDesp) * 100).toFixed(0) : "0";
  const resDiff = prevResult > 0 ? (((currResult - prevResult) / prevResult) * 100).toFixed(0) : "0";

  const markReceitaPago = (id: number) => {
    setReceitasList(prev => prev.map(r => r.id === id ? {...r, status: "Pago", method: "PIX", pending: undefined} : r));
  };

  const tabs = [
    {key:"painel",label:"Painel Financeiro",icon:Ic.chart},
    {key:"receitas",label:"Receitas",icon:Ic.up},
    {key:"despesas",label:"Despesas",icon:Ic.down},
    {key:"cobrancas",label:"Cobranças",icon:Ic.alert},
  ];

  return (
    <div className="max-w-[1200px]">
      <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} className="flex justify-between items-end mb-7">
        <div>
          <span className="text-xs font-sans font-semibold text-accent tracking-[0.1em] uppercase">Gestão</span>
          <h1 className="text-4xl font-serif italic text-text font-normal mt-1">Financeiro</h1>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 rounded-xl" style={{background:"var(--c-surface)",border:"1px solid var(--c-border)"}}>
          <span className="text-xs font-sans" style={{color:"var(--c-text-dim)"}}>Período:</span>
          <span className="text-sm font-sans font-semibold" style={{color:"var(--c-text)"}}>Março 2026</span>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--c-text-dim)" strokeWidth="2" strokeLinecap="round"><polyline points="6 9 12 15 18 9"/></svg>
        </div>
      </motion.div>

      {/* Tabs */}
      <div className="flex gap-1 mb-6">
        {tabs.map(t => (
          <button key={t.key} onClick={() => setTab(t.key)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl border-none text-[13px] font-sans font-medium cursor-pointer transition-all duration-200"
            style={{background:tab===t.key?"var(--c-accent-soft)":"transparent",color:tab===t.key?"var(--c-accent)":"var(--c-text-dim)"}}>
            <span style={{color:tab===t.key?"var(--c-accent)":"var(--c-text-dim)"}}>{t.icon}</span>
            {t.label}
            {t.key==="cobrancas" && <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full" style={{background:"var(--c-rose-soft)",color:"var(--c-rose)"}}>{COBRANCAS.length}</span>}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {/* ══ PAINEL ══ */}
        {tab === "painel" && (
          <motion.div key="painel" initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} exit={{opacity:0}}>
            {/* KPI Cards */}
            <div className="grid grid-cols-4 gap-4 mb-7">
              {[
                {l:"Resultado previsto",v:`R$ ${((totalRec-totalDesp)/1000).toFixed(1)}k`,sub:`Atual: + R$ ${((totalPago-totalDespPago)/1000).toFixed(1)}k`,c:"var(--c-accent)",border:"var(--c-accent)",diff:resDiff},
                {l:"Receitas previstas",v:`R$ ${(totalRec/1000).toFixed(1)}k`,sub:`Pago: R$ ${(totalPago/1000).toFixed(1)}k · Não pago: R$ ${(totalPendente/1000).toFixed(0)}`,c:"var(--c-green)",border:"var(--c-green)",diff:recDiff},
                {l:"Despesas previstas",v:`R$ ${(totalDesp/1000).toFixed(1)}k`,sub:`Pago: R$ ${(totalDespPago/1000).toFixed(1)}k · A pagar: R$ ${((totalDesp-totalDespPago))}`,c:"var(--c-rose)",border:"var(--c-rose)",diff:despDiff},
                {l:"Inadimplência",v:`${inadimplencia}%`,sub:`${COBRANCAS.filter(c=>!cobPaid.has(c.patient)).length} pacientes · R$ ${totalCob}`,c:parseFloat(inadimplencia)>20?"var(--c-rose)":"var(--c-accent)",border:parseFloat(inadimplencia)>20?"var(--c-rose)":"var(--c-accent)",diff:null},
              ].map((s,i) => (
                <motion.div key={s.l} initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{delay:0.05+i*0.05}}
                  className="rounded-[18px] p-5 transition-all duration-300"
                  style={{background:"var(--c-surface)",border:`1px solid var(--c-border)`,borderTop:`3px solid ${s.border}`}}>
                  <div className="flex items-center justify-between">
                    <div className="text-[10px] font-sans font-semibold uppercase tracking-[0.08em]" style={{color:"var(--c-text-dim)"}}>{s.l}</div>
                    {s.diff !== null && (
                      <span className="flex items-center gap-1 text-[10px] font-sans font-semibold px-2 py-0.5 rounded-full"
                        style={{
                          color: parseInt(s.diff) >= 0 ? (s.l.includes("Despesas") ? "var(--c-rose)" : "var(--c-green)") : (s.l.includes("Despesas") ? "var(--c-green)" : "var(--c-rose)"),
                          background: parseInt(s.diff) >= 0 ? (s.l.includes("Despesas") ? "var(--c-rose-soft)" : "var(--c-green-soft)") : (s.l.includes("Despesas") ? "var(--c-green-soft)" : "var(--c-rose-soft)"),
                        }}>
                        {parseInt(s.diff) >= 0 ? "↑" : "↓"} {Math.abs(parseInt(s.diff))}% vs Fev
                      </span>
                    )}
                  </div>
                  <div className="text-[28px] font-serif italic mt-1" style={{color:s.c}}>{s.v}</div>
                  <div className="text-[11px] font-sans mt-1" style={{color:"var(--c-text-dim)"}}>{s.sub}</div>
                </motion.div>
              ))}
            </div>

            {/* Chart */}
            <motion.div initial={{opacity:0,y:15}} animate={{opacity:1,y:0}} transition={{delay:0.2}}
              className="rounded-[20px] p-7 mb-7" style={{background:"var(--c-surface)",border:"1px solid var(--c-border)"}}>
              <h3 className="text-sm font-sans font-semibold uppercase tracking-[0.08em] flex items-center gap-2 mb-6" style={{color:"var(--c-accent)"}}>
                <span className="w-4 h-px" style={{background:"var(--c-accent)"}}/>Receitas e Despesas — 2026
              </h3>
              <div className="flex items-end gap-3 h-48">
                {CHART.map((d,i) => {
                  const rpH = (d.rp/maxChart)*100;
                  const rnpH = (d.rnp/maxChart)*100;
                  const dH = (d.d/maxChart)*100;
                  const isCurrent = i === 2;
                  return (
                    <div key={i} className="flex-1 flex flex-col items-center gap-1.5 group">
                      <div className="flex gap-[2px] items-end w-full h-40 relative">
                        <motion.div initial={{height:0}} animate={{height:`${rpH}%`}} transition={{delay:0.3+i*0.03,duration:0.5}}
                          className="flex-1 rounded-t-sm" style={{background:isCurrent?"var(--c-green)":"var(--c-green)",opacity:isCurrent?1:0.6}}/>
                        <motion.div initial={{height:0}} animate={{height:`${rnpH}%`}} transition={{delay:0.33+i*0.03,duration:0.5}}
                          className="flex-1 rounded-t-sm" style={{background:"var(--c-green-soft)",opacity:0.7}}/>
                        <motion.div initial={{height:0}} animate={{height:`${dH}%`}} transition={{delay:0.36+i*0.03,duration:0.5}}
                          className="flex-1 rounded-t-sm" style={{background:isCurrent?"var(--c-rose)":"var(--c-rose-soft)",opacity:isCurrent?1:0.6}}/>
                        <div className="absolute -top-9 left-1/2 -translate-x-1/2 px-2 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap text-[10px] font-sans z-10"
                          style={{background:"var(--c-card)",border:"1px solid var(--c-border)",color:"var(--c-text-muted)"}}>
                          R$ {((d.rp+d.rnp)/1000).toFixed(1)}k · R$ {d.d}
                        </div>
                      </div>
                      <span className="text-[10px] font-sans" style={{color:isCurrent?"var(--c-accent)":"var(--c-text-dim)"}}>{d.m}</span>
                    </div>
                  );
                })}
              </div>
              <div className="flex gap-5 mt-4">
                {[{l:"Receitas pagas",c:"var(--c-green)"},{l:"Receitas não pagas",c:"var(--c-green-soft)"},{l:"Despesas",c:"var(--c-rose-soft)"}].map(l => (
                  <div key={l.l} className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-sm" style={{background:l.c}}/><span className="text-[10px] font-sans" style={{color:"var(--c-text-dim)"}}>{l.l}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Recent transactions */}
            <motion.div initial={{opacity:0,y:15}} animate={{opacity:1,y:0}} transition={{delay:0.3}}
              className="rounded-[20px] overflow-hidden" style={{background:"var(--c-surface)",border:"1px solid var(--c-border)"}}>
              <div className="px-6 py-4" style={{borderBottom:"1px solid var(--c-border)"}}>
                <h3 className="text-sm font-sans font-semibold uppercase tracking-[0.08em] flex items-center gap-2" style={{color:"var(--c-accent)"}}>
                  <span className="w-4 h-px" style={{background:"var(--c-accent)"}}/>Movimentações recentes
                </h3>
              </div>
              <div className="grid grid-cols-[2fr_1fr_1fr_100px_100px] px-6 py-2.5" style={{borderBottom:"1px solid var(--c-border)"}}>
                {["Descrição","Data","Valor","Status","Tipo"].map(h => <span key={h} className="text-[10px] font-sans font-semibold uppercase tracking-[0.06em]" style={{color:"var(--c-text-dim)"}}>{h}</span>)}
              </div>
              {[...RECEITAS.slice(0,5).map(r=>({desc:r.patient,date:r.date,value:r.value,status:r.status,tipo:"Receita",sign:"+"})),
                ...DESPESAS.slice(0,3).map(d=>({desc:d.desc,date:d.date,value:d.value,status:d.status,tipo:"Despesa",sign:"−"}))
              ].sort((a,b)=>b.date.localeCompare(a.date)).map((t,i) => (
                <div key={i} className="grid grid-cols-[2fr_1fr_1fr_100px_100px] px-6 py-3 items-center" style={{borderBottom:"1px solid var(--c-border)"}}>
                  <span className="text-sm font-sans font-medium" style={{color:"var(--c-text)"}}>{t.desc}</span>
                  <span className="text-sm font-sans" style={{color:"var(--c-text-dim)"}}>{t.date}</span>
                  <span className="text-sm font-sans font-semibold" style={{color:t.sign==="+"?"var(--c-green)":"var(--c-rose)"}}>{t.sign} R$ {t.value}</span>
                  <span className="text-[11px] font-sans font-semibold px-2.5 py-0.5 rounded-lg w-fit" style={{color:sc[t.status]?.c,background:sc[t.status]?.bg}}>{t.status}</span>
                  <span className="text-xs font-sans" style={{color:"var(--c-text-dim)"}}>{t.tipo}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>
        )}

        {/* ══ RECEITAS ══ */}
        {tab === "receitas" && (
          <motion.div key="rec" initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} exit={{opacity:0}}>
            {/* Summary */}
            <div className="grid grid-cols-3 gap-4 mb-5">
              {[{l:"Total recebido",v:`R$ ${(totalPago/1000).toFixed(1)}k`,c:"var(--c-green)"},{l:"A receber",v:`R$ ${totalPendente}`,c:"var(--c-accent)"},{l:"Ticket médio",v:`R$ ${Math.round(totalRec/RECEITAS.length)}`,c:"var(--c-blue)"}].map((s,i) => (
                <div key={s.l} className="rounded-[16px] p-5" style={{background:"var(--c-surface)",border:"1px solid var(--c-border)"}}>
                  <div className="text-[10px] font-sans font-semibold uppercase tracking-[0.06em]" style={{color:"var(--c-text-dim)"}}>{s.l}</div>
                  <div className="text-2xl font-serif italic mt-1" style={{color:s.c}}>{s.v}</div>
                </div>
              ))}
            </div>
            {/* Filters */}
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center gap-2 px-3 py-2 rounded-xl flex-1 max-w-[280px]" style={{background:"var(--c-surface)",border:"1px solid var(--c-border)"}}>
                {Ic.search}
                <input value={recSearch} onChange={e=>setRecSearch(e.target.value)} placeholder="Buscar receita..."
                  className="bg-transparent border-none outline-none text-sm font-sans flex-1" style={{color:"var(--c-text)"}}/>
              </div>
              {["Todos","Pago","Parcial","Pendente"].map(f => (
                <button key={f} onClick={()=>setRecFilter(f)}
                  className="px-3 py-1.5 rounded-lg text-xs font-sans font-medium cursor-pointer border-none transition-colors"
                  style={{background:recFilter===f?"var(--c-accent-soft)":"transparent",color:recFilter===f?"var(--c-accent)":"var(--c-text-dim)"}}>{f}</button>
              ))}
            </div>
            {/* Table */}
            <div className="rounded-[20px] overflow-hidden" style={{background:"var(--c-surface)",border:"1px solid var(--c-border)"}}>
              <div className="grid grid-cols-[2fr_80px_100px_100px_80px_80px] px-6 py-2.5" style={{borderBottom:"1px solid var(--c-border)"}}>
                {["Paciente","Data","Valor","Método","Status","Tipo"].map(h => <span key={h} className="text-[10px] font-sans font-semibold uppercase tracking-[0.06em]" style={{color:"var(--c-text-dim)"}}>{h}</span>)}
              </div>
              {receitasList.filter(r=>recFilter==="Todos"||r.status===recFilter).filter(r=>!recSearch||r.patient.toLowerCase().includes(recSearch.toLowerCase())).map((r,i) => (
                <motion.div key={r.id} initial={{opacity:0}} animate={{opacity:1}} transition={{delay:i*0.03}}
                  className="grid grid-cols-[2fr_80px_100px_100px_80px_80px] px-6 py-3 items-center transition-colors group relative"
                  style={{borderBottom:"1px solid var(--c-border)"}}
                  onMouseEnter={e=>(e.currentTarget.style.background="var(--c-surface-hover)")}
                  onMouseLeave={e=>(e.currentTarget.style.background="transparent")}>
                  <span className="text-sm font-sans font-medium" style={{color:"var(--c-text)"}}>{r.patient}</span>
                  <span className="text-sm font-sans" style={{color:"var(--c-text-dim)"}}>{r.date}</span>
                  <span className="text-sm font-sans font-semibold" style={{color:"var(--c-green)"}}>+ R$ {r.value}</span>
                  <span className="text-xs font-sans px-2 py-0.5 rounded-md" style={{color:"var(--c-text-muted)",background:"var(--c-card)"}}>{r.method}</span>
                  <span className="text-[11px] font-sans font-semibold px-2 py-0.5 rounded-lg w-fit" style={{color:sc[r.status]?.c,background:sc[r.status]?.bg}}>{r.status}</span>
                  <span className="text-[11px] font-sans" style={{color:"var(--c-text-dim)"}}>{r.type}</span>
                  {/* Registrar pagamento */}
                  {r.status !== "Pago" && (
                    <motion.button whileHover={{scale:1.05}} whileTap={{scale:0.95}}
                      onClick={() => markReceitaPago(r.id)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-1.5 px-3 py-1.5 rounded-lg cursor-pointer border-none opacity-0 group-hover:opacity-100 transition-opacity"
                      style={{background:"var(--c-green-soft)",color:"var(--c-green)"}}>
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
                      <span className="text-[10px] font-sans font-semibold">Registrar pgto</span>
                    </motion.button>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* ══ DESPESAS ══ */}
        {tab === "despesas" && (
          <motion.div key="desp" initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} exit={{opacity:0}}>
            <div className="grid grid-cols-3 gap-4 mb-5">
              {[{l:"Total despesas",v:`R$ ${(totalDesp/1000).toFixed(1)}k`,c:"var(--c-rose)"},{l:"Pago",v:`R$ ${totalDespPago}`,c:"var(--c-green)"},{l:"A pagar",v:`R$ ${totalDesp-totalDespPago}`,c:"var(--c-accent)"}].map((s,i) => (
                <div key={s.l} className="rounded-[16px] p-5" style={{background:"var(--c-surface)",border:"1px solid var(--c-border)"}}>
                  <div className="text-[10px] font-sans font-semibold uppercase tracking-[0.06em]" style={{color:"var(--c-text-dim)"}}>{s.l}</div>
                  <div className="text-2xl font-serif italic mt-1" style={{color:s.c}}>{s.v}</div>
                </div>
              ))}
            </div>
            {/* Search + add */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 px-3 py-2 rounded-xl flex-1 max-w-[280px]" style={{background:"var(--c-surface)",border:"1px solid var(--c-border)"}}>
                {Ic.search}
                <input value={despSearch} onChange={e=>setDespSearch(e.target.value)} placeholder="Buscar despesa..."
                  className="bg-transparent border-none outline-none text-sm font-sans flex-1" style={{color:"var(--c-text)"}}/>
              </div>
              <button onClick={() => setAddDespModal(true)} className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-sans font-semibold cursor-pointer border-none"
                style={{background:"var(--c-accent-soft)",color:"var(--c-accent)",border:"1px solid var(--c-accent-soft)"}}>
                {Ic.plus} Adicionar despesa
              </button>
            </div>
            {/* Table */}
            <div className="rounded-[20px] overflow-hidden" style={{background:"var(--c-surface)",border:"1px solid var(--c-border)"}}>
              <div className="grid grid-cols-[2fr_80px_100px_100px_80px_60px] px-6 py-2.5" style={{borderBottom:"1px solid var(--c-border)"}}>
                {["Descrição","Data","Valor","Categoria","Status","Rec."].map(h => <span key={h} className="text-[10px] font-sans font-semibold uppercase tracking-[0.06em]" style={{color:"var(--c-text-dim)"}}>{h}</span>)}
              </div>
              {despesasList.filter(d=>!despSearch||d.desc.toLowerCase().includes(despSearch.toLowerCase())).map((d,i) => (
                <motion.div key={d.id} initial={{opacity:0}} animate={{opacity:1}} transition={{delay:i*0.03}}
                  className="grid grid-cols-[2fr_80px_100px_100px_80px_60px] px-6 py-3 items-center transition-colors"
                  style={{borderBottom:"1px solid var(--c-border)"}}
                  onMouseEnter={e=>(e.currentTarget.style.background="var(--c-surface-hover)")}
                  onMouseLeave={e=>(e.currentTarget.style.background="transparent")}>
                  <span className="text-sm font-sans font-medium" style={{color:"var(--c-text)"}}>{d.desc}</span>
                  <span className="text-sm font-sans" style={{color:"var(--c-text-dim)"}}>{d.date}</span>
                  <span className="text-sm font-sans font-semibold" style={{color:"var(--c-rose)"}}>− R$ {d.value}</span>
                  <span className="text-[11px] font-sans font-semibold px-2 py-0.5 rounded-lg w-fit" style={{color:catC[d.category]||"var(--c-text-dim)",background:"var(--c-card)"}}>{d.category}</span>
                  <span className="text-[11px] font-sans font-semibold px-2 py-0.5 rounded-lg w-fit" style={{color:sc[d.status]?.c,background:sc[d.status]?.bg}}>{d.status}</span>
                  <span className="text-[11px] font-sans" style={{color:d.recurrent?"var(--c-accent)":"var(--c-text-dim)"}}>{d.recurrent?"Sim":"—"}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* ══ COBRANÇAS ══ */}
        {tab === "cobrancas" && (
          <motion.div key="cob" initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} exit={{opacity:0}}>
            {/* Summary */}
            <div className="grid grid-cols-3 gap-4 mb-5">
              {[{l:"Total inadimplente",v:`R$ ${totalCob}`,c:"var(--c-rose)"},{l:"Pacientes",v:String(COBRANCAS.length),c:"var(--c-accent)"},{l:"Maior dívida",v:`R$ ${Math.max(...COBRANCAS.map(c=>c.total))}`,c:"var(--c-rose)"}].map((s,i) => (
                <div key={s.l} className="rounded-[16px] p-5" style={{background:"var(--c-surface)",border:"1px solid var(--c-border)"}}>
                  <div className="text-[10px] font-sans font-semibold uppercase tracking-[0.06em]" style={{color:"var(--c-text-dim)"}}>{s.l}</div>
                  <div className="text-2xl font-serif italic mt-1" style={{color:s.c}}>{s.v}</div>
                </div>
              ))}
            </div>
            {/* Debtors list */}
            <div className="flex flex-col gap-3">
              {COBRANCAS.filter(c => !cobPaid.has(c.patient)).sort((a,b)=>b.total-a.total).map((c,i) => {
                const urgency = c.daysSince > 30 ? "var(--c-rose)" : c.daysSince > 14 ? "var(--c-accent)" : "var(--c-green)";
                const wasSent = cobSent.has(c.patient);
                return (
                  <motion.div key={i} initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} transition={{delay:0.05+i*0.04}}
                    className="rounded-[18px] p-5 flex items-center gap-5 transition-colors"
                    style={{background:"var(--c-surface)",border:`1px solid ${wasSent?"var(--c-accent-soft)":"var(--c-border)"}`}}
                    onMouseEnter={e=>(e.currentTarget.style.borderColor="var(--c-rose-soft)")}
                    onMouseLeave={e=>(e.currentTarget.style.borderColor=wasSent?"var(--c-accent-soft)":"var(--c-border)")}>
                    <div className="w-11 h-11 rounded-full flex items-center justify-center text-sm font-serif italic flex-shrink-0"
                      style={{background:"var(--c-rose-soft)",color:"var(--c-rose)"}}>{c.patient.charAt(0)}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-sans font-medium" style={{color:"var(--c-text)"}}>{c.patient}</span>
                        <span className="text-[10px] font-sans" style={{color:"var(--c-text-dim)"}}>{c.plan}</span>
                        {wasSent && (
                          <span className="flex items-center gap-1 text-[10px] font-sans font-semibold px-2 py-0.5 rounded-full"
                            style={{background:"var(--c-accent-soft)",color:"var(--c-accent)"}}>
                            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
                            Cobrança enviada
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-3 mt-1">
                        <div className="flex items-center gap-1.5">
                          <div className="w-1.5 h-1.5 rounded-full" style={{background:urgency}}/>
                          <span className="text-[11px] font-sans" style={{color:urgency}}>{c.daysSince === 0 ? "Hoje" : `${c.daysSince} dias`}</span>
                        </div>
                        <span className="text-[11px] font-sans" style={{color:"var(--c-text-dim)"}}>Última: {c.lastSession}</span>
                        <span className="text-[11px] font-sans" style={{color:"var(--c-text-dim)"}}>{c.sessions} sessão(ões)</span>
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0 mr-3">
                      <div className="text-xl font-serif italic" style={{color:"var(--c-rose)"}}>R$ {c.total}</div>
                    </div>
                    <div className="flex gap-2 flex-shrink-0">
                      {!wasSent ? (
                        <motion.button whileHover={{scale:1.05}} whileTap={{scale:0.95}}
                          onClick={() => setCobModal(c)}
                          className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-sans font-semibold cursor-pointer border-none"
                          style={{background:"#25D36618",color:"#25D366"}}>
                          {Ic.whatsapp} Cobrar
                        </motion.button>
                      ) : (
                        <motion.button whileHover={{scale:1.05}} whileTap={{scale:0.95}}
                          onClick={() => setCobModal(c)}
                          className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-sans font-medium cursor-pointer border-none"
                          style={{background:"var(--c-card)",color:"var(--c-text-muted)",border:"1px solid var(--c-border)"}}>
                          {Ic.whatsapp} Reenviar
                        </motion.button>
                      )}
                      <motion.button whileHover={{scale:1.05}} whileTap={{scale:0.95}}
                        onClick={() => setCobPaid(prev => new Set(prev).add(c.patient))}
                        className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-sans font-semibold cursor-pointer border-none"
                        style={{background:"var(--c-green-soft)",color:"var(--c-green)"}}>
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
                        Pago
                      </motion.button>
                    </div>
                  </motion.div>
                );
              })}
              {/* All paid state */}
              {COBRANCAS.filter(c => !cobPaid.has(c.patient)).length === 0 && (
                <div className="rounded-[18px] p-10 text-center" style={{background:"var(--c-surface)",border:"1px solid var(--c-border)"}}>
                  <div className="mb-2" style={{color:"var(--c-green)"}}>
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                  </div>
                  <p className="text-sm font-sans font-medium" style={{color:"var(--c-green)"}}>Todas as cobranças foram quitadas!</p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── COBRANÇA WHATSAPP MODAL ── */}
      <AnimatePresence>
        {cobModal && (
          <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
            className="fixed inset-0 z-[9998] flex items-center justify-center"
            onClick={() => setCobModal(null)}>
            <div className="absolute inset-0" style={{background:"rgba(0,0,0,0.5)",backdropFilter:"blur(4px)"}}/>
            <motion.div initial={{opacity:0,scale:0.95,y:20}} animate={{opacity:1,scale:1,y:0}} exit={{opacity:0,scale:0.95}}
              className="relative z-10 w-full max-w-[460px] rounded-[20px] overflow-hidden"
              style={{background:"var(--c-surface)",border:"1px solid var(--c-border)",boxShadow:"0 24px 80px var(--c-shadow)"}}
              onClick={e=>e.stopPropagation()}>
              <div className="px-6 pt-5 pb-4 flex items-center gap-3" style={{borderBottom:"1px solid var(--c-border)"}}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{background:"var(--c-rose-soft)"}}>
                  <span style={{color:"var(--c-rose)"}}>{Ic.dollar}</span>
                </div>
                <div>
                  <h3 className="text-lg font-serif italic" style={{color:"var(--c-text)"}}>Enviar cobrança</h3>
                  <p className="text-xs font-sans" style={{color:"var(--c-text-dim)"}}>
                    <span style={{color:"var(--c-rose)"}}>{cobModal.patient}</span> · R$ {cobModal.total}
                  </p>
                </div>
              </div>
              <div className="px-6 py-5">
                <div className="p-4 rounded-xl rounded-bl-sm" style={{background:"#DCF8C6",color:"#111B21"}}>
                  <p className="text-[13px] font-sans leading-relaxed whitespace-pre-line">
                    {`Olá, ${cobModal.patient.split(" ")[0]}! 😊\n\nEspero que esteja tudo bem. Passando pra lembrar que temos um valor em aberto de R$ ${cobModal.total} referente à(s) ${cobModal.sessions} sessão(ões).\n\nVocê pode fazer via PIX para:\n📱 Chave: marina@presenca.com\n\nQualquer dúvida, estou à disposição!\n\nAbraço,\nDra. Marina`}
                  </p>
                  <div className="flex justify-end mt-1"><span className="text-[10px]" style={{color:"#667781"}}>agora ✓✓</span></div>
                </div>
              </div>
              <div className="px-6 py-4 flex justify-end gap-3" style={{borderTop:"1px solid var(--c-border)"}}>
                <button onClick={()=>setCobModal(null)}
                  className="px-5 py-2.5 rounded-xl text-sm font-sans font-medium cursor-pointer bg-transparent"
                  style={{border:"1px solid var(--c-border)",color:"var(--c-text-muted)"}}>Cancelar</button>
                <motion.button whileHover={{scale:1.02}} whileTap={{scale:0.98}}
                  onClick={() => {
                    const msg = `Olá, ${cobModal.patient.split(" ")[0]}! 😊\n\nEspero que esteja tudo bem. Passando pra lembrar que temos um valor em aberto de R$ ${cobModal.total} referente à(s) ${cobModal.sessions} sessão(ões).\n\nVocê pode fazer via PIX para:\n📱 Chave: marina@presenca.com\n\nQualquer dúvida, estou à disposição!\n\nAbraço,\nDra. Marina`;
                    window.open(`https://wa.me/${cobModal.phone.replace(/\D/g,"")}?text=${encodeURIComponent(msg)}`,"_blank");
                    setCobSent(prev => new Set(prev).add(cobModal.patient));
                    setCobModal(null);
                  }}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-sans font-semibold cursor-pointer border-none"
                  style={{background:"#25D366",color:"#FFFFFF"}}>
                  {Ic.whatsapp} Enviar cobrança
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── ADICIONAR DESPESA MODAL ── */}
      <AnimatePresence>
        {addDespModal && (
          <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
            className="fixed inset-0 z-[9998] flex items-center justify-center"
            onClick={() => setAddDespModal(false)}>
            <div className="absolute inset-0" style={{background:"rgba(0,0,0,0.5)",backdropFilter:"blur(4px)"}}/>
            <motion.div initial={{opacity:0,scale:0.95,y:20}} animate={{opacity:1,scale:1,y:0}} exit={{opacity:0,scale:0.95}}
              className="relative z-10 w-full max-w-[440px] rounded-[20px] overflow-hidden"
              style={{background:"var(--c-surface)",border:"1px solid var(--c-border)",boxShadow:"0 24px 80px var(--c-shadow)"}}
              onClick={e=>e.stopPropagation()}>
              <div className="px-6 pt-5 pb-4 flex items-center gap-3" style={{borderBottom:"1px solid var(--c-border)"}}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{background:"var(--c-rose-soft)"}}>
                  <span style={{color:"var(--c-rose)"}}>{Ic.down}</span>
                </div>
                <h3 className="text-lg font-serif italic" style={{color:"var(--c-text)"}}>Nova despesa</h3>
              </div>
              <div className="px-6 py-5 flex flex-col gap-4">
                <div>
                  <label className="text-xs font-sans font-semibold uppercase tracking-[0.08em] mb-1.5 block" style={{color:"var(--c-accent)"}}>Descrição</label>
                  <input value={newDesp.desc} onChange={e=>setNewDesp(p=>({...p,desc:e.target.value}))} placeholder="Ex: Aluguel sala"
                    className="w-full px-4 py-3 rounded-xl text-sm font-sans focus:outline-none" style={{background:"var(--c-card)",border:"1px solid var(--c-border)",color:"var(--c-text)"}}/>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-sans font-semibold uppercase tracking-[0.08em] mb-1.5 block" style={{color:"var(--c-accent)"}}>Valor (R$)</label>
                    <input value={newDesp.value} onChange={e=>setNewDesp(p=>({...p,value:e.target.value}))} placeholder="0,00" type="number"
                      className="w-full px-4 py-3 rounded-xl text-sm font-sans focus:outline-none" style={{background:"var(--c-card)",border:"1px solid var(--c-border)",color:"var(--c-text)"}}/>
                  </div>
                  <div>
                    <label className="text-xs font-sans font-semibold uppercase tracking-[0.08em] mb-1.5 block" style={{color:"var(--c-accent)"}}>Categoria</label>
                    <div className="flex flex-wrap gap-1.5">
                      {Object.keys(catC).map(cat => (
                        <button key={cat} onClick={()=>setNewDesp(p=>({...p,category:cat}))}
                          className="px-2.5 py-1 rounded-lg text-[11px] font-sans font-medium cursor-pointer border-none transition-colors"
                          style={{background:newDesp.category===cat?"var(--c-accent-soft)":"var(--c-card)",color:newDesp.category===cat?catC[cat]:"var(--c-text-dim)",border:"1px solid var(--c-border)"}}>{cat}</button>
                      ))}
                    </div>
                  </div>
                </div>
                <label className="flex items-center gap-2.5 cursor-pointer">
                  <div className="w-[18px] h-[18px] rounded-md border-2 flex items-center justify-center transition-all"
                    style={{borderColor:newDesp.recurrent?"var(--c-accent)":"var(--c-border)",background:newDesp.recurrent?"var(--c-accent-soft)":"transparent"}}
                    onClick={()=>setNewDesp(p=>({...p,recurrent:!p.recurrent}))}>
                    {newDesp.recurrent && <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="var(--c-accent)" strokeWidth="3" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>}
                  </div>
                  <span className="text-xs font-sans" style={{color:"var(--c-text-muted)"}}>Despesa recorrente (mensal)</span>
                </label>
              </div>
              <div className="px-6 py-4 flex justify-end gap-3" style={{borderTop:"1px solid var(--c-border)"}}>
                <button onClick={()=>{setAddDespModal(false);setNewDesp({desc:"",value:"",category:"Aluguel",recurrent:false});}}
                  className="px-5 py-2.5 rounded-xl text-sm font-sans font-medium cursor-pointer bg-transparent"
                  style={{border:"1px solid var(--c-border)",color:"var(--c-text-muted)"}}>Cancelar</button>
                <motion.button whileHover={{scale:1.02}} whileTap={{scale:0.98}}
                  onClick={() => {
                    if (newDesp.desc && newDesp.value) {
                      setDespesasList(prev => [...prev, {
                        id: Date.now(), desc: newDesp.desc, date: "10/03",
                        value: parseFloat(newDesp.value), category: newDesp.category,
                        status: "A pagar", recurrent: newDesp.recurrent,
                      }]);
                      setNewDesp({desc:"",value:"",category:"Aluguel",recurrent:false});
                      setAddDespModal(false);
                    }
                  }}
                  className="px-6 py-2.5 rounded-xl text-sm font-sans font-semibold cursor-pointer border-none"
                  style={{background:"var(--c-accent)",color:"var(--c-bg)"}}>Adicionar</motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
