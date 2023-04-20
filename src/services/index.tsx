import {instagramInstance} from '@/services/instagramInstance'
import {AxiosResponse} from 'axios'

export const InstagramApi = {
    signUp:({login,email,password}:RegistrationData):Promise<AxiosResponse>=>{
        return instagramInstance.post('auth/registration',{
            login,
            email,
            password
        })
    },
    signUpSocial:()=>{
        return  instagramInstance.get<AxiosResponse<{accessToken:string}>>('auth/google')
    },
    me:():Promise<AxiosResponse<AxiosResponseMe>> =>{
      return  instagramInstance.get('auth/me')
    },
    emailResent:(email:string)=>{
        return instagramInstance.post('auth/registration-email-resending',{email:email})
    },
    signIn:({email,password}: SignInData):Promise<AxiosResponse<{accessToken:string}>> =>{
        console.log(email, password)
        return instagramInstance.post('/auth/login',{
            email,
            password
        })
    },
    logout:()=>{
        return instagramInstance.post('auth/logout', {})
    },
    passwordRecovery:(email:string)=>{
        console.log(email)
        return instagramInstance.post('/auth/password-recovery', {email})
    },
    newPassword:({newPassword, recoveryCode}) => {
    return instagramInstance.post('/auth/new-password', {newPassword, recoveryCode})
}

}

type AxiosResponseNewPassword = {
    newPassword:string
    recoveryCode:string
}

type AxiosResponseMe = {
    email:string
    login:string
    userId:string
}
type RegistrationData = {
    login:string
    email: string
    password: string
}
type SignInData = {
    email: string
    password: string
}