import * as CounterActions from './counter.action';

export interface State {
  counter: number;
}

const initialState: State = {
  counter: 0
};

export function counterReducer(state = initialState, action: CounterActions.CounterManagment) {
  switch (action.type) {
    case CounterActions.INCREMENT:
      const counter = state.counter + 1;
      return {...state, counter};
    case CounterActions.DECREMENT:
      const currentCounter = state.counter - 1;
      return {...state, counter: currentCounter};
    default :
      return state;
  }
}
