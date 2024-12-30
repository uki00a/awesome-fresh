import { App, fsRoutes, staticFiles } from "fresh";
import type { State } from "$/server.ts";
import { resolve } from "node:path";

interface AppConfig {
  basePath?: string;
}

function createAppConfig(): AppConfig {
  return {
    basePath: Deno.env.get("APP_BASE_PATH"),
  };
}

export async function createApp() {
  const outDir = "./build";
  const appConfig = createAppConfig();
  const app = new App<State>({
    build: { outDir },
    basePath: appConfig.basePath,
  });
  app.use(staticFiles());

  await fsRoutes(app, {
    dir: "./",
    loadIsland: (path) => import(`./islands/${path}`),
    loadRoute: (path) => import(`./routes/${path}`),
  });

  return app;
}
