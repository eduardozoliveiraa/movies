import { searchMovies } from "@/lib/api";
import MovieCard from "@/components/MovieCard/MovieCard";
import { Search } from "lucide-react";
import Link from "next/link";
import styles from "./page.module.css";

export default async function SearchPage({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
    const resolvedParams = await searchParams;
    const query = typeof resolvedParams.q === 'string' ? resolvedParams.q : '';

    const results = query ? await searchMovies(query) : [];

    return (
        <main className={styles.pageWrapper}>
            <div className={styles.pageHeader}>
                <h1 className={styles.pageTitle}>
                    {query ? (
                        <>
                            Resultados para{" "}
                            <span className={styles.query}>"{query}"</span>
                            {results.length > 0 && (
                                <span className={styles.countBadge}>{results.length}</span>
                            )}
                        </>
                    ) : (
                        "Pesquisar"
                    )}
                </h1>
                <p className={styles.pageSubtitle}>
                    {query
                        ? `Encontramos ${results.length} títul${results.length !== 1 ? 'os' : 'o'}`
                        : "Encontre seu próximo filme ou série favorita"}
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
                    <div className={styles.emptyIcon}>
                        {query ? "🎬" : "🔍"}
                    </div>
                    <h2>{query ? "Nenhum resultado encontrado" : "Comece a pesquisar"}</h2>
                    <p>
                        {query
                            ? `Não encontramos nada para "${query}". Tente um título ou palavra-chave diferente.`
                            : "Digite o nome de um filme ou série na barra de pesquisa acima."}
                    </p>
                    <Link href="/" className={styles.browseButton}>
                        Navegue pelos Títulos Populares
                    </Link>
                </div>
            )}
        </main>
    );
}
