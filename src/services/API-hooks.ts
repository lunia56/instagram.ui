import {InstagramApi} from '@/services/index'
import {useMutation, useQuery} from '@tanstack/react-query'
import {useRouter} from 'next/router'
import {AxiosError} from 'axios'


export const useMeQuery = () => {
    return useQuery({queryKey: ['me'], queryFn: InstagramApi.me})
}




export const useEmailResendingMutation = () => {
    // const {push} = useRouter()
    return useMutation({
        mutationFn: InstagramApi.emailResent,
        onSuccess: (res) => {

        },
    })
}
export const useRegisterMutation = (setError: any, onSuccessHandler: () => void) => {
    return useMutation({
        mutationFn: InstagramApi.signUp,
        mutationKey: ['registered'],
        onSuccess: (res) => {
            onSuccessHandler()
        },
        onError: (error: AxiosError<{errorMessage:[{message:string,field:string}]}>) => {
            console.log('errorsMessages', error.response?.data.errorMessage[0].message)
            error.response && error.response?.status === 400 &&
            setError('login', {type: 'manual', message: 'User with this username or email is already registered'})
        }
    })
}



export const useSignInMutation = () => {
    const {push} = useRouter()
    return useMutation({
        mutationFn: InstagramApi.signIn,
        onSuccess: (res) => {
            localStorage.setItem('token', res.data.accessToken)
            push('/EditProfile')
            //добавить флаг в зустанд сторе isLoggedIn и установить true
        },
        onError: (e:AxiosError) => {
             console.log('ошибка ',e.message)
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