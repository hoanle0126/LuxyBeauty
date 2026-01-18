import { Metadata } from 'next';
import MagazineDetailClient from './MagazineDetailClient';

// Mock data
const posts = [
    { slug: 'bi-quyet-da-khoe-mua-dong', title: 'Bí quyết giữ da khỏe mạnh trong mùa đông' },
    { slug: 'xu-huong-makeup-2026', title: 'Xu hướng makeup nổi bật năm 2026' },
    { slug: 'cham-soc-toc-tu-thien-nhien', title: 'Chăm sóc tóc với nguyên liệu từ thiên nhiên' },
];

export async function generateStaticParams() {
    return posts.map((post) => ({
        slug: post.slug,
    }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
    const post = posts.find(p => p.slug === params.slug) || posts[0];

    return {
        title: `${post.title} | Bella Beauty Magazine`,
        description: `Đọc bài viết "${post.title}" trên Bella Beauty Magazine. Khám phá những bí quyết làm đẹp hữu ích.`,
        openGraph: {
            title: post.title,
            description: `Bella Beauty Magazine - ${post.title}`,
            type: 'article',
        },
    };
}

export default function MagazineDetailPage({ params }: { params: { slug: string } }) {
    return <MagazineDetailClient slug={params.slug} />;
}
