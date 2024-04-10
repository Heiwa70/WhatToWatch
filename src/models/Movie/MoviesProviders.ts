export interface MovieProviders {
    id: number;
    results: {
        [key: string]: {
            link: string;
            flatrate: {
                logo_path: string;
                provider_id: number;
                provider_name: string;
                display_priority: number;
            }[];
        };
    };
}