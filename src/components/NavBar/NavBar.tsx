import React, { PropsWithChildren, useState } from 'react'
import { Flex, Grid, GridItem, Icon, Link, VStack } from '@chakra-ui/react'

import { NextPage } from 'next'
import { useRouter } from 'next/router'

import CreateIcon from '@/assets/Image/NavBar/CreateIcon'
import Home from '@/assets/Image/NavBar/Home'
import Bookmark from '@/assets/Image/NavBar/Bookmark'
import Trending from '@/assets/Image/NavBar/Trending'
import Account from '@/assets/Image/NavBar/Account'
import LogOut from '@/assets/Image/NavBar/LogOut'
import { ModalWithContent } from "@/components/Modal/CreatePost/modalWithContent/ModalWithContent";
import { PhotoSelector } from "@/components/post-component/create-post-module/components/photo-selector/PhotoSelector";
import { ModalCreatePost } from "@/components/Modal/CreatePost/ModalCreatePost/ModalCreatePost";
import { FiltersEditor } from "@/components/post-component/create-post-module/components/filtersEditor/FiltersEditor";
import { PhotoEditor } from "@/components/post-component/create-post-module/components/PhotoEditor";


const NavBar: NextPage<PropsWithChildren> = ({children}) => {
  const {push} = useRouter()

  const [selectedPhoto, setSelectedPhoto] = useState<string | File | null>('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [openModal, setOpenModal] = useState('')
  const [filteredImage, setFilteredImage] = useState(selectedPhoto)

  const onAddPhotoClick = () => {
    setIsModalOpen(true)
  }

  const onCloseClick = () => {
    setSelectedPhoto('')
    setIsModalOpen(false)
  }

  return (
    <>
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

        <GridItem marginLeft={'40px'} bg="pink.300" area={'nav'} h="95vh" borderRight={'2px #171717 solid'}
                  position={'fixed'} w={'220px'}>
          <Flex direction={'column'} gap={'15px'} alignItems={'flex-start'} h={'100%'}
                justifyContent={'space-around'} color={'white'}>
            <VStack mt={'72px'} spacing={50} alignItems={'flex-start'}>
              <Link display={'flex'} alignItems={'center'} cursor={'pointer'}>
                <Icon as={Home} w={'25px'} h={'25px'} mr={15}/>Home
              </Link>
              <Link display={'flex'} alignItems={'center'} cursor={'pointer'} onClick={onAddPhotoClick}>
                <Icon as={CreateIcon} w={'25px'} h={'25px'} mr={15}/>Create
              </Link>
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
        <GridItem pl="2" bg="green.300" area={'main'}>
          {children}
        </GridItem>

      </Grid>

      <ModalWithContent isOpen={isModalOpen} onClose={onCloseClick} title={'Add photo'}>
        <PhotoSelector setSelectedPhoto={setSelectedPhoto}/>
      </ModalWithContent>

      {selectedPhoto && (
        <ModalCreatePost
          isOpen={isModalOpen}
          onClose={onCloseClick}
          onBackClick={() => setSelectedPhoto('')}
          title={'Cropping'}
          onBtnClick={() => setOpenModal('filters')}
        >
          <PhotoEditor image={selectedPhoto} setSelectedPhoto={setSelectedPhoto}/>
        </ModalCreatePost>
      )}
      {openModal === 'filters' && (
        <ModalCreatePost
          isOpen={isModalOpen}
          onClose={onCloseClick}
          title={'Filter'}
          onBackClick={() => setOpenModal('cropping')}
          onBtnClick={() => {
            setSelectedPhoto(String(filteredImage))
            setOpenModal('publication')
          }}
        >
          <FiltersEditor
            setFilteredImage={setFilteredImage}
            imageUrl={String(selectedPhoto)}
            // setSelectedPhoto={setSelectedPhoto}
          />
        </ModalCreatePost>
      )}
      {openModal === 'publication' && (
        <ModalCreatePost
          isOpen={isModalOpen}
          onClose={onCloseClick}
          title={'publication'}
          onBackClick={() => setOpenModal('filters')}
          onBtnClick={() => setOpenModal('publication')}
        >
          <img src={String(filteredImage)} alt="photo"/>
        </ModalCreatePost>
      )}
    </>
  )
}

export default NavBar