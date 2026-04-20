import type { Preview } from "@storybook/react-native";
import { View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

const preview: Preview = {
  parameters: {
    backgrounds: {
      default: "dark",
      values: [
        { name: "dark",  value: "#0F172A" },
        { name: "card",  value: "#1E293B" },
        { name: "light", value: "#F8FAFC" },
      ],
    },
  },
  decorators: [
    (Story) => (
      <SafeAreaProvider>
        <View style={{ flex: 1, padding: 20, backgroundColor: "#0F172A" }}>
          <Story />
        </View>
      </SafeAreaProvider>
    ),
  ],
};

export default preview;
