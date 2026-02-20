import React, { useState } from 'react';
import { Menu, X, Bell } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();
    const [user, setUser] = useState(null);

    React.useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, [location]); // Re-check on route change (e.g. after login redirect)

    const isActive = (path) => {
        return location.pathname === path ? 'text-[#4353FF] font-semibold' : 'text-gray-600 hover:text-[#4353FF] transition-colors';
    };

    return (
        <nav className="bg-white sticky top-0 z-50 py-4 border-b border-gray-100">
            <div className="container mx-auto flex items-center justify-between">
                {/* Logo */}
                <Link to="/" className="flex items-center gap-2">
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M16 2L2 9L16 16L30 9L16 2Z" stroke="#1A1B4B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M6 11V21C6 21 10 24 16 24C22 24 26 21 26 21V11" stroke="#1A1B4B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M16 16V24" stroke="#1A1B4B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span className="text-[#1A1B4B] font-bold text-xl font-heading">
                        Study Abroad
                    </span>
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-8 text-sm font-medium">
                    <Link to="/" className={isActive('/')}>Home</Link>
                    <Link to="/search" className={isActive('/search')}>Search Universities</Link>
                    <Link to="/recommendations" className={isActive('/recommendations')}>AI Recommendations</Link>
                    <Link to="/destinations" className={isActive('/destinations')}>Destinations</Link>
                    <Link to="/dashboard" className={isActive('/dashboard')}>Dashboard</Link>
                    <Link to="/resources" className={isActive('/resources')}>Resources</Link>
                </div>

                {/* Right Side Actions */}
                <div className="hidden md:flex items-center gap-4">
                    <button className="text-gray-600 hover:text-[#4353FF]">
                        <Bell size={20} />
                    </button>
                    {user ? (
                        <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
                            <div className="text-right hidden lg:block">
                                <div className="text-sm font-bold text-[#1A1B4B]">{user.email.split('@')[0]}</div>
                                <div className="text-xs text-green-600 font-medium">Student</div>
                            </div>
                            <div className="w-10 h-10 rounded-full bg-[#4353FF] text-white flex items-center justify-center font-bold text-lg border-2 border-indigo-100">
                                {user.email[0].toUpperCase()}
                            </div>
                        </div>
                    ) : (
                        <Link
                            to="/login"
                            className="bg-[#1A1B4B] text-white px-5 py-2.5 rounded-lg font-medium hover:bg-opacity-90 transition-all text-sm"
                        >
                            Get Started
                            <span className="ml-2">✨</span>
                        </Link>
                    )}
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden text-gray-700"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Menu Dropdown */}
            {isOpen && (
                <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-lg py-4 px-4 flex flex-col gap-4">
                    <Link to="/" className={isActive('/')}>Home</Link>
                    <Link to="/search" className={isActive('/search')}>Search Universities</Link>
                    <Link to="/recommendations" className={isActive('/recommendations')}>AI Recommendations</Link>
                    <Link to="/destinations" className={isActive('/destinations')}>Destinations</Link>
                    <Link to="/dashboard" className={isActive('/dashboard')}>Dashboard</Link>
                    <Link to="/resources" className={isActive('/resources')}>Resources</Link>
                    <hr />
                    <hr />
                    {user ? (
                        <div className="flex items-center gap-3 px-2">
                            <div className="w-8 h-8 rounded-full bg-[#4353FF] text-white flex items-center justify-center font-bold">
                                {user.email[0].toUpperCase()}
                            </div>
                            <span className="font-medium text-[#1A1B4B]">{user.email}</span>
                        </div>
                    ) : (
                        <Link
                            to="/login"
                            className="bg-[#1A1B4B] text-white px-5 py-2.5 rounded-lg font-medium text-center"
                        >
                            Get Started
                        </Link>
                    )}
                </div>
            )}
        </nav>
    );
};

export default Navbar;
