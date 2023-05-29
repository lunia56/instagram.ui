import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { sendPublicationImage } from "@/module/create-post-module/components/api/postImageAPI";

export const useUploadPost = (onSuccessPostSent: any, userId: number) => {
  const client = useQueryClient()

  const { isLoading, mutate, data, isSuccess } = useMutation({
    mutationKey: ['img-add'],
    mutationFn: sendPublicationImage,
    onSuccess: data => {
      onSuccessPostSent(data.data.images)
      client.invalidateQueries({ queryKey: ['posts', `user_${userId}`] })
      toast.success('Success')
    },
    onError: () => {
      console.log('useAddPostMutation ERROR')
    },
  })

  return { mutate, data, isLoading, isSuccess }
}
