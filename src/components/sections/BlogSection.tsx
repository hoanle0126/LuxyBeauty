'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

interface BlogPost {
    id: string;
    slug: string;
    title: string;
    excerpt: string;
    category: string;
    image: string;
    author: string;
    date: string;
    readTime: string;
}

const blogPosts: BlogPost[] = [
    {
        id: '1',
        slug: 'bi-quyet-da-khoe-mua-dong',
        title: 'Bí quyết giữ da khỏe mạnh trong mùa đông',
        excerpt: 'Khám phá những bước chăm sóc da thiết yếu để duy trì làn da căng mọng và rạng rỡ trong thời tiết khắc nghiệt.',
        category: 'Skincare',
        image: 'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=600&q=80',
        author: 'Linh Nguyễn',
        date: '15 Th1 2026',
        readTime: '5 phút đọc',
    },
    {
        id: '2',
        slug: 'xu-huong-makeup-2026',
        title: 'Xu hướng makeup nổi bật năm 2026',
        excerpt: 'Từ glass skin đến soft glam, đây là những xu hướng làm đẹp sẽ thống trị năm mới.',
        category: 'Makeup',
        image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=600&q=80',
        author: 'Mai Anh',
        date: '12 Th1 2026',
        readTime: '4 phút đọc',
    },
    {
        id: '3',
        slug: 'cham-soc-toc-tu-thien-nhien',
        title: 'Chăm sóc tóc với nguyên liệu từ thiên nhiên',
        excerpt: 'Những công thức đơn giản tại nhà giúp mái tóc suôn mượt, óng ả như đi spa.',
        category: 'Haircare',
        image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&q=80',
        author: 'Thu Trang',
        date: '10 Th1 2026',
        readTime: '6 phút đọc',
    },
];

const BlogSection = () => {
    return (
        <section className="py-20 lg:py-28 bg-gradient-to-b from-white to-cream-50">
            <div className="container mx-auto px-4 lg:px-8">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-14"
                >
                    <span className="inline-block px-4 py-2 bg-lavender-100/50 rounded-full text-lavender-600 text-sm font-medium tracking-wide mb-4">
                        ✦ The Beauty Journal ✦
                    </span>
                    <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-medium text-text-primary mb-4">
                        Câu chuyện làm đẹp
                    </h2>
                    <p className="text-text-secondary max-w-xl mx-auto">
                        Khám phá những bí quyết, xu hướng và nguồn cảm hứng làm đẹp mới nhất
                    </p>
                </motion.div>

                {/* Blog Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                    {blogPosts.map((post, index) => (
                        <motion.article
                            key={post.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="group"
                        >
                            <Link href={`/magazine/${post.slug}`} className="block">
                                {/* Image */}
                                <div className="relative aspect-[4/5] rounded-3xl overflow-hidden mb-5 bg-cream-100">
                                    <motion.div
                                        whileHover={{ scale: 1.05 }}
                                        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
                                        className="w-full h-full"
                                    >
                                        <Image
                                            src={post.image}
                                            alt={post.title}
                                            fill
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                            className="object-cover"
                                        />
                                    </motion.div>

                                    {/* Category Badge */}
                                    <div className="absolute top-4 left-4">
                                        <span className="px-3 py-1.5 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium text-text-primary">
                                            {post.category}
                                        </span>
                                    </div>

                                    {/* Gradient Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                </div>

                                {/* Content */}
                                <div className="space-y-3">
                                    <h3 className="font-serif text-xl lg:text-2xl text-text-primary group-hover:text-primary-400 transition-colors duration-300 line-clamp-2">
                                        {post.title}
                                    </h3>
                                    <p className="text-text-secondary text-sm line-clamp-2 leading-relaxed">
                                        {post.excerpt}
                                    </p>
                                    <div className="flex items-center gap-3 text-xs text-text-muted">
                                        <span>{post.author}</span>
                                        <span>•</span>
                                        <span>{post.date}</span>
                                        <span>•</span>
                                        <span>{post.readTime}</span>
                                    </div>
                                </div>
                            </Link>
                        </motion.article>
                    ))}
                </div>

                {/* View All Button */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="text-center mt-14"
                >
                    <Link href="/magazine">
                        <motion.span
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="inline-flex items-center gap-2 text-sm font-medium text-text-primary group"
                        >
                            View All Stories
                            <motion.span
                                className="relative"
                                whileHover={{ x: 4 }}
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                                {/* Animated Underline */}
                                <motion.span
                                    className="absolute -bottom-1 left-0 h-px bg-text-primary"
                                    initial={{ width: 0 }}
                                    whileHover={{ width: '100%' }}
                                    transition={{ duration: 0.3 }}
                                />
                            </motion.span>
                        </motion.span>
                    </Link>
                </motion.div>
            </div>
        </section>
    );
};

export default BlogSection;
