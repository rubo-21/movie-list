import { GenreType } from './genreType';

export class Movie {
	id: number;
	key: string;
	name: string;
	description: string;
	genres: GenreType[];
	rate: string;
	length: string;
	img: string;
}
