/** @type {import("@ianvs/prettier-plugin-sort-imports").PrettierConfig} */
const config = {
  printWidth: 100,
  singleQuote: false,
  jsxSingleQuote: false,
  semi: true,
  tabWidth: 2,
  endOfLine: "crlf",
  trailingComma: "es5",
  plugins: ["@ianvs/prettier-plugin-sort-imports", "prettier-plugin-tailwindcss"],
  importOrder: [
    "^react$",
    "^react-router$",
    "^\\.\\/\\+.*$",
    "<BUILTIN_MODULES>",
    "<THIRD_PARTY_MODULES>",
    "^@ui/(.*)$",
    "^@docs/(.*)$",
    "",
    "^./.*$",
    "^../(?!.*.css$).*$",
    "^./(?!.*.css$).*$",
    "\\.css$",
    "\\.svg$",
  ],
};

export default config;
