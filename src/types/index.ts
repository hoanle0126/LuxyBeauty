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
    children?: NavItem[];
}

// Brand/Company info
export interface BrandInfo {
    name: string;
    tagline: string;
    description: string;
    founded?: number;
    values: string[];
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
