import { FC } from 'react'

import Image from 'next/image'
import { FaTimes } from 'react-icons/fa'
import Modal from 'react-modal'

import styles from './CreatePostModal.module.scss'

import ArrowBackIcon from '@/assets/Image/modal/createPost/arrow-ios-back.svg'

interface Props {
  isOpen: boolean
  onClose: () => void
  title: string
  children: any
  onBtnClick: () => void
  onBackClick?: () => void
  variant?: 'Next' | 'Publish'
  showBackArrow: boolean
}

export const CreatePostModal: FC<Props> = ({
                                             isOpen,
                                             onBtnClick,
                                             onBackClick,
                                             onClose,
                                             title,
                                             children,
                                             variant,
                                             showBackArrow,
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
        {showBackArrow && onBackClick ? (
          <Image
            onClick={onBackClick}
            className={styles.modalBackBtn}
            src={ArrowBackIcon}
            alt={'back'}
            height={24}
            width={24}
          />
        ) : (
          <div></div>
        )}
        <div className={styles.modalTitle}>{title}</div>

        {variant ? (
          <button className={styles.modalBtn} type={'submit'} onClick={() => onBtnClick()}>
            {variant}
          </button>
        ) : (
          <FaTimes className={styles.modalCloseBtn} onClick={onClose} size={'24px'} />
        )}
      </div>

      <div className={styles.modalBody}>{children}</div>
    </Modal>
  )
}
