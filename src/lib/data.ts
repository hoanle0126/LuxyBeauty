import { Product, Category, NavItem, BrandInfo, SocialLink, Brand } from '@/types';

// Updated Navigation items (2 levels)
export const navItems: NavItem[] = [
    { label: 'Trang chủ', href: '/' },
    { label: 'Cửa hàng', href: '/shop' },
    {
        label: 'Danh mục',
        href: '/categories',
        children: [
            { label: 'Chăm sóc da', href: '/categories/skincare' },
            { label: 'Trang điểm', href: '/categories/makeup' },
            { label: 'Chăm sóc cơ thể', href: '/categories/body-care' },
            { label: 'Nước hoa', href: '/categories/fragrances' },
        ]
    },
    {
        label: 'Thương hiệu',
        href: '/brands',
        badge: 'New'
    },
    { label: 'Magazine', href: '/magazine' },
    { label: 'Liên hệ', href: '/contact' },
];

// Categories
export const categories: Category[] = [
    {
        id: '1',
        name: 'Chăm sóc da',
        description: 'Serum, kem dưỡng và mặt nạ cao cấp',
        image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&q=80',
        slug: 'skincare',
        productCount: 48,
    },
    {
        id: '2',
        name: 'Trang điểm',
        description: 'Son môi, phấn và sản phẩm trang điểm',
        image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&q=80',
        slug: 'makeup',
        productCount: 36,
    },
    {
        id: '3',
        name: 'Chăm sóc cơ thể',
        description: 'Sữa tắm, dưỡng thể và scrub',
        image: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=600&q=80',
        slug: 'body-care',
        productCount: 24,
    },
    {
        id: '4',
        name: 'Nước hoa',
        description: 'Hương thơm quyến rũ và tinh tế',
        image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=600&q=80',
        slug: 'fragrances',
        productCount: 18,
    },
];

// Detailed Brands Data
export const allBrands: Brand[] = [
    {
        id: '1',
        name: 'Laneige',
        slug: 'laneige',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Laneige_logo.svg/2560px-Laneige_logo.svg.png',
        description: 'Thương hiệu mỹ phẩm Hàn Quốc nổi tiếng với công nghệ Water Science độc quyền.',
        productCount: 24,
        letter: 'L',
        featured: true
    },
    {
        id: '2',
        name: 'Shiseido',
        slug: 'shiseido',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Shiseido_logo.svg/2560px-Shiseido_logo.svg.png',
        description: 'Biểu tượng của vẻ đẹp Nhật Bản, kết hợp giữa nghệ thuật và khoa học.',
        productCount: 18,
        letter: 'S',
        featured: true
    },
    {
        id: '3',
        name: 'Innisfree',
        slug: 'innisfree',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Innisfree_Logo.svg/1200px-Innisfree_Logo.svg.png',
        description: 'Vẻ đẹp tự nhiên từ hòn đảo Jeju trong lành.',
        productCount: 32,
        letter: 'I',
        featured: true
    },
    {
        id: '4',
        name: 'Estée Lauder',
        slug: 'estee-lauder',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Est%C3%A9e_Lauder_Companies_Logo.svg/2560px-Est%C3%A9e_Lauder_Companies_Logo.svg.png',
        description: 'Thương hiệu mỹ phẩm cao cấp hàng đầu thế giới.',
        productCount: 15,
        letter: 'E',
        featured: true
    },
    {
        id: '5',
        name: 'La Roche-Posay',
        slug: 'la-roche-posay',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/La_Roche-Posay_logo.svg/2560px-La_Roche-Posay_logo.svg.png',
        description: 'Dược mỹ phẩm hàng đầu được bác sĩ da liễu khuyên dùng.',
        productCount: 28,
        letter: 'L',
        featured: true
    },
    {
        id: '6',
        name: 'Vichy',
        slug: 'vichy',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Vichy_Logo.svg/2560px-Vichy_Logo.svg.png',
        description: 'Thương hiệu dược mỹ phẩm Pháp với nguồn nước khoáng núi lửa.',
        productCount: 20,
        letter: 'V'
    },
    {
        id: '7',
        name: 'Kiehl\'s',
        slug: 'kiehls',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Kiehl%27s_logo.svg/2560px-Kiehl%27s_logo.svg.png',
        description: 'Mỹ phẩm thiên nhiên cao cấp từ New York từ năm 1851.',
        productCount: 12,
        letter: 'K'
    },
    {
        id: '8',
        name: 'The Body Shop',
        slug: 'the-body-shop',
        logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/9/91/The_Body_Shop_logo.svg/1200px-The_Body_Shop_logo.svg.png',
        description: 'Làm đẹp đạo đức, lấy cảm hứng từ thiên nhiên.',
        productCount: 30,
        letter: 'T'
    },
    {
        id: '9',
        name: 'MAC',
        slug: 'mac',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/MAC_Cosmetics_logo.svg/2560px-MAC_Cosmetics_logo.svg.png',
        description: 'Thương hiệu trang điểm chuyên nghiệp hàng đầu thế giới.',
        productCount: 45,
        letter: 'M',
        featured: true
    },
    {
        id: '10',
        name: 'Maybelline',
        slug: 'maybelline',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Maybelline_Logo.svg/2560px-Maybelline_Logo.svg.png',
        description: 'Thương hiệu trang điểm số 1 thế giới.',
        productCount: 50,
        letter: 'M'
    },
    {
        id: '11',
        name: 'L\'Oréal Paris',
        slug: 'loreal-paris',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/L%27Or%C3%A9al_logo.svg/2560px-L%27Or%C3%A9al_logo.svg.png',
        description: 'Bởi vì bạn xứng đáng.',
        productCount: 60,
        letter: 'L'
    },
    {
        id: '12',
        name: 'Paula\'s Choice',
        slug: 'paulas-choice',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/7/74/Paula%27s_Choice_logo.png',
        description: 'Mỹ phẩm an toàn, hiệu quả dựa trên nghiên cứu khoa học.',
        productCount: 22,
        letter: 'P'
    }
];

export const brands = allBrands.map(b => ({ id: b.slug, name: b.name, count: b.productCount })); // Backward compatibility

// Product images from Unsplash
const productImages = [
    'https://images.unsplash.com/photo-1617897903246-719242758050?w=500&q=80',
    'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=500&q=80',
    'https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?w=500&q=80',
    'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=500&q=80',
    'https://images.unsplash.com/photo-1541643600914-78b084683601?w=500&q=80',
    'https://images.unsplash.com/photo-1631214524020-7e18db9a8f92?w=500&q=80',
    'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=500&q=80',
    'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=500&q=80',
    'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500&q=80',
    'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=500&q=80',
];

// Product names by category
const productNames = {
    skincare: [
        'Rose Petal Serum', 'Hydrating Night Cream', 'Vitamin C Brightening', 'Retinol Anti-Aging',
        'Hyaluronic Acid Serum', 'Niacinamide Pore Minimizer', 'Green Tea Cleanser', 'Collagen Boost Cream',
        'AHA/BHA Exfoliator', 'Peptide Eye Cream', 'Ceramide Moisturizer', 'Snail Mucin Essence',
        'Centella Calming Gel', 'Propolis Ampoule', 'Bakuchiol Serum', 'Squalane Oil',
    ],
    makeup: [
        'Velvet Matte Lipstick', 'Glow Foundation', 'Silky Powder Blush', 'Volume Mascara',
        'Precision Eyeliner', 'Brow Sculpting Gel', 'Hydrating Lip Gloss', 'Contour Palette',
        'Setting Spray', 'Concealer Wand', 'Bronzer Duo', 'Highlighter Drops',
        'Lip Liner Pencil', 'Eyeshadow Palette', 'Primer Serum', 'BB Cream',
    ],
    'body-care': [
        'Silk Body Lotion', 'Aromatic Body Scrub', 'Lavender Bath Soak', 'Coconut Body Oil',
        'Shea Butter Cream', 'Exfoliating Gloves', 'Jasmine Body Mist', 'Hand Repair Cream',
        'Foot Softening Balm', 'Cuticle Oil Pen', 'Body Firming Gel', 'Stretch Mark Oil',
    ],
    fragrances: [
        'Bloom Eau de Parfum', 'Rose Garden EDT', 'Ocean Breeze Mist', 'Vanilla Dreams',
        'Midnight Jasmine', 'Fresh Citrus Splash', 'Woody Amber', 'Floral Bouquet',
        'White Musk', 'Cherry Blossom', 'Sandalwood Essence', 'Peony Blush',
    ],
};

// Generate 60+ products
const generateProducts = (): Product[] => {
    const products: Product[] = [];
    const categoryList = ['skincare', 'makeup', 'body-care', 'fragrances'] as const;
    const badges: (Product['badge'] | undefined)[] = ['new', 'bestseller', 'sale', undefined, undefined, undefined];
    const brandIds = brands.map(b => b.id);

    let id = 1;

    categoryList.forEach((category) => {
        const names = productNames[category];
        names.forEach((name, index) => {
            const basePrice = Math.floor(Math.random() * 1500000) + 300000;
            const hasSale = Math.random() > 0.7;
            const originalPrice = hasSale ? basePrice + Math.floor(Math.random() * 500000) + 100000 : undefined;

            products.push({
                id: String(id++),
                name,
                price: basePrice,
                originalPrice,
                image: productImages[index % productImages.length],
                category,
                description: `Sản phẩm ${name.toLowerCase()} cao cấp, chiết xuất từ thiên nhiên.`,
                badge: badges[Math.floor(Math.random() * badges.length)],
                rating: Math.round((3.5 + Math.random() * 1.5) * 10) / 10,
                reviews: Math.floor(Math.random() * 300) + 10,
                brand: brandIds[Math.floor(Math.random() * brandIds.length)],
            });
        });
    });

    return products;
};

export const allProducts: Product[] = generateProducts();

// Featured Products (first 8)
export const featuredProducts: Product[] = allProducts.slice(0, 8);

// Brand Information
export const brandInfo: BrandInfo = {
    name: 'Bella Beauty',
    tagline: 'Vẻ đẹp tự nhiên, tỏa sáng từ bên trong',
    description: 'Bella Beauty ra đời từ niềm đam mê với vẻ đẹp tự nhiên và thuần khiết. Chúng tôi tin rằng mỗi người phụ nữ đều xứng đáng được sở hữu những sản phẩm chăm sóc da và làm đẹp an toàn, hiệu quả, được chiết xuất từ thiên nhiên.',
    founded: 2018,
    values: [
        'Thành phần tự nhiên 100%',
        'Không thử nghiệm trên động vật',
        'Bao bì thân thiện môi trường',
        'Sản xuất bền vững',
    ],
};

// Social Media Links
export const socialLinks: SocialLink[] = [
    { platform: 'facebook', url: 'https://facebook.com/bellabeauty', label: 'Facebook' },
    { platform: 'instagram', url: 'https://instagram.com/bellabeauty', label: 'Instagram' },
    { platform: 'pinterest', url: 'https://pinterest.com/bellabeauty', label: 'Pinterest' },
    { platform: 'youtube', url: 'https://youtube.com/bellabeauty', label: 'YouTube' },
];

// Footer Links
export const footerLinks = {
    shop: [
        { label: 'Tất cả sản phẩm', href: '/shop' },
        { label: 'Sản phẩm mới', href: '/shop?filter=new' },
        { label: 'Bán chạy nhất', href: '/shop?filter=bestseller' },
        { label: 'Khuyến mãi', href: '/shop?filter=sale' },
    ],
    support: [
        { label: 'Liên hệ', href: '/contact' },
        { label: 'Câu hỏi thường gặp', href: '/faq' },
        { label: 'Chính sách đổi trả', href: '/returns' },
        { label: 'Vận chuyển', href: '/shipping' },
    ],
    company: [
        { label: 'Về chúng tôi', href: '/about' },
        { label: 'Câu chuyện thương hiệu', href: '/our-story' },
        { label: 'Tuyển dụng', href: '/careers' },
        { label: 'Blog làm đẹp', href: '/blog' },
    ],
};

// Helper function to format Vietnamese currency
export const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    }).format(price);
};

// Price ranges for filter
export const priceRanges = {
    min: 0,
    max: 3000000,
    step: 50000,
};

// Sort options
export const sortOptions = [
    { id: 'newest', label: 'Mới nhất' },
    { id: 'rating', label: 'Đánh giá cao' },
    { id: 'price-asc', label: 'Giá tăng dần' },
    { id: 'price-desc', label: 'Giá giảm dần' },
    { id: 'name-asc', label: 'Tên A-Z' },
    { id: 'name-desc', label: 'Tên Z-A' },
];
