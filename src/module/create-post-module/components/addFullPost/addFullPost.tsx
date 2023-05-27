import React, { FC, useState } from 'react'

import { useUploadPost } from "@/module/create-post-module/components/hooks/useAddPostImgMutation";
import { CreatePostModal } from "@/module/create-post-module/components/create-post-modal/CreatePostModal";
import { AddPublication } from "@/module/create-post-module/components/description-add/add-publication";
import { useUserStore } from "@/store/userStore";
import { useImageSelector } from "@/store/storeSelectorPhoto";
import { RightDescription } from "@/module/create-post-module/components/description-add/rightDescription";

import { Navigation, Pagination } from 'swiper'
import { Swiper, SwiperSlide } from "swiper/react";


interface IAddFullPost {
  isModalOpen: boolean
  storeAddFullPostModule: (isModalOpen: any) => void
  filterEditorModule: (isModalOpen: boolean) => void
  onClose: () => void
  setIsDraftModalOpen: (isModalOpen: boolean) => void
  location: boolean
  callback?: () => void
}

export const AddFullPost: FC<IAddFullPost> = ({
                                                isModalOpen,
                                                storeAddFullPostModule,
                                                filterEditorModule,
                                                onClose,
                                                setIsDraftModalOpen,
                                                location,
                                                callback,
                                              }) => {
  const {userId} = useUserStore()
  const {imagesSelector, setDescription, description} = useImageSelector()

  const [postDescription, setPostDescription] = useState(description)
  const onSuccessPostSent = () => {
    onClose()
    setDescription('')
    storeAddFullPostModule(false)
  }

  const {mutate: addPhotoToThePost, isLoading} = useUploadPost(onSuccessPostSent, userId!)
  const onCloseClick = () => {
    setDescription(postDescription)
    setIsDraftModalOpen(true)
    onClose()
    storeAddFullPostModule(false)
  }

  const onBackClick = () => {
    filterEditorModule(true)
    storeAddFullPostModule(false)
  }

  const addAllPost = async () => {
    const formData = new FormData()

    await Promise.all(
      imagesSelector.map(async photo => {
        // @ts-ignore
        const response = await fetch(photo.finalUrl)
        const blob = await response.blob()

        formData.append('files', blob)
      })
    )

    formData.append('description', postDescription)
    addPhotoToThePost(formData)
  }

  if (isLoading) return <div>load</div>

  return (
    <CreatePostModal
      isOpen={isModalOpen}
      onBackClick={onBackClick}
      onClose={onCloseClick}
      title={'Publication'}
      onBtnClick={addAllPost}
      showBackArrow={true}
      variant={'Publish'}
    >
      <div style={{
        display: "flex",
        flexWrap: "wrap",
        flexDirection: "row",
      }}>
        <div
          style={{maxWidth: "438px"}}
        >
          <div>
            <Swiper
              style={{height: "100%"}}
              modules={[Navigation, Pagination]}
              navigation
              pagination={{clickable: true}}
            >
              {imagesSelector.map((image, ind) => {
                if (image) {
                  return (
                    <SwiperSlide key={ind}>
                      <AddPublication key={ind} location={true} imageUrl={image}/>
                    </SwiperSlide>
                  )
                } else {
                  return null
                }
              })}
            </Swiper>
          </div>
        </div>
        <div style={{maxWidth: "480px"}}>
          <RightDescription
            text={postDescription}
            callback={callback}
            setText={setPostDescription}
          />
        </div>
      </div>
    </CreatePostModal>
  )
}
