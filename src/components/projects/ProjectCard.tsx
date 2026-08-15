import { Link } from 'react-router-dom';
import type { Project } from '../../types';
import styles from './ProjectCard.module.css';

export function ProjectCard({ project }: { project: Project }) {
    const inner = (
        <>
            {project.image && (
                <div
                    className={styles.thumb}
                    style={{ backgroundImage: `url(${project.image})` }}
                />
            )}
            <div className={styles.content}>
                <div className={styles.meta}>
                    <span className={styles.year}>{project.year}</span>
                    <span className={styles.stack}>{project.stack.join(' · ')}</span>
                </div>
                <h3 className={styles.title}>{project.title}</h3>
                <p className={styles.summary}>{project.summary}</p>
                {project.postSlug && <span className={styles.readMore}>Read the write-up</span>}
            </div>
        </>
    );

    if (project.postSlug) {
        return (
            <Link to={`/blog/${project.postSlug}`} className={styles.card}>
                {inner}
            </Link>
        );
    }

    return (
        <a href={project.href} target="_blank" rel="noreferrer" className={styles.card}>
            {inner}
        </a>
    );
}