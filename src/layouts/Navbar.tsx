import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import { removeLoginUser } from "../redux/features/user/userSlice";
import swal from 'sweetalert';


const Navbar = () => {
    const { email } = useAppSelector((state) => state.user);
    const { books: wishList } = useAppSelector((state) => state.wishList);
    const { books: readingList } = useAppSelector((state) => state.readingList);
    const dispatch = useAppDispatch();
    const handleLogout = () => {
        dispatch(removeLoginUser());
        localStorage.removeItem('email')
        localStorage.removeItem('userId')
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
                    <div className="navbar-nav ms-auto text-uppercase fw-bold">
                        <Link className="nav-link" to="/">Home</Link>
                        <Link className="nav-link" to="/books">All books</Link>
                        {email ? (
                            <>
                                <Link className="nav-link " to="/wish-list">Wish list <span className="text-danger">{wishList.length > 0 ? wishList.length : ''}</span></Link>
                                <Link className="nav-link " to="/reading-list">Reading list <span className="text-danger">{readingList.length > 0 ? readingList.length : ''}</span></Link>
                                <Link className="nav-link " to="/add-book">Add Book</Link>
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