import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MovieComponent } from './movie.component';

describe('MovieComponent', () => {
	let component: MovieComponent;
	let fixture: ComponentFixture<MovieComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			imports: [RouterTestingModule],
			declarations: [MovieComponent]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(MovieComponent);
		component = fixture.componentInstance;
		component.movie = {
			id: 1,
			key: 'deadpool',
			name: 'Deadpool',
			description: `A former Special Forces operative turned mercenary is subjected to
				a rogue experiment that leaves him with accelrated healing powers, adopting the alter ego Deadpool.`,
			genres: [
				'action',
				'adventure',
				'comedy'
			],
			rate: '8.6',
			length: '1hr 48mins',
			img: 'deadpool.jpg'
		};
		fixture.detectChanges();
	});

	it('should create', async(() => {
		expect(component).toBeTruthy();
	}));
});
