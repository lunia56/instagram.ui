import React, {useEffect} from 'react'
import NProgress from 'nprogress'
import {useRouter} from 'next/router'


const useLoader = () => {
    const router = useRouter()

    useEffect(() => {
        const startLoading = () => {
            console.log('startLoading')
            NProgress.start()}
        const endLoading = () => {
            console.log('endLoading')
            NProgress.done()
        }

        router.events.on('routeChangeStart', startLoading)
        router.events.on('routeChangeComplete', endLoading)
        router.events.on('routeChangeError', endLoading)
        return () => {
            router.events.off('routeChangeStart', startLoading)
            router.events.off('routeChangeComplete', endLoading)
            router.events.off('routeChangeError', endLoading)
        }
    }, [router])
}
export default useLoader
