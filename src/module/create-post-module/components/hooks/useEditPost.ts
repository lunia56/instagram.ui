import { useMutation } from '@tanstack/react-query'
import { sendEditPost } from "@/module/create-post-module/components/api/edit/sendEditPost";


export const useEditPostMutation = (onSuccess: () => void) => {
  const { mutate, data } = useMutation({
    mutationKey: ['key'],
    mutationFn: sendEditPost,
    onSuccess: () => {
      onSuccess()
    },
    onError: () => {
      console.log('useAddPostMutation ERROR')
    },
  })

  return { mutate, data, onSuccess }
}
