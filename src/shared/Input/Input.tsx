import React from 'react';

interface InputProps {
    type: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    className?: string;
}

export const Input: React.FC<InputProps> = ({ type, value, onChange, placeholder = '', className = '' }) => {
    return (
        <input
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={`border border-gray-300 rounded-lg p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-lime-500 ${className}`}
        />
    );
};
