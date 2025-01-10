import { IPopularMovie } from "./popularmovie.model";

export interface IPopularMovieResult {
    page: number;
    results: Array<IPopularMovie>;
    total_pages: number;
    total_results: number;
}