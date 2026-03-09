import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Presença — Plataforma para Psicoterapeutas",
  description: "Gestão clínica, agendamento e comunidade para psicoterapeutas.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
