'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import AnimatedSection from '@/components/ui/AnimatedSection';
import { brandInfo } from '@/lib/data';

const BrandIntro = () => {
    return (
        <section className="py-24 lg:py-32 bg-white overflow-hidden">
            <div className="container mx-auto px-4 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* Image */}
                    <AnimatedSection direction="left" className="relative">
                        <div className="relative aspect-[4/5] max-w-md mx-auto lg:mx-0">
                            {/* Decorative shapes */}
                            <motion.div
                                animate={{ rotate: [0, 5, 0] }}
                                transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
                                className="absolute -top-8 -right-8 w-32 h-32 bg-primary-50 rounded-full"
                            />
                            <motion.div
                                animate={{ rotate: [0, -5, 0] }}
                                transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                                className="absolute -bottom-8 -left-8 w-48 h-48 bg-mint-50 rounded-3xl"
                            />

                            {/* Main image */}
                            <div className="relative rounded-[2.5rem] overflow-hidden shadow-soft-xl">
                                <Image
                                    src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=600&q=80"
                                    alt="Về Bella Beauty"
                                    width={500}
                                    height={625}
                                    className="object-cover"
                                />
                            </div>

                            {/* Experience badge */}
                            <motion.div
                                animate={{ y: [0, -5, 0] }}
                                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                                className="absolute -right-6 bottom-16 bg-white rounded-2xl p-5 shadow-soft-lg"
                            >
                                <div className="text-center">
                                    <div className="font-serif text-3xl font-bold text-primary-400">
                                        {brandInfo.founded ? new Date().getFullYear() - brandInfo.founded : 6}+
                                    </div>
                                    <div className="text-sm text-text-muted">Năm kinh nghiệm</div>
                                </div>
                            </motion.div>
                        </div>
                    </AnimatedSection>

                    {/* Content */}
                    <AnimatedSection direction="right" className="text-center lg:text-left">
                        <span className="inline-block px-4 py-2 bg-lavender-50 rounded-full text-purple-600 text-sm font-medium mb-6">
                            Về chúng tôi
                        </span>

                        <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-medium text-text-primary mb-6 leading-tight">
                            Sứ mệnh mang{' '}
                            <span className="text-primary-400">vẻ đẹp thuần khiết</span>{' '}
                            đến mọi người
                        </h2>

                        <p className="text-lg text-text-secondary mb-8 leading-relaxed">
                            {brandInfo.description}
                        </p>

                        {/* Values */}
                        <div className="grid sm:grid-cols-2 gap-4 mb-8">
                            {brandInfo.values.map((value, index) => (
                                <motion.div
                                    key={value}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="flex items-center gap-3 p-4 bg-cream-50 rounded-2xl"
                                >
                                    <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0">
                                        <svg
                                            className="w-5 h-5 text-primary-400"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M5 13l4 4L19 7"
                                            />
                                        </svg>
                                    </div>
                                    <span className="text-sm font-medium text-text-primary">{value}</span>
                                </motion.div>
                            ))}
                        </div>

                        {/* Signature */}
                        <div className="flex items-center gap-4 justify-center lg:justify-start">
                            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary-200 to-primary-300 flex items-center justify-center">
                                <span className="text-white font-serif text-xl">H</span>
                            </div>
                            <div className="text-left">
                                <div className="font-serif text-lg text-text-primary">Hà Minh</div>
                                <div className="text-sm text-text-muted">Nhà sáng lập</div>
                            </div>
                        </div>
                    </AnimatedSection>
                </div>
            </div>
        </section>
    );
};

export default BrandIntro;
