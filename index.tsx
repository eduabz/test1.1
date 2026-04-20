import "./global.css";
import { registerRootComponent } from "expo";
import { ExpoRoot } from "expo-router";

// Cambia a true para abrir Storybook
const STORYBOOK_ENABLED = true;

if (STORYBOOK_ENABLED) {
  const StorybookUI = require("./.storybook").default;
  registerRootComponent(StorybookUI);
} else {
  function App() {
    const ctx = require.context("./app");
    return <ExpoRoot context={ctx} />;
  }
  registerRootComponent(App);
}
