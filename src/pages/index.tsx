import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.scss'
import Layout from '@/components/Layout/Layout';
import PasswordRecovery from '@/components/PasswordRecovery/PasswordRecovery';
import SignUp from '@/components/SignUp/SignUp';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
      <Layout>
        <main className={styles.main}>
          <PasswordRecovery/>
            {/*<SignUp/>*/}
        </main>
      </Layout>
  )
}
