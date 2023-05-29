import React, { FC, memo } from 'react'
import s from "./FilterEditor.module.css"
import { IPhoto } from '@/store/storeSelectorPhoto'

interface IFiltersEditor {
  srs: IPhoto
  filterStyle: string
}

// eslint-disable-next-line react/display-name
export const FilterImage: FC<IFiltersEditor> = memo(({srs, filterStyle}) => {
  return (
    <div
      className={s.imageEditor}
    >
      <img
        src={String(srs.filteredUrl)}
        alt={srs.name}
        style={{filter: filterStyle, maxHeight: "499px"}}
        id={'image-filtered'}
      />
    </div>
  )
})
