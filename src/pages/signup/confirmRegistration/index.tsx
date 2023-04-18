import React from 'react';
import ConfirmationMessage from '@/components/confirmationMessage/confirmationMessage';
import {useRouter} from 'next/router';
import img from '../../../../public/bro.png'
import Layout from '@/components/Layout/Layout';
import { Navigate, useParams } from 'react-router-dom'

const { token } = useParams<{ token: string }>()


const ConfirmRegistration = () => {
    const {push}=useRouter()
    const onClickHandler=()=>{
        push('/login')
    }

    return (
        <Layout>
            <ConfirmationMessage title={'Congratulations!'} description={'Your email has been confirmed'} buttonTitle={'SignIn'} onClickHandler={onClickHandler} image={img}/>
        </Layout>
    );
};

export default ConfirmRegistration;