"use client";

import { Plus, Check } from "lucide-react";
import { Movie } from "@/lib/api";
import { useFavorites } from "@/context/FavoritesContext";

interface FavoriteButtonProps {
    movie: Movie;
    className?: string;
}

export default function FavoriteButton({ movie, className }: FavoriteButtonProps) {
    const { isFavorite, addFavorite, removeFavorite } = useFavorites();
    const favorite = isFavorite(movie.id);

    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault();
        if (favorite) {
            removeFavorite(movie.id);
        } else {
            addFavorite(movie);
        }
    };

    return (
        <button className={className} onClick={handleClick}>
            {favorite ? (
                <>
                    <Check size={20} color="#45a29e" />
                    Remove from My List
                </>
            ) : (
                <>
                    <Plus size={20} />
                    Add to My List
                </>
            )}
        </button>
    );
}
