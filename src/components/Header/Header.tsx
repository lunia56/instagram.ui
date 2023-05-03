import React, {useState} from 'react'
import s from './Header.module.scss'
import logout from '@/assets/Image/logout/logout.svg'
import Image from 'next/image'
import ModalLogout from '@/components/Modal/ModalLogOut/ModalLogout'
import {Box, Button, Link} from '@chakra-ui/react'
import {useRouter} from 'next/router'

const Header = () => {
  const [show, setShow] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);//временно пока нет стейта зустанд

  const {push}= useRouter()
  // const {variables} = useSignInMutation()
  const openModalLogout = () => {
    setShow(true)
  }
  return (
    <header className={s.header}
            // style={{position:'relative'}}
    >
      <Box className={s.container}>
        <Box onClick={()=>push('/')} cursor={'pointer'} className={s.title}>Instagram</Box>
        {/*{*/}
        {/*  isLoggedIn ? <div className={s.logout} onClick={openModalLogout}>*/}
        {/*        <Image src={logout} width={24} height={24} alt=""/>*/}
        {/*        <p>Log Out</p>*/}
        {/*    </div> : <div></div>*/}
        {/*}*/}
        {show && <ModalLogout modalOnClick={() => setShow(false)}/>}
      </Box>
    </header>
  );
};

export default Header;