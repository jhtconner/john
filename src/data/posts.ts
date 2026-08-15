import fm from 'front-matter';
import type { BlogPost } from '../types';

const postFiles = import.meta.glob('../posts/*.md', {
    query: '?raw',
    import: 'default',
    eager: true,
}) as Record<string, string>;

interface FrontMatterAttrs {
    slug: string;
    title: string;
    date: string;
    excerpt: string;
}

function calculateReadTime(body: string): string {
    const wordsPerMinute = 200;
    const wordCount = body.trim().split(/\s+/).length;
    const minutes = Math.max(1, Math.round(wordCount / wordsPerMinute));
    return `${minutes} min read`;
}

function parsePost(raw: string): BlogPost {
    const { attributes, body } = fm<FrontMatterAttrs>(raw);
    return {
        slug: attributes.slug,
        title: attributes.title,
        date: new Date(attributes.date).toISOString().slice(0, 10),
        excerpt: attributes.excerpt,
        readTime: calculateReadTime(body),
        body: body.trim(),
    };
}

export const posts: BlogPost[] = Object.values(postFiles)
    .map(parsePost)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

export function getPostBySlug(slug: string): BlogPost | undefined {
    return posts.find((p) => p.slug === slug);
}