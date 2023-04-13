import styles from '@/styles/Home.module.scss'
import Layout from '@/components/Layout/Layout'
import React from 'react'
import CreateProfilePage from '@/pages/createProfile'


export default function Home() {
  return (
      <Layout>
        <main className={styles.main}>
          {/*  потом будет проверка на то что существет ли профиль или нет, такая же обертка как auth redirect наверное*/}
          <CreateProfilePage/>
        </main>
      </Layout>
  )
}
