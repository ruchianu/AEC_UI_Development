import * as C from './pages/product/counter/counter.reducer';
import {ActionReducerMap} from '@ngrx/store';

export interface AppState {
  counterValue: C.State;

}

export const reducers:any = {
  counterValue: C.counterReducer
};
