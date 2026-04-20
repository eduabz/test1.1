import { router } from "expo-router";
import { useState } from "react";
import {
  KeyboardAvoidingView, Platform, Pressable,
  ScrollView, Text, TextInput, View, ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type SubstanceType = "TOBACCO" | "VAPING" | "BOTH";
type DataSource = "ENSANUT" | "STATIN" | "OPS" | "INEGI" | "SSA" | "OMS";

export default function NewReportModal() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [substance, setSubstance] = useState<SubstanceType>("TOBACCO");
  const [source, setSource] = useState<DataSource>("ENSANUT");
  const [year, setYear] = useState("2023");
  const [loading, setLoading] = useState(false);

  const handleCreate = async () => {
    if (!title.trim()) return;
    try {
      setLoading(true);
      await new Promise((r) => setTimeout(r, 800)); // replace with createReport()
      router.back();
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#0F172A" }}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : "height"}>

        {/* Header */}
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", padding: 16, borderBottomWidth: 1, borderBottomColor: "#1E293B" }}>
          <Pressable onPress={() => router.back()}>
            <Text style={{ color: "#94A3B8", fontSize: 15 }}>Cancelar</Text>
          </Pressable>
          <Text style={{ color: "white", fontSize: 16, fontWeight: "700" }}>Nuevo Reporte</Text>
          <Pressable onPress={handleCreate} disabled={loading || !title.trim()}>
            {loading ? (
              <ActivityIndicator color="#60A5FA" size="small" />
            ) : (
              <Text style={{ color: title.trim() ? "#60A5FA" : "#334155", fontSize: 15, fontWeight: "700" }}>
                Crear
              </Text>
            )}
          </Pressable>
        </View>

        <ScrollView contentContainerStyle={{ padding: 20 }} keyboardShouldPersistTaps="handled">

          {/* Título */}
          <Text style={{ color: "#94A3B8", fontSize: 13, fontWeight: "600", marginBottom: 6 }}>Título del reporte</Text>
          <TextInput
            value={title}
            onChangeText={setTitle}
            placeholder="Ej. Prevalencia Nacional Tabaco 2024"
            placeholderTextColor="#475569"
            style={{ backgroundColor: "#1E293B", borderRadius: 12, padding: 14, color: "white", fontSize: 15, borderWidth: 1, borderColor: "#334155", marginBottom: 20 }}
          />

          {/* Descripción */}
          <Text style={{ color: "#94A3B8", fontSize: 13, fontWeight: "600", marginBottom: 6 }}>Descripción</Text>
          <TextInput
            value={description}
            onChangeText={setDescription}
            placeholder="Objetivos y alcance del reporte..."
            placeholderTextColor="#475569"
            multiline
            numberOfLines={4}
            style={{ backgroundColor: "#1E293B", borderRadius: 12, padding: 14, color: "white", fontSize: 15, borderWidth: 1, borderColor: "#334155", marginBottom: 20, minHeight: 100, textAlignVertical: "top" }}
          />

          {/* Tipo de sustancia */}
          <Text style={{ color: "#94A3B8", fontSize: 13, fontWeight: "600", marginBottom: 10 }}>Tipo de sustancia</Text>
          <View style={{ flexDirection: "row", gap: 8, marginBottom: 20 }}>
            {(["TOBACCO", "VAPING", "BOTH"] as SubstanceType[]).map((s) => (
              <Pressable
                key={s}
                onPress={() => setSubstance(s)}
                style={{
                  flex: 1, padding: 12, borderRadius: 12, alignItems: "center",
                  backgroundColor: substance === s ? "#1D4ED8" : "#1E293B",
                  borderWidth: 1, borderColor: substance === s ? "#1D4ED8" : "#334155",
                }}
              >
                <Text style={{ fontSize: 18 }}>{s === "TOBACCO" ? "🚬" : s === "VAPING" ? "💨" : "📊"}</Text>
                <Text style={{ color: substance === s ? "white" : "#94A3B8", fontSize: 11, fontWeight: "600", marginTop: 4 }}>
                  {s === "TOBACCO" ? "Tabaco" : s === "VAPING" ? "Vapeo" : "Ambos"}
                </Text>
              </Pressable>
            ))}
          </View>

          {/* Fuente */}
          <Text style={{ color: "#94A3B8", fontSize: 13, fontWeight: "600", marginBottom: 10 }}>Fuente de datos</Text>
          <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8, marginBottom: 20 }}>
            {(["ENSANUT", "STATIN", "OPS", "INEGI", "SSA", "OMS"] as DataSource[]).map((s) => (
              <Pressable
                key={s}
                onPress={() => setSource(s)}
                style={{
                  paddingHorizontal: 14, paddingVertical: 8, borderRadius: 10,
                  backgroundColor: source === s ? "#1D4ED8" : "#1E293B",
                  borderWidth: 1, borderColor: source === s ? "#1D4ED8" : "#334155",
                }}
              >
                <Text style={{ color: source === s ? "white" : "#94A3B8", fontSize: 13, fontWeight: "600" }}>{s}</Text>
              </Pressable>
            ))}
          </View>

          {/* Año */}
          <Text style={{ color: "#94A3B8", fontSize: 13, fontWeight: "600", marginBottom: 6 }}>Año de referencia</Text>
          <TextInput
            value={year}
            onChangeText={setYear}
            placeholder="2023"
            placeholderTextColor="#475569"
            keyboardType="number-pad"
            maxLength={4}
            style={{ backgroundColor: "#1E293B", borderRadius: 12, padding: 14, color: "white", fontSize: 15, borderWidth: 1, borderColor: "#334155", marginBottom: 32 }}
          />

          <Pressable
            onPress={handleCreate}
            disabled={loading || !title.trim()}
            style={{
              backgroundColor: title.trim() ? "#1D4ED8" : "#1E293B",
              borderRadius: 14, padding: 16, alignItems: "center",
              opacity: loading ? 0.7 : 1,
            }}
          >
            {loading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text style={{ color: title.trim() ? "white" : "#475569", fontSize: 16, fontWeight: "700" }}>
                Crear reporte
              </Text>
            )}
          </Pressable>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
