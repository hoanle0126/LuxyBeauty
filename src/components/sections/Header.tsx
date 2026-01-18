'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

const navItems = [
    { label: 'Trang chủ', href: '/' },
    { label: 'Cửa hàng', href: '/shop' },
    { label: 'Danh mục', href: '/categories' },
    { label: 'Magazine', href: '/magazine' },
    { label: 'Về chúng tôi', href: '/about' },
    { label: 'Liên hệ', href: '/contact' },
];

const userMenuItems = [
    { label: 'Tài khoản', href: '/account', icon: 'user' },
    { label: 'Đơn hàng', href: '/orders', icon: 'orders' },
    { label: 'Yêu thích', href: '/wishlist', icon: 'heart' },
    { label: 'Đăng xuất', href: '/logout', icon: 'logout' },
];

const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const userMenuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close user menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
                setIsUserMenuOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const renderIcon = (iconName: string) => {
        switch (iconName) {
            case 'user':
                return (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                );
            case 'orders':
                return (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                    </svg>
                );
            case 'heart':
                return (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                );
            case 'logout':
                return (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                );
            default:
                return null;
        }
    };

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
                    ? 'bg-white/90 backdrop-blur-md shadow-soft py-3'
                    : 'bg-transparent py-5'
                }`}
        >
            <nav className="container mx-auto px-4 lg:px-8">
                <div className="flex items-center justify-between">
                    {/* Left - Navigation Links (Desktop) */}
                    <div className="hidden lg:flex items-center gap-10">
                        {navItems.slice(0, 3).map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="text-[13px] font-medium text-text-secondary hover:text-primary-400 transition-colors duration-300 tracking-wide uppercase"
                            >
                                {item.label}
                            </Link>
                        ))}
                    </div>

                    {/* Center - Logo */}
                    <Link href="/" className="flex-shrink-0">
                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            className="flex items-center gap-3"
                        >
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-200 to-primary-300 flex items-center justify-center">
                                <span className="text-white font-serif text-xl font-bold">B</span>
                            </div>
                            <span className="font-serif text-2xl font-medium text-text-primary tracking-tight">
                                Bella<span className="text-primary-400">Beauty</span>
                            </span>
                        </motion.div>
                    </Link>

                    {/* Right - Navigation Links + Icons (Desktop) */}
                    <div className="hidden lg:flex items-center gap-10">
                        {navItems.slice(3).map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="text-[13px] font-medium text-text-secondary hover:text-primary-400 transition-colors duration-300 tracking-wide uppercase"
                            >
                                {item.label}
                            </Link>
                        ))}

                        <div className="flex items-center gap-4 ml-4 pl-6 border-l border-cream-200/50">
                            {/* Search Icon */}
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                className="p-2 rounded-full hover:bg-cream-100 transition-colors duration-300"
                                aria-label="Tìm kiếm"
                            >
                                <svg
                                    className="w-5 h-5 text-text-secondary"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={1.5}
                                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                    />
                                </svg>
                            </motion.button>

                            {/* User Icon with Dropdown */}
                            <div ref={userMenuRef} className="relative">
                                <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                                    className="p-2 rounded-full hover:bg-cream-100 transition-colors duration-300"
                                    aria-label="Tài khoản"
                                >
                                    <svg
                                        className="w-5 h-5 text-text-secondary"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={1.5}
                                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                        />
                                    </svg>
                                </motion.button>

                                {/* User Dropdown */}
                                <AnimatePresence>
                                    {isUserMenuOpen && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                            transition={{ duration: 0.2 }}
                                            className="absolute right-0 top-full mt-2 w-56 py-2 bg-white/95 backdrop-blur-xl rounded-2xl shadow-soft-lg border border-cream-100 overflow-hidden"
                                        >
                                            {/* User Info */}
                                            <div className="px-4 py-3 border-b border-cream-100">
                                                <p className="font-medium text-text-primary">Xin chào!</p>
                                                <p className="text-sm text-text-muted">Đăng nhập để trải nghiệm tốt hơn</p>
                                            </div>

                                            {/* Menu Items */}
                                            {userMenuItems.map((item, index) => (
                                                <motion.div
                                                    key={item.href}
                                                    initial={{ opacity: 0, x: -10 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: index * 0.05 }}
                                                >
                                                    <Link
                                                        href={item.href}
                                                        onClick={() => setIsUserMenuOpen(false)}
                                                        className={`flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-cream-50 transition-colors ${item.icon === 'logout' ? 'text-red-500 border-t border-cream-100 mt-1' : 'text-text-secondary'
                                                            }`}
                                                    >
                                                        {renderIcon(item.icon)}
                                                        {item.label}
                                                    </Link>
                                                </motion.div>
                                            ))}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            {/* Cart Icon */}
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                className="relative p-2 rounded-full hover:bg-cream-100 transition-colors duration-300"
                                aria-label="Giỏ hàng"
                            >
                                <svg
                                    className="w-5 h-5 text-text-secondary"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={1.5}
                                        d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                                    />
                                </svg>
                                <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary-300 text-white text-xs rounded-full flex items-center justify-center">
                                    3
                                </span>
                            </motion.button>
                        </div>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="lg:hidden flex items-center gap-3">
                        {/* Mobile Cart */}
                        <motion.button
                            whileTap={{ scale: 0.95 }}
                            className="relative p-2 rounded-full hover:bg-cream-100 transition-colors"
                            aria-label="Giỏ hàng"
                        >
                            <svg className="w-5 h-5 text-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                            </svg>
                            <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary-300 text-white text-[10px] rounded-full flex items-center justify-center">
                                3
                            </span>
                        </motion.button>

                        {/* Hamburger */}
                        <motion.button
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="p-2 rounded-full hover:bg-cream-100 transition-colors duration-300"
                            aria-label="Menu"
                        >
                            <svg
                                className="w-6 h-6 text-text-secondary"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                {isMobileMenuOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </motion.button>
                    </div>
                </div>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                            className="lg:hidden overflow-hidden"
                        >
                            <div className="py-4 mt-4 border-t border-cream-200">
                                {navItems.map((item, index) => (
                                    <motion.div
                                        key={item.href}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                    >
                                        <Link
                                            href={item.href}
                                            onClick={() => setIsMobileMenuOpen(false)}
                                            className="block py-3 text-base font-medium text-text-primary hover:text-primary-400 transition-colors tracking-wide"
                                        >
                                            {item.label}
                                        </Link>
                                    </motion.div>
                                ))}

                                {/* Mobile User Menu */}
                                <div className="mt-4 pt-4 border-t border-cream-200">
                                    <p className="text-xs text-text-muted uppercase tracking-wider mb-3">Tài khoản</p>
                                    {userMenuItems.map((item, index) => (
                                        <motion.div
                                            key={item.href}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: (navItems.length + index) * 0.05 }}
                                        >
                                            <Link
                                                href={item.href}
                                                onClick={() => setIsMobileMenuOpen(false)}
                                                className={`flex items-center gap-3 py-2.5 text-sm ${item.icon === 'logout' ? 'text-red-500' : 'text-text-secondary'
                                                    }`}
                                            >
                                                {renderIcon(item.icon)}
                                                {item.label}
                                            </Link>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>
        </header>
    );
};

export default Header;
