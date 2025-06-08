import path from "path";
import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import dynamicImport from "vite-plugin-dynamic-import";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tailwindcss(), reactRouter(), tsconfigPaths(), dynamicImport()],
  assetsInclude: ["**/*.md"],
  resolve: {
    alias: {
      "@": path.join(__dirname, "app"),
    },
  },
  server: {
    host: true,
    port: 3029,
  },
  preview: {
    host: true,
    port: 3000,
  },
});
