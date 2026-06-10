"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import MovieCard from "@/components/MovieCard/MovieCard";
import { Movie } from "@/lib/api";
import styles from "./MovieCarousel.module.css";

interface MovieCarouselProps {
    title: string;
    movies: Movie[];
    viewAllHref?: string;
}

export default function MovieCarousel({ title, movies, viewAllHref }: MovieCarouselProps) {
    const carouselRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: "left" | "right") => {
        if (carouselRef.current) {
            const scrollAmount = direction === "left" ? -900 : 900;
            carouselRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
        }
    };

    if (!movies || movies.length === 0) return null;

    return (
        <section className={styles.container}>
            <div className={styles.header}>
                <h2 className={styles.title}>{title}</h2>
                {viewAllHref && (
                    <a href={viewAllHref} className={styles.viewAll}>
                        Ver Tudo →
                    </a>
                )}
            </div>

            <div className={styles.carouselWrapper}>
                <button
                    className={`${styles.controlButton} ${styles.leftButton}`}
                    onClick={() => scroll("left")}
                    aria-label="Rolar para esquerda"
                >
                    <ChevronLeft size={22} />
                </button>

                <div className={styles.carousel} ref={carouselRef}>
                    {movies.map((movie) => (
                        <MovieCard key={`${movie.media_type || 'movie'}-${movie.id}`} movie={movie} />
                    ))}
                </div>

                <button
                    className={`${styles.controlButton} ${styles.rightButton}`}
                    onClick={() => scroll("right")}
                    aria-label="Rolar para direita"
                >
                    <ChevronRight size={22} />
                </button>
            </div>
        </section>
    );
}
