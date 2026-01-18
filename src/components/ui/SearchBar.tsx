'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';

export default function SearchBar() {
    const [query, setQuery] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const router = useRouter();
    const inputRef = useRef<HTMLInputElement>(null);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (query.trim()) {
            router.push(`/shop?search=${encodeURIComponent(query.trim())}`);
            inputRef.current?.blur();
        }
    };

    const clearSearch = () => {
        setQuery('');
        inputRef.current?.focus();
    };

    return (
        <form onSubmit={handleSearch} className="relative w-full max-w-lg">
            <motion.div
                animate={{
                    boxShadow: isFocused ? '0 0 0 4px rgba(253, 164, 175, 0.2)' : '0 0 0 0px rgba(253, 164, 175, 0)',
                    borderColor: isFocused ? '#FDA4AF' : '#E5E7EB',
                }}
                className="relative bg-white border border-gray-200 rounded-full overflow-hidden transition-colors duration-200"
            >
                <div className="flex items-center px-4 h-11">
                    {/* Search Icon */}
                    <svg
                        className={`w-5 h-5 flex-shrink-0 transition-colors ${isFocused ? 'text-primary-400' : 'text-gray-400'}`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>

                    {/* Input Field */}
                    <input
                        ref={inputRef}
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        placeholder="Tìm kiếm mỹ phẩm cao cấp..."
                        className="w-full h-full px-3 text-text-primary text-sm placeholder:text-gray-400 bg-transparent border-none outline-none focus:ring-0"
                    />

                    {/* Clear Button (only when has query) */}
                    <AnimatePresence>
                        {query && (
                            <motion.button
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                type="button"
                                onClick={clearSearch}
                                className="p-1 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
                            >
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </motion.button>
                        )}
                    </AnimatePresence>
                </div>
            </motion.div>
        </form>
    );
}
