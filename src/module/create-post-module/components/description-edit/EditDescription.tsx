import React, { FC, memo } from 'react'
import { AddPublication } from "@/module/create-post-module/components/description-add/add-publication";


interface IEditDescription {
  imageUrl: string
  text: string
  setText: (newText: string) => void
  location: boolean
  callback: () => void
}

// eslint-disable-next-line react/display-name
export const EditDescription: FC<IEditDescription> = memo(
  ({ imageUrl, text, setText, location, callback }) => {
    return (
      <AddPublication
        imageUrl={imageUrl}
        text={text}
        setText={setText}
        location={location}
        callback={callback}
      />
    )
  }
)
