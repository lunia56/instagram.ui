import Login from '@/components/Login/Login'
import {NextPageWithLayout} from '@/pages/_app'
import LayoutWithHeader from '@/components/Layout/LayoutWithHeader'

const LoginPage: NextPageWithLayout = () => {
    return (
        <LayoutWithHeader>
            <Login/>
        </LayoutWithHeader>
    )
}
export default LoginPage
