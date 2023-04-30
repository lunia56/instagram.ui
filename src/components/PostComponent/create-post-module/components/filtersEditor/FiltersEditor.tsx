import React, { useState } from 'react'
import { PhotoFilters } from "@/components/PostComponent/create-post-module/components/photoFilters/PhotoFilters";


type PropsType = {
  imageUrl: string
  // setSelectedPhoto: (photo: string | File | null) => void
  setFilteredImage: (filteredPhoto: any) => void
}

export const FiltersEditor = ({setFilteredImage, imageUrl}: PropsType) => {
  const [filter, setFilter] = useState('none')
  // const [filteredImage, setFilteredImage] = useState(selectedPhoto)

  const onFilterClick = async (filter: string) => {
    setFilter(filter)

    const image = new Image()

    image.src = imageUrl

    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')

    if (ctx) {
      ctx.filter = filter
      ctx.drawImage(image, 0, 0)
    }

    canvas.toBlob(blob => {
      if (blob) {
        const filteredImageUrl = URL.createObjectURL(blob)

        setFilteredImage(filteredImageUrl)
      }
    }, 'image/jpeg')
  }

  return (
    <div style={{display: "flex", flexWrap: "wrap"}}>
      <div style={{width: "436px"}}>
        <img src={imageUrl} alt="photo" style={{filter: filter}}/>
      </div>
      <PhotoFilters imageSrc={imageUrl} setFilter={onFilterClick}/>
    </div>
  )
}
