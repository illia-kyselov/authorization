import React from 'react';

interface ButtonProps {
    onClick: () => void;
    children: React.ReactNode;
    className?: string;
}

export const Button: React.FC<ButtonProps> = ({ onClick, children, className = '' }) => {
    return (
        <button
            onClick={onClick}
            className={`bg-green-800 text-lime-300 font-semibold py-3 rounded-lg hover:bg-green-900 transition duration-300 ${className}`}
        >
            {children}
        </button>
    );
};
