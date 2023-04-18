import React, {useState} from 'react'
import EditProfileForm from '@/components/EditProfile/EditProfileForm'
import Devices from '@/components/Devices/Devices'
import {Box, Button, HStack, VStack} from '@chakra-ui/react'

const EditProfile = () => {
    const [togglePage, setTogglePage] = useState(true)

    const togglePageHandler = (toggle: boolean) => {
        setTogglePage(toggle)
    }
    return (
        <VStack width={'750px'} pl={'35px'} pt={'15px'} alignItems={'flex-start'}>
            <HStack>
                <Button variant={'ghost'}
                        _hover={{bg:'transparent'}}
                        onClick={() => togglePageHandler(true)}
                        disabled={!togglePage}
                        colorScheme={togglePage ? 'telegram' : 'gray'} // добавляем цвет активной и неактивной кнопки
                        _disabled={{opacity: 0.5}}> General Information</Button>
                <Button variant={'ghost'}
                        _hover={{bg:'transparent'}}
                        onClick={() => togglePageHandler(false)}
                        disabled={togglePage}
                        colorScheme={!togglePage ? 'telegram' : 'gray'} // добавляем цвет активной и неактивной кнопки
                        _disabled={{opacity: 0.5}}> Devices</Button>
            </HStack>
            {togglePage ? <EditProfileForm/> : <Devices/>}
        </VStack>
    )
}

export default EditProfile


