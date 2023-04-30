import React, { useCallback, useEffect, useState } from 'react'

import Cropper, { Area } from 'react-easy-crop'
// eslint-disable-next-line import/no-unresolved
import { Point } from 'react-easy-crop/types'
import getCroppedImg from "@/components/PostComponent/create-post-module/components/utils/canvasUtils";


type PropsType = {
  image: string | File | null
  setSelectedPhoto: (photo: string | File | null) => void
}

export const PhotoEditor = ({image, setSelectedPhoto}: PropsType) => {
  const [crop, setCrop] = useState<Point>({x: 0, y: 0})
  const [zoom, setZoom] = useState(1)
  const [aspect, setAspect] = useState<number>(4 / 5)
  const [imageUrl, setImageUrl] = useState<string | ArrayBuffer | null>(null)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null)
  const onCropComplete = useCallback((croppedArea: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels)
  }, [])

  const onZoomChange = (event: any) => {
    const scale = parseFloat(event.target.value)

    setZoom(scale)
  }

  const saveCropImage = async () => {
    try {
      const croppedImage = await getCroppedImg(String(imageUrl), croppedAreaPixels as Area)

      setSelectedPhoto(String(croppedImage))
    } catch (e) {
      console.error(e)
    }
  }

  useEffect(() => {
    saveCropImage()
  }, [croppedAreaPixels])

  useEffect(() => {
    const objectUrl = URL.createObjectURL(image as File)

    setImageUrl(objectUrl)
  }, [])

  return (
    <>
      <div style={{height: "500px", position: "relative"}}>
        <Cropper
          image={String(imageUrl)}
          crop={crop}
          zoom={zoom}
          aspect={aspect}
          onCropChange={setCrop}
          onCropComplete={onCropComplete}
          onZoomChange={setZoom}
          zoomWithScroll={false}
        />
        <div style={{
          display: 'flex',
          columnGap: "0.75rem",
          position: "absolute",
          bottom: "3px",
          left: "3px",
          cursor: "pointer"
        }}>
          <div onClick={() => setAspect(1)}>1:1</div>
          <div onClick={() => setAspect(4 / 5)}>4:5</div>
          <div onClick={() => setAspect(16 / 9)}>16:9</div>
        </div>
        <input
          type="range"
          min="1"
          max="2"
          step="0.01"
          value={zoom}
          onChange={onZoomChange}
          style={{position: "absolute", right: "3px", bottom: "3px"}}
        />
      </div>
    </>
  )
}
