import React, {useState} from 'react'
import {Button, Text} from '@chakra-ui/react'
import {useRouter} from 'next/router'
import {getLayout} from '@/components/Layout/BaseLayout'
import {NextPageWithLayout} from '@/pages/_app'

const ProfilePage:NextPageWithLayout = () => {
    const {push} = useRouter()




    return (
        <>
            <Button colorScheme={'whiteAlpha'} onClick={()=>push('/editProfile')}>Profile Settings</Button>
            <Text>My Profile</Text>
        </>
    )
}
ProfilePage.getLayout = getLayout
export default ProfilePage