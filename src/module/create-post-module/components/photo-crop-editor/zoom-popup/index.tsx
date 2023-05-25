import React, { ChangeEvent, FC, MutableRefObject, useEffect, useRef, useState } from 'react'

import Image from 'next/image'

import maximize from '@/assets/Image/modal/createPost/maximize.svg'

type PropsType = {
  zoom: number
  setZoom: (zoom: number) => void
}

export const ZoomPopup: FC<PropsType> = ({zoom, setZoom}) => {
  const [isOpen, setIsOpen] = useState(false)
  const zoomRef = useRef() as MutableRefObject<HTMLDivElement>

  const onZoomChange = (event: ChangeEvent<HTMLInputElement>) => {
    const scale = parseFloat(event.target.value)

    setZoom(scale)
  }

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (zoomRef.current && !e.composedPath().includes(zoomRef.current)) {
        setIsOpen(false)
      }
    }

    document.body.addEventListener('click', handleClickOutside)

    return () => document.body.removeEventListener('click', handleClickOutside)
  }, [])

  return (
    <div ref={zoomRef}>
      <div
        onClick={() => setIsOpen(true)}
        style={{
          backgroundColor: "#1F2937",
          padding: "0.25rem",
          borderRadius: "0.125rem",
          opacity: "0.8",
          position: "relative",
          cursor: "pointer"
        }}
      >
        <Image src={maximize} alt={'zoom'} width={24} height={24}/>
      </div>

      {isOpen && (
        <div
          style={{
            position: "absolute",
            backgroundColor: "#1F2937",
            padding: "0.5rem",
            paddingTop: "0.75rem",
            borderRadius: "0.125rem",
            opacity: "0.8",
            top: "-3.5rem",
            left: "2.75rem"
          }}>
          <input
            style={{cursor: "pointer"}}
            type="range"
            min="1"
            max="2"
            step="0.01"
            value={zoom}
            onChange={onZoomChange}
          />
        </div>
      )}
    </div>
  )
}
