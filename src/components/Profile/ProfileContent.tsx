import React, {useState} from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import {Box, Flex, Progress, Spinner, Wrap, WrapItem} from '@chakra-ui/react'

const ProfileContent = () => {

    const [state, setState] = useState({
        items: Array.from({length: 20})
    })

    const fetchMoreData = () => {
        setTimeout(() => {
            setState({
                items: state.items.concat(Array.from({length: 20}))
            })
        }, 1500)
    }

    return (
        <InfiniteScroll
            dataLength={state.items.length}
            next={fetchMoreData}
            hasMore={true}
            loader={
            // <Box justifyContent={'center'}>
                <Spinner size="xl"/>}

        >
            <Wrap spacing={'20px'} mt={'20px'}>

                {state.items.map((i, index) => (
                    <WrapItem key={index} h={'230px'} w={'230px'} bg={'green.700'} justifyContent={'center'}
                              alignItems={'center'}>
                        div - #{index}
                    </WrapItem>

                ))}
            </Wrap>
        </InfiniteScroll>

    )
}


export default ProfileContent
