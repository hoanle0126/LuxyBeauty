'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Header from '@/components/sections/Header';
import Footer from '@/components/sections/Footer';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import { allBrands } from '@/lib/data';
import { Brand } from '@/types';

export default function BrandsPage() {
    // Group brands by letter
    const brandsByLetter = useMemo(() => {
        const sorted = [...allBrands].sort((a, b) => a.name.localeCompare(b.name));
        return sorted.reduce((acc, brand) => {
            const letter = brand.name.charAt(0).toUpperCase();
            if (!acc[letter]) acc[letter] = [];
            acc[letter].push(brand);
            return acc;
        }, {} as Record<string, Brand[]>);
    }, []);

    const letters = Object.keys(brandsByLetter).sort();

    return (
        <>
            <Header />
            <main className="min-h-screen bg-white pt-32 pb-20">
                <div className="container mx-auto px-4 lg:px-8">
                    {/* Header Section */}
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <Breadcrumbs items={[{ label: 'Trang chủ', href: '/' }, { label: 'Thương hiệu' }]} />
                        <h1 className="font-serif text-4xl md:text-5xl font-medium text-text-primary mb-4 mt-6">
                            Thương hiệu đối tác
                        </h1>
                        <p className="text-text-secondary text-lg">
                            Khám phá danh mục các thương hiệu làm đẹp hàng đầu thế giới được Bella Beauty tuyển chọn kỹ lưỡng.
                        </p>
                    </div>

                    {/* Alphabet Navigation - Sticky */}
                    <div className="sticky top-28 md:top-32 z-30 bg-white/95 backdrop-blur-sm py-4 border-b border-gray-100 mb-12 overflow-x-auto no-scrollbar">
                        <div className="flex items-center justify-center min-w-max gap-2 md:gap-4 px-4">
                            {letters.map((letter) => (
                                <Link
                                    key={letter}
                                    href={`#letter-${letter}`}
                                    className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-full text-text-secondary hover:bg-primary-50 hover:text-primary-500 font-medium transition-colors"
                                >
                                    {letter}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Brands List */}
                    <div className="space-y-16">
                        {letters.map((letter, _index) => (
                            <motion.div
                                key={letter}
                                id={`letter-${letter}`}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.5 }}
                                className="scroll-mt-48"
                            >
                                <div className="flex items-center gap-4 mb-8">
                                    <span className="text-4xl font-serif text-primary-200 font-bold">{letter}</span>
                                    <div className="h-px bg-gray-100 flex-1" />
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                    {brandsByLetter[letter].map((brand) => (
                                        <Link
                                            key={brand.id}
                                            href={`/shop?brand=${brand.slug}`}
                                            className="group block bg-white border border-gray-100 rounded-2xl p-6 hover:shadow-soft-xl hover:-translate-y-1 transition-all duration-300"
                                        >
                                            <div className="flex items-start justify-between mb-6">
                                                <div className="relative w-24 h-16 grayscale group-hover:grayscale-0 transition-all duration-300">
                                                    <Image
                                                        src={brand.logo}
                                                        alt={brand.name}
                                                        fill
                                                        className="object-contain object-left"
                                                    />
                                                </div>
                                                <span className="px-2.5 py-1 bg-cream-50 text-text-secondary text-xs rounded-full group-hover:bg-primary-50 group-hover:text-primary-600 transition-colors">
                                                    {brand.productCount} SP
                                                </span>
                                            </div>

                                            <h3 className="font-serif text-xl text-text-primary mb-2 group-hover:text-primary-500 transition-colors">
                                                {brand.name}
                                            </h3>
                                            <p className="text-sm text-text-muted line-clamp-2 leading-relaxed">
                                                {brand.description}
                                            </p>
                                        </Link>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
