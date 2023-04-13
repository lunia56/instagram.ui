import React, { useState } from 'react';
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
  Progress,
  VStack
} from "@chakra-ui/react";
import style from "./CreateNewPassword.module.scss";
import { Controller, useForm } from "react-hook-form";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useCreateNewPasswordMutation, useRegisterMutation } from "@/services/hooks";
import { useRouter } from "next/router";

type FormValues = {
  login: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const CreateNewPassword = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();

  const {token} = router.query
  const recoveryToken = token

  const {
    control,
    handleSubmit,
    watch, setError,
    formState: {errors, isValid}
  } = useForm<FormValues>({mode: 'onChange'});

  const {mutate: newPassword, isLoading,} = useCreateNewPasswordMutation(recoveryToken)

  const onSubmit = () => {
    setIsSubmitting(true);
    setIsSubmitting(false);
  };

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  return (
    <>
      {isLoading && <Progress size='xs' isIndeterminate color='gray.800' bg='gray.800'/>}

      <Box className={style.createNewPasswordContainer}>
        <VStack className={style.createNewPasswordBlock} spacing={1}>
          <Heading size="lg">Create New Password</Heading>
          <Box className={style.formBlock}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <VStack spacing={0} align="stretch">

                <FormControl isInvalid={Boolean(errors.password)}>
                  <FormLabel color={'#4C4C4C'}>New password</FormLabel>
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
                          autoComplete={'new-password'}
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
                            onClick={handleClickShowPassword}
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
                          autoComplete={'new-password'}
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
                            onClick={handleClickShowPassword}
                            icon={showPassword ?
                              <AiOutlineEye size={'20px'} color={'white'}/> :
                              <AiOutlineEyeInvisible size={'20px'} color={'white'}/>}
                          />
                        </InputRightElement>
                      </InputGroup>
                    </>)}
                  />

                  <FormErrorMessage>
                    {errors.confirmPassword && <span>{errors.confirmPassword.message}</span>}
                    {errors.confirmPassword?.type === 'validate' &&
                      <span>The password must match the new password</span>}
                  </FormErrorMessage>

                  <span className={style.spanDescr}>
                  Your password must be between 6 and 20 characters
                  </span>
                </FormControl>


                <Button
                  type="submit"
                  isLoading={isSubmitting}
                  bg='#397DF6'
                  isDisabled={!isValid || isSubmitting}
                  cursor={'pointer'}
                >
                  Create New Password
                </Button>
              </VStack>
            </form>
          </Box>
        </VStack>
      </Box>

    </>
  );
};

export default CreateNewPassword;