import React from 'react'
import Profile from '@/components/Profile/Profile'
import { getBaseLayout } from "@/components/Layout/BaseLayout";

const ProfilePage = () => {
    return (
            <Profile/>
    )
}

ProfilePage.getLayout = getBaseLayout
export default ProfilePage