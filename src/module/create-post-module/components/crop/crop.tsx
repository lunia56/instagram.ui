import React, { FC } from 'react'

import { Rect } from '@popperjs/core'
import ReactCrop, { Point } from 'react-easy-crop'

import { IPhoto } from '@/store/storeSelectorPhoto'

interface ICropEditor {
  src: IPhoto
  zoom: number
  aspect?: number
  crop: Point
  onCropChange: (location: Point) => void
  onZoomChange: (zoom: number) => void
  onCropComplete: (croppedArea: Rect, croppedAreaPixels: Rect) => void
  style?: {
    containerStyle?: React.CSSProperties | undefined
    mediaStyle?: React.CSSProperties | undefined
    cropAreaStyle?: React.CSSProperties | undefined
  }
}

export const Crop: FC<ICropEditor> = ({
  src,
  onCropComplete,
  crop,
  onCropChange,
  onZoomChange,
  zoom,
  aspect,
  style,
}) => {
  return (
    <>
      <ReactCrop
        image={String(src.url)}
        objectFit={'contain'}
        cropShape={'rect'}
        style={style}
        crop={crop}
        zoom={zoom}
        aspect={aspect}
        onCropChange={onCropChange}
        onCropComplete={onCropComplete}
        onZoomChange={onZoomChange}
        zoomWithScroll={true}
      />
    </>
  )
}
