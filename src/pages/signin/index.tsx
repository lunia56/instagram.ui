import {NextPage} from 'next';
import SignUp from '@/components/SignUp/SignUp';
import styles from '@/styles/Home.module.scss';
import Layout from '@/components/Layout/Layout';
import SignIn from "@/components/SignIn/SignIn";

const SignInPage = () => {
    return (
        <Layout>
            <SignIn/>
        </Layout>

    );
};

export default SignInPage;