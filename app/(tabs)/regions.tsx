import { useState } from "react";
import { ScrollView, Text, View, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const REGIONS = [
  { name: "Ciudad de México", prevalence: 24.8, change: -1.2, cases: 2340000, level: "HIGH" },
  { name: "Jalisco", prevalence: 22.1, change: -0.8, cases: 1820000, level: "HIGH" },
  { name: "Nuevo León", prevalence: 21.4, change: -1.0, cases: 1150000, level: "HIGH" },
  { name: "Estado de México", prevalence: 19.7, change: -0.5, cases: 3120000, level: "MEDIUM" },
  { name: "Veracruz", prevalence: 18.3, change: -0.3, cases: 1430000, level: "MEDIUM" },
  { name: "Guanajuato", prevalence: 17.9, change: +0.2, cases: 1080000, level: "MEDIUM" },
  { name: "Puebla", prevalence: 16.5, change: -0.7, cases: 980000, level: "MEDIUM" },
  { name: "Chihuahua", prevalence: 15.8, change: -1.1, cases: 610000, level: "LOW" },
  { name: "Oaxaca", prevalence: 12.3, change: -0.4, cases: 490000, level: "LOW" },
  { name: "Chiapas", prevalence: 10.1, change: -0.2, cases: 540000, level: "LOW" },
];

const LEVEL_COLORS: Record<string, string> = {
  HIGH: "#EF4444",
  MEDIUM: "#F59E0B",
  LOW: "#10B981",
};

const LEVEL_LABELS: Record<string, string> = {
  HIGH: "Alto",
  MEDIUM: "Medio",
  LOW: "Bajo",
};

type SortKey = "prevalence" | "cases" | "name";

export default function RegionsScreen() {
  const [sort, setSort] = useState<SortKey>("prevalence");

  const sorted = [...REGIONS].sort((a, b) => {
    if (sort === "name") return a.name.localeCompare(b.name);
    return b[sort] - a[sort];
  });

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#0F172A" }}>
      <ScrollView contentContainerStyle={{ padding: 16 }} showsVerticalScrollIndicator={false}>

        <Text style={{ color: "white", fontSize: 22, fontWeight: "800", marginBottom: 4 }}>Regiones</Text>
        <Text style={{ color: "#64748B", fontSize: 13, marginBottom: 20 }}>
          Prevalencia por estado · 2023
        </Text>

        {/* Summary chips */}
        <View style={{ flexDirection: "row", gap: 10, marginBottom: 20 }}>
          {[
            { label: "Riesgo alto", count: 3, color: "#EF4444", bg: "#450a0a" },
            { label: "Riesgo medio", count: 4, color: "#F59E0B", bg: "#451a03" },
            { label: "Riesgo bajo", count: 3, color: "#10B981", bg: "#022c22" },
          ].map((chip) => (
            <View
              key={chip.label}
              style={{
                flex: 1, backgroundColor: chip.bg, borderRadius: 12, padding: 12, alignItems: "center",
              }}
            >
              <Text style={{ color: chip.color, fontSize: 20, fontWeight: "800" }}>{chip.count}</Text>
              <Text style={{ color: chip.color, fontSize: 10, fontWeight: "600", textAlign: "center", marginTop: 2 }}>
                {chip.label}
              </Text>
            </View>
          ))}
        </View>

        {/* Sort options */}
        <View style={{ flexDirection: "row", gap: 8, marginBottom: 16 }}>
          {(["prevalence", "cases", "name"] as SortKey[]).map((key) => (
            <Pressable
              key={key}
              onPress={() => setSort(key)}
              style={{
                paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8,
                backgroundColor: sort === key ? "#1D4ED8" : "#1E293B",
                borderWidth: 1, borderColor: sort === key ? "#1D4ED8" : "#334155",
              }}
            >
              <Text style={{ color: sort === key ? "white" : "#94A3B8", fontSize: 12, fontWeight: "600" }}>
                {key === "prevalence" ? "% Prevalencia" : key === "cases" ? "Casos" : "A–Z"}
              </Text>
            </Pressable>
          ))}
        </View>

        {/* Table */}
        <View style={{ backgroundColor: "#1E293B", borderRadius: 16, overflow: "hidden", borderWidth: 1, borderColor: "#334155" }}>
          {sorted.map((region, i) => (
            <View
              key={region.name}
              style={{
                padding: 16, borderBottomWidth: i < sorted.length - 1 ? 1 : 0,
                borderBottomColor: "#334155",
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 8 }}>
                <View
                  style={{
                    width: 8, height: 8, borderRadius: 4,
                    backgroundColor: LEVEL_COLORS[region.level], marginRight: 8,
                  }}
                />
                <Text style={{ color: "white", fontSize: 14, fontWeight: "600", flex: 1 }}>
                  {region.name}
                </Text>
                <View
                  style={{
                    backgroundColor: LEVEL_COLORS[region.level] + "22",
                    borderRadius: 6, paddingHorizontal: 8, paddingVertical: 2,
                  }}
                >
                  <Text style={{ color: LEVEL_COLORS[region.level], fontSize: 11, fontWeight: "700" }}>
                    {LEVEL_LABELS[region.level]}
                  </Text>
                </View>
              </View>

              <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <View>
                  <Text style={{ color: "#64748B", fontSize: 11 }}>Prevalencia</Text>
                  <Text style={{ color: "white", fontSize: 16, fontWeight: "700" }}>
                    {region.prevalence}%
                  </Text>
                </View>
                <View style={{ alignItems: "center" }}>
                  <Text style={{ color: "#64748B", fontSize: 11 }}>Cambio</Text>
                  <Text
                    style={{
                      fontSize: 14, fontWeight: "700",
                      color: region.change < 0 ? "#34D399" : "#F87171",
                    }}
                  >
                    {region.change > 0 ? "▲" : "▼"} {Math.abs(region.change)}%
                  </Text>
                </View>
                <View style={{ alignItems: "flex-end" }}>
                  <Text style={{ color: "#64748B", fontSize: 11 }}>Casos est.</Text>
                  <Text style={{ color: "white", fontSize: 14, fontWeight: "600" }}>
                    {(region.cases / 1000000).toFixed(1)}M
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </View>

        <View style={{ height: 20 }} />
      </ScrollView>
    </SafeAreaView>
  );
}
