import nextPlugin from "@next/eslint-plugin-next";
import prettier from "eslint-config-prettier";

export default [
 {
  ignores: [".next/**", "node_modules/**", "public/**"],
 },
 nextPlugin.configs["core-web-vitals"],
 prettier,
 {
  languageOptions: {
   ecmaVersion: "latest",
   sourceType: "module",
   parserOptions: {
    ecmaFeatures: { jsx: true },
   },
  },
  rules: {
   "@next/next/no-img-element": "off",
  },
 },
];
