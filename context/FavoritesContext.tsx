"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Movie } from "@/lib/api";

interface FavoritesContextType {
    favorites: Movie[];
    addFavorite: (movie: Movie) => void;
    removeFavorite: (id: number) => void;
    isFavorite: (id: number) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export function FavoritesProvider({ children }: { children: ReactNode }) {
    const [favorites, setFavorites] = useState<Movie[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        // Load from local storage on mount
        const stored = localStorage.getItem("movieApp_favorites");
        if (stored) {
            try {
                setFavorites(JSON.parse(stored));
            } catch (e) {
                console.error("Failed to parse favorites from local storage", e);
            }
        }
        setIsLoaded(true);
    }, []);

    useEffect(() => {
        // Save to local storage whenever favorites change
        if (isLoaded) {
            localStorage.setItem("movieApp_favorites", JSON.stringify(favorites));
        }
    }, [favorites, isLoaded]);

    const addFavorite = (movie: Movie) => {
        setFavorites((prev) => {
            if (prev.some((m) => m.id === movie.id)) return prev;
            return [...prev, movie];
        });
    };

    const removeFavorite = (id: number) => {
        setFavorites((prev) => prev.filter((m) => m.id !== id));
    };

    const isFavorite = (id: number) => {
        return favorites.some((m) => m.id === id);
    };

    return (
        <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite }}>
            {children}
        </FavoritesContext.Provider>
    );
}

export function useFavorites() {
    const context = useContext(FavoritesContext);
    if (context === undefined) {
        throw new Error("useFavorites must be used within a FavoritesProvider");
    }
    return context;
}
