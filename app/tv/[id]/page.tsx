import { getMovieDetails, getImageUrl } from "@/lib/api";
import { Play, Star, Calendar, Clock } from "lucide-react";
import FavoriteButton from "@/components/FavoriteButton/FavoriteButton";
import styles from "../../movie/[id]/page.module.css";
import { notFound } from "next/navigation";
import Link from "next/link";

export default async function TVDetailsPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const resolvedParams = await params;
    const movie = await getMovieDetails(resolvedParams.id, 'tv');

    if (!movie) {
        notFound();
    }

    const title = movie.title || movie.name;
    const year = (movie.release_date || movie.first_air_date || "").substring(0, 4);
    const duration = movie.episode_run_time?.[0] ? `${movie.episode_run_time[0]}m / ep` : '';
    const trailer = movie.videos?.results?.find((v: any) => v.type === "Trailer" || v.site === "YouTube");

    return (
        <main className={styles.page}>
            {/* ── Hero Section ─────────────────────────────────────────── */}
            <section
                className={styles.hero}
                style={{ backgroundImage: `url('${getImageUrl(movie.backdrop_path, "original")}')` }}
            >
                <div className={styles.heroOverlay} />

                <div className={styles.heroInner}>
                    <img
                        src={getImageUrl(movie.poster_path)}
                        alt={title}
                        className={styles.poster}
                    />

                    <div className={styles.info}>
                        <span className={styles.badge}>
                            {movie.genres?.[0]?.name || "Série"}
                        </span>

                        <h1 className={styles.title}>{title}</h1>
                        {movie.tagline && <p className={styles.tagline}>"{movie.tagline}"</p>}

                        <div className={styles.meta}>
                            {movie.vote_average > 0 && (
                                <span className={styles.rating}>
                                    <Star size={15} fill="currentColor" />
                                    {movie.vote_average?.toFixed(1)}
                                    <span style={{ color: 'var(--text-muted)', fontWeight: '400', fontSize: '0.85rem' }}>/10</span>
                                </span>
                            )}
                            {year && (
                                <>
                                    <span className={styles.metaDot} />
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                                        <Calendar size={13} />
                                        {year}
                                        {movie.status === "Ended" ? ` - ${movie.last_air_date?.substring(0, 4) || ''}` : " - Presente"}
                                    </span>
                                </>
                            )}
                            {duration && (
                                <>
                                    <span className={styles.metaDot} />
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                                        <Clock size={13} />
                                        {duration}
                                    </span>
                                </>
                            )}
                            {movie.number_of_seasons && (
                                <>
                                    <span className={styles.metaDot} />
                                    <span>{movie.number_of_seasons} Temporada{movie.number_of_seasons > 1 ? 's' : ''}</span>
                                </>
                            )}
                            {movie.genres?.slice(1).map((g: any) => (
                                <span key={g.id} className={styles.genre}>{g.name}</span>
                            ))}
                        </div>

                        <p className={styles.overview}>{movie.overview}</p>

                        <div className={styles.actions}>
                            {trailer && (
                                <a href="#trailer" className={`${styles.btn} ${styles.btnPrimary}`}>
                                    <Play size={17} fill="currentColor" />
                                    Ver Trailer
                                </a>
                            )}
                            <FavoriteButton movie={movie} className={`${styles.btn} ${styles.btnSecondary}`} />
                        </div>
                    </div>
                </div>
            </section>

            <div className={styles.divider} />

            {/* ── Cast Section ─────────────────────────────────────────── */}
            {movie.credits?.cast?.length > 0 && (
                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>Elenco Principal</h2>
                    <div className={styles.castList}>
                        {movie.credits.cast.slice(0, 12).map((person: any) => (
                            <Link href={`/person/${person.id}`} key={person.id} className={styles.castMember}>
                                <img
                                    src={getImageUrl(person.profile_path, "w200")}
                                    alt={person.name}
                                    className={styles.castImage}
                                />
                                <div className={styles.castName}>{person.name}</div>
                                <div className={styles.castCharacter}>{person.character}</div>
                            </Link>
                        ))}
                    </div>
                </section>
            )}

            <div className={styles.divider} />

            {/* ── Trailer Section ───────────────────────────────────────── */}
            {trailer && (
                <section id="trailer" className={styles.trailerSection}>
                    <h2 className={styles.sectionTitle}>Trailer Oficial</h2>
                    <div className={styles.trailerWrapper}>
                        <iframe
                            src={`https://www.youtube.com/embed/${trailer.key}?rel=0&modestbranding=1&color=red`}
                            title={`${title} - Official Trailer`}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                        />
                    </div>
                </section>
            )}
        </main>
    );
}
