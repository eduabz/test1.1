import type { Meta, StoryObj } from "@storybook/react-native";
import { Header } from "./Header";

const meta: Meta<typeof Header> = {
  title: "Componentes/Header",
  component: Header,
  decorators: [
    (Story) => <Story />,
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const SoloTitulo: Story = {
  args: { title: "Dashboard" },
};

export const ConSubtitulo: Story = {
  args: {
    title: "Análisis",
    subtitle: "Tendencias históricas · 2018–2023",
  },
};

export const ConBrand: Story = {
  args: {
    title: "Panel Principal",
    subtitle: "Salud Pública · México",
    showBrand: true,
  },
};

export const ConAcciones: Story = {
  args: {
    title: "Nuevo Reporte",
    leftAction:  { label: "Cancelar", onPress: () => {} },
    rightAction: { label: "Guardar",  onPress: () => {} },
  },
};

export const AccionPeligro: Story = {
  args: {
    title: "Configuración",
    rightAction: { label: "Salir", onPress: () => {}, color: "#F87171" },
  },
};

export const NavegacionModal: Story = {
  args: {
    title: "Detalle de alerta",
    leftAction: { label: "← Atrás", onPress: () => {} },
  },
};
