interface TrendingPeople {
    page: number;
    results: {
        adult: boolean;
        id : number;
        name : string;
        original_name : string;
        popularity : number;
        gender : number;
        known_for_department : string;
        profile_path : string;
        known_for : {
            adult: boolean;
            backdrop_path: string;
            id: number;
            title: string;
            original_language: string;
            original_title: string;
            overview: string;
            poster_path: string;
            media_type: string;
            genre_ids: number[];
            popularity: number;
            release_date: string;
            video: boolean;
            vote_average: number;
            vote_count: number;
        }[];
    }[];
}