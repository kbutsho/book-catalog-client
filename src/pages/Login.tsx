import React, { useEffect, useState } from 'react';
import { useLoginMutation } from '../redux/features/user/userApi';

const Login = () => {
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const [errorMessage, setErrorMessage] = useState('');
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setCredentials((prevCredentials) => ({ ...prevCredentials, [name]: value }));
    };
    const [loginUser, { isLoading, isError, isSuccess, error, data }] = useLoginMutation();
    useEffect(() => {
        if (isError && error && 'data' in error) {
            setErrorMessage((error as any).data.message);
            setTimeout(() => {
                setErrorMessage('');
            }, 5000);
        }
    }, [isError, error]);
    const handleLogin = () => {
        setErrorMessage('');
        const options = {
            data: credentials
        };
        loginUser(options);
        if (isError) {
            if (error && 'data' in error) {
                setErrorMessage((error as any).data.message);
            }
        }
        if (isSuccess) {
            localStorage.setItem('userId', data.data.id)
            localStorage.setItem('email', data.data.email)
            setErrorMessage('');
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
            <div className="login-form">
                <h3 className="mb-4">Login</h3>
                {errorMessage ? <div className="btn btn-danger w-100 fw-bold mb-3">{errorMessage}</div> : ''}
                <label>Email</label>
                <input type="email" className="form-control mb-3" name="email" value={credentials.email} onChange={handleInputChange} />
                <label>Password</label>
                <input type="password" className="form-control" name="password" value={credentials.password} onChange={handleInputChange} />

                <button className="btn btn-primary mt-3 w-100" onClick={handleLogin}>Login</button>
                {isLoading && <button className='btn btn-sm btn-danger w-100 mt-3 fw-bold'>please wait...</button>}
            </div>
        </div>
    );
};

export default Login;
