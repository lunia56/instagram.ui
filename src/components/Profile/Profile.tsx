import React from 'react'
import {Button, Grid, GridItem} from '@chakra-ui/react'
import {useRouter} from 'next/router'

const ProfilePage = () => {

    const {push} = useRouter()


const profileSettingsHandler = ()=>{
  return   push('/')
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

                <GridItem pl="2" bg="pink.300" area={'nav'} h="95vh" >
                    Nav
                </GridItem>
                <GridItem pl="2" bg="green.300" area={'main'} >
                    <Button colorScheme={"whiteAlpha"} onClick={profileSettingsHandler}>Profile Settings</Button>
                </GridItem>

            </Grid>
        </>
    )
}

export default ProfilePage