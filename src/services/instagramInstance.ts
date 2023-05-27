import axios, {AxiosError, AxiosResponse} from 'axios'

export type ResMe = {
    userId: number
    userName: string | null
    email: string
    hasBusinessAccount: boolean
}

// const baseURL = 'https://inctagram-production.up.railway.app/'
const baseURL = 'http://localhost:3000/'
export const instagramInstance = axios.create({
    baseURL: baseURL,
    withCredentials: true
})

// interceptors- перехватывает наши запросы на сервер
// при каждом запросе у нас в header запроса прикрепляется наш токен

export const meSendRequest = () => {
    return instagramInstance.get<ResMe>('auth/me')
}

instagramInstance.interceptors.request.use(
  config => {
      config.headers.Authorization = `Bearer ${localStorage.getItem('accessToken')}`

      return config
  },
  error => Promise.reject(error)
)



// когда любой вопрос возвращается с ошибкой 401 (токен умер) мы освежаем токен соответствующим запросом

// instagramInstance.interceptors.response.use((config) => {
//         return config
//     },
//     async (error) => {
//     debugger
//         const originalRequest = error.config
//         console.log('error ', error)
//         if (error.response && error.response.status == 401) {
//             try {
//                 const response = await axios.post<AxiosResponse<{
//                     accessToken: string
//                 }>>(`${baseURL}/auth/refresh-token`, {withCredentials: true})
//                 localStorage.setItem('token', response.data.data.accessToken)
//                 return instagramInstance.request(originalRequest)
//             } catch (e) {
//                 console.log('НЕ АВТОРИЗОВАН')
//             }
//             }
//         }
//     )
