import { TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';

import { MovieService } from './movie.service';
import { MockStore } from '../redux/store/store.mock';
import { AppState } from '../redux/store/store';
import * as movieActions from '../../core/redux/store/movie/movie.action';

describe('MovieService', () => {
	let store: MockStore<AppState>;
	beforeEach(() => TestBed.configureTestingModule({
		imports: [
			StoreModule.forRoot({})
		],
		providers: [
			{ provide: Store, useClass: MockStore }
		]
	}));

	it('should be created', () => {
		const service: MovieService = TestBed.get(MovieService);
		expect(service).toBeTruthy();
	});

	describe('getMovies', () => {
		it('should dispatch LoadMovies action', () => {
			const service: MovieService = TestBed.get(MovieService);
			store = TestBed.get(Store);
			spyOn(store, 'dispatch');
			service.getMovies();
			expect(store.dispatch).toHaveBeenCalledWith(new movieActions.LoadMoviesAction());
		});
	});

	describe('getMovieById', () => {
		it('should dispatch LoadSelectedMovie action by passing id', () => {
			const service: MovieService = TestBed.get(MovieService);
			const id = 1;
			store = TestBed.get(Store);
			spyOn(store, 'dispatch');
			service.getMovieById(id);
			expect(store.dispatch).toHaveBeenCalledWith(new movieActions.LoadSelectedMovieAction(id));
		});
	});


	describe('filterMovies', () => {
		it('should dispatch FilterMovies action by passing payload params', () => {
			const service: MovieService = TestBed.get(MovieService);
			const target = 'name';
			const comparator = 'test';
			store = TestBed.get(Store);
			spyOn(store, 'dispatch');
			service.filterMovies(target, comparator, false);
			expect(store.dispatch).toHaveBeenCalledWith(
				new movieActions.FilterMoviesAction({ target, comparator, forceLowerCase: false})
			);
		});
	});
});
