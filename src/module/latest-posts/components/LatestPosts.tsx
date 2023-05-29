import React, { FC, useEffect, useState } from 'react'
import { useMeQuery } from "@/services/API-hooks";
import { useUserStore } from "@/store/userStore";
import { useGetLatestPosts } from "@/module/latest-posts/hooks/useGetLatestPosts";
import { LatestPostsLoader } from "@/module/latest-posts/components/LatestPostsLoader";
import { LatestPost } from "@/module/latest-posts/components/LatestPost";
import { PostModal } from "@/module/latest-posts/components/PostModal";
import { useInView } from "react-intersection-observer";


export const LatestPosts: FC = () => {
  const { data: me } = useMeQuery()
  const { setPostId } = useUserStore()
  const userId = me?.data?.userId
  const { isLoading, isSuccess, data, fetchNextPage, isFetchingNextPage, hasNextPage } =
    useGetLatestPosts(userId)
  const [isOpenPostModal, setIsOpenPostModal] = useState(false)

  const onClose = () => {
    setIsOpenPostModal(false)
  }

  const onPostClick = (id: number) => {
    setPostId(id)
    setIsOpenPostModal(true)
  }

  const { ref, inView } = useInView()

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage()
    }
  }, [inView, hasNextPage])

  return (
    <div className="mt-14">
      {isLoading && <LatestPostsLoader />}

      <div className="grid grid-cols-4 gap-3">
        {!isLoading &&
          data?.pages.map((page, idx) => (
            <React.Fragment key={idx}>
              {page &&
                page.items.map(post => (
                  <LatestPost key={post.id} post={post} onPostClick={onPostClick} />
                ))}
            </React.Fragment>
          ))}
      </div>

      {isSuccess && (
        <div className="pt-4" ref={ref}>
          {isFetchingNextPage && <LatestPostsLoader />}
        </div>
      )}

      {/*<PostModal isOpen={isOpenPostModal} onClose={onClose} />*/}
    </div>
  )
}
