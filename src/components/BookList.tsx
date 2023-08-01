import { useAppDispatch, useAppSelector } from "../redux/hook";
import { IBook } from "../types/globalTypes";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
const BookList: React.FC<TableRowProps> = ({ book, index }) => {
    const { userId } = useAppSelector((state) => state.user)
    const navigate = useNavigate()
    const dispatch = useAppDispatch();

    // Details
    const handelDetails = (id: string) => {
        navigate(`/book/details/${id}`)
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
            <td className="d-flex justify-content-center">
                <button onClick={() => handelAddToReadingList(book)} className='btn btn-success btn-sm fw-bold'>Reading</button>
                <button onClick={() => handelAddToWishList(book)} className='btn btn-info btn-sm fw-bold mx-2'>Wishlist </button>
                <button onClick={() => handelDetails(book._id)} className="btn btn-primary btn-sm fw-bold">Details</button>
            </td>
        </tr>
    );
};

export default BookList;