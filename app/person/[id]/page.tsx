import { getPersonDetails, getPersonCombinedCredits, getImageUrl } from "@/lib/api";
import MovieCard from "@/components/MovieCard/MovieCard";
import styles from "./page.module.css";
import { notFound } from "next/navigation";

export default async function PersonDetailsPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const resolvedParams = await params;
    const person = await getPersonDetails(resolvedParams.id);

    if (!person) {
        notFound();
    }

    const creditsData = await getPersonCombinedCredits(resolvedParams.id);
    const credits = creditsData.cast || [];

    // Filter out items without posters and deduplicate by ID
    const knownFor = credits
        .filter((c: any) => c.poster_path)
        .reduce((acc: any[], item: any) => {
            if (!acc.some((m) => m.id === item.id)) acc.push(item);
            return acc;
        }, [])
        .sort((a: any, b: any) => b.popularity - a.popularity)
        .slice(0, 16);

    const getAge = (birthday: string, deathday?: string) => {
        if (!birthday) return null;
        const birthDate = new Date(birthday);
        const endDate = deathday ? new Date(deathday) : new Date();
        let age = endDate.getFullYear() - birthDate.getFullYear();
        const m = endDate.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && endDate.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    };

    const age = getAge(person.birthday, person.deathday);

    return (
        <main className={styles.page}>
            <div className={styles.container}>

                {/* ── Person Header Profile ──────────────────────────────── */}
                <section className={styles.profileSection}>
                    <div className={styles.imageColumn}>
                        <img
                            src={getImageUrl(person.profile_path, "original")}
                            alt={person.name}
                            className={styles.profileImage}
                        />
                        <div className={styles.personalInfo}>
                            <h3>Informações Pessoais</h3>

                            {person.known_for_department && (
                                <div className={styles.infoBlock}>
                                    <strong>Conhecido(a) por</strong>
                                    <span>{person.known_for_department === 'Acting' ? 'Atuação' : person.known_for_department}</span>
                                </div>
                            )}

                            {person.birthday && (
                                <div className={styles.infoBlock}>
                                    <strong>Nascimento</strong>
                                    <span>
                                        {new Date(person.birthday).toLocaleDateString('pt-BR')}
                                        {age && !person.deathday ? ` (${age} anos)` : ''}
                                    </span>
                                </div>
                            )}

                            {person.deathday && (
                                <div className={styles.infoBlock}>
                                    <strong>Falecimento</strong>
                                    <span>
                                        {new Date(person.deathday).toLocaleDateString('pt-BR')}
                                        {age ? ` (${age} anos)` : ''}
                                    </span>
                                </div>
                            )}

                            {person.place_of_birth && (
                                <div className={styles.infoBlock}>
                                    <strong>Local de Nascimento</strong>
                                    <span>{person.place_of_birth}</span>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className={styles.bioColumn}>
                        <h1 className={styles.name}>{person.name}</h1>

                        <h2 className={styles.sectionHeading}>Biografia</h2>
                        <div className={styles.biography}>
                            {person.biography ? (
                                person.biography.split('\n').map((paragraph: string, i: number) => (
                                    paragraph.trim() ? <p key={i}>{paragraph}</p> : null
                                ))
                            ) : (
                                <p>Não temos uma biografia para {person.name}.</p>
                            )}
                        </div>

                        {/* Known For Grid */}
                        {knownFor.length > 0 && (
                            <div className={styles.knownForSection}>
                                <h2 className={styles.sectionHeading}>Conhecido(a) por</h2>
                                <div className={styles.grid}>
                                    {knownFor.map((movie: any) => (
                                        <MovieCard key={`${movie.media_type || 'movie'}-${movie.id}`} movie={movie} />
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </section>
            </div>
        </main>
    );
}
