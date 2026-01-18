'use client';

import { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

// Mock Reviews Data (30 reviews)
const mockReviews = [
    { id: '1', author: 'Minh Anh', rating: 5, date: '2 ngày trước', content: 'Sản phẩm tuyệt vời! Da mình sáng hẳn lên sau 2 tuần sử dụng. Texture mịn màng, thấm nhanh không bết dính. Rất hài lòng!', images: ['https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=200&q=80'], verified: true },
    { id: '2', author: 'Thu Hương', rating: 5, date: '3 ngày trước', content: 'Đáng đồng tiền bỏ ra. Mùi thơm nhẹ nhàng, không gây kích ứng da nhạy cảm của mình.', verified: true },
    { id: '3', author: 'Linh Chi', rating: 4, date: '1 tuần trước', content: 'Serum tốt, dùng được hơn 1 tháng da mình láng mịn hơn nhiều. Trừ 1 sao vì giá hơi cao.', verified: true },
    { id: '4', author: 'Ngọc Trâm', rating: 5, date: '1 tuần trước', content: 'Yêu thích sản phẩm này! Đã mua lần thứ 3. Hiệu quả thấy rõ sau 2-3 tuần.', images: ['https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=200&q=80'], verified: true },
    { id: '5', author: 'Hạnh Lê', rating: 4, date: '2 tuần trước', content: 'Chất lượng ổn, giao hàng nhanh. Sẽ tiếp tục ủng hộ shop.', verified: false },
    { id: '6', author: 'Phương Thảo', rating: 5, date: '2 tuần trước', content: 'Sản phẩm chính hãng, mùi thơm dễ chịu. Da mặt mịn màng hẳn sau 1 tuần dùng.', verified: true },
    { id: '7', author: 'Mai Lan', rating: 3, date: '3 tuần trước', content: 'Tạm được, nhưng mình nghĩ với giá này có thể tìm được sản phẩm tốt hơn.', verified: false },
    { id: '8', author: 'Khánh Vy', rating: 5, date: '3 tuần trước', content: 'Excellent! Đây là serum tốt nhất mình từng dùng. Highly recommend!', images: ['https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=200&q=80', 'https://images.unsplash.com/photo-1617897903246-719242758050?w=200&q=80'], verified: true },
    { id: '9', author: 'Thanh Tâm', rating: 4, date: '1 tháng trước', content: 'Sản phẩm ok, nhưng hơi lâu thấy hiệu quả. Cần kiên trì dùng đều đặn.', verified: true },
    { id: '10', author: 'Bảo Ngọc', rating: 5, date: '1 tháng trước', content: 'Mình đã giới thiệu cho tất cả bạn bè. Ai cũng khen!', verified: true },
    { id: '11', author: 'Diễm My', rating: 2, date: '1 tháng trước', content: 'Không hợp da mình, bị nổi mụn sau khi dùng. Có thể do cơ địa.', verified: false },
    { id: '12', author: 'Quỳnh Như', rating: 5, date: '1 tháng trước', content: 'Perfect! Đóng gói đẹp, sản phẩm thơm, da mịn. 10 điểm!', verified: true },
    { id: '13', author: 'Thùy Dương', rating: 4, date: '1 tháng trước', content: 'Chất lượng tốt, giá cả hợp lý. Sẽ mua thêm cho mẹ dùng thử.', verified: true },
    { id: '14', author: 'Hồng Nhung', rating: 5, date: '2 tháng trước', content: 'Shop giao hàng nhanh, đóng gói cẩn thận. Sản phẩm xịn xò!', verified: true },
    { id: '15', author: 'Ánh Tuyết', rating: 3, date: '2 tháng trước', content: 'Bình thường thôi, không có gì đặc biệt. Mình sẽ thử sản phẩm khác.', verified: false },
    { id: '16', author: 'Yến Nhi', rating: 5, date: '2 tháng trước', content: 'Cảm ơn shop! Serum này cứu da mình trong mùa đông khô hanh.', images: ['https://images.unsplash.com/photo-1556228720-195a672e8a03?w=200&q=80'], verified: true },
    { id: '17', author: 'Kim Ngân', rating: 4, date: '2 tháng trước', content: 'Dùng kết hợp với toner cùng hãng rất hiệu quả. Recommend combo!', verified: true },
    { id: '18', author: 'Tú Anh', rating: 5, date: '2 tháng trước', content: 'Lần đầu mua thử và không thất vọng. Sẽ quay lại mua tiếp! ❤️', verified: true },
    { id: '19', author: 'Phương Linh', rating: 1, date: '3 tháng trước', content: 'Không thấy hiệu quả gì sau 2 tuần dùng. Thất vọng!', verified: false },
    { id: '20', author: 'Ngọc Hân', rating: 5, date: '3 tháng trước', content: 'Sản phẩm tuyệt vời, đã mua lần thứ 5. Không bao giờ thay đổi!', verified: true },
    { id: '21', author: 'Thảo Vy', rating: 4, date: '3 tháng trước', content: 'Da mình combination, dùng serum này rất hợp. Vùng T không còn bóng dầu.', verified: true },
    { id: '22', author: 'Mỹ Linh', rating: 5, date: '3 tháng trước', content: 'Best purchase ever! Giao hàng nhanh, sản phẩm authentic 100%.', verified: true },
    { id: '23', author: 'Xuân Mai', rating: 3, date: '4 tháng trước', content: 'Okay thôi, mình thấy không có gì wow lắm. Sẽ thử sản phẩm khác.', verified: false },
    { id: '24', author: 'Lan Hương', rating: 5, date: '4 tháng trước', content: 'Mình 40 tuổi, dùng serum này thấy nếp nhăn mờ đi rõ rệt. Amazing!', images: ['https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?w=200&q=80'], verified: true },
    { id: '25', author: 'Kiều Oanh', rating: 4, date: '4 tháng trước', content: 'Sản phẩm tốt, đáng để thử. Chỉ tiếc là hết nhanh quá.', verified: true },
    { id: '26', author: 'Thu Thủy', rating: 5, date: '5 tháng trước', content: 'Holy grail skincare! Không thể sống thiếu serum này được nữa! 💕', verified: true },
    { id: '27', author: 'Ngọc Ánh', rating: 2, date: '5 tháng trước', content: 'Mình thấy bình thường, không đáng giá tiền. Có thể do không hợp da.', verified: false },
    { id: '28', author: 'Minh Thư', rating: 5, date: '5 tháng trước', content: 'Đã dùng qua nhiều serum nhưng đây là sản phẩm ưng ý nhất!', verified: true },
    { id: '29', author: 'Hoài An', rating: 4, date: '6 tháng trước', content: 'Chất lượng ổn định, mùi hương dễ chịu. Sẽ tiếp tục ủng hộ.', verified: true },
    { id: '30', author: 'Thanh Thảo', rating: 5, date: '6 tháng trước', content: 'Sản phẩm này thay đổi cuộc đời skincare của mình! Quá tuyệt vời! 🌟', images: ['https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=200&q=80'], verified: true },
];

interface Review {
    id: string;
    author: string;
    rating: number;
    date: string;
    content: string;
    images?: string[];
    verified?: boolean;
}

interface ProductReviewsSystemProps {
    productRating?: number;
    totalReviews?: number;
}

const REVIEWS_PER_PAGE = 5;

export default function ProductReviewsSystem({
    productRating = 4.5,
    totalReviews = mockReviews.length
}: ProductReviewsSystemProps) {
    // States
    const [filterStar, setFilterStar] = useState<number | null>(null);
    const [sortBy, setSortBy] = useState<'newest' | 'highest' | 'lowest'>('newest');
    const [currentPage, setCurrentPage] = useState(1);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({ rating: 0, content: '' });
    const [hoverRating, setHoverRating] = useState(0);
    const [showToast, setShowToast] = useState(false);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [lightboxImage, setLightboxImage] = useState<string | null>(null);

    // Mock auth state - trong production sẽ lấy từ auth context
    const [isLoggedIn] = useState(false); // Đổi thành true để test form
    const [currentUser] = useState({ name: 'Minh Anh', email: 'minhanh@example.com' });
    // Calculate rating distribution
    const ratingDistribution = useMemo(() => {
        const dist = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
        mockReviews.forEach(r => {
            dist[r.rating as keyof typeof dist]++;
        });
        return dist;
    }, []);

    // Filter and sort reviews
    const filteredReviews = useMemo(() => {
        let result = [...mockReviews];

        // Filter by star
        if (filterStar !== null) {
            result = result.filter(r => r.rating === filterStar);
        }

        // Sort
        switch (sortBy) {
            case 'highest':
                result.sort((a, b) => b.rating - a.rating);
                break;
            case 'lowest':
                result.sort((a, b) => a.rating - b.rating);
                break;
            default: // newest
                break;
        }

        return result;
    }, [filterStar, sortBy]);

    // Pagination
    const totalPages = Math.ceil(filteredReviews.length / REVIEWS_PER_PAGE);
    const paginatedReviews = useMemo(() => {
        const start = (currentPage - 1) * REVIEWS_PER_PAGE;
        return filteredReviews.slice(start, start + REVIEWS_PER_PAGE);
    }, [filteredReviews, currentPage]);

    // Handlers
    const handleWriteReviewClick = () => {
        if (!isLoggedIn) {
            setShowLoginModal(true);
            return;
        }
        setShowForm(!showForm);
    };

    const handleSubmitReview = useCallback((e: React.FormEvent) => {
        e.preventDefault();
        if (formData.rating === 0 || !formData.content) return;

        // Simulate submission
        console.log('Review submitted:', { ...formData, user: currentUser });
        setShowForm(false);
        setFormData({ rating: 0, content: '' });
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
    }, [formData]);

    const handleFilterChange = useCallback((star: number | null) => {
        setFilterStar(star);
        setCurrentPage(1);
    }, []);

    // Mask name for privacy (like Hasaki)
    const maskName = (name: string) => {
        if (name.length <= 3) return name;
        const first = name.slice(0, 2);
        const last = name.slice(-1);
        return `${first}***${last}`;
    };

    return (
        <div className="space-y-8">
            {/* Stats Overview */}
            <div className="grid md:grid-cols-2 gap-8 p-6 bg-cream-50/50 rounded-3xl">
                {/* Left - Average Rating */}
                <div className="text-center md:text-left">
                    <div className="text-5xl font-bold text-text-primary mb-2">{productRating.toFixed(1)}</div>
                    <div className="flex gap-1 justify-center md:justify-start mb-2">
                        {[...Array(5)].map((_, i) => (
                            <svg
                                key={i}
                                className={`w-5 h-5 ${i < Math.floor(productRating) ? 'text-amber-400' : 'text-gray-200'}`}
                                fill="currentColor"
                                viewBox="0 0 20 20"
                            >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                        ))}
                    </div>
                    <p className="text-text-muted">{totalReviews} đánh giá</p>
                </div>

                {/* Right - Bar Chart */}
                <div className="space-y-2">
                    {[5, 4, 3, 2, 1].map((star) => {
                        const count = ratingDistribution[star as keyof typeof ratingDistribution];
                        const percentage = (count / totalReviews) * 100;
                        return (
                            <button
                                key={star}
                                onClick={() => handleFilterChange(filterStar === star ? null : star)}
                                className={`flex items-center gap-3 w-full group ${filterStar === star ? 'opacity-100' : 'opacity-70 hover:opacity-100'}`}
                            >
                                <span className="text-sm text-text-muted w-12 text-right">{star} sao</span>
                                <div className="flex-1 h-2 bg-cream-200 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${percentage}%` }}
                                        transition={{ duration: 0.5, delay: (5 - star) * 0.1 }}
                                        className="h-full bg-amber-400 rounded-full"
                                    />
                                </div>
                                <span className="text-sm text-text-muted w-8">{count}</span>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Write Review Button */}
            <div className="flex justify-center">
                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleWriteReviewClick}
                    className="px-8 py-3 bg-gradient-to-r from-primary-300 to-primary-400 text-white rounded-2xl font-medium shadow-soft hover:shadow-soft-lg transition-shadow"
                >
                    {showForm ? 'Đóng form' : '✍️ Viết đánh giá'}
                </motion.button>
            </div>

            {/* Review Form */}
            <AnimatePresence>
                {showForm && isLoggedIn && (
                    <motion.form
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        onSubmit={handleSubmitReview}
                        className="overflow-hidden"
                    >
                        <div className="p-6 bg-white rounded-3xl border border-cream-200 space-y-5">
                            {/* User Info Display */}
                            <div className="flex items-center gap-3 p-4 bg-cream-50 rounded-xl">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-200 to-primary-300 flex items-center justify-center text-white font-medium">
                                    {currentUser.name[0]}
                                </div>
                                <div>
                                    <p className="font-medium text-text-primary">{currentUser.name}</p>
                                    <p className="text-xs text-text-muted">{currentUser.email}</p>
                                </div>
                            </div>

                            {/* Star Picker */}
                            <div>
                                <label className="block text-sm font-medium text-text-primary mb-3">Đánh giá của bạn *</label>
                                <div className="flex gap-2">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <motion.button
                                            key={star}
                                            type="button"
                                            whileHover={{ scale: 1.2 }}
                                            whileTap={{ scale: 0.9 }}
                                            onMouseEnter={() => setHoverRating(star)}
                                            onMouseLeave={() => setHoverRating(0)}
                                            onClick={() => setFormData({ ...formData, rating: star })}
                                            className="focus:outline-none"
                                        >
                                            <svg
                                                className={`w-8 h-8 transition-colors ${star <= (hoverRating || formData.rating) ? 'text-amber-400' : 'text-gray-200'
                                                    }`}
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                            >
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                            </svg>
                                        </motion.button>
                                    ))}
                                </div>
                            </div>

                            {/* Content */}
                            <div>
                                <label className="block text-sm font-medium text-text-primary mb-2">Nội dung đánh giá *</label>
                                <textarea
                                    value={formData.content}
                                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                                    rows={4}
                                    className="w-full px-4 py-3 rounded-xl border border-cream-200 focus:border-primary-300 focus:ring-2 focus:ring-primary-100 outline-none transition-all resize-none"
                                    placeholder="Chia sẻ trải nghiệm của bạn về sản phẩm..."
                                    required
                                />
                            </div>

                            {/* Image Upload Placeholder */}
                            <div>
                                <label className="block text-sm font-medium text-text-primary mb-2">Tải ảnh thực tế</label>
                                <div className="border-2 border-dashed border-cream-200 rounded-xl p-6 text-center hover:border-primary-200 transition-colors cursor-pointer">
                                    <svg className="w-8 h-8 mx-auto text-text-muted mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    <p className="text-sm text-text-muted">Nhấp để tải ảnh hoặc kéo thả vào đây</p>
                                    <p className="text-xs text-text-muted mt-1">PNG, JPG tối đa 5MB</p>
                                </div>
                            </div>

                            {/* Submit */}
                            <div className="flex justify-end">
                                <motion.button
                                    type="submit"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    disabled={formData.rating === 0 || !formData.content}
                                    className="px-8 py-3 bg-primary-400 text-white rounded-xl font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary-500 transition-colors"
                                >
                                    Gửi đánh giá
                                </motion.button>
                            </div>
                        </div>
                    </motion.form>
                )}
            </AnimatePresence>

            {/* Filter & Sort Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-white rounded-2xl border border-cream-100">
                {/* Filter by Stars */}
                <div className="flex flex-wrap items-center gap-2">
                    <span className="text-sm text-text-muted">Lọc:</span>
                    <button
                        onClick={() => handleFilterChange(null)}
                        className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${filterStar === null ? 'bg-primary-400 text-white' : 'bg-cream-100 text-text-secondary hover:bg-cream-200'
                            }`}
                    >
                        Tất cả
                    </button>
                    {[5, 4, 3, 2, 1].map((star) => (
                        <button
                            key={star}
                            onClick={() => handleFilterChange(filterStar === star ? null : star)}
                            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all flex items-center gap-1 ${filterStar === star ? 'bg-primary-400 text-white' : 'bg-cream-100 text-text-secondary hover:bg-cream-200'
                                }`}
                        >
                            {star} <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                        </button>
                    ))}
                </div>

                {/* Sort Dropdown */}
                <div className="flex items-center gap-2">
                    <span className="text-sm text-text-muted">Sắp xếp:</span>
                    <select
                        value={sortBy}
                        onChange={(e) => { setSortBy(e.target.value as typeof sortBy); setCurrentPage(1); }}
                        className="px-4 py-2 rounded-xl border border-cream-200 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary-100"
                    >
                        <option value="newest">Mới nhất</option>
                        <option value="highest">Đánh giá cao nhất</option>
                        <option value="lowest">Đánh giá thấp nhất</option>
                    </select>
                </div>
            </div>

            {/* Reviews Count */}
            <p className="text-sm text-text-muted">
                Hiển thị {paginatedReviews.length} trong {filteredReviews.length} đánh giá
                {filterStar && ` (${filterStar} sao)`}
            </p>

            {/* Review List */}
            <div className="space-y-6">
                <AnimatePresence mode="popLayout">
                    {paginatedReviews.map((review, index) => (
                        <motion.div
                            key={review.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ delay: index * 0.05 }}
                            className="p-6 bg-white rounded-2xl border border-cream-100 hover:border-cream-200 transition-colors"
                        >
                            {/* Header */}
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center gap-4">
                                    {/* Avatar */}
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-200 to-lavender-200 flex items-center justify-center text-white font-bold text-lg">
                                        {review.author[0]}
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <span className="font-medium text-text-primary">{maskName(review.author)}</span>
                                            {review.verified && (
                                                <span className="px-2 py-0.5 bg-mint-100 text-emerald-700 text-xs font-medium rounded-full flex items-center gap-1">
                                                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                                                    Đã mua
                                                </span>
                                            )}
                                        </div>
                                        <p className="text-xs text-text-muted">{review.date}</p>
                                    </div>
                                </div>
                                {/* Stars */}
                                <div className="flex gap-0.5">
                                    {[...Array(5)].map((_, i) => (
                                        <svg
                                            key={i}
                                            className={`w-4 h-4 ${i < review.rating ? 'text-amber-400' : 'text-gray-200'}`}
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    ))}
                                </div>
                            </div>

                            {/* Content */}
                            <p className="text-text-secondary leading-relaxed mb-4">{review.content}</p>

                            {/* Images */}
                            {review.images && review.images.length > 0 && (
                                <div className="flex gap-2 flex-wrap">
                                    {review.images.map((img, i) => (
                                        <motion.button
                                            key={i}
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={() => setLightboxImage(img)}
                                            className="relative w-16 h-16 rounded-xl overflow-hidden"
                                        >
                                            <Image src={img} alt={`Review image ${i + 1}`} fill sizes="64px" className="object-cover" />
                                        </motion.button>
                                    ))}
                                </div>
                            )}
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {/* Empty State */}
            {filteredReviews.length === 0 && (
                <div className="text-center py-12">
                    <p className="text-text-muted">Không có đánh giá nào {filterStar && `với ${filterStar} sao`}</p>
                </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 pt-4">
                    <button
                        onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                        disabled={currentPage === 1}
                        className="w-10 h-10 rounded-xl border border-cream-200 flex items-center justify-center hover:bg-cream-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            className={`w-10 h-10 rounded-xl font-medium transition-all ${currentPage === page
                                ? 'bg-primary-400 text-white'
                                : 'border border-cream-200 hover:bg-cream-50 text-text-secondary'
                                }`}
                        >
                            {page}
                        </button>
                    ))}
                    <button
                        onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                        disabled={currentPage === totalPages}
                        className="w-10 h-10 rounded-xl border border-cream-200 flex items-center justify-center hover:bg-cream-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                    </button>
                </div>
            )}

            {/* Lightbox */}
            <AnimatePresence>
                {lightboxImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setLightboxImage(null)}
                        className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
                    >
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            onClick={() => setLightboxImage(null)}
                            className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                        </motion.button>
                        <motion.div
                            initial={{ scale: 0.9 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.9 }}
                            className="relative w-full max-w-2xl aspect-square"
                        >
                            <Image src={lightboxImage} alt="Review image" fill className="object-contain" />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Login Modal */}
            <AnimatePresence>
                {showLoginModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setShowLoginModal(false)}
                        className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-white rounded-3xl p-8 max-w-md w-full"
                        >
                            <div className="text-center">
                                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary-100 flex items-center justify-center">
                                    <svg className="w-8 h-8 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                </div>
                                <h3 className="font-serif text-2xl font-medium text-text-primary mb-3">Đăng nhập để đánh giá</h3>
                                <p className="text-text-secondary mb-6">Bạn cần đăng nhập để có thể viết đánh giá cho sản phẩm này</p>
                                <div className="flex gap-3">
                                    <button
                                        onClick={() => setShowLoginModal(false)}
                                        className="flex-1 px-6 py-3 border-2 border-cream-200 rounded-xl font-medium text-text-primary hover:bg-cream-50 transition-colors"
                                    >
                                        Đóng
                                    </button>
                                    <button
                                        onClick={() => {
                                            setShowLoginModal(false);
                                            // TODO: Navigate to login page
                                            console.log('Navigate to login');
                                        }}
                                        className="flex-1 px-6 py-3 bg-primary-400 text-white rounded-xl font-medium hover:bg-primary-500 transition-colors"
                                    >
                                        Đăng nhập
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Toast Notification */}
            <AnimatePresence>
                {showToast && (
                    <motion.div
                        initial={{ opacity: 0, y: 50, x: '-50%' }}
                        animate={{ opacity: 1, y: 0, x: '-50%' }}
                        exit={{ opacity: 0, y: 50, x: '-50%' }}
                        className="fixed bottom-8 left-1/2 z-50 px-6 py-4 bg-emerald-500 text-white rounded-2xl shadow-lg flex items-center gap-3"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                        <span className="font-medium">Cảm ơn bạn đã đánh giá!</span>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
