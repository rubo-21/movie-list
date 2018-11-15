import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
	let component: HeaderComponent;
	let fixture: ComponentFixture<HeaderComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			imports: [RouterTestingModule],
			declarations: [HeaderComponent]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(HeaderComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', async(() => {
		expect(component).toBeTruthy();
	}));

	it(`should have title set to 'movieList'`, async(() => {
		fixture = TestBed.createComponent(HeaderComponent);
		component = fixture.componentInstance;
		expect(component.title).toEqual('movieList');
	}));
});
