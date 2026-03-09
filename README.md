# Presença — Plataforma para Psicoterapeutas

Protótipo de apresentação com Next.js 14, Tailwind CSS e Framer Motion.

## Setup rápido

```bash
# 1. Instalar dependências
npm install

# 2. Rodar em desenvolvimento
npm run dev
```

Acesse **http://localhost:3000**

## Estrutura

```
presenca/
├── app/
│   ├── globals.css          # CSS global + fontes
│   ├── layout.tsx           # Layout raiz
│   └── page.tsx             # Página principal
├── components/
│   ├── AppShell.tsx         # Shell com sidebar + routing
│   ├── Sidebar.tsx          # Sidebar com ícones e navegação
│   ├── DashboardPage.tsx    # Painel — sessões, financeiro, tarefas
│   ├── ClientesPage.tsx     # Clientes — listagem, espera, grupos, ficha
│   ├── AgendaPage.tsx       # Agenda — semana/dia
│   ├── FinanceiroPage.tsx   # Financeiro — painel, receitas, gráficos
│   ├── RelatoriosPage.tsx   # Relatórios — analytics, gráficos
│   ├── ComunidadePage.tsx   # Comunidade — feed, calendário, intervisão
│   ├── ProfilePage.tsx      # Marketing — perfil público + agendamento
│   ├── PlaceholderPage.tsx  # Placeholder para páginas futuras
│   └── ui.tsx               # Componentes compartilhados
├── lib/
│   ├── mockData.ts          # Dados mock
│   └── tokens.ts            # Cores e mapas de tipos
└── tailwind.config.ts       # Theme customizado
```

## Páginas disponíveis

- **Painel** — Dashboard com sessões do dia, financeiro rápido, pendências, tarefas, aniversariantes
- **Clientes** — Listagem com status, lista de espera, grupos, ficha completa do paciente com sessões
- **Agenda** — Calendário semanal (grid) e visão diária (lista expandível com ações)
- **Financeiro** — Painel com cards, gráfico de receitas/despesas, movimentações
- **Relatórios** — Analytics: gênero, faixa etária, volume de sessões, métricas-chave
- **Comunidade** — Feed social, calendário global de atividades, intervisão entre pares
- **Marketing** — Perfil público da terapeuta com widget de agendamento
- **Configurações** — Placeholder (próxima fase)

## Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS 3
- Framer Motion 11

## Identidade visual

- **Tema:** Dark editorial — fundo quase-preto com dourado como acento
- **Tipografia:** Instrument Serif (títulos em itálico) + Outfit (corpo)
- **Atmosfera:** Grain overlay, orbs flutuantes, micro-animações

## Próximas páginas (a fazer)

- Configurações (conta, integrações, LGPD)
- Minha Clínica (salas, profissionais, repasses)
- Prontuário completo com editor WYSIWYG
- Grupos terapêuticos (gestão detalhada)
"# ecxyo-ferramenta-terapeutas" 
