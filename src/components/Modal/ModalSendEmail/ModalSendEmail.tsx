import React, { useState} from 'react';
import s from './ModalSendEmail.module.scss'
import MyButton from '@/components/common/MyButton/MyButton';
import Modal from '@/components/Modal/Modal';

interface IModalSendEmail {
  email?: string;
  modalOnClick: () => void;
}

const ModalSendEmail: React.FC<IModalSendEmail> =  ({email,modalOnClick}) =>{
const [show, setShow] = useState(true);

const setTrue = () => {
  setShow(false);
  modalOnClick()
};
const setFalse = () => {
  setShow(false);
  modalOnClick()
};

return (
  <>
    <Modal
      backgroundOnClick={setFalse}
      modalOnClick={setFalse}
      title='Log Out'
    >
    <div
      style={{
        width: '100%',
      }}
    >
        <p className={s.message}>We have sent a link to confirm your email to <b>{email}</b>?</p>
      <div className={s.buttonGroup}>
        <MyButton onClick={setTrue} style={{width: '96px', height: '36px'}} variant="secondary">OK</MyButton>
      </div>
    </div>
    </Modal>
  </>
);
};

export default ModalSendEmail;