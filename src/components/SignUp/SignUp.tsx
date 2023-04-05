import React, {ReactNode, useState} from "react";
import {Control, Controller, FieldPath, useForm, UseFormRegisterReturn} from "react-hook-form";
import s from './SignUp.module.scss'
import SocialRegistrationForm from '@/components/SignUp/SocialRegistrationForm';
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    Input,
    Button,
    VStack,
    Heading,
    Box,
    Link,
    Text, InputGroup, InputRightElement, IconButton,
} from "@chakra-ui/react";
import {AiOutlineEye, AiOutlineEyeInvisible} from 'react-icons/ai';
import {useLoginMutation} from '@/services/hooks';


type  FormValues = {
    email: string
    password: string
    confirmPassword: string
}
const SignUp = () => {

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const { mutate: signUp, error }=useLoginMutation()

    const {
        control,
        handleSubmit,
        watch,
        formState: {errors, isValid}
    } = useForm<FormValues>({mode: 'onChange'});


    const onSubmit = (data: FormValues) => {
        setIsSubmitting(true);
        signUp(data)
        // Ваша логика отправки формы
        setIsSubmitting(false);
    };
    const handleClick = () => setShowPassword(!showPassword);

    return (
        <Box className={s.signUpContainer}>
            <VStack className={s.signUpBlock} spacing={1}>
                <Heading size="lg">Sign Up</Heading>
                <SocialRegistrationForm/>
                <Box className={s.formBlock}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <VStack
                            spacing={0}
                            align="stretch"
                        >
                            <FormControl isInvalid={Boolean(errors.email)}>
                                <FormLabel color={'#4C4C4C'}>Email</FormLabel>

                                <Controller
                                    control={control}
                                    name="email"
                                    rules={{
                                        required: "Email is required",
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

                            <FormControl isInvalid={Boolean(errors.password)}>
                                <FormLabel color={'#4C4C4C'}>Password</FormLabel>
                                <Controller
                                    control={control}
                                    name="password"
                                    rules={{
                                        required: "Field is required",
                                        minLength: {
                                            value: 6,
                                            message: 'Minimum length 6 characters'
                                        }, maxLength: {
                                            value: 20,
                                            message: 'Maximum length 20 characters'
                                        }

                                    }}
                                    render={({field: {onChange, value}}) => (<>
                                        <InputGroup>
                                            <Input
                                                value={value}
                                                onChange={onChange}
                                                color={'white'}
                                                pr="4.5rem"
                                                type={showPassword ? "text" : "password"}
                                            />
                                            <InputRightElement width="4.5rem">
                                                <IconButton
                                                    h="1.75rem"
                                                    size="sm"
                                                    bg={'transparent'}
                                                    border={'none'}
                                                    _hover={{border: 'none', background: 'transparent'}}
                                                    aria-label={showPassword ? "Скрыть пароль" : "Показать пароль"}
                                                    onClick={handleClick}
                                                    icon={showPassword ? <AiOutlineEye size={'20px'} color={'white'}/> :
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

                            <FormControl isInvalid={Boolean(errors.confirmPassword)} pb={'20px'}>
                                <FormLabel color={'#4C4C4C'}>Password confirmation</FormLabel>
                                <Controller
                                    control={control}
                                    name="confirmPassword"
                                    rules={{
                                        required: "Field is required",
                                        validate: value => value === watch("password")
                                    }}
                                    render={({field: {onChange, value}}) => (<>
                                        <InputGroup>
                                            <Input
                                                value={value}
                                                onChange={onChange}
                                                color={'white'}
                                                pr="4.5rem"
                                                type={showPassword ? "text" : "password"}
                                            />
                                            <InputRightElement width="4.5rem">
                                                <IconButton
                                                    h="1.75rem"
                                                    size="sm"
                                                    bg={'transparent'}
                                                    border={'none'}
                                                    _hover={{border: 'none', background: 'transparent'}}
                                                    aria-label={showPassword ? "Скрыть пароль" : "Показать пароль"}
                                                    onClick={handleClick}
                                                    icon={showPassword ? <AiOutlineEye size={'20px'} color={'white'}/> :
                                                        <AiOutlineEyeInvisible size={'20px'} color={'white'}/>}
                                                />
                                            </InputRightElement>
                                        </InputGroup>
                                    </>)}
                                />

                                <FormErrorMessage>
                                    {errors.confirmPassword && <span>{errors.confirmPassword.message}</span>}
                                    {errors.confirmPassword?.type === 'validate' &&
                                        <span>Passwords do not match</span>}
                                </FormErrorMessage>
                            </FormControl>


                            <Button
                                type="submit"
                                isLoading={isSubmitting}
                                loadingText="Отправка..."
                                colorScheme="twitter"
                                isDisabled={!isValid || isSubmitting}
                                border="none"
                            >
                                Зарегистрироваться
                            </Button>
                        </VStack>
                    </form>
                </Box>
                <Text>Do you have an account?</Text>
                <Link href={'/'}>Sign In</Link>
            </VStack>
        </Box>
    );
}
export default SignUp;
//
// import { useForm, useWatch, Control } from "react-hook-form";
//
// type FormValues = {
//     firstName: string;
//     lastName: string;
// };
//
// function IsolateReRender({ control }: { control: Control<FormValues> }) {
//     const firstName = useWatch({
//         control,
//         name: "firstName",
//         defaultValue: "default"
//     });
//
//     return <div>{firstName}</div>;
// }
//
// export default function App() {
//     const { register, control, handleSubmit } = useForm<FormValues>();
//     const onSubmit = handleSubmit((data) => console.log(data));
//
//     return (
//         <form onSubmit={onSubmit}>
//             <input {...register("firstName")} />
//             <input {...register("lastName")} />
//             <IsolateReRender control={control} />
//
//             <input type="submit" />
//         </form>
//     );
// }

