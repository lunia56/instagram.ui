import {React, useState} from 'react'
import { Avatar, Button, Container, HStack, Text, VStack } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { NextPageWithLayout } from '@/pages/_app'
import ProfileContent from '@/components/Profile/ProfileContent'
import { getBaseLayout } from "@/components/Layout/BaseLayout";
import { LatestPosts } from "@/module/latest-posts/components/LatestPosts";
import ModalListSubscribers from "@/components/Modal/ModalListSubscribers/ModalListSubscribers";

const ProfilePage = () => {
    const {push} = useRouter()
    const [openSubscribers, setOpenSubscribers] = useState(false)


    return (
        <Container centerContent maxW="90%" textColor={"#ffff"}>
            <HStack spacing={'15px'} mt={'20px'}>
                <Avatar src={''} size={'lg'} h={'192px'} w={'192px'}/>
                <VStack alignItems={'flex-start'} spacing={25}>
                    <HStack justifyContent={'space-between'} w={'100%'}>
                        <Text>URL Profile</Text>
                        <Button colorScheme={'whiteAlpha'} onClick={() => push('/editProfile')}>Profile
                            Settings</Button>
                    </HStack>
                    <HStack spacing={'72px'} alignContent={'flex-start'}>
                        <VStack>
                            <Text>кол-во подписок</Text>
                            <Text>Subscription</Text>
                        </VStack>
                        <VStack>
                            <Text>кол-во подписчиков</Text>
                            <Button onClick={()=>setOpenSubscribers(!openSubscribers)}>Subscribers</Button>
                        </VStack>
                        <VStack>
                            <Text>кол-во публикация</Text>
                            <Text>Publications</Text>
                        </VStack>
                    </HStack>
                    <Text> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Culpa cupiditate earum harum hic
                        magni molestiae omnis praesentium quas reiciendis tenetur.</Text>
                    {openSubscribers && <ModalListSubscribers modalOnClick={() => setOpenSubscribers(false)} />}

                </VStack>
            </HStack>
            <LatestPosts />
        </Container>
    )
}
// ProfilePage.getLayout = getBaseLayout
export default ProfilePage