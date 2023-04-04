import {useQuery} from '@tanstack/react-query';
import {instagramApi} from '@/services/index';

export const useMeQuery = () => {
    return useQuery({queryKey: ['me'], queryFn: instagramApi.me})
}