import { Link } from 'react-router-dom';
import { posts } from '../../data/posts';
import styles from './BlogList.module.css';

export function BlogList() {
    return (
        <div className={styles.list}>
            <h2>Writing</h2>
            {posts.map((post) => (
                <Link key={post.slug} to={`/blog/${post.slug}`} className={styles.link}>
                    <div>
                        <h2 className={styles.title}>{post.title}</h2>
                        <p className={styles.excerpt}>{post.excerpt}</p>
                    </div>
                    <span className={styles.meta}>{post.date} · {post.readTime}</span>
                </Link>
            ))}
        </div>
    );
}