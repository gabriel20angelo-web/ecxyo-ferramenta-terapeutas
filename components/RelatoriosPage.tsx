"use client";
import { useState } from "react";
import { motion } from "framer-motion";

// ── DATA ──
const PERIODS = ["Março 2026","Fevereiro 2026","Jan–Mar 2026","Out–Mar 2026","2026","2025"];
const PERIOD_LABELS = ["Mês","Mês","Trimestre","Semestre","Ano","Ano"];

const KPIs = [
  {l:"Clientes ativos",v:"54",prev:"51",c:"var(--c-green)"},
  {l:"Lista de espera",v:"12",prev:"9",c:"var(--c-accent)"},
  {l:"Com alta",v:"26",prev:"24",c:"var(--c-blue)"},
  {l:"Desativados",v:"13",prev:"14",c:"var(--c-text-dim)"},
  {l:"Desistentes",v:"10",prev:"8",c:"var(--c-rose)"},
];

const GENDER = [{l:"Feminino",v:58,c:"var(--c-accent)"},{l:"Masculino",v:32,c:"var(--c-blue)"},{l:"Não-binário",v:5,c:"var(--c-green)"},{l:"Outro",v:5,c:"var(--c-couple)"}];
const AGE = [{l:"13–20",v:8},{l:"21–30",v:35},{l:"31–40",v:28},{l:"41–50",v:18},{l:"51–60",v:8},{l:"60+",v:3}];
const SESSIONS_MONTH = [{m:"Jan",v:38},{m:"Fev",v:42},{m:"Mar",v:43},{m:"Abr",v:36},{m:"Mai",v:40},{m:"Jun",v:35},{m:"Jul",v:32},{m:"Ago",v:39},{m:"Set",v:41},{m:"Out",v:44},{m:"Nov",v:46},{m:"Dez",v:30}];

const FUNNEL = [
  {stage:"Contato inicial",v:120,c:"var(--c-text-muted)"},
  {stage:"Triagem",v:85,c:"var(--c-blue)"},
  {stage:"1ª sessão",v:68,c:"var(--c-accent)"},
  {stage:"5ª sessão",v:54,c:"var(--c-green)"},
  {stage:"6 meses",v:38,c:"var(--c-green)"},
  {stage:"Alta",v:26,c:"var(--c-couple)"},
];

const HEATMAP_DATA: number[][] = [
  [0,2,3,3,2,1,0,0],[0,3,4,3,3,2,1,0],[0,1,2,4,3,2,1,0],[0,2,3,5,4,2,1,0],[0,2,3,3,2,1,0,0],
];
const HEAT_HOURS = ["06","07","08","09","10","14","15","16"];
const HEAT_DAYS = ["Seg","Ter","Qua","Qui","Sex"];

const RECEITA_RANKING = [
  {name:"Grupo Gestantes",value:3840},{name:"Bernardo Costa",value:2640},{name:"Abrana Peixoto",value:2420},
  {name:"Lucas Mendonça",value:2200},{name:"Ana Beatriz Souza",value:1980},{name:"Thiago Akira",value:1760},
  {name:"Carla Santos",value:1540},{name:"Pedro Henrique",value:1320},{name:"Fernanda Moura",value:1210},
  {name:"Roberto Almeida",value:1100},
];

const DESISTENCIA = [{motivo:"Financeiro",v:35,c:"var(--c-rose)"},{motivo:"Sem retorno",v:25,c:"var(--c-accent)"},{motivo:"Mudança",v:15,c:"var(--c-blue)"},{motivo:"Alta informal",v:15,c:"var(--c-green)"},{motivo:"Insatisfação",v:10,c:"var(--c-couple)"}];

const PERMANENCIA = [{tipo:"Individual",meses:8.2,c:"var(--c-green)"},{tipo:"Casal",meses:5.4,c:"var(--c-couple)"},{tipo:"Grupo",meses:4.1,c:"var(--c-blue)"}];

const REC_DESP = [
  {m:"Jan",rec:4000,desp:850},{m:"Fev",rec:5000,desp:920},{m:"Mar",rec:5500,desp:1050},
  {m:"Abr",rec:4200,desp:880},{m:"Mai",rec:4800,desp:900},{m:"Jun",rec:4200,desp:870},
  {m:"Jul",rec:4500,desp:920},{m:"Ago",rec:5000,desp:950},{m:"Set",rec:4700,desp:880},
  {m:"Out",rec:5300,desp:1000},{m:"Nov",rec:5300,desp:950},{m:"Dez",rec:3500,desp:800},
];

const NPS_DATA = [{m:"Out",v:72},{m:"Nov",v:78},{m:"Dez",v:75},{m:"Jan",v:82},{m:"Fev",v:85},{m:"Mar",v:88}];
const QUEIXAS = [{q:"Ansiedade",v:32,c:"var(--c-accent)"},{q:"Depressão",v:22,c:"var(--c-blue)"},{q:"Relacionamento",v:18,c:"var(--c-couple)"},{q:"Autoestima",v:12,c:"var(--c-green)"},{q:"Luto",v:8,c:"var(--c-rose)"},{q:"TDAH",v:5,c:"var(--c-text-muted)"},{q:"Outros",v:3,c:"var(--c-text-dim)"}];

// ── COMPONENT ──
export function RelatoriosPage() {
  const [period, setPeriod] = useState(0);

  const maxAge = Math.max(...AGE.map(a=>a.v));
  const maxSess = Math.max(...SESSIONS_MONTH.map(s=>s.v));
  const maxRank = RECEITA_RANKING[0].value;
  const maxRD = Math.max(...REC_DESP.map(d=>Math.max(d.rec,d.desp)));
  const maxHeat = Math.max(...HEATMAP_DATA.flat());
  const conversionRate = ((54/120)*100).toFixed(0);

  return (
    <div className="max-w-[1200px]">
      {/* Header */}
      <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} className="flex justify-between items-end mb-7">
        <div>
          <span className="text-xs font-sans font-semibold tracking-[0.1em] uppercase" style={{color:"var(--c-accent)"}}>Analytics</span>
          <h1 className="text-4xl font-serif italic font-normal mt-1" style={{color:"var(--c-text)"}}>Relatórios</h1>
        </div>
        <div className="flex items-center gap-3">
          {/* Period filter */}
          <div className="flex gap-1 rounded-xl p-[3px]" style={{background:"var(--c-surface)",border:"1px solid var(--c-border)"}}>
            {PERIODS.slice(0,4).map((p,i) => (
              <button key={i} onClick={()=>setPeriod(i)}
                className="px-3 py-1.5 rounded-lg text-xs font-sans font-medium cursor-pointer border-none transition-all"
                style={{background:period===i?"var(--c-accent-soft)":"transparent",color:period===i?"var(--c-accent)":"var(--c-text-dim)"}}>
                {i<2 ? PERIODS[i].split(" ")[0] : PERIOD_LABELS[i]}
              </button>
            ))}
          </div>
          {/* Export */}
          <motion.button whileHover={{scale:1.03}} whileTap={{scale:0.97}}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-sans font-semibold cursor-pointer border-none"
            style={{background:"var(--c-accent)",color:"var(--c-bg)"}}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            Exportar PDF
          </motion.button>
        </div>
      </motion.div>

      {/* KPIs with comparison */}
      <div className="grid grid-cols-5 gap-3 mb-7">
        {KPIs.map((k,i) => {
          const diff = parseInt(k.v) - parseInt(k.prev);
          const pct = ((diff / parseInt(k.prev)) * 100).toFixed(0);
          const isGood = k.l.includes("Desist") || k.l.includes("Desativ") ? diff < 0 : diff > 0;
          return (
            <motion.div key={k.l} initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{delay:i*0.04}}
              className="rounded-[16px] p-4" style={{background:"var(--c-surface)",border:"1px solid var(--c-border)"}}>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-sans font-semibold uppercase tracking-[0.06em]" style={{color:"var(--c-text-dim)"}}>{k.l}</span>
                <span className="text-[9px] font-sans font-semibold px-1.5 py-0.5 rounded-full"
                  style={{color:isGood?"var(--c-green)":"var(--c-rose)",background:isGood?"var(--c-green-soft)":"var(--c-rose-soft)"}}>
                  {diff>0?"↑":"↓"}{Math.abs(parseInt(pct))}%
                </span>
              </div>
              <div className="text-[28px] font-serif italic mt-1" style={{color:k.c}}>{k.v}</div>
            </motion.div>
          );
        })}
      </div>

      {/* Row 1: Funnel + Conversão + Heatmap */}
      <div className="grid grid-cols-[1fr_1fr] gap-5 mb-5">
        {/* Funnel */}
        <motion.div initial={{opacity:0,y:15}} animate={{opacity:1,y:0}} transition={{delay:0.15}}
          className="rounded-[20px] p-6" style={{background:"var(--c-surface)",border:"1px solid var(--c-border)"}}>
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-sm font-sans font-semibold uppercase tracking-[0.08em] flex items-center gap-2" style={{color:"var(--c-accent)"}}>
              <span className="w-4 h-px" style={{background:"var(--c-accent)"}}/>Funil terapêutico
            </h3>
            <span className="text-[10px] font-sans font-semibold px-2 py-0.5 rounded-full" style={{background:"var(--c-green-soft)",color:"var(--c-green)"}}>
              Conversão: {conversionRate}%
            </span>
          </div>
          <div className="flex flex-col gap-2">
            {FUNNEL.map((f,i) => {
              const w = (f.v / FUNNEL[0].v) * 100;
              return (
                <div key={i} className="flex items-center gap-3">
                  <span className="text-[11px] font-sans w-24 text-right flex-shrink-0" style={{color:"var(--c-text-dim)"}}>{f.stage}</span>
                  <div className="flex-1 h-7 rounded-md overflow-hidden relative" style={{background:"var(--c-card)"}}>
                    <motion.div initial={{width:0}} animate={{width:`${w}%`}} transition={{delay:0.2+i*0.08,duration:0.6}}
                      className="h-full rounded-md flex items-center justify-end pr-2"
                      style={{background:f.c,opacity:0.7}}>
                      <span className="text-[10px] font-sans font-bold" style={{color:"var(--c-bg)"}}>{f.v}</span>
                    </motion.div>
                  </div>
                  {i > 0 && <span className="text-[10px] font-sans flex-shrink-0 w-10" style={{color:"var(--c-text-dim)"}}>
                    {((1 - f.v/FUNNEL[i-1].v)*100).toFixed(0)}% ↓
                  </span>}
                  {i === 0 && <span className="w-10"/>}
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Heatmap */}
        <motion.div initial={{opacity:0,y:15}} animate={{opacity:1,y:0}} transition={{delay:0.2}}
          className="rounded-[20px] p-6" style={{background:"var(--c-surface)",border:"1px solid var(--c-border)"}}>
          <h3 className="text-sm font-sans font-semibold uppercase tracking-[0.08em] flex items-center gap-2 mb-5" style={{color:"var(--c-accent)"}}>
            <span className="w-4 h-px" style={{background:"var(--c-accent)"}}/>Ocupação por horário
          </h3>
          <div className="grid gap-1" style={{gridTemplateColumns:`50px repeat(${HEAT_HOURS.length}, 1fr)`}}>
            <div/>
            {HEAT_HOURS.map(h => <span key={h} className="text-[10px] font-sans text-center" style={{color:"var(--c-text-dim)"}}>{h}h</span>)}
            {HEAT_DAYS.map((day,di) => (
              <>
                <span key={`l${di}`} className="text-[11px] font-sans flex items-center" style={{color:"var(--c-text-dim)"}}>{day}</span>
                {HEATMAP_DATA[di].map((val,hi) => {
                  const intensity = maxHeat > 0 ? val / maxHeat : 0;
                  return (
                    <motion.div key={`${di}-${hi}`} initial={{opacity:0,scale:0.8}} animate={{opacity:1,scale:1}} transition={{delay:0.25+di*0.04+hi*0.02}}
                      className="aspect-square rounded-md cursor-default flex items-center justify-center"
                      style={{background:intensity>0?`var(--c-green)`:("var(--c-card)"),opacity:intensity>0?0.2+intensity*0.8:0.3}}
                      title={`${day} ${HEAT_HOURS[hi]}h: ${val} sessões`}>
                      {val > 0 && <span className="text-[9px] font-sans font-bold" style={{color:intensity>0.6?"var(--c-bg)":"var(--c-text-dim)"}}>{val}</span>}
                    </motion.div>
                  );
                })}
              </>
            ))}
          </div>
          <div className="flex items-center gap-2 mt-3">
            <span className="text-[10px] font-sans" style={{color:"var(--c-text-dim)"}}>Menor</span>
            {[0.2,0.4,0.6,0.8,1].map((o,i) => <div key={i} className="w-4 h-3 rounded-sm" style={{background:"var(--c-green)",opacity:o}}/>)}
            <span className="text-[10px] font-sans" style={{color:"var(--c-text-dim)"}}>Maior</span>
          </div>
        </motion.div>
      </div>

      {/* Row 2: Gender + Age + Queixas */}
      <div className="grid grid-cols-3 gap-5 mb-5">
        {/* Gender */}
        <motion.div initial={{opacity:0,y:15}} animate={{opacity:1,y:0}} transition={{delay:0.25}}
          className="rounded-[20px] p-6" style={{background:"var(--c-surface)",border:"1px solid var(--c-border)"}}>
          <h3 className="text-sm font-sans font-semibold uppercase tracking-[0.08em] flex items-center gap-2 mb-5" style={{color:"var(--c-accent)"}}>
            <span className="w-4 h-px" style={{background:"var(--c-accent)"}}/>Gênero
          </h3>
          {GENDER.map((g,i) => (
            <div key={i} className="flex items-center gap-3 mb-3">
              <span className="text-xs font-sans w-20 flex-shrink-0" style={{color:"var(--c-text-dim)"}}>{g.l}</span>
              <div className="flex-1 h-5 rounded-md overflow-hidden" style={{background:"var(--c-card)"}}>
                <motion.div initial={{width:0}} animate={{width:`${g.v}%`}} transition={{delay:0.3+i*0.08,duration:0.5}}
                  className="h-full rounded-md" style={{background:g.c,opacity:0.7}}/>
              </div>
              <span className="text-xs font-sans font-semibold w-10 text-right" style={{color:g.c}}>{g.v}%</span>
            </div>
          ))}
        </motion.div>

        {/* Age */}
        <motion.div initial={{opacity:0,y:15}} animate={{opacity:1,y:0}} transition={{delay:0.3}}
          className="rounded-[20px] p-6" style={{background:"var(--c-surface)",border:"1px solid var(--c-border)"}}>
          <h3 className="text-sm font-sans font-semibold uppercase tracking-[0.08em] flex items-center gap-2 mb-5" style={{color:"var(--c-accent)"}}>
            <span className="w-4 h-px" style={{background:"var(--c-accent)"}}/>Faixa etária
          </h3>
          <div className="flex items-end gap-2 h-28">
            {AGE.map((a,i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <motion.div initial={{height:0}} animate={{height:`${(a.v/maxAge)*100}%`}} transition={{delay:0.35+i*0.05,duration:0.5}}
                  className="w-full rounded-t-md" style={{background:"var(--c-accent)",opacity:0.3+(a.v/maxAge)*0.7}}/>
                <span className="text-[9px] font-sans" style={{color:"var(--c-text-dim)"}}>{a.l}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Queixas */}
        <motion.div initial={{opacity:0,y:15}} animate={{opacity:1,y:0}} transition={{delay:0.35}}
          className="rounded-[20px] p-6" style={{background:"var(--c-surface)",border:"1px solid var(--c-border)"}}>
          <h3 className="text-sm font-sans font-semibold uppercase tracking-[0.08em] flex items-center gap-2 mb-5" style={{color:"var(--c-accent)"}}>
            <span className="w-4 h-px" style={{background:"var(--c-accent)"}}/>Queixas principais
          </h3>
          {QUEIXAS.map((q,i) => (
            <div key={i} className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 rounded-full flex-shrink-0" style={{background:q.c}}/>
              <span className="text-[11px] font-sans flex-1" style={{color:"var(--c-text-muted)"}}>{q.q}</span>
              <span className="text-[11px] font-sans font-semibold" style={{color:q.c}}>{q.v}%</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Row 3: Sessions/month + Receita vs Despesa */}
      <div className="grid grid-cols-2 gap-5 mb-5">
        {/* Sessions */}
        <motion.div initial={{opacity:0,y:15}} animate={{opacity:1,y:0}} transition={{delay:0.4}}
          className="rounded-[20px] p-6" style={{background:"var(--c-surface)",border:"1px solid var(--c-border)"}}>
          <h3 className="text-sm font-sans font-semibold uppercase tracking-[0.08em] flex items-center gap-2 mb-5" style={{color:"var(--c-accent)"}}>
            <span className="w-4 h-px" style={{background:"var(--c-accent)"}}/>Sessões por mês
          </h3>
          <div className="flex items-end gap-2 h-32">
            {SESSIONS_MONTH.map((s,i) => {
              const h = (s.v/maxSess)*100;
              const isCurr = i === 2;
              return (
                <div key={i} className="flex-1 flex flex-col items-center gap-1 group">
                  <div className="w-full h-24 relative flex items-end">
                    <motion.div initial={{height:0}} animate={{height:`${h}%`}} transition={{delay:0.45+i*0.03,duration:0.5}}
                      className="w-full rounded-t-sm" style={{background:isCurr?"var(--c-green)":"var(--c-green)",opacity:isCurr?1:0.4}}/>
                    <div className="absolute -top-5 left-1/2 -translate-x-1/2 text-[9px] font-sans font-bold opacity-0 group-hover:opacity-100 transition-opacity" style={{color:"var(--c-text-muted)"}}>{s.v}</div>
                  </div>
                  <span className="text-[9px] font-sans" style={{color:isCurr?"var(--c-accent)":"var(--c-text-dim)"}}>{s.m}</span>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Receita vs Despesa line */}
        <motion.div initial={{opacity:0,y:15}} animate={{opacity:1,y:0}} transition={{delay:0.45}}
          className="rounded-[20px] p-6" style={{background:"var(--c-surface)",border:"1px solid var(--c-border)"}}>
          <h3 className="text-sm font-sans font-semibold uppercase tracking-[0.08em] flex items-center gap-2 mb-5" style={{color:"var(--c-accent)"}}>
            <span className="w-4 h-px" style={{background:"var(--c-accent)"}}/>Receita × Despesa
          </h3>
          <div className="relative h-32">
            {/* Grid lines */}
            {[0,0.25,0.5,0.75,1].map(p => (
              <div key={p} className="absolute left-0 right-0 h-px" style={{top:`${(1-p)*100}%`,background:"var(--c-border)"}}/>
            ))}
            {/* Receita dots + line */}
            <svg className="absolute inset-0 w-full h-full" viewBox={`0 0 ${REC_DESP.length*1} 1`} preserveAspectRatio="none">
              <polyline fill="none" stroke="var(--c-green)" strokeWidth="0.02" points={REC_DESP.map((d,i) => `${i/(REC_DESP.length-1)},${1-d.rec/maxRD}`).join(" ")}/>
              <polyline fill="none" stroke="var(--c-rose)" strokeWidth="0.02" strokeDasharray="0.03 0.02" points={REC_DESP.map((d,i) => `${i/(REC_DESP.length-1)},${1-d.desp/maxRD}`).join(" ")}/>
            </svg>
            {/* Labels */}
            <div className="absolute bottom-0 left-0 right-0 flex justify-between translate-y-5">
              {REC_DESP.map((d,i) => <span key={i} className="text-[8px] font-sans" style={{color:i===2?"var(--c-accent)":"var(--c-text-dim)"}}>{d.m}</span>)}
            </div>
          </div>
          <div className="flex gap-4 mt-7">
            <div className="flex items-center gap-1.5"><div className="w-3 h-0.5 rounded" style={{background:"var(--c-green)"}}/><span className="text-[10px] font-sans" style={{color:"var(--c-text-dim)"}}>Receita</span></div>
            <div className="flex items-center gap-1.5"><div className="w-3 h-0.5 rounded" style={{background:"var(--c-rose)",borderTop:"1px dashed var(--c-rose)"}}/><span className="text-[10px] font-sans" style={{color:"var(--c-text-dim)"}}>Despesa</span></div>
          </div>
        </motion.div>
      </div>

      {/* Row 4: Ranking + Desistência + Permanência + NPS */}
      <div className="grid grid-cols-[1fr_1fr] gap-5 mb-5">
        {/* Receita por paciente */}
        <motion.div initial={{opacity:0,y:15}} animate={{opacity:1,y:0}} transition={{delay:0.5}}
          className="rounded-[20px] p-6" style={{background:"var(--c-surface)",border:"1px solid var(--c-border)"}}>
          <h3 className="text-sm font-sans font-semibold uppercase tracking-[0.08em] flex items-center gap-2 mb-4" style={{color:"var(--c-accent)"}}>
            <span className="w-4 h-px" style={{background:"var(--c-accent)"}}/>Top 10 — Receita por paciente
          </h3>
          <div className="flex flex-col gap-1.5">
            {RECEITA_RANKING.map((r,i) => (
              <div key={i} className="flex items-center gap-3 py-1">
                <span className="text-[10px] font-sans font-bold w-5 text-right" style={{color:i<3?"var(--c-accent)":"var(--c-text-dim)"}}>{i+1}</span>
                <span className="text-[12px] font-sans flex-1" style={{color:"var(--c-text-muted)"}}>{r.name}</span>
                <div className="w-24 h-3 rounded-sm overflow-hidden" style={{background:"var(--c-card)"}}>
                  <motion.div initial={{width:0}} animate={{width:`${(r.value/maxRank)*100}%`}} transition={{delay:0.55+i*0.03,duration:0.4}}
                    className="h-full rounded-sm" style={{background:"var(--c-green)",opacity:0.3+(r.value/maxRank)*0.7}}/>
                </div>
                <span className="text-[11px] font-sans font-semibold w-16 text-right" style={{color:"var(--c-green)"}}>R$ {(r.value/1000).toFixed(1)}k</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Desistência + Permanência + NPS stacked */}
        <div className="flex flex-col gap-5">
          {/* Motivos desistência */}
          <motion.div initial={{opacity:0,y:15}} animate={{opacity:1,y:0}} transition={{delay:0.55}}
            className="rounded-[20px] p-6" style={{background:"var(--c-surface)",border:"1px solid var(--c-border)"}}>
            <h3 className="text-sm font-sans font-semibold uppercase tracking-[0.08em] flex items-center gap-2 mb-4" style={{color:"var(--c-accent)"}}>
              <span className="w-4 h-px" style={{background:"var(--c-accent)"}}/>Motivos de desistência
            </h3>
            <div className="flex h-6 rounded-lg overflow-hidden mb-3">
              {DESISTENCIA.map((d,i) => (
                <motion.div key={i} initial={{width:0}} animate={{width:`${d.v}%`}} transition={{delay:0.6+i*0.06,duration:0.5}}
                  className="h-full" style={{background:d.c,opacity:0.7}} title={`${d.motivo}: ${d.v}%`}/>
              ))}
            </div>
            <div className="flex flex-wrap gap-3">
              {DESISTENCIA.map((d,i) => (
                <div key={i} className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full" style={{background:d.c,opacity:0.7}}/> 
                  <span className="text-[10px] font-sans" style={{color:"var(--c-text-dim)"}}>{d.motivo} {d.v}%</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Permanência + NPS side by side */}
          <div className="grid grid-cols-2 gap-5">
            {/* Permanência */}
            <motion.div initial={{opacity:0,y:15}} animate={{opacity:1,y:0}} transition={{delay:0.6}}
              className="rounded-[20px] p-5" style={{background:"var(--c-surface)",border:"1px solid var(--c-border)"}}>
              <h3 className="text-[10px] font-sans font-semibold uppercase tracking-[0.08em] mb-3" style={{color:"var(--c-accent)"}}>Permanência média</h3>
              {PERMANENCIA.map((p,i) => (
                <div key={i} className="flex items-center justify-between py-1.5">
                  <span className="text-[11px] font-sans" style={{color:"var(--c-text-dim)"}}>{p.tipo}</span>
                  <span className="text-base font-serif italic" style={{color:p.c}}>{p.meses}m</span>
                </div>
              ))}
              <div className="mt-2 pt-2" style={{borderTop:"1px solid var(--c-border)"}}>
                <div className="flex justify-between"><span className="text-[10px] font-sans" style={{color:"var(--c-text-dim)"}}>Geral</span><span className="text-sm font-serif italic" style={{color:"var(--c-accent)"}}>6.8m</span></div>
              </div>
            </motion.div>

            {/* NPS */}
            <motion.div initial={{opacity:0,y:15}} animate={{opacity:1,y:0}} transition={{delay:0.65}}
              className="rounded-[20px] p-5" style={{background:"var(--c-surface)",border:"1px solid var(--c-border)"}}>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-[10px] font-sans font-semibold uppercase tracking-[0.08em]" style={{color:"var(--c-accent)"}}>NPS</h3>
                <span className="text-[10px] font-sans font-semibold px-2 py-0.5 rounded-full" style={{background:"var(--c-green-soft)",color:"var(--c-green)"}}>+88</span>
              </div>
              <div className="flex items-end gap-1 h-14">
                {NPS_DATA.map((n,i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-0.5">
                    <motion.div initial={{height:0}} animate={{height:`${((n.v-60)/40)*100}%`}} transition={{delay:0.7+i*0.04,duration:0.4}}
                      className="w-full rounded-t-sm" style={{background:n.v>=80?"var(--c-green)":"var(--c-accent)",opacity:0.5+(n.v-60)/80}}/>
                    <span className="text-[8px] font-sans" style={{color:"var(--c-text-dim)"}}>{n.m}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom KPIs */}
      <div className="grid grid-cols-4 gap-3 mb-5">
        {[
          {l:"Sessões/mês",v:"43",prev:"42",c:"var(--c-green)"},
          {l:"Ocupação",v:"82%",prev:"79%",c:"var(--c-accent)"},
          {l:"No-show",v:"3.8%",prev:"4.2%",c:"var(--c-rose)"},
          {l:"Retenção 6m",v:"71%",prev:"68%",c:"var(--c-blue)"},
        ].map((s,i) => {
          const curr = parseFloat(s.v); const prev = parseFloat(s.prev);
          const diff = curr - prev; const isGood = s.l==="No-show" ? diff<0 : diff>0;
          return (
            <motion.div key={s.l} initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{delay:0.7+i*0.05}}
              className="rounded-[16px] p-5" style={{background:"var(--c-surface)",border:"1px solid var(--c-border)"}}>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-sans font-semibold uppercase tracking-[0.06em]" style={{color:"var(--c-text-dim)"}}>{s.l}</span>
                <span className="text-[9px] font-sans font-semibold px-1.5 py-0.5 rounded-full"
                  style={{color:isGood?"var(--c-green)":"var(--c-rose)",background:isGood?"var(--c-green-soft)":"var(--c-rose-soft)"}}>
                  {isGood?"↑":"↓"} vs Fev
                </span>
              </div>
              <div className="text-[28px] font-serif italic mt-1" style={{color:s.c}}>{s.v}</div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
