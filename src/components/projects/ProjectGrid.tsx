import { projects } from '../../data/projects';
import { ProjectCard } from './ProjectCard';

export function ProjectGrid() {
    return (
        <section>
            <h2>Selected work</h2>
            <div style={{ display: 'grid', gap: 20, gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', marginTop: 24 }}>
                {projects.map((p) => (
                    <ProjectCard key={p.slug} project={p} />
                ))}
            </div>
        </section>
    );
}