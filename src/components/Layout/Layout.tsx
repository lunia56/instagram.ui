import {PropsWithChildren} from "react";
import Header from "@/components/Header/Header";
import {NextPage} from "next";
import styled from "styled-components";


export const Layout: NextPage<PropsWithChildren> = (props) => {
    const {children} = props
    return (
        <div>
            <Header/>
            <div>{children}</div>
        </div>
    )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 20px`



export default Layout;