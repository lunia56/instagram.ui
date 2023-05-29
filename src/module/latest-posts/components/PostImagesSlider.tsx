import { FC } from 'react'

import { Navigation, Pagination } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'

import { PostImagesSlide } from '@/modules/post-modules/latest-posts/components/PostImagesSlide'
import { useGetPost } from '@/modules/post-modules/latest-posts/hooks/useGetPost'
import { useUserStore } from '@/store'

interface IPostImagesSlider {
  showIconDelete?: boolean
}

export const PostImagesSlider: FC<IPostImagesSlider> = ({ showIconDelete }) => {
  const { postId } = useUserStore()

  const { post, isLoading, isFetching } = useGetPost(postId)

  return (
    <>
      {isLoading || isFetching ? (
        <div className="animate-pulse h-full bg-slate-200"></div>
      ) : (
        <Swiper
          className="h-full"
          modules={[Navigation, Pagination]}
          navigation
          pagination={{ clickable: true }}
        >
          {post?.images.map(image => (
            <SwiperSlide key={image.uploadId}>
              <PostImagesSlide
                showIconDelete={showIconDelete}
                postId={post.id}
                image={image}
                description={post.description}
                totalImagesCount={post.images.length}
                ownerId={post.ownerId}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </>
  )
}
