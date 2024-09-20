import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import NotFound from "../pages/NotFound/NotFound";

export const Route = createRootRoute({
    component: () => (
        <>
            <div className="p-3 flex gap-5 ml-4">
                <Link
                    to="/authorization/"
                    className={`font-semibold text-lg ${window.location.pathname === '/authorization/' ? 'font-bold text-green-800' : 'text-gray-700'}`}
                >
                    Home
                </Link>
                <Link
                    to="/authorization/login"
                    className={`font-semibold text-lg ${window.location.pathname === '/authorization/login' ? 'font-bold text-green-800' : 'text-gray-700'}`}
                >
                    Login
                </Link>
            </div>
            <hr />
            <Outlet />
        </>
    ),
    notFoundComponent: () => {
        return <NotFound />;
    },
});
