import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useGetBooksQuery, useGetGenresQuery, useGetPublicationDatesQuery } from "../redux/features/books/bookApi";
import { useAppSelector } from "../redux/hook";
import { IBook } from "../types/globalTypes";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BookList from '../components/BookList';
import Slider from "@mui/material/Slider";
type Range = [number, number];

const Books = () => {
    const { email } = useAppSelector((state) => state.user)
    const navigate = useNavigate()

    // start filter by publication date 
    let lowestYear = 1825;
    let highestYear = new Date().getFullYear();
    const { data: publicationRangeData } = useGetPublicationDatesQuery(undefined, {
        refetchOnMountOrArgChange: true
    });
    const [publicationDateRange, setPublicationDateRange] = useState<Range>(
        publicationRangeData?.data ?
            [publicationRangeData.data[0], publicationRangeData.data[1]] : [lowestYear, highestYear]
    );
    const updatePublicationDateRange = () => {
        if (publicationRangeData?.data) {
            setPublicationDateRange([publicationRangeData.data[0], publicationRangeData.data[1]]);
        }
    };
    useEffect(() => {
        updatePublicationDateRange();
    }, [publicationRangeData]);
    const handleDateChanges = (event: any, newValue: number | number[]) => {
        console.log(event)
        if (Array.isArray(newValue)) {
            setPublicationDateRange(newValue as Range);
        }
    }
    // end filter by publication date 

    // start filter by genre
    const [filterByGenre, setFilterByGenre] = useState<string>('');
    const { data: genreData } = useGetGenresQuery(undefined, {
        refetchOnMountOrArgChange: true
    });
    const handelFilterByGenre = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFilterByGenre(e.target.value);
    }
    // end filter by genre

    // start search by  title, author, genre
    const [searchTerm, setSearchTerm] = useState('');
    const handelSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };
    // end search by  title, author, genre

    // fetch book data
    const { data, isLoading, refetch } = useGetBooksQuery(undefined, {
        refetchOnMountOrArgChange: true
    });

    // start filter and search
    const filteredData = data?.data?.filter((book: IBook) => {
        const genreMatch = filterByGenre ? book.genre.includes(filterByGenre) : true;
        const searchMatch = searchTerm === '' ||
            book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
            book.genre.toLowerCase().includes(searchTerm.toLowerCase());
        const publicationYear = parseInt(book.publicationDate.substring(0, 4));
        const publicationYearInRange = publicationYear >= publicationDateRange[0] && publicationYear <= publicationDateRange[1];
        return searchMatch && genreMatch && publicationYearInRange;
    });
    // end filter and search

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
                        <div className='d-flex justify-content-center align-items-center' style={{ height: "68vh" }}>
                            <h4 className='fw-bold text-danger'>Loading...</h4>
                        </div>
                    ) :
                    (
                        <div className="row">
                            <div className="col-md-3">
                                <h5 className='fw-bold'>Filter by Genre</h5>
                                {
                                    genreData ? (
                                        genreData.data.map((genre: string, index: number) => (
                                            <div key={index}>
                                                <input
                                                    type="radio"
                                                    name="genre"
                                                    id={`genre_${index}`}
                                                    value={genre}
                                                    onChange={handelFilterByGenre}
                                                />
                                                <label className="ms-3 my-1" htmlFor={`genre_${index}`} style={{ cursor: "pointer" }}>
                                                    {genre}
                                                </label>
                                            </div>
                                        ))
                                    ) : null
                                }
                                <div>
                                    <input
                                        type="radio"
                                        name="genre"
                                        id="genre_all"
                                        value=''
                                        onChange={handelFilterByGenre}
                                    />
                                    <label className="ms-3 my-1" htmlFor="genre_all" style={{ cursor: "pointer" }}>
                                        All Genre
                                    </label>
                                </div>

                                <h5 className='mt-3 fw-bold'>Filter by Publication Year</h5>
                                {publicationRangeData?.data && (
                                    <div className='me-4'>
                                        <Slider value={publicationDateRange} onChange={handleDateChanges} valueLabelDisplay="auto" min={lowestYear} max={highestYear} />
                                        <p>Range is {publicationDateRange[0]} - {publicationDateRange[1]}</p>
                                    </div>
                                )}
                            </div>
                            <div className="col-md-9">
                                <div>
                                    <ToastContainer />
                                    <div className="d-flex justify-content-between mb-3">
                                        <h3 className="fw-bold">All Book List</h3>
                                        <button onClick={addBook} className="btn btn-primary btn-sm fw-bold">Add Book</button>
                                    </div>
                                    <input value={searchTerm} onChange={handelSearch} type="text" placeholder="search..." className="form-control mb-3 py-2" />
                                    <table className="table table-striped table-hover">
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Title</th>
                                                <th>Author</th>
                                                <th>Publication Date</th>
                                                <th>Genre</th>
                                                <th className="text-center">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                filteredData?.map((book: IBook, index: number) => (
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