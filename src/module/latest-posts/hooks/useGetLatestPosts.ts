import { useInfiniteQuery } from '@tanstack/react-query'
import { getPosts } from "@/module/latest-posts/api/latest-posts-api";
import { noRefetch } from "@/components/common/helpers/no-refetch";


export const useGetLatestPosts = (userId: number | undefined) => {
  const {
    data,
    isLoading,
    isError,
    isFetching,
    isSuccess,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ['posts', `user_${userId}`],
    queryFn: ({ pageParam = 1 }) => getPosts({ userId, page: pageParam }),
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.page * lastPage.pageSize < lastPage.totalCount ? lastPage.page + 1 : undefined
    },
    enabled: !!userId,
    ...noRefetch,
  })

  return {
    data,
    isLoading,
    isError,
    isFetching,
    isSuccess,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  }
}
