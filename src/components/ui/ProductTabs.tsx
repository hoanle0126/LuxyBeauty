'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Tab {
    id: string;
    label: string;
    content: React.ReactNode;
}

interface ProductTabsProps {
    tabs: Tab[];
}

const ProductTabs = ({ tabs }: ProductTabsProps) => {
    const [activeTab, setActiveTab] = useState(tabs[0]?.id || '');

    return (
        <div className="w-full">
            {/* Tab Headers */}
            <div className="flex border-b border-cream-200 mb-6">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`relative px-6 py-4 text-sm font-medium transition-colors duration-200 ${activeTab === tab.id
                                ? 'text-primary-400'
                                : 'text-text-muted hover:text-text-primary'
                            }`}
                    >
                        {tab.label}
                        {activeTab === tab.id && (
                            <motion.div
                                layoutId="activeTabIndicator"
                                className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-400"
                                initial={false}
                                transition={{
                                    type: 'spring',
                                    stiffness: 500,
                                    damping: 35,
                                }}
                            />
                        )}
                    </button>
                ))}
            </div>

            {/* Tab Content */}
            <AnimatePresence mode="wait">
                {tabs.map((tab) =>
                    activeTab === tab.id ? (
                        <motion.div
                            key={tab.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                        >
                            {tab.content}
                        </motion.div>
                    ) : null
                )}
            </AnimatePresence>
        </div>
    );
};

export default ProductTabs;
