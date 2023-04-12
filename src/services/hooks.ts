// import {QueryObserverResult, useQuery} from '@tanstack/react-query';
import { InstagramApi } from '@/services/index';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { AxiosError } from 'axios';

// export const useSignUpQuery = () => {
//     return useQuery({ queryKey: ['signUp'],queryFn: InstagramApi.signUp})
// }

export const useMeQuery = () => {
  return useQuery({queryKey: ['me'], queryFn: InstagramApi.me})
}
export const useSignUpSocialQuery = () => {
  return useQuery({queryKey: ['signUpSocial'], queryFn: InstagramApi.signUpSocial})
}

// export const useEmailResendingQuery = () => {
//     return useQuery({queryKey: ['emailResend'], queryFn: InstagramApi.me})
// }

export const useEmailResendingMutation = () => {
  const {push} = useRouter();
  return useMutation({
    mutationFn: InstagramApi.emailResent,
    onSuccess: (res) => {
      // push("/");
      // открывается модалка
    },
  });
};

export const useRegisterMutation = (setError: any, onSuccessHandler: () => void, reset: any) => {
  return useMutation({
    mutationFn: InstagramApi.signUp,
    mutationKey: ['registered'],
    onSuccess: (res) => {
      reset()
      onSuccessHandler()
    },
    onError: (error: AxiosError) => {
      error.response?.status === 400 &&
      setError('login', {type: 'manual', message: 'User with this username or email is already registered'})
    }
  });
};

export const useCreateNewPasswordMutation = (resetPasswordToken: any,reset:any) => {
  const {push} = useRouter()
  return useMutation({
    mutationFn: InstagramApi.createNewPassword,
    mutationKey: ['create-new-password'],
    onSuccess: () => {
      reset(),
        push('/signin')
    },
    onError: (e: AxiosError) => {
      console.log(e.message)
    }
  })
}

// const errorHandler=(error,setError)=>{
//     error.status === 400 &&
//     setError('login', { type: 'manual', message: `${error.message} /User with this username is already registered` })
// }

export const useSignInMutation = () => {
  const {push} = useRouter();
  return useMutation({
    mutationFn: InstagramApi.signIn,
    onSuccess: (res) => {
      // push("/");
      // открывается модалка
    },
    onError: (e) => {
      // console.log(`ERROR:${e.}`)
    }
  });
};