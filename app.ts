import { App, fsRoutes, staticFiles } from "fresh";
import type { State } from "$/server.ts";

export async function createApp() {
  const app = new App<State>({
    build: {
      outDir: "./build",
    },
  });
  app.use(staticFiles());

  await fsRoutes(app, {
    dir: "./",
    loadIsland: (path) => import(`./islands/${path}`),
    loadRoute: (path) => import(`./routes/${path}`),
  });

  return app;
}
