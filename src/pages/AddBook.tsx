import { useState, useEffect } from 'react';
import { useAppSelector } from "../redux/hook";
import { useAddBookMutation } from '../redux/features/books/bookApi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';

interface ApiError {
    title?: string;
    author?: string;
    publicationDate?: string;
    image?: string;
    genre?: string;
}

const AddBook = () => {
    const navigate = useNavigate()
    const { userId } = useAppSelector((state) => state.user);
    const [bookData, setBookData] = useState({
        title: '', author: '', genre: '', publicationDate: '', image: ''
    });


    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setBookData((data) => ({ ...data, [name]: value }));
    };
    const [savedBook, { isLoading, isError, isSuccess, error, data }] = useAddBookMutation();

    const handleSaveBook = () => {
        savedBook(
            {
                data: {
                    ...bookData, userId: userId
                }
            });
    };
    const [apiError, setApiError] = useState<ApiError>({});
    const { title, author, publicationDate, image, genre } = apiError;
    useEffect(() => {
        if (isError) {
            if (error && "data" in error) {
                const errorObject = (error as any).data.errorMessages.reduce((obj: any, error: any) => {
                    obj[error.path] = error.message;
                    return obj;
                }, {});
                setApiError(errorObject)
                toast.error((error as any).data.message);
            }
        }
    }, [isError, error]);
    useEffect(() => {
        if (isSuccess && data) {
            navigate('/books');
            swal('success', data.message, 'success');
        }
    })
    return (
        <div className="container d-flex justify-content-center align-items-center" style={{ height: "85vh" }}>
            <div className="form">
                <ToastContainer />
                <h3 className="fw-bold mb-4">Add Book</h3>
                <input type="text" required onChange={handleInputChange} placeholder="title" name="title" className="form-control my-3" />
                {title && <span className="error-message">{title}</span>}
                <input type="text" required onChange={handleInputChange} placeholder="author" name="author" className="form-control my-3" />
                {author && <span className="error-message">{author}</span>}
                <input type="text" required onChange={handleInputChange} placeholder="genre" name="genre" className="form-control my-3" />
                {genre && <span className="error-message">{genre}</span>}
                <input type="date" required onChange={handleInputChange} placeholder="genre" name="publicationDate" className="form-control my-3" />
                {publicationDate && <span className="error-message">{publicationDate}</span>}
                <input type="text" required onChange={handleInputChange} placeholder="image URL" name="image" className="form-control my-3" />
                {image && <span className="error-message">{image}</span>}
                <button onClick={handleSaveBook} className="btn btn-primary w-100">save</button>
                {isLoading && <span className='btn btn-sm btn-danger w-100 mt-3 fw-bold'>please wait...</span>}
            </div>
        </div>
    );
};

export default AddBook;