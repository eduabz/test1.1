import type { Meta, StoryObj } from "@storybook/react-native";
import { View } from "react-native";
import { Badge } from "./Badge";

const meta: Meta<typeof Badge> = {
  title: "Componentes/Badge",
  component: Badge,
  args: { label: "Publicado" },
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["success", "danger", "warning", "info", "neutral"],
    },
    size: {
      control: { type: "select" },
      options: ["sm", "md"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Publicado: Story = {
  args: { variant: "success", label: "Publicado" },
};

export const Borrador: Story = {
  args: { variant: "neutral", label: "Borrador" },
};

export const Critico: Story = {
  args: { variant: "danger", label: "Crítico", icon: "🚨" },
};

export const Advertencia: Story = {
  args: { variant: "warning", label: "Revisar", icon: "⚠️" },
};

export const Info: Story = {
  args: { variant: "info", label: "ENSANUT" },
};

export const Severidades: StoryObj = {
  render: () => (
    <View style={{ gap: 10 }}>
      <Badge variant="danger"  icon="🚨" label="Crítica"   />
      <Badge variant="warning" icon="⚠️" label="Alta"      />
      <Badge variant="warning" icon="📢" label="Media"     />
      <Badge variant="success" icon="ℹ️" label="Baja"      />
      <Badge variant="neutral"            label="Sin leer"  />
    </View>
  ),
};

export const FuentesDatos: StoryObj = {
  render: () => (
    <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
      {["ENSANUT", "STATIN", "OPS", "INEGI", "SSA", "OMS"].map((s) => (
        <Badge key={s} variant="info" label={s} size="sm" />
      ))}
    </View>
  ),
};
