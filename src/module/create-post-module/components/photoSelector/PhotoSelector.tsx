import React, { ChangeEvent, useRef, useState } from 'react'
import { v1 } from "uuid";

import ImagePlaceholder from 'next/image'
import Image from 'next/image'

import plusAdd from '@/assets/Image/modal/plus-square.svg'
import placeholder from '@/assets/Image/modal/img-placeholder.png'
import { GlobalButton } from "@/components/Modal/CreatePost/buttons/GlobalButton";
import { IPhoto, useImageSelector } from "@/store/storeSelectorPhoto";

type PropsType = {
  cropEditorModule?: (isModalOpen: boolean) => void
  modalWithContent?: (isModalOpen: boolean) => void
  maxImageSize?: number
  showButton?: boolean
  placeholderShow?: boolean
  onAdd?: (photos: IPhoto[]) => void
}

export const PhotoSelector = ({
                                cropEditorModule,
                                modalWithContent,
                                maxImageSize,
                                showButton = true,
                                placeholderShow = true,
                                onAdd,
                              }: PropsType) => {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [error, setError] = useState('')
  const {setImageSelector} = useImageSelector()

  // const checkImageSize = (file: File, maxImageSize: number, onSuccessSetFile: any, array: any) => {
  //   if (file.size <= maxImageSize * 1024 * 1024) {
  //     onSuccessSetFile(file, array)
  //   } else {
  //     setError(`Image size should not be more than ${maxImageSize} MB`)
  //
  //     return
  //   }
  // }

  const onSuccessAddFileToArray = (file: File, newImagesArray: IPhoto[]) => {
    const url = URL.createObjectURL(file)

    newImagesArray.push({url, file, id: v1(), name: file.name, type: file.type, size: file.size})
  }

  const onFileSelectChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files

    if (files && files.length > 0) {
      const newImages: IPhoto[] = []

      for (let i = 0; i < files.length; i++) {
        const file = files[i]

        onSuccessAddFileToArray(file, newImages)

        // if (maxImageSize) {
        //   checkImageSize(file, maxImageSize, onSuccessAddFileToArray, newImages)
        // } else {
        //   onSuccessAddFileToArray(file, newImages)
        // }
      }

      setImageSelector(newImages)
      if (onAdd && typeof onAdd === 'function') {
        onAdd(newImages)
      }
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
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
    }}>
      <div>
        {placeholderShow && (
          <ImagePlaceholder src={placeholder} alt={'placeholder'} width={300} height={300}/>
        )}
      </div>
      <input
        type="file"
        accept="image/jpeg,image/png, image/jpeg"
        ref={fileInputRef}
        style={{display: "none"}}
        id="fileInput"
        onChange={onFileSelectChange}
        multiple
      />
      {showButton ? (
        <>
          <div style={{
            color: "#DC2626",
            marginTop: "20px"
          }}>{error}</div>
          <GlobalButton
            type={'button'}
            callback={onSelectClick}
          >
            Select from computer
          </GlobalButton>
        </>
      ) : (
        <Image
          style={{
            fontSize: "16px",
            marginTop: "60px",
            marginBottom: "60px",
            marginLeft: "60px",
            marginRight: "60px",
            fontWeight: "600"
          }}
          onClick={onSelectClick}
          src={plusAdd}
          width={50}
          height={50}
          alt="add"
        />
      )}
    </div>
  )
}
