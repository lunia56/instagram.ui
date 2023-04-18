import React, {useState} from 'react'
import {Box, Button, HStack, Text, VStack, Image, Avatar, Container, Wrap, WrapItem} from '@chakra-ui/react'
import {useRouter} from 'next/router'
import {getLayout} from '@/components/Layout/BaseLayout'
import {NextPageWithLayout} from '@/pages/_app'

const ProfilePage: NextPageWithLayout = () => {
    const {push} = useRouter()


    return (
        <Container centerContent maxW="90%"  mt={'40px'}>
            <HStack spacing={'15px'} mt={'20px'}>
                <Avatar src={''} size={'lg'} h={'192px'} w={'192px'}/>
                <VStack alignItems={'flex-start'} spacing={25}>
                    <HStack justifyContent={'space-between'}  w={'100%'}>
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
                            <Text>Subscribers</Text>
                        </VStack>
                        <VStack>
                            <Text>кол-во публикация</Text>
                            <Text>Publications</Text>
                        </VStack>
                    </HStack>
                    <Text> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Culpa cupiditate earum harum hic
                        magni molestiae omnis praesentium quas reiciendis tenetur.</Text>
                </VStack>
            </HStack>
            <Wrap spacing={'20px'} mt={'20px'}>
                <WrapItem h={'230px'} w={'230px'} bg={'green.700'}>

                </WrapItem>
                <WrapItem h={'230px'} w={'230px'} bg={'green.900'}>

                </WrapItem>
                <WrapItem h={'230px'} w={'230px'} bg={'green.100'}>

                </WrapItem>
                <WrapItem h={'230px'} w={'230px'} bg={'green.300'}>

                </WrapItem>
                <WrapItem h={'230px'} w={'230px'} bg={'green.500'}>

                </WrapItem>
                <WrapItem h={'230px'} w={'230px'} bg={'green.400'}>

                </WrapItem>
                <WrapItem h={'230px'} w={'230px'} bg={'green.700'}>

                </WrapItem>
                <WrapItem h={'230px'} w={'230px'} bg={'green.700'}>

                </WrapItem>
                <WrapItem h={'230px'} w={'230px'} bg={'green.700'}>

                </WrapItem>
                <WrapItem h={'230px'} w={'230px'} bg={'green.700'}>

                </WrapItem>
            </Wrap>
        </Container>
    )
}
ProfilePage.getLayout = getLayout
export default ProfilePage