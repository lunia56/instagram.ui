import {instagramInstance} from '@/services/instagramInstance';

export const InstagramApi = {
    signUp:({login,email,password}: { login:string, email: string; password: string })=>{
        return instagramInstance.post('auth/registration',{
            login,
            email,
            password
        })
    },
    me:()=>{
      return  instagramInstance.get('')
    },
    login:()=>{},
}