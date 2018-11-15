import * as movieActions from './movie.action';
import * as reducers from '../reducers';
import { MovieState } from './movie.reducer';

describe('MoviesReducer', () => {
	describe('when there is no state', () => {
		it('should return the default state', () => {
			const { initialState } = reducers;
			const action = <movieActions.LoadMoviesAction>{};
			const state = reducers.movieReducer(undefined, action);

			expect(state).toBe(initialState);
		});
	});

	describe('LOAD_MOVIES action', () => {
		it('should set movies on state the state', () => {
			const { initialState } = reducers;
			const action = new movieActions.LoadMoviesAction();
			const state = reducers.movieReducer(initialState, action);

			expect(state).toEqual({
				allMovies: initialState.allMovies,
				movies: initialState.allMovies,
				selectedMovie: null,
			});
		});
	});

	describe('LOAD_SELECTED_MOVIE action', () => {
		let initialState: MovieState;
		let action: movieActions.LoadSelectedMovieAction;
		let state: MovieState;

		function initSpec(id: number) {
			initialState = reducers.initialState;
			action = new movieActions.LoadSelectedMovieAction(id);
			state = reducers.movieReducer(initialState, action);
		}

		it('should set selectedMovie on the state when proper id passed', () => {
			const id = 1;
			initSpec(id);

			expect(state).toEqual({
				allMovies: initialState.allMovies,
				movies: null,
				selectedMovie: initialState.allMovies[0],
			});
		});

		it('should set selectedMovie undefined on the state when wrong id passed', () => {
			const id = 999999999;
			initSpec(id);

			expect(state).toEqual({
				allMovies: initialState.allMovies,
				movies: null,
				selectedMovie: undefined,
			});
		});
	});

	describe('FILTER_MOVIES action', () => {
		let initialState: MovieState;
		let action: movieActions.FilterMoviesAction;
		let state: MovieState;

		function initSpec({
			target,
			comparator,
			forceLowerCase = true,
		}: any) {
			initialState = reducers.initialState;
			action = new movieActions.FilterMoviesAction({
				target,
				comparator,
				forceLowerCase,
			});
			state = reducers.movieReducer(initialState, action);
		}

		describe('when filtering by name', () => {
			it('should set filtered movies on the state based on payload', () => {
				const target = 'name';
				const comparator = 'deadpool';

				initSpec({ target, comparator });

				expect(state).toEqual({
					allMovies: initialState.allMovies,
					movies: [
						{
							id: 1,
							key: 'deadpool',
							name: 'Deadpool',
							description:  `A former Special Forces operative turned mercenary is subjected to
			 a rogue experiment that leaves him with accelrated healing powers, adopting the alter ego Deadpool.`,
							genres: [
								'action',
								'adventure',
								'comedy'
							],
							rate: '8.6',
							length: '1hr 48mins',
							img: 'deadpool.jpg'
						}
					],
					selectedMovie: null,
				});
			});

			it('should set movies as empty array on the state if no match', () => {
				const target = 'name';
				const comparator = 'somethingUnknown';
				initSpec({ target, comparator });

				expect(state).toEqual({
					allMovies: initialState.allMovies,
					movies: [],
					selectedMovie: null,
				});
			});
		});

		describe('when filtering by genre', () => {
			it('should set filtered movies on the state', () => {
				const target = 'genres';
				const comparator = 'history';
				initSpec({ target, comparator });

				expect(state).toEqual({
					allMovies: initialState.allMovies,
					movies: [
						{
							id: 3,
							key: 'straight-outta-compton',
							name: 'Straight Outta Compton',
							description: `The group NWA emerges from the mean streets of Compton in Los Angeles,
			 California, in the mid-1980s and revolutionizes Hip Hop culture with their music and tales about life in the hood.`,
							genres: [
								'biography',
								'drama',
								'history'
							],
							rate: '8.0',
							length: '2hr 27mins',
							img: 'straight-outta-compton.jpg'
						}
					],
					selectedMovie: null,
				});
			});
		});

	});
});
