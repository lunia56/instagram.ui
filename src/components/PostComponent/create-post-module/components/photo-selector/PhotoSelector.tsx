import React, { useRef } from 'react'

import ImagePlaceholder from 'next/image'

import placeholder from '@/assets/Image/modal/img-placeholder.png'
import { GlobalButton } from "@/components/Modal/buttons/GlobalButton";

type PropsType = {
  setSelectedPhoto: (file: File) => void
}

export const PhotoSelector = ({setSelectedPhoto}: PropsType) => {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const onFileSelectChange = (event: any) => {
    if (event.target.files && event.target.files.length) {
      const file = event.target.files[0]

      setSelectedPhoto(file)
    }
  }
  const onSelectClick = () => {
    // @ts-ignore
    document.getElementById('fileInput').click()
  }

  // const onSelectClick = (): void => {
  //   const fileInput = document.getElementById('fileInput') as HTMLInputElement;
  //   fileInput.click();
  // }

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
        className={`text-[16px] my-[60px] mx-[60px] font-semibold`}
        callback={onSelectClick}
      >
        Select from computer
      </GlobalButton>
    </div>
  )
}
