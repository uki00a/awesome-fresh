import type { Options } from "$fresh/plugins/twindv1.ts";
import { defineConfig } from "@twind/core";
import tailwind from "@twind/preset-tailwind";

export default {
  ...defineConfig({
    presets: [tailwind()],
  }),

  selfURL: import.meta.url,
} as Options;
