import React, {useState} from 'react';
import s from './Header.module.scss'
import logout from '../../assets/logout/logout.svg'
import Image from 'next/image';
// import ModalLogout from '@/components/Modal/ModalLogOut/ModalLogout';

const Header = () => {
    const [show, setShow] = useState(false);
    console.log(show)
    const openModalLogout = () => {
        setShow(true)
    }
    return (
        <header className={s.header}>
          <div className={s.container}>
            <p className={s.title}>Instagram</p>
            <div className={s.logout} onClick={openModalLogout}>
              <Image src={logout} width={24} height={24} alt=""/>
              <p>Log Out</p>
            </div>
            {/*{show && <ModalLogout modalOnClick={()=> setShow(false)} />}*/}
          </div>
        </header>
    );
};

export default Header;