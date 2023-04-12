import React, { useState} from 'react';
import s from './ModalAddProfilePhoto.module.scss'
import MyButton from '@/components/common/MyButton/MyButton';
import Modal from '@/components/Modal/Modal';
import {Image} from "@chakra-ui/image";

interface IModalSendEmail {
  email?: string;
  modalOnClick: () => void;
}

const ModalAddProfilePhoto: React.FC<IModalSendEmail> =  ({email,modalOnClick}) =>{
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
      title='Add a Profile Photo'
    >
    <div>
      <div className={s.buttonGroup}>
          <Image
              boxSize='350px'
              objectFit='cover'
              src='https://bit.ly/dan-abramov'
              alt='Dan Abramov'/>
        <MyButton callback={setTrue} style={{width: '200x', height: '36px'}} variant="secondary">Select from Computer</MyButton>
      </div>
    </div>
    </Modal>
  </>
);
};

export default ModalAddProfilePhoto;