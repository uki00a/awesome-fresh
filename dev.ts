#!/usr/bin/env -S deno run -A --watch=static/,routes/
import { tailwind } from "@fresh/plugin-tailwind";

import { Builder } from "fresh/dev";
import { createApp } from "$/app.ts";

const app = await createApp();
const builder = new Builder();
tailwind(builder, app, {});
if (Deno.args.includes("build")) {
  await builder.build(app);

  {
    // Additional custom build logic here.
    // TODO: Extract this process as a plugin.
    const { buildHTML } = await import("./tools/build.ts");
    await buildHTML(app, builder);
  }
} else {
  await builder.listen(app);
}
