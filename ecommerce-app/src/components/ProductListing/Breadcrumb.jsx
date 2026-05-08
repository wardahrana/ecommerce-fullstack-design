import React from 'react';
import { Link } from 'react-router-dom';

const Breadcrumb = () => {
    return (
        <nav className="flex items-center text-sm text-gray-500 py-2">
            <Link to="/" className="hover:text-blue-600 transition-colors">Home</Link>
            <span className="mx-2 text-gray-400">{'>'}</span>
            <Link to="/clothings" className="hover:text-blue-600 transition-colors">Clothings</Link>
            <span className="mx-2 text-gray-400">{'>'}</span>
            <Link to="/clothings/mens" className="hover:text-blue-600 transition-colors">Men's wear</Link>
            <span className="mx-2 text-gray-400">{'>'}</span>
            <span className="text-gray-600">Summer clothing</span>
        </nav>
    );
};

export default Breadcrumb;
