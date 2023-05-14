const { stdout: gitOutput } = await new Deno.Command("git", {
  args: ["rev-parse", "HEAD"],
}).output();
const revision = new TextDecoder().decode(gitOutput).trim();
Deno.env.set("DENO_DEPLOYMENT_ID", revision);

import("./main.ts");

await new Promise((ok) => {
  setTimeout(ok, 100);
});

const html = await fetch("http://localhost:8000").then((res) => res.text());
const buildDir = new URL("./build", import.meta.url).pathname;
await Deno.mkdir(buildDir, { recursive: true });
await Deno.writeTextFile(`${buildDir}/index.html`, html);

Deno.exit(0);
