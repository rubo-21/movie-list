import { Injectable } from '@angular/core';
import {
	Store,
	StateObservable,
	ActionsSubject,
	ReducerManager,
} from '@ngrx/store';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class MockStore<T> extends Store<T> {
	private stateSubject = new BehaviorSubject<T>({} as T);

	constructor(
		state$: StateObservable,
		actionsObserver: ActionsSubject,
		reducerManager: ReducerManager
	) {
		super(state$, actionsObserver, reducerManager);
	}

	setState(nextState: T) {
		this.stateSubject.next(nextState);
	}
}
