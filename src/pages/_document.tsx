import {Html, Head, Main, NextScript} from 'next/document'
import {theme} from '@chakra-ui/theme';
import {ColorModeScript} from '@chakra-ui/react';

export default function Document() {
    return (
        <Html lang="en">
            <Head>
                <link rel="preconnect" href="https://fonts.googleapis.com"/>
                <link rel="preconnect" href="https://fonts.gstatic.com" />
                <link href="https://fonts.googleapis.com/css2?family=Inter&display=swap" rel="stylesheet"/>
                {/*<ColorModeScript initialColorMode={theme.config.initialColorMode}/>*/}

            </Head>
            <body>
            <Main/>
            <NextScript/>
            </body>
        </Html>
    )
}
