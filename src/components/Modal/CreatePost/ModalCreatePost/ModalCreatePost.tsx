import { FC } from 'react'

import Image from 'next/image'
import Modal from 'react-modal'

import styles from './ModalCreatePost.module.scss'

import ArrowBackIcon from '@/assets/Image/modal/createPost/arrow-ios-back.svg'

interface Props {
  isOpen: boolean
  onClose: () => void
  title: string
  children: any
  onBtnClick: () => void
  onBackClick: () => void
}

export const ModalCreatePost: FC<Props> = ({
  isOpen,
  onBtnClick,
  onBackClick,
  onClose,
  title,
  children,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      ariaHideApp={false}
      overlayClassName={styles.modalOverlay}
      className={styles.modal}
    >
      <div className={styles.modalHeader}>
        <Image
          onClick={onBackClick}
          className={styles.modalBackBtn}
          src={ArrowBackIcon}
          alt={'back'}
          height={24}
          width={24}
        />
        <div className={styles.modalTitle}>{title}</div>

        <button className={styles.modalBtn} onClick={() => onBtnClick()}>
          Next
        </button>
      </div>

      <div className={styles.modalBody}>{children}</div>
    </Modal>
  )
}
