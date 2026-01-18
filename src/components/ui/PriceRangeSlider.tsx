'use client';

import { motion } from 'framer-motion';
import { useState, useCallback } from 'react';

interface PriceRangeSliderProps {
    min: number;
    max: number;
    step: number;
    value: [number, number];
    onChange: (value: [number, number]) => void;
    formatValue?: (value: number) => string;
}

const PriceRangeSlider = ({
    min,
    max,
    step,
    value,
    onChange,
    formatValue = (v) => v.toLocaleString('vi-VN') + '₫',
}: PriceRangeSliderProps) => {
    const [isDragging, setIsDragging] = useState<'min' | 'max' | null>(null);

    const getPercent = useCallback(
        (value: number) => ((value - min) / (max - min)) * 100,
        [min, max]
    );

    const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newMin = Math.min(Number(e.target.value), value[1] - step);
        onChange([newMin, value[1]]);
    };

    const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newMax = Math.max(Number(e.target.value), value[0] + step);
        onChange([value[0], newMax]);
    };

    const minPercent = getPercent(value[0]);
    const maxPercent = getPercent(value[1]);

    return (
        <div className="w-full">
            {/* Values Display */}
            <div className="flex justify-between items-center mb-4">
                <motion.span
                    animate={{ scale: isDragging === 'min' ? 1.05 : 1 }}
                    className="px-3 py-1.5 bg-cream-100 rounded-lg text-sm font-medium text-text-primary"
                >
                    {formatValue(value[0])}
                </motion.span>
                <span className="text-text-muted mx-2">—</span>
                <motion.span
                    animate={{ scale: isDragging === 'max' ? 1.05 : 1 }}
                    className="px-3 py-1.5 bg-cream-100 rounded-lg text-sm font-medium text-text-primary"
                >
                    {formatValue(value[1])}
                </motion.span>
            </div>

            {/* Slider Track */}
            <div className="relative h-2 w-full">
                {/* Background Track */}
                <div className="absolute h-2 w-full bg-cream-200 rounded-full" />

                {/* Active Track */}
                <motion.div
                    className="absolute h-2 bg-gradient-to-r from-primary-200 to-primary-300 rounded-full"
                    style={{
                        left: `${minPercent}%`,
                        width: `${maxPercent - minPercent}%`,
                    }}
                    layoutId="priceTrack"
                />

                {/* Min Thumb */}
                <input
                    type="range"
                    min={min}
                    max={max}
                    step={step}
                    value={value[0]}
                    onChange={handleMinChange}
                    onMouseDown={() => setIsDragging('min')}
                    onMouseUp={() => setIsDragging(null)}
                    onTouchStart={() => setIsDragging('min')}
                    onTouchEnd={() => setIsDragging(null)}
                    className="absolute w-full h-2 appearance-none bg-transparent pointer-events-none z-10
            [&::-webkit-slider-thumb]:appearance-none
            [&::-webkit-slider-thumb]:pointer-events-auto
            [&::-webkit-slider-thumb]:w-5
            [&::-webkit-slider-thumb]:h-5
            [&::-webkit-slider-thumb]:rounded-full
            [&::-webkit-slider-thumb]:bg-white
            [&::-webkit-slider-thumb]:border-2
            [&::-webkit-slider-thumb]:border-primary-300
            [&::-webkit-slider-thumb]:shadow-soft
            [&::-webkit-slider-thumb]:cursor-grab
            [&::-webkit-slider-thumb]:active:cursor-grabbing
            [&::-webkit-slider-thumb]:hover:border-primary-400
            [&::-webkit-slider-thumb]:hover:shadow-soft-lg
            [&::-webkit-slider-thumb]:transition-all
            [&::-moz-range-thumb]:appearance-none
            [&::-moz-range-thumb]:pointer-events-auto
            [&::-moz-range-thumb]:w-5
            [&::-moz-range-thumb]:h-5
            [&::-moz-range-thumb]:rounded-full
            [&::-moz-range-thumb]:bg-white
            [&::-moz-range-thumb]:border-2
            [&::-moz-range-thumb]:border-primary-300
            [&::-moz-range-thumb]:cursor-grab"
                />

                {/* Max Thumb */}
                <input
                    type="range"
                    min={min}
                    max={max}
                    step={step}
                    value={value[1]}
                    onChange={handleMaxChange}
                    onMouseDown={() => setIsDragging('max')}
                    onMouseUp={() => setIsDragging(null)}
                    onTouchStart={() => setIsDragging('max')}
                    onTouchEnd={() => setIsDragging(null)}
                    className="absolute w-full h-2 appearance-none bg-transparent pointer-events-none z-20
            [&::-webkit-slider-thumb]:appearance-none
            [&::-webkit-slider-thumb]:pointer-events-auto
            [&::-webkit-slider-thumb]:w-5
            [&::-webkit-slider-thumb]:h-5
            [&::-webkit-slider-thumb]:rounded-full
            [&::-webkit-slider-thumb]:bg-white
            [&::-webkit-slider-thumb]:border-2
            [&::-webkit-slider-thumb]:border-primary-300
            [&::-webkit-slider-thumb]:shadow-soft
            [&::-webkit-slider-thumb]:cursor-grab
            [&::-webkit-slider-thumb]:active:cursor-grabbing
            [&::-webkit-slider-thumb]:hover:border-primary-400
            [&::-webkit-slider-thumb]:hover:shadow-soft-lg
            [&::-webkit-slider-thumb]:transition-all
            [&::-moz-range-thumb]:appearance-none
            [&::-moz-range-thumb]:pointer-events-auto
            [&::-moz-range-thumb]:w-5
            [&::-moz-range-thumb]:h-5
            [&::-moz-range-thumb]:rounded-full
            [&::-moz-range-thumb]:bg-white
            [&::-moz-range-thumb]:border-2
            [&::-moz-range-thumb]:border-primary-300
            [&::-moz-range-thumb]:cursor-grab"
                />
            </div>
        </div>
    );
};

export default PriceRangeSlider;
