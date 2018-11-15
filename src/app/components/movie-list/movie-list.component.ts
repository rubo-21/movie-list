import { Component, OnInit, OnDestroy } from '@angular/core';
import { MovieService } from 'src/app/core/services/movie.service';
import { Movie } from 'src/app/core/models/movie';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { Genre } from 'src/app/core/models/genreType';
import { AppState } from '../../core/redux/store/store';
import {  Subscription } from 'rxjs';

@Component({
	selector: 'app-movie-list',
	templateUrl: './movie-list.component.html',
	styleUrls: ['./movie-list.component.scss']
})
export class MovieListComponent implements OnInit, OnDestroy {
	movieStateSubscription: Subscription;
	movies: Movie[];
	isLoading = true;
	search: string;
	searchAutoComplete: string[];
	genres = Object.keys(Genre);
	selectedGenre = 'all';

	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private store: Store<AppState>,
		private movieService: MovieService,
	) {
		this.movieStateSubscription = this.store.select('movieState', 'movies')
			.subscribe(movies => {
				this.movies = movies;
				this.isLoading = false;
				this.updateAutoComplete();
			});
	}

	ngOnInit() {
		this.route.queryParams.subscribe((params) => {
			if (params.genre) {
				this.selectedGenre = params.genre;
				this.filterByGenre();
			} else {
				this.movieService.getMovies();
			}
		});
	}

	private updateAutoComplete() {
		this.searchAutoComplete = this.movies ? this.movies.map(movie => movie.name) : [];
	}

	filterByName(event: KeyboardEvent) {
		const input = (<HTMLInputElement>event.target).value;

		if (input) {
			this.movieService.filterMovies('name', input, true);
		} else {
			this.movieService.getMovies();
		}
	}

	filterByGenre() {
		const queryParams = Object.assign({}, this.route.snapshot.queryParams);

		if (this.selectedGenre === 'all') {
			delete queryParams.genre;
			this.movieService.getMovies();
		} else {
			queryParams.genre = this.selectedGenre;
			this.movieService.filterMovies('genres', this.selectedGenre);
		}

		this.router.navigate(['.'], { queryParams });
	}

	ngOnDestroy(): void {
		this.movieStateSubscription.unsubscribe();
	}
}
