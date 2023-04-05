import React from 'react';
import {NextPage} from 'next';
import SignUp from '@/components/SignUp/SignUp';
import styles from '@/styles/Home.module.css';
import Layout from '@/components/Layout/Layout';
import LogIn from "@/components/LogIn/LogIn";

const LogInPage = () => {
    return (
        <Layout >
            <LogIn/>
        </Layout>

    );
};

export default LogInPage;