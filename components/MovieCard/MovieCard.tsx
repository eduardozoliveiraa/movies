"use client";

import Link from "next/link";
import { Play, Plus, Check, Info, Star } from "lucide-react";
import { Movie, getImageUrl } from "@/lib/api";
import { useFavorites } from "@/context/FavoritesContext";
import styles from "./MovieCard.module.css";

interface MovieCardProps {
    movie: Movie;
}

export default function MovieCard({ movie }: MovieCardProps) {
    const { isFavorite, addFavorite, removeFavorite } = useFavorites();
    const favorite = isFavorite(movie.id);

    const title = movie.title || movie.name;
    const year = (movie.release_date || movie.first_air_date || "").substring(0, 4);
    const mediaType = movie.media_type || "movie";

    const handleFavoriteClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (favorite) {
            removeFavorite(movie.id);
        } else {
            addFavorite(movie);
        }
    };

    return (
        <div className={styles.card}>
            <img
                src={getImageUrl(movie.poster_path)}
                alt={title || "Movie poster"}
                className={styles.poster}
                loading="lazy"
            />

            {/* Always-visible rating badge */}
            {movie.vote_average > 0 && (
                <div className={styles.ratingBadge}>
                    <Star size={10} fill="currentColor" />
                    {movie.vote_average.toFixed(1)}
                </div>
            )}

            <div className={styles.overlay}>
                <div className={styles.title} title={title}>{title}</div>

                <div className={styles.info}>
                    <div className={styles.rating}>
                        <Star size={12} fill="currentColor" />
                        {movie.vote_average ? movie.vote_average.toFixed(1) : "NR"}
                    </div>
                    <div>{year}</div>
                </div>

                <div className={styles.actions}>
                    <Link
                        href={`/${mediaType}/${movie.id}#trailer`}
                        className={`${styles.iconButton} ${styles.playButton}`}
                        aria-label="Assistir trailer"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <Play size={15} fill="currentColor" />
                    </Link>
                    <button
                        className={`${styles.iconButton} ${favorite ? styles.favoriteActive : ""}`}
                        aria-label={favorite ? "Remover da Minha Lista" : "Adicionar à Minha Lista"}
                        onClick={handleFavoriteClick}
                    >
                        {favorite ? <Check size={16} /> : <Plus size={16} />}
                    </button>
                    <Link
                        href={`/${mediaType}/${movie.id}`}
                        className={styles.iconButton}
                        aria-label="Mais informações"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <Info size={15} />
                    </Link>
                </div>
            </div>
        </div>
    );
}
