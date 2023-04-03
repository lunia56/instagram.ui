import React from 'react';
import {NextPage} from 'next';
import SignUp from '@/components/SignUp/SignUp';
import styles from '@/styles/Home.module.css';
import Layout from '@/components/Layout/Layout';

const SignUpPage = () => {
    return (
        <Layout>
            <SignUp/>
        </Layout>

    );
};

export default SignUpPage;