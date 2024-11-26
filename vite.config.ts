import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

export default defineConfig(({ mode }) => {
  const base = mode === "production" ? "/dynamic-soundscape/" : "/";

  return {
    server: {
      host: "0.0.0.0", // Universal host for IPv4 and IPv6 compatibility
      port: 8080,
    },
    base: base,
    plugins: [
      react(),
      mode === "development" &&
        (() => {
          try {
            return componentTagger();
          } catch (error) {
            console.warn("Failed to load componentTagger plugin:", error);
            return null;
          }
        })(),
    ].filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    optimizeDeps: {
      include: ["@floating-ui/react-dom"],
    },
    build: {
      sourcemap: mode === "development",
      rollupOptions: {
        external: [],
      },
    },
  };
});
