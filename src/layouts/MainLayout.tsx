
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const MainLayout = () => {
    return (
        <div>
            <Navbar />
            <div className="mt-5">
                <Outlet />
            </div>
        </div>
    );
};

export default MainLayout;