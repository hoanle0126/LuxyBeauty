'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

interface CategoryTabsProps {
    categories: { id: string; name: string }[];
    activeCategory: string;
    onCategoryChange: (categoryId: string) => void;
}

const CategoryTabs = ({ categories, activeCategory, onCategoryChange }: CategoryTabsProps) => {
    const [hoveredTab, setHoveredTab] = useState<string | null>(null);

    return (
        <div className="flex flex-wrap justify-center gap-2 mb-12">
            {categories.map((category) => {
                const isActive = activeCategory === category.id;
                const isHovered = hoveredTab === category.id;

                return (
                    <motion.button
                        key={category.id}
                        onClick={() => onCategoryChange(category.id)}
                        onMouseEnter={() => setHoveredTab(category.id)}
                        onMouseLeave={() => setHoveredTab(null)}
                        className={`relative px-6 py-3 rounded-full text-sm font-medium transition-colors duration-300 ${isActive
                                ? 'text-white'
                                : 'text-text-secondary hover:text-text-primary'
                            }`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        {/* Background pill */}
                        {isActive && (
                            <motion.div
                                layoutId="activeTab"
                                className="absolute inset-0 bg-gradient-to-r from-primary-300 to-primary-400 rounded-full shadow-soft"
                                initial={false}
                                transition={{
                                    type: 'spring',
                                    stiffness: 500,
                                    damping: 35,
                                }}
                            />
                        )}

                        {/* Hover background */}
                        {!isActive && isHovered && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="absolute inset-0 bg-cream-100 rounded-full"
                            />
                        )}

                        <span className="relative z-10">{category.name}</span>
                    </motion.button>
                );
            })}
        </div>
    );
};

export default CategoryTabs;
