// import {QueryObserverResult, useQuery} from '@tanstack/react-query';
import {InstagramApi} from '@/services/index';
import {useMutation, useQuery} from '@tanstack/react-query';
import {useRouter} from 'next/router';
import {useToast} from '@chakra-ui/react';
import {AxiosError} from 'axios';

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
export const useRegisterMutation = (setError:any, onSuccessHandler:()=>void,reset:any) => {
    return useMutation({
        mutationFn: InstagramApi.signUp,
        mutationKey:['registered'],
        onSuccess: (res) => {
            reset()
            onSuccessHandler()
        },
        onError: (error:AxiosError) => {
            error.response?.status === 400 &&
            setError('login', {type: 'manual', message: 'User with this username or email is already registered'})
        }
    });
};
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
}
export const useLogOutMutation = () => {
    const { push } = useRouter();
    return useMutation({
        mutationFn: InstagramApi.logout,
        mutationKey:['logout'],
        onSuccess: (res) => {
            push("/");
            console.log('Logout Succes')
        },
        onError: (error:AxiosError) => {
            console.log('Logout Error')
        }
    });
};