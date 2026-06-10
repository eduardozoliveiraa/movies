import { getMoviesByGenre } from "@/lib/api";
import MovieCard from "@/components/MovieCard/MovieCard";
import styles from "../../movies/page.module.css";
import Link from "next/link";

export default async function GenrePage({
    params,
    searchParams,
}: {
    params: Promise<{ id: string }>;
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
    const resolvedParams = await params;
    const resolvedSearch = await searchParams;

    // Read the optional name from query, fallback to ID
    const genreName = typeof resolvedSearch.name === 'string'
        ? resolvedSearch.name
        : `Genre ${resolvedParams.id}`;

    const results = await getMoviesByGenre(resolvedParams.id);

    return (
        <main className={styles.pageWrapper}>
            <div className={styles.pageHeader}>
                <h1 className={styles.pageTitle}>
                    {genreName}
                    <span className={styles.countBadge}>{results.length}</span>
                </h1>
                <p className={styles.pageSubtitle}>
                    Os melhores títulos na categoria {genreName}
                </p>
            </div>

            {results.length > 0 ? (
                <div className={styles.gridContainer}>
                    <div className={styles.grid}>
                        {results.map((movie: any) => (
                            <MovieCard key={`${movie.media_type || 'movie'}-${movie.id}`} movie={movie} />
                        ))}
                    </div>
                </div>
            ) : (
                <div className={styles.emptyState}>
                    <div className={styles.emptyIcon}>🎬</div>
                    <h2>Nenhum título de {genreName} encontrado</h2>
                    <p>
                        Não conseguimos encontrar filmes ou séries nesta categoria no momento.
                    </p>
                    <Link href="/genres" className={styles.browseButton}>
                        Explorar Outros Gêneros
                    </Link>
                </div>
            )}
        </main>
    );
}
