import styles from './Footer.module.css';

export function Footer() {
    return (
        <footer className={styles.footer}>
            <div className="container">
                <p>© {new Date().getFullYear()} John Conner — jhtconner.com</p>
            </div>
        </footer>
    );
}