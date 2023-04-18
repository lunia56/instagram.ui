import React, {PropsWithChildren, ReactElement} from 'react'
import {NextPage} from 'next'
import NavBar from '@/components/NavBar/NavBar'
import LayoutWithHeader from '@/components/Layout/LayoutWithHeader'
import {Box, Center} from '@chakra-ui/react'


const BaseLayout: NextPage<PropsWithChildren> = ({children}) => (
    <>
        <LayoutWithHeader>
            <NavBar>
                <Box mt={'55px'} ml={'30px'} >
                    {children}
                </Box>
            </NavBar>
        </LayoutWithHeader>
    </>
)

export default BaseLayout

export const getLayout = (page: ReactElement) => {
    return <BaseLayout>{page}</BaseLayout>
}
