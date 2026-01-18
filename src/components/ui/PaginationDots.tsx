'use client';

import { motion } from 'framer-motion';

interface PaginationDotsProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const PaginationDots = ({ currentPage, totalPages, onPageChange }: PaginationDotsProps) => {
    // Show max 7 dots with ellipsis
    const getVisiblePages = () => {
        if (totalPages <= 7) {
            return Array.from({ length: totalPages }, (_, i) => i + 1);
        }

        if (currentPage <= 4) {
            return [1, 2, 3, 4, 5, -1, totalPages];
        }

        if (currentPage >= totalPages - 3) {
            return [1, -1, totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
        }

        return [1, -1, currentPage - 1, currentPage, currentPage + 1, -2, totalPages];
    };

    const visiblePages = getVisiblePages();

    return (
        <div className="flex items-center justify-center gap-2">
            {/* Previous Button */}
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onPageChange(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium text-text-secondary hover:text-text-primary hover:bg-cream-100 transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
            >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
                </svg>
                <span className="hidden sm:inline">Trước</span>
            </motion.button>

            {/* Page Dots */}
            <div className="flex items-center gap-1.5">
                {visiblePages.map((page, index) => {
                    if (page < 0) {
                        return (
                            <span key={`ellipsis-${index}`} className="w-8 text-center text-text-muted">
                                •••
                            </span>
                        );
                    }

                    const isActive = page === currentPage;

                    return (
                        <motion.button
                            key={page}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => onPageChange(page)}
                            className={`relative w-10 h-10 rounded-full font-medium text-sm transition-all duration-300 ${isActive
                                    ? 'text-white'
                                    : 'text-text-secondary hover:text-text-primary hover:bg-cream-100'
                                }`}
                        >
                            {isActive && (
                                <motion.div
                                    layoutId="activePage"
                                    className="absolute inset-0 bg-gradient-to-r from-primary-300 to-primary-400 rounded-full"
                                    initial={false}
                                    transition={{
                                        type: 'spring',
                                        stiffness: 500,
                                        damping: 35,
                                    }}
                                />
                            )}
                            <span className="relative z-10">{page}</span>
                        </motion.button>
                    );
                })}
            </div>

            {/* Next Button */}
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium text-text-secondary hover:text-text-primary hover:bg-cream-100 transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
            >
                <span className="hidden sm:inline">Sau</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                </svg>
            </motion.button>

            {/* Progress Bar */}
            <div className="hidden lg:flex items-center gap-3 ml-6 pl-6 border-l border-cream-200">
                <div className="w-32 h-1.5 bg-cream-200 rounded-full overflow-hidden">
                    <motion.div
                        className="h-full bg-gradient-to-r from-primary-300 to-primary-400 rounded-full"
                        initial={false}
                        animate={{ width: `${(currentPage / totalPages) * 100}%` }}
                        transition={{ duration: 0.3, ease: 'easeOut' }}
                    />
                </div>
                <span className="text-xs text-text-muted whitespace-nowrap">
                    {currentPage} / {totalPages}
                </span>
            </div>
        </div>
    );
};

export default PaginationDots;
