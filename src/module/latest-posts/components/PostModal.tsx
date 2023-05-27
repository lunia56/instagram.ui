import { FC, useState } from 'react'

import Image from 'next/image'
import { FaPen, FaTimes, FaTrash } from 'react-icons/fa'
import Modal from 'react-modal'

import { DeletePost } from '@/modules/post-modules/edit-post-module/components/DeletePost'
import { EditPost } from '@/modules/post-modules/edit-post-module/components/description-edit/AllEditPost'
import { PostImagesSlider } from '@/modules/post-modules/latest-posts/components/PostImagesSlider'
import { useGetPost } from '@/modules/post-modules/latest-posts/hooks/useGetPost'
import { useGetProfile } from '@/modules/profile-modules/settings-edit-profile-module'
import { useSaveDescription, useUserStore } from '@/store'
import { Avatar } from '@/ui'
import { Dropdown } from '@/ui/dropdown/Dropdown'

interface Props {
  isOpen: boolean
  onClose: () => void
}

export const PostModal: FC<Props> = ({ isOpen, onClose }) => {
  const { postId, setDescriptionLocal } = useUserStore()
  const { setDescription } = useSaveDescription()
  const { profileAvatar, profileData } = useGetProfile()

  const { post, isLoading } = useGetPost(postId, description => {
    setDescription(description)
    setDescriptionLocal(description)
  })

  const [isOpenDropdown, setIsOpenDropdown] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeletePostShown, setIsDeletePostShown] = useState(false)

  const onDelete = () => {
    setIsOpenDropdown(false)
    setIsDeletePostShown(true)
  }

  const handleEditClick = () => {
    setIsOpenDropdown(false)
    setIsEditModalOpen(true)
  }

  const onRequestClose = () => {
    setIsOpenDropdown(false)
    onClose()
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      ariaHideApp={false}
      overlayClassName="fixed w-full h-full top-0 left-0 bg-dark-900/60 z-[100]"
      className="absolute w-full h-full max-h-[564px] max-w-[972px] bg-dark-300 border-dark-100 border rounded-sm top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[200] focus:outline-none"
    >
      {isEditModalOpen && (
        <>
          {post!.images.map((e, index) => (
            <EditPost
              key={index}
              description={post!.description}
              imageUrl={e.versions.huge.url}
              setOpenModal={setIsEditModalOpen}
              isModalOpen={isEditModalOpen}
              onCloseClick={() => setIsEditModalOpen(false)}
            />
          ))}
        </>
      )}

      <button
        className="absolute -top-8 -right-8 text-base w-6 h-6 flex items-center justify-center text-white"
        onClick={() => onClose()}
      >
        <FaTimes size={'24px'} />
      </button>

      <div className="grid grid-cols-2 h-full">
        <div>
          <PostImagesSlider />
        </div>

        <div>
          <div className="px-6 py-3 flex items-center justify-between border-dark-100 border-b">
            <div className="flex items-center">
              <div className="w-9 h-9 mr-3 relative rounded-full overflow-hidden">
                <Image src={profileAvatar} fill alt={profileData.userName} />
              </div>

              <div className="text-white font-medium">{profileData.userName}</div>
            </div>

            <Dropdown isOpen={isOpenDropdown} setIsOpen={setIsOpenDropdown}>
              <div
                className="py-1.5 px-3 text-white text-sm cursor-pointer flex items-center whitespace-nowrap"
                onClick={handleEditClick}
              >
                <FaPen className="mr-2" /> Edit Post
              </div>
              <div
                className="py-1.5 p-3 text-white text-sm cursor-pointer flex items-center whitespace-nowrap"
                onClick={onDelete}
              >
                <FaTrash className="mr-2" /> Delete Post
              </div>
            </Dropdown>
          </div>
          <DeletePost
            isDeleteModalOpen={isDeletePostShown}
            setIsDeleteModalOpen={setIsDeletePostShown}
            postId={postId}
            onPostModalClose={onClose}
          />
          <div className="px-6 py-3 flex items-center justify-between">
            <div className="flex">
              <Avatar
                src={profileAvatar && profileAvatar}
                width={36}
                height={36}
                alt={profileData.userName}
                className={'mb-[5rem]'}
              />
              <div className="text-white font-normal text-[14px] ml-3.5">
                <span className="font-bold">{profileData.userName}</span> {post && post.description}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  )
}
