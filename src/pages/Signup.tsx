import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useSignupMutation } from "../redux/features/user/userApi";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";

interface SignUpError {
    name?: string;
    email?: string;
    password?: string;
}

const Signup = () => {
    const navigate = useNavigate();
    const [credential, setCredential] = useState({ name: '', email: '', password: '' });
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setCredential((prevCredentials) => ({ ...prevCredentials, [name]: value }));
    };
    const [signup, { isLoading, isError, isSuccess, error, data }] = useSignupMutation();
    const handleSignUp = () => {
        signup({ data: credential });
    };
    const [apiError, setApiError] = useState<SignUpError>({});
    const { name, email, password } = apiError;
    useEffect(() => {
        if (isSuccess && data) {
            navigate('/login');
            swal(data.message, 'login here...', 'success');
        }
        if (isError) {
            if (error && "data" in error) {
                const errorObject = (error as any).data.errorMessages.reduce((obj: any, error: any) => {
                    obj[error.path] = error.message;
                    return obj;
                }, {});
                setApiError(errorObject);
                toast.error((error as any).data.message);
            }
        }
    }, [isSuccess, data, navigate, isError, error, toast, setApiError]);

    return (
        <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
            <div className="form">
                <h3 className="mb-4">Signup</h3>
                <ToastContainer />
                <label>Name</label>
                <input required type="text" className="form-control my-3" name="name" value={credential.name} onChange={handleInputChange} />
                {name && <p className="error-message">{name}</p>}
                <label>Email</label>
                <input required type="email" className="form-control my-3" name="email" value={credential.email} onChange={handleInputChange} />
                {email && <p className="error-message">{email}</p>}
                <label>Password</label>
                <input required type="password" className="form-control my-3" name="password" value={credential.password} onChange={handleInputChange} />
                {password && <p className="error-message">{password}</p>}
                <button className="btn btn-primary mt-3 w-100" onClick={handleSignUp}>Signup</button>
                {isLoading && <span className='btn btn-sm btn-danger w-100 mt-3 fw-bold'>please wait...</span>}
            </div>
        </div>
    );
};

export default Signup;