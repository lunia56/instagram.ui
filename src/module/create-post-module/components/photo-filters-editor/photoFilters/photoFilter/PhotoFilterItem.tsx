import React from 'react'

import Image from 'next/image'
import { IPhoto } from "@/store/storeSelectorPhoto";

type PropsType = {
  imageSrc: IPhoto
  filter: string
  filterName: string
  onFilterClick: (filter: string) => void
}

export const PhotoFilterItem = ({ imageSrc, filter, filterName, onFilterClick }: PropsType) => {
  const onFilterClickHandler = () => {
    onFilterClick(filter)
  }

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      paddingLeft: "15px",
      paddingRight: "15px",
      paddingTop: "5px",
      paddingBlock: "5px"
    }} onClick={onFilterClickHandler}>
      <img
        alt={`filter ${filter}`}
        src={String(imageSrc.filteredUrl)}
        style={{ filter: filter }}
        width={95}
        height={95}
      />
      <div style={{color: "#E5E7EB",
        fontSize: "16px",
        marginTop: "6px"}}>{filterName}</div>
    </div>
  )
}
