import React from 'react';
import Header from '@/components/Header/Header';


const Layout = ({children}: { children: React.ReactNode }) => (
    <>
        <Header/>
        {children}
    </>
)

export default Layout;