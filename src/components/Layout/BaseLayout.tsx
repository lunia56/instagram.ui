import React, {PropsWithChildren, ReactElement} from 'react'
import {NextPage} from 'next'
import NavBar from '@/components/NavBar/NavBar'
import LayoutWithHeader from '@/components/Layout/LayoutWithHeader'


const BaseLayout: NextPage<PropsWithChildren> = ({children}) => (
    <>
        <LayoutWithHeader>
            <NavBar>
            {children}
            </NavBar>
        </LayoutWithHeader>
    </>
)

export default BaseLayout

export const getLayout = (page: ReactElement) => {
    return <BaseLayout>{page}</BaseLayout>
}
