import { Redirect } from "expo-router";
import { useAuth } from "@/context/AuthContext";
import { ActivityIndicator, View } from "react-native";

export default function Index() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: "#0F172A" }}>
        <ActivityIndicator color="#1D4ED8" size="large" />
      </View>
    );
  }

  if (user) {
    return <Redirect href="/(tabs)/dashboard" />;
  }

  return <Redirect href="/(auth)/login" />;
}
