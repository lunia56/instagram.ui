import React from 'react'
import {Flex, Link} from '@chakra-ui/react'

const NavBar = () => {

    // const myProfileHandler = ()=>{
    //
    // }
    return (
        <Flex direction={'column'}>
            <Link>Home</Link>
            <Link>Create</Link>
            <Link >My Profile</Link>
            <Link>Statistics</Link>
            <Link>Favorites</Link>
            <Link>Logout</Link>

        </Flex>
    )
}

export default NavBar