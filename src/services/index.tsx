import {instagramInstance} from '@/services/instagramInstance';

export const instagramApi = {
    login:()=>{},
    me:()=>{
        instagramInstance.get('')
    },
}