export interface ProvidersMovie {
    results: {
        display_priorities: {
            [country: string]: number;
        };
    }[];
}