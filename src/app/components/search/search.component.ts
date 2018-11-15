import { Component, Input, EventEmitter } from '@angular/core';

@Component({
	selector: 'app-search',
	templateUrl: './search.component.html',
	styleUrls: ['./search.component.scss']
})
export class SearchComponent {
	@Input() input = new EventEmitter();
	@Input() autocomplete: string[];

	constructor() { }

	onInput(event: Event) {
		const input = (<HTMLInputElement>event.target).value;
		this.input.emit(input);
	}
}
