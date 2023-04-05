import {instagramInstance} from '@/services/instagramInstance';

export const InstagramApi = {
    signUp:({email,password}: { email: string; password: string })=>{
        return instagramInstance.post('users/',{
            email,
            password
        })
    },
    me:()=>{
      return  instagramInstance.get('')
    },
    login:()=>{},
}