import PasswordRecovery from '@/components/PasswordRecovery/PasswordRecovery'
import LayoutWithHeader from '@/components/Layout/LayoutWithHeader'
import CreateNewPassword from "@/components/PasswordRecovery/CreateNewPassword/CreateNewPassword";
import {useRouter} from "next/router";
import {useEmailResendingMutation, useNewPasswordMutation} from "@/services/API-hooks";
import {useEffect} from "react";

const CreateNewPasswordPage = () => {
    // const router = useRouter()
    // console.log(router.query.code)
    // const {mutate: sentNewPassword} = useNewPasswordMutation()
    // useEffect(() => {
    //     const email = localStorage.getItem('email')
    //     const code = router.query.code
    //
    //     sentNewPassword(email, code)
    //
    // }, [])
    return (
        <LayoutWithHeader>
            <CreateNewPassword/>
        </LayoutWithHeader>
    );
};

export default CreateNewPasswordPage;