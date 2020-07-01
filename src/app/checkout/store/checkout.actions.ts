import { Action } from '@ngrx/store';
import { State } from './checkout.reducer';

export const SET_STATE = '[Checkout] Set State';

export class SetState implements Action {
  readonly type = SET_STATE;

  constructor(public payload: State) {}
}

export type CheckoutActions = SetState;
