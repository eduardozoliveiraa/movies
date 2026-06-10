import { getTopRatedMovies, getActionMovies } from "@/lib/api";
import MovieCard from "@/components/MovieCard/MovieCard";
import styles from "./page.module.css";

export default async function MoviesPage() {
    const [topRated, action] = await Promise.all([
        getTopRatedMovies(),
        getActionMovies(),
    ]);

    const allMovies = [...topRated, ...action].reduce((acc, movie) => {
        if (!acc.some(m => m.id === movie.id)) acc.push(movie);
        return acc;
    }, [] as typeof topRated);

    return (
        <main className={styles.pageWrapper}>
            <div className={styles.pageHeader}>
                <h1 className={styles.pageTitle}>
                    Filmes
                    <span className={styles.countBadge}>{allMovies.length}</span>
                </h1>
                <p className={styles.pageSubtitle}>Os melhores filmes de ação e aclamados pela crítica para você</p>
            </div>

            <div className={styles.gridContainer}>
                <div className={styles.grid}>
                    {allMovies.map((movie) => (
                        <MovieCard key={`movie-${movie.id}`} movie={movie} />
                    ))}
                </div>
            </div>
        </main>
    );
}
