import React, { useCallback } from 'react'

import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

import { Rect } from '@popperjs/core'
import Slider from 'react-slick'

import { CreatePostModal } from './../create-post-modal/CreatePostModal'
import { CropPopup } from './crop-popup'
import getCroppedImg from './utils/canvasUtils'
import { ZoomPopup } from './zoom-popup'
import { IPhoto, useImageSelector } from "@/store/storeSelectorPhoto";
import { Crop } from "@/module/create-post-module/components/crop/crop";
import { PhotoSelector } from "@/module/create-post-module/components/photoSelector/PhotoSelector";
import { Point } from "react-easy-crop";
import s from "./CropEditor.module.css"

type PropsType = {
  isModalOpen: boolean
  filterEditorModule: (isModalOpen: boolean) => void
  cropEditorModule: (isModalOpen: boolean) => void
  onClose: () => void
}

export const CropEditor = ({
                             isModalOpen,
                             filterEditorModule,
                             cropEditorModule,
                             onClose,
                           }: PropsType) => {
  const settings = {
    customPaging: function (index: number) {
      const photo = imagesSelector[index]
      let imageUrl = photo.url

      if (typeof imageUrl !== 'string' || imageUrl.startsWith('blob:')) {
        imageUrl = URL.createObjectURL(photo.file)
      }

      return (
        <a>
          <img style={{
            width: "68px",
            height: "58px",
            objectFit: "cover"
          }} src={String(imageUrl)} alt={photo.name}/>
        </a>
      )
    },
    dots: true,
    swipe: false,
    arrows: true,
    dotsClass: 'slick-dots slick-thumb',
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  }
  const handleAddPhoto = (photos: IPhoto[]) => {
    const duplicatePhotos = photos.filter(photo =>
      imagesSelector.some(item => item.url === photo.url)
    )

    if (duplicatePhotos.length === 0) {
      const newImagesSelector = imagesSelector.concat(photos)

      setImageSelector(newImagesSelector)
    }
  }

  const {
    imagesSelector,
    setCropForImage,
    setImageSelector,
    setZoomForImage,
    setAspectForImage,
    setCroppedAreaPixelsForImage,
  } = useImageSelector()
  const onCropComplete = useCallback((id: string, croppedArea: Rect, croppedAreaPixels: Rect) => {
    setCroppedAreaPixelsForImage(id, croppedArea, croppedAreaPixels)
  }, [])

  function handleCropChange(id: string, location: Point) {
    setCropForImage(id, location)
  }

  const handleZoomChange = (id: string, newZoom: number) => {
    setZoomForImage(id, newZoom)
  }

  const onCloseClick = () => {
    setImageSelector([])
    onClose()
  }

  const onNextClick = async () => {
    try {
      const updatedImages = await Promise.all(
        imagesSelector.map(async image => {
          const {croppedAreaPixels} = image.cropData || {}
          const {url} = image

          if (!url) {
            console.error(`Image with id "${image.id}" does not have crop data`)

            return image
          }

          const croppedImage = await getCroppedImg(url, croppedAreaPixels)

          return {
            ...image,
            filteredUrl: croppedImage as string,
          }
        })
      )

      setImageSelector(updatedImages)
      cropEditorModule(false)
      filterEditorModule(true)
    } catch (error) {
      console.error('Error updating images:', error)
    }
  }


  return (
    <CreatePostModal
      showBackArrow={true}
      variant={'Next'}
      isOpen={isModalOpen}
      title={'Cropping'}
      onClose={onCloseClick}
      onBackClick={onClose}
      onBtnClick={onNextClick}
    >
      <Slider {...settings}>
        {imagesSelector.map((e, key) => {
          return (
            <div className={s.cropEdit} key={e.id}>
              <Crop
                src={e}
                aspect={e.cropData?.aspect || 3 / 4}
                crop={e.cropData?.crop || {x: 0, y: 0}}
                onCropChange={location => handleCropChange(e.id, location)}
                zoom={e.cropData?.zoom || 1}
                onZoomChange={zoom => handleZoomChange(e.id, zoom)}
                onCropComplete={(croppedArea, croppedAreaPixels) =>
                  onCropComplete(e.id, croppedArea, croppedAreaPixels)
                }
              />
              <div style={{
                position: "absolute",
                bottom: "3rem",
                left: "3rem"
              }}>
                <ZoomPopup
                  zoom={e.cropData?.zoom || 1}
                  setZoom={zoom => handleZoomChange(e.id, zoom)}
                />
                <CropPopup setAspect={aspect => setAspectForImage(e.id, aspect)}/>
              </div>
            </div>
          )
        })}
      </Slider>
      <PhotoSelector onAdd={handleAddPhoto} showButton={false} placeholderShow={false}/>
    </CreatePostModal>
  )
}
