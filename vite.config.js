import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd());

  if (command === "build" && !env.VITE_BACKEND_URL) {
    throw new Error("VITE_BACKEND_URL is not set. Add it in Vercel > Settings > Environment Variables, then redeploy.");
  }

  return {
    plugins: [react()],
    server: { port: 5173 },
  };
});
