import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

interface DescriptionStore {
  description: string
  setDescription: (description: string) => void
}

export const useSaveDescription = create<DescriptionStore>()(
  devtools(set => ({
    description: '',
    setDescription(description) {
      set({ description: description })
    },
  }))
)

interface UserStore {
  uploadId: string
  setUploadId: (uploadId: string) => void
  userId: number | null
  setUserId: (userId: number) => void
  postId: number | null
  setPostId: (id: number) => void
  hasBusinessAccount: boolean
  setHasBusinessAccount: (hasBusinessAccount: boolean) => void
  descriptionLocal: string
  setDescriptionLocal: (descriptionLocal: string) => void
}

export const useUserStore = create<UserStore>()(
  devtools(set => ({
    uploadId: '',
    hasBusinessAccount: false,
    userId: null,
    postId: null,
    descriptionLocal: '',
    setHasBusinessAccount(hasBusinessAccount) {
      set({ hasBusinessAccount: hasBusinessAccount })
    },
    setUploadId(uploadId) {
      set({ uploadId: uploadId })
    },
    setUserId(userId) {
      set({ userId: userId })
    },
    setPostId(id) {
      set({ postId: id })
    },
    setDescriptionLocal(descriptionLocal) {
      set({ descriptionLocal: descriptionLocal })
    },
  }))
)
