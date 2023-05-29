import React, { FC } from 'react'
import { RightDescription } from "@/module/create-post-module/components/description-add/rightDescription";
import { IPhoto } from "@/store/storeSelectorPhoto";

type AddPublicationType = {
  imageUrl: IPhoto
  location?: boolean
  callback?: () => void
  text?: string
  setText?: (newText: string) => void
}


export const AddPublication: FC<AddPublicationType> = ({imageUrl}) => {

  return (
    <div style={{
      display: "flex",
      flexWrap: "wrap",
      width: "972px",
      justifyContent: 'space-between',
    }}>
      <div style={{width: "436px"}}>
        <img
          src={String(imageUrl.finalUrl)}
          alt="photo"
          style={{
            width: '434px',
          }}
          id={'image-publication'}
        />
      </div>
    </div>
  )
}
