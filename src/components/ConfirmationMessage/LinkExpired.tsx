import React, {useState} from 'react'
import {
    Box,
    Button,
    Heading,
    HStack,
    Text,
    VStack,
    Input,
    FormControl,
    FormLabel,
    FormErrorMessage
} from '@chakra-ui/react'
import Image from 'next/image'
import {useEmailResendingMutation, useMeQuery} from '@/services/API-hooks'
import image from '../../../public/rafiki.svg'
import {Controller, useForm} from 'react-hook-form'
import ModalSendEmail from '@/components/Modal/ModalSendEmail/ModalSendEmail'

type FormValues = {
    email: string
}
const LinkExpired = () => {
    const [isOpen, setIsOpen] = useState(false)

    const {mutate: resentEmail, isLoading,variables:email} = useEmailResendingMutation(() => setIsOpen(true))

    const {
        control,
        handleSubmit,
        formState: {errors, isValid}
    } = useForm<FormValues>({mode: 'onChange'})

    const onSubmit = (data: FormValues) => {
        console.log('email: ', data)
        resentEmail(data.email)
    }

    return (
        <Box>
            <VStack
                gap={10}>
                <Heading letterSpacing={'1px'} fontWeight={'700'} fontSize={'20px'} lineHeight={'36px'} color={'white'}
                         mt={'35px'}> Email verification link expired</Heading>
                font-style: normal;

                <Text letterSpacing={'1px'} fontWeight={400} fontSize={'16px'} lineHeight={'24px'} fontStyle={'normal'}
                      color={'white'}>Looks like the verification link has expired. Not to worry, we can send the link
                    again</Text>
                <HStack>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <FormControl isInvalid={Boolean(errors.email)} isRequired mb={'10px'}>
                            <FormLabel color={'#4C4C4C'}>Email</FormLabel>

                            <Controller
                                control={control}
                                name="email"
                                rules={{
                                    required: 'Email is required',
                                    pattern: {
                                        value: /^((([0-9A-Za-z]{1}[-0-9A-z\.]{1,}[0-9A-Za-z]{1})|([0-9А-Яа-я]{1}[-0-9А-я\.]{1,}[0-9А-Яа-я]{1}))@([-A-Za-z]{1,}\.){1,2}[-A-Za-z]{2,})$/u,
                                        message: 'Please enter valid email...'
                                    }
                                }}
                                render={({field: {onChange, value,}}) => (<>
                                    <Input
                                        color={'white'}
                                        value={value}
                                        onChange={onChange}
                                    />
                                </>)}
                            />
                            {errors.email &&
                                <FormErrorMessage> <span>{errors.email.message}</span> </FormErrorMessage>}
                        </FormControl>
                        <Button
                            type="submit"
                            isLoading={isLoading}
                            loadingText="Loading..."
                            colorScheme="twitter"
                            isDisabled={!isValid}
                            border="none"
                            fontWeight={'400'} fontSize={'20px'} lineHeight={'36px'}
                        >
                            Resend verification Link
                        </Button>
                    </form>
                </HStack>
                <Image src={image} alt={'img'}/>
            </VStack>
            {isOpen && <ModalSendEmail modalOnClick={() => setIsOpen(false)} email={email}/>}
        </Box>
    )
}

export default LinkExpired