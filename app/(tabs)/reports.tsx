import { router } from "expo-router";
import { useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const MOCK_REPORTS = [
  { id: "1", title: "Prevalencia Nacional Tabaco 2023", source: "ENSANUT", substanceType: "TOBACCO", year: 2023, status: "PUBLISHED" },
  { id: "2", title: "Tendencias Vapeo Jóvenes 18-24", source: "SSA", substanceType: "VAPING", year: 2023, status: "PUBLISHED" },
  { id: "3", title: "Comparativo Regional Noreste", source: "INEGI", substanceType: "BOTH", year: 2022, status: "PUBLISHED" },
  { id: "4", title: "Impacto Campaña Sin Humo 2022", source: "OPS", substanceType: "TOBACCO", year: 2022, status: "PUBLISHED" },
  { id: "5", title: "Análisis Q1 2024 (borrador)", source: "SSA", substanceType: "BOTH", year: 2024, status: "DRAFT" },
];

const TYPE_ICONS: Record<string, string> = { TOBACCO: "🚬", VAPING: "💨", BOTH: "📊" };
const TYPE_LABELS: Record<string, string> = { TOBACCO: "Tabaco", VAPING: "Vapeo", BOTH: "Ambos" };

export default function ReportsScreen() {
  const [filter, setFilter] = useState<"ALL" | "TOBACCO" | "VAPING" | "BOTH">("ALL");

  const filtered = filter === "ALL" ? MOCK_REPORTS : MOCK_REPORTS.filter((r) => r.substanceType === filter);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#0F172A" }}>
      <ScrollView contentContainerStyle={{ padding: 16 }} showsVerticalScrollIndicator={false}>

        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
          <Text style={{ color: "white", fontSize: 22, fontWeight: "800" }}>Reportes</Text>
          <Pressable
            onPress={() => router.push("/modal")}
            style={{
              backgroundColor: "#1D4ED8", borderRadius: 10,
              paddingHorizontal: 14, paddingVertical: 8,
            }}
          >
            <Text style={{ color: "white", fontSize: 13, fontWeight: "700" }}>+ Nuevo</Text>
          </Pressable>
        </View>
        <Text style={{ color: "#64748B", fontSize: 13, marginBottom: 20 }}>
          {MOCK_REPORTS.length} reportes disponibles
        </Text>

        {/* Filters */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 20 }}>
          {(["ALL", "TOBACCO", "VAPING", "BOTH"] as const).map((f) => (
            <Pressable
              key={f}
              onPress={() => setFilter(f)}
              style={{
                paddingHorizontal: 14, paddingVertical: 7, borderRadius: 20, marginRight: 8,
                backgroundColor: filter === f ? "#1D4ED8" : "#1E293B",
                borderWidth: 1, borderColor: filter === f ? "#1D4ED8" : "#334155",
              }}
            >
              <Text style={{ color: filter === f ? "white" : "#94A3B8", fontSize: 13, fontWeight: "600" }}>
                {f === "ALL" ? "Todos" : `${TYPE_ICONS[f]} ${TYPE_LABELS[f]}`}
              </Text>
            </Pressable>
          ))}
        </ScrollView>

        {/* Report cards */}
        <View style={{ gap: 10 }}>
          {filtered.map((report) => (
            <View
              key={report.id}
              style={{
                backgroundColor: "#1E293B", borderRadius: 16, padding: 18,
                borderWidth: 1, borderColor: "#334155",
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "flex-start", justifyContent: "space-between" }}>
                <View style={{ flex: 1, marginRight: 12 }}>
                  <Text style={{ color: "white", fontSize: 14, fontWeight: "700", marginBottom: 6 }}>
                    {report.title}
                  </Text>
                  <View style={{ flexDirection: "row", gap: 8, flexWrap: "wrap" }}>
                    <View style={{ backgroundColor: "#0F172A", borderRadius: 6, paddingHorizontal: 8, paddingVertical: 3 }}>
                      <Text style={{ color: "#94A3B8", fontSize: 11 }}>
                        {TYPE_ICONS[report.substanceType]} {TYPE_LABELS[report.substanceType]}
                      </Text>
                    </View>
                    <View style={{ backgroundColor: "#0F172A", borderRadius: 6, paddingHorizontal: 8, paddingVertical: 3 }}>
                      <Text style={{ color: "#94A3B8", fontSize: 11 }}>{report.source} · {report.year}</Text>
                    </View>
                  </View>
                </View>
                <View
                  style={{
                    borderRadius: 8, paddingHorizontal: 8, paddingVertical: 4,
                    backgroundColor: report.status === "PUBLISHED" ? "#022c22" : "#1c1917",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 11, fontWeight: "700",
                      color: report.status === "PUBLISHED" ? "#34D399" : "#A8A29E",
                    }}
                  >
                    {report.status === "PUBLISHED" ? "Publicado" : "Borrador"}
                  </Text>
                </View>
              </View>

              <View style={{ flexDirection: "row", gap: 8, marginTop: 14 }}>
                <Pressable
                  style={{
                    flex: 1, backgroundColor: "#0F172A", borderRadius: 10, padding: 10,
                    alignItems: "center", borderWidth: 1, borderColor: "#334155",
                  }}
                >
                  <Text style={{ color: "#94A3B8", fontSize: 13, fontWeight: "600" }}>Ver reporte</Text>
                </Pressable>
                <Pressable
                  style={{
                    flex: 1, backgroundColor: "#1D4ED8" + "22", borderRadius: 10, padding: 10,
                    alignItems: "center", borderWidth: 1, borderColor: "#1D4ED8" + "44",
                  }}
                >
                  <Text style={{ color: "#60A5FA", fontSize: 13, fontWeight: "600" }}>Exportar PDF</Text>
                </Pressable>
              </View>
            </View>
          ))}
        </View>

        <View style={{ height: 20 }} />
      </ScrollView>
    </SafeAreaView>
  );
}
