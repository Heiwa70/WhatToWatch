export interface Discover {
    filters: {
        include_adult: string;
        include_video: string;
        language: string;
        page: string;
        sort_by: string;
        [key: string]: string; // Pour les filtres supplémentaires
    };
}