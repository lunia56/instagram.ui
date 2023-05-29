import { useMutation, useQueryClient } from '@tanstack/react-query'

import { deletePostImage } from '../api/latest-posts-api'

export const useDeletePostImage = (postId: number, uploadId: string) => {
  const client = useQueryClient()

  const { isLoading, mutate } = useMutation({
    mutationKey: ['delete-post-image'],
    mutationFn: () => deletePostImage(postId, uploadId),
    onSuccess: async () => {
      await client.invalidateQueries({ queryKey: [`post_${postId}`] })
      await client.invalidateQueries({ queryKey: [`posts`] })
    },
    onError: () => {
      console.log('post delete image error')
    },
  })

  return { isLoading, mutate }
}
