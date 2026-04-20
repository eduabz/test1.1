import { Pressable, Text, View } from "react-native";

// ── StatCard ──────────────────────────────────────────────
type StatCardProps = {
  icon: string;
  label: string;
  value: string;
  change?: string;
  positive?: boolean;
  onPress?: () => void;
};

export function StatCard({ icon, label, value, change, positive, onPress }: StatCardProps) {
  const Wrapper = onPress ? Pressable : View;
  return (
    <Wrapper
      onPress={onPress}
      style={{
        backgroundColor: "#1E293B",
        borderRadius: 16,
        padding: 16,
        borderWidth: 1,
        borderColor: "#334155",
        flex: 1,
      }}
    >
      <Text style={{ fontSize: 22 }}>{icon}</Text>
      <Text style={{ color: "#64748B", fontSize: 11, fontWeight: "600", marginTop: 10, letterSpacing: 0.5 }}>
        {label.toUpperCase()}
      </Text>
      <Text style={{ color: "#F1F5F9", fontSize: 24, fontWeight: "800", marginTop: 2 }}>{value}</Text>
      {change !== undefined && (
        <Text
          style={{
            fontSize: 12,
            fontWeight: "600",
            marginTop: 4,
            color: positive ? "#34D399" : "#F87171",
          }}
        >
          {positive ? "▲" : "▼"} {change}
        </Text>
      )}
    </Wrapper>
  );
}

// ── ReportCard ────────────────────────────────────────────
type ReportCardProps = {
  title: string;
  source: string;
  year: number;
  substanceIcon: string;
  status: "PUBLISHED" | "DRAFT";
  onView?: () => void;
  onExport?: () => void;
};

export function ReportCard({ title, source, year, substanceIcon, status, onView, onExport }: ReportCardProps) {
  return (
    <View
      style={{
        backgroundColor: "#1E293B",
        borderRadius: 16,
        padding: 18,
        borderWidth: 1,
        borderColor: "#334155",
      }}
    >
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
        <Text style={{ color: "#F1F5F9", fontSize: 14, fontWeight: "700", flex: 1, marginRight: 10 }}>
          {title}
        </Text>
        <View
          style={{
            backgroundColor: status === "PUBLISHED" ? "#022c22" : "#1c1917",
            borderRadius: 8,
            paddingHorizontal: 8,
            paddingVertical: 3,
          }}
        >
          <Text
            style={{
              fontSize: 11,
              fontWeight: "700",
              color: status === "PUBLISHED" ? "#34D399" : "#A8A29E",
            }}
          >
            {status === "PUBLISHED" ? "Publicado" : "Borrador"}
          </Text>
        </View>
      </View>

      <Text style={{ color: "#64748B", fontSize: 12, marginBottom: 14 }}>
        {substanceIcon}  {source} · {year}
      </Text>

      <View style={{ flexDirection: "row", gap: 8 }}>
        <Pressable
          onPress={onView}
          style={{
            flex: 1,
            backgroundColor: "#0F172A",
            borderRadius: 10,
            padding: 10,
            alignItems: "center",
            borderWidth: 1,
            borderColor: "#334155",
          }}
        >
          <Text style={{ color: "#94A3B8", fontSize: 13, fontWeight: "600" }}>Ver reporte</Text>
        </Pressable>
        <Pressable
          onPress={onExport}
          style={{
            flex: 1,
            backgroundColor: "#1D4ED822",
            borderRadius: 10,
            padding: 10,
            alignItems: "center",
            borderWidth: 1,
            borderColor: "#1D4ED844",
          }}
        >
          <Text style={{ color: "#60A5FA", fontSize: 13, fontWeight: "600" }}>Exportar PDF</Text>
        </Pressable>
      </View>
    </View>
  );
}

// ── AlertCard ─────────────────────────────────────────────
type AlertSeverity = "CRITICAL" | "HIGH" | "MEDIUM" | "LOW";

const SEVERITY: Record<AlertSeverity, { color: string; bg: string; icon: string; label: string }> = {
  CRITICAL: { color: "#F87171", bg: "#450a0a", icon: "🚨", label: "Crítica"  },
  HIGH:     { color: "#FB923C", bg: "#431407", icon: "⚠️", label: "Alta"     },
  MEDIUM:   { color: "#FBBF24", bg: "#451a03", icon: "📢", label: "Media"    },
  LOW:      { color: "#34D399", bg: "#022c22", icon: "ℹ️", label: "Baja"     },
};

type AlertCardProps = {
  title: string;
  description: string;
  severity: AlertSeverity;
  region: string;
  date: string;
  read?: boolean;
  onMarkRead?: () => void;
};

export function AlertCard({ title, description, severity, region, date, read = false, onMarkRead }: AlertCardProps) {
  const cfg = SEVERITY[severity];
  return (
    <View
      style={{
        backgroundColor: "#1E293B",
        borderRadius: 16,
        padding: 16,
        borderWidth: 1,
        borderColor: read ? "#334155" : cfg.color + "44",
        opacity: read ? 0.7 : 1,
      }}
    >
      <View style={{ flexDirection: "row", gap: 12, alignItems: "flex-start" }}>
        <View
          style={{
            width: 36,
            height: 36,
            borderRadius: 10,
            backgroundColor: cfg.bg,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={{ fontSize: 16 }}>{cfg.icon}</Text>
        </View>

        <View style={{ flex: 1 }}>
          <View
            style={{
              backgroundColor: cfg.bg,
              borderRadius: 6,
              paddingHorizontal: 8,
              paddingVertical: 2,
              alignSelf: "flex-start",
              marginBottom: 6,
            }}
          >
            <Text style={{ color: cfg.color, fontSize: 11, fontWeight: "700" }}>{cfg.label}</Text>
          </View>

          <Text style={{ color: "#F1F5F9", fontSize: 14, fontWeight: "700", marginBottom: 4 }}>
            {title}
          </Text>
          <Text style={{ color: "#94A3B8", fontSize: 12, lineHeight: 18, marginBottom: 10 }}>
            {description}
          </Text>

          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
            <Text style={{ color: "#475569", fontSize: 11 }}>📍 {region} · {date}</Text>
            {!read && onMarkRead && (
              <Pressable onPress={onMarkRead}>
                <Text style={{ color: "#60A5FA", fontSize: 12, fontWeight: "600" }}>Marcar leída</Text>
              </Pressable>
            )}
          </View>
        </View>
      </View>
    </View>
  );
}
