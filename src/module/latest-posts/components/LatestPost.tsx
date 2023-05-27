import React, { FC } from 'react'

import Image from 'next/image'
import { Post } from "@/module/latest-posts/api/latest-posts-api";


interface Props {
  post: Post
  onPostClick: (id: number) => void
}

export const LatestPost: FC<Props> = ({ post, onPostClick }) => {
  return (
    <div className="aspect-square relative" key={post.id} onClick={() => onPostClick(post.id)}>
      <Image
        src={post.images[0]?.versions.huge.url}
        width={post.images[0]?.versions.huge.width}
        height={post.images[0]?.versions.huge.height}
        alt=""
        className="w-full h-full object-cover cursor-pointer"
      />
    </div>
  )
}
