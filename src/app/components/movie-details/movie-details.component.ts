import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movie } from 'src/app/core/models/movie';

@Component({
	selector: 'app-movie-details',
	templateUrl: './movie-details.component.html',
	styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent implements OnInit {
	movie: Movie;

	constructor(
		private route: ActivatedRoute,
	) { }

	ngOnInit() {
		this.movie = this.route.snapshot.data.movie;
	}
}
