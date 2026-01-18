'use client';

import { memo } from 'react';

interface ProductSkeletonProps {
    viewMode?: 'grid' | 'list';
}

const ProductSkeleton = memo(function ProductSkeleton({ viewMode = 'grid' }: ProductSkeletonProps) {
    if (viewMode === 'list') {
        return (
            <div className="animate-pulse flex gap-4 bg-white rounded-2xl p-4">
                <div className="w-32 h-32 flex-shrink-0 rounded-xl bg-cream-200" />
                <div className="flex-1 space-y-3 py-2">
                    <div className="h-3 bg-cream-200 rounded w-20" />
                    <div className="h-4 bg-cream-200 rounded w-3/4" />
                    <div className="h-4 bg-cream-200 rounded w-1/2" />
                    <div className="h-8 bg-cream-200 rounded w-24 mt-2" />
                </div>
            </div>
        );
    }

    return (
        <div className="animate-pulse bg-white rounded-3xl overflow-hidden">
            <div className="aspect-square bg-cream-200" />
            <div className="p-5 space-y-3">
                <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                        <div key={i} className="w-3.5 h-3.5 rounded bg-cream-200" />
                    ))}
                </div>
                <div className="h-5 bg-cream-200 rounded w-3/4" />
                <div className="h-5 bg-cream-200 rounded w-1/2" />
                <div className="h-10 bg-cream-200 rounded w-full mt-4" />
            </div>
        </div>
    );
});

export default ProductSkeleton;
