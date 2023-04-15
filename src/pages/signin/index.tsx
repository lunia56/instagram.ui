import SignIn from '@/components/SignIn/SignIn'
import {NextPageWithLayout} from '@/pages/_app'
import LayoutWithHeader from '@/components/Layout/LayoutWithHeader'

const SignInPage: NextPageWithLayout = () => {
    return (
        <LayoutWithHeader>
            <SignIn/>
        </LayoutWithHeader>
    )
}
export default SignInPage