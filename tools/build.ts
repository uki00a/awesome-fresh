import type { App } from "fresh";
import type { FreshBuilder } from "fresh/core";
import type { State } from "$/server.ts";

export async function buildHTML(
  app: App<State>,
  builder: FreshBuilder,
): Promise<void> {
  const { stdout: gitOutput } = await new Deno.Command("git", {
    args: ["rev-parse", "HEAD"],
  }).output();
  const revision = new TextDecoder().decode(gitOutput).trim();
  Deno.env.set("DENO_DEPLOYMENT_ID", revision);

  const abortController = new AbortController();
  const listenPromise = builder.listen(app, {
    port: 8000,
    signal: abortController.signal,
  });

  try {
    await listenPromise;
    const res = await fetch("http://localhost:8000");
    if (!res.ok) {
      throw new Error("Failed to fetch `/`");
    }

    const html = await res.text();
    const buildDir = new URL("../build", import.meta.url).pathname;
    await Deno.writeTextFile(`${buildDir}/static/index.html`, html);
  } finally {
    abortController.abort();
  }
}
