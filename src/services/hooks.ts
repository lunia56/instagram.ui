import {InstagramApi} from '@/services/index'
import {useMutation, useQuery} from '@tanstack/react-query'
import {useRouter} from 'next/router'
import {AxiosError} from 'axios'


export const useMeQuery = () => {
    return useQuery({queryKey: ['me'], queryFn: InstagramApi.me})
}
// export const useSignUpSocialQuery = () => {
//     return useQuery({queryKey: ['signUpSocial'], queryFn: InstagramApi.signUpSocial})
// }



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
        onError: (error: AxiosError) => {
            error.response?.status === 400 &&
            setError('login', {type: 'manual', message: 'User with this username or email is already registered'})
        }
    })
}

export const useConfirmMutation = (setError: any, onSuccessHandler: () => void) => {
    return useMutation({
        mutationFn: InstagramApi.registConfirm,
        // mutationKey: ['registered'],
        onSuccess: (res) => {
            localStorage.setItem('token', )
            console.log('confirm')
        },
        onError: (error: AxiosError) => {
            error.response?.status === 400 &&
            setError('login', {type: 'manual', message: 'Confirmation code is incorrect, expired or already been applied'})
        }
    })
}



export const useSignInMutation = () => {
    const {push} = useRouter()
    return useMutation({
        mutationFn: InstagramApi.signIn,
        onSuccess: (res) => {
            localStorage.setItem('token', res.data.accessToken)
            push('/CreateProfile')
            //добавить флаг в зустанд сторе isLoggedIn и установить true
        },
        onError: (e:AxiosError) => {
            console.log(e.message)
        }
    })
}