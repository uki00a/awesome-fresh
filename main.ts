import { App, fsRoutes, staticFiles } from "fresh";
import { createApp } from "$/app.ts";

const app = await createApp();
if (import.meta.main) {
  await app.listen();
}
