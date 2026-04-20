import { useAuth } from "@/context/AuthContext";
import { signIn } from "@/services/authService";
import { router } from "expo-router";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LoginScreen() {
  const { user } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Completa todos los campos");
      return;
    }
    try {
      setLoading(true);
      setError(null);
      await signIn(email, password);
      router.replace("/(tabs)/dashboard");
    } catch {
      setError("Correo o contraseña incorrectos");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#0A1929" }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Logo / Branding */}
          <View style={{ alignItems: "center", paddingTop: 56, paddingBottom: 48 }}>
            <View
              style={{
                width: 80, height: 80, borderRadius: 22,
                backgroundColor: "#1565C0", alignItems: "center", justifyContent: "center",
                marginBottom: 20,
                shadowColor: "#1565C0",
                shadowOffset: { width: 0, height: 8 },
                shadowOpacity: 0.5,
                shadowRadius: 20,
                elevation: 10,
              }}
            >
              <Text style={{ color: "white", fontSize: 36, fontWeight: "800", lineHeight: 44 }}>I</Text>
            </View>
            <Text style={{ color: "#FFFFFF", fontSize: 26, fontWeight: "700", letterSpacing: 2 }}>
              INTELLECTA
            </Text>
            <Text style={{ color: "#90CAF9", fontSize: 13, marginTop: 6 }}>
              Plataforma de Inteligencia en Salud Pública
            </Text>
            <Text style={{ color: "#64B5F6", fontSize: 11, marginTop: 2 }}>
              Sistema de Análisis Epidemiológico
            </Text>
          </View>

          {/* Card */}
          <View
            style={{
              marginHorizontal: 24,
              backgroundColor: "rgba(255,255,255,0.97)",
              borderRadius: 20, padding: 28,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 12 },
              shadowOpacity: 0.3,
              shadowRadius: 24,
              elevation: 12,
            }}
          >
            {error && (
              <View
                style={{
                  backgroundColor: "#FFEBEE", borderRadius: 8, padding: 12, marginBottom: 16,
                  borderWidth: 1, borderColor: "#FFCDD2",
                }}
              >
                <Text style={{ color: "#D4183D", fontSize: 13 }}>⚠ {error}</Text>
              </View>
            )}

            <Text style={{ fontSize: 13, fontWeight: "500", color: "#37474F", marginBottom: 8 }}>
              Correo institucional
            </Text>
            <TextInput
              value={email}
              onChangeText={setEmail}
              placeholder="correo@institución.gob.mx"
              placeholderTextColor="#90A4AE"
              keyboardType="email-address"
              autoCapitalize="none"
              style={{
                borderWidth: 1,
                borderColor: error ? "#D4183D" : email.length > 0 ? "#1565C0" : "#CFD8DC",
                borderRadius: 10, padding: 14,
                color: "#0A1929", fontSize: 15, backgroundColor: "#F3F3F5",
                marginBottom: 20,
              }}
            />

            <Text style={{ fontSize: 13, fontWeight: "500", color: "#37474F", marginBottom: 8 }}>
              Contraseña
            </Text>
            <TextInput
              value={password}
              onChangeText={setPassword}
              placeholder="••••••••"
              placeholderTextColor="#90A4AE"
              secureTextEntry
              style={{
                borderWidth: 1,
                borderColor: error ? "#D4183D" : password.length > 0 ? "#1565C0" : "#CFD8DC",
                borderRadius: 10, padding: 14,
                color: "#0A1929", fontSize: 15, backgroundColor: "#F3F3F5",
                marginBottom: 8,
              }}
            />

            <Pressable
              onPress={handleLogin}
              disabled={loading}
              style={({ pressed }) => ({
                backgroundColor: loading ? "#90CAF9" : pressed ? "#0D47A1" : "#1565C0",
                borderRadius: 10, padding: 16, alignItems: "center",
                marginTop: 16,
                shadowColor: "#1565C0",
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: loading ? 0 : 0.4,
                shadowRadius: 10,
                elevation: loading ? 0 : 6,
              })}
            >
              {loading ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text style={{ color: "white", fontSize: 15, fontWeight: "600" }}>
                  Acceder al Sistema
                </Text>
              )}
            </Pressable>

            <View style={{ marginTop: 24, paddingTop: 20, borderTopWidth: 1, borderTopColor: "#ECEFF1" }}>
              <Text style={{ textAlign: "center", fontSize: 11, color: "#90A4AE" }}>
                Sistema seguro · Acceso autorizado únicamente
              </Text>
            </View>
          </View>

          <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", marginTop: 28, gap: 6 }}>
            <Text style={{ color: "#90CAF9", fontSize: 14 }}>¿No tienes cuenta?</Text>
            <Pressable onPress={() => router.push("/(auth)/register")}>
              <Text style={{ color: "#64B5F6", fontSize: 14, fontWeight: "700" }}>Regístrate</Text>
            </Pressable>
          </View>

          <Text style={{ color: "#546E7A", textAlign: "center", marginTop: 24, marginBottom: 32, fontSize: 11 }}>
            © 2026 INTELLECTA · Todos los derechos reservados
          </Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
