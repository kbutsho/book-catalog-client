import { useEffect, useState } from 'react'
import { useDeleteBookMutation } from "../redux/features/books/bookApi";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import { IBook } from "../types/globalTypes";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Modal, ModalBody, ModalFooter } from "reactstrap";
import { useNavigate } from 'react-router-dom';
import { addToWishList } from '../redux/features/wishList/wishListSlice';
import { addToReadingList } from '../redux/features/readingList/readingListSLice';
interface RefetchFunction {
    (): void;
}
interface TableRowProps {
    book: IBook;
    index: number;
    refetch: RefetchFunction
}
const BookList: React.FC<TableRowProps> = ({ book, index, refetch }) => {
    const { userId } = useAppSelector((state) => state.user)
    const navigate = useNavigate()
    const dispatch = useAppDispatch();
    // delete book 
    const [modal, setModal] = useState(false);
    const toggleModal = () => {
        setModal(!modal);
    };
    const [deleteBook, { isError, isSuccess, error, data }] = useDeleteBookMutation();
    const handleDeleteBook = (id: string) => {
        const options = { id: id, data: { userId: userId } }
        deleteBook(options);
    }
    useEffect(() => {
        if (data && isSuccess) {
            toast.success(data.message)
            refetch();
        }
        if (isError) {
            if (error && "data" in error) {
                toast.error((error as any).data.message);
            }
        }
    }, [data, isSuccess, isError])

    // Details
    const handelDetails = (id: string) => {
        navigate(`/book/details/${id}`)
    }
    // update book
    const handelUpdateBook = (id: string) => {
        if (userId) {
            navigate(`/book/update/${id}`);
        } else {
            toast.error('login first!')
        }
    }
    // add to wishlist
    const handelAddToWishList = (book: IBook) => {
        if (userId) {
            dispatch(addToWishList(book));
        } else {
            toast.error('login first for add to wishlist!')
        }
    }
    // add to reading list
    const handelAddToReadingList = (book: IBook) => {
        if (userId) {
            dispatch(addToReadingList(book));
        } else {
            toast.error('login first for add to reading list!')
        }
    }

    return (
        <tr key={book._id}>
            <td>{index + 1}</td>
            <td>{book.title}</td>
            <td>{book.author}</td>
            <td>{book.publicationDate.split('T')[0].split('-').reverse().join('/')}</td>
            <td>{book.genre}</td>
            <td className="d-flex">
                <button onClick={() => handelAddToReadingList(book)} className='btn btn-warning btn-sm fw-bold me-1'>Reading</button>
                <button onClick={() => handelAddToWishList(book)} className='btn btn-info btn-sm fw-bold me-1'>Wishlist </button>
                <button onClick={() => handelDetails(book._id)} className="btn btn-primary btn-sm fw-bold">Details</button>
                <button onClick={() => handelUpdateBook(book._id)} className="btn btn-success btn-sm fw-bold mx-1">Update</button>
                <button onClick={toggleModal} className="btn btn-danger btn-sm fw-bold">Delete</button>
            </td>
            {modal ? (
                <div>
                    <Modal isOpen={modal} className="modal-md" onClick={toggleModal} >
                        <ModalBody>
                            <h5 className='py-5 text-center'>Are you sure want to delete this book?</h5>
                        </ModalBody>
                        <ModalFooter>
                            <button onClick={() => handleDeleteBook(book._id)} className="btn btn-danger btn-sm fw-bold">Delete</button>
                            <button onClick={toggleModal} className='btn btn-sm btn-primary fw-bold'>Not Now</button>
                        </ModalFooter>
                    </Modal>
                </div>
            ) : null}
        </tr>
    );
};

export default BookList;