import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import Image from 'next/image'
import Link from 'next/link'

import plusOutline from '@/assets/Image/modal/plus-square-outline.svg'
import {
  useStoreAddPostModal,
  useStoreCropEditorModal,
  useStoreFilterEditorModal,
  useStoreWithContentModal
} from "@/components/Modal/store/store";

import { FiltersEditor } from "@/module/create-post-module/components/photo-filters-editor/FiltersEditor";
import { AddFullPost } from "@/module/create-post-module/components/addFullPost/addFullPost";
import { PhotoUploader } from "@/module/create-post-module/components/photo-uploader/PhotoUploader";
import { CropEditor } from "@/module/create-post-module/components/photo-crop-editor/CropEditor";
import { useImageSelector } from "@/store/storeSelectorPhoto";


export const CreatePost = ({client}:any) => {
  const [sidebarModule, setSidebarModule] = useState<boolean>(false)
  const [isDraftModalOpen, setIsDraftModalOpen] = useState(false)

  const { query, replace, pathname } = useRouter()

  const modalWithContent = useStoreWithContentModal()
  const cropEditorModal = useStoreCropEditorModal()
  const filterEditorModal = useStoreFilterEditorModal()
  const useStoreAddFullPostModal = useStoreAddPostModal()
  const { setImageSelector, imagesSelector } = useImageSelector()

  const onAddPhotoClick = () => {
    setSidebarModule(true)
    modalWithContent.setIsModalOpen(true)
  }

  const onCloseClick = () => {
    modalWithContent.setIsModalOpen(false)
    cropEditorModal.setIsModalOpen(false)
    replace(pathname)
  }

  useEffect(() => {
    if (query.create) {
      setSidebarModule(true)
      modalWithContent.setIsModalOpen(true)
    }
  }, [query.create])

  useEffect(() => {
    if (
      !modalWithContent.isModalOpen &&
      !cropEditorModal.isModalOpen &&
      !filterEditorModal.isModalOpen &&
      !useStoreAddFullPostModal.isModalOpen
    ) {
      setSidebarModule(false)
      replace(pathname)
    }
  }, [
    modalWithContent.isModalOpen,
    cropEditorModal.isModalOpen,
    filterEditorModal.isModalOpen,
    useStoreAddFullPostModal.isModalOpen,
  ])


  return (
    <div>
      <Link
        style={{display: "flex", alignItems: "center", cursor: "pointer"}}
        onClick={onAddPhotoClick}
        href={{
          query: {create: true},
        }}
      >
        <Image style={{marginRight: "15px"}} src={plusOutline} alt={'Create'} height={24} width={24}/>
        <div>Create</div>
      </Link>

      {query.create && <PhotoUploader />}
      {imagesSelector && (
        <CropEditor
          isModalOpen={cropEditorModal.isModalOpen}
          filterEditorModule={filterEditorModal.setIsModalOpen}
          cropEditorModule={cropEditorModal.setIsModalOpen}
          onClose={onCloseClick}
        />
      )}
      {filterEditorModal.isModalOpen && (
        <FiltersEditor
          isModalOpen={filterEditorModal.isModalOpen}
          cropEditorModule={cropEditorModal.setIsModalOpen}
          filterEditorModule={filterEditorModal.setIsModalOpen}
          storeAddFullPostModule={useStoreAddFullPostModal.setIsModalOpen}
          onClose={onCloseClick}
          setIsDraftModalOpen={setIsDraftModalOpen}
        />
      )}
      {useStoreAddFullPostModal.isModalOpen && (
        <AddFullPost
          location={false}
          isModalOpen={useStoreAddFullPostModal.isModalOpen}
          storeAddFullPostModule={useStoreAddFullPostModal.setIsModalOpen}
          filterEditorModule={filterEditorModal.setIsModalOpen}
          onClose={onCloseClick}
          setIsDraftModalOpen={setIsDraftModalOpen}
        />
      )}
      {/*{isDraftModalOpen && (*/}
      {/*  <SaveDraftPost*/}
      {/*    isDraftModalOpen={isDraftModalOpen}*/}
      {/*    setIsDraftModalOpen={setIsDraftModalOpen}*/}
      {/*  />*/}
      {/*)}*/}
    </div>
  )
}
