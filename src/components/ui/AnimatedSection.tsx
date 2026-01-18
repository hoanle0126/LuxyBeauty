'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, ReactNode } from 'react';

interface AnimatedSectionProps {
    children: ReactNode;
    className?: string;
    delay?: number;
    direction?: 'up' | 'down' | 'left' | 'right' | 'none';
    duration?: number;
    once?: boolean;
}

const directionVariants = {
    up: { y: 40, x: 0 },
    down: { y: -40, x: 0 },
    left: { y: 0, x: 40 },
    right: { y: 0, x: -40 },
    none: { y: 0, x: 0 },
};

const AnimatedSection = ({
    children,
    className = '',
    delay = 0,
    direction = 'up',
    duration = 0.6,
    once = true,
}: AnimatedSectionProps) => {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once, margin: '-100px' });

    const initialPosition = directionVariants[direction];

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, ...initialPosition }}
            animate={isInView ? { opacity: 1, y: 0, x: 0 } : { opacity: 0, ...initialPosition }}
            transition={{
                duration,
                delay,
                ease: [0.25, 0.1, 0.25, 1], // Custom easing for smooth feel
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
};

export default AnimatedSection;
