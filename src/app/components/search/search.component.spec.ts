import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchComponent } from './search.component';

describe('SearchComponent', () => {
	let component: SearchComponent;
	let fixture: ComponentFixture<SearchComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [SearchComponent]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(SearchComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', async(() => {
		expect(component).toBeTruthy();
	}));

	describe('onInput', () => {
		it('should emit an event by passing input', async(() => {
			const event = <any>{
				target: {
					value: 'something',
				}
			};
			spyOn(component.input, 'emit');
			component.onInput(event);
			expect(component.input.emit).toHaveBeenCalledWith('something');
		}));
	});
});
