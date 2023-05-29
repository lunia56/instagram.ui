import React from 'react'

import Image from 'next/image'

import placeholder from '../../../assets/Image/modal/img-placeholder.png'

type PropsType = {
  src?: string
  alt: string
  height?: number
  width?: number
  className?: string
}
export const Avatar = ({ src, alt, height = 192, width = 192, className }: PropsType) => {
  return (
    <Image
      src={src ? src : placeholder}
      alt={alt}
      className={`rounded-[50%] ${className}`}
      width={width}
      height={height}
    />
  )
}
