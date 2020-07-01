import * as CheckoutActions from './checkout.actions';
import { StepsEnum } from '../checkout.component';

export interface State {
  // step
  currentStep: StepsEnum;

  // shipping form
  firstName: string;
  secondName: string;
  address: string;
  telephoneNumber: string;

  // payment form
  accountOwner: string;
  IBAN: string;
}

const initialState: State = {
  currentStep: StepsEnum.Shipping,
  firstName: '',
  secondName: '',
  address: '',
  telephoneNumber: '',
  accountOwner: '',
  IBAN: null,
};

export function checkoutReducer(
  state: State = initialState,
  action: CheckoutActions.CheckoutActions
) {
  switch (action.type) {
    case CheckoutActions.SET_STATE:
      return action.payload;
    default:
      return state;
  }
}
