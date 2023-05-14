import { default as awesomeLint } from "awesome-lint";
import { default as process } from "node:process";

await awesomeLint.report({ filename: "README.md" });
// NOTE: Currently, awesome-lint hangs.
Deno.exit(process.exitCode); // https://github.com/sindresorhus/awesome-lint/blob/v0.18.2/index.js#L58
