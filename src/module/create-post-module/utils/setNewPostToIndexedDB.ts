import { PostType } from "@/store/postStore";
import { setItemToDatabase } from "@/components/common/indexedDb/setItemToDatabase";
import { IMAGES } from "@/module/create-post-module/constants/db-image-names";


type PostDataDBType = {
  uploadId: string
  filteredPhoto?: Blob
  croppedPhoto?: Blob
  cropSize: any
  description?: string
}

type ImageDataType = {
  data: PostDataDBType
  timestamp: number
}

export const setNewPostToIndexedDB = async (postPhotos: PostType[], postDescription: string) => {
  postPhotos.forEach(photo => {
    let imageData: ImageDataType = {
      data: {
        uploadId: photo.uploadId,
        description: postDescription,
        cropSize: photo.cropSize,
      },
      timestamp: Date.now(),
    }

    fetch(photo.filteredPhoto)
      .then(response => response.blob())
      .then(blob => {
        imageData.data.filteredPhoto = blob
      })
      .then(() => {
        fetch(photo.croppedPhoto)
          .then(response => response.blob())
          .then(blob => {
            imageData.data.croppedPhoto = blob
            setItemToDatabase({
              keyPath: IMAGES.KEY_PATH,
              storeName: IMAGES.STORE_NAME,
              dbName: IMAGES.DB_NAME,
              itemData: imageData,
            })
          })
      })
      .catch(error => {
        console.error('Error fetching Blob:', error)
      })
  })
}

// const convertToBlob = async (url: string) => {
//   fetch(url)
//     .then(response => response.blob())
//     .then(blob => {
//       debugger
//       return blob
//     })
//     .catch(error => {
//       console.error('Error fetching Blob:', error)
//     })
// }
