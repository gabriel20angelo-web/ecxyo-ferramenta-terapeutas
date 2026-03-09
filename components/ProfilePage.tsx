"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { THERAPIST, WEEK_SLOTS } from "@/lib/mockData";

const I = {
  star: <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
  play: <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="5 3 19 12 5 21 5 3"/></svg>,
  check: <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>,
  chevDown: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="6 9 12 15 18 9"/></svg>,
  map: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>,
  globe: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>,
  link: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>,
  wa: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/></svg>,
};

const TESTIMONIALS = [
  {text:"A Marina me ajudou a entender padrões que eu repetia há anos. Processo transformador.",rating:5,author:"Paciente · 8 meses"},
  {text:"Me sinto acolhida e segura nas sessões. A abordagem dela é muito respeitosa.",rating:5,author:"Paciente · 1 ano"},
  {text:"Excelente profissional. Mudou minha relação com ansiedade completamente.",rating:5,author:"Paciente · 6 meses"},
  {text:"Recomendo muito. Atendimento online funciona super bem com ela.",rating:4,author:"Paciente · 4 meses"},
];

const FAQS = [
  {q:"Quanto dura cada sessão?",a:"Sessões individuais duram 50 minutos. Terapia de casal, 80 minutos. Avaliação psicológica, 90 minutos."},
  {q:"Como funciona a primeira consulta?",a:"A primeira sessão é de acolhimento — conversamos sobre o que te trouxe, suas expectativas e como posso te ajudar. Não há pressão para decidir nada. É um espaço seguro para você se sentir à vontade."},
  {q:"Aceita convênio?",a:"Atendo particular e emito recibo para reembolso em convênios que aceitam. Consulte seu plano sobre cobertura de psicoterapia."},
  {q:"Qual a política de cancelamento?",a:"Cancelamentos com até 24h de antecedência não geram cobrança. Cancelamentos em cima da hora ou faltas são cobrados integralmente."},
  {q:"Atende online?",a:"Sim! Atendo presencialmente na Savassi, BH, e online via plataforma segura. A experiência é muito semelhante ao presencial."},
  {q:"Atende preço social?",a:"Sim, disponibilizo vagas com valor acessível. Entre em contato para verificar disponibilidade."},
];

const ARTICLES = [
  {title:"5 sinais de que a ansiedade está impactando seu trabalho",date:"05/03/2026",reads:142,tags:["Ansiedade","Trabalho"]},
  {title:"O que esperar da primeira sessão de terapia",date:"20/02/2026",reads:89,tags:["Primeira sessão","Acolhimento"]},
  {title:"Grounding: técnica simples para momentos de crise",date:"10/02/2026",reads:234,tags:["Técnica","Grounding"]},
];

const SPEC_DESCRIPTIONS: Record<string,string> = {
  "Ansiedade":"Trabalho com exposição gradual, técnicas de grounding e reestruturação cognitiva para ansiedade generalizada, pânico e fobias.",
  "Depressão":"Abordagem integrativa combinando escuta psicodinâmica com ativação comportamental para quadros depressivos.",
  "Trauma":"Processamento de experiências traumáticas com foco em regulação emocional e reconstrução de segurança.",
  "Autoestima":"Exploração de crenças centrais e padrões relacionais que impactam a autoimagem e autoconfiança.",
  "Relacionamentos":"Dinâmicas de casal, comunicação assertiva e padrões transgeracionais que se repetem nos vínculos.",
  "Luto":"Acompanhamento respeitoso do processo de luto, trabalhando significado e reorganização de vida.",
  "Terapia de Casal":"Trabalho sistêmico com a dinâmica do casal, comunicação não-violenta e resolução de conflitos.",
  "Supervisão Clínica":"Supervisão para terapeutas em formação ou em exercício, com foco em desenvolvimento clínico e manejo de contratransferência.",
};

const LINKS = [
  {name:"Instagram",url:"#",icon:<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>},
  {name:"Doctoralia",url:"#",icon:<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>},
  {name:"LinkedIn",url:"#",icon:<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>},
  {name:"Google Maps",url:"#",icon:I.map},
];

type Props = { selectedService:number; setSelectedService:(n:number)=>void; selectedSlot:string|null; setSelectedSlot:(s:string|null)=>void };

export function ProfilePage({ selectedService, setSelectedService, selectedSlot, setSelectedSlot }: Props) {
  const [modality, setModality] = useState<"presencial"|"online">("presencial");
  const [openFaq, setOpenFaq] = useState<number|null>(null);
  const [hoveredSpec, setHoveredSpec] = useState<string|null>(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [testimonialIdx, setTestimonialIdx] = useState(0);

  const service = THERAPIST.services[selectedService];
  const DAYS = ["Seg","Ter","Qua","Qui","Sex"];
  const DATES = ["10","11","12","13","14"];

  const handleSlotSelect = (slot:string) => {
    setSelectedSlot(slot);
    setShowConfirm(true);
  };

  return (
    <div className="max-w-[1100px]">
      {/* ── HERO ── */}
      <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}}
        className="rounded-[24px] p-8 mb-8 relative overflow-hidden"
        style={{background:"var(--c-surface)",border:"1px solid var(--c-border)"}}>
        <div className="absolute top-0 right-0 w-[400px] h-[400px] pointer-events-none" style={{background:"radial-gradient(circle at top right, var(--c-accent-soft), transparent 60%)"}}/>
        <div className="relative flex items-start gap-8">
          {/* Avatar */}
          <div className="relative flex-shrink-0">
            <div className="w-28 h-28 rounded-full flex items-center justify-center text-4xl font-serif italic"
              style={{background:"linear-gradient(135deg, var(--c-accent-soft), var(--c-green-soft))",color:"var(--c-accent)",border:"3px solid var(--c-accent-soft)"}}>M</div>
            <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full flex items-center justify-center"
              style={{background:"var(--c-green)",border:"2px solid var(--c-surface)"}}>{I.check}</div>
          </div>
          {/* Info */}
          <div className="flex-1">
            <span className="text-xs font-sans font-semibold uppercase tracking-[0.1em]" style={{color:"var(--c-accent)"}}>{THERAPIST.tagline}</span>
            <h1 className="text-4xl font-serif italic mt-1" style={{color:"var(--c-text)"}}>{THERAPIST.name}</h1>
            <p className="text-sm font-sans font-light leading-relaxed mt-3 max-w-[540px]" style={{color:"var(--c-text-muted)"}}>{THERAPIST.bio}</p>
            <div className="flex items-center gap-4 mt-4 flex-wrap">
              <span className="flex items-center gap-1.5 text-xs font-sans" style={{color:"var(--c-text-dim)"}}>{I.check} CRP {THERAPIST.crp.replace("CRP ","")}</span>
              <span className="flex items-center gap-1.5 text-xs font-sans" style={{color:"var(--c-text-dim)"}}>{I.map} {THERAPIST.location}</span>
              <span className="flex items-center gap-1.5 text-xs font-sans" style={{color:"var(--c-text-dim)"}}>{I.globe} Presencial e Online</span>
            </div>
            {/* Metrics */}
            <div className="flex gap-5 mt-5">
              {[{v:"12 anos",l:"Experiência"},{v:"540+",l:"Sessões"},{v:"4.9",l:"Avaliação",star:true},{v:"54",l:"Pac. ativos"}].map(m => (
                <div key={m.l} className="text-center">
                  <div className="text-lg font-serif italic flex items-center justify-center gap-1" style={{color:"var(--c-accent)"}}>
                    {m.v}{m.star && <span style={{color:"var(--c-accent)"}}>{I.star}</span>}
                  </div>
                  <div className="text-[10px] font-sans" style={{color:"var(--c-text-dim)"}}>{m.l}</div>
                </div>
              ))}
            </div>
            {/* Links */}
            <div className="flex gap-2 mt-4">
              {LINKS.map(l => (
                <button key={l.name} className="w-9 h-9 rounded-xl flex items-center justify-center cursor-pointer border-none transition-colors"
                  style={{background:"var(--c-card)",color:"var(--c-text-dim)",border:"1px solid var(--c-border)"}} title={l.name}>{l.icon}</button>
              ))}
            </div>
          </div>
          {/* Video thumbnail */}
          <div className="relative flex-shrink-0 w-[200px] h-[130px] rounded-xl overflow-hidden cursor-pointer group"
            style={{background:"linear-gradient(135deg, var(--c-card), var(--c-surface))",border:"1px solid var(--c-border)"}}>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="w-12 h-12 rounded-full flex items-center justify-center transition-transform group-hover:scale-110"
                style={{background:"var(--c-accent-soft)",color:"var(--c-accent)"}}>{I.play}</div>
              <span className="text-[10px] font-sans font-semibold mt-2" style={{color:"var(--c-text-dim)"}}>Conheça minha abordagem</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ── MAIN GRID ── */}
      <div className="grid grid-cols-[1fr_380px] gap-7">
        {/* LEFT */}
        <div className="flex flex-col gap-7">
          {/* About expanded */}
          <motion.div initial={{opacity:0,y:15}} animate={{opacity:1,y:0}} transition={{delay:0.1}}
            className="rounded-[20px] p-7" style={{background:"var(--c-surface)",border:"1px solid var(--c-border)"}}>
            <h2 className="text-sm font-sans font-semibold uppercase tracking-[0.08em] flex items-center gap-2 mb-5" style={{color:"var(--c-accent)"}}>
              <span className="w-4 h-px" style={{background:"var(--c-accent)"}}/>Sobre mim
            </h2>
            {[{t:"Minha abordagem",d:"Integro a escuta analítica com práticas contemporâneas. Acredito que cada pessoa tem seu próprio ritmo de transformação, e meu papel é oferecer um espaço seguro para que esse processo aconteça de forma autêntica."},
              {t:"Como trabalho",d:"Sessões semanais ou quinzenais, com escuta ativa e intervenções personalizadas. Uso técnicas de grounding, exploração de padrões relacionais e trabalho com a relação terapêutica como ferramenta de mudança."},
              {t:"Público que atendo",d:"Adultos e jovens adultos (18+), casais e grupos. Experiência com ansiedade, depressão, trauma, questões de relacionamento, autoestima e luto."},
              {t:"Primeira sessão",d:"É um espaço de acolhimento, sem pressão. Conversamos sobre o que te trouxe, suas expectativas e como posso te ajudar. Você decide no seu tempo se quer continuar."},
            ].map((s,i) => (
              <div key={i} className="mb-4 last:mb-0">
                <h3 className="text-xs font-sans font-semibold mb-1.5" style={{color:"var(--c-text)"}}>{s.t}</h3>
                <p className="text-sm font-sans font-light leading-relaxed" style={{color:"var(--c-text-muted)"}}>{s.d}</p>
              </div>
            ))}
          </motion.div>

          {/* Specialties with hover descriptions */}
          <motion.div initial={{opacity:0,y:15}} animate={{opacity:1,y:0}} transition={{delay:0.15}}
            className="rounded-[20px] p-7" style={{background:"var(--c-surface)",border:"1px solid var(--c-border)"}}>
            <h2 className="text-sm font-sans font-semibold uppercase tracking-[0.08em] flex items-center gap-2 mb-5" style={{color:"var(--c-accent)"}}>
              <span className="w-4 h-px" style={{background:"var(--c-accent)"}}/>Especialidades
            </h2>
            <div className="flex flex-wrap gap-2">
              {THERAPIST.specialties.map(s => (
                <div key={s} className="relative"
                  onMouseEnter={()=>setHoveredSpec(s)} onMouseLeave={()=>setHoveredSpec(null)}>
                  <span className="px-4 py-2 rounded-xl text-xs font-sans font-medium cursor-default transition-colors"
                    style={{background:hoveredSpec===s?"var(--c-accent-soft)":"var(--c-card)",color:hoveredSpec===s?"var(--c-accent)":"var(--c-text-muted)",border:"1px solid var(--c-border)",display:"inline-block"}}>{s}</span>
                  <AnimatePresence>
                    {hoveredSpec===s && SPEC_DESCRIPTIONS[s] && (
                      <motion.div initial={{opacity:0,y:5}} animate={{opacity:1,y:0}} exit={{opacity:0,y:5}}
                        className="absolute z-50 left-0 top-full mt-2 w-[300px] p-4 rounded-xl text-xs font-sans font-light leading-relaxed"
                        style={{background:"var(--c-card)",border:"1px solid var(--c-border)",color:"var(--c-text-muted)",boxShadow:"0 8px 30px var(--c-shadow)"}}>
                        {SPEC_DESCRIPTIONS[s]}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Services */}
          <motion.div initial={{opacity:0,y:15}} animate={{opacity:1,y:0}} transition={{delay:0.2}}
            className="rounded-[20px] p-7" style={{background:"var(--c-surface)",border:"1px solid var(--c-border)"}}>
            <h2 className="text-sm font-sans font-semibold uppercase tracking-[0.08em] flex items-center gap-2 mb-2" style={{color:"var(--c-accent)"}}>
              <span className="w-4 h-px" style={{background:"var(--c-accent)"}}/>Serviços
            </h2>
            <p className="text-xs font-sans font-light mb-5" style={{color:"var(--c-text-dim)"}}>Selecione um serviço para ver horários</p>
            {THERAPIST.services.map((s,i) => (
              <motion.div key={i} whileHover={{y:-1}} onClick={()=>setSelectedService(i)}
                className="flex items-center gap-4 p-4 rounded-xl mb-2 cursor-pointer transition-all"
                style={{background:selectedService===i?"var(--c-accent-soft)":"transparent",border:`1px solid ${selectedService===i?"var(--c-accent-soft)":"var(--c-border)"}`,borderLeft:selectedService===i?"3px solid var(--c-accent)":"3px solid transparent"}}>
                <span className="text-xl" style={{color:"var(--c-accent)"}}>{s.icon}</span>
                <div className="flex-1">
                  <span className="text-sm font-sans font-medium" style={{color:"var(--c-text)"}}>{s.name}</span>
                  <span className="text-xs font-sans ml-2" style={{color:"var(--c-text-dim)"}}>{s.duration}</span>
                </div>
                <span className="text-base font-serif italic" style={{color:"var(--c-accent)"}}>{s.price}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* Testimonials */}
          <motion.div initial={{opacity:0,y:15}} animate={{opacity:1,y:0}} transition={{delay:0.25}}
            className="rounded-[20px] p-7" style={{background:"var(--c-surface)",border:"1px solid var(--c-border)"}}>
            <h2 className="text-sm font-sans font-semibold uppercase tracking-[0.08em] flex items-center gap-2 mb-5" style={{color:"var(--c-accent)"}}>
              <span className="w-4 h-px" style={{background:"var(--c-accent)"}}/>Depoimentos
            </h2>
            <div className="relative">
              <AnimatePresence mode="wait">
                <motion.div key={testimonialIdx} initial={{opacity:0,x:20}} animate={{opacity:1,x:0}} exit={{opacity:0,x:-20}}
                  className="p-5 rounded-xl" style={{background:"var(--c-card)",border:"1px solid var(--c-border)"}}>
                  <p className="text-sm font-sans font-light italic leading-relaxed mb-3" style={{color:"var(--c-text)"}}>&ldquo;{TESTIMONIALS[testimonialIdx].text}&rdquo;</p>
                  <div className="flex items-center justify-between">
                    <div className="flex gap-0.5">
                      {[1,2,3,4,5].map(s => <span key={s} style={{color:s<=TESTIMONIALS[testimonialIdx].rating?"var(--c-accent)":"var(--c-border)"}}>{I.star}</span>)}
                    </div>
                    <span className="text-[11px] font-sans" style={{color:"var(--c-text-dim)"}}>{TESTIMONIALS[testimonialIdx].author}</span>
                  </div>
                </motion.div>
              </AnimatePresence>
              <div className="flex justify-center gap-1.5 mt-3">
                {TESTIMONIALS.map((_,i) => (
                  <button key={i} onClick={()=>setTestimonialIdx(i)}
                    className="w-2 h-2 rounded-full border-none cursor-pointer transition-all"
                    style={{background:i===testimonialIdx?"var(--c-accent)":"var(--c-border)"}}/>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Blog */}
          <motion.div initial={{opacity:0,y:15}} animate={{opacity:1,y:0}} transition={{delay:0.3}}
            className="rounded-[20px] p-7" style={{background:"var(--c-surface)",border:"1px solid var(--c-border)"}}>
            <h2 className="text-sm font-sans font-semibold uppercase tracking-[0.08em] flex items-center gap-2 mb-5" style={{color:"var(--c-accent)"}}>
              <span className="w-4 h-px" style={{background:"var(--c-accent)"}}/>Publicações
            </h2>
            {ARTICLES.map((a,i) => (
              <div key={i} className="flex items-start gap-4 py-3 cursor-pointer group" style={{borderBottom:i<ARTICLES.length-1?"1px solid var(--c-border)":"none"}}>
                <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0" style={{background:"var(--c-accent)"}}/>
                <div>
                  <h3 className="text-sm font-sans font-medium transition-colors" style={{color:"var(--c-text)"}}>{a.title}</h3>
                  <div className="flex gap-3 mt-1">
                    <span className="text-[10px] font-sans" style={{color:"var(--c-text-dim)"}}>{a.date}</span>
                    <span className="text-[10px] font-sans" style={{color:"var(--c-text-dim)"}}>{a.reads} leituras</span>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>

          {/* FAQ */}
          <motion.div initial={{opacity:0,y:15}} animate={{opacity:1,y:0}} transition={{delay:0.35}}
            className="rounded-[20px] p-7" style={{background:"var(--c-surface)",border:"1px solid var(--c-border)"}}>
            <h2 className="text-sm font-sans font-semibold uppercase tracking-[0.08em] flex items-center gap-2 mb-5" style={{color:"var(--c-accent)"}}>
              <span className="w-4 h-px" style={{background:"var(--c-accent)"}}/>Perguntas frequentes
            </h2>
            {FAQS.map((f,i) => (
              <div key={i} className="py-3 cursor-pointer" style={{borderBottom:i<FAQS.length-1?"1px solid var(--c-border)":"none"}}
                onClick={()=>setOpenFaq(openFaq===i?null:i)}>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-sans font-medium" style={{color:"var(--c-text)"}}>{f.q}</span>
                  <span style={{color:"var(--c-text-dim)",transform:openFaq===i?"rotate(180deg)":"rotate(0)",transition:"transform 0.2s"}}>{I.chevDown}</span>
                </div>
                <AnimatePresence>
                  {openFaq===i && (
                    <motion.div initial={{height:0,opacity:0}} animate={{height:"auto",opacity:1}} exit={{height:0,opacity:0}} className="overflow-hidden">
                      <p className="text-sm font-sans font-light leading-relaxed mt-2 pr-6" style={{color:"var(--c-text-muted)"}}>{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </motion.div>

          {/* Formation */}
          <motion.div initial={{opacity:0,y:15}} animate={{opacity:1,y:0}} transition={{delay:0.4}}
            className="rounded-[20px] p-7" style={{background:"var(--c-surface)",border:"1px solid var(--c-border)"}}>
            <h2 className="text-sm font-sans font-semibold uppercase tracking-[0.08em] flex items-center gap-2 mb-5" style={{color:"var(--c-accent)"}}>
              <span className="w-4 h-px" style={{background:"var(--c-accent)"}}/>Formação
            </h2>
            {THERAPIST.education.map((e,i) => (
              <div key={i} className="flex items-start gap-3 mb-3">
                <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0" style={{background:"var(--c-accent)",opacity:1-i*0.2}}/>
                <div><div className="text-sm font-sans font-medium" style={{color:"var(--c-text)"}}>{e.title}</div>
                  <div className="text-xs font-sans" style={{color:"var(--c-text-dim)"}}>{e.institution} · {e.year}</div></div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* ══ RIGHT — SCHEDULING ══ */}
        <div className="sticky top-[80px] self-start">
          <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:0.15}}
            className="rounded-[20px] p-6" style={{background:"var(--c-surface)",border:"1px solid var(--c-border)"}}>
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-2xl font-serif italic" style={{color:"var(--c-text)"}}>Agendar</h2>
                <p className="text-xs font-sans mt-0.5" style={{color:"var(--c-text-dim)"}}>{service.name} · {service.duration}</p>
              </div>
              <span className="px-3 py-1.5 rounded-xl text-sm font-serif italic" style={{border:"1px solid var(--c-accent-soft)",color:"var(--c-accent)"}}>{service.price}</span>
            </div>

            {/* Modality toggle */}
            <div className="flex gap-1 p-[3px] rounded-xl mb-5" style={{background:"var(--c-card)"}}>
              {(["presencial","online"] as const).map(m => (
                <button key={m} onClick={()=>setModality(m)}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-sans font-medium cursor-pointer border-none transition-all"
                  style={{background:modality===m?"var(--c-accent-soft)":"transparent",color:modality===m?"var(--c-accent)":"var(--c-text-dim)"}}>
                  {m==="presencial"?I.map:I.globe}
                  {m==="presencial"?"Presencial":"Online"}
                </button>
              ))}
            </div>

            {/* Calendar */}
            <div className="flex items-center justify-between mb-3">
              <button className="bg-transparent border-none cursor-pointer" style={{color:"var(--c-text-dim)"}}>‹</button>
              <span className="text-sm font-sans font-medium" style={{color:"var(--c-text)"}}>Março 2026</span>
              <button className="bg-transparent border-none cursor-pointer" style={{color:"var(--c-text-dim)"}}>›</button>
            </div>
            <div className="grid grid-cols-5 gap-1.5 mb-4">
              {DAYS.map((d,i) => (
                <div key={d} className="text-center">
                  <div className="text-[10px] font-sans font-semibold" style={{color:"var(--c-text-dim)"}}>{d}</div>
                  <div className="text-lg font-serif italic" style={{color:"var(--c-accent)"}}>{DATES[i]}</div>
                </div>
              ))}
              {DAYS.map((day) => {
                const slots = WEEK_SLOTS[day] || [];
                return slots.map((slot: { time: string; available: boolean }) => (
                  <button key={`${day}-${slot.time}`}
                    disabled={!slot.available}
                    onClick={()=>slot.available && handleSlotSelect(`${day} ${DATES[DAYS.indexOf(day)]}/03 ${slot.time}`)}
                    className="py-1.5 rounded-lg text-[11px] font-sans font-medium cursor-pointer border-none transition-all"
                    style={{
                      background:selectedSlot?.includes(slot.time)&&selectedSlot?.includes(day)?"var(--c-accent-soft)":"transparent",
                      color:slot.available?(selectedSlot?.includes(slot.time)&&selectedSlot?.includes(day)?"var(--c-accent)":"var(--c-text)"):"var(--c-text-dim)",
                      border:`1px solid ${slot.available?"var(--c-border)":"transparent"}`,
                      opacity:slot.available?1:0.3,
                    }}>{slot.time}</button>
                ));
              })}
            </div>

            <button className="w-full py-3 rounded-xl text-sm font-sans font-semibold cursor-pointer border-none mb-3"
              style={{background:selectedSlot?"var(--c-accent)":"var(--c-card)",color:selectedSlot?"var(--c-bg)":"var(--c-text-dim)"}}>
              {selectedSlot ? "Confirmar agendamento" : "Selecione um horário"}
            </button>

            <button className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-sans font-semibold cursor-pointer border-none"
              style={{background:"#25D36618",color:"#25D366"}}>
              {I.wa} Conversar pelo WhatsApp
            </button>
          </motion.div>
        </div>
      </div>

      {/* ── BOOKING CONFIRMATION MODAL ── */}
      <AnimatePresence>
        {showConfirm && selectedSlot && (
          <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
            className="fixed inset-0 z-[9998] flex items-center justify-center"
            onClick={()=>setShowConfirm(false)}>
            <div className="absolute inset-0" style={{background:"rgba(0,0,0,0.5)",backdropFilter:"blur(4px)"}}/>
            <motion.div initial={{opacity:0,scale:0.95,y:20}} animate={{opacity:1,scale:1,y:0}} exit={{opacity:0,scale:0.95}}
              className="relative z-10 w-full max-w-[400px] rounded-[20px] overflow-hidden"
              style={{background:"var(--c-surface)",border:"1px solid var(--c-border)",boxShadow:"0 24px 80px var(--c-shadow)"}}
              onClick={e=>e.stopPropagation()}>
              <div className="p-7">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{background:"var(--c-accent-soft)"}}>
                    <span style={{color:"var(--c-accent)"}}>{I.check}</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-serif italic" style={{color:"var(--c-text)"}}>Confirmar agendamento</h3>
                    <p className="text-xs font-sans" style={{color:"var(--c-text-dim)"}}>Revise os detalhes</p>
                  </div>
                </div>
                <div className="flex flex-col gap-3 p-4 rounded-xl mb-5" style={{background:"var(--c-card)",border:"1px solid var(--c-border)"}}>
                  {[{l:"Serviço",v:service.name},{l:"Data e horário",v:selectedSlot},{l:"Duração",v:service.duration},{l:"Modalidade",v:modality==="presencial"?"Presencial — Savassi, BH":"Online"},{l:"Valor",v:service.price}].map(r => (
                    <div key={r.l} className="flex justify-between">
                      <span className="text-xs font-sans" style={{color:"var(--c-text-dim)"}}>{r.l}</span>
                      <span className="text-xs font-sans font-medium" style={{color:"var(--c-text)"}}>{r.v}</span>
                    </div>
                  ))}
                </div>
                <div className="flex gap-3">
                  <button onClick={()=>setShowConfirm(false)}
                    className="flex-1 py-2.5 rounded-xl text-sm font-sans font-medium cursor-pointer bg-transparent"
                    style={{border:"1px solid var(--c-border)",color:"var(--c-text-muted)"}}>Voltar</button>
                  <motion.button whileHover={{scale:1.02}} whileTap={{scale:0.98}}
                    onClick={()=>{setShowConfirm(false);setSelectedSlot(null);}}
                    className="flex-1 py-2.5 rounded-xl text-sm font-sans font-semibold cursor-pointer border-none"
                    style={{background:"var(--c-accent)",color:"var(--c-bg)"}}>Confirmar</motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
