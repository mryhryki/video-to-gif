"use client"

import { ReactNode } from "react";
import { createGlobalStyle} from "styled-components"

const GlobalStyle = createGlobalStyle`
  html,
  body {
    padding: 0;
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
    Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
  }

  * {
    box-sizing: border-box;
  }

  h1 {
    text-align: center;
  }
`;

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta property="og:title" content="Video to GIF" />
        <meta property="og:description" content="Convert video to gif on browser. powered by ffmpeg.wasm." />
        <meta property="og:image" content="https://video-to-gif.vercel.app/logo_1200x1200.png" />
        <meta property="og:url" content="https://video-to-gif.vercel.app/" />
        <meta property="og:site_name" content="Video to GIF" />
        <meta property="og:locale" content="ja-JP" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Video to GIF" />
        <meta name="twitter:description" content="Convert video to gif on browser. powered by ffmpeg.wasm." />
        <meta name="twitter:image" content="https://video-to-gif.vercel.app/logo_1200x1200.png" />
        <meta name="twitter:site" content="@mryhryki" />
        <title>Video to GIF</title>
      </head>
      <body>
        <GlobalStyle />
        {children}
      </body>
    </html>
  );
}
