'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll } from 'framer-motion';
import Image from 'next/image';
import Header from '@/components/sections/Header';
import Footer from '@/components/sections/Footer';
import VariantSelector from '@/components/ui/VariantSelector';
import ProductTabs from '@/components/ui/ProductTabs';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import RelatedProducts from '@/components/ui/RelatedProducts';
import ProductReviewsSystem from '@/components/ui/ProductReviewsSystem';
import Button from '@/components/ui/Button';
import { formatPrice } from '@/lib/data';
import { Product } from '@/types';

// Mock data
const mockImages = [
    'https://images.unsplash.com/photo-1617897903246-719242758050?w=800&q=80',
    'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&q=80',
    'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=800&q=80',
    'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&q=80',
    'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800&q=80',
];

const colorOptions = [
    { id: 'rose', name: 'Hồng nhạt', value: '#FDA4AF', inStock: true },
    { id: 'coral', name: 'San hô', value: '#FB7185', inStock: true },
    { id: 'nude', name: 'Nude', value: '#E8C4B8', inStock: true },
    { id: 'berry', name: 'Berry', value: '#BE185D', inStock: false },
];

const sizeOptions = [
    { id: 'sm', name: '30ml', inStock: true },
    { id: 'md', name: '50ml', inStock: true },
    { id: 'lg', name: '100ml', inStock: true },
];

const specs = [
    { label: 'Xuất xứ', value: 'Hàn Quốc' },
    { label: 'Dung tích', value: '50ml' },
    { label: 'Hạn sử dụng', value: '36 tháng' },
    { label: 'Loại da', value: 'Mọi loại da' },
    { label: 'Độ tuổi', value: 'Từ 18 tuổi' },
    { label: 'Thành phần chính', value: 'Hyaluronic Acid, Vitamin C, Niacinamide' },
];

interface ProductDetailClientProps {
    product: Product;
    relatedProducts: Product[];
}

export default function ProductDetailClient({ product, relatedProducts }: ProductDetailClientProps) {
    const [selectedImage, setSelectedImage] = useState(0);
    const [selectedColor, setSelectedColor] = useState(colorOptions[0].id);
    const [selectedSize, setSelectedSize] = useState(sizeOptions[1].id);
    const [quantity, setQuantity] = useState(1);
    const [isZoomed, setIsZoomed] = useState(false);
    const [showStickyBar, setShowStickyBar] = useState(false);
    const [isAddingToCart, setIsAddingToCart] = useState(false);

    const buyButtonRef = useRef<HTMLDivElement>(null);
    const { scrollY } = useScroll();

    useEffect(() => {
        const unsubscribe = scrollY.on('change', (_y) => {
            if (buyButtonRef.current) {
                const rect = buyButtonRef.current.getBoundingClientRect();
                setShowStickyBar(rect.bottom < 0);
            }
        });
        return () => unsubscribe();
    }, [scrollY]);

    const handleAddToCart = () => {
        setIsAddingToCart(true);
        setTimeout(() => {
            console.log('Added to cart:', { product: product.name, color: selectedColor, size: selectedSize, quantity });
            setIsAddingToCart(false);
        }, 1000);
    };

    const categoryNames: Record<string, string> = {
        skincare: 'Chăm sóc da',
        makeup: 'Trang điểm',
        'body-care': 'Chăm sóc cơ thể',
        fragrances: 'Nước hoa',
    };

    // Hasaki-style Tabs
    const productTabs = [
        {
            id: 'description',
            label: 'Mô tả sản phẩm',
            content: (
                <div className="prose prose-sm max-w-none text-text-secondary leading-relaxed">
                    <p className="mb-4">
                        {product.description || 'Sản phẩm cao cấp được chiết xuất từ thiên nhiên, phù hợp với mọi loại da. Giúp da mềm mịn, rạng rỡ và tràn đầy sức sống sau mỗi lần sử dụng.'}
                    </p>
                    <h4 className="text-text-primary font-medium mt-6 mb-3">Công dụng chính:</h4>
                    <ul className="space-y-2 list-none pl-0">
                        {['Dưỡng ẩm sâu, giúp da mềm mịn', 'Làm sáng da, đều màu da', 'Chống lão hóa, giảm nếp nhăn', 'Cấp nước tức thì, khóa ẩm 72h'].map((item) => (
                            <li key={item} className="flex items-center gap-2">
                                <span className="w-5 h-5 rounded-full bg-mint-100 flex items-center justify-center text-xs text-emerald-600">✓</span>
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>
            ),
        },
        {
            id: 'ingredients',
            label: 'Thành phần',
            content: (
                <div className="text-text-secondary">
                    <p className="mb-4">Thành phần chính được chọn lọc kỹ lưỡng từ thiên nhiên:</p>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {[
                            { icon: '🌹', name: 'Chiết xuất Hoa hồng Bulgaria' },
                            { icon: '🍊', name: 'Vitamin C nguyên chất 15%' },
                            { icon: '💧', name: 'Hyaluronic Acid phân tử thấp' },
                            { icon: '✨', name: 'Niacinamide 10%' },
                            { icon: '🌿', name: 'Centella Asiatica' },
                            { icon: '🍃', name: 'Trà xanh hữu cơ' },
                        ].map((ing) => (
                            <div key={ing.name} className="flex items-center gap-3 p-3 bg-cream-50 rounded-xl">
                                <span className="text-2xl">{ing.icon}</span>
                                <span className="text-sm">{ing.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            ),
        },
        {
            id: 'specs',
            label: 'Thông số',
            content: (
                <div className="overflow-hidden rounded-2xl border border-cream-200">
                    <table className="w-full">
                        <tbody>
                            {specs.map((spec, index) => (
                                <tr key={spec.label} className={index % 2 === 0 ? 'bg-cream-50/50' : 'bg-white'}>
                                    <td className="px-5 py-4 text-sm font-medium text-text-primary w-1/3">{spec.label}</td>
                                    <td className="px-5 py-4 text-sm text-text-secondary">{spec.value}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ),
        },
        {
            id: 'reviews',
            label: `Đánh giá (${product.reviews || 30})`,
            content: <ProductReviewsSystem productRating={product.rating || 4.5} totalReviews={product.reviews || 30} />,
        },
    ];

    return (
        <>
            <Header />

            <motion.main
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="min-h-screen bg-white pt-24"
            >
                {/* Breadcrumbs */}
                <div className="container mx-auto px-4 lg:px-8 py-4">
                    <Breadcrumbs
                        items={[
                            { label: 'Trang chủ', href: '/' },
                            { label: categoryNames[product.category] || 'Mỹ phẩm', href: '/shop' },
                            { label: product.name },
                        ]}
                    />
                </div>

                {/* Product Hero - 2 Column Hasaki-style */}
                <section className="pb-12 lg:pb-16">
                    <div className="container mx-auto px-4 lg:px-8">
                        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">
                            {/* Left - Gallery */}
                            <div className="space-y-4">
                                {/* Main Image */}
                                <motion.div
                                    className="relative aspect-square rounded-3xl overflow-hidden bg-gradient-to-br from-cream-50 to-lavender-50 cursor-zoom-in"
                                    onClick={() => setIsZoomed(true)}
                                    whileHover={{ scale: 1.01 }}
                                >
                                    <AnimatePresence mode="wait">
                                        <motion.div
                                            key={selectedImage}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            transition={{ duration: 0.3 }}
                                            className="absolute inset-0"
                                        >
                                            <Image
                                                src={mockImages[selectedImage]}
                                                alt={product.name}
                                                fill
                                                sizes="(max-width: 1024px) 100vw, 50vw"
                                                className="object-cover"
                                                priority
                                            />
                                        </motion.div>
                                    </AnimatePresence>

                                    {/* Zoom indicator */}
                                    <div className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-soft">
                                        <svg className="w-5 h-5 text-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                                        </svg>
                                    </div>

                                    {/* Navigation arrows */}
                                    <button
                                        onClick={(e) => { e.stopPropagation(); setSelectedImage(prev => prev === 0 ? mockImages.length - 1 : prev - 1); }}
                                        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-soft hover:bg-white transition-colors"
                                    >
                                        <svg className="w-5 h-5 text-text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
                                        </svg>
                                    </button>
                                    <button
                                        onClick={(e) => { e.stopPropagation(); setSelectedImage(prev => prev === mockImages.length - 1 ? 0 : prev + 1); }}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-soft hover:bg-white transition-colors"
                                    >
                                        <svg className="w-5 h-5 text-text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </button>
                                </motion.div>

                                {/* Thumbnails - Horizontal */}
                                <div className="flex gap-3 overflow-x-auto pb-2">
                                    {mockImages.map((img, index) => (
                                        <motion.button
                                            key={index}
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={() => setSelectedImage(index)}
                                            className={`relative flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden transition-all ${selectedImage === index ? 'ring-2 ring-primary-400 ring-offset-2' : 'opacity-60 hover:opacity-100'
                                                }`}
                                        >
                                            <Image src={img} alt={`Thumbnail ${index + 1}`} fill sizes="80px" className="object-cover" />
                                        </motion.button>
                                    ))}
                                </div>
                            </div>

                            {/* Right - Product Info */}
                            <div className="lg:py-4 space-y-6">
                                {/* Brand */}
                                <p className="text-sm text-text-muted uppercase tracking-widest">{product.brand || 'Bella Beauty'}</p>

                                {/* Title */}
                                <h1 className="font-serif text-3xl lg:text-4xl font-medium text-text-primary leading-tight">
                                    {product.name}
                                </h1>

                                {/* Rating */}
                                {product.rating && (
                                    <div className="flex items-center gap-3">
                                        <div className="flex gap-0.5">
                                            {[...Array(5)].map((_, i) => (
                                                <svg key={i} className={`w-5 h-5 ${i < Math.floor(product.rating!) ? 'text-amber-400' : 'text-gray-200'}`} fill="currentColor" viewBox="0 0 20 20">
                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                </svg>
                                            ))}
                                        </div>
                                        <span className="font-medium text-text-primary">{product.rating}</span>
                                        <span className="text-text-muted">• {product.reviews} đánh giá</span>
                                        <span className="text-primary-400 text-sm cursor-pointer hover:underline">Viết đánh giá</span>
                                    </div>
                                )}

                                {/* Price */}
                                <div className="flex items-baseline gap-4">
                                    <span className="text-3xl font-bold text-primary-400">{formatPrice(product.price)}</span>
                                    {product.originalPrice && (
                                        <>
                                            <span className="text-xl text-text-muted line-through">{formatPrice(product.originalPrice)}</span>
                                            <span className="px-3 py-1 bg-emerald-50 text-emerald-600 text-sm font-semibold rounded-full">
                                                -{Math.round((1 - product.price / product.originalPrice) * 100)}%
                                            </span>
                                        </>
                                    )}
                                </div>

                                {/* Promotion Box */}
                                <div className="p-4 bg-gradient-to-r from-primary-50 to-lavender-50 rounded-2xl border border-primary-100">
                                    <div className="flex items-center gap-3">
                                        <span className="text-2xl">🎁</span>
                                        <div>
                                            <p className="font-medium text-text-primary">Ưu đãi đặc biệt</p>
                                            <p className="text-sm text-text-secondary">Tặng túi mỹ phẩm cao cấp khi mua từ 500K</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Variants */}
                                <div className="space-y-5 pt-2">
                                    <VariantSelector
                                        label="Màu sắc"
                                        options={colorOptions}
                                        selectedId={selectedColor}
                                        onChange={setSelectedColor}
                                        type="color"
                                    />
                                    <VariantSelector
                                        label="Dung tích"
                                        options={sizeOptions}
                                        selectedId={selectedSize}
                                        onChange={setSelectedSize}
                                        type="size"
                                    />
                                </div>

                                {/* Quantity */}
                                <div>
                                    <label className="block text-sm font-medium text-text-primary mb-3">Số lượng</label>
                                    <div className="flex items-center gap-3">
                                        <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-12 h-12 rounded-xl bg-cream-100 flex items-center justify-center hover:bg-cream-200 transition-colors">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" /></svg>
                                        </button>
                                        <span className="w-16 text-center text-xl font-medium">{quantity}</span>
                                        <button onClick={() => setQuantity(quantity + 1)} className="w-12 h-12 rounded-xl bg-cream-100 flex items-center justify-center hover:bg-cream-200 transition-colors">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                                        </button>
                                    </div>
                                </div>

                                {/* Buy Buttons */}
                                <div ref={buyButtonRef} className="flex gap-4 pt-4">
                                    <Button onClick={handleAddToCart} isLoading={isAddingToCart} variant="outline" className="flex-1" size="lg">
                                        Thêm vào giỏ
                                    </Button>
                                    <Button onClick={handleAddToCart} className="flex-1" size="lg">
                                        Mua ngay
                                    </Button>
                                </div>

                                {/* Trust Badges */}
                                <div className="grid grid-cols-3 gap-4 pt-4">
                                    {[
                                        { icon: '🚚', label: 'Freeship 500K+' },
                                        { icon: '↩️', label: 'Đổi trả 30 ngày' },
                                        { icon: '🛡️', label: 'Chính hãng 100%' },
                                    ].map((badge) => (
                                        <div key={badge.label} className="text-center p-3 bg-cream-50 rounded-xl">
                                            <span className="text-xl block mb-1">{badge.icon}</span>
                                            <span className="text-xs text-text-secondary">{badge.label}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Product Tabs - Full Width */}
                <section className="py-12 lg:py-16 bg-cream-50/50">
                    <div className="container mx-auto px-4 lg:px-8">
                        <ProductTabs tabs={productTabs} />
                    </div>
                </section>

                {/* Related Products */}
                <RelatedProducts products={relatedProducts} />
            </motion.main>

            <Footer />

            {/* Zoom Modal */}
            <AnimatePresence>
                {isZoomed && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsZoomed(false)}
                        className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
                    >
                        <motion.button
                            whileHover={{ scale: 1.1, rotate: 90 }}
                            onClick={() => setIsZoomed(false)}
                            className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </motion.button>
                        <motion.div
                            initial={{ scale: 0.9 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.9 }}
                            className="relative w-full max-w-4xl aspect-square"
                        >
                            <Image src={mockImages[selectedImage]} alt={product.name} fill className="object-contain" />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Sticky Buy Bar */}
            <AnimatePresence>
                {showStickyBar && (
                    <>
                        {/* Desktop - Top Bar */}
                        <motion.div
                            initial={{ y: -100, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -100, opacity: 0 }}
                            className="fixed top-0 left-0 right-0 z-40 hidden lg:block bg-white/95 backdrop-blur-xl border-b border-cream-200 shadow-soft"
                        >
                            <div className="container mx-auto px-8 py-3 flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-xl overflow-hidden relative">
                                        <Image src={mockImages[0]} alt={product.name} fill className="object-cover" />
                                    </div>
                                    <div>
                                        <p className="font-medium text-text-primary line-clamp-1">{product.name}</p>
                                        <p className="text-sm text-primary-400 font-semibold">{formatPrice(product.price)}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Button onClick={handleAddToCart} variant="outline" size="sm">Thêm vào giỏ</Button>
                                    <Button onClick={handleAddToCart} size="sm">Mua ngay</Button>
                                </div>
                            </div>
                        </motion.div>

                        {/* Mobile - Bottom Bar */}
                        <motion.div
                            initial={{ y: 100, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: 100, opacity: 0 }}
                            className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-white/95 backdrop-blur-xl border-t border-cream-200 p-4 safe-area-bottom"
                        >
                            <div className="flex items-center gap-4">
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm text-text-muted line-clamp-1">{product.name}</p>
                                    <p className="font-bold text-primary-400">{formatPrice(product.price)}</p>
                                </div>
                                <Button onClick={handleAddToCart} isLoading={isAddingToCart} size="md">Mua ngay</Button>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            {/* Spacer for sticky bar on mobile */}
            <div className="h-24 lg:hidden" />
        </>
    );
}
