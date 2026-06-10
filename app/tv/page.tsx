import { getTrending } from "@/lib/api";
import MovieCard from "@/components/MovieCard/MovieCard";
import styles from "./page.module.css";

export default async function TVShowsPage() {
    const allShows = await getTrending();
    const tvShows = allShows.filter((item) => item.media_type === "tv" || item.first_air_date);

    return (
        <main className={styles.pageWrapper}>
            <div className={styles.pageHeader}>
                <h1 className={styles.pageTitle}>
                    Séries
                    <span className={styles.countBadge}>{tvShows.length}</span>
                </h1>
                <p className={styles.pageSubtitle}>As séries em alta e mais bem avaliadas para maratonar</p>
            </div>

            <div className={styles.gridContainer}>
                <div className={styles.grid}>
                    {tvShows.map((show) => (
                        <MovieCard key={`tv-${show.id}`} movie={show} />
                    ))}
                </div>
            </div>
        </main>
    );
}
