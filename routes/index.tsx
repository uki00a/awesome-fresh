import { Head } from "$fresh/runtime.ts";
import type { Handlers, PageProps } from "$fresh/server.ts";
import { CSS, render as renderGFM } from "$gfm";

const gfmStyle = `
.markdown-body ul { list-style: disc }
.markdown-body a { color: teal }
${CSS}`;

export const handler: Handlers = {
  async GET(req, ctx) {
    const url = new URL("../README.md", import.meta.url);
    const markdown = await Deno.readTextFile(url);
    const content = renderGFM(markdown, {});
    return ctx.render(content);
  },
};

export default function Index(props: PageProps<string>) {
  return (
    <>
      <Head>
        <style id="gfm">{gfmStyle}</style>
      </Head>
      <main
        data-color-mode="auto"
        data-dark-theme="dark"
        class="p-4 mx-auto max-w-screen-md markdown-body"
        dangerouslySetInnerHTML={{ __html: props.data }}
      />
    </>
  );
}
