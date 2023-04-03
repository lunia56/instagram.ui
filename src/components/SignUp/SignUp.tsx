import {ReactNode, useState} from "react";
import {Controller, FieldPath, useForm} from "react-hook-form";
import s from './SignUp.module.scss'
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    Input,
    Button,
    VStack,
    Heading,
    Box,
    Text,
} from "@chakra-ui/react";



const SignUp = () => {

    const [isSubmitting, setIsSubmitting] = useState(false);

    const {register, handleSubmit,watch, formState: {errors}} = useForm({mode:'onChange'});
    const onSubmit = (data) => {
        setIsSubmitting(true);

        // Ваша логика отправки формы
        console.log(data)
        setIsSubmitting(false);
    };

    return (
            <Box p={0} className={s.signUpBlock}>
            <VStack spacing={10} align="stretch">
                <Heading size="lg">Регистрация</Heading>
                <Text>Введите данные для регистрации</Text>
                <Box bg="gray.100" p={4} borderRadius="md">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <VStack spacing={4} align="stretch">
                            <FormControl isInvalid={Boolean(errors.email)}>
                                <FormLabel>Email</FormLabel>
                                <Input type="email" {...register("email", {
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
                                <Input type="password" {...register("password", {
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
                                <Input type="password" {...register("confirmPassword", {
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
                            >
                                Зарегистрироваться
                            </Button>
                        </VStack>
                    </form>
                </Box>
            </VStack>
        </Box>
    );
}


export default SignUp;