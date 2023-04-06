import '@/styles/globals.scss'
import type {AppProps} from 'next/app'
import {QueryClient} from '@tanstack/query-core';
import {QueryClientProvider} from '@tanstack/react-query';
import {ReactQueryDevtools} from '@tanstack/react-query-devtools';
import {ChakraProvider, ColorModeScript, extendTheme, ThemeProvider} from '@chakra-ui/react';
import {mode} from '@chakra-ui/theme-tools';
import {AuthRedirect} from '@/components/auth-redirect';

const queryClient = new QueryClient()


const config = {
    initialColorMode: "light",
    useSystemColorMode: false,
};

const theme = extendTheme({
    config,
    fonts: {
        heading: "Inter",
        body: 'Inter',
    },
    styles: {
        global: (props) => ({
            body: {
                bg: mode("white", "gray.800")(props),
                color: mode("gray.800", "whiteAlpha.900")(props),
                fontFamily: 'body'
            },
        }),
    },
});

export default function App({Component, pageProps}: AppProps) {
    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider theme={theme}>
                <ColorModeScript initialColorMode={theme.config.initialColorMode}/>
                {/*<AuthRedirect>*/}
                    <Component {...pageProps} />
                {/*</AuthRedirect>*/}
            </ThemeProvider>
            <ReactQueryDevtools initialIsOpen={false}/>
        </QueryClientProvider>
    )
}
