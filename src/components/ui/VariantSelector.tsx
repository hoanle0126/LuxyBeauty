'use client';

import { motion } from 'framer-motion';

interface VariantOption {
    id: string;
    name: string;
    value?: string; // For color hex
    inStock?: boolean;
}

interface VariantSelectorProps {
    label: string;
    options: VariantOption[];
    selectedId: string;
    onChange: (id: string) => void;
    type?: 'color' | 'size' | 'default';
}

const VariantSelector = ({
    label,
    options,
    selectedId,
    onChange,
    type = 'default',
}: VariantSelectorProps) => {
    if (type === 'color') {
        return (
            <div className="space-y-3">
                <label className="block text-sm font-medium text-text-primary">
                    {label}: <span className="text-text-secondary font-normal">{options.find(o => o.id === selectedId)?.name}</span>
                </label>
                <div className="flex flex-wrap gap-3">
                    {options.map((option) => (
                        <motion.button
                            key={option.id}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => option.inStock !== false && onChange(option.id)}
                            disabled={option.inStock === false}
                            className={`relative w-10 h-10 rounded-full transition-all duration-300 ${option.inStock === false ? 'opacity-30 cursor-not-allowed' : ''
                                }`}
                            style={{ backgroundColor: option.value || '#ccc' }}
                        >
                            {/* Animated outline ring */}
                            {selectedId === option.id && (
                                <motion.div
                                    layoutId="colorRing"
                                    className="absolute -inset-1.5 rounded-full border-2 border-primary-400"
                                    initial={false}
                                    transition={{
                                        type: 'spring',
                                        stiffness: 500,
                                        damping: 30,
                                    }}
                                />
                            )}

                            {/* Checkmark for selected */}
                            {selectedId === option.id && (
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="absolute inset-0 flex items-center justify-center"
                                >
                                    <svg
                                        className="w-5 h-5 text-white drop-shadow-md"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </motion.div>
                            )}

                            {/* Out of stock indicator */}
                            {option.inStock === false && (
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-full h-0.5 bg-text-secondary rotate-45" />
                                </div>
                            )}
                        </motion.button>
                    ))}
                </div>
            </div>
        );
    }

    // Size or default variant
    return (
        <div className="space-y-3">
            <label className="block text-sm font-medium text-text-primary">{label}</label>
            <div className="flex flex-wrap gap-2">
                {options.map((option) => (
                    <motion.button
                        key={option.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => option.inStock !== false && onChange(option.id)}
                        disabled={option.inStock === false}
                        className={`relative px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${option.inStock === false
                                ? 'bg-cream-100 text-text-muted cursor-not-allowed line-through'
                                : selectedId === option.id
                                    ? 'text-white'
                                    : 'bg-cream-100 text-text-primary hover:bg-cream-200'
                            }`}
                    >
                        {/* Animated background */}
                        {selectedId === option.id && option.inStock !== false && (
                            <motion.div
                                layoutId="sizeBackground"
                                className="absolute inset-0 bg-gradient-to-r from-primary-300 to-primary-400 rounded-xl shadow-soft"
                                initial={false}
                                transition={{
                                    type: 'spring',
                                    stiffness: 500,
                                    damping: 30,
                                }}
                            />
                        )}
                        <span className="relative z-10">{option.name}</span>
                    </motion.button>
                ))}
            </div>
        </div>
    );
};

export default VariantSelector;
