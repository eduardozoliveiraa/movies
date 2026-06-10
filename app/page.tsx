import HeroBanner from "@/components/HeroBanner/HeroBanner";
import MovieCarousel from "@/components/MovieCarousel/MovieCarousel";
import { getTrending, getTopRatedMovies, getActionMovies, getComedyMovies, getImageUrl } from "@/lib/api";
import styles from "./page.module.css";

export default async function Home() {
  const [trending, topRated, action, comedy] = await Promise.all([
    getTrending(),
    getTopRatedMovies(),
    getActionMovies(),
    getComedyMovies(),
  ]);

  const featuredMovie = trending[0];

  return (
    <main className={styles.main}>
      {featuredMovie && (
        <HeroBanner
          id={featuredMovie.id}
          mediaType={featuredMovie.media_type || "movie"}
          title={featuredMovie.title || featuredMovie.name || "Sem Título"}
          description={featuredMovie.overview}
          backdropUrl={getImageUrl(featuredMovie.backdrop_path, "original")}
        />
      )}

      <div style={{ marginTop: "-100px", zIndex: 10, position: "relative" }}>
        <MovieCarousel title="Em Alta" movies={trending} />
        <MovieCarousel title="Melhores Avaliados" movies={topRated} />
        <MovieCarousel title="Ação" movies={action} />
        <MovieCarousel title="Comédias" movies={comedy} />
      </div>
    </main>
  );
}
