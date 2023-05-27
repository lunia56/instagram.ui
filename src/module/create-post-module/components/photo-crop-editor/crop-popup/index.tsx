import React, { FC, useState, useRef, useEffect, MutableRefObject } from 'react'

import Image from 'next/image'

import expandOutline from '@/assets/Image/modal/createPost/expand-outline.svg'
import rectangle11 from '@/assets/Image/modal/createPost/Rectangle11.svg'
import rectangle169 from '@/assets/Image/modal/createPost/Rectangle169.svg'
import rectangle45 from '@/assets/Image/modal/createPost/Rectangle45.svg'

type PropsType = {
  setAspect: (aspect: number) => void
}

export const CropPopup: FC<PropsType> = ({setAspect}) => {
  const [isOpen, setIsOpen] = useState(false)
  const cropRef = useRef() as MutableRefObject<HTMLDivElement>

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (cropRef.current && !e.composedPath().includes(cropRef.current)) {
        setIsOpen(false)
      }
    }

    document.body.addEventListener('click', handleClickOutside)

    return () => document.body.removeEventListener('click', handleClickOutside)
  }, [])


  return (
    <div ref={cropRef}>
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
        <Image src={expandOutline} alt={'zoom'} width={24} height={24} color={'blue'}/>
      </div>
      {isOpen && (
        <div
          style={{
            position: "absolute",
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
            backgroundColor: "#1F2937",
            padding: "0.75rem",
            borderRadius: "0.125rem",
            opacity: "0.8",
            top: "-120px",
            color: "#F4F4F5",
            width: "100px",
            zIndex: "1"
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              cursor: "pointer",
            }}
            onClick={() => setAspect(1)}
          >
            1:1
            <Image src={rectangle11} alt={'rectangle11'} width={18} height={18}/>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              cursor: "pointer"
            }}
            onClick={() => setAspect(4 / 5)}
          >
            4:5
            <Image src={rectangle45} alt={'rectangle45'} width={18} height={26}/>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              cursor: "pointer"
            }}
            onClick={() => setAspect(16 / 9)}
          >
            16:9
            <Image src={rectangle169} alt={'rectangle169'} width={26} height={20}/>
          </div>
        </div>
      )}
    </div>
  )
}
