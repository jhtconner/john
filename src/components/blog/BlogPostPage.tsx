import { useParams, Link } from 'react-router-dom';
import { posts } from '../../data/posts';

export function BlogPostPage() {
    const { slug } = useParams();
    const post = posts.find((p) => p.slug === slug);

    if (!post) return <p>Post not found. <Link to="/">← Home</Link></p>;

    return (
        <article style={{ padding: '64px 0' }}>
            <Link to="/" style={{ fontFamily: 'var(--font-mono)', fontSize: 14 }}>← back</Link>
            <h1 style={{ marginTop: 24 }}>{post.title}</h1>
            <p style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-mono)', fontSize: 13 }}>
                {post.date} · {post.readTime}
            </p>
            {post.body.map((para, i) => (
                <p key={i} style={{ marginTop: 20 }}>{para}</p>
            ))}
        </article>
    );
}