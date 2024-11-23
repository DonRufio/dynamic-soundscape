import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

export default defineConfig(({ mode }) => {
  const base = mode === "production" ? "/" : "/";
  

  
  return {
    server: {
      host: "::", // Use IPv6 host or switch to "0.0.0.0" if preferred
      port: 8080,
    },
    base: base, // Set the base path based on the mode
    plugins: [
      react(),
      mode === "development" && componentTagger(), // Include only in development
    ].filter(Boolean), // Filter out falsy values
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    optimizeDeps: {
      include: ["@floating-ui/react-dom"], // Optimize the dependency for development
    },
    build: {
      rollupOptions: {
        external: [], // Include all dependencies in the build
      },
    },
  };
});

