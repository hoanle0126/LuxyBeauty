'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

interface BreadcrumbItem {
    label: string;
    href?: string;
}

interface BreadcrumbsProps {
    items: BreadcrumbItem[];
}

const Breadcrumbs = ({ items }: BreadcrumbsProps) => {
    return (
        <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="flex items-center gap-2 text-sm text-text-muted mb-6 flex-wrap"
            aria-label="Breadcrumb"
        >
            {items.map((item, index) => (
                <span key={index} className="flex items-center gap-2">
                    {index > 0 && (
                        <svg className="w-3 h-3 text-text-muted/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    )}
                    {item.href ? (
                        <Link
                            href={item.href}
                            className="hover:text-primary-400 transition-colors duration-200"
                        >
                            {item.label}
                        </Link>
                    ) : (
                        <span className="text-text-primary font-medium truncate max-w-[200px]">
                            {item.label}
                        </span>
                    )}
                </span>
            ))}
        </motion.nav>
    );
};

export default Breadcrumbs;
