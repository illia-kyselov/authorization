import { Link, useLocation } from "@tanstack/react-router";

const MenuComponent: React.FC = () => {
    const location = useLocation();

    const isHomeActive = location.pathname === "/authorization/";
    const isLoginActive = location.pathname.includes("/authorization/login");

    return (
        <div className="p-3 flex gap-5 ml-4">
            <Link
                to="/authorization/"
                className={`font-semibold text-lg ${isHomeActive ? "!font-bold text-green-800" : ""}`}
            >
                Home
            </Link>
            <Link
                to="/authorization/login"
                className={`font-semibold text-lg ${isLoginActive ? "!font-bold text-green-800" : ""}`}
            >
                Login
            </Link>
        </div>
    );
};

export default MenuComponent;
