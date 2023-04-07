// import {QueryObserverResult, useQuery} from '@tanstack/react-query';
import {InstagramApi} from '@/services/index';
import {useMutation, useQuery} from '@tanstack/react-query';
import {useRouter} from 'next/router';
import {useToast} from '@chakra-ui/react';

// export const useSignUpQuery = () => {
//     return useQuery({ queryKey: ['signUp'],queryFn: InstagramApi.signUp})
// }

export const useMeQuery = () => {
    return useQuery({queryKey: ['me'], queryFn: InstagramApi.me})
}
// export const useEmailResendingQuery = () => {
//     return useQuery({queryKey: ['emailResend'], queryFn: InstagramApi.me})
// }


export const useEmailResendingMutation = () => {
    const { push } = useRouter();
    return useMutation({
        mutationFn: InstagramApi.emailResent,
        onSuccess: (res) => {
            // push("/");
            // открывается модалка
        },
    });
};
export const useRegisterMutation = (setError,onSuccessHandler) => {
    const { push } = useRouter();
    return useMutation({
        mutationFn: InstagramApi.signUp,
        onSuccess: (res) => {
            // открывается модалка
            onSuccessHandler()
        },
        onError: (error)=>{
            console.log('error',error)
           error.status === 400 &&
           setError('login', { type: 'manual', message: `${error.message} /User with this username is already registered` })

    }
    });
};

// const errorHandler=(error,setError)=>{
//     error.status === 400 &&
//     setError('login', { type: 'manual', message: `${error.message} /User with this username is already registered` })
// }

    export const useSignInMutation = () => {
    const { push } = useRouter();
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