import { FC } from 'react'

import { FaTimes } from 'react-icons/fa'
import Modal from 'react-modal'

import styles from './ModalWithContent.module.scss'

interface Props {
  isOpen: boolean
  onConfirm?: () => void
  onDecline?: () => void
  onClose: () => void
  title: string
  children: any
  confirmButtonText?: string
  declineButtonText?: string
}

export const ModalWithContent: FC<Props> = ({
  isOpen,
  onConfirm,
  onDecline,
  onClose,
  title,
  children,
  confirmButtonText,
  declineButtonText,
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
        <div className={styles.modalTitle}>{title}</div>

        <button className={styles.modalClose} onClick={() => onClose()}>
          <FaTimes />
        </button>
      </div>

      <div className={styles.modalBody}>{children}</div>

      <div className={styles.modalFooter}>
        {onConfirm ? <button onClick={() => onConfirm()}>{confirmButtonText ?? 'Yes'}</button> : ''}
        {onDecline ? <button onClick={() => onDecline()}>{declineButtonText ?? 'No'}</button> : ''}
      </div>
    </Modal>
  )
}
