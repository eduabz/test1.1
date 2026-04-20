import { Text, View } from "react-native";

export type BadgeVariant = "success" | "danger" | "warning" | "info" | "neutral";

type Props = {
  label: string;
  variant?: BadgeVariant;
  icon?: string;
  size?: "sm" | "md";
};

const VARIANTS: Record<BadgeVariant, { color: string; bg: string }> = {
  success: { color: "#34D399", bg: "#022c22" },
  danger:  { color: "#F87171", bg: "#450a0a" },
  warning: { color: "#FBBF24", bg: "#451a03" },
  info:    { color: "#60A5FA", bg: "#172554" },
  neutral: { color: "#94A3B8", bg: "#1E293B" },
};

export function Badge({ label, variant = "neutral", icon, size = "md" }: Props) {
  const { color, bg } = VARIANTS[variant];
  const fontSize = size === "sm" ? 10 : 12;
  const px = size === "sm" ? 6 : 8;
  const py = size === "sm" ? 2 : 3;

  return (
    <View
      style={{
        backgroundColor: bg,
        borderRadius: 6,
        paddingHorizontal: px,
        paddingVertical: py,
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
        alignSelf: "flex-start",
      }}
    >
      {icon && <Text style={{ fontSize }}>{icon}</Text>}
      <Text style={{ color, fontSize, fontWeight: "700" }}>{label}</Text>
    </View>
  );
}
