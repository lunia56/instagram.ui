import React from 'react';
import s from './Header.module.scss'
import logout from '../../assets/logout/logout.svg'
import Image from 'next/image';

const Header = () => {
    return (
        <header className={s.header}>
          <div className={s.container}>
            <p className={s.title}>Instagram</p>
            <div className={s.logout}>
              <Image src={logout} wigth={24} height={24} alt=""/>
              <p>Log Out</p>
            </div>
          </div>
        </header>
    );
};

export default Header;