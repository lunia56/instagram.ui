import React, { Dispatch, FC, SetStateAction, useState } from 'react'
import { useUserStore } from "@/store/userStore";
import { useEditPostMutation } from "@/module/create-post-module/components/hooks/useEditPost";
import { CreatePostModal } from "@/module/create-post-module/components/create-post-modal/CreatePostModal";
import { EditDescription } from "@/module/create-post-module/components/description-edit/EditDescription";

interface IEditPost {
  isModalOpen: boolean
  onCloseClick: () => void
  setOpenModal: Dispatch<SetStateAction<boolean>>
  imageUrl: string
  description: string
  location: boolean
}

export const AllEditPost: FC<IEditPost> = ({
  isModalOpen,
  onCloseClick,
  imageUrl,
  description,
  location,
}) => {
  const { postId } = useUserStore()

  const [text, setText] = useState<string>(description)
  const { mutate: editFunc } = useEditPostMutation(() => '')

  const editPost = () => {
    if (postId && text) {
      editFunc({ postId: postId, description: text })
    } else {
      console.log('editPost BAD BAD')
    }
  }

  console.log(description)
  console.log(postId)

  return (
    <div className={'flex flex-wrap'}>
      <CreatePostModal
        isOpen={isModalOpen}
        onClose={onCloseClick}
        title={'Edit post'}
        onBtnClick={() => ''}
        showBackArrow={false}
      >
        <EditDescription
          text={text}
          imageUrl={imageUrl}
          location={location}
          setText={setText}
          callback={editPost}
        />
      </CreatePostModal>
    </div>
  )
}
