import { defineConfig } from "wxt";
import react from "@vitejs/plugin-react";

// See https://wxt.dev/api/config.html
export default defineConfig({
  vite: () => ({
    plugins: [react()],
  }),
  manifest: {
    name: "Summarizer",
    permissions: ["sidePanel", "activeTab", "tabs", "storage"],
    action: {
      default_popup: "",
    },
  },
  manifestVersion: 3,
});
