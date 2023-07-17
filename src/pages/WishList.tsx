import { removeFromWishList } from "../redux/features/wishList/wishListSlice";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import { IBook } from "../types/globalTypes";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const WishList = () => {
    const { books } = useAppSelector((state) => state.wishList);
    const dispatch = useAppDispatch();
    const removeFromWIshList = (book: IBook) => {
        dispatch(removeFromWishList(book))
    }
    return (
        <div className="container py-5" style={{ minHeight: '75vh' }}>
            <div>
                <h3 className="fw-bold">Wishlist</h3>
                {books.length === 0 ? (
                    <div className="d-flex justify-content-center align-items-center" style={{ height: "55vh" }}>
                        <h4 className="fw-bold text-danger"> no wishlist found</h4>
                    </div>
                ) : <div className="row">
                    {books.map((book: IBook) => (
                        <div key={book._id} className="col-md-3">
                            <div style={{
                                boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                                padding: "20px", margin: "20px 0", minHeight: "350px", borderRadius: "10px"
                            }}>
                                <div className="text-center">
                                    <img src={book.image} alt="img" style={{ borderRadius: "10px", height: "250px", width: "250px" }} />
                                </div>
                                <h5 className="mt-3">{book.title}</h5>
                                <h6>Author: {book.author}</h6>
                                <h6>Genre: {book.genre}</h6>
                                <button onClick={() => removeFromWIshList(book)} className="btn btn-danger fw-bold mt-3 w-100">remove from wishlist</button>
                            </div>
                        </div>
                    ))}
                </div>}
                <ToastContainer />
            </div>
        </div>
    );
};

export default WishList;