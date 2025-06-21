import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  // Extend base Next.js + TypeScript config
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  // Custom overrides
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: "module",
      },
    },
    rules: {
      // Disable unused vars warning (ignoring _ prefixed vars)
      "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_", varsIgnorePattern: "^_" }],

      // Allow `any` (disable this if you want stronger typing)
      "@typescript-eslint/no-explicit-any": "off",

      // Allow regular <img> usage in Next.js
      "@next/next/no-img-element": "off",

      // Disable unescaped entities warning
      "react/no-unescaped-entities": "off",

      // Disable exhaustive deps warning (use with care)
      "react-hooks/exhaustive-deps": "off",

      // Disable prefer-const
      "prefer-const": "off",

      // Also apply for plain JS if needed
      "no-unused-vars": ["warn", { argsIgnorePattern: "^_", varsIgnorePattern: "^_" }],
    },
  },
];

export default eslintConfig;
