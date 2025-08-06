import React, { useState, useContext } from 'react';
import { NavLink, useNavigate, Link } from 'react-router-dom';
import { UserContext } from '../Contexts/UserContext';
import { toast } from 'react-toastify';
import API from '../utils/axios';

const Navbar = () => {
    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const handleLogout = async () => {
        try {
            const res = await API.get(`/users/logout`, {
                withCredentials: true,
            });
            if (res.status === 200) {
                localStorage.removeItem('user');
                setUser(null);
                toast.success('Logged out successfully');
                navigate('/');
            }
        } catch (err) {
            console.log("Logout error", err.response?.data || err.message);
            toast.error('Logout failed');
        }
    };

    const menuItems = [
        { label: 'Home', path: '/home' },
        { label: 'MyBlogs', path: '/my-blog' },
        { label: 'About', path: '/about' },
        { label: 'Services', path: '/services' },
        { label: 'Contact', path: '/contact' },
    ];

    return (
        <nav className="bg-black/80 backdrop-blur-lg shadow-md sticky font-playwrite top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
                <h2 className="text-4xl md:text-5xl font-extrabold text-white animate-gradient">
                    CroniCast
                </h2>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-8 text-white font-medium">
                    {menuItems.map(({ label, path }) => (
                        <NavLink
                            key={path}
                            to={path}
                            className={({ isActive }) =>
                                isActive
                                    ? "relative text-blue-500 after:absolute after:bottom-[-4px] after:left-0 after:w-full after:h-[2px] after:bg-blue-500"
                                    : "hover:text-blue-400 transition-all duration-200"
                            }
                        >
                            {label}
                        </NavLink>
                    ))}
                    <Link
                        to="/create-blog"
                        className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-1.5 rounded-xl hover:scale-105 transition-transform duration-200"
                    >
                        + Create
                    </Link>
                    <button
                        onClick={handleLogout}
                        className="bg-red-500 text-white px-4 py-1.5 rounded-xl hover:bg-red-600 transition-all"
                    >
                        Logout
                    </button>
                </div>

                {/* Hamburger */}
                <div className="md:hidden">
                    <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                        <i className={`text-white text-3xl ri-${mobileMenuOpen ? "close-line" : "menu-line"}`}></i>
                    </button>
                </div>
            </div>

            {/* Mobile Dropdown */}
            {mobileMenuOpen && (
                <div
                    className="md:hidden px-4 py-4 bg-black/90 backdrop-blur-sm flex flex-col gap-4 text-white transition-all duration-300 ease-out transform scale-y-100 opacity-100 origin-top animate-fade-slide"
                >
                    {menuItems.map(({ label, path }) => (
                        <NavLink
                            key={path}
                            to={path}
                            onClick={() => setMobileMenuOpen(false)}
                            className={({ isActive }) =>
                                isActive
                                    ? "text-blue-400 font-semibold"
                                    : "hover:text-blue-400 transition-all"
                            }
                        >
                            {label}
                        </NavLink>
                    ))}
                    <Link
                        to="/create-blog"
                        onClick={() => setMobileMenuOpen(false)}
                        className="bg-gradient-to-r w-fit from-blue-500 to-purple-600 text-white px-4 py-2 rounded-xl"
                    >
                        + Create
                    </Link>
                    <button
                        onClick={() => {
                            handleLogout();
                            setMobileMenuOpen(false);
                        }}
                        className="bg-red-500 w-fit text-white px-4 py-2 rounded-xl"
                    >
                        Logout
                    </button>
                </div>
            )}

        </nav>
    );
};

export default Navbar;
