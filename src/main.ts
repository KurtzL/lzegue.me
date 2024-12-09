import { routes } from "vue-router/auto-routes";
import { ViteSSG } from "vite-ssg";
import App from "./App.vue";

import "@unocss/reset/tailwind.css";
import "markdown-it-github-alerts/styles/github-colors-light.css";
import "markdown-it-github-alerts/styles/github-colors-dark-class.css";
import "markdown-it-github-alerts/styles/github-base.css";
import "@shikijs/twoslash/style-rich.css";
import "./assets/styles/main.css";
import "./assets/styles/prose.css";
import "./assets/styles/markdown.css";
import "uno.css";

export const createApp = ViteSSG(
  App,
  { routes },
  ({ router, app, isClient }) => {
    if (isClient) {
      router.beforeEach(() => {
        // NProgress.start()
      });
      router.afterEach(() => {
        // NProgress.done()
      });
    }
  },
);
