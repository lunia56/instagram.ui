import React, {useState} from 'react'
import ConfirmationMessage from '@/components/ConfirmationMessage/confirmationMessage'
import img from '../../../../public/rafiki.png'
import {useEmailResendingMutation, useMeQuery} from '@/services/API-hooks'
import {NextPage} from 'next'
import LayoutWithHeader from '@/components/Layout/LayoutWithHeader'
import LinkExpired from '@/components/ConfirmationMessage/LinkExpired'

const LinkExpiredPage: NextPage = () => {

    return (
        <LayoutWithHeader>
           <LinkExpired/>
        </LayoutWithHeader>
    )
}

export default LinkExpiredPage