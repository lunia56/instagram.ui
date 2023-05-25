import React, { FC } from 'react'
import { RightDescription } from "@/module/create-post-module/components/description-add/rightDescription";

type AddPublicationType = {
  imageUrl: string
  location: boolean
  callback?: () => void
}

export const AddPublication: FC<AddPublicationType> = ({imageUrl, location, callback}) => {

  return (
    <div style={{display: 'flex', flexWrap: "wrap"}}>
      <div style={{width: "436px"}}>
        <img
          src={imageUrl}
          alt="photo"
          style={{
            width: '434px',
          }}
          id={'image-publication'}
        />
      </div>
      <RightDescription location={location} callback={callback} />
    </div>
  )
}
