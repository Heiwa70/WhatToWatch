export interface TvAggregateCredits {
    cast: {
        adult: boolean;
        gender : number;
        id : number;
        known_for_department : string;
        name : string;
        original_name : string;
        popularity : number;
        profile_path : string;
        roles : {
            credit_id : string;
            character : string;
            episode_count : number;
        }[];
        total_episode_count : number;
        order : number;
    }[];
}