import styles from './Nav.module.css';

export function Nav() {
    return (
        <nav className={styles.nav}>
            <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <a className={styles.logo} href={'/'}>john conner</a>
                <span className={styles.hint}>press / for command mode</span>
            </div>
        </nav>
    );
}