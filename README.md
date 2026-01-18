# 🌸 Bella Beauty

> Premium Beauty & Skincare E-commerce Platform

A modern, luxurious e-commerce website for beauty and skincare products built with Next.js 14, TypeScript, and Tailwind CSS.

![Bella Beauty](https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=1200&q=80)

## ✨ Features

### 🛒 E-commerce Core
- **Product Catalog** - Grid/List view with filtering & sorting
- **Product Detail** - Hasaki-inspired design with image gallery, variants, tabs
- **Shopping Cart** - Add to cart with quantity management
- **Wishlist** - Save favorite products

### 📖 Magazine
- **Article Listing** - Bento grid layout with featured posts
- **Article Detail** - Typography-focused with "Shop this Article" carousel
- **Category Filters** - Filter by Skincare, Makeup, Tips, etc.

### 🎨 Premium UI/UX
- **Pastel Color Palette** - Soft, elegant colors
- **Framer Motion Animations** - Smooth transitions & micro-interactions
- **Responsive Design** - Mobile-first approach
- **Glassmorphism Effects** - Modern glass UI elements

### ⭐ Review System
- **Rating Overview** - Bar chart with statistics
- **Interactive Star Picker** - Hover effects
- **Filter & Sort** - By stars, newest, highest/lowest rating
- **Pagination** - 5 reviews per page
- **Image Lightbox** - Click to zoom review images
- **Auth Integration** - Login required to write reviews

## 🛠️ Tech Stack

| Category | Technology |
|----------|------------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript (Strict Mode) |
| Styling | Tailwind CSS |
| Animation | Framer Motion |
| Icons | Heroicons (inline SVG) |
| Images | Next/Image |

## 📁 Project Structure

```
src/
├── app/
│   ├── page.tsx              # Landing page
│   ├── shop/                 # Shop listing
│   ├── product/[slug]/       # Product detail
│   └── magazine/             # Magazine section
├── components/
│   ├── sections/             # Page sections (Header, Footer, etc.)
│   └── ui/                   # Reusable UI components
├── lib/
│   └── data.ts               # Mock data & utilities
└── types/
    └── index.ts              # TypeScript types
```

## 🚀 Getting Started

### Prerequisites
- Node.js 20+
- npm or yarn

### Installation

```bash
# Clone repository
git clone https://github.com/yourusername/bella-beauty.git
cd bella-beauty

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## 📱 Pages

| Route | Description |
|-------|-------------|
| `/` | Landing page with Hero, Featured Products, Brand Story |
| `/shop` | Product catalog with filters, sorting, pagination |
| `/product/[id]` | Product detail with gallery, variants, reviews |
| `/magazine` | Beauty articles with bento grid layout |
| `/magazine/[slug]` | Article detail with related products |

## 🎨 Design System

### Colors (Tailwind Custom)
- `primary` - Rose pink (#FDA4AF)
- `cream` - Soft beige (#FAF6F1)
- `lavender` - Soft purple (#E8E0F0)
- `mint` - Soft green (#D1FAE5)
- `text-primary` - Dark gray (#1F1F1F)
- `text-secondary` - Medium gray (#4A4A4A)
- `text-muted` - Light gray (#9CA3AF)

### Typography
- **Headings** - Playfair Display (Serif)
- **Body** - Inter (Sans-serif)

## 📝 Scripts

```bash
npm run dev      # Development server
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

## 🔧 Configuration

### ESLint (v9 Flat Config)
- TypeScript strict rules
- React hooks rules
- Next.js core-web-vitals

### TypeScript
- Strict mode enabled
- Path aliases: `@/*` → `src/*`

## 📄 License

MIT License - feel free to use for personal or commercial projects.

---

Built with 💕 by Bella Beauty Team
