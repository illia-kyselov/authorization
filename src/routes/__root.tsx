import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import NotFound from "../pages/NotFound/NotFound";

export const Route = createRootRoute({
    component: () => (
        <>
            <div className="p-3 flex gap-5 ml-4">
                <Link to="/" className="font-semibold [&.active]:font-bold [&.active]:text-green-800 text-lg">
                    Home
                </Link>
                <Link to="/login" className="font-semibold [&.active]:font-bold [&.active]:text-green-800  text-lg">
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
