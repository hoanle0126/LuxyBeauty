import { Suspense } from 'react';
import ShopClient from './ShopClient';

// Loading fallback
function ShopLoading() {
    return (
        <div className="min-h-screen bg-cream-50 flex items-center justify-center">
            <div className="text-center">
                <div className="w-12 h-12 border-4 border-primary-200 border-t-primary-400 rounded-full animate-spin mx-auto mb-4" />
                <p className="text-text-muted">Đang tải sản phẩm...</p>
            </div>
        </div>
    );
}

export default function ShopPage() {
    return (
        <Suspense fallback={<ShopLoading />}>
            <ShopClient />
        </Suspense>
    );
}
