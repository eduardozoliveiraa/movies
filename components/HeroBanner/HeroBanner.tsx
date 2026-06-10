import Link from "next/link";
import { Play, Info, Star } from "lucide-react";
import styles from "./HeroBanner.module.css";

interface HeroBannerProps {
    id?: number;
    mediaType?: string;
    title?: string;
    description?: string;
    backdropUrl?: string;
    rating?: number;
    year?: string;
    runtime?: number;
}

export default function HeroBanner({
    id = 1,
    mediaType = "movie",
    title = "Dune: Part Two",
    description = "Paul Atreides unites with Chani and the Fremen while on a warpath of revenge against the conspirators who destroyed his family.",
    backdropUrl = "https://picsum.photos/seed/102/1200/800",
    rating,
    year,
    runtime,
}: HeroBannerProps) {
    return (
        <div
            className={styles.hero}
            style={{ backgroundImage: `url('${backdropUrl}')` }}
        >
            <div className={styles.overlay} />

            <div className={styles.content}>
                <span className={styles.badge}>
                    🔥 Em Alta
                </span>

                <h1 className={styles.title}>{title}</h1>

                <div className={styles.metaRow}>
                    {rating && (
                        <span className={styles.ratingBadge}>
                            <Star size={14} fill="currentColor" />
                            {rating.toFixed(1)}
                        </span>
                    )}
                    {rating && (year || runtime) && <span className={styles.metaDot} />}
                    {year && <span className={styles.metaItem}>{year}</span>}
                    {year && runtime && <span className={styles.metaDot} />}
                    {runtime && <span className={styles.metaItem}>{runtime}min</span>}
                </div>

                <p className={styles.description}>{description}</p>

                <div className={styles.actions}>
                    <Link
                        href={`/${mediaType}/${id}#trailer`}
                        className={styles.playButton}
                    >
                        <Play size={18} fill="currentColor" />
                        Assistir Trailer
                    </Link>
                    <Link
                        href={`/${mediaType}/${id}`}
                        className={styles.infoButton}
                    >
                        <Info size={18} />
                        Mais Info
                    </Link>
                </div>
            </div>
        </div>
    );
}
