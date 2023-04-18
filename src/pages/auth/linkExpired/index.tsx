import React from 'react'
import ConfirmationMessage from '@/components/ConfirmationMessage/confirmationMessage'
import img from '../../../../public/rafiki.png'
import {useEmailResendingMutation, useMeQuery} from '@/services/API-hooks'
import {NextPage} from 'next'
import LayoutWithHeader from '@/components/Layout/LayoutWithHeader'

const LinkExpired: NextPage = () => {

    const {mutate: resentEmail} = useEmailResendingMutation()
    const {data} = useMeQuery()
    console.log('me where email', data)
    // const email
    const onClickHandler = () => {
        // делаем запрос на отправку сообщения

        // resentEmail(email)
    }
    return (
        <LayoutWithHeader>
            <ConfirmationMessage title={'Email verification link expired'}
                                 description={'Looks like the verification link has expired. Not to worry, we can send the link again'}
                                 buttonTitle={'Resent verification link'} onClickHandler={onClickHandler} image={img}/>
        </LayoutWithHeader>
    )
}

export default LinkExpired