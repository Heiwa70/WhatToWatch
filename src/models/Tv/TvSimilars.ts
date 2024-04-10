export interface TvSimilars {
    page: number;
    results: {
        adult: boolean;
        backdrop_path: string | null;
        genre_ids: number[];
        id: number;
        original_language: string;
        original_name: string;
        overview: string;
        popularity: number;
        poster_path: string | null;
        first_air_date: string;
        name: string;
        vote_average: number;
        vote_count: number;
    }[];
    total_pages: number;
    total_results: number;
}