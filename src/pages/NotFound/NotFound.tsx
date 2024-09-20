import { Link } from "@tanstack/react-router";
import React from "react";

const NotFound: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] grow text-center bg-gray-100">
            <div className="flex flex-col items-center mb-16">
                <div className="text-[20px] sm:text-[24px] lg:text-[32px] font-medium max-w-[244px] sm:max-w-[398px] lg:max-w-[542px] text-green-800 mb-6 sm:mb-8">
                    Sorry, the page you are looking for doesn't exist
                </div>
                <Link to="/authorization/" className="bg-green-800 text-lime-300 font-semibold py-3 px-3 rounded-lg hover:bg-green-900 transition duration-300">
                    Home
                </Link>
            </div>
        </div>
    );
};

export default NotFound;
