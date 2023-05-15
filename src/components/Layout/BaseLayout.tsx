import React, {PropsWithChildren, ReactElement, useState} from 'react'
import {NextPage} from 'next'
import NavBar from '@/components/NavBar/NavBar'
import LayoutWithHeader from '@/components/Layout/LayoutWithHeader'
import {Box, Center} from '@chakra-ui/react'
import {QueryClientProvider} from '@tanstack/react-query'
import {QueryClient} from '@tanstack/query-core'


const BaseLayout: NextPage<PropsWithChildren> = ({children}) => {
    const [queryClient] = useState(() => new QueryClient)

    return <>
            <QueryClientProvider client={queryClient}>
                <LayoutWithHeader>
                    <NavBar>
                        <Box mt={'55px'} ml={'30px'} >
                            {children}
                        </Box>
                    </NavBar>
                </LayoutWithHeader>
            </QueryClientProvider>
        </>

}

export default BaseLayout

export const getLayout = (page: ReactElement) => {
    return <BaseLayout>{page}</BaseLayout>
}
