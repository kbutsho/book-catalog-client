import { useGetBooksQuery } from "../redux/features/books/bookApi";
import { IBook } from "../types/globalTypes";

const Home = () => {
    const { data, isLoading } = useGetBooksQuery(undefined);
    return (
        <div className="container">
            {isLoading ? (
                <div className="d-flex justify-content-center align-items-center" style={{ height: "90vh" }}>
                    <h6>Loading...</h6>
                </div>
            ) : (
                <div className="row">
                    {data?.data?.slice(0, 10)
                        .map((book: IBook) => (
                            <div key={book._id} className="col-md-3">
                                <div style={{
                                    boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                                    padding: "20px", margin: "20px 0", minHeight: "350px", borderRadius: "10px"
                                }}>
                                    <img src={book.image} alt="img" style={{ height: "250px", width: "150px" }} />
                                    <h6 className="mt-3">{book.title}</h6>
                                </div>
                            </div>
                        ))}
                </div>
            )}
        </div>
    );
};

export default Home;