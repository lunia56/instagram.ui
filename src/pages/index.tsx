import React from 'react'
import {NextPageWithLayout} from '@/pages/_app'
import {getLayout} from '@/components/Layout/BaseLayout'
import Profile from '@/pages/profile'


const Home: NextPageWithLayout = () => {
    return (
        <>
            <Profile/>
        </>
    )
}
Home.getLayout = getLayout
export default Home