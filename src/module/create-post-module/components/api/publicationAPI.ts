import { instagramInstance } from "@/services/instagramInstance";

export const sendPublicationPost = (data:any) => {
  const { description, childrenMetadata } = data
  const uploadId = childrenMetadata[0].uploadId

  return instagramInstance.post('posts', {
    description: description,
    childrenMetadata: [{ uploadId }],
  })
}
