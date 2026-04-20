import type { Meta, StoryObj } from "@storybook/react-native";
import { View } from "react-native";
import { Button } from "./Button";

const meta: Meta<typeof Button> = {
  title: "Componentes/Button",
  component: Button,
  args: {
    label: "Aceptar",
    onPress: () => {},
  },
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["primary", "secondary", "danger", "ghost"],
    },
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: { variant: "primary", label: "Generar reporte" },
};

export const Secondary: Story = {
  args: { variant: "secondary", label: "Ver detalles" },
};

export const Danger: Story = {
  args: { variant: "danger", label: "Eliminar registro" },
};

export const Ghost: Story = {
  args: { variant: "ghost", label: "Cancelar" },
};

export const Cargando: Story = {
  args: { variant: "primary", label: "Procesando...", loading: true },
};

export const Deshabilitado: Story = {
  args: { variant: "primary", label: "Continuar", disabled: true },
};

export const Tamaños: StoryObj = {
  render: () => (
    <View style={{ gap: 12 }}>
      <Button label="Pequeño" onPress={() => {}} size="sm" />
      <Button label="Mediano" onPress={() => {}} size="md" />
      <Button label="Grande"  onPress={() => {}} size="lg" />
    </View>
  ),
};

export const TodasVariantes: StoryObj = {
  render: () => (
    <View style={{ gap: 12 }}>
      <Button label="Primary"   onPress={() => {}} variant="primary"   fullWidth />
      <Button label="Secondary" onPress={() => {}} variant="secondary" fullWidth />
      <Button label="Danger"    onPress={() => {}} variant="danger"    fullWidth />
      <Button label="Ghost"     onPress={() => {}} variant="ghost"     fullWidth />
    </View>
  ),
};
