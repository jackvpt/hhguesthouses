import { defineConfig } from "vite";
import react from '@vitejs/plugin-react-swc'
import { readFileSync } from "fs";

const pkg = JSON.parse(readFileSync("./package.json", "utf-8"));
// https://vite.dev/config/

export default defineConfig({
  plugins: [react()],
  define: {
    __APP_VERSION__: JSON.stringify(pkg.version),
  },
});
