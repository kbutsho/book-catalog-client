import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useGetBooksQuery } from "../redux/features/books/bookApi";
import { useAppSelector } from "../redux/hook";
import { IBook } from "../types/globalTypes";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BookList from '../components/BookList';

const Books = () => {
    const { data, isLoading, refetch } = useGetBooksQuery(undefined, { refetchOnMountOrArgChange: true });
    const { email } = useAppSelector((state) => state.user)
    const navigate = useNavigate()

    // filter by genre
    const uniqueGenres: string[] = Array.from(new Set(data?.data?.map((book: IBook) => book.genre)));
    const [selectedGenre, setSelectedGenre] = useState<string>('');
    const [genreFilter, setGenreFilter] = useState<Array<any>>([]);

    const filterByGenre = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value !== "") {
            setSelectedGenre(e.target.value);
            const filter = data?.data?.filter(
                (item: { genre: string }) =>
                    item.genre === e.target.value
            );
            setGenreFilter(filter)
        } else if (e.target.value.length === 0) {
            setGenreFilter(data.data)
        } else {
            setSelectedGenre(e.target.value);
        }
    }

    // search field
    const [book, setBook] = useState('');
    const [searchBook, setSearchBook] = useState<Array<any>>([]);
    const searchData = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value !== "") {
            setBook(e.target.value);
            const filter = data.data.filter((o: any) =>
                Object.keys(o).some(k =>
                    String(o[k]).toLowerCase().includes(e.target.value.toLowerCase())
                )
            );
            setSearchBook([...filter]);
        } else {
            setBook(e.target.value);
        }
    };

    // add book 
    const addBook = () => {
        if (email) {
            navigate('/add-book');
        } else {
            toast('login first!')
        }
    }

    return (
        <div className="container py-5">
            {
                isLoading ?
                    (
                        <div className='d-flex justify-content-center align-items-center' style={{ height: "75vh" }}>
                            <h4 className='fw-bold text-danger'>Loading...</h4>
                        </div>
                    ) :
                    (
                        <div className="row">
                            <div className="col-md-3">
                                <h5 className='fw-bold'>Filter by Genre</h5>
                                {
                                    uniqueGenres.map((genre: string, index) => (
                                        <div key={index}>
                                            <input
                                                type="radio"
                                                name="genre"
                                                id={`genre_${index}`}
                                                value={genre}
                                                onChange={filterByGenre}
                                            />
                                            <label className="ms-3 my-1" htmlFor={`genre_${index}`} style={{ cursor: "pointer" }}>
                                                {genre}
                                            </label>
                                        </div>
                                    ))
                                }
                                <div>
                                    <input
                                        type="radio"
                                        name="genre"
                                        id="genre_all"
                                        value=''
                                        onChange={filterByGenre}
                                    />
                                    <label className="ms-3 my-1" htmlFor="genre_all" style={{ cursor: "pointer" }}>
                                        All Genre
                                    </label>
                                </div>

                            </div>
                            <div className="col-md-9">
                                <div>
                                    <ToastContainer />
                                    <div className="d-flex justify-content-between mb-3">
                                        <h3 className="fw-bold">All Book List</h3>
                                        <button onClick={addBook} className="btn btn-primary btn-sm fw-bold">Add Book</button>
                                    </div>
                                    <input value={book} onChange={searchData} type="text" placeholder="search..." className="form-control mb-3 py-2" />
                                    <table className="table table-striped table-hover">
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Title</th>
                                                <th>Author</th>
                                                <th>Publication Date</th>
                                                <th>Genre</th>
                                                <th>Image</th>
                                                <th className="text-center">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                book && book.length > 0 ? searchBook.map((book: IBook, index: number) => (
                                                    <BookList key={book._id} book={book} index={index} refetch={refetch} />
                                                )) : selectedGenre && selectedGenre.length > 0 ?
                                                    genreFilter.map((book: IBook, index: number) => (
                                                        <BookList key={book._id} book={book} index={index} refetch={refetch} />
                                                    )) : data.data.map((book: IBook, index: number) => (
                                                        <BookList key={book._id} book={book} index={index} refetch={refetch} />
                                                    ))
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>)}
        </div>
    );
};

export default Books;