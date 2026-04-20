import { useState } from "react";
import { ScrollView, Text, View, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { SubstanceType } from "@/types/Report";

type FilterChipProps = {
  label: string;
  active: boolean;
  onPress: () => void;
};

function FilterChip({ label, active, onPress }: FilterChipProps) {
  return (
    <Pressable
      onPress={onPress}
      style={{
        paddingHorizontal: 14, paddingVertical: 7, borderRadius: 20,
        backgroundColor: active ? "#1D4ED8" : "#1E293B",
        borderWidth: 1, borderColor: active ? "#1D4ED8" : "#334155",
        marginRight: 8,
      }}
    >
      <Text style={{ color: active ? "white" : "#94A3B8", fontSize: 13, fontWeight: "600" }}>
        {label}
      </Text>
    </Pressable>
  );
}

// Mock trend data
const TREND_DATA = {
  TOBACCO: [
    { year: 2018, value: 23.1 }, { year: 2019, value: 22.4 }, { year: 2020, value: 21.8 },
    { year: 2021, value: 21.2 }, { year: 2022, value: 21.0 }, { year: 2023, value: 20.4 },
  ],
  VAPING: [
    { year: 2018, value: 3.2 }, { year: 2019, value: 4.5 }, { year: 2020, value: 5.1 },
    { year: 2021, value: 6.3 }, { year: 2022, value: 7.8 }, { year: 2023, value: 8.7 },
  ],
  BOTH: [
    { year: 2018, value: 26.3 }, { year: 2019, value: 26.9 }, { year: 2020, value: 26.9 },
    { year: 2021, value: 27.5 }, { year: 2022, value: 28.8 }, { year: 2023, value: 29.1 },
  ],
};

function TrendBar({ value, maxValue, year }: { value: number; maxValue: number; year: number }) {
  const pct = (value / maxValue) * 100;
  return (
    <View style={{ alignItems: "center", flex: 1 }}>
      <Text style={{ color: "#60A5FA", fontSize: 10, fontWeight: "700", marginBottom: 4 }}>
        {value}%
      </Text>
      <View style={{ width: 28, height: 100, backgroundColor: "#1E293B", borderRadius: 6, justifyContent: "flex-end", overflow: "hidden" }}>
        <View style={{ width: "100%", height: `${pct}%`, backgroundColor: "#1D4ED8", borderRadius: 6 }} />
      </View>
      <Text style={{ color: "#64748B", fontSize: 10, marginTop: 4 }}>{year}</Text>
    </View>
  );
}

export default function AnalyticsScreen() {
  const [substance, setSubstance] = useState<SubstanceType>("TOBACCO");

  const data = TREND_DATA[substance];
  const maxValue = Math.max(...data.map((d) => d.value)) * 1.2;
  const lastPoint = data[data.length - 1];
  const prevPoint = data[data.length - 2];
  const change = (lastPoint.value - prevPoint.value).toFixed(1);
  const isDown = parseFloat(change) < 0;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#0F172A" }}>
      <ScrollView contentContainerStyle={{ padding: 16 }} showsVerticalScrollIndicator={false}>

        <Text style={{ color: "white", fontSize: 22, fontWeight: "800", marginBottom: 4 }}>Análisis</Text>
        <Text style={{ color: "#64748B", fontSize: 13, marginBottom: 20 }}>
          Tendencias históricas de prevalencia
        </Text>

        {/* Filtros sustancia */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 20 }}>
          <FilterChip label="🚬 Tabaco" active={substance === "TOBACCO"} onPress={() => setSubstance("TOBACCO")} />
          <FilterChip label="💨 Vapeo" active={substance === "VAPING"} onPress={() => setSubstance("VAPING")} />
          <FilterChip label="📊 Ambos" active={substance === "BOTH"} onPress={() => setSubstance("BOTH")} />
        </ScrollView>

        {/* KPI card */}
        <View style={{ backgroundColor: "#1E293B", borderRadius: 16, padding: 20, marginBottom: 20, borderWidth: 1, borderColor: "#334155" }}>
          <Text style={{ color: "#94A3B8", fontSize: 12, fontWeight: "600" }}>PREVALENCIA {lastPoint.year}</Text>
          <Text style={{ color: "white", fontSize: 36, fontWeight: "800", marginTop: 4 }}>
            {lastPoint.value}%
          </Text>
          <Text style={{ color: isDown ? "#34D399" : "#F87171", fontSize: 13, fontWeight: "600", marginTop: 4 }}>
            {isDown ? "▼" : "▲"} {Math.abs(parseFloat(change))}% vs {prevPoint.year}
          </Text>
          <Text style={{ color: "#475569", fontSize: 11, marginTop: 8 }}>Fuente: ENSANUT · Nacional</Text>
        </View>

        {/* Bar chart */}
        <View style={{ backgroundColor: "#1E293B", borderRadius: 16, padding: 20, borderWidth: 1, borderColor: "#334155" }}>
          <Text style={{ color: "white", fontSize: 15, fontWeight: "700", marginBottom: 20 }}>
            Tendencia 2018–2023
          </Text>
          <View style={{ flexDirection: "row", alignItems: "flex-end", gap: 4 }}>
            {data.map((d) => (
              <TrendBar key={d.year} value={d.value} maxValue={maxValue} year={d.year} />
            ))}
          </View>
        </View>

        {/* Demographic table */}
        <Text style={{ color: "white", fontSize: 16, fontWeight: "700", marginTop: 24, marginBottom: 12 }}>
          Distribución por grupo de edad
        </Text>
        <View style={{ backgroundColor: "#1E293B", borderRadius: 16, overflow: "hidden", borderWidth: 1, borderColor: "#334155" }}>
          {[
            { age: "12–17 años", male: 8.2, female: 5.1 },
            { age: "18–24 años", male: 28.4, female: 16.3 },
            { age: "25–34 años", male: 32.1, female: 18.7 },
            { age: "35–44 años", male: 30.5, female: 14.2 },
            { age: "45–59 años", male: 25.8, female: 10.9 },
            { age: "60+ años", male: 18.3, female: 7.4 },
          ].map((row, i) => (
            <View
              key={row.age}
              style={{
                flexDirection: "row", padding: 14,
                borderBottomWidth: i < 5 ? 1 : 0, borderBottomColor: "#334155",
              }}
            >
              <Text style={{ color: "#CBD5E1", fontSize: 13, flex: 1 }}>{row.age}</Text>
              <Text style={{ color: "#60A5FA", fontSize: 13, width: 60, textAlign: "right" }}>
                ♂ {row.male}%
              </Text>
              <Text style={{ color: "#F9A8D4", fontSize: 13, width: 60, textAlign: "right" }}>
                ♀ {row.female}%
              </Text>
            </View>
          ))}
        </View>

        <View style={{ height: 20 }} />
      </ScrollView>
    </SafeAreaView>
  );
}
