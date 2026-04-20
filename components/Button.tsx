import { ActivityIndicator, Pressable, Text } from "react-native";

export type ButtonVariant = "primary" | "secondary" | "danger" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

type Props = {
  label: string;
  onPress: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
};

const VARIANTS: Record<ButtonVariant, { bg: string; text: string; border: string }> = {
  primary:   { bg: "#1D4ED8", text: "#FFFFFF", border: "transparent" },
  secondary: { bg: "#1E293B", text: "#94A3B8", border: "#334155" },
  danger:    { bg: "#DC2626", text: "#FFFFFF", border: "transparent" },
  ghost:     { bg: "transparent", text: "#60A5FA", border: "#1D4ED8" },
};

const SIZES: Record<ButtonSize, { py: number; px: number; font: number; radius: number }> = {
  sm: { py: 8,  px: 14, font: 13, radius: 8  },
  md: { py: 13, px: 20, font: 15, radius: 12 },
  lg: { py: 16, px: 24, font: 16, radius: 14 },
};

export function Button({
  label,
  onPress,
  variant = "primary",
  size = "md",
  loading = false,
  disabled = false,
  fullWidth = false,
}: Props) {
  const v = VARIANTS[variant];
  const s = SIZES[size];
  const isDisabled = disabled || loading;

  return (
    <Pressable
      onPress={onPress}
      disabled={isDisabled}
      style={{
        backgroundColor: v.bg,
        paddingVertical: s.py,
        paddingHorizontal: s.px,
        borderRadius: s.radius,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: variant === "ghost" || variant === "secondary" ? 1 : 0,
        borderColor: v.border,
        opacity: isDisabled ? 0.5 : 1,
        alignSelf: fullWidth ? "stretch" : "flex-start",
        minWidth: 80,
      }}
    >
      {loading ? (
        <ActivityIndicator color={v.text} size="small" />
      ) : (
        <Text style={{ color: v.text, fontSize: s.font, fontWeight: "700" }}>{label}</Text>
      )}
    </Pressable>
  );
}
