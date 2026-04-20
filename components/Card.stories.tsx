import type { Meta, StoryObj } from "@storybook/react-native";
import { View } from "react-native";
import { AlertCard, ReportCard, StatCard } from "./Card";

const meta: Meta = {
  title: "Componentes/Card",
  component: StatCard,
};

export default meta;

// ── StatCard ──────────────────────────────────────────────

export const StatTabaco: StoryObj = {
  render: () => (
    <StatCard
      icon="🚬"
      label="Prevalencia tabaco"
      value="20.4%"
      change="1.2% vs 2022"
      positive={false}
    />
  ),
};

export const StatVapeo: StoryObj = {
  render: () => (
    <StatCard
      icon="💨"
      label="Prevalencia vapeo"
      value="8.7%"
      change="2.3% vs 2022"
      positive={false}
    />
  ),
};

export const StatPositivo: StoryObj = {
  render: () => (
    <StatCard
      icon="📣"
      label="Campañas activas"
      value="12"
      change="3 nuevas"
      positive={true}
    />
  ),
};

export const StatSinCambio: StoryObj = {
  render: () => (
    <StatCard icon="📋" label="Reportes generados" value="47" />
  ),
};

export const StatGrid: StoryObj = {
  render: () => (
    <View style={{ gap: 10 }}>
      <View style={{ flexDirection: "row", gap: 10 }}>
        <StatCard icon="🚬" label="Tabaco" value="20.4%" change="1.2%" positive={false} />
        <StatCard icon="💨" label="Vapeo"  value="8.7%"  change="2.3%" positive={false} />
      </View>
      <View style={{ flexDirection: "row", gap: 10 }}>
        <StatCard icon="📣" label="Campañas" value="12" change="3 nuevas" positive={true} />
        <StatCard icon="📋" label="Reportes" value="47" change="8 más"    positive={true} />
      </View>
    </View>
  ),
};

// ── ReportCard ────────────────────────────────────────────

export const ReportePublicado: StoryObj = {
  render: () => (
    <ReportCard
      title="Prevalencia Nacional Tabaco 2023"
      source="ENSANUT"
      year={2023}
      substanceIcon="🚬"
      status="PUBLISHED"
      onView={() => {}}
      onExport={() => {}}
    />
  ),
};

export const ReporteBorrador: StoryObj = {
  render: () => (
    <ReportCard
      title="Análisis Q1 2024 — Vapeo juvenil (borrador)"
      source="SSA"
      year={2024}
      substanceIcon="💨"
      status="DRAFT"
      onView={() => {}}
      onExport={() => {}}
    />
  ),
};

// ── AlertCard ─────────────────────────────────────────────

export const AlertaCritica: StoryObj = {
  render: () => (
    <AlertCard
      title="Aumento atípico en vapeo juvenil"
      description="Se detectó un incremento del 15% en el grupo 12–17 años en Jalisco durante Q1 2024."
      severity="CRITICAL"
      region="Jalisco"
      date="2024-04-10"
      read={false}
      onMarkRead={() => {}}
    />
  ),
};

export const AlertaAlta: StoryObj = {
  render: () => (
    <AlertCard
      title="Nueva fuente de datos disponible"
      description="ENSANUT 2024 publicó datos preliminares. Se recomienda actualizar los dashboards."
      severity="HIGH"
      region="Nacional"
      date="2024-04-08"
      read={false}
      onMarkRead={() => {}}
    />
  ),
};

export const AlertaMedia: StoryObj = {
  render: () => (
    <AlertCard
      title="Discrepancia en datos de Veracruz"
      description="Los datos de SSA y STATIN muestran diferencias significativas para el periodo 2023."
      severity="MEDIUM"
      region="Veracruz"
      date="2024-04-03"
      read={false}
      onMarkRead={() => {}}
    />
  ),
};

export const AlertaLeida: StoryObj = {
  render: () => (
    <AlertCard
      title="Campaña Sin Tabaco alcanzó meta"
      description="La campaña en CDMX superó el 80% de alcance esperado."
      severity="LOW"
      region="CDMX"
      date="2024-04-05"
      read={true}
    />
  ),
};
