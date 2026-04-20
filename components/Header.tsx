import { Pressable, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type Action = {
  label: string;
  onPress: () => void;
  color?: string;
};

type Props = {
  title: string;
  subtitle?: string;
  leftAction?: Action;
  rightAction?: Action;
  showBrand?: boolean;
};

export function Header({ title, subtitle, leftAction, rightAction, showBrand = false }: Props) {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        backgroundColor: "#0F172A",
        paddingTop: insets.top + 8,
        paddingBottom: 14,
        paddingHorizontal: 16,
        borderBottomWidth: 1,
        borderBottomColor: "#1E293B",
      }}
    >
      {showBrand && (
        <Text
          style={{
            color: "#1D4ED8",
            fontSize: 10,
            fontWeight: "700",
            letterSpacing: 3,
            marginBottom: 4,
          }}
        >
          INTELLECTA
        </Text>
      )}

      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
        {/* Left */}
        <View style={{ width: 80 }}>
          {leftAction && (
            <Pressable onPress={leftAction.onPress} hitSlop={8}>
              <Text style={{ color: leftAction.color ?? "#60A5FA", fontSize: 14, fontWeight: "600" }}>
                {leftAction.label}
              </Text>
            </Pressable>
          )}
        </View>

        {/* Center */}
        <View style={{ flex: 1, alignItems: "center" }}>
          <Text style={{ color: "#F1F5F9", fontSize: 16, fontWeight: "700" }}>{title}</Text>
          {subtitle && (
            <Text style={{ color: "#64748B", fontSize: 11, marginTop: 2 }}>{subtitle}</Text>
          )}
        </View>

        {/* Right */}
        <View style={{ width: 80, alignItems: "flex-end" }}>
          {rightAction && (
            <Pressable onPress={rightAction.onPress} hitSlop={8}>
              <Text style={{ color: rightAction.color ?? "#60A5FA", fontSize: 14, fontWeight: "600" }}>
                {rightAction.label}
              </Text>
            </Pressable>
          )}
        </View>
      </View>
    </View>
  );
}
