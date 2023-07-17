import { useParams } from "react-router-dom";
import { useSingleBookQuery } from "../redux/features/books/bookApi";
import { useAddReviewMutation, useGetReviewsQuery } from "../redux/features/reviews/reviewApi";
import { useState, useEffect } from 'react';
import { useAppSelector } from "../redux/hook";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { IReview } from "../types/globalTypes";

const BookDetails = () => {
    const { id } = useParams();
    const { userId } = useAppSelector((state) => state.user);

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
    return (
        <div className="container py-5">
            {isLoading ?
                (
                    <div className="d-flex justify-content-center align-items-center" style={{ height: "75vh" }}>
                        <h4 className="fw-bold text-danger">Loading...</h4>
                    </div>
                ) : (
                    <div className="row">
                        <div className="col-md-8">
                            <img src={book.data.image} alt="img" style={{ width: "200px", height: "300px" }} />
                            <h5 className="my-3">Title: {book.data.title}</h5>
                            <h6>Genre: {book.data.genre}</h6>
                            <h6>Author: {book.data.author}</h6>
                            <h6>Publication Date: {book.data.publicationDate.split('T')[0].split('-').reverse().join('-')}</h6>
                        </div>
                        <div className="col-md-4">
                            <h4>All reviews</h4>
                            <ul>
                                {reviews?.data?.map((r: IReview, index: number) => (
                                    <li style={{ listStyle: "none" }} key={index}>{r.comment}</li>
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