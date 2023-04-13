import { AxiosResponse } from 'axios';
import { instagramInstance } from "@/services/instagramInstance";

export const test = {}
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
  createNewPassword: ({newPassword, recoveryCode}: {
    newPassword: string,
    recoveryCode: string
  }): Promise<AxiosResponse> => {
    return instagramInstance.post('auth/new-password', {newPassword, recoveryCode})
  },

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
