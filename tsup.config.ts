import { defineConfig } from "tsup";

export default defineConfig({
  format: ["cjs", "esm"],
  entry: ["./src/index.ts"],
  dts: false, // Disable declaration generation
  shims: true,
  skipNodeModulesBundle: true,
  clean: true,
});
