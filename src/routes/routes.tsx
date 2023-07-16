import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import BookDetails from "../pages/BookDetails";
import PrivateRoute from "./PrivateRoute";
import Checkout from "../pages/Checkout";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import NotFound from "../pages/NotFound";
import Books from "../pages/Books";

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
                path: '/checkout',
                element: (
                    <PrivateRoute>
                        <Checkout />,
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