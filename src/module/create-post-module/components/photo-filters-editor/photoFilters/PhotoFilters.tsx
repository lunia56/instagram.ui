import React from 'react'
import {
  PhotoFilterItem
} from "@/module/create-post-module/components/photo-filters-editor/photoFilters/photoFilter/PhotoFilterItem";
import { IPhoto } from "@/store/storeSelectorPhoto";


type FilterType = {
  id: string | number
  filter: string
  filterName: string
}

const filters: FilterType[] = [
  {
    id: '0',
    filter: 'none',
    filterName: 'Normal',
  },
  {
    id: '1',
    filter: 'contrast(110%) brightness(110%) saturate(130%)',
    filterName: '1977',
  },
  {
    id: '2',
    filter: 'contrast(90%) brightness(110%) saturate(150%) hue-rotate(-10deg)',
    filterName: 'Amaro',
  },
  {
    id: '3',
    filter: 'contrast(150%) saturate(110%)',
    filterName: 'LoFi',
  },
  {
    id: '4',
    filter: 'contrast(120%) saturate(125%)',
    filterName: 'Clarendon',
  },
  {
    id: '5',
    filter: 'contrast(95%) brightness(95%) saturate(150%) sepia(25%)',
    filterName: 'Maven',
  },
  {
    id: '6',
    filter: 'contrast(85%) brightness(110%) saturate(75%) sepia(22%)',
    filterName: 'Reyes',
  },
  {
    id: '7',
    filter: 'contrast(110%) brightness(110%) sepia(30%) grayscale(100%)',
    filterName: 'Inkwell',
  },
  {
    id: '8',
    filter: 'sepia(90%)',
    filterName: 'Sepia',
  },
]

type PropsType = {
  imageSrc: IPhoto
  setFilter: (filter: string) => void
}

export const PhotoFilters = ({imageSrc, setFilter}: PropsType) => {
  const onFilterClick = (filter: string) => {
    setFilter(filter)
  }

  const filtersList = filters.map(({id, filter, filterName}) => {
    return (
      <PhotoFilterItem
        key={id}
        imageSrc={imageSrc}
        filterName={filterName}
        filter={filter}
        onFilterClick={onFilterClick}
      />
    )
  })

  return <div style={{
    display: "flex",
    justifyContent: "center",
  }}>{filtersList}</div>
}
