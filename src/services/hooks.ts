// import {QueryObserverResult, useQuery} from '@tanstack/react-query';
import {InstagramApi} from '@/services/index';
import {QueryObserverResult, useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {useRouter} from 'next/router';

// export const useSignUpQuery = () => {
//     return useQuery({ queryKey: ['signUp'],queryFn: InstagramApi.signUp})
// }

export const useMeQuery = () => {
    return useQuery({queryKey: ['me'], queryFn: InstagramApi.me})
}


export const useLoginMutation = () => {
    const { push } = useRouter();
    return useMutation({
        mutationFn: InstagramApi.signUp,
        onSuccess: (res) => {
            push("/");
        },
    });
};