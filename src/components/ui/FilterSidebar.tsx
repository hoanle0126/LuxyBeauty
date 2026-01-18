'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import PriceRangeSlider from './PriceRangeSlider';
import RatingFilter from './RatingFilter';
import { brands, categories, priceRanges } from '@/lib/data';

interface FilterState {
    categories: string[];
    brands: string[];
    priceRange: [number, number];
    rating: number | null;
}

interface FilterSidebarProps {
    filters: FilterState;
    onFilterChange: (filters: FilterState) => void;
    isOpen: boolean;
    onClose: () => void;
    productCounts?: Record<string, number>;
}

// Category icons
const categoryIcons: Record<string, JSX.Element> = {
    skincare: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
        </svg>
    ),
    makeup: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
        </svg>
    ),
    'body-care': (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
    ),
    fragrances: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
    ),
};

const FilterSection = ({
    title,
    children,
    defaultOpen = true
}: {
    title: string;
    children: React.ReactNode;
    defaultOpen?: boolean;
}) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);

    return (
        <div className="border-b border-white/20 pb-5 mb-5 last:border-0 last:mb-0 last:pb-0">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center justify-between w-full text-left mb-4 group"
            >
                <span className="font-medium text-text-primary">{title}</span>
                <motion.svg
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="w-4 h-4 text-text-muted group-hover:text-text-primary transition-colors"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </motion.svg>
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        {children}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const FilterSidebar = ({
    filters,
    onFilterChange,
    isOpen,
    onClose,
}: FilterSidebarProps) => {
    const handleCategoryToggle = (slug: string) => {
        const newCategories = filters.categories.includes(slug)
            ? filters.categories.filter((c) => c !== slug)
            : [...filters.categories, slug];
        onFilterChange({ ...filters, categories: newCategories });
    };

    const handleBrandToggle = (brandId: string) => {
        const newBrands = filters.brands.includes(brandId)
            ? filters.brands.filter((b) => b !== brandId)
            : [...filters.brands, brandId];
        onFilterChange({ ...filters, brands: newBrands });
    };

    const handlePriceChange = (priceRange: [number, number]) => {
        onFilterChange({ ...filters, priceRange });
    };

    const handleRatingChange = (rating: number | null) => {
        onFilterChange({ ...filters, rating });
    };

    const clearAllFilters = () => {
        onFilterChange({
            categories: [],
            brands: [],
            priceRange: [priceRanges.min, priceRanges.max],
            rating: null,
        });
    };

    const hasActiveFilters =
        filters.categories.length > 0 ||
        filters.brands.length > 0 ||
        filters.rating !== null ||
        filters.priceRange[0] > priceRanges.min ||
        filters.priceRange[1] < priceRanges.max;

    const sidebarContent = (
        <div className="space-y-0">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <h3 className="font-serif text-lg font-medium text-text-primary">Bộ lọc</h3>
                {hasActiveFilters && (
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={clearAllFilters}
                        className="text-sm text-primary-400 hover:text-primary-500 font-medium"
                    >
                        Xóa tất cả
                    </motion.button>
                )}
            </div>

            {/* Categories */}
            <FilterSection title="Danh mục">
                <div className="space-y-2">
                    {categories.map((category) => (
                        <motion.button
                            key={category.id}
                            whileHover={{ x: 4 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handleCategoryToggle(category.slug)}
                            className={`w-full flex items-center gap-3 p-2.5 rounded-xl transition-all duration-300 ${filters.categories.includes(category.slug)
                                    ? 'bg-primary-50 border border-primary-200 text-primary-500'
                                    : 'hover:bg-cream-50 text-text-secondary'
                                }`}
                        >
                            <span className={filters.categories.includes(category.slug) ? 'text-primary-400' : 'text-text-muted'}>
                                {categoryIcons[category.slug]}
                            </span>
                            <span className="flex-1 text-left text-sm">{category.name}</span>
                            <span className="text-xs text-text-muted">{category.productCount}</span>
                        </motion.button>
                    ))}
                </div>
            </FilterSection>

            {/* Brands */}
            <FilterSection title="Thương hiệu">
                <div className="space-y-1">
                    {brands.map((brand) => (
                        <motion.button
                            key={brand.id}
                            whileHover={{ x: 4 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handleBrandToggle(brand.id)}
                            className={`w-full flex items-center justify-between p-2 rounded-lg transition-all duration-300 ${filters.brands.includes(brand.id)
                                    ? 'bg-primary-50 text-primary-500'
                                    : 'hover:bg-cream-50 text-text-secondary'
                                }`}
                        >
                            <span className="text-sm">{brand.name}</span>
                            <span className="text-xs text-text-muted">({brand.count})</span>
                        </motion.button>
                    ))}
                </div>
            </FilterSection>

            {/* Price Range */}
            <FilterSection title="Khoảng giá">
                <PriceRangeSlider
                    min={priceRanges.min}
                    max={priceRanges.max}
                    step={priceRanges.step}
                    value={filters.priceRange}
                    onChange={handlePriceChange}
                />
            </FilterSection>

            {/* Rating */}
            <FilterSection title="Đánh giá">
                <RatingFilter value={filters.rating} onChange={handleRatingChange} />
            </FilterSection>
        </div>
    );

    return (
        <>
            {/* Desktop Sidebar */}
            <div className="hidden lg:block w-72 flex-shrink-0">
                <div className="sticky top-24 bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-soft border border-white/50">
                    {sidebarContent}
                </div>
            </div>

            {/* Mobile Drawer */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={onClose}
                            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden"
                        />

                        {/* Drawer */}
                        <motion.div
                            initial={{ x: '-100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '-100%' }}
                            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                            className="fixed inset-y-0 left-0 w-80 max-w-[85vw] bg-white/95 backdrop-blur-xl shadow-soft-xl z-50 lg:hidden overflow-y-auto"
                        >
                            <div className="p-6">
                                {/* Mobile Header */}
                                <div className="flex items-center justify-between mb-6 pb-4 border-b border-cream-200">
                                    <h3 className="font-serif text-xl font-medium text-text-primary">Bộ lọc</h3>
                                    <motion.button
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                        onClick={onClose}
                                        className="w-10 h-10 rounded-full bg-cream-100 flex items-center justify-center"
                                    >
                                        <svg className="w-5 h-5 text-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </motion.button>
                                </div>

                                {sidebarContent}

                                {/* Apply Button */}
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={onClose}
                                    className="w-full mt-6 py-3 bg-gradient-to-r from-primary-300 to-primary-400 text-white rounded-xl font-medium shadow-soft"
                                >
                                    Áp dụng bộ lọc
                                </motion.button>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
};

export default FilterSidebar;
