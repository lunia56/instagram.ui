import {useRouter} from 'next/router';
import {FC, PropsWithChildren} from 'react';
import {useMeQuery} from '@/services/API-hooks';

export const AuthRedirect: FC<PropsWithChildren> = ({ children }) => {
    const { isLoading, isError } = useMeQuery();
    const { pathname, push } = useRouter();
    if (isLoading) {
        return <div>Loading...</div>;
    }
    if (isError && pathname !== "/login") {
        push("/login");
    } else {
        return <>{children}</>;
    }
    return null;
};
