import React, { useEffect, useState } from 'react';
import { useLoginMutation } from '../redux/features/user/userApi';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../redux/hook';
import { setLoginUser } from '../redux/features/user/userSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import swal from 'sweetalert';

const Login = () => {
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const { userId, email } = useAppSelector((state) => state.user);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setCredentials((prevCredentials) => ({ ...prevCredentials, [name]: value }));
    };
    const [loginUser, { isLoading, isError, isSuccess, error, data }] = useLoginMutation();
   
    const handleLogin = () => {
        loginUser({ data: credentials });
    };
    useEffect(() => {
        if (isSuccess) {
            dispatch(setLoginUser({ email: data.data.email, userId: data.data.id }));
        }
    }, [isSuccess, data, dispatch]);
    useEffect(() => {
        if (email && userId) {
            navigate('/');
            swal('success', data.message, "success")
        }
    }, [email, userId, navigate]);
    useEffect(() => {
        if (isError) {
            if (error && "data" in error) {
                toast.error((error as any).data.message);
            }
        }
    }, [isError, error]);


    return (
        <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
            <div className="form">
                <h3 className="mb-4">Login</h3>
                <ToastContainer />
                <label>Email</label>
                <input type="email" className="form-control mb-3" name="email" value={credentials.email} onChange={handleInputChange} />
                <label>Password</label>
                <input type="password" className="form-control" name="password" value={credentials.password} onChange={handleInputChange} />
                <button className="btn btn-primary mt-3 w-100" onClick={handleLogin}>Login</button>
                {isLoading && <span className='btn btn-sm btn-danger w-100 mt-3 fw-bold'>please wait...</span>}
            </div>
        </div>
    );
};

export default Login;
