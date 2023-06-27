const { stdout: gitOutput } = await new Deno.Command("git", {
  args: ["rev-parse", "HEAD"],
}).output();
const revision = new TextDecoder().decode(gitOutput).trim();
Deno.env.set("DENO_DEPLOYMENT_ID", revision);
Deno.env.set("PORT", "8000");

import(import.meta.resolve("../main.ts"));

await new Promise((ok) => {
  setTimeout(ok, 10000);
});

const res = await fetch("http://localhost:8000");
if (!res.ok) {
  console.error("Failed to fetch `/`");
  Deno.exit(1);
}

const html = await res.text();
const buildDir = new URL("../build", import.meta.url).pathname;
await Deno.mkdir(buildDir, { recursive: true });
await Deno.writeTextFile(`${buildDir}/index.html`, html);

Deno.exit(0);
