import React, { useRef } from 'react'

import ImagePlaceholder from 'next/image'

import placeholder from '@/assets/Image/modal/img-placeholder.png'
import { GlobalButton } from "@/components/Modal/CreatePost/buttons/GlobalButton";

type PropsType = {
  setSelectedPhoto: (file: File) => void
  cropEditorModule?: (isModalOpen: boolean) => void
  modalWithContent?: (isModalOpen: boolean) => void
}

export const PhotoSelector = ({
                                setSelectedPhoto,
                                cropEditorModule,
                                modalWithContent,
                              }: PropsType) => {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const onFileSelectChange = (event: any) => {
    if (event.target.files && event.target.files.length) {
      const file = event.target.files[0]

      setSelectedPhoto(file)
      if (cropEditorModule && modalWithContent) {
        cropEditorModule(true)
        modalWithContent(false)
      }
    }
  }
  const onSelectClick = () => {
    //@ts-ignore
    document.getElementById('fileInput').click()
  }

  return (
    <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
      <div>
        <ImagePlaceholder src={placeholder} alt={'placeholder'} width={300} height={300}/>
      </div>
      <input
        type="file"
        accept="image/jpeg,image/png, image/jpeg"
        ref={fileInputRef}
        style={{display: "none"}}
        id="fileInput"
        onChange={onFileSelectChange}
      />
      <GlobalButton
        type={'button'}
        callback={onSelectClick}
      >
        Select from computer
      </GlobalButton>
    </div>
  )
}
