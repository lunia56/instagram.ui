import { instagramInstance } from "@/services/instagramInstance";

export const sendPublicationImage = (formData:any) => {

  return instagramInstance.post<ResImagePublication>('/posts', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
}

type ResImagePublication = {
  images: [
    {
      uploadId: string
      url: string
      width: number
      height: number
      fileSize: number
    }
  ]
}
