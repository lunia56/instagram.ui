import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

interface StoreType {
  isModalOpen: boolean
  setIsModalOpen: (isModalOpen: boolean) => void
}

const createStore = (store: (set: (store: StoreType) => void) => StoreType) =>
  create<StoreType, [['zustand/devtools', never]]>(devtools(store))
const storeModal = (set: any): StoreType => ({
  isModalOpen: false,
  setIsModalOpen: isModalOpen => set({ isModalOpen: isModalOpen }, false, 'setIsModalOpen'),
})

export const useStoreWithContentModal = createStore(storeModal)
export const useStoreCropEditorModal = createStore(storeModal)
export const useStoreFilterEditorModal = createStore(storeModal)
export const useStoreAddPostModal = createStore(storeModal)
export const useStoreAvatarBlockModal = createStore(storeModal)
