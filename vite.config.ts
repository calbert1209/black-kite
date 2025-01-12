import { defineConfig } from "vite";
import preact from "@preact/preset-vite";
import svgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const baseConfig = {
    plugins: [preact(), svgr()],
  };

  if (command === "serve") {
    return baseConfig;
  }

  return {
    ...baseConfig,
    base: "/black-kite/",
  };
});
