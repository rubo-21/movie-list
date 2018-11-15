export enum Genre {
	Action = 'action',
	Adventure = 'adventure',
	Biography = 'biography',
	Comedy = 'comedy',
	Crime = 'crime',
	Drama = 'drama',
	History = 'history',
	Mystery = 'mystery',
	Scifi = 'scifi',
	Sport = 'sport',
	Thriller = 'thriller'
}

type valueOf<T> = T[keyof T];

export type GenreType = valueOf<Genre>;
