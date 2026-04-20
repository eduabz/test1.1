import { useState } from "react";
import { Pressable, Text, TextInput, TextInputProps, View } from "react-native";

type Props = TextInputProps & {
  label: string;
  error?: string;
  hint?: string;
  icon?: string;
  password?: boolean;
};

export function Input({ label, error, hint, icon, password = false, style, ...props }: Props) {
  const [visible, setVisible] = useState(false);

  return (
    <View style={{ marginBottom: 16 }}>
      <Text
        style={{ color: "#94A3B8", fontSize: 12, fontWeight: "600", marginBottom: 6, letterSpacing: 0.5 }}
      >
        {label}
      </Text>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: "#0F172A",
          borderRadius: 12,
          borderWidth: 1,
          borderColor: error ? "#DC2626" : "#334155",
          paddingHorizontal: 14,
        }}
      >
        {icon && (
          <Text style={{ fontSize: 16, marginRight: 8, opacity: 0.6 }}>{icon}</Text>
        )}

        <TextInput
          style={[
            {
              flex: 1,
              paddingVertical: 13,
              fontSize: 15,
              color: "#F1F5F9",
            },
            style,
          ]}
          placeholderTextColor="#475569"
          secureTextEntry={password && !visible}
          autoCapitalize="none"
          {...props}
        />

        {password && (
          <Pressable onPress={() => setVisible((v) => !v)} style={{ paddingLeft: 8 }}>
            <Text style={{ fontSize: 16, opacity: 0.6 }}>{visible ? "🙈" : "👁"}</Text>
          </Pressable>
        )}
      </View>

      {error && (
        <Text style={{ color: "#F87171", fontSize: 12, marginTop: 4 }}>⚠ {error}</Text>
      )}
      {!error && hint && (
        <Text style={{ color: "#475569", fontSize: 12, marginTop: 4 }}>{hint}</Text>
      )}
    </View>
  );
}
