import { useMutation } from '@tanstack/react-query'
import { sendPublicationPost } from "@/module/create-post-module/components/api/publicationAPI";


export const useAddAllPostMutation = (onSuccess?: any) => {
  const { isLoading, mutate, data, isSuccess } = useMutation({
    mutationKey: ['postAll-add'],
    mutationFn: sendPublicationPost,
    onSuccess: data => {
      onSuccess(data.data)
    },
    onError: () => {
      console.log('Error Mutation')
    },
  })

  return { isLoading, mutate, data, isSuccess }
}
