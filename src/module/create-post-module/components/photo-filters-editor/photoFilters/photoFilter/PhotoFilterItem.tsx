import React from 'react'

import Image from 'next/image'

type PropsType = {
  imageSrc: string
  filter: string
  filterName: string
  onFilterClick: (filter: string) => void
}

export const PhotoFilterItem = ({
                                  imageSrc = '',
                                  filter = '',
                                  filterName,
                                  onFilterClick,
                                }: PropsType) => {
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
      <Image
        alt={`filter ${filter}`}
        src={imageSrc}
        style={{filter: filter}}
        width={108}
        height={108}
      />
      <div style={{color: "#E5E7EB",
        fontSize: "16px",
        marginTop: "6px"}}>{filterName}</div>
    </div>
  )
}
