import Link from "next/link";
import styles from "./Footer.module.css";

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.inner}>
                <div className={styles.brand}>
                    <div className={styles.logo}>CineStream</div>
                    <p className={styles.tagline}>
                        Seu destino premium para filmes e séries.
                        Assista aos melhores conteúdos do mundo todo.
                    </p>
                </div>

                <div className={styles.column}>
                    <h4>Navegar</h4>
                    <ul>
                        <li><Link href="/">Início</Link></li>
                        <li><Link href="/movies">Filmes</Link></li>
                        <li><Link href="/tv">Séries</Link></li>
                        <li><Link href="/my-list">Minha Lista</Link></li>
                    </ul>
                </div>

                <div className={styles.column}>
                    <h4>Descubra</h4>
                    <ul>
                        <li><Link href="/movies">Mais Bem Avaliados</Link></li>
                        <li><Link href="/genre/28?name=Ação">Ação</Link></li>
                        <li><Link href="/genre/18?name=Drama">Drama</Link></li>
                        <li><Link href="/genre/878?name=Ficção Científica">Ficção Científica</Link></li>
                    </ul>
                </div>
            </div>
        </footer>
    );
}
