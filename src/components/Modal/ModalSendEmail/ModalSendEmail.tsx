import React, { useState} from 'react';
import s from './ModalSendEmail.module.scss'
import MyButton from '@/components/common/MyButton/MyButton';
import Modal from '@/components/Modal/Modal';

interface IModalSendEmail {
  email?: string;
  modalOnClick: () => void;
}

const ModalSendEmail: React.FC<IModalSendEmail> =  ({email,modalOnClick}) =>{
const setTrue = () => {
  modalOnClick()
};
const setFalse = () => {
  modalOnClick()
};

return (
  <>
    <Modal
      backgroundOnClick={setFalse}
      modalOnClick={setFalse}
      title='Sign Up'
    >
    <div>
        <p className={s.message}>We have sent a link to confirm your email to <b>{email}</b>?</p>
      <div className={s.buttonGroup}>
        <MyButton callback={setTrue} style={{width: '96px', height: '36px'}} variant="secondary">OK</MyButton>
      </div>
    </div>
    </Modal>
  </>
);
};

export default ModalSendEmail;