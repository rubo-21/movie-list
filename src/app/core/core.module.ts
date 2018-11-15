import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieService } from './services/movie.service';
import { MovieResolver } from './resolvers/movie.resolver';

@NgModule({
	declarations: [],
	providers: [
		MovieService,
		MovieResolver,
	],
	imports: [
		CommonModule,
	],
	exports: []
})
export class CoreModule {
	constructor(@Optional() @SkipSelf() core: CoreModule) {
		if (core) {
			throw new Error('Core module can be loaded only once');
		}
	}
}
