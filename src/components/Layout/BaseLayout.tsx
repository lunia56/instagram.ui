import React, { PropsWithChildren, ReactElement } from 'react'
import { NextPage } from 'next'
import NavBar from '@/components/NavBar/NavBar'
import { Box } from '@chakra-ui/react'
import LayoutWithHeader from "@/components/Layout/LayoutWithHeader";


export const BaseLayout: NextPage<PropsWithChildren> = ({children}) => {

  return (
    <>
      <LayoutWithHeader>
        <NavBar>
          <Box mt={'55px'} ml={'30px'}>
            {children}
          </Box>
        </NavBar>
      </LayoutWithHeader>
    </>
  )
}


export const getLayout = (page: ReactElement) => {
  return <BaseLayout>{page}</BaseLayout>
}
