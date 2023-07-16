import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '../redux/hook';

interface IProps {
    children: ReactNode;
}

export default function PrivateRoute({ children }: IProps) {
    const { email } = useAppSelector((state) => state.user);
    const { pathname } = useLocation();
    if (!email) {
        return <Navigate to="/login" state={{ path: pathname }} />;
    }
    return children;
}
