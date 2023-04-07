import {instagramInstance} from '@/services/instagramInstance';
import {AxiosResponse} from 'axios';
import {type} from 'os';

export const InstagramApi = {
    signUp:({login,email,password}: { login:string, email: string; password: string })=>{
        console.log('data',{login,email,password})

        return instagramInstance.post('auth/registration',{
            login,
            email,
            password
        })
    },
    signUpSocial:()=>{
        return  instagramInstance.get<AxiosResponse<{accessToken:string}>>('auth/google')
    },
    me:()=>{
      return  instagramInstance.get<AxiosResponse<AxiosResponseMe>>('auth/me')
    },
    emailResent:(email:string)=>{
        return instagramInstance.post('auth/registration-email-resending',{email:email})
    },
    signIn:({email,password}: { email: string; password: string })=>{
        console.log(email, password)
        return instagramInstance.post('/auth/login',{
            email,
            password
        })
    },
}

type AxiosResponseMe = {
    email:string
    login:string
    userId:string
}