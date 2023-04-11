import { instagramInstance } from '@/services/instagramInstance';
import { AxiosResponse } from 'axios';

type AxiosResponseMe = {
  email: string
  login: string
  userId: string
}

type ReqNewPassword = {
  newPassword: string
  recoveryCode: string
}


export const test = {}
export const InstagramApi = {
  signUp: ({login, email, password}: { login: string, email: string; password: string }) => {
    console.log('data', {login, email, password})

    return instagramInstance.post('auth/registration', {
      login,
      email,
      password
    })
  },
  signUpSocial: () => {
    return instagramInstance.get<AxiosResponse<{ accessToken: string }>>('auth/google')
  },
  me: () => {
    return instagramInstance.get<AxiosResponse<AxiosResponseMe>>('auth/me')
  },
  emailResent: (email: string) => {
    return instagramInstance.post('auth/registration-email-resending', {email: email})
  },
  signIn: ({email, password}: { email: string; password: string }) => {
    console.log(email, password)
    return instagramInstance.post('/auth/login', {
      email,
      password
    })
  },
  createNewPassword(data: ReqNewPassword): Promise<AxiosResponse> {
    const {newPassword, recoveryCode} = data
    return instagramInstance.post('auth/new-password', {newPassword, recoveryCode})
  },

}
