import React, { FC } from 'react'

import { useUploadPost } from "@/module/create-post-module/components/hooks/useAddPostImgMutation";
import { CreatePostModal } from "@/module/create-post-module/components/create-post-modal/CreatePostModal";
import { AddPublication } from "@/module/create-post-module/components/description-add/add-publication";
import { clearDatabase } from "@/components/common/indexedDb/clearDatabase";
import { IMAGES } from "@/module/create-post-module/constants/db-image-names";
import { useUserStore } from "@/store/userStore";
import { usePostStore } from "@/store/postStore";
import { useQueryClient } from "@tanstack/react-query";


interface IAddFullPost {
  isModalOpen: boolean
  storeAddFullPostModule: (isModalOpen: any) => void
  callback?: () => void
  filterEditorModule: (isModalOpen: boolean) => void
  onClose: () => void
  setIsDraftModalOpen: (isModalOpen: boolean) => void
}


export const AddFullPost: FC<IAddFullPost> = ({
                                                isModalOpen,
                                                storeAddFullPostModule,
                                                filterEditorModule,
                                                onClose,
                                                setIsDraftModalOpen,
                                              }) => {

  const {postPhotos, clearPostPhotos, postDescription, isLoadedFromDB} = usePostStore()
  const {userId} = useUserStore()
  let imageUrl = postPhotos[0].filteredPhoto

  const onSuccessPostSent = () => {
    if (isLoadedFromDB) {
      clearDatabase({
        dbName: IMAGES.DB_NAME,
        storeName: IMAGES.STORE_NAME,
        keyPath: IMAGES.KEY_PATH,
      })
    }
    clearPostPhotos()
    onClose()
    storeAddFullPostModule(false)
  }

  const {mutate: addPhotoToThePost, isLoading} = useUploadPost(onSuccessPostSent, userId!)

  const onCloseClick = () => {
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

    const blobUrl = imageUrl as RequestInfo | URL

    fetch(blobUrl)
      .then(response => response.blob())
      .then((blob: Blob) => {
        formData.append('files', blob) // add file to Form data

        formData.append('description', postDescription) // add description to Form data
        addPhotoToThePost(formData)
      })
  }

  if (isLoading) return <div>Loading</div>

  return (
    <>
      <CreatePostModal
        isOpen={isModalOpen}
        onBackClick={onBackClick}
        onClose={onCloseClick}
        title={'Publication'}
        onBtnClick={addAllPost}
        showBackArrow={true}
        variant={'Publish'}
      >
        <AddPublication location={true} imageUrl={imageUrl}/>
      </CreatePostModal>
    </>
  )
}
