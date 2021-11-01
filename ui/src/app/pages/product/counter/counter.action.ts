import {Action} from '@ngrx/store';

export const INCREMENT = 'increment';
export const DECREMENT = 'decrement';


export class IncrementCounter implements Action {
  readonly type = INCREMENT;
}

export class DecrementCounter implements Action {
  readonly type = DECREMENT;
}

export type CounterManagment = IncrementCounter | DecrementCounter;
