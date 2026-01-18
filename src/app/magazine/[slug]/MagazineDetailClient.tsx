'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/sections/Header';
import Footer from '@/components/sections/Footer';
import RelatedProducts from '@/components/ui/RelatedProducts';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import { allProducts } from '@/lib/data';

// Mock article data
const articleData = {
    slug: 'bi-quyet-da-khoe-mua-dong',
    title: 'Bí quyết giữ da khỏe mạnh trong mùa đông',
    excerpt: 'Khám phá những bước chăm sóc da thiết yếu để duy trì làn da căng mọng và rạng rỡ trong thời tiết khắc nghiệt.',
    category: 'Skincare',
    image: 'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=1200&q=80',
    author: {
        name: 'Linh Nguyễn',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80',
        role: 'Beauty Editor',
    },
    date: '15 Tháng 1, 2026',
    readTime: '5 phút đọc',
    content: `
    <p class="lead">Mùa đông mang đến nhiều thử thách cho làn da của chúng ta. Không khí khô hanh, gió lạnh và sự thay đổi nhiệt độ đột ngột có thể làm da mất nước, khô ráp và thiếu sức sống.</p>

    <h2>1. Dưỡng ẩm chuyên sâu là chìa khóa</h2>
    <p>Trong mùa đông, làn da cần được cung cấp độ ẩm nhiều hơn bình thường. Hãy chuyển sang những sản phẩm dưỡng ẩm đậm đặc hơn, chứa các thành phần như Hyaluronic Acid, Ceramides và Squalane để khóa ẩm hiệu quả.</p>

    <blockquote>"Làn da khỏe mạnh bắt đầu từ việc dưỡng ẩm đúng cách. Đừng bao giờ bỏ qua bước này, đặc biệt trong mùa đông."</blockquote>

    <h2>2. Đừng quên chống nắng</h2>
    <p>Nhiều người lầm tưởng rằng mùa đông không cần chống nắng. Thực tế, tia UV vẫn hiện diện và có thể gây hại cho da ngay cả trong những ngày âm u. Hãy sử dụng kem chống nắng SPF 30-50 mỗi ngày.</p>

    <h2>3. Exfoliate nhẹ nhàng</h2>
    <p>Tẩy tế bào chết giúp loại bỏ lớp da khô sần và cho phép các sản phẩm dưỡng da thẩm thấu tốt hơn. Tuy nhiên, trong mùa đông, hãy giảm tần suất xuống 1-2 lần/tuần và chọn sản phẩm tẩy da chết dịu nhẹ.</p>

    <figure>
      <img src="https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800&q=80" alt="Skincare routine" />
      <figcaption>Một routine skincare đơn giản nhưng hiệu quả cho mùa đông</figcaption>
    </figure>

    <h2>4. Sử dụng máy tạo độ ẩm</h2>
    <p>Không khí trong phòng thường rất khô vào mùa đông do sử dụng máy sưởi. Máy tạo độ ẩm giúp duy trì độ ẩm không khí, từ đó bảo vệ làn da của bạn.</p>

    <h2>5. Uống đủ nước</h2>
    <p>Dưỡng ẩm từ bên trong cũng quan trọng không kém. Hãy đảm bảo uống ít nhất 2 lít nước mỗi ngày và bổ sung thêm trà thảo mộc ấm để giữ cơ thể luôn được cung cấp đủ nước.</p>
  `,
    relatedProductIds: ['1', '2', '3', '4'],
};

interface MagazineDetailClientProps {
    slug: string;
}

export default function MagazineDetailClient({ slug }: MagazineDetailClientProps) {
    const relatedProducts = allProducts.filter(p =>
        articleData.relatedProductIds.includes(p.id)
    );

    // Page entrance animation
    const pageVariants = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
    };

    return (
        <>
            <Header />

            <motion.main
                variants={pageVariants}
                initial="initial"
                animate="animate"
                transition={{ duration: 0.4 }}
                className="min-h-screen bg-white pt-24"
            >
                {/* Article Header */}
                <article>
                    <header className="py-12 lg:py-16">
                        <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
                            {/* Breadcrumbs */}
                            <Breadcrumbs
                                items={[
                                    { label: 'Trang chủ', href: '/' },
                                    { label: 'Magazine', href: '/magazine' },
                                    { label: articleData.title },
                                ]}
                            />

                            {/* Category */}
                            <motion.span
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="inline-block px-4 py-1.5 bg-lavender-100/50 rounded-full text-lavender-600 text-sm font-medium mb-6"
                            >
                                {articleData.category}
                            </motion.span>

                            {/* Title */}
                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.15 }}
                                className="font-serif text-3xl md:text-4xl lg:text-5xl font-medium text-text-primary mb-6 leading-tight"
                            >
                                {articleData.title}
                            </motion.h1>

                            {/* Excerpt */}
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="text-xl text-text-secondary mb-8 leading-relaxed"
                            >
                                {articleData.excerpt}
                            </motion.p>

                            {/* Author & Meta */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.25 }}
                                className="flex items-center gap-4"
                            >
                                <div className="w-12 h-12 rounded-full overflow-hidden">
                                    <Image
                                        src={articleData.author.avatar}
                                        alt={articleData.author.name}
                                        width={48}
                                        height={48}
                                        className="object-cover"
                                    />
                                </div>
                                <div>
                                    <p className="font-medium text-text-primary">{articleData.author.name}</p>
                                    <p className="text-sm text-text-muted">
                                        {articleData.date} • {articleData.readTime}
                                    </p>
                                </div>
                            </motion.div>
                        </div>
                    </header>

                    {/* Featured Image */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 }}
                        className="relative w-full aspect-[21/9] lg:aspect-[21/8] mb-12"
                    >
                        <Image
                            src={articleData.image}
                            alt={articleData.title}
                            fill
                            sizes="100vw"
                            className="object-cover"
                            priority
                        />
                    </motion.div>

                    {/* Article Content */}
                    <div className="container mx-auto px-4 lg:px-8 max-w-3xl">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="prose prose-lg max-w-none
                prose-headings:font-serif prose-headings:text-text-primary prose-headings:font-medium
                prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-6
                prose-p:text-text-secondary prose-p:leading-relaxed prose-p:mb-6
                prose-p.lead:text-xl prose-p.lead:text-text-primary prose-p.lead:font-medium
                prose-blockquote:border-l-4 prose-blockquote:border-primary-300 prose-blockquote:bg-cream-50 prose-blockquote:py-4 prose-blockquote:px-6 prose-blockquote:rounded-r-2xl prose-blockquote:italic prose-blockquote:text-text-primary
                prose-figure:my-10 prose-figure:rounded-2xl prose-figure:overflow-hidden
                prose-figcaption:text-center prose-figcaption:text-sm prose-figcaption:text-text-muted prose-figcaption:mt-4
                prose-img:rounded-2xl prose-img:w-full
              "
                            dangerouslySetInnerHTML={{ __html: articleData.content }}
                        />

                        {/* Share */}
                        <div className="flex items-center gap-4 mt-12 pt-8 border-t border-cream-200">
                            <span className="text-sm text-text-muted">Chia sẻ:</span>
                            <div className="flex gap-2">
                                {['facebook', 'twitter', 'linkedin'].map((social) => (
                                    <motion.button
                                        key={social}
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="w-10 h-10 rounded-full bg-cream-100 flex items-center justify-center hover:bg-cream-200 transition-colors"
                                    >
                                        <span className="text-text-secondary capitalize text-xs">{social[0].toUpperCase()}</span>
                                    </motion.button>
                                ))}
                            </div>
                        </div>
                    </div>
                </article>

                {/* Shop This Article */}
                <section className="py-16 lg:py-24 bg-cream-50 mt-16">
                    <div className="container mx-auto px-4 lg:px-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-center mb-10"
                        >
                            <span className="inline-block px-4 py-2 bg-white rounded-full text-text-muted text-sm font-medium mb-4">
                                ✦ Shop This Article ✦
                            </span>
                            <h2 className="font-serif text-2xl md:text-3xl font-medium text-text-primary">
                                Sản phẩm được đề cập
                            </h2>
                        </motion.div>
                    </div>

                    <RelatedProducts products={relatedProducts} title="" />
                </section>

                {/* More Articles */}
                <section className="py-16 lg:py-24">
                    <div className="container mx-auto px-4 lg:px-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-center mb-10"
                        >
                            <h2 className="font-serif text-2xl md:text-3xl font-medium text-text-primary">
                                Bài viết liên quan
                            </h2>
                        </motion.div>

                        <div className="grid md:grid-cols-3 gap-6">
                            {[1, 2, 3].map((i) => (
                                <motion.article
                                    key={i}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className="group"
                                >
                                    <Link href="/magazine/xu-huong-makeup-2026">
                                        <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-4">
                                            <Image
                                                src={`https://images.unsplash.com/photo-151249601585${i}-a90fb38ba796?w=600&q=80`}
                                                alt="Related post"
                                                fill
                                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                                            />
                                        </div>
                                        <h3 className="font-serif text-lg text-text-primary group-hover:text-primary-400 transition-colors">
                                            Bài viết liên quan #{i}
                                        </h3>
                                    </Link>
                                </motion.article>
                            ))}
                        </div>
                    </div>
                </section>
            </motion.main>

            <Footer />
        </>
    );
}
