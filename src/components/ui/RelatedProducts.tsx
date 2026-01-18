'use client';

import { motion, useSpring, useMotionValue, PanInfo } from 'framer-motion';
import { useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/types';
import { formatPrice } from '@/lib/data';

interface RelatedProductsProps {
    products: Product[];
    title?: string;
}

const RelatedProducts = ({ products, title = 'Sản phẩm liên quan' }: RelatedProductsProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState(false);

    const x = useMotionValue(0);
    const springX = useSpring(x, { stiffness: 300, damping: 30 });

    const cardWidth = 280;
    const gap = 24;
    const totalWidth = products.length * (cardWidth + gap) - gap;

    const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
        setIsDragging(false);
        const containerWidth = containerRef.current?.offsetWidth || 0;
        const maxDrag = Math.max(0, totalWidth - containerWidth);

        if (info.offset.x > 0) {
            x.set(0);
        } else if (-info.offset.x > maxDrag) {
            x.set(-maxDrag);
        }
    };

    return (
        <section className="py-16 lg:py-24 overflow-hidden">
            <div className="container mx-auto px-4 lg:px-8">
                {/* Section Header */}
                {title && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="flex items-center justify-between mb-8"
                    >
                        <h2 className="font-serif text-2xl md:text-3xl font-medium text-text-primary">
                            {title}
                        </h2>
                        <Link href="/shop">
                            <motion.span
                                whileHover={{ x: 5 }}
                                className="flex items-center gap-2 text-sm text-primary-400 font-medium"
                            >
                                Xem tất cả
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </motion.span>
                        </Link>
                    </motion.div>
                )}

                {/* Carousel */}
                <div ref={containerRef} className="overflow-hidden -mx-4 px-4">
                    <motion.div
                        drag="x"
                        dragConstraints={{ left: -(totalWidth - (containerRef.current?.offsetWidth || 800) + 32), right: 0 }}
                        dragElastic={0.2}
                        onDragStart={() => setIsDragging(true)}
                        onDragEnd={handleDragEnd}
                        style={{ x: springX }}
                        className="flex gap-6 cursor-grab active:cursor-grabbing"
                    >
                        {products.map((product, index) => (
                            <motion.div
                                key={product.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="flex-shrink-0 w-[280px]"
                            >
                                <Link
                                    href={`/product/${product.id}`}
                                    onClick={(e) => isDragging && e.preventDefault()}
                                    draggable={false}
                                >
                                    <motion.div
                                        whileHover={{ y: -8 }}
                                        className="bg-white rounded-2xl overflow-hidden shadow-soft hover:shadow-soft-lg transition-shadow"
                                    >
                                        {/* Image */}
                                        <div className="relative aspect-square bg-gradient-to-br from-cream-50 to-lavender-50">
                                            {product.badge && (
                                                <div className={`absolute top-3 left-3 z-10 px-2.5 py-1 rounded-full text-xs font-semibold ${product.badge === 'new' ? 'bg-mint-100 text-emerald-700' :
                                                        product.badge === 'bestseller' ? 'bg-primary-100 text-primary-500' :
                                                            'bg-lavender-100 text-purple-700'
                                                    }`}>
                                                    {product.badge === 'new' ? 'Mới' : product.badge === 'bestseller' ? 'Bán chạy' : 'Giảm giá'}
                                                </div>
                                            )}
                                            <Image
                                                src={product.image}
                                                alt={product.name}
                                                fill
                                                sizes="280px"
                                                className="object-cover"
                                                draggable={false}
                                            />
                                        </div>

                                        {/* Content */}
                                        <div className="p-4">
                                            {product.rating && (
                                                <div className="flex items-center gap-1 mb-2">
                                                    {[...Array(5)].map((_, i) => (
                                                        <svg
                                                            key={i}
                                                            className={`w-3.5 h-3.5 ${i < Math.floor(product.rating!) ? 'text-amber-400' : 'text-gray-200'}`}
                                                            fill="currentColor"
                                                            viewBox="0 0 20 20"
                                                        >
                                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                        </svg>
                                                    ))}
                                                    <span className="text-xs text-text-muted ml-1">{product.rating}</span>
                                                </div>
                                            )}
                                            <h3 className="font-medium text-text-primary mb-2 line-clamp-2 hover:text-primary-400 transition-colors">
                                                {product.name}
                                            </h3>
                                            <div className="flex items-center gap-2">
                                                <span className="font-semibold text-text-primary">
                                                    {formatPrice(product.price)}
                                                </span>
                                                {product.originalPrice && (
                                                    <span className="text-sm text-text-muted line-through">
                                                        {formatPrice(product.originalPrice)}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </motion.div>
                                </Link>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>

                {/* Scroll Indicator */}
                <div className="flex justify-center mt-6 gap-2">
                    <span className="text-xs text-text-muted">← Vuốt để xem thêm →</span>
                </div>
            </div>
        </section>
    );
};

export default RelatedProducts;
