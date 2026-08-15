import { Link } from 'react-router-dom';
import { posts } from '../../data/posts';
import styles from './BlogList.module.css';

export function BlogList() {
    return (
        <section>
            <h2>Writing</h2>
            <ul className={styles.list}>
                {posts.map((post) => (
                    <li key={post.slug} className={styles.item}>
                        <Link to={`/blog/${post.slug}`} className={styles.link}>
                            <span className={styles.title}>{post.title}</span>
                            <span className={styles.meta}>{post.date} · {post.readTime}</span>
                        </Link>
                        <p className={styles.excerpt}>{post.excerpt}</p>
                    </li>
                ))}
            </ul>
        </section>
    );
}