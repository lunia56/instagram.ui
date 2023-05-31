import PasswordRecovery from '@/components/PasswordRecovery/PasswordRecovery'
import LayoutWithHeader from '@/components/Layout/LayoutWithHeader'
import React from "react";

const passwordRecoveryPage = () => {
    return (
        <LayoutWithHeader>
            <PasswordRecovery/>
        </LayoutWithHeader>

    );
};

export default passwordRecoveryPage;