import { useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { getPostBySlug } from '../../data/posts.ts';

export function BlogPostPage() {
    const { slug } = useParams<{ slug: string }>();
    const post = slug ? getPostBySlug(slug) : undefined;

    if (!post) return <div>Post not found.</div>;

    return (
        <article>
            <h1>{post.title}</h1>
            <span>{post.date} · {post.readTime}</span>
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {post.body}
            </ReactMarkdown>
        </article>
    );
}