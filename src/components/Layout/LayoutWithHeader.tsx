import React, {PropsWithChildren} from 'react'
import {NextPage} from 'next'
import Header from '@/components/Header/Header'
import styles from '@/assets/styles/Home.module.scss'

const LayoutWithHeader: NextPage<PropsWithChildren> = ({children}) => {
    return (
        <>

            <Header/>
            <main className={styles.main}>
                {children}
            </main>
        </>
    )
}
export default LayoutWithHeader