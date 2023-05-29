import { instagramInstance } from '@/services/instagramInstance'
import { AxiosResponse } from 'axios'

export const InstagramAuthApi = {
  signUp: ({login, email, password}: RegistrationData): Promise<AxiosResponse> => {
    return instagramInstance.post('auth/registration', {
      login,
      email,
      password
    })
  },
  me: (): Promise<AxiosResponse<AxiosResponseMe>> => {
    return instagramInstance.get('auth/me')
  },
  // emailResent:(email: { email:string })=>{
  //     return instagramInstance.post('auth/registration-email-resending',email)
  // },
  emailResent: (email: string) => {
    return instagramInstance.post('auth/registration-email-resending', {"email": email})
  },
  signIn: ({email, password}: SignInData): Promise<AxiosResponse<{ accessToken: string }>> => {
    console.log(email, password)
    return instagramInstance.post('auth/login', {
      email,
      password
    })
  },
  logout: () => {
    return instagramInstance.post('auth/logout', {})
  },
  passwordRecovery: (email: string) => {
    console.log(email)
    return instagramInstance.post('/auth/password-recovery', {email})
  },
  newPassword: ({newPassword, recoveryCode}: { newPassword: string, recoveryCode: string }) => {
    return instagramInstance.post('/auth/new-password', {newPassword, recoveryCode})
  }

}

export const InstagramUserApi = {
  updateProfile: (profileData: profileData) => {
    return instagramInstance.put<AxiosResponse<profileData>>('users/profile', profileData)
  },
  getProfile: () => {
    return instagramInstance.get<AxiosResponse<profileData>>('users/profile')
  }
}

type AxiosResponseMe = {
  email: string
  login: string
  userId: string
}
type RegistrationData = {
  login: string
  email: string
  password: string
}
type SignInData = {
  email: string
  password: string
}
type profileData = {
  name: string,
  surname: string,
  aboutMe: string,
  city: string,
  dateOfBirthday: string
}