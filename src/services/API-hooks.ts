import {InstagramAuthApi, InstagramUserApi} from '@/services/index'
import {useMutation, useQuery} from '@tanstack/react-query'
import {useRouter} from 'next/router'
import {AxiosError} from 'axios'


export const useMeQuery = () => {
    return useQuery({queryKey: ['me'], queryFn: InstagramAuthApi.me})
}




export const useEmailResendingMutation = (callback:()=>void) => {
    // const {push} = useRouter()
    return useMutation({
        mutationFn: InstagramAuthApi.emailResent,
        onSuccess: () => {
            callback()

        },
        onError:(error:AxiosError)=>{

        }
    })
}
export const useRegisterMutation = (setError: any, onSuccessHandler: () => void) => {
    return useMutation({
        mutationFn: InstagramAuthApi.signUp,
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
        mutationFn: InstagramAuthApi.signIn,
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
        mutationFn: InstagramAuthApi.logout,
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

export const useUpdateProfileMutations = ()=>{
    return useMutation(
        {
            mutationFn:InstagramUserApi.updateProfile,
            mutationKey:['updateUser'],
            onSuccess: (res) => {
                console.log('updateUser Succes',res)
            },
            onError: (error:AxiosError<{errorMessage:[{message:string,field:string}]}>) => {
                console.log('error ',error.response?.data.errorMessage[0].message)
            }
        }
    )
}