import { AsciiPortrait } from './AsciiPortrait';
import portrait from '../../../public/portrait.png';
import styles from './hero.module.css';

export function Hero() {
    return (
        <section className={styles.hero}>
            <div className={styles.text}>
                <p className={styles.prompt}>john@jhtconner:~$ whoami</p>
                <h1 className={styles.name}>Hi, I'm John.</h1>
                <p className={styles.bio}>
                    Software engineer based in Greater London. I solve problems for Compare the Market by day
                    and experiment with new technologies by night, with the occasional climbing project in between.

                </p>
            </div>
            <AsciiPortrait src={portrait} alt="Portrait of John Conner" />
        </section>
    );
}