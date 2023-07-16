import { useEffect, useState } from 'react'
import { useDeleteBookMutation } from "../redux/features/books/bookApi";
import { useAppSelector } from "../redux/hook";
import { IBook } from "../types/globalTypes";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Modal, ModalBody, ModalFooter } from "reactstrap";
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
            if (isError) {
                if (error && "data" in error) {
                    toast.error((error as any).data.message);
                }
            }
        }
    }, [data, isSuccess, isError])
    // edit book
    return (
        <tr key={book._id}>
            <td>{index + 1}</td>
            <td>{book.title}</td>
            <td>{book.author}</td>
            <td>{book.publicationDate.split('T')[0].split('-').reverse().join('/')}</td>
            <td>{book.genre}</td>
            <td><img src={book.image} alt="img" style={{ height: "50px" }} /></td>
            <td className="d-flex">
                <button className="btn btn-primary btn-sm fw-bold">Details</button>
                <button className="btn btn-success btn-sm fw-bold mx-2 px-3">Edit</button>
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