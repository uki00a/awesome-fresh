import { createApp } from "$/server.ts";

const app = await createApp();
if (import.meta.main) {
  await app.listen();
}
