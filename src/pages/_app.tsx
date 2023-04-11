import '@/styles/globals.scss'
import type {AppProps} from 'next/app'
import {QueryClient} from '@tanstack/query-core';
import {QueryClientProvider} from '@tanstack/react-query';
import {ReactQueryDevtools} from '@tanstack/react-query-devtools';
import {ChakraProvider, extendTheme} from '@chakra-ui/react';

const queryClient = new QueryClient()


const config = {
    initialColorMode: 'dark',
    useSystemColorMode: false,
};

const theme = extendTheme({
    config,
    fonts: {
        heading: "Inter",
        body: 'Inter',
    },
    styles: {
        global:  ({
            body: {
                bg:'dark',
                fontFamily: 'body'
            },
        }),
    },
});

export default function App({Component, pageProps}: AppProps) {
    return (
        <QueryClientProvider client={queryClient}>
            <ChakraProvider theme={theme}>
                {/*<AuthRedirect>*/}
                    <Component {...pageProps} />
                {/*</AuthRedirect>*/}
            </ChakraProvider>
            <ReactQueryDevtools initialIsOpen={false}/>
        </QueryClientProvider>
    )
}
