import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.scss'
import Layout from '@/components/Layout/Layout';
import SignIn from "@/components/SignIn/SignIn";
import React from 'react'
import CreateProfile from '@/components/CreateProfile/CreateProfile'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
      <Layout>
        <main className={styles.main}>
          {/*  потом будет проверка на то что существет ли профиль или нет, такая же обертка как auth redirect наверное*/}
          <CreateProfile/>
        </main>
      </Layout>
  )
}
