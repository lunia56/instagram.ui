import React from 'react'
import ConfirmationMessage from '@/components/ConfirmationMessage/confirmationMessage'
import {useRouter} from 'next/router'
import img from '../../../../public/bro.png'
import {NextPage} from 'next'
import LayoutWithHeader from '@/components/Layout/LayoutWithHeader'

const ConfirmRegistration: NextPage = () => {
    const {push} = useRouter()
    const onClickHandler = () => {
        push('/login')
    }
    return (
        <LayoutWithHeader>
            <ConfirmationMessage title={'Congratulations!'} description={'Your email has been confirmed'}
                                 buttonTitle={'SignIn'} onClickHandler={onClickHandler} image={img}/>
        </LayoutWithHeader>
    )
}
export default ConfirmRegistration