import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetUno,
  presetWebFonts,
  transformerDirectives,
} from "unocss";

export default defineConfig({
  shortcuts: [
    {
      "bg-base": "bg-white dark:bg-black",
      "color-base": "text-black dark:text-white",
    },
  ],
  rules: [
    [
      /^slide-enter-(\d+)$/,
      ([_, n]) => ({
        "--enter-stage": n,
      }),
    ],
  ],
  presets: [
    presetIcons({
      extraProperties: {
        display: "inline-block",
        height: "1.2em",
        width: "1.2em",
        "vertical-align": "text-bottom",
      },
    }),
    presetAttributify(),
    presetUno(),
    presetWebFonts({
      fonts: {
        sans: "Inter:400,600,800",
        mono: "DM Mono:400,600",
        condensed: "Roboto Condensed",
        wisper: "Bad Script",
      },
    }),
  ],
  transformers: [transformerDirectives()],
  safelist: ["i-ri-menu-2-fill"],
});
