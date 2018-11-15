import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../core/redux/store/store';
import * as movieActions from '../../core/redux/store/movie/movie.action';

@Injectable({
	providedIn: 'root'
})
export class MovieService {
	constructor(
		private store: Store<AppState>,
	) { }

	getMovies(): void {
		this.store.dispatch(new movieActions.LoadMoviesAction());
	}

	getMovieById(id: number): void {
		this.store.dispatch(new movieActions.LoadSelectedMovieAction(id));
	}

	filterMovies(target: string, comparator: string, forceLowerCase: boolean = false): void {
		this.store.dispatch(new movieActions.FilterMoviesAction({ target, comparator, forceLowerCase}));
	}
}
