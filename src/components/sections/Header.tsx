'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { navItems } from '@/lib/data';
import SearchBar from '@/components/ui/SearchBar';

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
    const pathname = usePathname();
    const { scrollY } = useScroll();

    // Handle scroll logic for sticky header
    useMotionValueEvent(scrollY, "change", (latest) => {
        const threshold = 100;
        if (latest > threshold && !isScrolled) {
            setIsScrolled(true);
        } else if (latest <= threshold && isScrolled) {
            setIsScrolled(false);
        }
    });

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
                return <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>;
            case 'orders':
                return <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>;
            case 'heart':
                return <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>;
            case 'logout':
                return <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>;
            default:
                return null;
        }
    };

    return (
        <>
            <motion.header
                className={`fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md transition-shadow duration-300 ${isScrolled ? 'shadow-sm' : ''
                    }`}
                initial={{ y: 0 }}
            >
                {/* [Row 1] Utility Bar - Hides on scroll */}
                <motion.div
                    className="border-b border-cream-100"
                    animate={{
                        height: isScrolled ? 0 : 'auto',
                        opacity: isScrolled ? 0 : 1,
                        overflow: 'hidden'
                    }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                >
                    <div className="container mx-auto px-4 lg:px-8 py-3 flex items-center justify-between gap-8">
                        {/* Logo Left */}
                        <Link href="/" className="flex-shrink-0">
                            <span className="font-serif text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-primary-600">
                                BellaBeauty
                            </span>
                        </Link>

                        {/* Search Bar Center */}
                        <div className="hidden md:block flex-1 max-w-lg mx-auto">
                            <SearchBar />
                        </div>

                        {/* Icons Right */}
                        <div className="flex items-center gap-6">
                            {/* Wishlist */}
                            <Link href="/wishlist" className="hidden md:flex items-center gap-2 text-text-secondary hover:text-primary-400 transition-colors group">
                                <div className="relative">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                    </svg>
                                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary-400 text-white text-[10px] sm:text-xs font-bold rounded-full flex items-center justify-center">2</span>
                                </div>
                            </Link>

                            {/* User Menu */}
                            <div className="relative" ref={userMenuRef}>
                                <button
                                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                                    className="flex items-center gap-2 text-text-secondary hover:text-primary-400 transition-colors"
                                >
                                    <div className="w-8 h-8 rounded-full bg-cream-100 flex items-center justify-center text-primary-400">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                    </div>
                                </button>

                                <AnimatePresence>
                                    {isUserMenuOpen && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                            transition={{ duration: 0.2 }}
                                            className="absolute right-0 mt-3 w-56 bg-white/80 backdrop-blur-xl rounded-2xl shadow-soft-lg border border-white/20 ring-1 ring-black/5 overflow-hidden z-50"
                                        >
                                            <div className="p-4 border-b border-gray-100/50">
                                                <p className="text-sm font-medium text-text-primary">Xin chào,</p>
                                                <p className="text-xs text-text-muted mt-0.5">user@example.com</p>
                                            </div>
                                            <div className="p-1">
                                                {userMenuItems.map((item, index) => (
                                                    <Link
                                                        key={index}
                                                        href={item.href}
                                                        className="flex items-center gap-3 px-3 py-2 text-sm text-text-secondary hover:bg-primary-50 hover:text-primary-500 rounded-xl transition-colors group"
                                                    >
                                                        <span className="group-hover:scale-110 transition-transform duration-200">
                                                            {renderIcon(item.icon)}
                                                        </span>
                                                        {item.label}
                                                    </Link>
                                                ))}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            {/* Cart - Mobile Trigger */}
                            <div className="flex items-center gap-4">
                                <Link
                                    href="/cart"
                                    className="relative text-text-secondary hover:text-primary-400 transition-colors"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                    </svg>
                                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary-400 text-white text-[10px] sm:text-xs font-bold rounded-full flex items-center justify-center">0</span>
                                </Link>

                                <button
                                    className="md:hidden text-text-secondary"
                                    onClick={() => setIsMobileMenuOpen(true)}
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* [Row 2] Navigation Bar - Always visible but sticky */}
                <div className="border-b border-cream-100 bg-white/95 backdrop-blur-md">
                    <div className="container mx-auto px-4 lg:px-8">
                        <div className="flex items-center justify-between h-12 md:h-14">
                            {/* Desktop Navigation */}
                            <nav className="hidden md:flex items-center gap-8 mx-auto">
                                {navItems.map((item) => (
                                    <div key={item.href} className="relative group">
                                        <Link
                                            href={item.href}
                                            className={`text-sm font-medium tracking-wide transition-colors py-4 px-1 inline-block ${pathname === item.href
                                                ? 'text-primary-400'
                                                : 'text-text-secondary hover:text-primary-400'
                                                }`}
                                        >
                                            <span className="flex items-center gap-1.5">
                                                {item.label}
                                                {item.badge && (
                                                    <span className="px-1.5 py-0.5 rounded-full bg-primary-100 text-primary-500 text-[9px] font-bold uppercase tracking-wider">
                                                        {item.badge}
                                                    </span>
                                                )}
                                                {item.children && (
                                                    <svg className="w-3 h-3 opacity-50 group-hover:rotate-180 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                    </svg>
                                                )}
                                            </span>
                                            {/* Hover Underline */}
                                            <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-primary-400 transform origin-left transition-transform duration-300 ${pathname === item.href ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                                                }`} />
                                        </Link>

                                        {/* Dropdown Menu */}
                                        {item.children && (
                                            <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                                                <div className="bg-white rounded-xl shadow-soft-xl border border-cream-200 p-2 w-48 overflow-hidden">
                                                    {item.children.map((child) => (
                                                        <Link
                                                            key={child.href}
                                                            href={child.href}
                                                            className="block px-4 py-2.5 text-sm text-text-secondary hover:text-primary-500 hover:bg-primary-50/50 rounded-lg transition-colors"
                                                        >
                                                            {child.label}
                                                        </Link>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </nav>

                            {/* Mobile Logo (Visible only when scrolled and row 1 hidden) */}
                            <motion.div
                                className="md:hidden"
                                animate={{ opacity: isScrolled ? 1 : 0 }}
                            >
                                <span className="font-serif text-lg font-bold text-text-primary">BellaBeauty</span>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </motion.header>

            {/* Mobile Side Drawer */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="fixed inset-0 bg-black/50 z-[60] backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ x: '-100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '-100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="fixed top-0 left-0 bottom-0 w-4/5 max-w-sm bg-white z-[70] shadow-2xl overflow-y-auto"
                        >
                            <div className="p-6 space-y-8">
                                <div className="flex items-center justify-between">
                                    <span className="font-serif text-2xl font-bold text-primary-400">BellaBeauty</span>
                                    <button
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="p-2 -mr-2 text-text-muted hover:text-text-primary"
                                    >
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>

                                <SearchBar />

                                <nav className="space-y-2">
                                    {navItems.map((item) => (
                                        <div key={item.href}>
                                            <Link
                                                href={item.href}
                                                onClick={() => setIsMobileMenuOpen(false)}
                                                className={`flex items-center justify-between py-3 px-4 rounded-xl text-base font-medium transition-colors ${pathname === item.href
                                                    ? 'bg-primary-50 text-primary-500'
                                                    : 'text-text-secondary hover:bg-gray-50'
                                                    }`}
                                            >
                                                {item.label}
                                            </Link>
                                            {item.children && (
                                                <div className="pl-4 mt-1 space-y-1 border-l-2 border-gray-100 ml-4">
                                                    {item.children.map((child) => (
                                                        <Link
                                                            key={child.href}
                                                            href={child.href}
                                                            onClick={() => setIsMobileMenuOpen(false)}
                                                            className="block py-2 px-4 text-sm text-text-muted hover:text-primary-500 transition-colors"
                                                        >
                                                            {child.label}
                                                        </Link>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </nav>

                                <div className="pt-6 border-t border-gray-100">
                                    <div className="space-y-1">
                                        {userMenuItems.map((item) => (
                                            <Link
                                                key={item.href}
                                                href={item.href}
                                                onClick={() => setIsMobileMenuOpen(false)}
                                                className="flex items-center gap-3 py-3 px-4 rounded-xl text-sm font-medium text-text-secondary hover:bg-gray-50 transition-colors"
                                            >
                                                <span className="text-gray-400">{renderIcon(item.icon)}</span>
                                                {item.label}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            {/* Spacer to prevent content jump due to fixed header */}
            <div className={`${isScrolled ? 'h-[105px]' : 'h-[148px]'} transition-[height] duration-300 hidden md:block`} />
            <div className="h-[60px] md:hidden" />
        </>
    );
};

export default Header;
