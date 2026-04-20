import type { Meta, StoryObj } from "@storybook/react-native";
import { useState } from "react";
import { Input } from "./Input";

function InputControlled(props: React.ComponentProps<typeof Input>) {
  const [value, setValue] = useState(props.value ?? "");
  return <Input {...props} value={value} onChangeText={setValue} />;
}

const meta: Meta<typeof InputControlled> = {
  title: "Componentes/Input",
  component: InputControlled,
  args: {
    label: "Correo institucional",
    placeholder: "correo@salud.gob.mx",
    value: "",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const ConIcono: Story = {
  args: {
    label: "Buscar región",
    placeholder: "Ej. Jalisco, Veracruz...",
    icon: "🔍",
  },
};

export const ConValor: Story = {
  args: {
    label: "Correo institucional",
    value: "eduardo@salud.gob.mx",
  },
};

export const ConError: Story = {
  args: {
    label: "Correo institucional",
    value: "correo-invalido",
    error: "Ingresa un correo institucional válido",
  },
};

export const ConHint: Story = {
  args: {
    label: "Año de referencia",
    placeholder: "2023",
    hint: "Rango disponible: 2015–2024",
  },
};

export const Contrasena: Story = {
  args: {
    label: "Contraseña",
    placeholder: "••••••••",
    password: true,
  },
};

export const ContrasenaConError: Story = {
  args: {
    label: "Contraseña",
    value: "123",
    password: true,
    error: "Mínimo 8 caracteres requeridos",
  },
};
