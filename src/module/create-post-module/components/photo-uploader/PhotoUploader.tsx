import React, { useEffect, useState } from 'react'
import {
  useStoreAddPostModal,
  useStoreCropEditorModal,
  useStoreWithContentModal
} from "@/components/Modal/store/store";
import { usePostStore } from "@/store/postStore";
import { ModalWithContent } from "@/components/Modal/CreatePost/modalWithContent/ModalWithContent";
import { PhotoSelector } from "@/module/create-post-module/components/photoSelector/PhotoSelector";
import { GlobalButton } from "@/components/Modal/buttons/GlobalButton";
import { getItemFromDatabase } from "@/module/create-post-module/utils/getImageFromDatabase";
import { IMAGES } from "@/module/create-post-module/constants/db-image-names";
import { countData } from "@/components/common/indexedDb/countData";
import { useRouter } from "next/router";

type PropsType = {
  setSelectedPhoto: (photo: string | File | null) => void
}
export const PhotoUploader = ({setSelectedPhoto}: PropsType) => {
  const [imageDbCount, setImageDbCount] = useState(0)

  const modalWithContent = useStoreWithContentModal()
  const useStoreAddFullPostModal = useStoreAddPostModal()
  const cropEditorModal = useStoreCropEditorModal()
  const {setPhotoFromDB, clearPostPhotos, setUploadId} = usePostStore()

  const {replace, pathname} = useRouter()

  const onSetSelectedPhotoClick = (file: any) => {
    setSelectedPhoto(file)
    setUploadId()
  }
  const onSuccessOpenDraft = async (data: any) => {
    let filteredPhoto = URL.createObjectURL(data.filteredPhoto)
    let croppedPhoto = URL.createObjectURL(data.croppedPhoto)
    const {uploadId, description, cropSize} = data

    await setPhotoFromDB(uploadId, croppedPhoto, filteredPhoto, description, cropSize)
    useStoreAddFullPostModal.setIsModalOpen(true)
  }
  const onOpenDraftClick = async () => {
    clearPostPhotos()

    await getItemFromDatabase({
      onSuccess: onSuccessOpenDraft,
      keyPath: IMAGES.KEY_PATH,
      storeName: IMAGES.STORE_NAME,
      dbName: IMAGES.DB_NAME,
    })
    modalWithContent.setIsModalOpen(false)
  }

  const onCloseClick = () => {
    modalWithContent.setIsModalOpen(false)
    replace(pathname)
  }

  const checkCountDB = async () => {
    const count = await countData(IMAGES.DB_NAME, IMAGES.STORE_NAME)

    setImageDbCount(count)
  }

  useEffect(() => {
    checkCountDB()
  }, [modalWithContent.isModalOpen])

  return (
    <ModalWithContent
      isOpen={modalWithContent.isModalOpen}
      onClose={onCloseClick}
      title={'Add photo'}
    >
      <>
        <PhotoSelector
          cropEditorModule={cropEditorModal.setIsModalOpen}
          modalWithContent={modalWithContent.setIsModalOpen}
          setSelectedPhoto={onSetSelectedPhotoClick}
        />
        {imageDbCount > 0 && (
          <GlobalButton type={'button'} callback={onOpenDraftClick}>
            Open draft
          </GlobalButton>
        )}
      </>
    </ModalWithContent>
  )
}
