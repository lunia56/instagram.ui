import React, {useRef, useState} from "react";
import {Controller, useForm} from "react-hook-form";
import s from './PasswordRecovery.module.scss'
import {
    Box,
    Button,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Heading,
    Input,
    Link,
    Text,
    VStack,
} from "@chakra-ui/react";
import {usePasswordRecoveryMutation} from "@/services/API-hooks";
import ModalSendEmail from "@/components/Modal/ModalSendEmail/ModalSendEmail";
import {ReCAPTCHA} from "react-google-recaptcha"

const PasswordRecovery = () => {

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [email, setEmail] = useState('');

    const captchaRef = useRef(null)

    const {
        control,
        handleSubmit,
        formState: {errors, isValid}
    } = useForm<FormValues>({mode: 'onChange'});

    const {mutate: recovery, error} = usePasswordRecoveryMutation(() => setIsOpen(true))

    const onSubmit = (data: FormValues) => {
        setIsSubmitting(true);
        console.log('omSubmit:', data)
        data && recovery(data.email)
        setEmail(data.email)
        localStorage.setItem('email', data.email)
        setIsSubmitting(false);

    };

        // const onSubmitRecaptcha = (recaptchaValue:string) => {
        //     debugger
        //     useEffect(() => fetch('http://localhost:3000/passwordRecovery',{
        //         headers: {'Content-Type':'application/json'},
        //         method:"POST",
        //         body:
        //             JSON.stringify({
        //                 email:localStorage.getItem('email'),
        //                 recaptchaValue})
        //     }), [])
        //     }



    return (
        <div>
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
                                    <Text className={s.passwordRecovery__textSubEmail}>Enter your email address and we
                                        will
                                        send you further instructions</Text>
                                </FormControl>
                                <ReCAPTCHA
                                    sitekey={'6Lf2DT4mAAAAACHf7D0h51rQmnP1P0r2o3whamcz'}
                                    ref={captchaRef}
                                />
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
                {isOpen && <ModalSendEmail modalOnClick={() => setIsOpen(false)} email={email}/>}
            </Box>

        </div>


);

}

type  FormValues = {
    email: string
}

export default PasswordRecovery;


