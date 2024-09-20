import { createRootRoute, Outlet } from "@tanstack/react-router";
import NotFound from "../pages/NotFound/NotFound";
import MenuComponent from "../pages/NavLinks/NavLinks";

export const Route = createRootRoute({
    component: () => (
        <>
            <MenuComponent />
            <hr />
            <Outlet />
        </>
    ),
    notFoundComponent: () => <NotFound />,
});
