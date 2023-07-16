import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import { removeLoginUser } from "../redux/features/user/userSlice";
import swal from 'sweetalert';


const Navbar = () => {
    const { email } = useAppSelector((state) => state.user);
    const dispatch = useAppDispatch();
    const handleLogout = () => {
        dispatch(removeLoginUser());
        swal('success', 'logout successfully!', 'success')
    };
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container">
                <Link className="navbar-brand fw-bold" to="/">BOOK CATALOG</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav ms-auto">
                        <Link className="nav-link" to="/">Home</Link>
                        <Link className="nav-link" to="/books">Books</Link>
                        {email ? (
                            <>
                                <span className="nav-link fw-bold text-danger" style={{ cursor: "pointer" }} onClick={handleLogout}>Logout</span>
                            </>
                        ) : (
                            <>
                                <Link className="nav-link " to="/login">Login</Link>
                                <Link className="nav-link" to="/signup">Signup</Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;