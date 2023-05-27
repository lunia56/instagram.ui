import React, { useState } from 'react'

import { CreatePostModal } from "@/module/create-post-module/components/create-post-modal/CreatePostModal";
import { PhotoFilters } from "@/module/create-post-module/components/photo-filters-editor/photoFilters/PhotoFilters";
import { FilterImage } from "@/module/create-post-module/components/photo-filters-editor/FilterImage";
import { usePostStore } from "@/store/postStore";
import getCroppedImg from "@/module/create-post-module/components/photo-crop-editor/utils/canvasUtils";
import { useImageSelector } from "@/store/storeSelectorPhoto";

import s from "./FilterEditor.module.css"
import { Navigation, Pagination} from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

type PropsType = {
  isModalOpen: boolean
  filterEditorModule: (isModalOpen: boolean) => void
  storeAddFullPostModule: (isModalOpen: boolean) => void
  cropEditorModule: (isModalOpen: boolean) => void
  onClose: () => void
  setIsDraftModalOpen: (isModalOpen: boolean) => void
}

export const FiltersEditor = ({
                                isModalOpen,
                                cropEditorModule,
                                filterEditorModule,
                                storeAddFullPostModule,
                                onClose,
                                setIsDraftModalOpen,
                              }: PropsType) => {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0)
  const {isLoadedFromDB} = usePostStore()
  const {imagesSelector, setFilterStyleForImage, setImageSelector} = useImageSelector()
  const handleFilterChange = (id: string, filterStyle: string) => {
    setFilterStyleForImage(id, filterStyle)
  }

  const setFilteredPhotos = async () => {
    try {
      const updatedImages = await Promise.all(
        imagesSelector.map(async image => {
          const { url } = image
          const { croppedAreaPixels } = image.cropData || {}
          const { filterStyle } = image.cropData || {}

          if (!url) {
            console.error(`Image with id "${image.id}" does not have crop data`)

            return image
          }

          const croppedImage = await getCroppedImg(url, croppedAreaPixels, filterStyle)

          return {
            ...image,
            finalUrl: croppedImage as string,
          }
        })
      )

      setImageSelector(updatedImages)
    } catch (error) {
      console.error('Error updating images:', error)
    }
  }
  const onNextClick = async () => {
    await setFilteredPhotos()
    storeAddFullPostModule(true)
    filterEditorModule(false)
  }

  const onBackClick = () => {
    cropEditorModule(true)
    filterEditorModule(false)
  }
  const onCloseClick = async () => {
    await setFilteredPhotos()
    await setIsDraftModalOpen(true)
    onClose()
    filterEditorModule(false)
  }

  const handleSlideChange = (swiper: any) => {
    const activeIndex = swiper.activeIndex

    setActiveSlideIndex(activeIndex)
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
      <div className={s.editor}>
        <div className={s.edit}>
          <Swiper
            style={{height: "100%"}}
            modules={[Navigation, Pagination]}
            navigation
            pagination={{clickable: true}}
            onSlideChange={handleSlideChange}
          >
            {imagesSelector.map((image, ind) => {
              if (image) {
                return (
                  <SwiperSlide key={ind}>
                    <FilterImage
                      key={ind}
                      filterStyle={image.cropData?.filterStyle! || 'none'}
                      srs={image}
                    />
                  </SwiperSlide>
                )
              } else {
                return null
              }
            })}
          </Swiper>
          <div>
            {imagesSelector.map((image, ind) => {
              if (ind === activeSlideIndex) {
                return (
                  <PhotoFilters
                    imageSrc={image}
                    key={ind}
                    setFilter={filter => handleFilterChange(image.id, filter)}
                  />
                )
              } else {
                return null
              }
            })}
          </div>
        </div>
      </div>
    </CreatePostModal>
  )
}
