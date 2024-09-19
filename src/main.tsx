import { createRouter, RouterProvider } from '@tanstack/react-router'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/tailwind.css';
import { AuthService } from './core/auth/authService';
import { routeTree } from './routeTree.gen';
import { container } from './core/di/dependencyContainer/dependencyContainer';

container.registerSingleton('AuthService', new AuthService());
const router = createRouter({ routeTree })

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>,
)
