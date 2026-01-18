'use client';

import { memo } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/types';
import { formatPrice } from '@/lib/data';

interface ProductCardProps {
    product: Product;
    index?: number;
    priority?: boolean;
    viewMode?: 'grid' | 'list';
}

const badgeStyles = {
    new: 'bg-mint-100 text-emerald-700',
    bestseller: 'bg-primary-100 text-primary-500',
    sale: 'bg-lavender-100 text-purple-700',
};

const badgeLabels = {
    new: 'Mới',
    bestseller: 'Bán chạy',
    sale: 'Giảm giá',
};

const ProductCard = memo(function ProductCard({
    product,
    index = 0,
    priority = false,
    viewMode = 'grid',
}: ProductCardProps) {
    const { id, name, price, originalPrice, image, badge, rating, reviews } = product;

    const handleWishlistClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        console.log('Added to wishlist:', name);
        // TODO: Add to wishlist logic
    };

    const handleAddToCartClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        console.log('Added to cart:', name);
        // TODO: Add to cart logic
    };

    // List view
    if (viewMode === 'list') {
        return (
            <motion.article
                layout
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3, delay: Math.min(index * 0.03, 0.3) }}
                className="group relative transform-gpu"
            >
                <Link href={`/product/${id}`} className="block">
                    <div className="flex gap-4 bg-white rounded-2xl p-4 shadow-[0_2px_10px_-3px_rgba(0,0,0,0.05)] hover:shadow-[0_10px_30px_-10px_rgba(0,0,0,0.12)] transition-shadow duration-300">
                        {/* Image */}
                        <div className="relative w-32 h-32 flex-shrink-0 rounded-xl overflow-hidden bg-gradient-to-br from-cream-50 to-lavender-50">
                            {badge && (
                                <div className={`absolute top-2 left-2 z-10 px-2 py-1 rounded-full text-[10px] font-semibold ${badgeStyles[badge]}`}>
                                    {badgeLabels[badge]}
                                </div>
                            )}
                            <Image
                                src={image}
                                alt={name}
                                fill
                                sizes="128px"
                                className="object-cover"
                                loading={priority ? 'eager' : 'lazy'}
                                priority={priority}
                            />
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                            {rating && (
                                <div className="flex items-center gap-1 mb-2">
                                    <div className="flex gap-0.5">
                                        {[...Array(5)].map((_, i) => (
                                            <svg
                                                key={i}
                                                className={`w-3 h-3 ${i < Math.floor(rating) ? 'text-amber-400' : 'text-gray-200'}`}
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                            >
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                            </svg>
                                        ))}
                                    </div>
                                    <span className="text-xs text-text-muted">{rating} ({reviews})</span>
                                </div>
                            )}

                            <h3 className="font-serif text-base text-text-primary mb-1 line-clamp-1 group-hover:text-primary-400 transition-colors">
                                {name}
                            </h3>

                            <div className="flex items-center gap-2 mb-3">
                                <span className="font-semibold text-text-primary">{formatPrice(price)}</span>
                                {originalPrice && (
                                    <span className="text-xs text-text-muted line-through">{formatPrice(originalPrice)}</span>
                                )}
                            </div>

                            <button
                                onClick={handleAddToCartClick}
                                className="px-4 py-2 bg-cream-100 hover:bg-primary-100 text-text-primary rounded-lg text-sm font-medium transition-colors"
                            >
                                Thêm vào giỏ
                            </button>
                        </div>
                    </div>
                </Link>
            </motion.article>
        );
    }

    // Grid view (default)
    return (
        <motion.article
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{
                duration: 0.3,
                delay: Math.min(index * 0.03, 0.3),
                layout: { duration: 0.2 },
            }}
            className="group relative transform-gpu"
        >
            <Link href={`/product/${id}`} className="block">
                <div className="bg-white rounded-3xl overflow-hidden shadow-[0_2px_10px_-3px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.15)] transition-all duration-300 hover:-translate-y-2">
                    {/* Badge */}
                    {badge && (
                        <div className={`absolute top-4 left-4 z-10 px-3 py-1.5 rounded-full text-xs font-semibold ${badgeStyles[badge]}`}>
                            {badgeLabels[badge]}
                        </div>
                    )}

                    {/* Wishlist Button */}
                    <button
                        onClick={handleWishlistClick}
                        className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-soft opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-white"
                        aria-label="Thêm vào yêu thích"
                    >
                        <svg className="w-4 h-4 text-text-secondary hover:text-primary-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                    </button>

                    {/* Image Container */}
                    <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-cream-50 to-lavender-50">
                        <div className="w-full h-full transform-gpu group-hover:scale-105 transition-transform duration-500">
                            <Image
                                src={image}
                                alt={name}
                                fill
                                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                                className="object-cover"
                                loading={priority ? 'eager' : 'lazy'}
                                priority={priority}
                            />
                        </div>
                    </div>

                    {/* Content */}
                    <div className="p-5">
                        {/* Rating */}
                        {rating && (
                            <div className="flex items-center gap-1.5 mb-3">
                                <div className="flex gap-0.5">
                                    {[...Array(5)].map((_, i) => (
                                        <svg
                                            key={i}
                                            className={`w-3.5 h-3.5 ${i < Math.floor(rating) ? 'text-amber-400' : 'text-gray-200'}`}
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    ))}
                                </div>
                                <span className="text-xs text-text-muted">{rating}</span>
                                {reviews && <span className="text-xs text-text-muted">({reviews})</span>}
                            </div>
                        )}

                        {/* Product Name */}
                        <h3 className="font-serif text-lg text-text-primary mb-2 line-clamp-2 group-hover:text-primary-400 transition-colors duration-200">
                            {name}
                        </h3>

                        {/* Price */}
                        <div className="flex items-center gap-2 mb-4">
                            <span className="font-semibold text-text-primary">{formatPrice(price)}</span>
                            {originalPrice && (
                                <span className="text-sm text-text-muted line-through">{formatPrice(originalPrice)}</span>
                            )}
                            {originalPrice && (
                                <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                                    -{Math.round((1 - price / originalPrice) * 100)}%
                                </span>
                            )}
                        </div>

                        {/* Add to Cart Button */}
                        <button
                            onClick={handleAddToCartClick}
                            className="w-full py-3 bg-cream-100 hover:bg-primary-100 text-text-primary rounded-xl font-medium text-sm transition-colors duration-200"
                        >
                            Thêm vào giỏ
                        </button>
                    </div>
                </div>
            </Link>
        </motion.article>
    );
});

export default ProductCard;
