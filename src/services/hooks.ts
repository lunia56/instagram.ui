// import {QueryObserverResult, useQuery} from '@tanstack/react-query';
import {InstagramApi} from '@/services/index';
import {useMutation, useQuery} from '@tanstack/react-query';
import {useRouter} from 'next/router';

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
export const useLoginMutation = () => {
    const { push } = useRouter();
    return useMutation({
        mutationFn: InstagramApi.signUp,
        onSuccess: (res) => {
            // push("/");
            // открывается модалка
        },
    });
};

export const useSignInMutation = () => {
    const { push } = useRouter();
    return useMutation({
        mutationFn: InstagramApi.signIn,
        onSuccess: (res) => {
            // push("/");
            // открывается модалка
        },
        onError: (e) => {
            // console.log(`ERROR:${e.message}`)
        }
    });
};