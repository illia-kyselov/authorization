import React, { useState } from 'react';
import { Input } from '../../shared/Input/Input';
import { Button } from '../../shared/Button/Button';
import { useAuth } from '../../core/hooks/useAuth';
import { useNavigate } from '@tanstack/react-router';

const LoginPage: React.FC = () => {
    const { login, logout, currentUser } = useAuth();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleLogin = () => {
        login(username, password, (success) => {
            if (success) {
                navigate({ to: '/' });
            } else {
                setError('Invalid login or password');
            }
        });
    };

    const handleLogout = () => {
        logout();
        navigate({ to: '/' });
    };

    return (
        <div className="flex flex-col gap-3 items-center justify-center bg-gray-100 min-h-[calc(100vh-4rem)]">
            <div className="w-full max-w-sm bg-white rounded-lg shadow-md p-8">
                {currentUser ? (
                    <>
                        <p className="text-lime-600 text-2xl font-bold text-center py-3 px-3 mb-3 rounded-lg">
                            You are already logged in
                        </p>
                        <Button onClick={handleLogout} className="bg-red-700 text-white py-2 px-4 w-full rounded-lg hover:bg-red-900 transition duration-300">
                            Log Out
                        </Button>
                    </>
                ) : (
                    <>
                        <h1 className="text-2xl font-medium text-center text-green-800 mb-6">
                            Login
                        </h1>

                        <Input
                            type="text"
                            value={username}
                            className="w-full"
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Enter username"
                        />
                        <Input
                            type="password"
                            value={password}
                            className="w-full"
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter password"
                        />
                        <Button onClick={handleLogin} className="w-full">
                            Log In
                        </Button>
                        {error && (
                            <p className="text-red-500 text-center mt-4">{error}</p>
                        )}
                    </>
                )}
            </div>

            {!currentUser && (
                <div className="bg-green-800 text-lime-400 py-3 px-3 rounded-lg text-center">
                    Your login and password is:{' '}
                    <span className="font-bold text-lime-200 italic">admin</span>
                </div>
            )}
        </div>
    );
};

export default LoginPage;
