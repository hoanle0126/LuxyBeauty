'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

interface Review {
    id: string;
    author: string;
    avatar?: string;
    rating: number;
    date: string;
    title: string;
    content: string;
    images?: string[];
    verified: boolean;
    helpful: number;
}

interface ProductReviewsProps {
    reviews: Review[];
    averageRating: number;
    totalReviews: number;
}

const ProductReviews = ({ reviews, averageRating, totalReviews }: ProductReviewsProps) => {
    return (
        <section className="py-16 lg:py-24 bg-white">
            <div className="container mx-auto px-4 lg:px-8">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <h2 className="font-serif text-2xl md:text-3xl font-medium text-text-primary mb-4">
                        Đánh giá từ khách hàng
                    </h2>

                    {/* Rating Summary */}
                    <div className="flex items-center justify-center gap-4">
                        <div className="text-4xl font-bold text-text-primary">{averageRating.toFixed(1)}</div>
                        <div className="text-left">
                            <div className="flex gap-1 mb-1">
                                {[...Array(5)].map((_, i) => (
                                    <svg
                                        key={i}
                                        className={`w-5 h-5 ${i < Math.floor(averageRating) ? 'text-amber-400' : 'text-gray-200'}`}
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                ))}
                            </div>
                            <p className="text-sm text-text-secondary">{totalReviews} đánh giá</p>
                        </div>
                    </div>
                </motion.div>

                {/* Magazine-style Reviews Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {reviews.map((review, index) => (
                        <motion.article
                            key={review.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className={`bg-cream-50 rounded-2xl overflow-hidden ${index === 0 ? 'lg:col-span-2 lg:row-span-2' : ''
                                }`}
                        >
                            {/* Review Images */}
                            {review.images && review.images.length > 0 && (
                                <div className={`relative ${index === 0 ? 'aspect-video' : 'aspect-[16/9]'}`}>
                                    <Image
                                        src={review.images[0]}
                                        alt={`Review by ${review.author}`}
                                        fill
                                        className="object-cover"
                                    />
                                    {review.images.length > 1 && (
                                        <div className="absolute bottom-3 right-3 px-2.5 py-1 bg-black/50 backdrop-blur-sm rounded-full text-white text-xs">
                                            +{review.images.length - 1} ảnh
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Content */}
                            <div className="p-5 lg:p-6">
                                {/* Author Info */}
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-200 to-primary-300 flex items-center justify-center overflow-hidden">
                                        {review.avatar ? (
                                            <Image src={review.avatar} alt={review.author} width={40} height={40} className="object-cover" />
                                        ) : (
                                            <span className="text-white font-medium">{review.author[0]}</span>
                                        )}
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2">
                                            <span className="font-medium text-text-primary">{review.author}</span>
                                            {review.verified && (
                                                <span className="flex items-center gap-1 text-xs text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                                                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                    </svg>
                                                    Đã mua
                                                </span>
                                            )}
                                        </div>
                                        <span className="text-xs text-text-muted">{review.date}</span>
                                    </div>
                                </div>

                                {/* Rating */}
                                <div className="flex gap-0.5 mb-3">
                                    {[...Array(5)].map((_, i) => (
                                        <svg
                                            key={i}
                                            className={`w-4 h-4 ${i < review.rating ? 'text-amber-400' : 'text-gray-200'}`}
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    ))}
                                </div>

                                {/* Review Content */}
                                {review.title && (
                                    <h4 className="font-medium text-text-primary mb-2">{review.title}</h4>
                                )}
                                <p className={`text-text-secondary leading-relaxed ${index === 0 ? '' : 'line-clamp-3'}`}>
                                    {review.content}
                                </p>

                                {/* Helpful */}
                                <div className="flex items-center gap-4 mt-4 pt-4 border-t border-cream-200">
                                    <button className="flex items-center gap-2 text-sm text-text-muted hover:text-primary-400 transition-colors">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                                        </svg>
                                        Hữu ích ({review.helpful})
                                    </button>
                                </div>
                            </div>
                        </motion.article>
                    ))}
                </div>

                {/* Load More */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="text-center mt-8"
                >
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="px-8 py-3 border-2 border-cream-200 hover:border-primary-200 rounded-xl text-text-primary font-medium transition-colors"
                    >
                        Xem thêm đánh giá
                    </motion.button>
                </motion.div>
            </div>
        </section>
    );
};

export default ProductReviews;
