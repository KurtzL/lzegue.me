/// <reference types="vite-ssg" />

import { defineConfig } from "vite";
import Vue from "@vitejs/plugin-vue";
import UnoCSS from "unocss/vite";
import VueRouter from "unplugin-vue-router/vite";
import AutoImport from "unplugin-auto-import/vite";
import { VueRouterAutoImports } from "unplugin-vue-router";
import Components from "unplugin-vue-components/vite";
import IconsResolver from "unplugin-icons/resolver";
import Inspect from "vite-plugin-inspect";
import Exclude from "vite-plugin-optimize-exclude";
import Icons from "unplugin-icons/vite";
import Mackdown from "unplugin-vue-markdown/vite";
import MarkdownItShiki from "@shikijs/markdown-it";
import { rendererRich, transformerTwoslash } from "@shikijs/twoslash";

const promises: Promise<any>[] = [];
// https://vite.dev/config/
export default defineConfig({
  optimizeDeps: {
    include: ["vue", "vue-router", "@vueuse/core"],
  },
  plugins: [
    UnoCSS(),

    VueRouter({
      extensions: [".vue", ".md"],
      routesFolder: "src/pages",
      logs: true,
    }),

    Vue({
      include: [/\.vue$/, /\.md$/],
    }),

    Mackdown({
      wrapperComponent: "Blog",
      wrapperClasses: (id, code) =>
        code.includes("@layout-full-width") ? "" : "prose m-auto",
      headEnabled: true,
      exportFrontmatter: false,
      exposeFrontmatter: false,
      exposeExcerpt: false,
      markdownItOptions: {
        quotes: "\"\"''",
      },
      async markdownItSetup(md) {
        md.use(
          await MarkdownItShiki({
            themes: {
              dark: "vitesse-dark",
              light: "vitesse-light",
            },
            defaultColor: false,
            cssVariablePrefix: "--s-",
            transformers: [
              transformerTwoslash({
                explicitTrigger: true,
                renderer: rendererRich(),
              }),
            ],
          }),
        );
      },
    }),

    AutoImport({
      imports: ["vue", VueRouterAutoImports],
    }),

    Components({
      extensions: ["vue", "md"],
      dts: true,
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      resolvers: [
        IconsResolver({
          componentPrefix: "",
        }),
      ],
    }),

    Inspect(),

    Icons({
      defaultClass: "inline",
      defaultStyle: "vertical-align: sub;",
    }),

    // Exclude(),

    {
      name: "await",
      async closeBundle() {
        await Promise.all(promises);
      },
    },
  ],

  build: {
    rollupOptions: {
      onwarn(warning, next) {
        if (warning.code !== "UNUSED_EXTERNAL_IMPORT") next(warning);
      },
    },
  },

  ssgOptions: {
    formatting: "minify",
  },
});
