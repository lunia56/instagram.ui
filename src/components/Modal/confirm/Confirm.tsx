import { FC } from 'react'

import { FaTimes } from 'react-icons/fa'
import Modal from 'react-modal'
import s from './Confirm.module.css'

interface Props {
  isOpen: boolean
  onConfirm: () => void
  onDecline?: () => void
  onClose: () => void
  title: string
  text: string
  disabled?: boolean
  confirmButtonText?: string
  declineButtonText?: string
}

export const Confirm: FC<Props> = ({
                                     isOpen,
                                     onConfirm,
                                     onDecline,
                                     onClose,
                                     title,
                                     text,
                                     disabled = false,
                                     confirmButtonText,
                                     declineButtonText,
                                   }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      ariaHideApp={false}
      overlayClassName={s.confirmOverlay}
      className={s.confirmModal}
    >
      <div
        className={s.confirm_y}
      >
        <div className={s.confirm_x}>{title}</div>

        <button
          className={s.confirm_q}
          onClick={() => onClose()}
          disabled={disabled}
        >
          <FaTimes size={'24px'}/>
        </button>
      </div>

      <div className={s.confirm_w}>{text}</div>

      <div className={s.confirm_e}>
        <button
          className={s.confirm_r}
          onClick={() => onConfirm()}
          disabled={disabled}
        >
          {confirmButtonText ?? 'Yes'}
        </button>
        {onDecline ? (
          <button
            className={s.confirm_t}
            onClick={() => onDecline?.()}
            disabled={disabled}
          >
            {declineButtonText ?? 'No'}
          </button>
        ) : (
          ''
        )}
      </div>
    </Modal>
  )
}
