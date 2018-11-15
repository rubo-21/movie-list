import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';

import { MovieListComponent } from './movie-list.component';
import { MovieComponent } from '../movie/movie.component';
import { SearchComponent } from '../search/search.component';
import { MovieService } from '../../core/services/movie.service';
import { ActivatedRoute, Router } from '@angular/router';

describe('MovieListComponent', () => {
	let component: MovieListComponent;
	let fixture: ComponentFixture<MovieListComponent>;
	let debugElement: DebugElement;
	let movieService: MovieService;
	let activatedRouteMock;
	let mockRouter;

	function initModule(queryParams = {}) {
		TestBed.resetTestingModule();
		mockRouter = {
			navigate: jasmine.createSpy('navigate'),
		};
		activatedRouteMock = {
			queryParams: {
				subscribe: (fn: (value) => void) => fn(queryParams),
			},
			snapshot: {
				queryParams,
			}
		};
		TestBed.configureTestingModule({
			declarations: [
				MovieListComponent,
				SearchComponent,
				MovieComponent,
			],
			imports: [
				FormsModule,
				RouterTestingModule.withRoutes([]),
				StoreModule.forRoot({}),
			],
			providers: [
				MovieService,
				{
					provide: ActivatedRoute,
					useValue: activatedRouteMock,
				},
				{ provide: Router, useValue: mockRouter },
			],
		})
			.compileComponents();

		fixture = TestBed.createComponent(MovieListComponent);
		component = fixture.componentInstance;
		debugElement = fixture.debugElement;
		movieService = debugElement.injector.get(MovieService);
		fixture.detectChanges();
	}

	it('should create', () => {
		initModule();
		expect(component).toBeTruthy();
	});

	it('should set isLoading to false', () => {
		initModule();
		expect(component.isLoading).toBeFalsy();
	});

	it('should set searchAutoComplete on component', () => {
		initModule();
		expect(component.searchAutoComplete).toEqual([]);
	});

	it('should set movies', () => {
		initModule();
		expect(component.movies).toBe(undefined);
	});

	describe('ngOnInit', () => {
		describe('when genre exists on params', () => {
			beforeEach(() => {
				initModule({
					genre: 'actions'
				});
				spyOn(component, 'filterByGenre');
				component.ngOnInit();
			});
			it('should set selectedGenre', () => {
				expect(component.selectedGenre).toBe('actions');
			});
			it('should call filterByGenre', () => {
				expect(component.filterByGenre).toHaveBeenCalled();
			});
		});

		describe('when genre doesnt exists on params', () => {
			beforeEach(() => {
				initModule();
				spyOn(movieService, 'getMovies');
				component.ngOnInit();
			});
			it('should call movieService.getMovies', () => {
				expect(movieService.getMovies).toHaveBeenCalled();
			});
		});
	});

	describe('filterByName', () => {
		function initSpec(input: string = '') {
			initModule();
			spyOn(movieService, 'getMovies');
			spyOn(movieService, 'filterMovies');
			component.filterByName(<any>{
				target: {
					value: input,
				}
			});
		}

		it('should call movieService.getMovies when input is empty', () => {
			initSpec();
			expect(movieService.getMovies).toHaveBeenCalled();
		});

		it('should call movieService.filterMovies when input is NOT empty', () => {
			initSpec('deadpool');
			expect(movieService.filterMovies).toHaveBeenCalledWith('name', 'deadpool', true);
		});
	});

	describe('filterByGenre', () => {
		function initSpec(selectedGenre: string, queryParams = {}) {
			// fixture = TestBed.createComponent(MovieListComponent);
			// component = fixture.componentInstance;
			// debugElement = fixture.debugElement;
			// movieService = debugElement.injector.get(MovieService);
			// fixture.detectChanges();
			initModule(queryParams);
			spyOn(movieService, 'getMovies');
			spyOn(movieService, 'filterMovies');
			component.selectedGenre = selectedGenre;
			component.filterByGenre();
		}

		describe('when selectedGenre is all', () => {
			beforeEach(() => {
				const selectedGenre = 'all';
				const queryParams = {
					genre: 'action',
				};
				initSpec(selectedGenre, queryParams);
			});
			it('should remove propery genre from queryParams', () => {
				expect(mockRouter.navigate).toHaveBeenCalledWith(['.'], {
					queryParams: {}
				});
			});

			it('should call movieService.getMovies when  is all', () => {
				expect(movieService.getMovies).toHaveBeenCalled();
			});
		});

		describe('when selectedGenre is different than all', () => {
			beforeEach(() => {
				const selectedGenre = 'history';
				const queryParams = {
					genre: 'action',
				};
				initSpec(selectedGenre, queryParams);
			});
			it('should set propery genre on queryParams', () => {
				expect(mockRouter.navigate).toHaveBeenCalledWith(['.'], {
					queryParams: {
						genre: 'history',
					}
				});
			});

			it('should call movieService.getMovies when selectedGenre is different', () => {
				expect(movieService.filterMovies).toHaveBeenCalledWith('genres', 'history');
			});
		});
	});

	describe('ngOnDestroy', () => {
		beforeEach(() => {
			initModule();
			spyOn(component.movieStateSubscription, 'unsubscribe');
			component.ngOnDestroy();
		});

		it('should call movieStateSubscription.unsubscribe', () => {
			expect(component.movieStateSubscription.unsubscribe).toHaveBeenCalled();
		});
	});
});
