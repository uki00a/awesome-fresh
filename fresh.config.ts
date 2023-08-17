import { defineConfig } from "$fresh/server.ts";

import twindv1 from "$fresh/plugins/twindv1.ts";
import twindConfig from "./twind.config.ts";

export default defineConfig({
  plugins: [twindv1(twindConfig)],
});
