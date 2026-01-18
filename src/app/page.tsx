import Header from '@/components/sections/Header';
import Hero from '@/components/sections/Hero';
import BrandStory from '@/components/sections/BrandStory';
import Categories from '@/components/sections/Categories';
import FeaturedProducts from '@/components/sections/FeaturedProducts';
import BlogSection from '@/components/sections/BlogSection';
import Footer from '@/components/sections/Footer';
import BrandShowcase from '@/components/sections/BrandShowcase';

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <BrandStory />
        <Categories />
        <FeaturedProducts />
        <BlogSection />
        <BrandShowcase />
      </main>
      <Footer />
    </>
  );
}
