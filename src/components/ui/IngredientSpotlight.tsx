'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

interface Ingredient {
    id: string;
    name: string;
    icon: string;
    description: string;
    benefit: string;
}

interface IngredientSpotlightProps {
    ingredients: Ingredient[];
}

const IngredientSpotlight = ({ ingredients }: IngredientSpotlightProps) => {
    const [hoveredId, setHoveredId] = useState<string | null>(null);

    return (
        <section className="py-16 lg:py-24 bg-gradient-to-b from-cream-50 to-white overflow-hidden">
            <div className="container mx-auto px-4 lg:px-8">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <span className="inline-block px-4 py-2 bg-mint-100 rounded-full text-emerald-700 text-sm font-medium mb-4">
                        🌿 Thành phần nổi bật
                    </span>
                    <h2 className="font-serif text-2xl md:text-3xl font-medium text-text-primary">
                        Được chọn lọc kỹ lưỡng
                    </h2>
                </motion.div>

                {/* Ingredients Grid */}
                <div className="flex flex-wrap justify-center gap-6 lg:gap-8">
                    {ingredients.map((ingredient, index) => (
                        <motion.div
                            key={ingredient.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            onMouseEnter={() => setHoveredId(ingredient.id)}
                            onMouseLeave={() => setHoveredId(null)}
                            className="relative"
                        >
                            {/* Main Circle */}
                            <motion.div
                                animate={{
                                    y: hoveredId === ingredient.id ? -8 : 0,
                                    scale: hoveredId === ingredient.id ? 1.05 : 1,
                                }}
                                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                                className="relative w-28 h-28 lg:w-32 lg:h-32 rounded-full bg-white shadow-soft cursor-pointer flex flex-col items-center justify-center"
                            >
                                {/* Floating animation */}
                                <motion.div
                                    animate={{ y: [0, -6, 0] }}
                                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: index * 0.3 }}
                                >
                                    <span className="text-3xl lg:text-4xl mb-1">{ingredient.icon}</span>
                                </motion.div>
                                <span className="text-xs lg:text-sm font-medium text-text-primary text-center px-2">
                                    {ingredient.name}
                                </span>
                            </motion.div>

                            {/* Hover Card */}
                            <motion.div
                                initial={{ opacity: 0, y: 10, scale: 0.9 }}
                                animate={{
                                    opacity: hoveredId === ingredient.id ? 1 : 0,
                                    y: hoveredId === ingredient.id ? 0 : 10,
                                    scale: hoveredId === ingredient.id ? 1 : 0.9,
                                }}
                                transition={{ duration: 0.2 }}
                                className="absolute left-1/2 -translate-x-1/2 top-full mt-4 w-64 bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-soft-lg z-10 pointer-events-none"
                            >
                                <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white rotate-45 shadow-sm" />
                                <h4 className="font-medium text-text-primary mb-2">{ingredient.name}</h4>
                                <p className="text-sm text-text-secondary mb-2">{ingredient.description}</p>
                                <div className="flex items-center gap-2 text-xs text-primary-500">
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    <span>{ingredient.benefit}</span>
                                </div>
                            </motion.div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default IngredientSpotlight;
