import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MovieListComponent } from './components/movie-list/movie-list.component';
import { MovieDetailsComponent } from './components/movie-details/movie-details.component';
import { MovieResolver } from './core/resolvers/movie.resolver';

const routes: Routes = [
	{
		path: '',
		component: MovieListComponent,
		pathMatch: 'full',
	},
	{
		path: 'movie/:title/:id',
		component: MovieDetailsComponent,
		resolve: { movie: MovieResolver },
	},
	{ path: '**', redirectTo: '/' },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
