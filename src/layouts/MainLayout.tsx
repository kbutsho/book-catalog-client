
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const MainLayout = () => {
    return (
        <div>
            <Navbar />
            <div>
                <Outlet />
            </div>
        </div>
    );
};

export default MainLayout;