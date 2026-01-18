'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Category } from '@/types';

interface CategoryCardProps {
    category: Category;
    index?: number;
}

const CategoryCard = ({ category, index = 0 }: CategoryCardProps) => {
    const { name, description, image, slug, productCount } = category;

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{
                duration: 0.5,
                delay: index * 0.15,
                ease: [0.25, 0.1, 0.25, 1],
            }}
        >
            <Link href={`/categories/${slug}`} className="block group">
                <article className="relative aspect-[3/4] rounded-3xl overflow-hidden shadow-soft hover:shadow-soft-lg transition-all duration-500">
                    {/* Background Image */}
                    <motion.div
                        whileHover={{ scale: 1.08 }}
                        transition={{ duration: 0.6, ease: 'easeOut' }}
                        className="absolute inset-0"
                    >
                        <Image
                            src={image}
                            alt={name}
                            fill
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                            className="object-cover"
                        />
                    </motion.div>

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-60 group-hover:opacity-70 transition-opacity duration-500" />

                    {/* Content */}
                    <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                        <motion.div
                            initial={{ y: 10, opacity: 0.8 }}
                            whileHover={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.3 }}
                        >
                            {productCount && (
                                <span className="text-xs font-medium text-white/80 mb-2 block">
                                    {productCount} sản phẩm
                                </span>
                            )}
                            <h3 className="font-serif text-2xl font-medium mb-2">{name}</h3>
                            <p className="text-sm text-white/80 line-clamp-2 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                                {description}
                            </p>

                            {/* Arrow Icon */}
                            <motion.div
                                initial={{ x: -10, opacity: 0 }}
                                whileHover={{ x: 0, opacity: 1 }}
                                className="mt-4 flex items-center gap-2 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            >
                                <span>Khám phá</span>
                                <svg
                                    className="w-4 h-4"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                                    />
                                </svg>
                            </motion.div>
                        </motion.div>
                    </div>
                </article>
            </Link>
        </motion.div>
    );
};

export default CategoryCard;
