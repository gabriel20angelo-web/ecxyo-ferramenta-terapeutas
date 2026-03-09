"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ── ICONS ──
const I = {
  heart: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>,
  comment: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>,
  bookmark: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>,
  bookmarkFill: <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>,
  star: <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
  award: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></svg>,
  download: <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>,
  check: <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>,
  send: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>,
};

const CRP = () => <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-sans font-semibold" style={{background:"var(--c-green-soft)",color:"var(--c-green)"}}>{I.check} CRP</span>;

// ── POST TYPES ──
type Post = {
  id:number; author:string; avatar:string; crp:boolean; type:"discussao"|"atividade"|"caso"|"recurso"|"pergunta"|"conquista"|"enquete";
  time:string; content:string; tags:string[]; likes:number; comments:number;
  // Optional fields
  pollOptions?:{text:string;votes:number}[]; activityDate?:string; activityTime?:string; activityPrice?:string;
  activityAudience?:string; activitySlots?:string; activityRating?:number; activityReviews?:number;
  resourceUrl?:string; bestAnswer?:string;
  // Reputation
  reputation?:number; badges?:string[];
};

const TYPE_CONFIG: Record<string,{label:string;c:string;bg:string}> = {
  discussao:{label:"Discussão",c:"var(--c-text-muted)",bg:"var(--c-card)"},
  atividade:{label:"Atividade",c:"var(--c-blue)",bg:"var(--c-blue-soft)"},
  caso:{label:"Caso Clínico",c:"var(--c-couple)",bg:"var(--c-couple-soft)"},
  recurso:{label:"Recurso",c:"var(--c-green)",bg:"var(--c-green-soft)"},
  pergunta:{label:"Pergunta",c:"var(--c-accent)",bg:"var(--c-accent-soft)"},
  conquista:{label:"Conquista",c:"var(--c-accent)",bg:"var(--c-accent-soft)"},
  enquete:{label:"Enquete",c:"var(--c-blue)",bg:"var(--c-blue-soft)"},
};

const FEED: Post[] = [
  {id:1,author:"Dr. Felipe Borges",avatar:"F",crp:true,type:"discussao",time:"há 3h",content:"Tenho refletido sobre a resistência ao setting online em pacientes que iniciaram tratamento presencial. Alguém tem experiências?",tags:["Setting","Online"],likes:12,comments:5,reputation:340,badges:["Top Contributor"]},
  {id:2,author:"Dra. Camila Torres",avatar:"C",crp:true,type:"atividade",time:"há 5h",content:'Grupo de Leitura — "O Corpo Guarda as Marcas" (Van der Kolk)',tags:["Trauma","Grupo de Leitura"],likes:24,comments:8,activityDate:"15/03",activityTime:"19:00",activityPrice:"Gratuito",activityAudience:"Terapeutas",activitySlots:"8/12",activityRating:4.8,activityReviews:23,reputation:520,badges:["Organizador Ativo"]},
  {id:3,author:"Dra. Marina Alcântara",avatar:"M",crp:true,type:"caso",time:"há 8h",content:"Paciente fem., 28a, queixa de ansiedade generalizada com padrão de evitação. Após 12 sessões, insight sobre dinâmica paterna. Transferência materna ativada. Como vocês manejam contratransferência nesse contexto?",tags:["Contratransferência","Ansiedade","Psicodinâmica"],likes:31,comments:14,reputation:680,badges:["Mentor","Top Contributor"]},
  {id:4,author:"Dr. Roberto Lima",avatar:"R",crp:true,type:"recurso",time:"há 1d",content:"Compartilhando artigo excelente sobre exposição gradual em ansiedade social — meta-análise de 2025 com resultados promissores.",tags:["Artigo","Exposição","Ansiedade Social"],likes:18,comments:3,resourceUrl:"https://example.com/artigo",reputation:290,badges:[]},
  {id:5,author:"Dra. Juliana Reis",avatar:"J",crp:true,type:"pergunta",time:"há 1d",content:"Qual escala vocês mais usam para avaliar ansiedade em adolescentes? Estou entre BAI-Y e SCARED.",tags:["Escalas","Adolescentes","Ansiedade"],likes:8,comments:11,bestAnswer:"BAI-Y é mais prática pra clínica, SCARED tem melhor sensibilidade — depende do contexto.",reputation:180,badges:[]},
  {id:6,author:"Dr. Felipe Borges",avatar:"F",crp:true,type:"conquista",time:"há 2d",content:"Paciente com fobia social completou 6 meses de tratamento e conseguiu fazer apresentação no trabalho pela primeira vez! Momento de celebrar as pequenas grandes vitórias.",tags:["Conquista","Fobia Social"],likes:45,comments:12,reputation:340,badges:["Top Contributor"]},
  {id:7,author:"Dra. Marina Alcântara",avatar:"M",crp:true,type:"enquete",time:"há 12h",content:"Na sua prática, qual abordagem tem dado melhores resultados com TDAH adulto?",tags:["TDAH","Enquete"],likes:15,comments:6,pollOptions:[{text:"TCC + Psicoeducação",votes:42},{text:"Terapia focada em mindfulness",votes:18},{text:"Abordagem integrativa",votes:31},{text:"Coaching + Terapia",votes:9}],reputation:680,badges:["Mentor"]},
];

const EVENTS = [
  {date:"12",day:"Qua",title:"Roda de Conversa — Luto",time:"19:00",author:"Felipe B.",audience:"Aberto",price:"Grátis",rating:4.5,reviews:12,completed:false},
  {date:"15",day:"Sáb",title:"Grupo de Leitura — Van der Kolk",time:"19:00",author:"Camila T.",audience:"Terapeutas",price:"Grátis",rating:4.8,reviews:23,completed:false},
  {date:"18",day:"Ter",title:"Intervisão — Casos de TDAH",time:"20:00",author:"Roberto L.",audience:"Terapeutas",price:"R$ 40",rating:4.7,reviews:18,completed:false},
  {date:"22",day:"Sáb",title:"Workshop Grounding",time:"14:00",author:"Marina A.",audience:"Terapeutas",price:"R$ 120",rating:4.9,reviews:41,completed:false},
  {date:"25",day:"Ter",title:"Grupo Terapêutico — Ansiedade",time:"18:00",author:"Felipe B.",audience:"Pacientes",price:"R$ 60",rating:4.6,reviews:8,completed:false},
  {date:"05",day:"Qua",title:"Roda de Conversa — Burnout",time:"19:00",author:"Marina A.",audience:"Aberto",price:"Grátis",rating:4.7,reviews:15,completed:true},
];

const REFERRALS = [
  {name:"Dra. Marina Alcântara",crp:"CRP 04/58921",specialties:["Ansiedade","Trauma","Adultos"],location:"Savassi, BH",accepts:true,rating:4.9,slots:2},
  {name:"Dr. Felipe Borges",crp:"CRP 04/31245",specialties:["TCC","TDAH","Adultos"],location:"Centro, BH",accepts:true,rating:4.7,slots:3},
  {name:"Dra. Camila Torres",crp:"CRP 06/89012",specialties:["Gestalt","Luto","Adolescentes"],location:"Funcionários, BH",accepts:false,rating:4.8,slots:0},
  {name:"Dr. Roberto Lima",crp:"CRP 04/55678",specialties:["Psicanálise","Depressão","Adultos"],location:"Lourdes, BH",accepts:true,rating:4.6,slots:1},
];

const HIGHLIGHTS = {
  topPost:{author:"Dra. Marina Alcântara",type:"caso",likes:31},
  topEvent:{title:"Workshop Grounding",rating:4.9},
  topContributor:{name:"Dra. Marina Alcântara",points:680},
};

// ── COMPONENT ──
export function ComunidadePage() {
  const [tab, setTab] = useState("feed");
  const [postFilter, setPostFilter] = useState("todos");
  const [saved, setSaved] = useState<Set<number>>(new Set());
  const [voted, setVoted] = useState<Set<number>>(new Set());
  const [subscribed, setSubscribed] = useState<Set<string>>(new Set(["Grupo de Leitura — Van der Kolk"]));
  const [profileOpen, setProfileOpen] = useState<string|null>(null);

  const toggleSave = (id:number) => setSaved(p => {const n=new Set(p);n.has(id)?n.delete(id):n.add(id);return n;});
  const totalPollVotes = (opts:{text:string;votes:number}[]) => opts.reduce((a,o)=>a+o.votes,0);

  const filteredFeed = postFilter === "todos" ? FEED : postFilter === "salvos" ? FEED.filter(p=>saved.has(p.id)) : FEED.filter(p=>p.type===postFilter);

  const tabs = [
    {key:"feed",label:"Feed"},
    {key:"calendario",label:"Calendário Global"},
    {key:"encaminhamentos",label:"Encaminhamentos"},
    {key:"inscricoes",label:`Inscrições (${subscribed.size})`},
  ];

  return (
    <div className="max-w-[1200px]">
      {/* Header */}
      <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} className="flex justify-between items-end mb-7">
        <div>
          <span className="text-xs font-sans font-semibold tracking-[0.1em] uppercase" style={{color:"var(--c-accent)"}}>Rede</span>
          <h1 className="text-4xl font-serif italic font-normal mt-1" style={{color:"var(--c-text)"}}>Comunidade</h1>
        </div>
        <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-sans font-semibold cursor-pointer border-none"
          style={{background:"var(--c-accent-soft)",color:"var(--c-accent)",border:"1px solid var(--c-accent-soft)"}}>
          {I.send} Nova publicação
        </button>
      </motion.div>

      {/* Tabs */}
      <div className="flex gap-1 mb-6">
        {tabs.map(t => (
          <button key={t.key} onClick={()=>setTab(t.key)}
            className="px-4 py-2 rounded-xl border-none text-[13px] font-sans font-medium cursor-pointer transition-all"
            style={{background:tab===t.key?"var(--c-accent-soft)":"transparent",color:tab===t.key?"var(--c-accent)":"var(--c-text-dim)"}}>{t.label}</button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {/* ══ FEED ══ */}
        {tab === "feed" && (
          <motion.div key="feed" initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} exit={{opacity:0}}>
            <div className="grid grid-cols-[1fr_320px] gap-6">
              <div>
                {/* Filters */}
                <div className="flex gap-1.5 mb-5 flex-wrap">
                  {[{k:"todos",l:"Todos"},{k:"discussao",l:"Discussões"},{k:"caso",l:"Casos"},{k:"recurso",l:"Recursos"},{k:"pergunta",l:"Perguntas"},{k:"enquete",l:"Enquetes"},{k:"conquista",l:"Conquistas"},{k:"salvos",l:"Salvos"}].map(f => (
                    <button key={f.k} onClick={()=>setPostFilter(f.k)}
                      className="px-3 py-1.5 rounded-lg text-[11px] font-sans font-medium cursor-pointer border-none transition-all"
                      style={{background:postFilter===f.k?"var(--c-accent-soft)":"var(--c-card)",color:postFilter===f.k?"var(--c-accent)":"var(--c-text-dim)",border:"1px solid var(--c-border)"}}>
                      {f.l}{f.k==="salvos"&&saved.size>0?` (${saved.size})`:""}
                    </button>
                  ))}
                </div>

                {/* Posts */}
                {filteredFeed.map((post,i) => {
                  const tc = TYPE_CONFIG[post.type];
                  return (
                    <motion.div key={post.id} initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{delay:i*0.05}}
                      className="rounded-[20px] p-6 mb-4" style={{background:"var(--c-surface)",border:"1px solid var(--c-border)"}}>
                      {/* Author */}
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-serif italic cursor-pointer"
                          style={{background:"var(--c-accent-soft)",color:"var(--c-accent)"}}
                          onClick={()=>setProfileOpen(post.author)}>{post.avatar}</div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-sans font-medium cursor-pointer" style={{color:"var(--c-text)"}}
                              onClick={()=>setProfileOpen(post.author)}>{post.author}</span>
                            {post.crp && <CRP/>}
                            {post.badges?.map(b => (
                              <span key={b} className="flex items-center gap-1 text-[9px] font-sans font-semibold px-1.5 py-0.5 rounded-full"
                                style={{background:"var(--c-accent-soft)",color:"var(--c-accent)"}}>{I.award} {b}</span>
                            ))}
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-[11px] font-sans font-semibold px-2 py-0.5 rounded-md" style={{color:tc.c,background:tc.bg}}>{tc.label}</span>
                            <span className="text-[11px] font-sans" style={{color:"var(--c-text-dim)"}}>{post.time}</span>
                          </div>
                        </div>
                        {/* Bookmark */}
                        <button onClick={()=>toggleSave(post.id)} className="bg-transparent border-none cursor-pointer p-1"
                          style={{color:saved.has(post.id)?"var(--c-accent)":"var(--c-text-dim)"}}>
                          {saved.has(post.id)?I.bookmarkFill:I.bookmark}
                        </button>
                      </div>

                      {/* Content */}
                      <p className="text-sm font-sans font-light leading-relaxed mb-3" style={{color:"var(--c-text)"}}>{post.content}</p>

                      {/* Poll */}
                      {post.type==="enquete" && post.pollOptions && (
                        <div className="flex flex-col gap-2 mb-3">
                          {post.pollOptions.map((opt,oi) => {
                            const total = totalPollVotes(post.pollOptions!);
                            const pct = total > 0 ? (opt.votes/total)*100 : 0;
                            const isVoted = voted.has(post.id);
                            return (
                              <button key={oi} onClick={()=>setVoted(p=>new Set(p).add(post.id))}
                                className="relative w-full text-left px-4 py-2.5 rounded-xl border-none cursor-pointer overflow-hidden transition-all"
                                style={{background:"var(--c-card)",border:"1px solid var(--c-border)"}}>
                                {isVoted && <motion.div initial={{width:0}} animate={{width:`${pct}%`}} transition={{duration:0.5}}
                                  className="absolute left-0 top-0 bottom-0 rounded-xl" style={{background:"var(--c-accent-soft)"}}/>}
                                <div className="relative flex justify-between items-center">
                                  <span className="text-xs font-sans" style={{color:"var(--c-text)"}}>{opt.text}</span>
                                  {isVoted && <span className="text-xs font-sans font-semibold" style={{color:"var(--c-accent)"}}>{pct.toFixed(0)}%</span>}
                                </div>
                              </button>
                            );
                          })}
                          <span className="text-[10px] font-sans" style={{color:"var(--c-text-dim)"}}>{totalPollVotes(post.pollOptions)} votos</span>
                        </div>
                      )}

                      {/* Activity card */}
                      {post.type==="atividade" && post.activityDate && (
                        <div className="rounded-xl p-4 mb-3" style={{background:"var(--c-card)",border:"1px solid var(--c-border)"}}>
                          <div className="flex justify-between items-center">
                            <div>
                              <span className="text-xs font-sans" style={{color:"var(--c-text-dim)"}}>{post.activityDate} · {post.activityTime}</span>
                              <div className="flex items-center gap-2 mt-1">
                                <span className="text-[11px] font-sans font-semibold px-2 py-0.5 rounded-md" style={{background:"var(--c-green-soft)",color:"var(--c-green)"}}>{post.activityAudience}</span>
                                <span className="text-[11px] font-sans" style={{color:"var(--c-text-dim)"}}>{post.activitySlots}</span>
                              </div>
                              <div className="flex items-center gap-1 mt-1">
                                {[1,2,3,4,5].map(s => <span key={s} style={{color:s<=Math.round(post.activityRating||0)?"var(--c-accent)":"var(--c-border)"}}>{I.star}</span>)}
                                <span className="text-[10px] font-sans ml-1" style={{color:"var(--c-text-dim)"}}>{post.activityRating} ({post.activityReviews})</span>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-base font-serif italic" style={{color:post.activityPrice==="Gratuito"?"var(--c-green)":"var(--c-accent)"}}>{post.activityPrice}</div>
                              <button className="mt-1 px-3 py-1.5 rounded-lg text-[11px] font-sans font-semibold cursor-pointer border-none"
                                style={{background:"var(--c-accent-soft)",color:"var(--c-accent)"}}>Inscrever-se</button>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Resource link */}
                      {post.type==="recurso" && post.resourceUrl && (
                        <div className="flex items-center gap-2 px-3 py-2 rounded-lg mb-3" style={{background:"var(--c-card)",border:"1px solid var(--c-border)"}}>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--c-green)" strokeWidth="2" strokeLinecap="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
                          <span className="text-xs font-sans" style={{color:"var(--c-green)"}}>Ver recurso →</span>
                        </div>
                      )}

                      {/* Best answer */}
                      {post.type==="pergunta" && post.bestAnswer && (
                        <div className="flex items-start gap-2 px-4 py-3 rounded-xl mb-3" style={{background:"var(--c-green-soft)",border:"1px solid var(--c-green-soft)"}}>
                          <span className="flex-shrink-0 mt-0.5" style={{color:"var(--c-green)"}}>{I.check}</span>
                          <div>
                            <span className="text-[10px] font-sans font-semibold" style={{color:"var(--c-green)"}}>Melhor resposta</span>
                            <p className="text-xs font-sans mt-0.5" style={{color:"var(--c-text-muted)"}}>{post.bestAnswer}</p>
                          </div>
                        </div>
                      )}

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {post.tags.map(tag => <span key={tag} className="px-2.5 py-0.5 rounded-full text-[10px] font-sans" style={{background:"var(--c-card)",color:"var(--c-text-dim)",border:"1px solid var(--c-border)"}}>{tag}</span>)}
                      </div>

                      {/* Actions */}
                      <div className="flex gap-4 pt-3" style={{borderTop:"1px solid var(--c-border)"}}>
                        <button className="flex items-center gap-1.5 text-xs font-sans font-medium bg-transparent border-none cursor-pointer transition-colors"
                          style={{color:"var(--c-text-dim)"}}>{I.heart} {post.likes}</button>
                        <button className="flex items-center gap-1.5 text-xs font-sans font-medium bg-transparent border-none cursor-pointer transition-colors"
                          style={{color:"var(--c-text-dim)"}}>{I.comment} {post.comments}</button>
                        {post.reputation && (
                          <span className="text-[10px] font-sans ml-auto" style={{color:"var(--c-text-dim)"}}>
                            {I.award} {post.reputation} pts
                          </span>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
                {filteredFeed.length===0 && (
                  <div className="rounded-[20px] p-12 text-center" style={{background:"var(--c-surface)",border:"1px solid var(--c-border)"}}>
                    <p className="text-sm font-sans" style={{color:"var(--c-text-dim)"}}>Nenhum post encontrado.</p>
                  </div>
                )}
              </div>

              {/* Sidebar */}
              <div className="flex flex-col gap-5">
                {/* Destaques */}
                <div className="rounded-[20px] p-5" style={{background:"var(--c-surface)",border:"1px solid var(--c-border)"}}>
                  <h3 className="text-[10px] font-sans font-semibold uppercase tracking-[0.1em] mb-4 flex items-center gap-2" style={{color:"var(--c-accent)"}}>
                    <span className="w-4 h-px" style={{background:"var(--c-accent)"}}/>Destaques da semana
                  </h3>
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-3 p-3 rounded-xl" style={{background:"var(--c-card)"}}>
                      <span style={{color:"var(--c-rose)"}}>{I.heart}</span>
                      <div><span className="text-[11px] font-sans font-medium" style={{color:"var(--c-text)"}}>Post mais curtido</span>
                        <p className="text-[10px] font-sans" style={{color:"var(--c-text-dim)"}}>{HIGHLIGHTS.topPost.author} · {HIGHLIGHTS.topPost.likes} likes</p></div>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-xl" style={{background:"var(--c-card)"}}>
                      <span style={{color:"var(--c-accent)"}}>{I.star}</span>
                      <div><span className="text-[11px] font-sans font-medium" style={{color:"var(--c-text)"}}>Melhor atividade</span>
                        <p className="text-[10px] font-sans" style={{color:"var(--c-text-dim)"}}>{HIGHLIGHTS.topEvent.title} · {HIGHLIGHTS.topEvent.rating}</p></div>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-xl" style={{background:"var(--c-card)"}}>
                      <span style={{color:"var(--c-green)"}}>{I.award}</span>
                      <div><span className="text-[11px] font-sans font-medium" style={{color:"var(--c-text)"}}>Top contributor</span>
                        <p className="text-[10px] font-sans" style={{color:"var(--c-text-dim)"}}>{HIGHLIGHTS.topContributor.name} · {HIGHLIGHTS.topContributor.points} pts</p></div>
                    </div>
                  </div>
                </div>

                {/* Próximas atividades */}
                <div className="rounded-[20px] p-5" style={{background:"var(--c-surface)",border:"1px solid var(--c-border)"}}>
                  <h3 className="text-[10px] font-sans font-semibold uppercase tracking-[0.1em] mb-4 flex items-center gap-2" style={{color:"var(--c-accent)"}}>
                    <span className="w-4 h-px" style={{background:"var(--c-accent)"}}/>Próximas atividades
                  </h3>
                  {EVENTS.filter(e=>!e.completed).slice(0,4).map((e,i) => (
                    <div key={i} className="flex items-start gap-3 py-2.5" style={{borderBottom:i<3?"1px solid var(--c-border)":"none"}}>
                      <div className="text-center flex-shrink-0 w-8">
                        <div className="text-lg font-serif italic" style={{color:"var(--c-accent)"}}>{e.date}</div>
                        <div className="text-[9px] font-sans" style={{color:"var(--c-text-dim)"}}>{e.day}</div>
                      </div>
                      <div>
                        <span className="text-xs font-sans font-medium" style={{color:"var(--c-text)"}}>{e.title}</span>
                        <div className="text-[10px] font-sans" style={{color:"var(--c-text-dim)"}}>{e.time} · {e.author}</div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Tags */}
                <div className="rounded-[20px] p-5" style={{background:"var(--c-surface)",border:"1px solid var(--c-border)"}}>
                  <h3 className="text-[10px] font-sans font-semibold uppercase tracking-[0.1em] mb-3 flex items-center gap-2" style={{color:"var(--c-accent)"}}>
                    <span className="w-4 h-px" style={{background:"var(--c-accent)"}}/>Tags em alta
                  </h3>
                  <div className="flex flex-wrap gap-1.5">
                    {["Ansiedade","Trauma","TDAH","Grounding","Luto","Contratransferência","TCC"].map(t => (
                      <span key={t} className="px-2.5 py-1 rounded-full text-[10px] font-sans cursor-pointer" style={{background:"var(--c-card)",color:"var(--c-text-dim)",border:"1px solid var(--c-border)"}}>{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* ══ CALENDÁRIO ══ */}
        {tab === "calendario" && (
          <motion.div key="cal" initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} exit={{opacity:0}}>
            <div className="flex gap-1.5 mb-5">
              {["Todos","Terapeutas","Pacientes","Gratuito","Pago"].map(f => (
                <span key={f} className="px-3 py-1.5 rounded-full text-[11px] font-sans cursor-pointer" style={{background:f==="Todos"?"var(--c-accent-soft)":"var(--c-card)",color:f==="Todos"?"var(--c-accent)":"var(--c-text-dim)",border:"1px solid var(--c-border)"}}>{f}</span>
              ))}
            </div>
            {EVENTS.map((e,i) => (
              <motion.div key={i} initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} transition={{delay:i*0.04}}
                className="flex items-center rounded-[18px] mb-3 overflow-hidden" style={{background:"var(--c-surface)",border:"1px solid var(--c-border)"}}>
                <div className="w-20 py-5 flex flex-col items-center justify-center flex-shrink-0" style={{borderRight:"1px solid var(--c-border)"}}>
                  <div className="text-xl font-serif italic" style={{color:e.completed?"var(--c-text-dim)":"var(--c-accent)"}}>{e.date}</div>
                  <div className="text-[10px] font-sans" style={{color:"var(--c-text-dim)"}}>{e.day}</div>
                </div>
                <div className="flex-1 py-4 px-5">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-sans font-medium" style={{color:e.completed?"var(--c-text-dim)":"var(--c-text)"}}>{e.title}</span>
                    {e.completed && <span className="text-[10px] font-sans font-semibold px-2 py-0.5 rounded-md" style={{background:"var(--c-green-soft)",color:"var(--c-green)"}}>Concluído</span>}
                  </div>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-xs font-sans" style={{color:"var(--c-text-dim)"}}>{e.time} · {e.author}</span>
                    <span className="text-[11px] font-sans font-semibold px-2 py-0.5 rounded-md" style={{background:"var(--c-green-soft)",color:"var(--c-green)"}}>{e.audience}</span>
                    <div className="flex items-center gap-1">
                      {[1,2,3,4,5].map(s => <span key={s} style={{color:s<=Math.round(e.rating)?"var(--c-accent)":"var(--c-border)"}}>{I.star}</span>)}
                      <span className="text-[10px] font-sans" style={{color:"var(--c-text-dim)"}}>({e.reviews})</span>
                    </div>
                  </div>
                </div>
                <div className="px-5 flex flex-col items-end gap-2 flex-shrink-0">
                  <span className="text-base font-serif italic" style={{color:e.price==="Grátis"?"var(--c-green)":"var(--c-accent)"}}>{e.price}</span>
                  {e.completed ? (
                    <button className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-[11px] font-sans font-semibold cursor-pointer border-none"
                      style={{background:"var(--c-accent-soft)",color:"var(--c-accent)"}}>{I.download} Certificado</button>
                  ) : (
                    <button onClick={()=>setSubscribed(p=>{const n=new Set(p);n.has(e.title)?n.delete(e.title):n.add(e.title);return n;})}
                      className="px-3 py-1.5 rounded-lg text-[11px] font-sans font-semibold cursor-pointer border-none"
                      style={{background:subscribed.has(e.title)?"var(--c-green-soft)":"var(--c-accent-soft)",color:subscribed.has(e.title)?"var(--c-green)":"var(--c-accent)"}}>
                      {subscribed.has(e.title)?"Inscrito ✓":"Inscrever-se"}
                    </button>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* ══ ENCAMINHAMENTOS ══ */}
        {tab === "encaminhamentos" && (
          <motion.div key="enc" initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} exit={{opacity:0}}>
            <p className="text-sm font-sans font-light mb-5" style={{color:"var(--c-text-dim)"}}>
              Terapeutas da rede que aceitam encaminhamentos. Encontre o profissional ideal para seu paciente.
            </p>
            <div className="grid grid-cols-2 gap-4">
              {REFERRALS.map((r,i) => (
                <motion.div key={i} initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{delay:i*0.05}}
                  className="rounded-[20px] p-6" style={{background:"var(--c-surface)",border:"1px solid var(--c-border)"}}>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center text-base font-serif italic flex-shrink-0"
                      style={{background:"var(--c-accent-soft)",color:"var(--c-accent)"}}>{r.name.split(" ").pop()?.charAt(0)}</div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-sans font-medium" style={{color:"var(--c-text)"}}>{r.name}</span>
                        <CRP/>
                      </div>
                      <span className="text-[11px] font-sans" style={{color:"var(--c-text-dim)"}}>{r.crp} · {r.location}</span>
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {r.specialties.map(s => <span key={s} className="px-2 py-0.5 rounded-md text-[10px] font-sans" style={{background:"var(--c-card)",color:"var(--c-text-muted)",border:"1px solid var(--c-border)"}}>{s}</span>)}
                      </div>
                      <div className="flex items-center gap-3 mt-3">
                        <div className="flex items-center gap-1">
                          {[1,2,3,4,5].map(s => <span key={s} style={{color:s<=Math.round(r.rating)?"var(--c-accent)":"var(--c-border)"}}>{I.star}</span>)}
                          <span className="text-[10px] font-sans ml-1" style={{color:"var(--c-text-dim)"}}>{r.rating}</span>
                        </div>
                        {r.accepts ? (
                          <span className="text-[10px] font-sans font-semibold px-2 py-0.5 rounded-md" style={{background:"var(--c-green-soft)",color:"var(--c-green)"}}>{r.slots} vagas</span>
                        ) : (
                          <span className="text-[10px] font-sans font-semibold px-2 py-0.5 rounded-md" style={{background:"var(--c-rose-soft)",color:"var(--c-rose)"}}>Sem vagas</span>
                        )}
                      </div>
                    </div>
                  </div>
                  {r.accepts && (
                    <button className="w-full mt-4 py-2 rounded-xl text-xs font-sans font-semibold cursor-pointer border-none"
                      style={{background:"var(--c-accent-soft)",color:"var(--c-accent)"}}>Encaminhar paciente</button>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* ══ INSCRIÇÕES ══ */}
        {tab === "inscricoes" && (
          <motion.div key="insc" initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} exit={{opacity:0}}>
            {subscribed.size === 0 ? (
              <div className="rounded-[20px] p-12 text-center" style={{background:"var(--c-surface)",border:"1px solid var(--c-border)"}}>
                <p className="text-sm font-sans" style={{color:"var(--c-text-dim)"}}>Nenhuma inscrição ativa. Explore o Calendário Global!</p>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {EVENTS.filter(e=>subscribed.has(e.title)).map((e,i) => (
                  <motion.div key={i} initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} transition={{delay:i*0.04}}
                    className="flex items-center rounded-[18px] p-5 gap-5" style={{background:"var(--c-surface)",border:"1px solid var(--c-green-soft)"}}>
                    <div className="text-center flex-shrink-0">
                      <div className="text-2xl font-serif italic" style={{color:"var(--c-accent)"}}>{e.date}</div>
                      <div className="text-[10px] font-sans" style={{color:"var(--c-text-dim)"}}>{e.day}/03</div>
                    </div>
                    <div className="flex-1">
                      <span className="text-sm font-sans font-medium" style={{color:"var(--c-text)"}}>{e.title}</span>
                      <div className="text-xs font-sans mt-0.5" style={{color:"var(--c-text-dim)"}}>{e.time} · {e.author}</div>
                    </div>
                    <span className="text-[11px] font-sans font-semibold px-3 py-1 rounded-lg" style={{background:"var(--c-green-soft)",color:"var(--c-green)"}}>
                      {I.check} Inscrito
                    </span>
                    <button onClick={()=>setSubscribed(p=>{const n=new Set(p);n.delete(e.title);return n;})}
                      className="text-[11px] font-sans cursor-pointer bg-transparent border-none" style={{color:"var(--c-text-dim)"}}>Cancelar</button>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── PROFILE MODAL ── */}
      <AnimatePresence>
        {profileOpen && (
          <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
            className="fixed inset-0 z-[9998] flex items-center justify-center" onClick={()=>setProfileOpen(null)}>
            <div className="absolute inset-0" style={{background:"rgba(0,0,0,0.5)",backdropFilter:"blur(4px)"}}/>
            <motion.div initial={{opacity:0,scale:0.95,y:20}} animate={{opacity:1,scale:1,y:0}} exit={{opacity:0,scale:0.95}}
              className="relative z-10 w-full max-w-[420px] rounded-[20px] overflow-hidden"
              style={{background:"var(--c-surface)",border:"1px solid var(--c-border)",boxShadow:"0 24px 80px var(--c-shadow)"}}
              onClick={e=>e.stopPropagation()}>
              {(() => {
                const post = FEED.find(p=>p.author===profileOpen);
                const ref = REFERRALS.find(r=>r.name===profileOpen);
                return (
                  <div className="p-7">
                    <div className="flex items-center gap-4 mb-5">
                      <div className="w-16 h-16 rounded-full flex items-center justify-center text-xl font-serif italic"
                        style={{background:"var(--c-accent-soft)",color:"var(--c-accent)"}}>{post?.avatar||profileOpen.charAt(0)}</div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-lg font-serif italic" style={{color:"var(--c-text)"}}>{profileOpen}</h3>
                          <CRP/>
                        </div>
                        <span className="text-xs font-sans" style={{color:"var(--c-text-dim)"}}>{ref?.crp||"CRP verificado"} · {ref?.location||"Belo Horizonte"}</span>
                        {post?.badges && post.badges.length > 0 && (
                          <div className="flex gap-1.5 mt-1">
                            {post.badges.map(b => (
                              <span key={b} className="flex items-center gap-1 text-[9px] font-sans font-semibold px-2 py-0.5 rounded-full"
                                style={{background:"var(--c-accent-soft)",color:"var(--c-accent)"}}>{I.award} {b}</span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-3 mb-5">
                      {[{l:"Reputação",v:post?.reputation||0,c:"var(--c-accent)"},{l:"Posts",v:FEED.filter(p=>p.author===profileOpen).length,c:"var(--c-green)"},{l:"Rating",v:ref?.rating||"—",c:"var(--c-blue)"}].map(s => (
                        <div key={s.l} className="text-center p-3 rounded-xl" style={{background:"var(--c-card)"}}>
                          <div className="text-lg font-serif italic" style={{color:s.c}}>{s.v}</div>
                          <div className="text-[10px] font-sans" style={{color:"var(--c-text-dim)"}}>{s.l}</div>
                        </div>
                      ))}
                    </div>
                    {ref && (
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {ref.specialties.map(s => <span key={s} className="px-2.5 py-1 rounded-md text-[11px] font-sans" style={{background:"var(--c-card)",color:"var(--c-text-muted)",border:"1px solid var(--c-border)"}}>{s}</span>)}
                      </div>
                    )}
                    <button onClick={()=>setProfileOpen(null)}
                      className="w-full py-2.5 rounded-xl text-sm font-sans font-medium cursor-pointer"
                      style={{background:"var(--c-card)",border:"1px solid var(--c-border)",color:"var(--c-text-muted)"}}>Fechar</button>
                  </div>
                );
              })()}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
