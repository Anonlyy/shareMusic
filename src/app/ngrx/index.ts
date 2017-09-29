import { createSelector } from 'reselect';
import { ActionReducer } from '@ngrx/store';
import { environment } from '../../environments/environment';

import { compose } from '@ngrx/core/compose';

import { storeFreeze } from 'ngrx-store-freeze';

import { combineReducers } from '@ngrx/store';

import * as fromNumberReducer from './reducer/refresh.reducer';
import * as fromNumberStore from './store/refresh.store';

// state

export interface State {
  Number: fromNumberStore.State
}

// reducers

const reducers = {
  Number: fromNumberReducer.refreshReducer
};

// 装载

const developmentReducer: ActionReducer<State> = compose(storeFreeze, combineReducers)(reducers);
const productionReducer: ActionReducer<State> = combineReducers(reducers);

export function reducer(state: any, action: any) {
  if (environment.production) {
    return productionReducer(state, action);
  } else {
    return developmentReducer(state, action);
  }
}


// number 操作

export const getNumberState = (state: State) => {
  return state.Number;
};

export const getNumber = createSelector(getNumberState, fromNumberReducer.getNumber);
