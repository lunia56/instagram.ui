import {UseFormRegisterReturn} from 'react-hook-form';
import React, {useState} from 'react';
import {Box} from '@chakra-ui/react';
import s from '@/components/SignUp/SignUp.module.scss';
import {AiOutlineEye, AiOutlineEyeInvisible} from 'react-icons/all';

export  const PasswordInput=(props: { register: UseFormRegisterReturn<string>})=> {
    const [showPassword, setShowPassword] = useState(false);

    return <Box className={s.passwordInput}>
        <input type={showPassword ? 'text' : 'password'} {...props.register}
        />

        <button type="button" onClick={()=>setShowPassword(!showPassword)}>
            {showPassword ? <AiOutlineEye/> : <AiOutlineEyeInvisible/>}
        </button>
    </Box>;
}