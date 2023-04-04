import React from 'react';
import s from './Header.module.scss'

const Header = () => {
    return (
        <header>
            <div className={s.header} ><span>Instagram</span></div>
        </header>
    );
};

export default Header;