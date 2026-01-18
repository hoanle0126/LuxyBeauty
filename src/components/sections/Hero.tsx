'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { useRef } from 'react';
import Button from '@/components/ui/Button';

// Letter-by-letter text reveal animation
const AnimatedText = ({ text, className = '' }: { text: string; className?: string }) => {
    const words = text.split(' ');

    return (
        <span className={className}>
            {words.map((word, wordIndex) => (
                <span key={wordIndex} className="inline-block mr-[0.25em]">
                    {word.split('').map((char, charIndex) => (
                        <motion.span
                            key={charIndex}
                            initial={{ opacity: 0, y: 50, rotateX: -90 }}
                            animate={{ opacity: 1, y: 0, rotateX: 0 }}
                            transition={{
                                duration: 0.5,
                                delay: wordIndex * 0.1 + charIndex * 0.03,
                                ease: [0.25, 0.1, 0.25, 1],
                            }}
                            className="inline-block origin-bottom"
                        >
                            {char}
                        </motion.span>
                    ))}
                </span>
            ))}
        </span>
    );
};

// Floating product card component
interface FloatingCardProps {
    image: string;
    name: string;
    price: string;
    delay?: number;
    className?: string;
}

const FloatingCard = ({ image, name, price, delay = 0, className = '' }: FloatingCardProps) => (
    <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, delay: delay + 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        className={`absolute bg-white/95 backdrop-blur-sm rounded-2xl p-3 shadow-soft-lg ${className}`}
    >
        <motion.div
            animate={{
                y: [0, -8, 0],
                rotate: [0, 1, 0, -1, 0]
            }}
            transition={{
                duration: 4 + delay,
                repeat: Infinity,
                ease: 'easeInOut'
            }}
        >
            <div className="flex items-center gap-3">
                <div className="relative w-12 h-12 rounded-xl overflow-hidden">
                    <Image src={image} alt={name} fill className="object-cover" />
                </div>
                <div>
                    <p className="text-sm font-medium text-text-primary">{name}</p>
                    <p className="text-xs text-primary-400 font-semibold">{price}</p>
                </div>
            </div>
        </motion.div>
    </motion.div>
);

const Hero = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end start'],
    });

    const imageY = useTransform(scrollYProgress, [0, 1], [0, 100]);
    const contentY = useTransform(scrollYProgress, [0, 1], [0, 50]);
    const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

    return (
        <section
            ref={containerRef}
            className="relative min-h-screen overflow-hidden bg-gradient-to-br from-cream-50 via-white to-lavender-50"
        >
            {/* Animated Blurry Blobs Background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    animate={{
                        x: [0, 30, -20, 0],
                        y: [0, -40, 20, 0],
                        scale: [1, 1.2, 0.9, 1],
                    }}
                    transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute -top-32 -right-32 w-[500px] h-[500px] bg-primary-100/60 rounded-full blur-[80px]"
                />
                <motion.div
                    animate={{
                        x: [0, -40, 30, 0],
                        y: [0, 30, -40, 0],
                        scale: [1, 0.9, 1.1, 1],
                    }}
                    transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
                    className="absolute -bottom-32 -left-32 w-[400px] h-[400px] bg-mint-100/60 rounded-full blur-[80px]"
                />
                <motion.div
                    animate={{
                        x: [0, 20, -30, 0],
                        y: [0, -20, 30, 0],
                        scale: [1, 1.1, 0.95, 1],
                    }}
                    transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
                    className="absolute top-1/4 left-1/3 w-[300px] h-[300px] bg-lavender-100/50 rounded-full blur-[60px]"
                />
            </div>

            <div className="container mx-auto px-4 lg:px-8 min-h-screen flex items-center">
                {/* Asymmetric Grid Layout */}
                <div className="grid lg:grid-cols-12 gap-8 lg:gap-4 items-center w-full pt-24 pb-12">

                    {/* Left Content - Asymmetric positioning */}
                    <motion.div
                        style={{ y: contentY, opacity }}
                        className="lg:col-span-5 lg:col-start-1 z-10 text-center lg:text-left"
                    >
                        {/* Badge */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-soft mb-8"
                        >
                            <span className="w-2 h-2 bg-primary-300 rounded-full animate-pulse" />
                            <span className="text-sm font-medium text-text-secondary">Bộ sưu tập Xuân 2024</span>
                        </motion.div>

                        {/* Animated Headline */}
                        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-medium text-text-primary leading-[1.1] mb-6">
                            <AnimatedText text="Khám phá" />
                            <br />
                            <span className="text-primary-400">
                                <AnimatedText text="Vẻ đẹp" />
                            </span>
                            <br />
                            <AnimatedText text="Thuần khiết" />
                        </h1>

                        {/* Description */}
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 1.2 }}
                            className="text-lg text-text-secondary max-w-md mx-auto lg:mx-0 mb-8 leading-relaxed"
                        >
                            Mỹ phẩm cao cấp chiết xuất từ thiên nhiên, mang đến làn da khỏe mạnh và rạng rỡ mỗi ngày.
                        </motion.p>

                        {/* CTA Buttons */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 1.4 }}
                            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
                        >
                            <Button size="lg" rightIcon={
                                <motion.svg
                                    animate={{ x: [0, 5, 0] }}
                                    transition={{ duration: 1.5, repeat: Infinity }}
                                    className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </motion.svg>
                            }>
                                Mua sắm ngay
                            </Button>
                            <Button variant="ghost" size="lg">
                                Xem bộ sưu tập
                            </Button>
                        </motion.div>

                        {/* Stats */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.8 }}
                            className="flex items-center justify-center lg:justify-start gap-8 mt-12"
                        >
                            {[
                                { value: '100%', label: 'Tự nhiên' },
                                { value: '50K+', label: 'Khách hài lòng' },
                                { value: '4.9', label: 'Đánh giá' },
                            ].map((stat, index) => (
                                <motion.div
                                    key={stat.label}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 1.8 + index * 0.1 }}
                                    className="text-center"
                                >
                                    <div className="font-serif text-2xl font-bold text-text-primary">{stat.value}</div>
                                    <div className="text-xs text-text-muted">{stat.label}</div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.div>

                    {/* Right - Asymmetric Image Area with Floating Effect */}
                    <motion.div
                        style={{ y: imageY }}
                        className="lg:col-span-7 lg:col-start-6 relative"
                    >
                        <div className="relative aspect-[4/5] max-w-xl mx-auto lg:ml-auto">
                            {/* Decorative shapes - Asymmetric */}
                            <motion.div
                                animate={{
                                    rotate: [0, 5, -3, 0],
                                    scale: [1, 1.02, 0.98, 1]
                                }}
                                transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
                                className="absolute -top-8 -right-8 w-48 h-48 bg-primary-100/80 rounded-[2rem] blur-sm"
                            />
                            <motion.div
                                animate={{
                                    rotate: [0, -4, 6, 0],
                                    scale: [1, 0.98, 1.03, 1]
                                }}
                                transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                                className="absolute -bottom-12 -left-12 w-64 h-64 bg-mint-100/80 rounded-[3rem] blur-sm"
                            />

                            {/* Main Floating Image */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9, y: 50 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                transition={{ duration: 1, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                                className="relative z-10"
                            >
                                <motion.div
                                    animate={{
                                        y: [0, -15, 0],
                                        rotate: [0, 1, -1, 0]
                                    }}
                                    transition={{
                                        duration: 6,
                                        repeat: Infinity,
                                        ease: 'easeInOut'
                                    }}
                                    className="rounded-[2.5rem] overflow-hidden shadow-soft-xl"
                                >
                                    <Image
                                        src="https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&q=80"
                                        alt="Bộ sưu tập mỹ phẩm Bella Beauty"
                                        width={600}
                                        height={750}
                                        priority
                                        className="object-cover w-full h-full"
                                    />
                                </motion.div>
                            </motion.div>

                            {/* Floating Product Cards - Asymmetric positions */}
                            <FloatingCard
                                image="https://images.unsplash.com/photo-1617897903246-719242758050?w=200&q=80"
                                name="Rose Serum"
                                price="1.250.000₫"
                                delay={0}
                                className="-left-8 lg:-left-16 top-1/4 z-20"
                            />

                            <FloatingCard
                                image="https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=200&q=80"
                                name="Vitamin C"
                                price="950.000₫"
                                delay={0.5}
                                className="-right-4 lg:-right-12 top-2/3 z-20"
                            />

                            {/* Rating badge */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.6, delay: 1.5 }}
                                className="absolute -bottom-4 left-1/4 z-20"
                            >
                                <motion.div
                                    animate={{ y: [0, -5, 0] }}
                                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                                    className="bg-white/95 backdrop-blur-sm rounded-full px-4 py-2 shadow-soft-lg flex items-center gap-2"
                                >
                                    <div className="flex">
                                        {[...Array(5)].map((_, i) => (
                                            <svg key={i} className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                            </svg>
                                        ))}
                                    </div>
                                    <span className="text-sm font-medium text-text-primary">4.9</span>
                                    <span className="text-xs text-text-muted">(2.5k reviews)</span>
                                </motion.div>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
            >
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="flex flex-col items-center gap-2"
                >
                    <span className="text-xs text-text-muted">Cuộn để khám phá</span>
                    <div className="w-6 h-10 border-2 border-text-muted/30 rounded-full flex justify-center pt-2">
                        <motion.div
                            animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="w-1.5 h-1.5 bg-primary-300 rounded-full"
                        />
                    </div>
                </motion.div>
            </motion.div>
        </section>
    );
};

export default Hero;
