import("./main.ts");

await new Promise((ok) => {
  setTimeout(ok, 100);
});

const html = await fetch("http://localhost:8000").then((res) => res.text());
const buildDir = new URL("./build", import.meta.url).pathname;
await Deno.mkdir(buildDir, { recursive: true });
await Deno.writeTextFile(`${buildDir}/index.html`, html);

Deno.exit(0);
