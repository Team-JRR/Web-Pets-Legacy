import js from "@eslint/js";
import globals from "globals";
import pluginReact from "eslint-plugin-react";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
  { files: ["**/*.{js,mjs,cjs,jsx}"], plugins: { js }, extends: ["js/recommended"], languageOptions: { globals: {...globals.browser, ...globals.node} }, rules: {semi: ["error", "always"], "no-console": ["error", {allow: ["warn", "info", "error"]}]} },
  pluginReact.configs.flat.recommended, globalIgnores(['docs/', 'client/dist'])
]);
