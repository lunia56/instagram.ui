import {ReactNode, useState} from "react";
import {Control, Controller, FieldPath, useForm} from "react-hook-form";
import s from './LogIn.module.scss'
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
    Text,
} from "@chakra-ui/react";



const LogIn = () => {

    const [isSubmitting, setIsSubmitting] = useState(false);

    const {register,control, handleSubmit,watch,  formState: {errors,isValid}} = useForm({mode:'onChange'});
    const onSubmit = (data) => {
        setIsSubmitting(true);

        // Ваша логика отправки формы
        console.log(data)
        setIsSubmitting(false);
    };

    return (

            <Box  className={s.signUpBlock}>
            <VStack spacing={10} align="stretch">
                <Heading size="lg">Sign Up</Heading>
                <Box bg="gray.100" p={4} borderRadius="md">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <VStack spacing={4} align="stretch">
                            <FormControl isInvalid={Boolean(errors.email)}>
                                <FormLabel>Email</FormLabel>
                                <input type="email" {...register("email", {
                                    required: "Email is required",
                                    pattern: {
                                        value: /^((([0-9A-Za-z]{1}[-0-9A-z\.]{1,}[0-9A-Za-z]{1})|([0-9А-Яа-я]{1}[-0-9А-я\.]{1,}[0-9А-Яа-я]{1}))@([-A-Za-z]{1,}\.){1,2}[-A-Za-z]{2,})$/u,
                                        message: 'Please enter valid email...'
                                    }
                                })} />
                                <FormErrorMessage>
                                    {errors.email && <span>{errors.email.message}</span>}
                                </FormErrorMessage>
                            </FormControl>

                            <FormControl isInvalid={Boolean(errors.password)}>
                                <FormLabel>Password</FormLabel>
                                <input type="password" {...register("password", {
                                    required: "Field is required", minLength: {
                                        value: 6,
                                        message: 'Minimum length 6 characters'
                                    }, maxLength: {
                                        value: 20,
                                        message: 'Maximum length 20 characters'
                                    }
                                })}
                                />
                                <FormErrorMessage>
                                    {errors.password && <span>{errors.password.message}</span>}
                                </FormErrorMessage>
                            </FormControl>

                            <FormControl isInvalid={Boolean(errors.confirmPassword)}>
                                <FormLabel>Confirm password</FormLabel>
                                <input type="password" {...register("confirmPassword", {
                                    required: "Field is required",
                                    validate: value => value === watch("password")
                                })}
                                />
                                <FormErrorMessage>
                                    {errors.confirmPassword && <span>{errors.confirmPassword.message}</span>}
                                    {errors.confirmPassword?.type === 'validate' && <span>Passwords do not match</span>}
                                </FormErrorMessage>
                            </FormControl>


                            <Button
                                type="submit"
                                isLoading={isSubmitting}
                                loadingText="Отправка..."
                                colorScheme="blue"
                                disabled={!isValid}
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


export default LogIn;