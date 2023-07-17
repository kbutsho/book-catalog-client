import { useGetBooksQuery } from "../redux/features/books/bookApi";
import { addToReadingList } from "../redux/features/readingList/readingListSLice";
import { addToWishList } from "../redux/features/wishList/wishListSlice";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import { IBook } from "../types/globalTypes";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Home = () => {
    const { data, isLoading } = useGetBooksQuery(undefined);
    const { userId } = useAppSelector((state) => state.user);
    // add to wishlist
    const dispatch = useAppDispatch();
    const handelAddToWishList = (book: IBook) => {
        if (userId) {
            dispatch(addToWishList(book));
        } else {
            toast.error('login first for add to wishlist!')
        }
    }
    const handelAddToReadingList = (book: IBook) => {
        if (userId) {
            dispatch(addToReadingList(book));
        } else {
            toast.error('login first for add to reading list!')
        }
    }
    return (
        <div className="container py-5">
            {
                isLoading ?
                    (
                        <div className="d-flex justify-content-center align-items-center" style={{ height: "68vh" }}>
                            <h4 className="fw-bold text-danger">Loading...</h4>
                        </div>
                    )
                    : (
                        <div>
                            <h3 className="fw-bold">Latest Book</h3>
                            <div className="row">
                                {data?.data?.slice(0, 10).map((book: IBook) => (
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
                                            <div className="d-flex justify-content-between mt-3">
                                                <button onClick={() => handelAddToWishList(book)} className="btn btn-primary btn-sm fw-bold">Add to wishlist</button>
                                                <button onClick={() => handelAddToReadingList(book)} className="btn btn-success btn-sm fw-bold">Add to reading list</button>
                                            </div>
                                            <ToastContainer />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )
            }
        </div>
    );
};

export default Home;