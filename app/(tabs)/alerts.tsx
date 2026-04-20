import { useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AlertSeverity } from "@/types/Alert";

const MOCK_ALERTS = [
  { id: "1", title: "Aumento atípico en vapeo juvenil", description: "Se detectó un incremento del 15% en el uso de vapeo en el grupo 12–17 años en Jalisco durante Q1 2024.", severity: "CRITICAL" as AlertSeverity, region: "Jalisco", createdAt: "2024-04-10", read: false },
  { id: "2", title: "Nueva fuente de datos disponible", description: "ENSANUT 2024 publicó datos preliminares. Se recomienda actualizar los dashboards regionales.", severity: "HIGH" as AlertSeverity, region: "Nacional", createdAt: "2024-04-08", read: false },
  { id: "3", title: "Campaña Sin Tabaco alcanzó meta", description: "La campaña en CDMX superó el 80% de alcance esperado. Se sugiere extender a Guadalajara.", severity: "LOW" as AlertSeverity, region: "CDMX", createdAt: "2024-04-05", read: true },
  { id: "4", title: "Discrepancia en datos de Veracruz", description: "Los datos de SSA y STATIN muestran diferencias significativas para el periodo 2023. Requiere revisión.", severity: "MEDIUM" as AlertSeverity, region: "Veracruz", createdAt: "2024-04-03", read: true },
];

const SEVERITY_CONFIG: Record<AlertSeverity, { color: string; bg: string; label: string; icon: string }> = {
  CRITICAL: { color: "#F87171", bg: "#450a0a", label: "Crítica", icon: "🚨" },
  HIGH:     { color: "#FB923C", bg: "#431407", label: "Alta",    icon: "⚠️" },
  MEDIUM:   { color: "#FBBF24", bg: "#451a03", label: "Media",   icon: "📢" },
  LOW:      { color: "#34D399", bg: "#022c22", label: "Baja",    icon: "ℹ️" },
};

export default function AlertsScreen() {
  const [alerts, setAlerts] = useState(MOCK_ALERTS);
  const unread = alerts.filter((a) => !a.read).length;

  const markRead = (id: string) => {
    setAlerts((prev) => prev.map((a) => (a.id === id ? { ...a, read: true } : a)));
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#0F172A" }}>
      <ScrollView contentContainerStyle={{ padding: 16 }} showsVerticalScrollIndicator={false}>

        <View style={{ flexDirection: "row", alignItems: "center", gap: 10, marginBottom: 4 }}>
          <Text style={{ color: "white", fontSize: 22, fontWeight: "800" }}>Alertas</Text>
          {unread > 0 && (
            <View style={{ backgroundColor: "#EF4444", borderRadius: 10, paddingHorizontal: 8, paddingVertical: 2 }}>
              <Text style={{ color: "white", fontSize: 12, fontWeight: "800" }}>{unread}</Text>
            </View>
          )}
        </View>
        <Text style={{ color: "#64748B", fontSize: 13, marginBottom: 20 }}>
          {unread > 0 ? `${unread} alertas sin leer` : "Todo al día"}
        </Text>

        <View style={{ gap: 12 }}>
          {alerts.map((alert) => {
            const cfg = SEVERITY_CONFIG[alert.severity];
            return (
              <View
                key={alert.id}
                style={{
                  backgroundColor: "#1E293B", borderRadius: 16, padding: 18,
                  borderWidth: 1,
                  borderColor: alert.read ? "#334155" : cfg.color + "44",
                  opacity: alert.read ? 0.7 : 1,
                }}
              >
                <View style={{ flexDirection: "row", alignItems: "flex-start", gap: 12 }}>
                  <View
                    style={{
                      width: 36, height: 36, borderRadius: 10,
                      backgroundColor: cfg.bg, alignItems: "center", justifyContent: "center",
                    }}
                  >
                    <Text style={{ fontSize: 16 }}>{cfg.icon}</Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
                      <View
                        style={{
                          backgroundColor: cfg.bg, borderRadius: 6,
                          paddingHorizontal: 8, paddingVertical: 2,
                        }}
                      >
                        <Text style={{ color: cfg.color, fontSize: 11, fontWeight: "700" }}>
                          {cfg.label}
                        </Text>
                      </View>
                      {!alert.read && (
                        <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: cfg.color }} />
                      )}
                    </View>
                    <Text style={{ color: "white", fontSize: 14, fontWeight: "700", marginBottom: 6 }}>
                      {alert.title}
                    </Text>
                    <Text style={{ color: "#94A3B8", fontSize: 12, lineHeight: 18, marginBottom: 10 }}>
                      {alert.description}
                    </Text>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                      <Text style={{ color: "#475569", fontSize: 11 }}>
                        📍 {alert.region} · {alert.createdAt}
                      </Text>
                      {!alert.read && (
                        <Pressable onPress={() => markRead(alert.id)}>
                          <Text style={{ color: "#60A5FA", fontSize: 12, fontWeight: "600" }}>
                            Marcar leída
                          </Text>
                        </Pressable>
                      )}
                    </View>
                  </View>
                </View>
              </View>
            );
          })}
        </View>

        <View style={{ height: 20 }} />
      </ScrollView>
    </SafeAreaView>
  );
}
