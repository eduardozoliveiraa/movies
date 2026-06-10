import { getGenres } from "@/lib/api";
import Link from "next/link";
import styles from "./page.module.css";

export default async function GenresPage() {
    const data = await getGenres();
    const genres = data.genres || [];

    // Helper to generate a consistent pseudo-random hue based on genre ID
    const getHue = (id: number) => (id * 137.5) % 360;

    return (
        <main className={styles.pageWrapper}>
            <div className={styles.pageHeader}>
                <h1 className={styles.pageTitle}>Gêneros</h1>
                <p className={styles.pageSubtitle}>
                    Explore nossa vasta biblioteca de filmes e séries por categoria.
                    Encontre exatamente o que você está a fim de assistir hoje.
                </p>
            </div>

            <div className={styles.gridContainer}>
                <div className={styles.genresGrid}>
                    {genres.map((genre: any) => {
                        const hue = getHue(genre.id);
                        return (
                            <Link
                                href={`/genre/${genre.id}?name=${encodeURIComponent(genre.name)}`}
                                key={genre.id}
                                className={styles.genreCard}
                                style={{
                                    // Generate a subtle dark gradient based on the hue
                                    background: `linear-gradient(135deg, hsl(${hue}, 40%, 15%), var(--bg-surface))`
                                }}
                            >
                                <span className={styles.genreName}>{genre.name}</span>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </main>
    );
}
