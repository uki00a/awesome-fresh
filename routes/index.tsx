import { Head } from "$fresh/runtime.ts";
import type { Handlers, PageProps } from "$fresh/server.ts";
import { CSS, render as renderGFM } from "gfm";

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
        <title>Fresh App</title>
        <style>{CSS}</style>
      </Head>
      <main
        class="p-4 mx-auto max-w-screen-md markdown-body"
        dangerouslySetInnerHTML={{ __html: props.data }}
      >
      </main>
    </>
  );
}
