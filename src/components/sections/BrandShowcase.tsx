'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { allBrands } from '@/lib/data';

const BrandShowcase = () => {
    // Duplicate brands to create seamless loop
    const brandList = [...allBrands, ...allBrands];

    return (
        <section className="py-16 bg-cream-50 overflow-hidden">
            <div className="container mx-auto px-4 mb-10 text-center">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="font-serif text-2xl md:text-3xl font-medium text-text-primary mb-3"
                >
                    Đối tác chiến lược
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="text-text-muted"
                >
                    Những thương hiệu làm đẹp hàng đầu thế giới
                </motion.p>
            </div>

            <div className="relative w-full">
                {/* Gradient Masks */}
                <div className="absolute top-0 left-0 bottom-0 w-20 md:w-40 z-10 bg-gradient-to-r from-cream-50 to-transparent pointer-events-none" />
                <div className="absolute top-0 right-0 bottom-0 w-20 md:w-40 z-10 bg-gradient-to-l from-cream-50 to-transparent pointer-events-none" />

                {/* Infinite Loop Track */}
                <div className="flex w-fit">
                    <motion.div
                        className="flex items-center gap-12 md:gap-20 px-6"
                        animate={{
                            x: ['0%', '-50%'],
                        }}
                        transition={{
                            duration: 30, // Adjust speed here
                            ease: 'linear',
                            repeat: Infinity,
                        }}
                    >
                        {brandList.map((brand, index) => (
                            <Link
                                key={`${brand.id}-${index}`}
                                href={`/shop?brand=${brand.slug}`}
                                className="group relative flex-shrink-0 w-32 md:w-40 aspect-[3/2] flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300 hover:scale-110"
                            >
                                <div className="relative w-full h-full opacity-60 group-hover:opacity-100 transition-opacity">
                                    <Image
                                        src={brand.logo}
                                        alt={brand.name}
                                        fill
                                        sizes="160px"
                                        className="object-contain"
                                    />
                                </div>
                            </Link>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default BrandShowcase;
