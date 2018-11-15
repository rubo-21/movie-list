import * as movieActions from './movie.action';

describe('LoadMovies', () => {
	it('should create an action', () => {
		const action = new movieActions.LoadMoviesAction();

		expect({ ...action }).toEqual({ type: movieActions.LOAD_MOVIES });
	});
});

describe('LoadSelectedMovie', () => {
	it('should create an action', () => {
		const id = 1;
		const action = new movieActions.LoadSelectedMovieAction(id);

		expect({ ...action }).toEqual({
			type: movieActions.LOAD_SELECTED_MOVIE,
			payload: 1,
		});
	});
});

describe('FilterMovie', () => {
	it('should create an action', () => {
		const target = 'name';
		const comparator = 'test';
		const forceLowerCase = false;
		const action = new movieActions.FilterMoviesAction({
			target,
			comparator,
			forceLowerCase,
		});

		expect({ ...action }).toEqual({
			type: movieActions.FILTER_MOVIES,
			payload: {
				target,
				comparator,
				forceLowerCase,
			}
		});
	});
});
