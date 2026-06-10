export interface Movie {
  id: number;
  title?: string;
  name?: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  vote_average: number;
  release_date?: string;
  first_air_date?: string;
  media_type?: 'movie' | 'tv';
}

const TMDB_API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

async function fetchFromTMDB(endpoint: string, params: Record<string, string> = {}) {
  if (!TMDB_API_KEY) {
    return { results: getMockMovies() };
  }

  const queryParams = new URLSearchParams({
    api_key: TMDB_API_KEY,
    language: 'pt-BR',
    ...params,
  });

  const response = await fetch(`${BASE_URL}${endpoint}?${queryParams}`, {
    next: { revalidate: 3600 }
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch TMDB data: ${response.statusText}`);
  }

  return response.json();
}

export async function getTrending(): Promise<Movie[]> {
  const data = await fetchFromTMDB('/trending/all/day');
  return data.results;
}

export async function getTopRatedMovies(): Promise<Movie[]> {
  if (!TMDB_API_KEY) {
    // Return a reversed view so it looks different from trending
    return [...premiumMocks].reverse();
  }
  const data = await fetchFromTMDB('/movie/top_rated');
  return data.results;
}

export async function getActionMovies(): Promise<Movie[]> {
  if (!TMDB_API_KEY) {
    return premiumMocks.filter(m => m.media_type === 'movie').sort((a, b) => b.vote_average - a.vote_average);
  }
  const data = await fetchFromTMDB('/discover/movie', { with_genres: '28' });
  return data.results;
}

export async function getComedyMovies(): Promise<Movie[]> {
  if (!TMDB_API_KEY) {
    return premiumMocks.filter(m => m.media_type === 'tv').concat(premiumMocks.filter(m => m.media_type === 'movie').slice(0, 5));
  }
  const data = await fetchFromTMDB('/discover/movie', { with_genres: '35' });
  return data.results;
}

// picsum.photos gives deterministic images by seed (never breaks, no CORS)
function img(seed: number, w = 400, h = 600) {
  return `https://picsum.photos/seed/${seed}/${w}/${h}`;
}

// ─── Premium Mock Catalogue ─────────────────────────────────────────────────
const premiumMocks: Movie[] = [
  {
    id: 1, title: "Dune: Part Two", media_type: "movie",
    overview: "Paul Atreides unites with Chani and the Fremen while on a warpath of revenge against the conspirators who destroyed his family.",
    poster_path: img(101), backdrop_path: img(102, 1200, 800),
    vote_average: 8.8, release_date: "2024-02-27",
  },
  {
    id: 2, title: "The Batman", media_type: "movie",
    overview: "In his second year of fighting crime, Batman uncovers corruption in Gotham City that connects to his own family while facing a serial killer known as the Riddler.",
    poster_path: img(201), backdrop_path: img(202, 1200, 800),
    vote_average: 8.5, release_date: "2022-03-01",
  },
  {
    id: 3, title: "Oppenheimer", media_type: "movie",
    overview: "The story of J. Robert Oppenheimer's role in the development of the atomic bomb during World War II.",
    poster_path: img(301), backdrop_path: img(302, 1200, 800),
    vote_average: 8.9, release_date: "2023-07-19",
  },
  {
    id: 4, title: "Spider-Man: Across the Spider-Verse", media_type: "movie",
    overview: "Miles Morales catapults across the Multiverse, where he encounters a team of Spider-People charged with protecting its very existence.",
    poster_path: img(401), backdrop_path: img(402, 1200, 800),
    vote_average: 8.8, release_date: "2023-05-31",
  },
  {
    id: 5, name: "Arcane", media_type: "tv",
    overview: "Amid the stark discord of twin cities Piltover and Zaun, two sisters fight on rival sides of a war between magic technologies and clashing convictions.",
    poster_path: img(501), backdrop_path: img(502, 1200, 800),
    vote_average: 9.1, first_air_date: "2021-11-06",
  },
  {
    id: 6, title: "Interstellar", media_type: "movie",
    overview: "The adventures of a group of explorers who make use of a newly discovered wormhole to surpass the limitations on human space travel.",
    poster_path: img(601), backdrop_path: img(602, 1200, 800),
    vote_average: 8.6, release_date: "2014-11-05",
  },
  {
    id: 7, name: "Stranger Things", media_type: "tv",
    overview: "When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces and one strange little girl.",
    poster_path: img(701), backdrop_path: img(702, 1200, 800),
    vote_average: 8.6, first_air_date: "2016-07-15",
  },
  {
    id: 8, title: "John Wick: Chapter 4", media_type: "movie",
    overview: "With the price on his head ever increasing, John Wick uncovers a path to defeating The High Table.",
    poster_path: img(801), backdrop_path: img(802, 1200, 800),
    vote_average: 8.4, release_date: "2023-03-22",
  },
  {
    id: 9, title: "Blade Runner 2049", media_type: "movie",
    overview: "Thirty years after the events of the first film, a new blade runner, LAPD Officer K, unearths a long-buried secret that has the potential to plunge society into chaos.",
    poster_path: img(901), backdrop_path: img(902, 1200, 800),
    vote_average: 8.4, release_date: "2017-10-04",
  },
  {
    id: 10, name: "Cyberpunk: Edgerunners", media_type: "tv",
    overview: "In a dystopia riddled with corruption and cybernetic implants, a talented but reckless street kid strives to become a mercenary outlaw, also known as an edgerunner.",
    poster_path: img(1001), backdrop_path: img(1002, 1200, 800),
    vote_average: 8.6, first_air_date: "2022-09-13",
  },
];

// ─── Unique cast per movie ────────────────────────────────────────────────────
const castData: Record<number, Array<{ id: number; name: string; character: string; profile_path: string }>> = {
  1: [
    { id: 101, name: "Timothée Chalamet", character: "Paul Atreides", profile_path: img(1011, 200, 200) },
    { id: 102, name: "Zendaya", character: "Chani", profile_path: img(1012, 200, 200) },
    { id: 103, name: "Rebecca Ferguson", character: "Lady Jessica", profile_path: img(1013, 200, 200) },
    { id: 104, name: "Austin Butler", character: "Feyd-Rautha", profile_path: img(1014, 200, 200) },
    { id: 105, name: "Florence Pugh", character: "Princess Irulan", profile_path: img(1015, 200, 200) },
  ],
  2: [
    { id: 201, name: "Robert Pattinson", character: "Bruce Wayne / Batman", profile_path: img(2011, 200, 200) },
    { id: 202, name: "Zoë Kravitz", character: "Selina Kyle", profile_path: img(2012, 200, 200) },
    { id: 203, name: "Paul Dano", character: "The Riddler", profile_path: img(2013, 200, 200) },
    { id: 204, name: "Colin Farrell", character: "Oswald Cobblepot", profile_path: img(2014, 200, 200) },
    { id: 205, name: "Jeffrey Wright", character: "James Gordon", profile_path: img(2015, 200, 200) },
  ],
  3: [
    { id: 301, name: "Cillian Murphy", character: "J. Robert Oppenheimer", profile_path: img(3011, 200, 200) },
    { id: 302, name: "Emily Blunt", character: "Katherine Oppenheimer", profile_path: img(3012, 200, 200) },
    { id: 303, name: "Matt Damon", character: "Leslie Groves", profile_path: img(3013, 200, 200) },
    { id: 304, name: "Robert Downey Jr.", character: "Lewis Strauss", profile_path: img(3014, 200, 200) },
    { id: 305, name: "Florence Pugh", character: "Jean Tatlock", profile_path: img(3015, 200, 200) },
  ],
  4: [
    { id: 401, name: "Shameik Moore", character: "Miles Morales", profile_path: img(4011, 200, 200) },
    { id: 402, name: "Hailee Steinfeld", character: "Gwen Stacy", profile_path: img(4012, 200, 200) },
    { id: 403, name: "Oscar Isaac", character: "Miguel O'Hara / Spider-Man 2099", profile_path: img(4013, 200, 200) },
    { id: 404, name: "Issa Rae", character: "Jessica Drew / Spider-Woman", profile_path: img(4014, 200, 200) },
    { id: 405, name: "Jake Johnson", character: "Peter B. Parker", profile_path: img(4015, 200, 200) },
  ],
  5: [
    { id: 501, name: "Ella Purnell", character: "Jinx", profile_path: img(5011, 200, 200) },
    { id: 502, name: "Katie Leung", character: "Caitlyn", profile_path: img(5012, 200, 200) },
    { id: 503, name: "Kevin Alejandro", character: "Jayce", profile_path: img(5013, 200, 200) },
    { id: 504, name: "Jason Spisak", character: "Silco", profile_path: img(5014, 200, 200) },
    { id: 505, name: "Hailee Steinfeld", character: "Vi", profile_path: img(5015, 200, 200) },
  ],
  6: [
    { id: 601, name: "Matthew McConaughey", character: "Cooper", profile_path: img(6011, 200, 200) },
    { id: 602, name: "Anne Hathaway", character: "Amelia Brand", profile_path: img(6012, 200, 200) },
    { id: 603, name: "Jessica Chastain", character: "Murph (Adult)", profile_path: img(6013, 200, 200) },
    { id: 604, name: "Michael Caine", character: "Professor Brand", profile_path: img(6014, 200, 200) },
    { id: 605, name: "Matt Damon", character: "Dr. Mann", profile_path: img(6015, 200, 200) },
  ],
  7: [
    { id: 701, name: "Millie Bobby Brown", character: "Eleven", profile_path: img(7011, 200, 200) },
    { id: 702, name: "Finn Wolfhard", character: "Mike Wheeler", profile_path: img(7012, 200, 200) },
    { id: 703, name: "Winona Ryder", character: "Joyce Byers", profile_path: img(7013, 200, 200) },
    { id: 704, name: "David Harbour", character: "Jim Hopper", profile_path: img(7014, 200, 200) },
    { id: 705, name: "Sadie Sink", character: "Max Mayfield", profile_path: img(7015, 200, 200) },
  ],
  8: [
    { id: 801, name: "Keanu Reeves", character: "John Wick", profile_path: img(8011, 200, 200) },
    { id: 802, name: "Donnie Yen", character: "Caine", profile_path: img(8012, 200, 200) },
    { id: 803, name: "Bill Skarsgård", character: "Marquis de Gramont", profile_path: img(8013, 200, 200) },
    { id: 804, name: "Laurence Fishburne", character: "The Bowery King", profile_path: img(8014, 200, 200) },
    { id: 805, name: "Ian McShane", character: "Winston", profile_path: img(8015, 200, 200) },
  ],
  9: [
    { id: 901, name: "Ryan Gosling", character: "Officer K", profile_path: img(9011, 200, 200) },
    { id: 902, name: "Ana de Armas", character: "Joi", profile_path: img(9012, 200, 200) },
    { id: 903, name: "Harrison Ford", character: "Rick Deckard", profile_path: img(9013, 200, 200) },
    { id: 904, name: "Robin Wright", character: "Lt. Joshi", profile_path: img(9014, 200, 200) },
    { id: 905, name: "Jared Leto", character: "Niander Wallace", profile_path: img(9015, 200, 200) },
  ],
  10: [
    { id: 1001, name: "Zach Aguilar", character: "David Martinez", profile_path: img(10011, 200, 200) },
    { id: 1002, name: "Emily Carey", character: "Lucy", profile_path: img(10012, 200, 200) },
    { id: 1003, name: "William Christopher Stephens", character: "Maine", profile_path: img(10013, 200, 200) },
    { id: 1004, name: "Emi Lo", character: "Kiwi", profile_path: img(10014, 200, 200) },
    { id: 1005, name: "Gianni Matragrano", character: "Dorio", profile_path: img(10015, 200, 200) },
  ],
};

function getMockMovies(): Movie[] {
  return premiumMocks;
}

export function getImageUrl(path: string | null, size: "w500" | "original" | "w200" = "w500"): string {
  if (!path) return img(999, 400, 600);
  if (path.startsWith('http')) return path;
  return `https://image.tmdb.org/t/p/${size}${path}`;
}

export async function searchMovies(query: string): Promise<Movie[]> {
  if (!query) return [];

  if (!TMDB_API_KEY) {
    const lq = query.toLowerCase();
    return premiumMocks.filter(m =>
      m.title?.toLowerCase().includes(lq) ||
      m.name?.toLowerCase().includes(lq)
    );
  }

  const data = await fetchFromTMDB('/search/multi', { query });
  return data.results.filter((item: any) => item.media_type === 'movie' || item.media_type === 'tv');
}

export async function getMovieDetails(id: string, type: 'movie' | 'tv' = 'movie') {
  if (!TMDB_API_KEY) {
    const numId = parseInt(id);
    const movie = premiumMocks.find(m => m.id === numId) ?? premiumMocks[0];
    const cast = castData[movie.id] ?? castData[1];

    // Real trailer keys for each movie (official YouTube IDs)
    const trailerKeys: Record<number, string> = {
      1: "U2Qp5pL3ovA",   // Dune Part Two
      2: "mqqft2x_Aa4",   // The Batman
      3: "uYPbbksJxIg",   // Oppenheimer
      4: "cqGjhVmlZtA",   // Spider-Man: Across the Spider-Verse
      5: "fXmAurh012s",   // Arcane
      6: "zSWdZVtXT7E",   // Interstellar
      7: "b9EkMc79ZSU",   // Stranger Things
      8: "qEVUtrk8_B4",   // John Wick 4
      9: "gCcx85zbxz4",   // Blade Runner 2049
      10: "nnrKXZNPgTM",  // Cyberpunk Edgerunners
    };

    const mockVideos = {
      results: [{ key: trailerKeys[movie.id] ?? trailerKeys[1], type: "Trailer", site: "YouTube" }]
    };

    return {
      ...movie,
      runtime: 145,
      tagline: "A lenda continua.",
      genres: [{ id: 878, name: 'Ficção Científica' }, { id: 28, name: 'Ação' }, { id: 18, name: 'Drama' }],
      credits: { cast },
      videos: mockVideos,
    };
  }

  const queryParams = new URLSearchParams({
    api_key: TMDB_API_KEY,
    language: 'pt-BR',
    append_to_response: 'videos,credits'
  });

  const response = await fetch(`${BASE_URL}/${type}/${id}?${queryParams}`, {
    next: { revalidate: 3600 }
  });

  if (!response.ok) return null;

  return response.json();
}

// ─── Person & Genre API endpoints ──────────────────────────────────────────

export async function getPersonDetails(id: string) {
  if (!TMDB_API_KEY) {
    const numId = parseInt(id) || 101;
    let personMatch = null;
    let fallbackPerson = null;
    
    for (const movieId in castData) {
      const castMatch = castData[movieId].find(c => c.id === numId);
      if (castMatch && !personMatch) personMatch = castMatch;
      if (castData[movieId][0] && !fallbackPerson) fallbackPerson = castData[movieId][0];
    }
    
    return {
      id: numId,
      name: personMatch?.name || fallbackPerson?.name || "Ator Desconhecido",
      profile_path: personMatch?.profile_path || fallbackPerson?.profile_path || img(99),
      biography: "Este(a) é um(a) ator/atriz brilhantemente talentoso(a) conhecido(a) por suas atuações carismáticas em inúmeros sucessos de bilheteria. Originalmente alcançando a fama através de filmes independentes aclamados pela crítica, sua dedicação e alcance versátil os consolidaram como uma figura amada no cinema hoje.\n\nEles ganharam inúmeros prêmios e continuam a superar limites com cada novo papel.",
      birthday: "1980-05-15",
      place_of_birth: "New York, USA",
      known_for_department: "Acting",
    };
  }

  const queryParams = new URLSearchParams({
    api_key: TMDB_API_KEY,
    language: 'pt-BR'
  });

  const response = await fetch(`${BASE_URL}/person/${id}?${queryParams}`, {
    next: { revalidate: 3600 }
  });

  if (!response.ok) return null;
  return response.json();
}

export async function getPersonCombinedCredits(id: string) {
  if (!TMDB_API_KEY) {
    return {
      cast: [...premiumMocks].sort(() => 0.5 - Math.random()).slice(0, 8)
    };
  }

  const queryParams = new URLSearchParams({
    api_key: TMDB_API_KEY,
    language: 'pt-BR'
  });

  const response = await fetch(`${BASE_URL}/person/${id}/combined_credits?${queryParams}`, {
    next: { revalidate: 3600 }
  });

  if (!response.ok) return { cast: [] };
  return response.json();
}

export async function getGenres(type: 'movie' | 'tv' = 'movie') {
  if (!TMDB_API_KEY) {
    return {
      genres: [
        { id: 28, name: "Ação" },
        { id: 12, name: "Aventura" },
        { id: 16, name: "Animação" },
        { id: 35, name: "Comédia" },
        { id: 80, name: "Crime" },
        { id: 99, name: "Documentário" },
        { id: 18, name: "Drama" },
        { id: 10751, name: "Família" },
        { id: 14, name: "Fantasia" },
        { id: 36, name: "História" },
        { id: 27, name: "Terror" },
        { id: 10402, name: "Música" },
        { id: 9648, name: "Mistério" },
        { id: 10749, name: "Romance" },
        { id: 878, name: "Ficção Científica" },
      ]
    };
  }

  const queryParams = new URLSearchParams({
    api_key: TMDB_API_KEY,
    language: 'en-US'
  });

  const response = await fetch(`${BASE_URL}/genre/${type}/list?${queryParams}`, {
    next: { revalidate: 3600 }
  });

  if (!response.ok) return { genres: [] };
  return response.json();
}

export async function getMoviesByGenre(genreId: string, type: 'movie' | 'tv' = 'movie') {
  if (!TMDB_API_KEY) {
    const gId = parseInt(genreId);
    let mocks = premiumMocks.filter(m => m.media_type === type);
    if (gId === 35) {
       return [...mocks].reverse(); 
    }
    return mocks;
  }

  const queryParams = new URLSearchParams({
    api_key: TMDB_API_KEY,
    language: 'pt-BR',
    with_genres: genreId
  });

  const response = await fetch(`${BASE_URL}/discover/${type}?${queryParams}`, {
    next: { revalidate: 3600 }
  });

  if (!response.ok) return { results: [] };
  const data = await response.json();
  return data.results;
}
