'use client';

import { motion } from 'framer-motion';
import { memo } from 'react';

interface SortingToolbarProps {
    sortBy: string;
    onSortChange: (sortBy: string) => void;
    itemsPerPage: number;
    onItemsPerPageChange: (count: number) => void;
    totalProducts: number;
    currentRange: [number, number];
    onFilterToggle: () => void;
    viewMode: 'grid' | 'list';
    onViewModeChange: (mode: 'grid' | 'list') => void;
}

const sortOptions = [
    { id: 'newest', label: 'Mới nhất' },
    { id: 'rating', label: 'Đánh giá cao' },
    { id: 'price-asc', label: 'Giá tăng dần' },
    { id: 'price-desc', label: 'Giá giảm dần' },
    { id: 'name-asc', label: 'Tên A-Z' },
];

const SortingToolbar = memo(function SortingToolbar({
    sortBy,
    onSortChange,
    itemsPerPage,
    onItemsPerPageChange,
    totalProducts,
    currentRange,
    onFilterToggle,
    viewMode,
    onViewModeChange,
}: SortingToolbarProps) {
    return (
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 p-4 bg-white/80 backdrop-blur-sm rounded-2xl shadow-soft transform-gpu">
            {/* Left - Filter Button (Mobile) & Count */}
            <div className="flex items-center gap-4">
                {/* Mobile Filter Button */}
                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={(e) => {
                        e.stopPropagation();
                        onFilterToggle();
                    }}
                    className="lg:hidden flex items-center gap-2 px-4 py-2 bg-cream-100 rounded-xl text-sm font-medium text-text-primary"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                    </svg>
                    Bộ lọc
                </motion.button>

                {/* Product Count */}
                <span className="text-sm text-text-secondary">
                    Hiển thị <span className="font-medium text-text-primary">{currentRange[0]}-{currentRange[1]}</span> trong{' '}
                    <span className="font-medium text-text-primary">{totalProducts}</span> sản phẩm
                </span>
            </div>

            {/* Right - Sort & Display Options */}
            <div className="flex items-center gap-4">
                {/* Sort Dropdown */}
                <div className="flex items-center gap-2">
                    <span className="text-sm text-text-muted hidden sm:inline">Sắp xếp:</span>
                    <div className="relative">
                        <select
                            value={sortBy}
                            onChange={(e) => onSortChange(e.target.value)}
                            className="appearance-none bg-cream-50 border border-cream-200 rounded-xl px-4 py-2 pr-10 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary-200 cursor-pointer"
                        >
                            {sortOptions.map((option) => (
                                <option key={option.id} value={option.id}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                        <svg
                            className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted pointer-events-none"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </div>
                </div>

                {/* Items Per Page Toggle */}
                <div className="hidden sm:flex items-center bg-cream-50 rounded-xl p-1 border border-cream-200">
                    {[20, 40].map((count) => (
                        <button
                            key={count}
                            onClick={(e) => {
                                e.stopPropagation();
                                onItemsPerPageChange(count);
                            }}
                            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 transform-gpu ${itemsPerPage === count
                                    ? 'bg-white text-text-primary shadow-soft'
                                    : 'text-text-muted hover:text-text-primary'
                                }`}
                        >
                            {count}
                        </button>
                    ))}
                </div>

                {/* Grid View Toggle - Fixed with proper state */}
                <div className="hidden md:flex items-center bg-cream-50 rounded-xl p-1 border border-cream-200">
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onViewModeChange('grid');
                        }}
                        className={`p-2 rounded-lg transition-all duration-200 transform-gpu ${viewMode === 'grid'
                                ? 'bg-white text-text-primary shadow-soft'
                                : 'text-text-muted hover:text-text-primary'
                            }`}
                        aria-label="Grid view"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                        </svg>
                    </button>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onViewModeChange('list');
                        }}
                        className={`p-2 rounded-lg transition-all duration-200 transform-gpu ${viewMode === 'list'
                                ? 'bg-white text-text-primary shadow-soft'
                                : 'text-text-muted hover:text-text-primary'
                            }`}
                        aria-label="List view"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
});

export default SortingToolbar;
