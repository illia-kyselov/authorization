import React from 'react';
import { Button } from '../../shared/Button/Button';
import { useAuth } from '../../core/hooks/useAuth';
import { useNavigate } from '@tanstack/react-router';

const HomePage: React.FC = () => {
    const { currentUser, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate({ to: '/authorization/login' });
    };

    return (
        <div className="flex flex-col gap-5 justify-center items-center min-h-[calc(100vh-4rem)] bg-gray-100">
            <h1 className="text-4xl font-medium text-green-800 mb-4">
            Welcome to home page,{" "}
                {currentUser ? (
                    <span className="inline font-bold text-lime-500">{currentUser}!</span>
                ) : (
                    <span className="inline font-bold text-lime-500">Guest!</span>
                )}
            </h1>
            {currentUser && <Button onClick={handleLogout} className="bg-red-700 text-white py-2 px-4 rounded-lg hover:bg-red-900 transition duration-300">Log out</Button>}
        </div>
    );
};

export default HomePage;
