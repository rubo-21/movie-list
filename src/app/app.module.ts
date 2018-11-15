import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import * as reducers from './core/redux/store/reducers';
import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { MovieComponent } from './components/movie/movie.component';
import { MovieListComponent } from './components/movie-list/movie-list.component';
import { MovieDetailsComponent } from './components/movie-details/movie-details.component';
import { HeaderComponent } from './components/header/header.component';
import { SearchComponent } from './components/search/search.component';

@NgModule({
	declarations: [
		AppComponent,
		MovieComponent,
		MovieListComponent,
		MovieDetailsComponent,
		HeaderComponent,
		SearchComponent,
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		FormsModule,
		CoreModule,
		StoreModule.forRoot({
			movieState: reducers.movieReducer,
		}),
		StoreDevtoolsModule.instrument({
			maxAge: 25,
			logOnly: environment.production,
		}),
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
