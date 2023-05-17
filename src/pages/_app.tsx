import '@/assets/styles/globals.scss'
import type { AppProps } from 'next/app'
import { Hydrate, QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import useLoader from '@/assets/hooks/useLoader'
import { ReactElement, ReactNode, useState } from 'react'
import { NextPage } from 'next'
import '../assets/styles/nprogress.css'
import { AuthRedirect } from "@/components/Auth-redirect";

const config = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
}

const theme = extendTheme({
  config,
  fonts: {
    heading: 'Inter',
    body: 'Inter',
  },
  styles: {
    global: ({
      body: {
        bg: 'dark',
        color: 'white',
        fontFamily: 'body'
      },
    }),
  },
})


export type NextPageWithLayout<P = {}> = NextPage<P> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}
export default function App({Component, pageProps}: AppPropsWithLayout) {
  const [queryClient] = useState(() => new QueryClient)
  useLoader()

  const getLayout = Component.getLayout ?? ((page) => page)

  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        {/*<AuthRedirect>*/}
        {getLayout(
          <Component {...pageProps} />
        )}
        {/*</AuthRedirect>*/}
      </ChakraProvider>
      <ReactQueryDevtools initialIsOpen={false}/>
    </QueryClientProvider>
  )
}
