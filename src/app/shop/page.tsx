'use client';

import { useState, useMemo, useEffect, useTransition, useCallback } from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import Header from '@/components/sections/Header';
import Footer from '@/components/sections/Footer';
import ProductCard from '@/components/ui/ProductCard';
import ProductSkeleton from '@/components/ui/ProductSkeleton';
import FilterSidebar from '@/components/ui/FilterSidebar';
import SortingToolbar from '@/components/ui/SortingToolbar';
import PaginationDots from '@/components/ui/PaginationDots';
import AnimatedSection from '@/components/ui/AnimatedSection';
import { allProducts, priceRanges } from '@/lib/data';

interface FilterState {
    categories: string[];
    brands: string[];
    priceRange: [number, number];
    rating: number | null;
}

const defaultFilters: FilterState = {
    categories: [],
    brands: [],
    priceRange: [priceRanges.min, priceRanges.max],
    rating: null,
};

export default function ShopPage() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    // State
    const [filters, setFilters] = useState<FilterState>(defaultFilters);
    const [sortBy, setSortBy] = useState('newest');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(20);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

    // useTransition for non-blocking UI updates
    const [isPending, startTransition] = useTransition();

    // Parse URL params on mount
    useEffect(() => {
        const categories = searchParams.get('categories')?.split(',').filter(Boolean) || [];
        const brands = searchParams.get('brands')?.split(',').filter(Boolean) || [];
        const minPrice = Number(searchParams.get('minPrice')) || priceRanges.min;
        const maxPrice = Number(searchParams.get('maxPrice')) || priceRanges.max;
        const rating = searchParams.get('rating') ? Number(searchParams.get('rating')) : null;
        const sort = searchParams.get('sort') || 'newest';
        const page = Number(searchParams.get('page')) || 1;

        setFilters({
            categories,
            brands,
            priceRange: [minPrice, maxPrice],
            rating,
        });
        setSortBy(sort);
        setCurrentPage(page);
    }, [searchParams]);

    // Update URL when filters change - memoized
    const updateURL = useCallback((newFilters: FilterState, newSort: string, newPage: number) => {
        const params = new URLSearchParams();

        if (newFilters.categories.length > 0) {
            params.set('categories', newFilters.categories.join(','));
        }
        if (newFilters.brands.length > 0) {
            params.set('brands', newFilters.brands.join(','));
        }
        if (newFilters.priceRange[0] > priceRanges.min) {
            params.set('minPrice', String(newFilters.priceRange[0]));
        }
        if (newFilters.priceRange[1] < priceRanges.max) {
            params.set('maxPrice', String(newFilters.priceRange[1]));
        }
        if (newFilters.rating) {
            params.set('rating', String(newFilters.rating));
        }
        if (newSort !== 'newest') {
            params.set('sort', newSort);
        }
        if (newPage > 1) {
            params.set('page', String(newPage));
        }

        const queryString = params.toString();
        router.push(queryString ? `${pathname}?${queryString}` : pathname, { scroll: false });
    }, [router, pathname]);

    // Filter and sort products - heavily memoized
    const filteredProducts = useMemo(() => {
        let result = [...allProducts];

        // Filter by category
        if (filters.categories.length > 0) {
            result = result.filter((p) => filters.categories.includes(p.category));
        }

        // Filter by brand
        if (filters.brands.length > 0) {
            result = result.filter((p) => p.brand && filters.brands.includes(p.brand));
        }

        // Filter by price
        result = result.filter(
            (p) => p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1]
        );

        // Filter by rating
        if (filters.rating) {
            result = result.filter((p) => p.rating && p.rating >= filters.rating!);
        }

        // Sort
        switch (sortBy) {
            case 'rating':
                result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
                break;
            case 'price-asc':
                result.sort((a, b) => a.price - b.price);
                break;
            case 'price-desc':
                result.sort((a, b) => b.price - a.price);
                break;
            case 'name-asc':
                result.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case 'name-desc':
                result.sort((a, b) => b.name.localeCompare(a.name));
                break;
            default:
                result.sort((a, b) => Number(b.id) - Number(a.id));
        }

        return result;
    }, [filters, sortBy]);

    // Pagination
    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
    const paginatedProducts = useMemo(() => {
        const start = (currentPage - 1) * itemsPerPage;
        return filteredProducts.slice(start, start + itemsPerPage);
    }, [filteredProducts, currentPage, itemsPerPage]);

    // Handlers with useTransition for smooth updates
    const handleFilterChange = useCallback((newFilters: FilterState) => {
        startTransition(() => {
            setFilters(newFilters);
            setCurrentPage(1);
        });
        updateURL(newFilters, sortBy, 1);
    }, [sortBy, updateURL]);

    const handleSortChange = useCallback((newSort: string) => {
        startTransition(() => {
            setSortBy(newSort);
            setCurrentPage(1);
        });
        updateURL(filters, newSort, 1);
    }, [filters, updateURL]);

    const handlePageChange = useCallback((page: number) => {
        startTransition(() => {
            setCurrentPage(page);
        });
        updateURL(filters, sortBy, page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [filters, sortBy, updateURL]);

    const handleItemsPerPageChange = useCallback((count: number) => {
        startTransition(() => {
            setItemsPerPage(count);
            setCurrentPage(1);
        });
    }, []);

    const handleViewModeChange = useCallback((mode: 'grid' | 'list') => {
        startTransition(() => {
            setViewMode(mode);
        });
    }, []);

    const currentRange: [number, number] = [
        Math.min((currentPage - 1) * itemsPerPage + 1, filteredProducts.length),
        Math.min(currentPage * itemsPerPage, filteredProducts.length),
    ];

    // Grid classes based on view mode
    const gridClasses = viewMode === 'grid'
        ? 'grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6'
        : 'flex flex-col gap-4';

    return (
        <>
            <Header />
            <main className="min-h-screen bg-gradient-to-b from-cream-50 to-white pt-24">
                {/* Hero Banner */}
                <section className="relative py-16 overflow-hidden">
                    <div className="absolute inset-0 pointer-events-none">
                        <div className="absolute top-0 right-0 w-96 h-96 bg-primary-100/40 rounded-full blur-[100px]" />
                        <div className="absolute bottom-0 left-0 w-96 h-96 bg-lavender-100/40 rounded-full blur-[100px]" />
                    </div>

                    <div className="container mx-auto px-4 lg:px-8 relative z-10">
                        <AnimatedSection className="text-center">
                            <h1 className="font-serif text-4xl md:text-5xl font-medium text-text-primary mb-4">
                                Cửa hàng
                            </h1>
                            <p className="text-lg text-text-secondary max-w-xl mx-auto">
                                Khám phá bộ sưu tập mỹ phẩm cao cấp của chúng tôi
                            </p>
                        </AnimatedSection>
                    </div>
                </section>

                {/* Shop Content */}
                <section className="pb-24">
                    <div className="container mx-auto px-4 lg:px-8">
                        <div className="flex gap-8">
                            {/* Filter Sidebar */}
                            <FilterSidebar
                                filters={filters}
                                onFilterChange={handleFilterChange}
                                isOpen={isFilterOpen}
                                onClose={() => setIsFilterOpen(false)}
                            />

                            {/* Main Content */}
                            <div className="flex-1 min-w-0">
                                {/* Sorting Toolbar */}
                                <SortingToolbar
                                    sortBy={sortBy}
                                    onSortChange={handleSortChange}
                                    itemsPerPage={itemsPerPage}
                                    onItemsPerPageChange={handleItemsPerPageChange}
                                    totalProducts={filteredProducts.length}
                                    currentRange={currentRange}
                                    onFilterToggle={() => setIsFilterOpen(true)}
                                    viewMode={viewMode}
                                    onViewModeChange={handleViewModeChange}
                                />

                                {/* Products Grid with Skeleton Loading */}
                                <LayoutGroup>
                                    <motion.div
                                        layout
                                        className={`${gridClasses} transform-gpu`}
                                        style={{ opacity: isPending ? 0.7 : 1, transition: 'opacity 0.2s' }}
                                    >
                                        {isPending ? (
                                            // Skeleton Loading
                                            [...Array(itemsPerPage > 20 ? 8 : 6)].map((_, index) => (
                                                <ProductSkeleton key={`skeleton-${index}`} viewMode={viewMode} />
                                            ))
                                        ) : (
                                            <AnimatePresence mode="popLayout">
                                                {paginatedProducts.map((product, index) => (
                                                    <ProductCard
                                                        key={product.id}
                                                        product={product}
                                                        index={index}
                                                        priority={index < 4}
                                                        viewMode={viewMode}
                                                    />
                                                ))}
                                            </AnimatePresence>
                                        )}
                                    </motion.div>
                                </LayoutGroup>

                                {/* Empty State */}
                                {!isPending && filteredProducts.length === 0 && (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="text-center py-24"
                                    >
                                        <div className="w-24 h-24 mx-auto mb-6 bg-cream-100 rounded-full flex items-center justify-center">
                                            <svg className="w-12 h-12 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                            </svg>
                                        </div>
                                        <h3 className="font-serif text-xl text-text-primary mb-2">
                                            Không tìm thấy sản phẩm
                                        </h3>
                                        <p className="text-text-secondary mb-6">
                                            Thử thay đổi bộ lọc để xem thêm sản phẩm
                                        </p>
                                        <button
                                            onClick={() => handleFilterChange(defaultFilters)}
                                            className="px-6 py-3 bg-primary-300 text-white rounded-xl font-medium shadow-soft hover:bg-primary-400 transition-colors"
                                        >
                                            Xóa bộ lọc
                                        </button>
                                    </motion.div>
                                )}

                                {/* Pagination */}
                                {!isPending && totalPages > 1 && (
                                    <div className="mt-12">
                                        <PaginationDots
                                            currentPage={currentPage}
                                            totalPages={totalPages}
                                            onPageChange={handlePageChange}
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
