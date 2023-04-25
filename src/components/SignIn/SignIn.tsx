import React, {useState} from 'react'
import {Controller, useForm} from 'react-hook-form'
import s from './SignIn.module.scss'
import {
    Box,
    Button,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Heading,
    IconButton,
    Input,
    InputGroup,
    InputRightElement,
    Link,
    Progress,
    Text,
    VStack,
} from '@chakra-ui/react'
import {AiOutlineEye, AiOutlineEyeInvisible} from 'react-icons/ai'
import {useSignInMutation} from '@/services/API-hooks'


type  FormValues = {
    email: string
    password: string
}
const SignIn = () => {

    const [showPassword, setShowPassword] = useState(false)
    // const [queryError, setQueryError] = useState<string>('')


    const {mutate: signIn, error, isLoading} = useSignInMutation()

    const {
        control,
        handleSubmit,
        formState: {errors, isValid}
    } = useForm<FormValues>({mode: 'onChange'})

    const onSubmit = (data: FormValues) => {
        console.log(`inOnSubmit:${error}`)
        // setQueryError(error.response.data)
        signIn(data)
        // console.log(error.response.config.data);
    }
    const handleClick = () => setShowPassword(!showPassword)

    return (
        <>
            {isLoading && <Progress size="xs" isIndeterminate color="gray.800" bg="gray.800"/>}
            <Box className={s.signUpContainer}>
                <VStack className={s.signUpBlock} spacing={1}>
                    <Heading mb="15px" size="lg">Sign In</Heading>
                    <Box className={s.formBlock}>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <VStack spacing={2} align="stretch" >

                                <FormControl isInvalid={Boolean(errors.email)} isRequired>
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
                                    <FormErrorMessage>
                                        {errors.email && <span>{errors.email.message}</span>}
                                    </FormErrorMessage>
                                </FormControl>

                                <FormControl isInvalid={Boolean(errors.password)} isRequired  display={'flex'} flexDirection={'column'} justifyContent={'center'}>
                                    <FormLabel color={'#4C4C4C'}>Password</FormLabel>
                                    <Controller
                                        control={control}
                                        name="password"
                                        rules={{
                                            required: 'Field is required',
                                            minLength: {
                                                value: 6,
                                                message: 'Minimum length 6 characters'
                                            }, maxLength: {
                                                value: 20,
                                                message: 'Maximum length 20 characters'
                                            }

                                        }}
                                        render={({field: {onChange, value}}) => (<>

                                            <InputGroup >
                                                <Input
                                                    value={value}
                                                    onChange={onChange}
                                                    color={'white'}
                                                    pr="4.5rem"
                                                    type={showPassword ? 'text' : 'password'}
                                                />
                                                <InputRightElement width="4.5rem">
                                                    <IconButton
                                                        h="1.75rem"
                                                        size="sm"
                                                        bg={'transparent'}
                                                        border={'none'}
                                                        _hover={{border: 'none', background: 'transparent'}}
                                                        aria-label={showPassword ? 'Скрыть пароль' : 'Показать пароль'}
                                                        onClick={handleClick}
                                                        icon={showPassword ?
                                                            <AiOutlineEye size={'20px'} color={'white'}/> :
                                                            <AiOutlineEyeInvisible size={'20px'} color={'white'}/>}
                                                    />
                                                </InputRightElement>
                                            </InputGroup>
                                        </>)}
                                    />
                                    <FormErrorMessage>
                                        {errors.password && <span>{errors.password.message}</span>}
                                    </FormErrorMessage>
                                </FormControl>
                                <Button variant={'link'} className={s.forgot} > <Link  href={'/'}>Forgot Password</Link></Button>

                                <Button
                                    type="submit"
                                    isLoading={isLoading}
                                    loadingText="Отправка..."
                                    colorScheme="twitter"
                                    isDisabled={!isValid}
                                    border="none"
                                >
                                    Sign In
                                </Button>
                            </VStack>
                        </form>
                    </Box>
                    <Text>Don’t have an account?</Text>
                    <Button variant={'link'}><Link href={'/signup'}>Sign Up</Link></Button>
                </VStack>
            </Box>
        </>
    )
}

export default SignIn


