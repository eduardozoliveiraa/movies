"use client";

import { useFavorites } from "@/context/FavoritesContext";
import MovieCard from "@/components/MovieCard/MovieCard";
import Link from "next/link";
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import { Heart } from "lucide-react";

export default function MyListPage() {
    const { favorites } = useFavorites();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <main className={styles.pageWrapper}>
            <div className={styles.pageHeader}>
                <h1 className={styles.pageTitle}>
                    Minha Lista
                    {favorites.length > 0 && (
                        <span className={styles.countBadge}>{favorites.length}</span>
                    )}
                </h1>
                <p className={styles.pageSubtitle}>
                    {favorites.length > 0
                        ? "Sua coleção pessoal de títulos salvos"
                        : "Salve filmes e séries para assistir mais tarde"}
                </p>
            </div>

            {favorites.length > 0 ? (
                <div className={styles.gridContainer}>
                    <div className={styles.grid}>
                        {favorites.map((movie) => (
                            <MovieCard key={`${movie.media_type || 'movie'}-${movie.id}`} movie={movie} />
                        ))}
                    </div>
                </div>
            ) : (
                <div className={styles.emptyState}>
                    <div className={styles.emptyIcon}>💔</div>
                    <h2>Sua lista está vazia</h2>
                    <p>
                        Adicione filmes e séries clicando no botão <strong>+</strong> em qualquer card. Eles aparecerão bem aqui.
                    </p>
                    <Link href="/" className={styles.browseButton}>
                        Explorar Títulos
                    </Link>
                </div>
            )}
        </main>
    );
}
