import React, {useState} from 'react'
import {Button, Grid, GridItem} from '@chakra-ui/react'
import {useRouter} from 'next/router'
import NavBar from '@/components/navBar/navBar'
import EditProfile from '@/components/editProfile/editProfile'

const ProfilePage = () => {
    const [editProfile, setEditProfile] = useState(false)
    const {push} = useRouter()


    const profileSettingsHandler = () => {
        setEditProfile(true)
    }
    return (
        <>
            <Grid
                templateAreas={`
                  "nav main"
                  "nav main"`}
                // gridTemplateRows={'1fr'}
                gridTemplateColumns={'220px 1fr'}
                gap="1"
                color="blackAlpha.700"
                fontWeight="bold"
            >

                <GridItem pl="2" bg="pink.300" area={'nav'} h="95vh">
                    <NavBar/>
                </GridItem>
                {editProfile
                    ? <EditProfile/>
                    : <GridItem pl="2" bg="green.300" area={'main'}>
                    <Button colorScheme={'whiteAlpha'} onClick={profileSettingsHandler}>Profile Settings</Button>
                </GridItem>}

            </Grid>
        </>
    )
}

export default ProfilePage