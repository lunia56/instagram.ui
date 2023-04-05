import '@/styles/globals.scss'
import type {AppProps} from 'next/app'
import {QueryClient} from '@tanstack/query-core';
import {QueryClientProvider} from '@tanstack/react-query';
import {ReactQueryDevtools} from '@tanstack/react-query-devtools';
import {ChakraProvider, ColorModeScript, extendTheme, ThemeProvider} from '@chakra-ui/react';
import {mode} from '@chakra-ui/theme-tools';

const queryClient = new QueryClient()


const config = {
    initialColorMode: "light",
    useSystemColorMode: false,
};

const theme = extendTheme({
    config,
    styles: {
        global: (props) => ({
            body: {
                bg: mode("white", "gray.800")(props),
                color: mode("gray.800", "whiteAlpha.900")(props),
            },
        }),
    },
});

export default function App({Component, pageProps}: AppProps) {
    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider theme={theme}>
                <ColorModeScript initialColorMode={theme.config.initialColorMode} />
            <Component {...pageProps} />
            </ThemeProvider>
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    )
}
