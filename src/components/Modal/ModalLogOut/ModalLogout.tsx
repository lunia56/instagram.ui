import React, { useState} from 'react';
import s from './ModalLogout.module.scss'
import MyButton from '@/components/common/MyButton/MyButton';
import Modal from '@/components/Modal/Modal';

interface IModalLogout {
  modalOnClick: () => void;
}

const ModalLogout: React.FC<IModalLogout> =  ({modalOnClick}) =>{
const [show, setShow] = useState(true);

const setTrue = () => {
  setShow(false);
  modalOnClick()
};
const setFalse = () => {
  setShow(false);
  modalOnClick()
};

console.log('render ModalQuestionContainer');
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
        <p className={s.message}>Are you really want to log out of your account <b>“Epam@epam.com”</b>?</p>
      <div className={s.buttonGroup}>
        <MyButton onClick={setTrue} style={{width: '96px', height: '36px'}} variant="empty">Yes</MyButton>
        <MyButton onClick={setFalse} style={{width: '96px', height: '36px'}} variant="secondary">No</MyButton>
      </div>
    </div>
    </Modal>
  </>
);
};

export default ModalLogout;