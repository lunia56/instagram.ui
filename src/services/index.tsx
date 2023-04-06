import {instagramInstance} from '@/services/instagramInstance';
import {AxiosResponse} from 'axios';
import {type} from 'os';

export const InstagramApi = {
    signUp:({login,email,password}: { login:string, email: string; password: string })=>{
        return instagramInstance.post('auth/registration',{
            login,
            email,
            password
        })
    },
    me:()=>{
      return  instagramInstance.get<AxiosResponse<AxiosResponseMe>>('auth/me')
    },
    emailResent:(email:string)=>{
        return instagramInstance.post('auth/registration-email-resending',{email:email})
    },
    login:()=>{},
}

type AxiosResponseMe = {
    email:string
    login:string
    userId:string
}