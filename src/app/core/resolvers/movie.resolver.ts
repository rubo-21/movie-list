import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, filter, take } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AppState } from '../redux/store/store';
import { MovieService } from '../services/movie.service';
import { Movie } from '../models/movie';

@Injectable()
export class MovieResolver implements Resolve<Movie> {
	constructor(
		private router: Router,
		private store: Store<AppState>,
		private movieService: MovieService,
	) { }

	private isNubmer(n) {
		return !isNaN(parseFloat(n)) && isFinite(n);
	}

	private handleError() {
		this.router.navigate(['/']);
	}

	loadMovie(id: number) {
		this.movieService.getMovieById(id);
	}

	resolve(
		route: ActivatedRouteSnapshot,
	): Observable<Movie> {
		const id = parseInt(route.params.id, 10);

		if (!this.isNubmer(id)) {
			this.handleError();
			return of(null);
		} else {
			this.loadMovie(id);

			return this.store.select('movieState', 'selectedMovie')
				.pipe(
					filter(selectedMovie => !!selectedMovie),
					take(1),
					catchError(() => {
						this.handleError();
						return of(null);
					})
				);
		}

	}
}
