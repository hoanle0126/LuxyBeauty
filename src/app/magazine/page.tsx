import { Metadata } from 'next';
import MagazineClient from './MagazineClient';

export const metadata: Metadata = {
    title: 'Magazine | Bella Beauty - Câu chuyện làm đẹp',
    description: 'Khám phá những bí quyết, xu hướng và nguồn cảm hứng làm đẹp mới nhất từ Bella Beauty Magazine.',
    openGraph: {
        title: 'Bella Beauty Magazine',
        description: 'Khám phá những câu chuyện làm đẹp đầy cảm hứng',
        type: 'website',
    },
};

export default function MagazinePage() {
    return <MagazineClient />;
}
