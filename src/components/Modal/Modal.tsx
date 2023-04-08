import close from '../../assets/modal/close.svg'
import s from './Modal.module.scss'
import Image from 'next/image';
import React from 'react';

interface IModal {
  backgroundOnClick?: () => void;
  modalOnClick?: () => void;
  title:string
  children: React.ReactNode
}

const Modal: React.FC<IModal> = (
  {
    backgroundOnClick = () => {},
    modalOnClick = () => {},
    children,
    title
  }
) => {
  return (
    <>
       <div className={s.modalBackgraund} onClick={backgroundOnClick} />
        <div className={s.modal} >
          <div className={s.title}>
            <p>{title}</p>
            <Image src={close} alt='' onClick={modalOnClick}/>
          </div>
          <div className={s.children}>
            {children}
          </div>
      </div>
    </>
  );
};

export default Modal;