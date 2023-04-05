import { Html, Head, Main, NextScript } from 'next/document'
import {theme} from '@chakra-ui/theme';
import {ColorModeScript} from '@chakra-ui/react';

export default function Document() {
  return (
    <Html lang="en">
        <Head >
            <link rel="preconnect" href="https://fonts.googleapis.com"/>
        </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
