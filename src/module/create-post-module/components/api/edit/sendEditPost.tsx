import { instagramInstance } from "@/services/instagramInstance";

export const sendEditPost = ({ postId, description }: editParams) => {
  return instagramInstance.put(`posts/${postId}`, { description: description })
}

type editParams = {
  postId: number | null
  description: string
}
