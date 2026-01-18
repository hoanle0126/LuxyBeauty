'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { useRef } from 'react';
import AnimatedSection from '@/components/ui/AnimatedSection';

interface StoryBlockProps {
    title: string;
    description: string;
    index: number;
}

const StoryBlock = ({ title, description, index }: StoryBlockProps) => {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start end', 'end start'],
    });

    const x = useTransform(
        scrollYProgress,
        [0, 0.5, 1],
        [index % 2 === 0 ? -50 : 50, 0, index % 2 === 0 ? 50 : -50]
    );
    const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0.5]);

    return (
        <motion.div
            ref={ref}
            style={{ x, opacity }}
            className="relative"
        >
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-soft">
                <span className="inline-block w-10 h-10 rounded-full bg-primary-100 text-primary-400 font-serif font-bold text-lg flex items-center justify-center mb-4">
                    {index + 1}
                </span>
                <h3 className="font-serif text-2xl font-medium text-text-primary mb-3">
                    {title}
                </h3>
                <p className="text-text-secondary leading-relaxed">
                    {description}
                </p>
            </div>
        </motion.div>
    );
};

const storyData = [
    {
        title: 'Khởi nguồn từ thiên nhiên',
        description: 'Bella Beauty ra đời từ niềm đam mê với vẻ đẹp tự nhiên. Chúng tôi tin rằng làn da khỏe mạnh bắt nguồn từ những thành phần thuần khiết nhất.',
    },
    {
        title: 'Công thức độc quyền',
        description: 'Mỗi sản phẩm được nghiên cứu và phát triển bởi đội ngũ chuyên gia hàng đầu, kết hợp công nghệ hiện đại với tinh hoa thiên nhiên.',
    },
    {
        title: 'Cam kết bền vững',
        description: 'Từ bao bì thân thiện môi trường đến quy trình sản xuất xanh, chúng tôi đặt sự bền vững làm kim chỉ nam cho mọi hoạt động.',
    },
];

const BrandStory = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start end', 'end start'],
    });

    // Parallax transforms for images
    const imageY1 = useTransform(scrollYProgress, [0, 1], [100, -100]);
    const imageY2 = useTransform(scrollYProgress, [0, 1], [50, -150]);
    const imageY3 = useTransform(scrollYProgress, [0, 1], [150, -50]);

    return (
        <section ref={containerRef} className="relative py-24 lg:py-32 overflow-hidden">
            {/* Animated Blurry Blobs Background */}
            <div className="absolute inset-0 pointer-events-none">
                <motion.div
                    animate={{
                        x: [0, 60, -40, 0],
                        y: [0, -80, 40, 0],
                        scale: [1, 1.3, 0.8, 1],
                    }}
                    transition={{ duration: 30, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-gradient-to-br from-primary-100/50 to-primary-200/30 rounded-full blur-[100px]"
                />
                <motion.div
                    animate={{
                        x: [0, -50, 60, 0],
                        y: [0, 60, -50, 0],
                        scale: [1, 0.9, 1.2, 1],
                    }}
                    transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
                    className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-gradient-to-tr from-mint-100/50 to-mint-200/30 rounded-full blur-[100px]"
                />
                <motion.div
                    animate={{
                        x: [0, 40, -30, 0],
                        y: [0, -40, 60, 0],
                        scale: [1, 1.1, 0.95, 1],
                    }}
                    transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut', delay: 6 }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-gradient-to-bl from-lavender-100/50 to-lavender-200/30 rounded-full blur-[80px]"
                />
                <motion.div
                    animate={{
                        x: [0, -30, 50, 0],
                        y: [0, 50, -30, 0],
                        scale: [1, 0.85, 1.15, 1],
                    }}
                    transition={{ duration: 28, repeat: Infinity, ease: 'easeInOut', delay: 9 }}
                    className="absolute top-1/4 left-0 w-[350px] h-[350px] bg-gradient-to-r from-cream-100/60 to-cream-200/40 rounded-full blur-[90px]"
                />
            </div>

            <div className="container mx-auto px-4 lg:px-8 relative z-10">
                {/* Section Header */}
                <AnimatedSection className="text-center mb-20">
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-block px-5 py-2 bg-white/80 backdrop-blur-sm rounded-full text-primary-400 text-sm font-medium shadow-soft mb-6"
                    >
                        ✨ Câu chuyện thương hiệu
                    </motion.span>
                    <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-medium text-text-primary mb-6 leading-tight">
                        Hành trình của
                        <br />
                        <span className="text-primary-400">Bella Beauty</span>
                    </h2>
                    <p className="text-lg text-text-secondary max-w-2xl mx-auto">
                        Từ một ước mơ nhỏ đến thương hiệu mỹ phẩm được yêu thích,
                        mỗi bước đi của chúng tôi đều hướng đến vẻ đẹp thuần khiết.
                    </p>
                </AnimatedSection>

                {/* Main Content - Asymmetric Grid */}
                <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">

                    {/* Left - Parallax Images */}
                    <div className="lg:col-span-5 relative h-[600px] lg:h-[700px]">
                        {/* Image 1 - Main */}
                        <motion.div
                            style={{ y: imageY1 }}
                            className="absolute top-0 left-0 w-[70%] aspect-[3/4] rounded-3xl overflow-hidden shadow-soft-xl z-10"
                        >
                            <Image
                                src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=500&q=80"
                                alt="Bella Beauty Story"
                                fill
                                className="object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                        </motion.div>

                        {/* Image 2 - Secondary */}
                        <motion.div
                            style={{ y: imageY2 }}
                            className="absolute top-[30%] right-0 w-[55%] aspect-square rounded-2xl overflow-hidden shadow-soft-lg z-20"
                        >
                            <Image
                                src="https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&q=80"
                                alt="Sản phẩm Bella Beauty"
                                fill
                                className="object-cover"
                            />
                        </motion.div>

                        {/* Image 3 - Accent */}
                        <motion.div
                            style={{ y: imageY3 }}
                            className="absolute bottom-0 left-[20%] w-[45%] aspect-[4/5] rounded-2xl overflow-hidden shadow-soft z-0"
                        >
                            <Image
                                src="https://images.unsplash.com/photo-1617897903246-719242758050?w=400&q=80"
                                alt="Chi tiết sản phẩm"
                                fill
                                className="object-cover"
                            />
                        </motion.div>

                        {/* Floating Badge */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.5 }}
                            className="absolute bottom-16 right-4 z-30"
                        >
                            <motion.div
                                animate={{ y: [0, -8, 0], rotate: [0, 2, -2, 0] }}
                                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                                className="bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-soft-lg"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-200 to-primary-300 flex items-center justify-center">
                                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <div className="font-serif text-xl font-bold text-text-primary">50K+</div>
                                        <div className="text-xs text-text-muted">Khách hàng tin dùng</div>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    </div>

                    {/* Right - Story Blocks */}
                    <div className="lg:col-span-7 space-y-6">
                        {storyData.map((story, index) => (
                            <StoryBlock
                                key={index}
                                title={story.title}
                                description={story.description}
                                index={index}
                            />
                        ))}

                        {/* Values Grid */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                            className="grid grid-cols-2 gap-4 mt-8"
                        >
                            {[
                                { icon: '🌿', label: '100% Tự nhiên' },
                                { icon: '🐰', label: 'Cruelty-free' },
                                { icon: '♻️', label: 'Bền vững' },
                                { icon: '✨', label: 'Tested' },
                            ].map((value, index) => (
                                <motion.div
                                    key={value.label}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.1 * index }}
                                    whileHover={{ scale: 1.05 }}
                                    className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 text-center shadow-soft cursor-default"
                                >
                                    <span className="text-2xl mb-2 block">{value.icon}</span>
                                    <span className="text-sm font-medium text-text-primary">{value.label}</span>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </div>

                {/* Bottom Quote */}
                <AnimatedSection delay={0.5} className="mt-20 text-center">
                    <div className="max-w-3xl mx-auto bg-white/70 backdrop-blur-sm rounded-3xl p-8 lg:p-12 shadow-soft">
                        <svg className="w-12 h-12 text-primary-200 mx-auto mb-6" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                        </svg>
                        <blockquote className="font-serif text-2xl lg:text-3xl text-text-primary mb-6 leading-relaxed">
                            "Vẻ đẹp thực sự tỏa sáng từ bên trong. Chúng tôi chỉ giúp bạn tôn vinh nó."
                        </blockquote>
                        <div className="flex items-center justify-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-200 to-primary-300 flex items-center justify-center">
                                <span className="text-white font-serif font-bold">HM</span>
                            </div>
                            <div className="text-left">
                                <div className="font-medium text-text-primary">Hà Minh</div>
                                <div className="text-sm text-text-muted">Nhà sáng lập Bella Beauty</div>
                            </div>
                        </div>
                    </div>
                </AnimatedSection>
            </div>
        </section>
    );
};

export default BrandStory;
