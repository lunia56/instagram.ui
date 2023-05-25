import { instagramInstance } from "@/services/instagramInstance";

export const deletePost = (postId: number) => {
  return instagramInstance.delete(`posts/${postId}`)
}
