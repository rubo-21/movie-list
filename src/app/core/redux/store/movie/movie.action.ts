import { Action } from '@ngrx/store';

export const LOAD_MOVIES = '[MOVIE] LOAD';
export const LOAD_SELECTED_MOVIE = '[MOVIE] Load Selected';
export const FILTER_MOVIES = '[MOVIE] Filter';

export class LoadMoviesAction implements Action {
	readonly type = LOAD_MOVIES;

	constructor() { }
}
export class LoadSelectedMovieAction implements Action {
	readonly type = LOAD_SELECTED_MOVIE;

	constructor(public payload: number) { }
}
export class FilterMoviesAction implements Action {
	readonly type = FILTER_MOVIES;

	constructor(public payload: { target: string, comparator: string, forceLowerCase: boolean }) { }
}

export type Actions = LoadMoviesAction | LoadSelectedMovieAction | FilterMoviesAction;
