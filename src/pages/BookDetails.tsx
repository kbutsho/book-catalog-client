import { useNavigate, useParams } from "react-router-dom";
import { useDeleteBookMutation, useSingleBookQuery } from "../redux/features/books/bookApi";
import { useAddReviewMutation, useGetReviewsQuery } from "../redux/features/reviews/reviewApi";
import { useState, useEffect } from 'react';
import { useAppSelector } from "../redux/hook";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { IReview } from "../types/globalTypes";
import { Modal, ModalBody, ModalFooter } from "reactstrap";
import swal from "sweetalert";

const BookDetails = () => {
    const { id } = useParams();
    const { userId } = useAppSelector((state) => state.user);
    const navigate = useNavigate()
    // get single book
    const { data: book, isLoading } = useSingleBookQuery(id);

    // get all review for single book
    const { data: reviews, refetch } = useGetReviewsQuery(id, {
        refetchOnMountOrArgChange: true
    });

    // post review
    const [postReview, { isError, isSuccess, data, error }] = useAddReviewMutation();
    const [comment, setComment] = useState('');
    const handelCommentSubmit = () => {
        if (userId) {
            postReview({ data: { userId: userId, bookId: id, comment: comment } });
            setComment('');
        } else {
            toast.error("login first!");
        }
    }
    useEffect(() => {
        if (data && isSuccess) {
            refetch();
            toast.success("review posted successfully!");
        }
        if (isError) {
            if (error && "data" in error) {
                toast.error((error as any).data.message);
            }
        }
    }, [data, isSuccess, error])

    // update book
    const handelUpdateBook = (id: string) => {
        if (userId) {
            navigate(`/book/update/${id}`);
        } else {
            toast.error('login first!')
        }
    }

    //delete book 
    const [modal, setModal] = useState(false);
    const toggleModal = () => {
        if (userId) {
            setModal(!modal);
        } else {
            toast.error('login first!')
        }
    };
    const [deleteBook, { isError: deleteIsError, isSuccess: deleteIsSuccess, error: deleteError, data: deleteData }] = useDeleteBookMutation();
    const handleDeleteBook = (id: string) => {
        const options = { id: id, data: { userId: userId } }
        deleteBook(options);
    }
    useEffect(() => {
        if (deleteData && deleteIsSuccess) {
            toast.success(deleteData.message)
            navigate(`/books`);
            swal('success', 'book delete successfully!', 'success')
            refetch();
        }
        if (deleteIsError) {
            if (deleteError && "data" in deleteError) {
                toast.error("you are not authorized of this book!");
            }
        }
    }, [deleteData, deleteIsSuccess, deleteIsError, deleteError])

    return (
        <div className="container py-5">
            {isLoading ?
                (
                    <div className="d-flex justify-content-center align-items-center" style={{ height: "68vh" }}>
                        <h4 className="fw-bold text-danger">Loading...</h4>
                    </div>
                ) : (
                    <div className="row">
                        <div className="col-md-8">
                            <img src={book.data.image} alt="img" style={{ width: "400px", height: "400px" }} />
                            <h5 className="my-3">Title: {book.data.title}</h5>
                            <h6>Genre: {book.data.genre}</h6>
                            <h6>Author: {book.data.author}</h6>
                            <h6>Publication Date: {book.data.publicationDate.split('T')[0].split('-').reverse().join('-')}</h6>
                            <button onClick={() => handelUpdateBook(book.data._id)} className="btn btn-primary btn-sm fw-bold mx-1 mt-3 px-4">Edit</button>
                            <button onClick={toggleModal} className="btn btn-danger btn-sm fw-bold px-4 mt-3">Delete</button>
                            {modal ? (
                                <div>
                                    <Modal isOpen={modal} className="modal-md" onClick={toggleModal} >
                                        <ModalBody>
                                            <h5 className='py-5 text-center'>Are you sure want to delete this book?</h5>
                                        </ModalBody>
                                        <ModalFooter>
                                            <button onClick={() => handleDeleteBook(book.data._id)} className="btn btn-danger btn-sm fw-bold">Delete</button>
                                            <button onClick={toggleModal} className='btn btn-sm btn-primary fw-bold'>Not Now</button>
                                        </ModalFooter>
                                    </Modal>
                                </div>
                            ) : null}
                        </div>
                        <div className="col-md-4">
                            <h4>All reviews</h4>
                            <ul>
                                {reviews?.data?.map((r: IReview, index: number) => (
                                    <li key={index}>{r.comment}</li>
                                ))}
                            </ul>

                            <h4>post a review</h4>
                            <div className="d-flex ">
                                <input type="text" className="form-control"
                                    name="comment"
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                />
                                <button className="btn btn-primary" onClick={handelCommentSubmit}>submit</button>
                            </div>
                            <ToastContainer />
                        </div>
                    </div>
                )}
        </div>
    );
};

export default BookDetails;