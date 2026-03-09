"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AGENDA_EVENTS, WEEK_AGENDA } from "@/lib/mockData";
import { typeMap, paymentMap } from "@/lib/tokens";

type Props = { agendaView: string; setAgendaView: (v: string) => void };
const HOURS = ["06:00","07:00","08:00","09:00","10:00","11:00","12:00","13:00","14:00","15:00","16:00","17:00","18:00","19:00"];
const DAYS = ["Seg","Ter","Qua","Qui","Sex"];
const DATES = ["10","11","12","13","14"];

// Confirmation + payment mock per event
const EVENT_META: Record<string, { confirmed: boolean; payment: string; phone: string; fullName: string; preNote?: string }> = {
  "Lucas M.": { confirmed: true, payment: "Pago", phone: "+55 31 98765-4321", fullName: "Lucas Mendonça", preNote: "Retomar grounding" },
  "Ana B.": { confirmed: true, payment: "Pago", phone: "+55 31 91234-5678", fullName: "Ana Beatriz Souza" },
  "Rafael & Camila": { confirmed: false, payment: "Parcial", phone: "+55 31 99876-1234", fullName: "Rafael & Camila", preNote: "Comunicação" },
  "Pedro H.": { confirmed: true, payment: "Pago", phone: "+55 31 98877-6655", fullName: "Pedro Henrique" },
  "Carla S.": { confirmed: false, payment: "Pago", phone: "+55 31 94433-2211", fullName: "Carla Santos" },
  "Beatriz L.": { confirmed: true, payment: "Pago", phone: "+55 31 97766-5544", fullName: "Beatriz Lima" },
  "Roberto A.": { confirmed: false, payment: "A pagar", phone: "+55 31 95566-7788", fullName: "Roberto Almeida", preNote: "Sessão regular" },
  "Thiago A.": { confirmed: true, payment: "Isento", phone: "+55 31 93456-7890", fullName: "Thiago Akira", preNote: "Grounding" },
  "Juliana F.": { confirmed: false, payment: "A pagar", phone: "+55 31 94567-8901", fullName: "Juliana Ferreira" },
  "Supervisão": { confirmed: true, payment: "—", phone: "", fullName: "Supervisão Clínica" },
  "Intervisão": { confirmed: true, payment: "—", phone: "", fullName: "Intervisão Grupo" },
};

const payColors: Record<string, { c: string; bg: string }> = {
  "Pago": { c: "var(--c-green)", bg: "var(--c-green-soft)" },
  "Parcial": { c: "var(--c-accent)", bg: "var(--c-accent-soft)" },
  "A pagar": { c: "var(--c-rose)", bg: "var(--c-rose-soft)" },
  "Isento": { c: "var(--c-text-dim)", bg: "var(--c-card)" },
  "—": { c: "var(--c-text-dim)", bg: "var(--c-card)" },
};

export function AgendaPage({ agendaView, setAgendaView }: Props) {
  const [expandedEvent, setExpandedEvent] = useState<number | null>(null);
  const [hoveredEvent, setHoveredEvent] = useState<string | null>(null);
  const [hoverPos, setHoverPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [scheduleSlot, setScheduleSlot] = useState<{ day: string; hour: string } | null>(null);
  const [schedulePatient, setSchedulePatient] = useState("");
  const [dayConfirmed, setDayConfirmed] = useState<Set<string>>(new Set());
  const [dayWhatsapp, setDayWhatsapp] = useState<{patient:string;phone:string;time:string}|null>(null);
  const [dayMsgTemplate] = useState("Olá, {nome}! 😊\n\nConfirmando sua sessão de hoje às {horario}.\n\nTudo certo? Me avise se precisar remarcar.\n\nAbraço,\nDra. Marina");
  const buildDayMsg = (patient:string, time:string) => dayMsgTemplate.replace("{nome}", patient.split(" ")[0]).replace("{horario}", time);
  const [nowMinutes, setNowMinutes] = useState(7 * 60 + 35); // 07:35 mock

  // Simulate clock
  useEffect(() => {
    const t = setInterval(() => setNowMinutes((p) => p + 1), 60000);
    return () => clearInterval(t);
  }, []);

  const nowHourOffset = (nowMinutes - 6 * 60) / 60; // hours since 06:00
  const nowLineTop = nowHourOffset * 48; // 48px per hour row

  const handleSlotClick = (day: string, hour: string) => {
    const hasEvent = WEEK_AGENDA[day]?.find((e) => e.time === hour);
    if (!hasEvent) setScheduleSlot({ day, hour });
  };

  return (
    <div className="max-w-[1100px]">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex justify-between items-end mb-7">
        <div>
          <span className="text-xs font-sans font-semibold text-accent tracking-[0.1em] uppercase">Sua semana</span>
          <h1 className="text-4xl font-serif italic text-text font-normal mt-1">Agenda</h1>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex bg-surface rounded-xl p-[3px] border border-border">
            {["week", "day"].map((v) => (
              <motion.button key={v} whileTap={{ scale: 0.95 }} onClick={() => setAgendaView(v)}
                className="px-[18px] py-2 rounded-[9px] border-none text-[13px] font-medium font-sans cursor-pointer transition-all duration-300"
                style={{ background: agendaView === v ? "var(--c-accent-soft)" : "transparent", color: agendaView === v ? "var(--c-accent)" : "var(--c-text-dim)" }}>
                {v === "week" ? "Semana" : "Dia"}
              </motion.button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <button className="bg-transparent border-none cursor-pointer text-text-dim text-xl">‹</button>
            <span className="text-sm font-medium text-text font-sans min-w-[160px] text-center">
              {agendaView === "day" ? "Segunda, 10 Mar" : "10 — 14 Mar 2026"}
            </span>
            <button className="bg-transparent border-none cursor-pointer text-text-dim text-xl">›</button>
          </div>
          <button className="px-[18px] py-2 rounded-[10px] border border-border bg-surface text-[13px] font-medium text-text-muted font-sans cursor-pointer">Hoje</button>
        </div>
      </motion.div>

      <AnimatePresence mode="wait">
        {agendaView === "week" ? (
          <motion.div key="week" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}
            className="bg-surface rounded-[20px] border border-border overflow-hidden">
            {/* Day headers */}
            <div className="grid" style={{ gridTemplateColumns: "64px repeat(5, 1fr)" }}>
              <div className="p-3.5 border-r border-b border-border" />
              {DAYS.map((d, i) => (
                <div key={d} className="py-3.5 px-2 text-center border-b border-border"
                  style={{ borderRight: i < 4 ? "1px solid var(--c-border)" : "none", background: d === "Seg" ? "var(--c-accent-soft)" : "transparent" }}>
                  <div className="text-[11px] font-semibold text-text-dim font-sans tracking-[0.06em]">{d}</div>
                  <div className="text-[22px] font-serif italic mt-0.5" style={{ color: d === "Seg" ? "var(--c-accent)" : "var(--c-text-muted)" }}>{DATES[i]}</div>
                </div>
              ))}
            </div>

            {/* Grid body */}
            <div className="max-h-[480px] overflow-y-auto relative">
              {/* ── NOW LINE ── */}
              {nowHourOffset >= 0 && nowHourOffset <= 14 && (
                <div className="absolute left-0 right-0 z-30 pointer-events-none flex items-center" style={{ top: `${nowLineTop}px` }}>
                  <div className="w-[64px] flex justify-end pr-1.5">
                    <span className="text-[9px] font-sans font-bold px-1.5 py-0.5 rounded-full" style={{ background: "var(--c-rose)", color: "var(--c-bg)" }}>
                      {String(Math.floor(nowMinutes / 60)).padStart(2, "0")}:{String(nowMinutes % 60).padStart(2, "0")}
                    </span>
                  </div>
                  <div className="flex-1 h-[2px] relative">
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full" style={{ background: "var(--c-rose)" }} />
                    <div className="w-full h-px" style={{ background: "var(--c-rose)" }} />
                  </div>
                </div>
              )}

              {HOURS.map((hour) => (
                <div key={hour} className="grid min-h-[48px]" style={{ gridTemplateColumns: "64px repeat(5, 1fr)" }}>
                  <div className="py-1 px-2.5 text-[11px] text-text-dim font-medium font-sans text-right border-r border-border"
                    style={{ borderBottom: "1px solid var(--c-border)" }}>{hour}</div>
                  {DAYS.map((day, di) => {
                    const event = WEEK_AGENDA[day]?.find((e) => e.time === hour);
                    const tm = event ? typeMap[event.type] : null;
                    const meta = event ? EVENT_META[event.patient] : null;
                    const slotKey = `${day}-${hour}`;
                    const isEmpty = !event;
                    return (
                      <div key={day} className="p-[2px_3px] relative"
                        style={{ borderRight: di < 4 ? "1px solid var(--c-border)" : "none", borderBottom: "1px solid var(--c-border)" }}
                        onClick={() => isEmpty && handleSlotClick(day, hour)}>
                        {event && tm && (
                          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                            className="p-[6px_10px] rounded-[10px] text-xs font-medium font-sans cursor-pointer transition-shadow relative group"
                            style={{ background: tm.bg, borderLeft: `3px solid ${tm.color}`, color: tm.color, minHeight: event.rows > 1 ? `${event.rows * 48 - 4}px` : "auto" }}
                            onMouseEnter={(e) => { setHoveredEvent(slotKey); setHoverPos({ x: e.clientX, y: e.clientY }); }}
                            onMouseLeave={() => setHoveredEvent(null)}>
                            <div className="flex items-center justify-between">
                              <span className="text-[10px] opacity-60">{event.time}</span>
                              {/* Confirmation status icon */}
                              {meta && (
                                <span className="flex-shrink-0">
                                  {meta.confirmed ? (
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--c-green)" strokeWidth="3" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
                                  ) : (
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--c-accent)" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                                  )}
                                </span>
                              )}
                            </div>
                            <div className="mt-px">{event.patient}</div>

                            {/* ── TOOLTIP ── */}
                            {hoveredEvent === slotKey && meta && (
                              <div className="absolute z-50 left-1/2 -translate-x-1/2 bottom-full mb-2 w-[220px] rounded-xl p-3.5 pointer-events-auto"
                                style={{ background: "var(--c-card)", border: "1px solid var(--c-border)", boxShadow: "0 8px 30px var(--c-shadow)" }}
                                onClick={(e) => e.stopPropagation()}>
                                <div className="text-sm font-sans font-medium mb-1.5" style={{ color: "var(--c-text)" }}>{meta.fullName}</div>
                                <div className="flex flex-col gap-1.5">
                                  {/* Confirmation */}
                                  <div className="flex items-center gap-2">
                                    {meta.confirmed ? (
                                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="var(--c-green)" strokeWidth="3" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
                                    ) : (
                                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="var(--c-accent)" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                                    )}
                                    <span className="text-[11px] font-sans" style={{ color: meta.confirmed ? "var(--c-green)" : "var(--c-accent)" }}>
                                      {meta.confirmed ? "Confirmado" : "Aguardando"}
                                    </span>
                                  </div>
                                  {/* Payment */}
                                  <div className="flex items-center gap-2">
                                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke={payColors[meta.payment]?.c || "var(--c-text-dim)"} strokeWidth="2" strokeLinecap="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                                    <span className="text-[11px] font-sans px-1.5 py-0.5 rounded" style={{ color: payColors[meta.payment]?.c, background: payColors[meta.payment]?.bg }}>{meta.payment}</span>
                                  </div>
                                  {/* Pre-note */}
                                  {meta.preNote && (
                                    <div className="flex items-center gap-2">
                                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="var(--c-text-dim)" strokeWidth="2" strokeLinecap="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                                      <span className="text-[11px] font-sans" style={{ color: "var(--c-text-dim)" }}>{meta.preNote}</span>
                                    </div>
                                  )}
                                </div>
                                {/* WhatsApp quick action */}
                                {meta.phone && (
                                  <button onClick={(e) => { e.stopPropagation(); window.open(`https://wa.me/${meta.phone.replace(/\D/g,"")}`, "_blank"); }}
                                    className="mt-2.5 w-full flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-[11px] font-sans font-semibold cursor-pointer border-none"
                                    style={{ background: "#25D36618", color: "#25D366" }}>
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/></svg>
                                    WhatsApp
                                  </button>
                                )}
                              </div>
                            )}
                          </motion.div>
                        )}
                        {/* Empty slot hover */}
                        {isEmpty && (
                          <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity cursor-pointer rounded-lg"
                            style={{ background: "var(--c-accent-soft)" }}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--c-accent)" strokeWidth="2" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>

            {/* Categories */}
            <div className="flex items-center gap-3 py-3.5 px-6 border-t border-border">
              <span className="text-[10px] text-text-dim font-sans uppercase tracking-wide mr-1">Categorias:</span>
              {Object.entries(typeMap).map(([k, v]) => (
                <div key={k} className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg cursor-pointer hover:bg-surface-hover transition-colors border border-transparent hover:border-border group">
                  <div className="w-3 h-3 rounded-full cursor-pointer ring-2 ring-transparent group-hover:ring-border-light transition-all" style={{ background: v.color }} />
                  <span className="text-xs text-text-muted font-sans">{v.label}</span>
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="var(--c-text-dim)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-0 group-hover:opacity-100 transition-opacity">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                  </svg>
                </div>
              ))}
              <button className="flex items-center gap-1 px-2 py-1.5 rounded-lg text-[11px] text-accent font-sans font-medium cursor-pointer border border-dashed border-accent/20 bg-transparent hover:bg-accent-soft transition-colors">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                Nova
              </button>
            </div>
          </motion.div>
        ) : (
          /* ── DAY VIEW ── */
          <motion.div key="day" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex flex-col gap-2">
            {AGENDA_EVENTS.map((ev, i) => {
              const tm = typeMap[ev.type] || typeMap.individual;
              const isCancelled = ev.status === "cancelled"; const isBlocked = ev.type === "blocked";
              const isExpanded = expandedEvent === ev.id; const pm = ev.payment ? paymentMap[ev.payment] : null;
              return (
                <motion.div key={ev.id} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
                  onClick={() => !isBlocked && setExpandedEvent(isExpanded ? null : ev.id)}
                  className="flex items-stretch bg-surface rounded-2xl border overflow-hidden transition-all duration-300"
                  style={{ borderColor: isExpanded ? `${tm.color}30` : "var(--c-border)", opacity: isCancelled ? 0.45 : isBlocked ? 0.5 : 1, cursor: isBlocked ? "default" : "pointer" }}>
                  <div className="w-1 flex-shrink-0" style={{ background: tm.color }} />
                  <div className="w-[90px] py-[18px] px-3.5 flex flex-col items-center justify-center border-r border-border">
                    <div className="text-xl text-text font-serif italic">{ev.time}</div>
                    <div className="text-[11px] text-text-dim font-sans font-light">{ev.end}</div>
                  </div>
                  <div className="flex-1 py-4 px-[22px]">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <span className="text-base font-medium font-sans" style={{ color: isCancelled ? "var(--c-text-dim)" : "var(--c-text)", textDecoration: isCancelled ? "line-through" : "none" }}>{ev.patient}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        {ev.room && <span className="text-xs text-text-dim font-sans">Sala {ev.room}</span>}
                        {/* Confirm button */}
                        {!isBlocked && !isCancelled && (() => {
                          const shortName = ev.patient.length > 12 ? ev.patient : ev.patient;
                          const meta = Object.values(EVENT_META).find(m => m.fullName === ev.patient) || Object.entries(EVENT_META).find(([k]) => ev.patient.includes(k.split(" ")[0]))?.[1];
                          const isConf = dayConfirmed.has(ev.patient) || meta?.confirmed;
                          return isConf ? (
                            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg" style={{background:"var(--c-green-soft)",color:"var(--c-green)"}}>
                              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
                              <span className="text-[10px] font-sans font-semibold">Confirmado</span>
                            </div>
                          ) : (
                            <motion.button whileHover={{scale:1.05}} whileTap={{scale:0.95}}
                              onClick={(e) => {
                                e.stopPropagation();
                                setDayWhatsapp({patient:ev.patient, phone:meta?.phone||"+5531999999999", time:ev.time});
                              }}
                              className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg cursor-pointer border-none transition-colors"
                              style={{background:"#25D36618",color:"#25D366"}}>
                              <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/></svg>
                              <span className="text-[10px] font-sans font-semibold">Confirmar</span>
                            </motion.button>
                          );
                        })()}
                        {pm && <span className="px-2.5 py-1 rounded-lg text-[11px] font-semibold font-sans" style={{ color: pm.color, background: pm.bg }}>{pm.label}</span>}
                        <div className="w-2 h-2 rounded-full" style={{ background: tm.color }} />
                      </div>
                    </div>
                    <AnimatePresence>
                      {isExpanded && ev.notes && (
                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                          <p className="text-[13px] text-text-dim font-sans font-light mt-2 leading-relaxed">{ev.notes}</p>
                          {!isBlocked && (
                            <div className="flex gap-2 mt-3">
                              {["Abrir prontuário", "Remarcar", "Anotações"].map((a) => (
                                <motion.button key={a} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }} onClick={(e) => e.stopPropagation()}
                                  className="px-3.5 py-1.5 rounded-lg border border-border bg-card text-text-muted text-xs font-sans font-medium cursor-pointer hover:bg-card-hover transition-colors">{a}</motion.button>
                              ))}
                            </div>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 mt-7 max-w-[500px]">
        {[
          { label: "Sessões", value: "7", sub: "5 confirmadas", color: "var(--c-green)" },
          { label: "Ocupação", value: "82%", sub: "semana", color: "var(--c-accent)" },
        ].map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 + i * 0.08 }}
            className="bg-surface rounded-2xl p-[22px_24px] border border-border transition-all duration-300 cursor-default">
            <div className="text-[11px] font-semibold text-text-dim uppercase tracking-[0.08em] font-sans">{s.label}</div>
            <div className="text-[32px] font-serif italic font-normal mt-1.5" style={{ color: s.color }}>{s.value}</div>
            <div className="text-xs text-text-dim font-sans font-light mt-0.5">{s.sub}</div>
          </motion.div>
        ))}
      </div>

      {/* ── DAY VIEW WHATSAPP MODAL ── */}
      <AnimatePresence>
        {dayWhatsapp && (
          <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
            className="fixed inset-0 z-[9998] flex items-center justify-center"
            onClick={() => setDayWhatsapp(null)}>
            <div className="absolute inset-0" style={{background:"rgba(0,0,0,0.5)",backdropFilter:"blur(4px)"}} />
            <motion.div initial={{opacity:0,scale:0.95,y:20}} animate={{opacity:1,scale:1,y:0}} exit={{opacity:0,scale:0.95,y:20}}
              className="relative z-10 w-full max-w-[440px] rounded-[20px] overflow-hidden"
              style={{background:"var(--c-surface)",border:"1px solid var(--c-border)",boxShadow:"0 24px 80px var(--c-shadow)"}}
              onClick={e => e.stopPropagation()}>
              <div className="px-6 pt-5 pb-4 flex items-center gap-3" style={{borderBottom:"1px solid var(--c-border)"}}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{background:"#25D36618"}}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="#25D366"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/></svg>
                </div>
                <div>
                  <h3 className="text-lg font-serif italic" style={{color:"var(--c-text)"}}>Confirmar sessão</h3>
                  <p className="text-xs font-sans" style={{color:"var(--c-text-dim)"}}>
                    <span style={{color:"var(--c-accent)"}}>{dayWhatsapp.patient}</span> · {dayWhatsapp.time}
                  </p>
                </div>
              </div>
              {/* Preview */}
              <div className="px-6 py-5">
                <div className="p-4 rounded-xl rounded-bl-sm" style={{background:"#DCF8C6",color:"#111B21"}}>
                  <p className="text-[13px] font-sans leading-relaxed whitespace-pre-line">{buildDayMsg(dayWhatsapp.patient, dayWhatsapp.time)}</p>
                  <div className="flex justify-end mt-1"><span className="text-[10px]" style={{color:"#667781"}}>agora ✓✓</span></div>
                </div>
              </div>
              <div className="px-6 py-4 flex justify-end gap-3" style={{borderTop:"1px solid var(--c-border)"}}>
                <button onClick={() => setDayWhatsapp(null)}
                  className="px-5 py-2.5 rounded-xl text-sm font-sans font-medium cursor-pointer bg-transparent"
                  style={{border:"1px solid var(--c-border)",color:"var(--c-text-muted)"}}>Cancelar</button>
                <motion.button whileHover={{scale:1.02}} whileTap={{scale:0.98}}
                  onClick={() => {
                    const msg = buildDayMsg(dayWhatsapp.patient, dayWhatsapp.time);
                    window.open(`https://wa.me/${dayWhatsapp.phone.replace(/\D/g,"")}?text=${encodeURIComponent(msg)}`, "_blank");
                    setDayConfirmed(prev => new Set(prev).add(dayWhatsapp.patient));
                    setDayWhatsapp(null);
                  }}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-sans font-semibold cursor-pointer border-none"
                  style={{background:"#25D366",color:"#FFFFFF"}}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/></svg>
                  Enviar pelo WhatsApp
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── SCHEDULE MODAL ── */}
      <AnimatePresence>
        {scheduleSlot && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9998] flex items-center justify-center"
            onClick={() => setScheduleSlot(null)}>
            <div className="absolute inset-0" style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)" }} />
            <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative z-10 w-full max-w-[400px] rounded-[20px] overflow-hidden"
              style={{ background: "var(--c-surface)", border: "1px solid var(--c-border)", boxShadow: "0 24px 80px var(--c-shadow)" }}
              onClick={(e) => e.stopPropagation()}>
              {/* Header */}
              <div className="px-6 pt-5 pb-4" style={{ borderBottom: "1px solid var(--c-border)" }}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "var(--c-accent-soft)" }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--c-accent)" strokeWidth="2" strokeLinecap="round">
                      <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-serif italic" style={{ color: "var(--c-text)" }}>Agendar sessão</h3>
                    <p className="text-xs font-sans" style={{ color: "var(--c-text-dim)" }}>
                      {scheduleSlot.day} {DATES[DAYS.indexOf(scheduleSlot.day)]}/03 às {scheduleSlot.hour}
                    </p>
                  </div>
                </div>
              </div>
              {/* Body */}
              <div className="px-6 py-5">
                <label className="text-xs font-sans font-semibold uppercase tracking-[0.08em] mb-2 block" style={{ color: "var(--c-accent)" }}>Paciente</label>
                <input value={schedulePatient} onChange={(e) => setSchedulePatient(e.target.value)}
                  placeholder="Buscar paciente..."
                  className="w-full px-4 py-3 rounded-xl text-sm font-sans focus:outline-none transition-colors"
                  style={{ background: "var(--c-card)", border: "1px solid var(--c-border)", color: "var(--c-text)" }} />
                {/* Quick picks */}
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {["Lucas Mendonça", "Ana Beatriz", "Juliana Ferreira", "Pedro Henrique"].filter((n) => !schedulePatient || n.toLowerCase().includes(schedulePatient.toLowerCase())).map((name) => (
                    <button key={name} onClick={() => setSchedulePatient(name)}
                      className="px-3 py-1.5 rounded-lg text-xs font-sans font-medium cursor-pointer border-none transition-colors"
                      style={{ background: schedulePatient === name ? "var(--c-accent-soft)" : "var(--c-card)", color: schedulePatient === name ? "var(--c-accent)" : "var(--c-text-muted)", border: "1px solid var(--c-border)" }}>
                      {name}
                    </button>
                  ))}
                </div>

                <label className="text-xs font-sans font-semibold uppercase tracking-[0.08em] mt-5 mb-2 block" style={{ color: "var(--c-accent)" }}>Tipo</label>
                <div className="flex gap-2">
                  {Object.entries(typeMap).filter(([k]) => k !== "cancelled").map(([k, v]) => (
                    <button key={k} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-sans font-medium cursor-pointer border-none transition-colors"
                      style={{ background: v.bg, color: v.color, border: `1px solid ${v.color}20` }}>
                      <div className="w-2 h-2 rounded-full" style={{ background: v.color }} />
                      {v.label}
                    </button>
                  ))}
                </div>
              </div>
              {/* Footer */}
              <div className="px-6 py-4 flex justify-end gap-3" style={{ borderTop: "1px solid var(--c-border)" }}>
                <button onClick={() => { setScheduleSlot(null); setSchedulePatient(""); }}
                  className="px-5 py-2.5 rounded-xl text-sm font-sans font-medium cursor-pointer bg-transparent"
                  style={{ border: "1px solid var(--c-border)", color: "var(--c-text-muted)" }}>Cancelar</button>
                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                  onClick={() => { setScheduleSlot(null); setSchedulePatient(""); }}
                  className="px-6 py-2.5 rounded-xl text-sm font-sans font-semibold cursor-pointer border-none"
                  style={{ background: "var(--c-accent)", color: "var(--c-bg)" }}>Agendar</motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
