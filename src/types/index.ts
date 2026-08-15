export interface Project {
    slug: string;
    title: string;
    year: string;
    summary: string;
    stack: string[];
    href?: string;
    postSlug?: string;
    image?: string;
}

export interface BlogPost {
    slug: string;
    title: string;
    date: string;
    excerpt: string;
    readTime: string;
    body: string;
}