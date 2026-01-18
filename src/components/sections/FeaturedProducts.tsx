'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedSection from '@/components/ui/AnimatedSection';
import ProductCard from '@/components/ui/ProductCard';
import CategoryTabs from '@/components/ui/CategoryTabs';
import Button from '@/components/ui/Button';
import { featuredProducts } from '@/lib/data';

const categories = [
    { id: 'all', name: 'Tất cả' },
    { id: 'skincare', name: 'Chăm sóc da' },
    { id: 'makeup', name: 'Trang điểm' },
    { id: 'body-care', name: 'Chăm sóc cơ thể' },
    { id: 'fragrances', name: 'Nước hoa' },
];

const FeaturedProducts = () => {
    const [activeCategory, setActiveCategory] = useState('all');
    const [showAll, setShowAll] = useState(false);

    const filteredProducts = useMemo(() => {
        if (activeCategory === 'all') {
            return featuredProducts;
        }
        return featuredProducts.filter((product) => product.category === activeCategory);
    }, [activeCategory]);

    const displayedProducts = showAll ? filteredProducts : filteredProducts.slice(0, 8);

    return (
        <section className="py-24 lg:py-32 bg-white relative overflow-hidden">
            {/* Subtle background decoration */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 right-0 w-96 h-96 bg-primary-50/50 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-lavender-50/50 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />
            </div>

            <div className="container mx-auto px-4 lg:px-8 relative z-10">
                {/* Section Header */}
                <AnimatedSection className="text-center mb-12">
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-block px-4 py-2 bg-primary-50 rounded-full text-primary-400 text-sm font-medium mb-6"
                    >
                        ✨ Sản phẩm nổi bật
                    </motion.span>
                    <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-medium text-text-primary mb-4">
                        Được yêu thích nhất
                    </h2>
                    <p className="text-lg text-text-secondary max-w-2xl mx-auto">
                        Những sản phẩm được khách hàng tin dùng và đánh giá cao nhất
                    </p>
                </AnimatedSection>

                {/* Category Tabs */}
                <CategoryTabs
                    categories={categories}
                    activeCategory={activeCategory}
                    onCategoryChange={(id) => {
                        setActiveCategory(id);
                        setShowAll(false);
                    }}
                />

                {/* Products Grid */}
                <motion.div
                    layout
                    className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
                >
                    <AnimatePresence mode="popLayout">
                        {displayedProducts.map((product, index) => (
                            <motion.div
                                key={product.id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{
                                    duration: 0.4,
                                    delay: index * 0.05,
                                    layout: { duration: 0.4 }
                                }}
                            >
                                <ProductCard
                                    product={product}
                                    index={index}
                                    priority={index < 4}
                                />
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>

                {/* Empty State */}
                {filteredProducts.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-16"
                    >
                        <div className="text-6xl mb-4">🔍</div>
                        <p className="text-lg text-text-secondary">
                            Không có sản phẩm nào trong danh mục này
                        </p>
                    </motion.div>
                )}

                {/* View All Button */}
                {filteredProducts.length > 8 && !showAll && (
                    <AnimatedSection delay={0.5} className="text-center mt-12">
                        <Button
                            variant="outline"
                            size="lg"
                            onClick={() => setShowAll(true)}
                            rightIcon={
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            }
                        >
                            Xem thêm sản phẩm
                        </Button>
                    </AnimatedSection>
                )}

                {/* View All Products Link */}
                <AnimatedSection delay={0.6} className="text-center mt-8">
                    <Button
                        variant="ghost"
                        rightIcon={
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        }
                    >
                        Xem tất cả bộ sưu tập
                    </Button>
                </AnimatedSection>
            </div>
        </section>
    );
};

export default FeaturedProducts;
