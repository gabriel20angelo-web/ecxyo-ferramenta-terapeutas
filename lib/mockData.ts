export const THERAPIST = {
  name: "Marina Alcântara",
  crp: "CRP 04/58921",
  tagline: "Psicóloga Clínica · Psicodinâmica · Supervisora",
  bio: "Há 12 anos acompanho pessoas em seus processos de autoconhecimento e transformação. Meu trabalho integra a escuta analítica com práticas contemporâneas, criando um espaço seguro para que cada pessoa encontre seus próprios caminhos.",
  specialties: [
    "Ansiedade",
    "Depressão",
    "Luto",
    "Autoconhecimento",
    "Relacionamentos",
    "TDAH",
    "Trauma",
    "Terapia de Casal",
    "Supervisão Clínica",
  ],
  services: [
    { name: "Psicoterapia Individual", duration: "50 min", price: "R$ 220", icon: "◯" },
    { name: "Terapia de Casal", duration: "80 min", price: "R$ 350", icon: "◎" },
    { name: "Avaliação Psicológica", duration: "90 min", price: "R$ 280", icon: "◈" },
    { name: "Supervisão Clínica", duration: "60 min", price: "R$ 250", icon: "◉" },
  ],
  education: [
    { title: "Mestrado em Psicologia Clínica", where: "PUC Minas", year: "2015" },
    { title: "Esp. Psicodinâmica", where: "UFMG", year: "2013" },
    { title: "Graduação em Psicologia", where: "UFMG", year: "2011" },
  ],
};

export const WEEK_SLOTS: Record<string, { slots: string[]; booked: string[] }> = {
  "Seg 10": {
    slots: ["07:00", "08:00", "09:00", "10:00", "14:00", "15:00", "16:00"],
    booked: ["08:00", "10:00", "15:00"],
  },
  "Ter 11": {
    slots: ["07:00", "08:00", "09:00", "14:00", "15:00", "16:00", "17:00"],
    booked: ["07:00", "09:00", "14:00", "16:00"],
  },
  "Qua 12": {
    slots: ["08:00", "09:00", "10:00", "11:00", "14:00", "15:00"],
    booked: ["08:00", "11:00"],
  },
  "Qui 13": {
    slots: ["07:00", "08:00", "09:00", "10:00", "17:00", "18:00"],
    booked: ["07:00", "08:00", "09:00"],
  },
  "Sex 14": {
    slots: ["08:00", "09:00", "10:00", "14:00", "15:00", "16:00"],
    booked: ["10:00", "14:00", "16:00"],
  },
};

export type AgendaEvent = {
  id: number;
  patient: string;
  time: string;
  end: string;
  type: "individual" | "couple" | "group" | "blocked" | "cancelled";
  status: "confirmed" | "pending" | "cancelled" | "blocked";
  payment: string;
  room: string;
  notes: string;
  session: number;
};

export const AGENDA_EVENTS: AgendaEvent[] = [
  { id: 1, patient: "Lucas Mendonça", time: "07:00", end: "07:50", type: "individual", status: "confirmed", payment: "pago", room: "01", notes: "12ª sessão — retorno medicação", session: 12 },
  { id: 2, patient: "Ana Beatriz Souza", time: "08:00", end: "08:50", type: "individual", status: "confirmed", payment: "pago", room: "01", notes: "Vínculo terapêutico", session: 8 },
  { id: 3, patient: "Rafael & Camila", time: "09:00", end: "10:20", type: "couple", status: "confirmed", payment: "parcial", room: "02", notes: "Comunicação não-violenta", session: 5 },
  { id: 4, patient: "Almoço", time: "12:00", end: "13:00", type: "blocked", status: "blocked", payment: "", room: "", notes: "", session: 0 },
  { id: 5, patient: "Juliana Ferreira", time: "14:00", end: "14:50", type: "individual", status: "pending", payment: "pagar", room: "01", notes: "Primeira sessão — acolhimento", session: 1 },
  { id: 6, patient: "Thiago Akira", time: "15:00", end: "15:50", type: "individual", status: "confirmed", payment: "pago", room: "01", notes: "Ansiedade — grounding", session: 15 },
  { id: 7, patient: "Grupo Gestantes", time: "16:00", end: "17:30", type: "group", status: "confirmed", payment: "pago", room: "03", notes: "Encontro 8 de 12", session: 8 },
  { id: 8, patient: "Mariana Costa", time: "18:00", end: "18:50", type: "individual", status: "cancelled", payment: "", room: "01", notes: "Cancelou — reagendar", session: 3 },
];

export type WeekEvent = {
  time: string;
  patient: string;
  type: "individual" | "couple" | "group" | "blocked" | "cancelled";
  rows: number;
};

export const WEEK_AGENDA: Record<string, WeekEvent[]> = {
  Seg: [
    { time: "07:00", patient: "Lucas M.", type: "individual", rows: 1 },
    { time: "08:00", patient: "Ana B.", type: "individual", rows: 1 },
    { time: "09:00", patient: "Rafael & Camila", type: "couple", rows: 2 },
    { time: "14:00", patient: "Juliana F.", type: "individual", rows: 1 },
    { time: "15:00", patient: "Thiago A.", type: "individual", rows: 1 },
    { time: "16:00", patient: "Gestantes", type: "group", rows: 2 },
    { time: "18:00", patient: "Mariana C.", type: "cancelled", rows: 1 },
  ],
  Ter: [
    { time: "07:00", patient: "Pedro H.", type: "individual", rows: 1 },
    { time: "08:00", patient: "Carla S.", type: "individual", rows: 1 },
    { time: "09:00", patient: "Beatriz L.", type: "individual", rows: 1 },
    { time: "14:00", patient: "Grupo Leitura", type: "group", rows: 2 },
    { time: "16:00", patient: "Fernanda M.", type: "individual", rows: 1 },
  ],
  Qua: [
    { time: "08:00", patient: "Lucas M.", type: "individual", rows: 1 },
    { time: "09:00", patient: "Roberto A.", type: "individual", rows: 1 },
    { time: "10:00", patient: "Supervisão", type: "blocked", rows: 1 },
    { time: "14:00", patient: "Ana B.", type: "individual", rows: 1 },
    { time: "15:00", patient: "Marcos V.", type: "individual", rows: 1 },
  ],
  Qui: [
    { time: "07:00", patient: "Thiago A.", type: "individual", rows: 1 },
    { time: "08:00", patient: "Juliana F.", type: "individual", rows: 1 },
    { time: "09:00", patient: "Rafael & Camila", type: "couple", rows: 2 },
    { time: "15:00", patient: "Gestantes", type: "group", rows: 2 },
    { time: "17:00", patient: "Carla S.", type: "individual", rows: 1 },
  ],
  Sex: [
    { time: "08:00", patient: "Pedro H.", type: "individual", rows: 1 },
    { time: "09:00", patient: "Beatriz L.", type: "individual", rows: 1 },
    { time: "10:00", patient: "Intervisão", type: "blocked", rows: 2 },
    { time: "14:00", patient: "Fernanda M.", type: "individual", rows: 1 },
    { time: "15:00", patient: "Roberto A.", type: "individual", rows: 1 },
  ],
};
