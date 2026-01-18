'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/sections/Header';
import Footer from '@/components/sections/Footer';
import AnimatedSection from '@/components/ui/AnimatedSection';

// Mock data for magazine posts
const magazinePosts = [
    {
        id: '1',
        slug: 'bi-quyet-da-khoe-mua-dong',
        title: 'Bí quyết giữ da khỏe mạnh trong mùa đông',
        excerpt: 'Khám phá những bước chăm sóc da thiết yếu để duy trì làn da căng mọng và rạng rỡ trong thời tiết khắc nghiệt.',
        category: 'Skincare',
        image: 'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=800&q=80',
        author: 'Linh Nguyễn',
        date: '15 Th1 2026',
        readTime: '5 phút',
        featured: true,
    },
    {
        id: '2',
        slug: 'xu-huong-makeup-2026',
        title: 'Xu hướng makeup nổi bật năm 2026',
        excerpt: 'Từ glass skin đến soft glam, đây là những xu hướng làm đẹp sẽ thống trị năm mới.',
        category: 'Makeup',
        image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=800&q=80',
        author: 'Mai Anh',
        date: '12 Th1 2026',
        readTime: '4 phút',
        featured: false,
    },
    {
        id: '3',
        slug: 'cham-soc-toc-tu-thien-nhien',
        title: 'Chăm sóc tóc với nguyên liệu từ thiên nhiên',
        excerpt: 'Những công thức đơn giản tại nhà giúp mái tóc suôn mượt, óng ả như đi spa.',
        category: 'Haircare',
        image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&q=80',
        author: 'Thu Trang',
        date: '10 Th1 2026',
        readTime: '6 phút',
        featured: false,
    },
    {
        id: '4',
        slug: 'huong-dan-chon-nuoc-hoa',
        title: 'Hướng dẫn chọn nước hoa phù hợp với cá tính',
        excerpt: 'Mùi hương nói lên rất nhiều về bạn. Cùng tìm hiểu cách chọn nước hoa phù hợp nhất.',
        category: 'Fragrance',
        image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=800&q=80',
        author: 'Hạnh Lê',
        date: '8 Th1 2026',
        readTime: '7 phút',
        featured: true,
    },
    {
        id: '5',
        slug: 'routine-skincare-sang-toi',
        title: 'Routine skincare sáng và tối hoàn hảo',
        excerpt: 'Xây dựng quy trình chăm sóc da khoa học và hiệu quả cho mọi loại da.',
        category: 'Skincare',
        image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800&q=80',
        author: 'Minh Châu',
        date: '5 Th1 2026',
        readTime: '8 phút',
        featured: false,
    },
    {
        id: '6',
        slug: 'lam-dep-tu-ben-trong',
        title: 'Làm đẹp từ bên trong: Thực phẩm tốt cho da',
        excerpt: 'Những thực phẩm giúp da sáng khỏe từ bên trong mà bạn nên bổ sung mỗi ngày.',
        category: 'Wellness',
        image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&q=80',
        author: 'Ngọc Anh',
        date: '2 Th1 2026',
        readTime: '5 phút',
        featured: false,
    },
];

const categories = ['Tất cả', 'Skincare', 'Makeup', 'Haircare', 'Fragrance', 'Wellness'];

export default function MagazineClient() {
    return (
        <>
            <Header />

            <main className="min-h-screen bg-white pt-24">
                {/* Hero */}
                <section className="relative py-16 lg:py-24 overflow-hidden">
                    <div className="absolute inset-0 pointer-events-none">
                        <div className="absolute top-0 right-1/4 w-96 h-96 bg-lavender-100/40 rounded-full blur-[120px]" />
                        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-primary-100/40 rounded-full blur-[120px]" />
                    </div>

                    <div className="container mx-auto px-4 lg:px-8 relative z-10">
                        <AnimatedSection className="text-center max-w-3xl mx-auto">
                            <span className="inline-block px-4 py-2 bg-lavender-100/50 rounded-full text-lavender-600 text-sm font-medium tracking-wide mb-6">
                                ✦ The Beauty Journal ✦
                            </span>
                            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium text-text-primary mb-6">
                                Magazine
                            </h1>
                            <p className="text-lg text-text-secondary max-w-xl mx-auto">
                                Câu chuyện, bí quyết và nguồn cảm hứng làm đẹp dành riêng cho bạn
                            </p>
                        </AnimatedSection>

                        {/* Categories */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="flex flex-wrap justify-center gap-3 mt-10"
                        >
                            {categories.map((cat, index) => (
                                <motion.button
                                    key={cat}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${index === 0
                                            ? 'bg-text-primary text-white'
                                            : 'bg-cream-100 text-text-secondary hover:bg-cream-200'
                                        }`}
                                >
                                    {cat}
                                </motion.button>
                            ))}
                        </motion.div>
                    </div>
                </section>

                {/* Bento Grid Layout */}
                <section className="pb-24">
                    <div className="container mx-auto px-4 lg:px-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-min">
                            {magazinePosts.map((post, index) => (
                                <motion.article
                                    key={post.id}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className={`group ${post.featured ? 'md:col-span-2 lg:row-span-2' : ''
                                        }`}
                                >
                                    <Link href={`/magazine/${post.slug}`} className="block h-full">
                                        <div className={`relative rounded-3xl overflow-hidden bg-cream-100 h-full ${post.featured ? 'aspect-[4/3] lg:aspect-auto lg:min-h-[500px]' : 'aspect-[3/4]'
                                            }`}>
                                            {/* Image */}
                                            <motion.div
                                                whileHover={{ scale: 1.05 }}
                                                transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
                                                className="absolute inset-0"
                                            >
                                                <Image
                                                    src={post.image}
                                                    alt={post.title}
                                                    fill
                                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                                    className="object-cover"
                                                />
                                            </motion.div>

                                            {/* Gradient Overlay */}
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                                            {/* Content */}
                                            <div className="absolute inset-0 p-6 lg:p-8 flex flex-col justify-end">
                                                {/* Category */}
                                                <span className="inline-block self-start px-3 py-1.5 mb-4 bg-white/20 backdrop-blur-sm rounded-full text-xs font-medium text-white uppercase tracking-wide">
                                                    {post.category}
                                                </span>

                                                <h2 className={`font-serif text-white mb-3 line-clamp-2 ${post.featured ? 'text-2xl lg:text-4xl' : 'text-xl lg:text-2xl'
                                                    }`}>
                                                    {post.title}
                                                </h2>

                                                {post.featured && (
                                                    <p className="text-white/80 text-sm lg:text-base mb-4 line-clamp-2 hidden lg:block">
                                                        {post.excerpt}
                                                    </p>
                                                )}

                                                <div className="flex items-center gap-3 text-xs text-white/70">
                                                    <span>{post.author}</span>
                                                    <span>•</span>
                                                    <span>{post.date}</span>
                                                    <span>•</span>
                                                    <span>{post.readTime}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </motion.article>
                            ))}
                        </div>

                        {/* Load More */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            className="text-center mt-12"
                        >
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="px-8 py-4 border-2 border-cream-200 hover:border-primary-200 rounded-2xl text-text-primary font-medium transition-colors"
                            >
                                Xem thêm bài viết
                            </motion.button>
                        </motion.div>
                    </div>
                </section>
            </main>

            <Footer />
        </>
    );
}
