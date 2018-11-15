import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MovieDetailsComponent } from './movie-details.component';
import { ActivatedRoute } from '@angular/router';
import { Movie } from 'src/app/core/models/movie';

describe('MovieDetailsComponent', () => {
	let component: MovieDetailsComponent;
	let fixture: ComponentFixture<MovieDetailsComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			imports: [RouterTestingModule],
			declarations: [MovieDetailsComponent],
			providers: [MovieDetailsComponent, {
				provide: ActivatedRoute,
				useValue: {snapshot: {data: {'movie': {name: 'test movie'}}}}
			}]
		})
			.compileComponents();
	}));

	beforeEach(async(() => {
		fixture = TestBed.createComponent(MovieDetailsComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	}));

	it('should create', async(() => {
		expect(component).toBeTruthy();
	}));

	describe('ngOnInit', () => {
		beforeEach(async(() => {
			fixture = TestBed.createComponent(MovieDetailsComponent);
			component = fixture.componentInstance;
			fixture.detectChanges();
		}));

		it('should set movie on component', async(() => {
			const movie = <Movie>{name: 'test movie'};
			component.ngOnInit();
			expect(component.movie).toEqual(movie);
		}));
	});
});
