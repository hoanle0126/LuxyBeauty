'use client';

import AnimatedSection from '@/components/ui/AnimatedSection';
import CategoryCard from '@/components/ui/CategoryCard';
import { categories } from '@/lib/data';

const Categories = () => {
    return (
        <section className="py-24 lg:py-32 bg-cream-50">
            <div className="container mx-auto px-4 lg:px-8">
                {/* Section Header */}
                <AnimatedSection className="text-center mb-16">
                    <span className="inline-block px-4 py-2 bg-mint-100 rounded-full text-emerald-700 text-sm font-medium mb-6">
                        Danh mục sản phẩm
                    </span>
                    <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-medium text-text-primary mb-4">
                        Khám phá bộ sưu tập
                    </h2>
                    <p className="text-lg text-text-secondary max-w-2xl mx-auto">
                        Chọn lựa từ các danh mục sản phẩm được thiết kế riêng cho từng nhu cầu làm đẹp của bạn
                    </p>
                </AnimatedSection>

                {/* Categories Grid */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {categories.map((category, index) => (
                        <CategoryCard key={category.id} category={category} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Categories;
