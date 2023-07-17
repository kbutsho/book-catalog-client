import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSingleBookQuery, useUpdateBookMutation } from "../redux/features/books/bookApi";
import { useState, useEffect } from 'react';
import { useAppSelector } from "../redux/hook";
import swal from "sweetalert";

const UpdateBook = () => {
    const { id } = useParams();
    const { userId } = useAppSelector((state) => state.user);
    const { data: book, isLoading } = useSingleBookQuery(id);
    const navigate = useNavigate();
    const [bookData, setBookData] = useState({
        title: book?.data?.title,
        author: book?.data?.author,
        genre: book?.data?.genre,
        image: book?.data?.image
    });
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setBookData((data) => ({ ...data, [name]: value }));
    };
    const [updateBook, { isLoading: updateBookLoading, isError, isSuccess, error, data }] = useUpdateBookMutation();
    const handleSaveBook = () => {
        updateBook({
            id: id,
            data: {
                ...bookData,
                userId: userId
            }
        })
    }
    useEffect(() => {
        if (isError) {
            if (error && "data" in error) {
                toast.error((error as any).data.message);
            }
        } if (isSuccess) {
            navigate('/books')
            swal('success', data.message, 'success')
        }
    }, [isError, error, isSuccess, data])
    return (
        <div className="container py-5">
            {isLoading ?
                (
                    <div className="d-flex justify-content-center align-items-center" style={{ height: "75vh" }}>
                        <h4 className="fw-bold text-danger">Loading...</h4>
                    </div>
                ) : (
                    <div className="d-flex justify-content-center align-items-center" style={{ height: "75vh" }}>
                        <div className="form">
                            <ToastContainer />
                            <h3 className="fw-bold mb-4">Update Book</h3>
                            <label className="fw-bold">Title</label>
                            <input type="text" defaultValue={book.data.title} onChange={handleInputChange} placeholder="title" name="title" className="form-control my-3" />
                            <label className="fw-bold">Author</label>
                            <input type="text" defaultValue={book.data.author} onChange={handleInputChange} placeholder="author" name="author" className="form-control my-3" />
                            <label className="fw-bold">Genre</label>
                            <input type="text" defaultValue={book.data.genre} onChange={handleInputChange} placeholder="genre" name="genre" className="form-control my-3" />
                            <label className="fw-bold">Image URL</label>
                            <input type="text" defaultValue={book.data.image} onChange={handleInputChange} placeholder="image URL" name="image" className="form-control my-3" />
                            <button onClick={handleSaveBook} className="btn btn-primary w-100">update</button>
                            {updateBookLoading && <span className='btn btn-sm btn-danger w-100 mt-3 fw-bold'>please wait...</span>}
                        </div>
                    </div>
                )
            }
        </div>
    );
};

export default UpdateBook;