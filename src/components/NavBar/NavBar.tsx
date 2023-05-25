import React, { PropsWithChildren, useState } from 'react'
import { Flex, Grid, GridItem, Icon, Link, VStack } from '@chakra-ui/react'

import { NextPage } from 'next'
import { useRouter } from 'next/router'
import Home from '@/assets/Image/NavBar/Home'
import Bookmark from '@/assets/Image/NavBar/Bookmark'
import Trending from '@/assets/Image/NavBar/Trending'
import Account from '@/assets/Image/NavBar/Account'
import LogOut from '@/assets/Image/NavBar/LogOut'
import { CreatePost } from "@/module/create-post-module/CreatePost";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";


const NavBar: NextPage<PropsWithChildren> = ({children}) => {
  const {push} = useRouter()

  return (
    <Grid
      w={'100%'}
      templateAreas={`
                  "nav main"
                  "nav main"`}
      gridTemplateColumns={'220px 1fr'}
      gap="1"
      color="blackAlpha.700"
      fontWeight="bold"
      position={'relative'}
    >

      <GridItem marginLeft={'40px'} area={'nav'} h="95vh" borderRight={'2px #171717 solid'}
                position={'fixed'} w={'220px'}>
        <Flex direction={'column'} gap={'15px'} alignItems={'flex-start'} h={'100%'}
              justifyContent={'space-around'} color={'white'}>
          <VStack mt={'72px'} spacing={50} alignItems={'flex-start'}>
            <Link display={'flex'} alignItems={'center'} cursor={'pointer'}>
              <Icon as={Home} w={'25px'} h={'25px'} mr={15}/>Home
            </Link>
            <CreatePost/>
            <Link display={'flex'} alignItems={'center'} cursor={'pointer'} onClick={() => push('/')}>
              <Icon as={Account} w={'25px'} h={'25px'} mr={15}/>My Profile
            </Link>
          </VStack>
          <VStack spacing={50} alignItems={'flex-start'}>
            <Link display={'flex'} alignItems={'center'} cursor={'pointer'}>
              <Icon as={Trending} w={'25px'} h={'25px'} mr={15}/>Statistics
            </Link>
            <Link display={'flex'} alignItems={'center'} cursor={'pointer'}>
              <Icon as={Bookmark} w={'25px'} h={'25px'} mr={15}/>Favorites
            </Link>
          </VStack>
          <Link display={'flex'} alignItems={'center'} cursor={'pointer'}>
            <Icon as={LogOut} w={'25px'} h={'25px'} mr={15}/>Logout
          </Link>
        </Flex>
      </GridItem>

      <GridItem pl="2" area={'main'}>
        {children}
      </GridItem>

    </Grid>
  )
}

export default NavBar