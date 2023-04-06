import React from 'react';
import ConfirmationMessage from '@/components/confirmationMessage/confirmationMessage';
import {useRouter} from 'next/router';
import img from '../../../../public/rafiki.png'
import Layout from '@/components/Layout/Layout';
import {useEmailResendingMutation, useMeQuery} from '@/services/hooks';

const ConfirmRegistration = () => {

    const {mutate: resentEmail} = useEmailResendingMutation()
    const {data} = useMeQuery()
    console.log('me where email' ,data)
    // const email
    const onClickHandler = () => {
        // делаем запрос на отправку сообщения

        // resentEmail(email)
    }
    return (
        <Layout>
            <ConfirmationMessage title={'Email verification link expired'}
                                 description={'Looks like the verification link has expired. Not to worry, we can send the link again'}
                                 buttonTitle={'Resent verification link'} onClickHandler={onClickHandler} image={img}/>
        </Layout>
    );
};

export default ConfirmRegistration;