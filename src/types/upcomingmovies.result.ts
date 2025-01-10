export interface IUpcomingMoviesResult {
    dates: Dates;
    page: number;
    results: Result[];
    total_pages: number;
    total_results: number;
}

export interface Dates {
    maximum: Date;
    minimum: Date;
}

export interface Result {
    adult: boolean;
    backdrop_path: string;
    genre_ids: number[];
    id: number;
    original_language: OriginalLanguage;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path?: string;
    release_date: Date;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
}

export enum OriginalLanguage {
    En = "en",
    Es = "es",
    Ja = "ja",
    Ko = "ko",
    Fr = "fr",
    Zh = "zh",
    Ru = "ru",
    De = "de",
    It = "it",
    Pt = "pt",
    Hi = "hi",
    He = "he",
    Fa = "fa",
    Ar = "ar",
    Tr = "tr",
    Th = "th",
    El = "el",
    Hu = "hu",
    Pl = "pl",
    Bn = "bn",
    Id = "id",
    Sr = "sr"
}

