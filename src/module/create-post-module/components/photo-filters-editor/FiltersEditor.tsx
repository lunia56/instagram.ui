import React, { useState } from 'react'
import { CreatePostModal } from "@/module/create-post-module/components/create-post-modal/CreatePostModal";
import {
  PhotoFilters
} from "@/module/create-post-module/components/photo-filters-editor/photoFilters/PhotoFilters";

import { usePostStore } from "@/store/postStore";


type PropsType = {
  isModalOpen: boolean
  filterEditorModule: (isModalOpen: boolean) => void
  useStoreAddFullPostModule: (isModalOpen: boolean) => void
  cropEditorModule: (isModalOpen: boolean) => void
  onClose: () => void
  setIsDraftModalOpen: (isModalOpen: boolean) => void
}

export const FiltersEditor = ({
                                isModalOpen,
                                cropEditorModule,
                                filterEditorModule,
                                useStoreAddFullPostModule,
                                onClose,
                                setIsDraftModalOpen,
                              }: PropsType) => {
  const [filter, setFilter] = useState('none')

  const { postPhotos, setFilteredPhoto, isLoadedFromDB } = usePostStore()
  const imageUrl = postPhotos[0].croppedPhoto
  const { uploadId, cropSize } = postPhotos[0]
  const onFilterClick = async (filter: string) => {
    setFilter(filter)
  }

  const onBackClick = () => {
    cropEditorModule(true)
    filterEditorModule(false)
  }

  const onCloseClick = () => {
    saveFilteredPhoto()
    setIsDraftModalOpen(true)
    onClose()
    filterEditorModule(false)
  }

  const saveFilteredPhoto = () => {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    let image = document.getElementById('image-filtered')

    if (!ctx || !image) {
      return null
    }
    canvas.width = cropSize.width
    canvas.height = cropSize.height
    ctx.filter = filter

    //@ts-ignore
    ctx.drawImage(image, 0, 0)

    canvas.toBlob(blob => {
      //@ts-ignore
      const filteredImageUrl = URL.createObjectURL(blob)

      setFilteredPhoto(uploadId, String(filteredImageUrl))
    })
  }

  const onNextClick = () => {
    saveFilteredPhoto()
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useStoreAddFullPostModule(true)
    filterEditorModule(false)
  }


  return (
    <CreatePostModal
      showBackArrow={!isLoadedFromDB}
      onBackClick={onBackClick}
      variant={'Next'}
      isOpen={isModalOpen}
      onClose={onCloseClick}
      title={'Filter'}
      onBtnClick={onNextClick}
    >
      <div style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-between",
      }}>
        <div style={{width: "436px"}}>
          <img
            src={imageUrl}
            alt="photo"
            style={{filter: filter, width: '434px'}}
            id={'image-filtered'}
          />
        </div>
        <PhotoFilters imageSrc={imageUrl} setFilter={onFilterClick}/>
      </div>
    </CreatePostModal>
  )
}
