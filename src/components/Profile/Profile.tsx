import React, {useState} from 'react'
import {Box, Button, HStack, Text, VStack, Image, Avatar, Container, Wrap, WrapItem} from '@chakra-ui/react'
import {useRouter} from 'next/router'
import {getLayout} from '@/components/Layout/BaseLayout'
import {NextPageWithLayout} from '@/pages/_app'
import ProfileContent from '@/components/Profile/ProfileContent'
import ModalLogout from "@/components/Modal/ModalLogOut/ModalLogout";
import ModalListSubscribers from "@/components/Modal/ModalListSubscribers/ModalListSubscribers";

const ProfilePage: NextPageWithLayout = () => {
    const {push} = useRouter()
    const [openSubscribers, setOpenSubscribers] = useState(false)


    return (
        <Container centerContent maxW="90%">
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
            <ProfileContent/>
        </Container>
    )
}
ProfilePage.getLayout = getLayout
export default ProfilePage