import { useAuth } from "@/context/AuthContext";
import { signOut } from "@/services/authService";
import { router } from "expo-router";
import { ScrollView, Text, View, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type StatCardProps = {
  label: string;
  value: string;
  change: string;
  positive: boolean;
  icon: string;
};

const CARD_COLORS = {
  blue:   { bg: "#E3F2FD", bgEnd: "#BBDEFB", value: "#0D47A1", label: "#37474F", trend: "#1565C0", border: "#90CAF9" },
  red:    { bg: "#FFEBEE", bgEnd: "#FFCDD2", value: "#C62828", label: "#37474F", trend: "#D32F2F", border: "#EF9A9A" },
  orange: { bg: "#FFF3E0", bgEnd: "#FFE0B2", value: "#E65100", label: "#37474F", trend: "#F57C00", border: "#FFCC80" },
  green:  { bg: "#E8F5E9", bgEnd: "#C8E6C9", value: "#2E7D32", label: "#37474F", trend: "#388E3C", border: "#A5D6A7" },
};

function StatCard({ label, value, change, positive, icon, color = "blue" }: StatCardProps & { color?: keyof typeof CARD_COLORS }) {
  const c = CARD_COLORS[color];
  return (
    <View
      style={{
        backgroundColor: c.bg,
        borderRadius: 14, padding: 16,
        flex: 1, borderWidth: 1, borderColor: c.border,
        shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 8, elevation: 2,
      }}
    >
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
        <Text style={{ color: c.label, fontSize: 11, fontWeight: "500", flex: 1, lineHeight: 16 }}>{label}</Text>
        <Text style={{ fontSize: 18 }}>{icon}</Text>
      </View>
      <Text style={{ color: c.value, fontSize: 24, fontWeight: "700", marginBottom: 6 }}>
        {value}
      </Text>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 4, backgroundColor: "rgba(255,255,255,0.6)", paddingHorizontal: 8, paddingVertical: 3, borderRadius: 20, alignSelf: "flex-start" }}>
        <Text style={{ color: positive ? "#2E7D32" : "#D4183D", fontSize: 11, fontWeight: "600" }}>
          {positive ? "▲" : "▼"} {change}
        </Text>
      </View>
    </View>
  );
}

function SectionHeader({ title }: { title: string }) {
  return (
    <Text style={{ color: "#0A1929", fontSize: 15, fontWeight: "600", marginBottom: 12, marginTop: 24, letterSpacing: 0.1 }}>
      {title}
    </Text>
  );
}

export default function DashboardScreen() {
  const { user } = useAuth();
  const displayName = user?.displayName ?? user?.email ?? "Analista";

  const handleSignOut = async () => {
    await signOut();
    router.replace("/(auth)/login");
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F4F6F9" }}>
      <ScrollView contentContainerStyle={{ padding: 16 }} showsVerticalScrollIndicator={false}>

        {/* Header */}
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <View>
            <Text style={{ color: "#717182", fontSize: 11, fontWeight: "500", letterSpacing: 0.3 }}>BIENVENIDO</Text>
            <Text style={{ color: "#0A1929", fontSize: 18, fontWeight: "700", marginTop: 2 }}>{displayName}</Text>
          </View>
          <Pressable
            onPress={handleSignOut}
            style={{
              backgroundColor: "#FFFFFF", borderRadius: 10, paddingHorizontal: 14,
              paddingVertical: 8, borderWidth: 1, borderColor: "rgba(0,0,0,0.08)",
              shadowColor: "#000", shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 4, elevation: 1,
            }}
          >
            <Text style={{ color: "#37474F", fontSize: 13, fontWeight: "500" }}>Salir</Text>
          </Pressable>
        </View>

        {/* Brand banner */}
        <View
          style={{
            backgroundColor: "#1565C0", borderRadius: 16, padding: 20, marginBottom: 8,
            shadowColor: "#1565C0", shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.3, shadowRadius: 16, elevation: 6,
          }}
        >
          <Text style={{ color: "rgba(255,255,255,0.7)", fontSize: 10, fontWeight: "600", letterSpacing: 2 }}>
            INTELLECTA · SALUD PÚBLICA
          </Text>
          <Text style={{ color: "white", fontSize: 20, fontWeight: "700", marginTop: 4 }}>
            Panel de Inteligencia
          </Text>
          <Text style={{ color: "#BBDEFB", fontSize: 13, marginTop: 4 }}>
            Tabaco y dispositivos de vapeo · México
          </Text>
          <Text style={{ color: "#90CAF9", fontSize: 11, marginTop: 8 }}>
            Última actualización: hoy
          </Text>
        </View>

        {/* Stats */}
        <SectionHeader title="Indicadores Clave" />
        <View style={{ flexDirection: "row", gap: 10, marginBottom: 4 }}>
          <StatCard label="Prevalencia tabaco" value="20.4%" change="1.2% vs 2022" positive={false} icon="🚬" color="red" />
          <StatCard label="Prevalencia vapeo" value="8.7%" change="2.3% vs 2022" positive={false} icon="💨" color="orange" />
        </View>
        <View style={{ flexDirection: "row", gap: 10, marginTop: 10 }}>
          <StatCard label="Campañas activas" value="12" change="3 nuevas" positive={true} icon="📣" color="blue" />
          <StatCard label="Reportes mes" value="47" change="8 más" positive={true} icon="📋" color="green" />
        </View>

        {/* Quick actions */}
        <SectionHeader title="Acceso rápido" />
        <View style={{ gap: 10 }}>
          {[
            { label: "Ver tendencias históricas", icon: "📈", route: "/(tabs)/analytics" },
            { label: "Mapa por regiones", icon: "🗺️", route: "/(tabs)/regions" },
            { label: "Generar nuevo reporte", icon: "📋", route: "/(tabs)/reports" },
            { label: "Alertas del sistema", icon: "🔔", route: "/(tabs)/alerts" },
          ].map((item) => (
            <Pressable
              key={item.label}
              onPress={() => router.push(item.route as any)}
              style={({ pressed }) => ({
                backgroundColor: pressed ? "#E3F2FD" : "#FFFFFF",
                borderRadius: 12, padding: 16,
                flexDirection: "row", alignItems: "center", gap: 14,
                borderWidth: 1, borderColor: "rgba(0,0,0,0.08)",
                shadowColor: "#000", shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 4, elevation: 1,
              })}
            >
              <Text style={{ fontSize: 20 }}>{item.icon}</Text>
              <Text style={{ color: "#0A1929", fontSize: 14, fontWeight: "500", flex: 1 }}>
                {item.label}
              </Text>
              <Text style={{ color: "#90A4AE", fontSize: 18 }}>›</Text>
            </Pressable>
          ))}
        </View>

        <View style={{ height: 20 }} />
      </ScrollView>
    </SafeAreaView>
  );
}
