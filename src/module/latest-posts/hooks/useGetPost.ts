import { useQuery } from '@tanstack/react-query'
import { getPost } from "@/module/latest-posts/api/latest-posts-api";
import { noRefetch } from "@/components/common/helpers/no-refetch";


export const useGetPost = (
  postId: number | null,
  saveDescription?: (description: string) => void
) => {
  const {
    data: post,
    isError,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: [`post_${postId}`],
    onSuccess: data => {
      if (saveDescription) {
        saveDescription(data.description)
      }
    },
    queryFn: () => getPost(postId),
    enabled: !!postId,
    ...noRefetch,
  })

  return { post, isError, isLoading, isFetching }
}
