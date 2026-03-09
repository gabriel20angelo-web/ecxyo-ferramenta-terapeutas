"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Template = {
  id: string; name: string; icon: string; description: string; category: string;
  fields: { key: string; label: string; placeholder: string; type?: string }[];
  preview: (values: Record<string, string>) => React.ReactNode;
};

const TEMPLATE_ICONS: Record<string, React.ReactNode> = {
  autorizacao: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  encaminhamento: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 2L11 13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>,
  declaracao: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>,
  laudo: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></svg>,
  relatorio: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>,
  consentimento: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>,
};

const TEMPLATES: Template[] = [
  {
    id: "autorizacao", name: "Termo de Autorização", icon: "autorizacao", description: "Autorização para atendimento de crianças/adolescentes", category: "Termos",
    fields: [
      { key: "nomeResponsavel", label: "Nome do responsável legal", placeholder: "Nome completo" },
      { key: "nascResponsavel", label: "Data de nascimento do responsável", placeholder: "DD/MM/AAAA" },
      { key: "docResponsavel", label: "Documento do responsável", placeholder: "RG ou CPF nº" },
      { key: "endereco", label: "Endereço", placeholder: "Endereço completo" },
      { key: "nomeCrianca", label: "Nome da criança/adolescente", placeholder: "Nome completo" },
      { key: "nascCrianca", label: "Data de nascimento", placeholder: "DD/MM/AAAA" },
      { key: "docCrianca", label: "Documento da criança", placeholder: "RG nº" },
      { key: "psicologa", label: "Psicóloga (nome e CRP)", placeholder: "Nome — CRP-XX/XXXXX" },
      { key: "localData", label: "Cidade e data", placeholder: "Cidade, DD/MM/AAAA" },
    ],
    preview: (v) => (
      <div className="font-sans text-sm leading-relaxed">
        <h2 className="text-center text-lg font-bold mb-8 tracking-wide">TERMO DE AUTORIZAÇÃO</h2>
        <p className="mb-2">Nome do responsável legal: <I>{v.nomeResponsavel || "Nome do responsável legal"}</I></p>
        <p className="mb-2">Data de nascimento do responsável: <I>{v.nascResponsavel || "Data de nascimento do responsável"}</I></p>
        <p className="mb-2">Documento do responsável: <I>{v.docResponsavel || "Documento do responsável"}</I></p>
        <p className="mb-2">Endereço: <I>{v.endereco || "Endereço"}</I></p>
        <p className="mb-2">Nome da criança/adolescente: <I>{v.nomeCrianca || "Nome da criança/adolescente"}</I></p>
        <p className="mb-2">Data de nascimento: <I>{v.nascCrianca || "Data de nascimento"}</I></p>
        <p className="mb-6">Documento da criança: <I>{v.docCrianca || "Documento da criança"}</I></p>
        <p className="text-text-dim text-xs mb-10">Este documento possui caráter sigiloso e extrajudicial.</p>
        <p className="text-center mb-10"><I>{v.localData || "Local e data"}</I></p>
        <div className="text-center">
          <div className="w-64 h-px bg-border-light mx-auto mb-2" />
          <p><I>{v.psicologa || "Psicóloga"}</I></p>
        </div>
      </div>
    ),
  },
  {
    id: "encaminhamento", name: "Encaminhamento", icon: "encaminhamento", description: "Encaminhamento para outro profissional de saúde", category: "Clínicos",
    fields: [
      { key: "destinatario", label: "Destinatário", placeholder: "Dr./Dra. Nome — Especialidade" },
      { key: "paciente", label: "Nome do paciente", placeholder: "Nome completo" },
      { key: "idade", label: "Idade", placeholder: "XX anos" },
      { key: "tempo", label: "Tempo em acompanhamento", placeholder: "X meses" },
      { key: "motivo", label: "Motivo do encaminhamento", placeholder: "Descreva o motivo...", type: "textarea" },
      { key: "observacoes", label: "Observações clínicas", placeholder: "Informações relevantes...", type: "textarea" },
      { key: "psicologa", label: "Psicóloga (nome e CRP)", placeholder: "Nome — CRP-XX/XXXXX" },
      { key: "localData", label: "Cidade e data", placeholder: "Cidade, DD/MM/AAAA" },
    ],
    preview: (v) => (
      <div className="font-sans text-sm leading-relaxed">
        <h2 className="text-center text-lg font-bold mb-8 tracking-wide">ENCAMINHAMENTO</h2>
        <p className="mb-4">A/C: <I>{v.destinatario || "Destinatário"}</I></p>
        <p className="mb-2">Encaminho o(a) paciente <I>{v.paciente || "Nome do paciente"}</I>, <I>{v.idade || "idade"}</I>, em acompanhamento psicológico há <I>{v.tempo || "tempo"}</I>, para avaliação e conduta de sua especialidade.</p>
        <p className="mb-2 mt-4 font-semibold text-xs uppercase tracking-wide text-text-muted">Motivo do encaminhamento:</p>
        <p className="mb-4"><I>{v.motivo || "Motivo do encaminhamento"}</I></p>
        <p className="mb-2 font-semibold text-xs uppercase tracking-wide text-text-muted">Observações clínicas:</p>
        <p className="mb-8"><I>{v.observacoes || "Observações clínicas"}</I></p>
        <p className="mb-2">Coloco-me à disposição para quaisquer esclarecimentos.</p>
        <p className="mt-8 mb-10 text-center"><I>{v.localData || "Local e data"}</I></p>
        <div className="text-center"><div className="w-64 h-px bg-border-light mx-auto mb-2"/><p><I>{v.psicologa || "Psicóloga"}</I></p></div>
      </div>
    ),
  },
  {
    id: "declaracao", name: "Declaração de Comparecimento", icon: "declaracao", description: "Declaração para fins de abono de faltas", category: "Termos",
    fields: [
      { key: "paciente", label: "Nome do paciente", placeholder: "Nome completo" },
      { key: "cpf", label: "CPF", placeholder: "000.000.000-00" },
      { key: "data", label: "Data do atendimento", placeholder: "DD/MM/AAAA" },
      { key: "horario", label: "Horário", placeholder: "HH:MM às HH:MM" },
      { key: "psicologa", label: "Psicóloga (nome e CRP)", placeholder: "Nome — CRP-XX/XXXXX" },
      { key: "localData", label: "Cidade e data", placeholder: "Cidade, DD/MM/AAAA" },
    ],
    preview: (v) => (
      <div className="font-sans text-sm leading-relaxed">
        <h2 className="text-center text-lg font-bold mb-8 tracking-wide">DECLARAÇÃO DE COMPARECIMENTO</h2>
        <p className="mb-4">Declaro, para os devidos fins, que <I>{v.paciente || "Nome do paciente"}</I>, CPF <I>{v.cpf || "CPF"}</I>, esteve em atendimento psicológico nesta data:</p>
        <p className="mb-2">Data: <I>{v.data || "Data do atendimento"}</I></p>
        <p className="mb-6">Horário: <I>{v.horario || "Horário"}</I></p>
        <p className="text-text-dim text-xs mb-10">Este documento não contém informações sobre diagnóstico ou tratamento, conforme Art. 1º do Código de Ética Profissional do Psicólogo.</p>
        <p className="text-center mb-10"><I>{v.localData || "Local e data"}</I></p>
        <div className="text-center"><div className="w-64 h-px bg-border-light mx-auto mb-2"/><p><I>{v.psicologa || "Psicóloga"}</I></p></div>
      </div>
    ),
  },
  {
    id: "laudo", name: "Laudo Psicológico", icon: "laudo", description: "Laudo para fins judiciais, escolares ou institucionais", category: "Clínicos",
    fields: [
      { key: "solicitante", label: "Solicitante", placeholder: "Nome/Instituição" },
      { key: "finalidade", label: "Finalidade", placeholder: "Objetivo do laudo" },
      { key: "paciente", label: "Nome do avaliando", placeholder: "Nome completo" },
      { key: "idade", label: "Idade", placeholder: "XX anos" },
      { key: "periodo", label: "Período de avaliação", placeholder: "DD/MM a DD/MM/AAAA" },
      { key: "procedimentos", label: "Procedimentos utilizados", placeholder: "Entrevistas, testes aplicados...", type: "textarea" },
      { key: "analise", label: "Análise", placeholder: "Descrição dos resultados e análise clínica...", type: "textarea" },
      { key: "conclusao", label: "Conclusão", placeholder: "Conclusão do laudo...", type: "textarea" },
      { key: "psicologa", label: "Psicóloga (nome e CRP)", placeholder: "Nome — CRP-XX/XXXXX" },
      { key: "localData", label: "Cidade e data", placeholder: "Cidade, DD/MM/AAAA" },
    ],
    preview: (v) => (
      <div className="font-sans text-sm leading-relaxed">
        <h2 className="text-center text-lg font-bold mb-2 tracking-wide">LAUDO PSICOLÓGICO</h2>
        <p className="text-center text-xs text-text-dim mb-8">Conforme Resolução CFP nº 06/2019</p>
        <p className="mb-1"><b>Solicitante:</b> <I>{v.solicitante || "Solicitante"}</I></p>
        <p className="mb-1"><b>Finalidade:</b> <I>{v.finalidade || "Finalidade"}</I></p>
        <p className="mb-1"><b>Avaliando:</b> <I>{v.paciente || "Nome"}</I>, <I>{v.idade || "idade"}</I></p>
        <p className="mb-4"><b>Período:</b> <I>{v.periodo || "Período"}</I></p>
        <p className="font-semibold text-xs uppercase tracking-wide text-text-muted mb-2">Procedimentos</p>
        <p className="mb-4"><I>{v.procedimentos || "Procedimentos utilizados"}</I></p>
        <p className="font-semibold text-xs uppercase tracking-wide text-text-muted mb-2">Análise</p>
        <p className="mb-4"><I>{v.analise || "Análise"}</I></p>
        <p className="font-semibold text-xs uppercase tracking-wide text-text-muted mb-2">Conclusão</p>
        <p className="mb-8"><I>{v.conclusao || "Conclusão"}</I></p>
        <p className="text-center mb-10"><I>{v.localData || "Local e data"}</I></p>
        <div className="text-center"><div className="w-64 h-px bg-border-light mx-auto mb-2"/><p><I>{v.psicologa || "Psicóloga"}</I></p></div>
      </div>
    ),
  },
  {
    id: "relatorio", name: "Relatório de Acompanhamento", icon: "relatorio", description: "Relatório de evolução para instituições ou familiares", category: "Clínicos",
    fields: [
      { key: "destinatario", label: "Destinatário", placeholder: "Nome/Instituição" },
      { key: "paciente", label: "Nome do paciente", placeholder: "Nome completo" },
      { key: "periodo", label: "Período", placeholder: "Mês/Ano a Mês/Ano" },
      { key: "sessoes", label: "Nº de sessões no período", placeholder: "XX sessões" },
      { key: "objetivos", label: "Objetivos terapêuticos", placeholder: "Objetivos trabalhados...", type: "textarea" },
      { key: "evolucao", label: "Evolução observada", placeholder: "Progressos e desafios...", type: "textarea" },
      { key: "plano", label: "Plano de continuidade", placeholder: "Próximos passos...", type: "textarea" },
      { key: "psicologa", label: "Psicóloga (nome e CRP)", placeholder: "Nome — CRP-XX/XXXXX" },
      { key: "localData", label: "Cidade e data", placeholder: "Cidade, DD/MM/AAAA" },
    ],
    preview: (v) => (
      <div className="font-sans text-sm leading-relaxed">
        <h2 className="text-center text-lg font-bold mb-8 tracking-wide">RELATÓRIO DE ACOMPANHAMENTO PSICOLÓGICO</h2>
        <p className="mb-1"><b>A/C:</b> <I>{v.destinatario || "Destinatário"}</I></p>
        <p className="mb-1"><b>Paciente:</b> <I>{v.paciente || "Nome"}</I></p>
        <p className="mb-1"><b>Período:</b> <I>{v.periodo || "Período"}</I></p>
        <p className="mb-4"><b>Sessões:</b> <I>{v.sessoes || "Nº sessões"}</I></p>
        <p className="font-semibold text-xs uppercase tracking-wide text-text-muted mb-2">Objetivos terapêuticos</p>
        <p className="mb-4"><I>{v.objetivos || "Objetivos"}</I></p>
        <p className="font-semibold text-xs uppercase tracking-wide text-text-muted mb-2">Evolução observada</p>
        <p className="mb-4"><I>{v.evolucao || "Evolução"}</I></p>
        <p className="font-semibold text-xs uppercase tracking-wide text-text-muted mb-2">Plano de continuidade</p>
        <p className="mb-8"><I>{v.plano || "Plano"}</I></p>
        <p className="text-center mb-10"><I>{v.localData || "Local e data"}</I></p>
        <div className="text-center"><div className="w-64 h-px bg-border-light mx-auto mb-2"/><p><I>{v.psicologa || "Psicóloga"}</I></p></div>
      </div>
    ),
  },
  {
    id: "consentimento", name: "Termo de Consentimento", icon: "consentimento", description: "Consentimento livre e esclarecido para tratamento", category: "Termos",
    fields: [
      { key: "paciente", label: "Nome do paciente", placeholder: "Nome completo" },
      { key: "cpf", label: "CPF", placeholder: "000.000.000-00" },
      { key: "abordagem", label: "Abordagem terapêutica", placeholder: "Ex: Psicodinâmica" },
      { key: "frequencia", label: "Frequência das sessões", placeholder: "Ex: Semanal, 50 min" },
      { key: "valor", label: "Valor da sessão", placeholder: "R$ XXX,00" },
      { key: "psicologa", label: "Psicóloga (nome e CRP)", placeholder: "Nome — CRP-XX/XXXXX" },
      { key: "localData", label: "Cidade e data", placeholder: "Cidade, DD/MM/AAAA" },
    ],
    preview: (v) => (
      <div className="font-sans text-sm leading-relaxed">
        <h2 className="text-center text-lg font-bold mb-8 tracking-wide">TERMO DE CONSENTIMENTO LIVRE E ESCLARECIDO</h2>
        <p className="mb-4">Eu, <I>{v.paciente || "Nome do paciente"}</I>, CPF <I>{v.cpf || "CPF"}</I>, declaro que fui informado(a) e compreendi:</p>
        <ul className="list-disc pl-5 mb-4 flex flex-col gap-1.5 text-text-muted">
          <li>A abordagem terapêutica será <I>{v.abordagem || "abordagem"}</I></li>
          <li>As sessões terão frequência <I>{v.frequencia || "frequência"}</I></li>
          <li>O valor acordado é de <I>{v.valor || "valor"}</I> por sessão</li>
          <li>O sigilo profissional será mantido conforme Código de Ética do Psicólogo</li>
          <li>Posso interromper o tratamento a qualquer momento</li>
        </ul>
        <p className="text-text-dim text-xs mb-10">Ao assinar, concordo com os termos acima descritos.</p>
        <p className="text-center mb-10"><I>{v.localData || "Local e data"}</I></p>
        <div className="flex justify-between px-8">
          <div className="text-center"><div className="w-48 h-px bg-border-light mb-2"/><p className="text-xs text-text-dim">Paciente</p></div>
          <div className="text-center"><div className="w-48 h-px bg-border-light mb-2"/><p><I>{v.psicologa || "Psicóloga"}</I></p></div>
        </div>
      </div>
    ),
  },
];

// Italic placeholder component
function I({ children }: { children: React.ReactNode }) {
  const text = String(children);
  const isFilled = !text.includes("Nome") && !text.includes("Data") && !text.includes("Documento") && !text.includes("Endereço") && !text.includes("Local") && !text.includes("Psicóloga") && !text.includes("Destinatário") && !text.includes("CPF") && !text.includes("idade") && !text.includes("Período") && !text.includes("Nº") && !text.includes("Motivo") && !text.includes("Observações") && !text.includes("abordagem") && !text.includes("frequência") && !text.includes("valor") && !text.includes("Objetivo") && !text.includes("Evolução") && !text.includes("Plano") && !text.includes("Procedimentos") && !text.includes("Análise") && !text.includes("Conclusão") && !text.includes("Finalidade") && !text.includes("Solicitante") && !text.includes("Horário") && !text.includes("tempo");
  return <span className={isFilled ? "text-text font-medium" : "italic text-text-dim"}>{children}</span>;
}

export function DocumentosPage() {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [values, setValues] = useState<Record<string, string>>({});
  const [galleryTab, setGalleryTab] = useState<"modelos"|"meus">("modelos");
  const [docSearch, setDocSearch] = useState("");
  const [favorites, setFavorites] = useState<Set<string>>(new Set(["declaracao","laudo"]));
  const [aiPatient, setAiPatient] = useState("");
  const template = TEMPLATES.find(t => t.id === selectedTemplate);
  const categories = [...new Set(TEMPLATES.map(t => t.category))];

  if (template) {
    return (
      <div className="max-w-[1200px]">
        {/* Back + title */}
        <motion.div initial={{opacity:0,y:15}} animate={{opacity:1,y:0}} className="flex items-center justify-between mb-6">
          <div>
            <button onClick={() => { setSelectedTemplate(null); setValues({}); }}
              className="flex items-center gap-2 text-text-dim text-sm font-sans font-medium mb-3 cursor-pointer bg-transparent border-none hover:text-accent transition-colors">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="15 18 9 12 15 6"/></svg>
              Voltar
            </button>
            <div className="flex items-center gap-3">
              <span className="text-accent">{TEMPLATE_ICONS[template.icon] || TEMPLATE_ICONS.declaracao}</span>
              <div>
                <h1 className="text-xl font-serif italic text-text">{template.name}</h1>
                <p className="text-xs text-text-dim font-sans font-light">{template.description}</p>
              </div>
            </div>
          </div>
          <div className="flex gap-3">
            <motion.button whileHover={{scale:1.03}} whileTap={{scale:0.97}}
              className="px-5 py-2.5 rounded-xl text-sm font-sans font-semibold cursor-pointer border-none flex items-center gap-2"
              style={{background:"var(--c-green)", color:"var(--c-bg)"}}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
              Gerar PDF
            </motion.button>
            <motion.button whileHover={{scale:1.03}} whileTap={{scale:0.97}}
              className="px-5 py-2.5 rounded-xl text-sm font-sans font-semibold cursor-pointer border-none flex items-center gap-2"
              style={{background:"var(--c-blue)", color:"var(--c-bg)"}}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
              Gerar DOCX
            </motion.button>
          </div>
        </motion.div>

        {/* Two columns: form + preview */}
        <div className="grid grid-cols-[400px_1fr] gap-6">
          {/* Form */}
          <motion.div initial={{opacity:0,x:-15}} animate={{opacity:1,x:0}} transition={{delay:0.1}}
            className="bg-surface rounded-[20px] border border-border p-6 self-start sticky top-[80px] max-h-[calc(100vh-120px)] overflow-y-auto">
            <h3 className="text-xs font-sans font-semibold text-accent uppercase tracking-[0.1em] mb-5 flex items-center gap-2">
              <span className="w-4 h-px bg-accent"/>Preencha os campos
            </h3>
            <div className="flex flex-col gap-4">
              {template.fields.map(f => (
                <div key={f.key}>
                  <label className="text-xs font-sans font-medium text-text-muted mb-1.5 block">{f.label}</label>
                  {f.type === "textarea" ? (
                    <textarea value={values[f.key] || ""} onChange={e => setValues({...values, [f.key]: e.target.value})}
                      placeholder={f.placeholder} rows={3}
                      className="w-full px-4 py-3 rounded-xl bg-card border border-border text-sm font-sans text-text placeholder:text-text-dim resize-none focus:outline-none focus:border-accent/30 transition-colors"/>
                  ) : (
                    <input value={values[f.key] || ""} onChange={e => setValues({...values, [f.key]: e.target.value})}
                      placeholder={f.placeholder}
                      className="w-full px-4 py-3 rounded-xl bg-card border border-border text-sm font-sans text-text placeholder:text-text-dim focus:outline-none focus:border-accent/30 transition-colors"/>
                  )}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Preview */}
          <motion.div initial={{opacity:0,x:15}} animate={{opacity:1,x:0}} transition={{delay:0.15}}
            className="bg-surface rounded-[20px] border border-border p-10 min-h-[700px]"
            style={{boxShadow:"0 4px 30px rgba(0,0,0,0.2)"}}>
            {template.preview(values)}
          </motion.div>
        </div>
      </div>
    );
  }

  // ── GALLERY STATE ──

  const USAGE: Record<string,number> = {autorizacao:8,encaminhamento:14,declaracao:22,laudo:11,relatorio:6,consentimento:18};

  const MY_DOCS = [
    {id:1,name:"Laudo Psicológico — Lucas Mendonça",template:"Laudo",date:"06/03/2026",patient:"Lucas Mendonça",signature:"Assinado",expires:"06/09/2026",expiresIn:184},
    {id:2,name:"Declaração de Comparecimento — Ana Beatriz",template:"Declaração",date:"05/03/2026",patient:"Ana Beatriz Souza",signature:"Assinado",expires:null,expiresIn:null},
    {id:3,name:"Encaminhamento Psiquiatria — Abrana Peixoto",template:"Encaminhamento",date:"01/03/2026",patient:"Abrana Peixoto",signature:"Pendente",expires:null,expiresIn:null},
    {id:4,name:"Termo de Consentimento — Juliana Ferreira",template:"Consentimento",date:"28/02/2026",patient:"Juliana Ferreira",signature:"Pendente",expires:null,expiresIn:null},
    {id:5,name:"Relatório de Acompanhamento — Thiago Akira",template:"Relatório",date:"20/02/2026",patient:"Thiago Akira",signature:"Assinado",expires:null,expiresIn:null},
    {id:6,name:"Laudo Psicológico — Alessandra Cavalcanti",template:"Laudo",date:"10/01/2026",patient:"Alessandra C.",signature:"Assinado",expires:"10/04/2026",expiresIn:31},
    {id:7,name:"Termo de Autorização — Pedro Henrique",template:"Autorização",date:"01/02/2026",patient:"Pedro Henrique",signature:"Assinado",expires:"01/08/2026",expiresIn:144},
  ];

  const sigC:Record<string,{c:string;bg:string}> = {
    Assinado:{c:"var(--c-green)",bg:"var(--c-green-soft)"},Pendente:{c:"var(--c-accent)",bg:"var(--c-accent-soft)"},
  };

  const PATIENTS_LIST = ["Lucas Mendonça","Ana Beatriz Souza","Abrana Peixoto","Juliana Ferreira","Thiago Akira","Rafael & Camila","Pedro Henrique","Bernardo Costa","Mariana Costa"];

  const toggleFav = (id:string) => setFavorites(prev => { const n = new Set(prev); n.has(id)?n.delete(id):n.add(id); return n; });

  const filteredTemplates = TEMPLATES.filter(t => !docSearch || t.name.toLowerCase().includes(docSearch.toLowerCase()) || t.description.toLowerCase().includes(docSearch.toLowerCase()));
  const favTemplates = filteredTemplates.filter(t => favorites.has(t.id));
  const nonFavTemplates = filteredTemplates.filter(t => !favorites.has(t.id));

  // Template gallery
  return (
    <div className="max-w-[1100px]">
      <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} className="flex justify-between items-end mb-7">
        <div>
          <span className="text-xs font-sans font-semibold text-accent tracking-[0.1em] uppercase">Modelos</span>
          <h1 className="text-4xl font-serif italic text-text font-normal mt-1">Documentos</h1>
        </div>
        <div className="flex items-center gap-3">
          {/* Search */}
          <div className="flex items-center gap-2 px-3 py-2 rounded-xl" style={{background:"var(--c-surface)",border:"1px solid var(--c-border)"}}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--c-text-dim)" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <input value={docSearch} onChange={e=>setDocSearch(e.target.value)} placeholder="Buscar modelo..."
              className="bg-transparent border-none outline-none text-sm font-sans w-[160px]" style={{color:"var(--c-text)"}}/>
          </div>
        </div>
      </motion.div>

      {/* Tabs */}
      <div className="flex gap-1 mb-6">
        {[
          {key:"modelos" as const,label:"Modelos",count:TEMPLATES.length},
          {key:"meus" as const,label:"Meus Documentos",count:MY_DOCS.length},
        ].map(t => (
          <button key={t.key} onClick={()=>setGalleryTab(t.key)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl border-none text-[13px] font-sans font-medium cursor-pointer transition-all"
            style={{background:galleryTab===t.key?"var(--c-accent-soft)":"transparent",color:galleryTab===t.key?"var(--c-accent)":"var(--c-text-dim)"}}>
            {t.label}
            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full" style={{background:galleryTab===t.key?"var(--c-accent-soft)":"var(--c-card)",color:galleryTab===t.key?"var(--c-accent)":"var(--c-text-dim)"}}>{t.count}</span>
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {galleryTab === "modelos" ? (
          <motion.div key="modelos" initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} exit={{opacity:0}}>
            {/* Favoritos */}
            {favTemplates.length > 0 && (
              <div className="mb-8">
                <h2 className="text-sm font-sans font-semibold tracking-[0.08em] uppercase flex items-center gap-2 mb-4" style={{color:"var(--c-accent)"}}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="var(--c-accent)" stroke="var(--c-accent)" strokeWidth="1.5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                  Fixados
                </h2>
                <div className="grid grid-cols-3 gap-4">
                  {favTemplates.map((t,i) => (
                    <TemplateCard key={t.id} t={t} i={i} isFav={true} usage={USAGE[t.id]||0} onSelect={()=>setSelectedTemplate(t.id)} onToggleFav={()=>toggleFav(t.id)}/>
                  ))}
                </div>
              </div>
            )}

            {/* By category */}
            {categories.map(cat => {
              const catTemplates = nonFavTemplates.filter(t => t.category === cat);
              if (catTemplates.length === 0) return null;
              return (
                <div key={cat} className="mb-8">
                  <h2 className="text-sm font-sans font-semibold tracking-[0.08em] uppercase flex items-center gap-2 mb-4" style={{color:"var(--c-accent)"}}>
                    <span className="w-4 h-px" style={{background:"var(--c-accent)"}}/>{cat}
                  </h2>
                  <div className="grid grid-cols-3 gap-4">
                    {catTemplates.map((t,i) => (
                      <TemplateCard key={t.id} t={t} i={i} isFav={false} usage={USAGE[t.id]||0} onSelect={()=>setSelectedTemplate(t.id)} onToggleFav={()=>toggleFav(t.id)}/>
                    ))}
                  </div>
                </div>
              );
            })}

            {filteredTemplates.length === 0 && (
              <div className="p-12 text-center rounded-[20px]" style={{background:"var(--c-surface)",border:"1px solid var(--c-border)"}}>
                <p className="text-sm font-sans" style={{color:"var(--c-text-dim)"}}>Nenhum modelo encontrado para "{docSearch}".</p>
              </div>
            )}

            {/* AI Section with patient selector */}
            <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:0.3}} className="mt-10 mb-2">
              <h2 className="text-sm font-sans font-semibold tracking-[0.08em] uppercase flex items-center gap-2 mb-4" style={{color:"var(--c-couple)"}}>
                <span className="w-4 h-px" style={{background:"var(--c-couple)"}}/>Prontuário com auxílio da IA
              </h2>
              <div className="rounded-[20px] border p-8 relative overflow-hidden" style={{background:"var(--c-surface)",borderColor:"var(--c-couple-soft)"}}>
                <div className="absolute top-0 right-0 w-[300px] h-[300px] pointer-events-none" style={{background:"radial-gradient(circle at top right, var(--c-couple-soft), transparent 60%)"}}/>
                <div className="relative flex items-start gap-6">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
                    style={{background:"linear-gradient(135deg, var(--c-couple-soft), var(--c-blue-soft))",border:"1px solid var(--c-couple-soft)"}}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--c-couple)" strokeWidth="1.5" strokeLinecap="round"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-serif italic mb-2" style={{color:"var(--c-text)"}}>Gerar prontuário assistido por IA</h3>
                    <p className="text-sm font-sans font-light leading-relaxed mb-4" style={{color:"var(--c-text-muted)"}}>
                      Selecione um paciente e a IA usará as anotações de sessão para gerar rascunhos — sempre sob sua revisão.
                    </p>

                    {/* Patient selector */}
                    <div className="mb-5">
                      <label className="text-xs font-sans font-semibold uppercase tracking-[0.08em] mb-2 block" style={{color:"var(--c-couple)"}}>Paciente</label>
                      <input value={aiPatient} onChange={e=>setAiPatient(e.target.value)} placeholder="Selecionar paciente..."
                        className="w-full max-w-[360px] px-4 py-2.5 rounded-xl text-sm font-sans focus:outline-none transition-colors"
                        style={{background:"var(--c-card)",border:"1px solid var(--c-border)",color:"var(--c-text)"}}/>
                      {aiPatient && (
                        <div className="flex flex-wrap gap-1.5 mt-2">
                          {PATIENTS_LIST.filter(n=>n.toLowerCase().includes(aiPatient.toLowerCase())).slice(0,5).map(n => (
                            <button key={n} onClick={()=>setAiPatient(n)}
                              className="px-2.5 py-1 rounded-lg text-[11px] font-sans font-medium cursor-pointer border-none transition-colors"
                              style={{background:aiPatient===n?"var(--c-couple-soft)":"var(--c-card)",color:aiPatient===n?"var(--c-couple)":"var(--c-text-muted)",border:"1px solid var(--c-border)"}}>{n}</button>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col gap-3 mb-5">
                      {[
                        {label:"Evolução clínica",desc:"Gera resumo de evolução a partir das notas da sessão",color:"var(--c-green)"},
                        {label:"Ficha de evolução",desc:"Preenche campos estruturados (CID, conduta, encaminhamentos)",color:"var(--c-accent)"},
                        {label:"Relatório de acompanhamento",desc:"Produz relatório para envio a instituições ou familiares",color:"var(--c-blue)"},
                        {label:"Sugestão de encaminhamento",desc:"Sugere texto de encaminhamento baseado no caso",color:"var(--c-couple)"},
                      ].map((item,i) => (
                        <motion.div key={i} initial={{opacity:0,x:-10}} animate={{opacity:1,x:0}} transition={{delay:0.35+i*0.06}}
                          className="flex items-center gap-3 px-4 py-3 rounded-xl transition-colors cursor-pointer group"
                          style={{background:"var(--c-card)",border:"1px solid var(--c-border)"}}>
                          <div className="w-2 h-2 rounded-full flex-shrink-0" style={{background:item.color}}/>
                          <div className="flex-1">
                            <span className="text-sm font-sans font-medium transition-colors" style={{color:"var(--c-text)"}}>{item.label}</span>
                            <span className="text-[11px] font-sans ml-2" style={{color:"var(--c-text-dim)"}}>{item.desc}</span>
                          </div>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--c-text-dim)" strokeWidth="2" strokeLinecap="round" className="opacity-0 group-hover:opacity-100 transition-opacity"><polyline points="9 18 15 12 9 6"/></svg>
                        </motion.div>
                      ))}
                    </div>
                    <div className="flex items-center gap-2 text-[11px] font-sans" style={{color:"var(--c-text-dim)"}}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
                      Todo conteúdo gerado é um rascunho e deve ser revisado pelo profissional antes de salvar.
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        ) : (
          /* ── MEUS DOCUMENTOS ── */
          <motion.div key="meus" initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} exit={{opacity:0}}>
            {/* Expiring alerts */}
            {MY_DOCS.filter(d=>d.expiresIn!==null&&d.expiresIn!==undefined&&d.expiresIn<=60).length > 0 && (
              <div className="mb-5 flex flex-col gap-2">
                {MY_DOCS.filter(d=>d.expiresIn!==null&&d.expiresIn!==undefined&&d.expiresIn<=60).map((d,i) => (
                  <div key={i} className="flex items-center gap-3 px-4 py-3 rounded-xl" style={{background:"var(--c-accent-soft)",border:"1px solid var(--c-accent-soft)"}}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--c-accent)" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                    <span className="text-xs font-sans" style={{color:"var(--c-accent)"}}>
                      <strong>{d.name}</strong> vence em {d.expiresIn} dias ({d.expires})
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* Documents table */}
            <div className="rounded-[20px] overflow-hidden" style={{background:"var(--c-surface)",border:"1px solid var(--c-border)"}}>
              <div className="grid grid-cols-[2.5fr_100px_90px_100px_110px_100px] px-6 py-2.5" style={{borderBottom:"1px solid var(--c-border)"}}>
                {["Documento","Tipo","Data","Paciente","Assinatura","Ações"].map(h =>
                  <span key={h} className="text-[10px] font-sans font-semibold uppercase tracking-[0.06em]" style={{color:"var(--c-text-dim)"}}>{h}</span>
                )}
              </div>
              {MY_DOCS.map((d,i) => (
                <motion.div key={d.id} initial={{opacity:0}} animate={{opacity:1}} transition={{delay:i*0.03}}
                  className="grid grid-cols-[2.5fr_100px_90px_100px_110px_100px] px-6 py-3.5 items-center transition-colors group"
                  style={{borderBottom:"1px solid var(--c-border)"}}
                  onMouseEnter={e=>(e.currentTarget.style.background="var(--c-surface-hover)")}
                  onMouseLeave={e=>(e.currentTarget.style.background="transparent")}>
                  <div className="flex items-center gap-3">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--c-accent)" strokeWidth="1.8" strokeLinecap="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                    <div>
                      <span className="text-sm font-sans font-medium block" style={{color:"var(--c-text)"}}>{d.name}</span>
                      {d.expires && d.expiresIn!==null && d.expiresIn<=60 && (
                        <span className="text-[10px] font-sans" style={{color:"var(--c-accent)"}}>Vence em {d.expiresIn} dias</span>
                      )}
                    </div>
                  </div>
                  <span className="text-[11px] font-sans px-2 py-0.5 rounded-md w-fit" style={{background:"var(--c-card)",color:"var(--c-text-muted)"}}>{d.template}</span>
                  <span className="text-xs font-sans" style={{color:"var(--c-text-dim)"}}>{d.date}</span>
                  <span className="text-xs font-sans" style={{color:"var(--c-text-muted)"}}>{d.patient}</span>
                  <span className="text-[11px] font-sans font-semibold px-2.5 py-0.5 rounded-lg w-fit" style={{color:sigC[d.signature]?.c,background:sigC[d.signature]?.bg}}>{d.signature}</span>
                  <div className="flex gap-1.5">
                    {/* Download */}
                    <button className="w-7 h-7 rounded-lg flex items-center justify-center cursor-pointer border-none transition-colors"
                      style={{background:"var(--c-card)",color:"var(--c-text-dim)"}} title="Baixar">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                    </button>
                    {/* WhatsApp */}
                    <button className="w-7 h-7 rounded-lg flex items-center justify-center cursor-pointer border-none transition-colors"
                      style={{background:"#25D36618",color:"#25D366"}} title="Enviar WhatsApp">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/></svg>
                    </button>
                    {/* Email */}
                    <button className="w-7 h-7 rounded-lg flex items-center justify-center cursor-pointer border-none transition-colors"
                      style={{background:"var(--c-blue-soft)",color:"var(--c-blue)"}} title="Enviar email">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                    </button>
                    {/* Duplicate */}
                    <button className="w-7 h-7 rounded-lg flex items-center justify-center cursor-pointer border-none transition-colors opacity-0 group-hover:opacity-100"
                      style={{background:"var(--c-card)",color:"var(--c-text-dim)"}} title="Duplicar">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── TEMPLATE CARD COMPONENT ──
function TemplateCard({t,i,isFav,usage,onSelect,onToggleFav}:{t:any;i:number;isFav:boolean;usage:number;onSelect:()=>void;onToggleFav:()=>void}) {
  return (
    <motion.div initial={{opacity:0,y:15}} animate={{opacity:1,y:0}} transition={{delay:0.1+i*0.04}}
      className="rounded-[20px] border p-6 text-left cursor-pointer transition-all duration-300 group relative"
      style={{background:"var(--c-surface)",borderColor:"var(--c-border)"}}
      onClick={onSelect}>
      {/* Fav star */}
      <button onClick={e=>{e.stopPropagation();onToggleFav();}}
        className="absolute top-4 right-4 w-7 h-7 rounded-lg flex items-center justify-center border-none cursor-pointer transition-all"
        style={{background:isFav?"var(--c-accent-soft)":"transparent",opacity:isFav?1:0}}
        onMouseEnter={e=>{if(!isFav)(e.currentTarget.style.opacity="1")}}
        onMouseLeave={e=>{if(!isFav)(e.currentTarget.style.opacity="0")}}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill={isFav?"var(--c-accent)":"none"} stroke="var(--c-accent)" strokeWidth="1.5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
      </button>
      <span className="block mb-3" style={{color:"var(--c-accent)"}}>{TEMPLATE_ICONS[(t as any).icon] || TEMPLATE_ICONS.declaracao}</span>
      <h3 className="text-base font-sans font-medium transition-colors" style={{color:"var(--c-text)"}}>{t.name}</h3>
      <p className="text-xs font-sans font-light mt-1" style={{color:"var(--c-text-dim)"}}>{t.description}</p>
      <div className="flex items-center justify-between mt-4">
        <span className="text-[10px] font-sans" style={{color:"var(--c-text-dim)"}}>Usado {usage}x</span>
        <span className="text-[11px] font-sans font-semibold opacity-0 group-hover:opacity-100 transition-opacity" style={{color:"var(--c-accent)"}}>Usar modelo →</span>
      </div>
    </motion.div>
  );
}
