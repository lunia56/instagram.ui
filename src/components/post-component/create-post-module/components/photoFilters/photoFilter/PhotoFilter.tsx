import React from 'react'

import Image from 'next/image'

type PropsType = {
  imageSrc: string
  filter: string
  filterName: string
  onFilterClick: (filter: string) => void
}

export const PhotoFilter = ({
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
      paddingTop: "5px",
      paddingBottom: "5px",
      paddingLeft: "15px",
      paddingRight: "15px"
    }} onClick={onFilterClickHandler}>
      <Image
        alt={`filter ${filter}`}
        src={imageSrc}
        style={{filter: filter}}
        width={108}
        height={108}
      />
      <div style={{fontSize: "16px", marginTop: "6px",}}>{filterName}</div>
    </div>
  )
}
