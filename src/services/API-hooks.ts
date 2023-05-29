import { useMutation, useQuery } from "@tanstack/react-query";
import { meSendRequest } from "@/services/instagramInstance";
import { noRefetch } from "@/components/common/helpers/no-refetch";
import { InstagramAuthApi, InstagramUserApi } from "@/services/index";
import { AxiosError } from "axios";
import { useRouter } from "next/router";


export const useMeQuery = (
  saveUserId?: (userId: number) => void,
  setHasBusinessAccount?: (hasBusinessAccount: boolean) => void
) => {
    return useQuery({
        queryFn: meSendRequest,
        onSuccess: data => {
            if (saveUserId) {
                saveUserId(data.data.userId)
            }
            if (setHasBusinessAccount) {
                setHasBusinessAccount(data.data.hasBusinessAccount)
            }
        },
        queryKey: ['me'],
        retry: false,
        staleTime: 300000,
        ...noRefetch,
    })
}





export const useEmailResendingMutation = (callback: () => void) => {
    // const {push} = useRouter()
    return useMutation({
        mutationFn: InstagramAuthApi.emailResent,
        onSuccess: () => {
            callback()

        },
        onError: (error: AxiosError) => {

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
        onError: (error: AxiosError<{ errorMessage: [{ message: string, field: string }] }>) => {
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
        onError: (e: AxiosError) => {
            console.log('ошибка ', e.message)
        }
    })
}
export const useLogOutMutation = () => {
    const {push} = useRouter()
    return useMutation({
        mutationFn: InstagramAuthApi.logout,
        mutationKey: ['logout'],
        onSuccess: (res) => {
            push('/')
            console.log('Logout Succes')
        },
        onError: (error: AxiosError) => {
            console.log('Logout Error')
        }
    })
}

export const useUpdateProfileMutations = () => {
    return useMutation(
        {
            mutationFn: InstagramUserApi.updateProfile,
            mutationKey: ['updateUser'],
            onSuccess: (res) => {
                console.log('updateUser Succes', res)
            },
            onError: (error: AxiosError<{ errorMessage: [{ message: string, field: string }] }>) => {
                console.log('error ', error.response?.data.errorMessage[0].message)
            }
        }
    )
}

export const usePasswordRecoveryMutation = (onSuccessHandler: () => void) => {
    const {push} = useRouter()
    return useMutation({
        mutationFn: InstagramAuthApi.passwordRecovery,
        mutationKey: ['recovery'],
        onSuccess: (res) => {
            onSuccessHandler()
        },
        onError: (error: AxiosError) => {
            console.log('recovery error')
        }
    })
}

export const useNewPasswordMutation = () => {
    return useMutation({
        mutationFn: InstagramAuthApi.newPassword,
        mutationKey: ['newPassword'],
        onSuccess: (res) => {

        },
        onError: (error: AxiosError) => {
            console.log('recovery error')
        }
    })
}