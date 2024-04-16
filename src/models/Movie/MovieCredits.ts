export interface MovieCredits {
    id: number;
    cast: {
        adult: boolean;
        gender: number;
        id: number;
        known_for_department: string;
        name: string;
        original_name: string;
        popularity: number;
        profile_path: string;
        cast_id: number;
        character: string;
        credit_id: string;
        order: number;
        job: string;
    }[];
}

export interface MovieCreditsResponse {
    id: number;
    cast: MovieCredits[];
}