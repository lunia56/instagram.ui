import React, {useState} from "react";
import {Controller, useForm} from "react-hook-form";
import s from './PasswordRecovery.module.scss'
import SocialRegistrationForm from '@/components/SignUp/SocialRegistrationForm';
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
    Text,
    VStack,
} from "@chakra-ui/react";
import {AiOutlineEye, AiOutlineEyeInvisible} from 'react-icons/ai';
import {useLoginMutation} from '@/services/hooks';


type  FormValues = {
    login: string
    email: string
    password: string
    confirmPassword: string
}

const PasswordRecovery = () => {

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const {mutate: signUp, error} = useLoginMutation()

    const {
        control,
        handleSubmit,
        watch,
        formState: {errors, isValid}
    } = useForm<FormValues>({mode: 'onChange'});

    const onSubmit = (data: FormValues) => {
        setIsSubmitting(true);
        signUp(data)
        setIsSubmitting(false);
    };
    const handleClick = () => setShowPassword(!showPassword);

    return (
        <Box className={s.signUpContainer}>

            <VStack className={s.passwordRecovery} spacing={0}>
                <Heading size="lg" className={s.passwordRecovery__title}>Forgot Password</Heading>
                <Box className={s.formBlock}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <VStack spacing={0} align="stretch">

                            <FormControl isInvalid={Boolean(errors.email)}>
                                <FormLabel className={s.passwordRecovery__labelInput}>Email</FormLabel>

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
                                            value={value}
                                            onChange={onChange}
                                            variant={'flushed'}
                                        />
                                    </>)}
                                />
                                <FormErrorMessage>
                                    {errors.email && <span>{errors.email.message}</span>}
                                </FormErrorMessage>
                                <Text className={s.passwordRecovery__textSubEmail}>Enter your email address and we will
                                    send you further instructions</Text>
                            </FormControl>

                            <Button
                                className={s.passwordRecovery__button}
                                type="submit"
                                isLoading={isSubmitting}
                                loadingText="Отправка..."
                                isDisabled={!isValid || isSubmitting}
                                border="none"
                            >
                                Send Instructions
                            </Button>
                        </VStack>
                    </form>
                </Box>
                <Link href={'/'} className={s.passwordRecovery__backLink}>Back to Sign In</Link>
            </VStack>
        </Box>

    );
}

export default PasswordRecovery;
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

