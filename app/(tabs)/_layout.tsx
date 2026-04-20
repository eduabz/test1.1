import { Tabs } from "expo-router";
import { Text } from "react-native";

function TabIcon({ icon, focused }: { icon: string; focused: boolean }) {
  return (
    <Text style={{ fontSize: 20, opacity: focused ? 1 : 0.5 }}>{icon}</Text>
  );
}

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#1E293B",
          borderTopColor: "#334155",
          borderTopWidth: 1,
          height: 60,
          paddingBottom: 8,
        },
        tabBarActiveTintColor: "#60A5FA",
        tabBarInactiveTintColor: "#64748B",
        tabBarLabelStyle: { fontSize: 10, fontWeight: "600" },
      }}
    >
      <Tabs.Screen
        name="dashboard"
        options={{
          title: "Dashboard",
          tabBarIcon: ({ focused }) => <TabIcon icon="📊" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="analytics"
        options={{
          title: "Análisis",
          tabBarIcon: ({ focused }) => <TabIcon icon="📈" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="regions"
        options={{
          title: "Regiones",
          tabBarIcon: ({ focused }) => <TabIcon icon="🗺️" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="reports"
        options={{
          title: "Reportes",
          tabBarIcon: ({ focused }) => <TabIcon icon="📋" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="alerts"
        options={{
          title: "Alertas",
          tabBarIcon: ({ focused }) => <TabIcon icon="🔔" focused={focused} />,
        }}
      />
    </Tabs>
  );
}
