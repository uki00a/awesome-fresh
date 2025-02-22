import { define } from "$/server.ts";
import { CSS, render as renderGFM } from "@deno/gfm";

const gfmStyle = `
.markdown-body ul { list-style: disc }
.markdown-body a { color: teal }
${CSS}`;

export default define.page(async () => {
  const url = new URL("../README.md", import.meta.url);
  const markdown = await Deno.readTextFile(url);
  const content = renderGFM(markdown, {});

  return (
    <>
      <head>
        <style id="gfm">{gfmStyle}</style>
      </head>
      <main
        data-color-mode="auto"
        data-dark-theme="dark"
        class="p-4 mx-auto max-w-screen-md markdown-body"
        // deno-lint-ignore react-no-danger -- `content` is not externally given
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </>
  );
});
