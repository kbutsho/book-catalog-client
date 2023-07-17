import { removeFromReadingList } from "../redux/features/readingList/readingListSLice";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import { IBook } from "../types/globalTypes";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ReadingList = () => {
    const { books } = useAppSelector((state) => state.readingList);
    const dispatch = useAppDispatch();
    const removeFromReading = (book: IBook) => {
        dispatch(removeFromReadingList(book))
    }
    return (
        <div className="container py-5" style={{ minHeight: '75vh' }}>
            <div>
                <h3 className="fw-bold">Reading List</h3>
                <div className="row">
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
                                <button onClick={() => removeFromReading(book)} className="btn btn-danger fw-bold mt-3 w-100">remove from reading list</button>
                            </div>
                            <ToastContainer />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ReadingList;