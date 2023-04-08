import React, { useState} from 'react';
import s from './ModalLogout.module.scss'
import MyButton from '@/components/common/MyButton/MyButton';
import Modal from '@/components/Modal/Modal';
import {useLogOutMutation, useRegisterMutation} from '@/services/hooks';

interface IModalLogout {
  modalOnClick: () => void;
}

const ModalLogout: React.FC<IModalLogout> =  ({modalOnClick}) =>{

  const {mutate:logout} = useLogOutMutation()

const setTrue = () => {
  modalOnClick()
  logout()
};
const setFalse = () => {
  modalOnClick()
};

return (
  <>
    <Modal
      backgroundOnClick={setFalse}
      modalOnClick={setFalse}
      title='Log Out'
    >
    <div>
        <p className={s.message}>Are you really want to log out of your account <b>“Epam@epam.com”</b>?</p>
      <div className={s.buttonGroup}>
        <MyButton callback={setTrue} style={{width: '96px', height: '36px'}} variant="empty">Yes</MyButton>
        <MyButton callback={setFalse} style={{width: '96px', height: '36px'}} variant="secondary" >No</MyButton>
      </div>
    </div>
    </Modal>
  </>
);
};

export default ModalLogout;