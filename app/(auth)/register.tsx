import { register } from "@/services/authService";
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

export default function RegisterScreen() {
  const [fullName, setFullName] = useState("");
  const [institution, setInstitution] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleRegister = async () => {
    if (!fullName || !institution || !email || !password || !confirmPassword) {
      setError("Completa todos los campos");
      return;
    }
    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }
    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      await register({ email, password, fullName, institution, firebaseUuid: "" });
      router.replace("/(tabs)/dashboard");
    } catch (e: any) {
      if (e?.code === "auth/email-already-in-use") {
        setError("Este correo ya está registrado");
      } else if (e?.code === "auth/invalid-email") {
        setError("Correo inválido");
      } else {
        setError("Error al crear la cuenta. Intenta de nuevo.");
      }
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = (value: string, hasError = false) => ({
    borderWidth: 1,
    borderColor: hasError ? "#D4183D" : value.length > 0 ? "#1565C0" : "#CFD8DC",
    borderRadius: 10,
    padding: 14,
    fontSize: 15,
    color: "#0A1929" as const,
    backgroundColor: "#F3F3F5" as const,
    marginBottom: 20,
  });

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#0A1929" }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, paddingVertical: 24 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Back */}
          <Pressable
            onPress={() => router.back()}
            style={{ flexDirection: "row", alignItems: "center", gap: 6, marginBottom: 20, paddingHorizontal: 24 }}
          >
            <Text style={{ fontSize: 18, color: "#90CAF9" }}>←</Text>
            <Text style={{ color: "#90CAF9", fontSize: 14, fontWeight: "600" }}>Volver</Text>
          </Pressable>

          {/* Title */}
          <View style={{ paddingHorizontal: 24, marginBottom: 24 }}>
            <Text style={{ fontSize: 26, fontWeight: "700", color: "#FFFFFF", marginBottom: 4 }}>
              Registro de acceso
            </Text>
            <Text style={{ fontSize: 13, color: "#90CAF9" }}>
              Solo personal autorizado por la institución
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
              Nombre completo
            </Text>
            <TextInput
              value={fullName}
              onChangeText={setFullName}
              placeholder="Dr. Juan Pérez López"
              placeholderTextColor="#90A4AE"
              style={inputStyle(fullName)}
            />

            <Text style={{ fontSize: 13, fontWeight: "500", color: "#37474F", marginBottom: 8 }}>
              Institución
            </Text>
            <TextInput
              value={institution}
              onChangeText={setInstitution}
              placeholder="CONADIC / SSA / IMSS"
              placeholderTextColor="#90A4AE"
              style={inputStyle(institution)}
            />

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
              style={inputStyle(email)}
            />

            <Text style={{ fontSize: 13, fontWeight: "500", color: "#37474F", marginBottom: 8 }}>
              Contraseña
            </Text>
            <TextInput
              value={password}
              onChangeText={setPassword}
              placeholder="Mínimo 6 caracteres"
              placeholderTextColor="#90A4AE"
              secureTextEntry
              style={inputStyle(password)}
            />

            <Text style={{ fontSize: 13, fontWeight: "500", color: "#37474F", marginBottom: 8 }}>
              Confirmar contraseña
            </Text>
            <TextInput
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              placeholder="Repite tu contraseña"
              placeholderTextColor="#90A4AE"
              secureTextEntry
              style={{
                ...inputStyle(confirmPassword),
                borderColor: confirmPassword.length > 0 && password !== confirmPassword
                  ? "#D4183D"
                  : confirmPassword.length > 0 && password === confirmPassword
                  ? "#2E7D32"
                  : "#CFD8DC",
              }}
            />

            <Pressable
              onPress={handleRegister}
              disabled={loading}
              style={({ pressed }) => ({
                backgroundColor: loading ? "#90CAF9" : pressed ? "#0D47A1" : "#1565C0",
                borderRadius: 10, padding: 16, alignItems: "center",
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
                  Crear cuenta
                </Text>
              )}
            </Pressable>
          </View>

          <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", marginTop: 28, gap: 6 }}>
            <Text style={{ color: "#90CAF9", fontSize: 14 }}>¿Ya tienes cuenta?</Text>
            <Pressable onPress={() => router.back()}>
              <Text style={{ color: "#64B5F6", fontSize: 14, fontWeight: "700" }}>Inicia sesión</Text>
            </Pressable>
          </View>

          <Text style={{ color: "#546E7A", textAlign: "center", marginTop: 24, marginBottom: 16, fontSize: 11 }}>
            © 2026 INTELLECTA · Todos los derechos reservados
          </Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
