import { Metadata } from 'next';
import { allProducts } from '@/lib/data';
import ProductDetailClient from './ProductDetailClient';

// Generate static params for all products
export async function generateStaticParams() {
    return allProducts.map((product) => ({
        slug: product.id,
    }));
}

// Generate dynamic metadata for SEO
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
    const product = allProducts.find(p => p.id === params.slug) || allProducts[0];

    const categoryNames: Record<string, string> = {
        skincare: 'Chăm sóc da',
        makeup: 'Trang điểm',
        'body-care': 'Chăm sóc cơ thể',
        fragrances: 'Nước hoa',
    };

    return {
        title: `${product.name} | Bella Beauty`,
        description: product.description || `${product.name} - Sản phẩm ${categoryNames[product.category] || 'mỹ phẩm'} cao cấp từ Bella Beauty. Chiết xuất thiên nhiên, an toàn và hiệu quả.`,
        keywords: [product.name, categoryNames[product.category] || 'mỹ phẩm', 'Bella Beauty', 'mỹ phẩm cao cấp'],
        openGraph: {
            title: `${product.name} | Bella Beauty`,
            description: product.description || `Khám phá ${product.name} - Sản phẩm chăm sóc da cao cấp từ Bella Beauty`,
            images: [{ url: product.image, width: 800, height: 800, alt: product.name }],
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title: `${product.name} | Bella Beauty`,
            description: product.description || `Khám phá ${product.name} tại Bella Beauty`,
            images: [product.image],
        },
    };
}

export default function ProductPage({ params }: { params: { slug: string } }) {
    const product = allProducts.find(p => p.id === params.slug) || allProducts[0];
    const relatedProducts = allProducts
        .filter(p => p.category === product.category && p.id !== product.id)
        .slice(0, 8);

    return <ProductDetailClient product={product} relatedProducts={relatedProducts} />;
}
