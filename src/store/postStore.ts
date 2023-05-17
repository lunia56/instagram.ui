//@ts-ignore
import { v1 } from 'uuid'
import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

export type PostType = {
  uploadId: string
  croppedPhoto: string
  filteredPhoto: string
  cropSize: CropSizeType
}

type CropSizeType = { width: number; height: number }

interface PostStore {
  postPhotos: PostType[]
  postDescription: string
  isLoadedFromDB: boolean
  setUploadId: () => void
  setCroppedPhoto: (
    uploadId: string,
    croppedPhoto: string,
    cropSize: { width: number; height: number }
  ) => void
  setPostDescription: (description: string) => void
  setFilteredPhoto: (uploadId: any, filteredPhoto: string) => void
  clearPostPhotos: () => void
  setPhotoFromDB: (
    id: string,
    croppedPhoto: string,
    filteredPhoto: string,
    description: string,
    cropSize: CropSizeType
  ) => void
}

export const usePostStore = create<PostStore>()(
  immer(set => ({
    postPhotos: [],
    postDescription: '',
    isLoadedFromDB: false,
    setUploadId() {
      set((state): any => {
        state.postPhotos.push({
          uploadId: v1(),
          croppedPhoto: '',
          filteredPhoto: '',
          cropSize: { width: 0, height: 0 },
        })
        state.isLoadedFromDB = false
      })
    },
    setCroppedPhoto(uploadId: string, croppedPhoto: string, cropSize: CropSizeType) {
      set((state): any => {
        const photo = state.postPhotos.find((photo:any) => {
          return photo.uploadId === uploadId
        })

        if (photo) {
          const photoIndex = state.postPhotos.indexOf(photo)

          state.postPhotos[photoIndex].croppedPhoto = croppedPhoto
          state.postPhotos[photoIndex].filteredPhoto = croppedPhoto
          state.postPhotos[photoIndex].cropSize = cropSize
        }
      })
    },
    setPostDescription(description: string) {
      set((state): any => {
        state.postDescription = description
      })
    },
    setFilteredPhoto(uploadId, filteredPhoto) {
      set((state): any => {
        const photo = state.postPhotos.find((photo:any) => {
          return photo.uploadId === uploadId
        })

        if (photo) {
          const photoIndex = state.postPhotos.indexOf(photo)

          state.postPhotos[photoIndex].filteredPhoto = filteredPhoto
        }
      })
    },
    clearPostPhotos() {
      set((state): any => {
        state.postPhotos = []
        state.postDescription = ''
        state.isLoadedFromDB = false
      })
    },
    setPhotoFromDB(
      id: string,
      croppedPhoto: string,
      filteredPhoto: string,
      description: string,
      cropSize: any
    ) {
      set((state): any => {
        state.postPhotos.push({
          uploadId: id,
          filteredPhoto: filteredPhoto,
          croppedPhoto: croppedPhoto,
          cropSize: cropSize,
        })
        state.isLoadedFromDB = true
        state.postDescription = description
      })
    },
  }))
)
