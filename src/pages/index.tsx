import React from 'react'
import { NextPageWithLayout } from '@/pages/_app'
import { getBaseLayout } from '@/components/Layout/BaseLayout'
import Profile from '@/pages/profile'


const Home: NextPageWithLayout = () => {

  return (
    <Profile/>
  )
}
Home.getLayout = getBaseLayout
export default Home