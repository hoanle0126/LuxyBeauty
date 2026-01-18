// Product interface
export interface Product {
    id: string;
    name: string;
    price: number;
    originalPrice?: number;
    image: string;
    category: string;
    description?: string;
    badge?: 'new' | 'bestseller' | 'sale';
    rating?: number;
    reviews?: number;
    brand?: string;
}

// Category interface
export interface Category {
    id: string;
    name: string;
    description: string;
    image: string;
    slug: string;
    productCount?: number;
}

// Navigation item interface
export interface NavItem {
    label: string;
    href: string;
    badge?: string;
    children?: NavItem[];
}

// Brand interface
export interface Brand {
    id: string;
    name: string;
    slug: string;
    logo: string;
    description: string;
    productCount: number;
    letter: string;
    featured?: boolean;
}

// Brand/Company info
export interface BrandInfo {
    name: string;
    tagline: string;
    description: string;
    founded?: number;
    values: string[];
}

// Search result
export interface SearchResult {
    id: string;
    type: 'product' | 'brand' | 'article';
    name: string;
    image?: string;
    url: string;
}

// Newsletter subscription
export interface NewsletterForm {
    email: string;
}

// Cart item
export interface CartItem extends Product {
    quantity: number;
}

// Social media links
export interface SocialLink {
    platform: 'facebook' | 'instagram' | 'twitter' | 'pinterest' | 'youtube';
    url: string;
    label: string;
}
