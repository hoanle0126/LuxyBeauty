'use client';

import { motion } from 'framer-motion';

interface RatingFilterProps {
    value: number | null;
    onChange: (value: number | null) => void;
}

const RatingFilter = ({ value, onChange }: RatingFilterProps) => {
    const ratings = [5, 4, 3, 2, 1];

    return (
        <div className="space-y-2">
            {ratings.map((rating) => (
                <motion.button
                    key={rating}
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => onChange(value === rating ? null : rating)}
                    className={`w-full flex items-center gap-3 p-2 rounded-xl transition-all duration-300 ${value === rating
                            ? 'bg-primary-50 border border-primary-200'
                            : 'hover:bg-cream-50'
                        }`}
                >
                    {/* Stars */}
                    <div className="flex gap-0.5">
                        {[...Array(5)].map((_, i) => (
                            <motion.svg
                                key={i}
                                initial={false}
                                animate={{
                                    scale: value === rating ? 1.1 : 1,
                                    color: i < rating
                                        ? value === rating ? '#F59E0B' : '#FCD34D'
                                        : '#E5E7EB',
                                }}
                                transition={{ duration: 0.2, delay: i * 0.03 }}
                                className="w-4 h-4"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                            >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </motion.svg>
                        ))}
                    </div>

                    {/* Label */}
                    <span className={`text-sm ${value === rating ? 'font-medium text-text-primary' : 'text-text-secondary'}`}>
                        {rating === 5 ? '5 sao' : `${rating} sao trở lên`}
                    </span>

                    {/* Checkmark */}
                    {value === rating && (
                        <motion.svg
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="w-4 h-4 text-primary-400 ml-auto"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                        >
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </motion.svg>
                    )}
                </motion.button>
            ))}
        </div>
    );
};

export default RatingFilter;
