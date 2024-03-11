export interface TvProviders {
    id: number;
    results: {
        [country: string]: {
            link: string;
            buy: {
                logo_path: string;
                provider_id: number;
                provider_name: string;
                display_priority: number;
            }[];
        };
    };
}