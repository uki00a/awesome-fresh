import { asset } from "fresh/runtime";
import type { PageProps } from "fresh";

export default function App({ Component }: PageProps) {
  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Awesome Fresh</title>
        <link rel="stylesheet" href={asset("/styles.css")} />
      </head>
      <body>
        <Component />
      </body>
    </html>
  );
}
