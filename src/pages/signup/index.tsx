import {NextPage} from 'next'
import SignUp from '@/components/SignUp/SignUp'
import LayoutWithHeader from '@/components/Layout/LayoutWithHeader'

const SignUpPage: NextPage = () => {
    return (
        <LayoutWithHeader>
            <SignUp/>
        </LayoutWithHeader>
    )
}
export default SignUpPage