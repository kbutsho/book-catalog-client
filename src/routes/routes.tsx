import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import BookDetails from "../pages/BookDetails";
import PrivateRoute from "./PrivateRoute";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import NotFound from "../pages/NotFound";
import Books from "../pages/Books";
import AddBook from "../pages/AddBook";
import UpdateBook from "../pages/UpdateBook";
import WishList from "../pages/WishList";
import ReadingList from "../pages/ReadinList";

const routes = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                index: true,
                element: <Home />,
            },
            {
                path: '/books',
                element: <Books />,
            },
            {
                path: '/book/details/:id',
                element: <BookDetails />,
            },
            {
                path: '/add-book',
                element: (
                    <PrivateRoute>
                        <AddBook />,
                    </PrivateRoute>
                ),
            },
            {
                path: '/book/update/:id',
                element: (
                    <PrivateRoute>
                        <UpdateBook />,
                    </PrivateRoute>
                ),
            },
            {
                path: '/wish-list',
                element: (
                    <PrivateRoute>
                        <WishList />,
                    </PrivateRoute>
                ),
            },
            {
                path: '/reading-list',
                element: (
                    <PrivateRoute>
                        <ReadingList />,
                    </PrivateRoute>
                ),
            },
        ],
    },
    {
        path: '/login',
        element: <Login />,
    },
    {
        path: '/signup',
        element: <Signup />,
    },
    {
        path: '*',
        element: <NotFound />,
    },
]);

export default routes;