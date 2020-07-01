import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { ValidatorService } from 'angular-iban';
import { Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';

import * as fromApp from '../store/app.reducer';
import { CheckoutService } from './checkout.service';
import * as CheckoutActions from './store/checkout.actions';

export enum StepsEnum {
  'Shipping' = 0,
  'Payment' = 1,
  'Overview' = 2,
}

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit, OnDestroy {
  constructor(
    private store: Store<fromApp.AppState>,
    private formBuilder: FormBuilder,
    private checkoutService: CheckoutService
  ) {}

  ngUnsubscribe$ = new Subject();
  totalPrice: number;
  radioGroupForm: FormGroup;
  shippingForm: FormGroup;
  paymentForm: FormGroup;

  ngOnInit(): void {
    this.radioGroupForm = this.formBuilder.group({
      value: StepsEnum.Shipping,
    });

    this.shippingForm = new FormGroup({
      firstName: new FormControl('', Validators.pattern(/^[a-zA-Z]+$/)),
      secondName: new FormControl('', Validators.pattern(/^[a-zA-Z]+$/)),
      address: new FormControl('', Validators.required),
      telephoneNumber: new FormControl('', Validators.pattern(/^\+?[\d]+$/)),
    });

    this.paymentForm = new FormGroup({
      accountOwner: new FormControl('', Validators.pattern(/^[a-zA-Z]+$/)),
      IBAN: new FormControl(null, [
        Validators.required,
        ValidatorService.validateIban,
      ]),
    });

    this.store
      .select('cart')
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe((cart) => {
        this.totalPrice = cart.totalPrice;
      });

    this.store
      .select('checkout')
      .pipe(
        takeUntil(this.ngUnsubscribe$),
        // we just need this info on start, so we take 1
        take(1)
      )
      .subscribe((state) => {
        const {
          currentStep,
          firstName,
          secondName,
          address,
          telephoneNumber,
          accountOwner,
          IBAN,
        } = state;

        function setControl(control: AbstractControl, value: string) {
          control.setValue(value);
          if (value) {
            control.markAsTouched();
          }
        }

        this.radioGroupForm.get('value').setValue(currentStep);

        setControl(this.shippingForm.controls.firstName, firstName);
        setControl(this.shippingForm.controls.secondName, secondName);
        setControl(this.shippingForm.controls.address, address);
        setControl(this.shippingForm.controls.telephoneNumber, telephoneNumber);

        setControl(this.paymentForm.controls.accountOwner, accountOwner);
        setControl(this.paymentForm.controls.IBAN, IBAN);
      });
  }

  get currentStep(): StepsEnum {
    return this.radioGroupForm.get('value').value;
  }

  get progressValue() {
    const stepsLength = Object.values(StepsEnum).length / 2;
    return ((this.currentStep + 1) / stepsLength) * 100;
  }

  onBack() {
    this.radioGroupForm.get('value').setValue(this.currentStep - 1);
  }

  validate(goForward = false) {
    switch (this.currentStep) {
      case StepsEnum.Shipping:
        this.shippingForm.markAllAsTouched();

        if (!this.shippingForm.valid) {
          return;
        }

        if (goForward) {
          this.radioGroupForm.get('value').setValue(StepsEnum.Payment);
        }

        break;
      case StepsEnum.Payment:
        this.paymentForm.markAllAsTouched();

        if (!this.paymentForm.valid) {
          return;
        }

        if (goForward) {
          this.radioGroupForm.get('value').setValue(StepsEnum.Overview);
        }
        break;
    }
  }

  get shippingControls() {
    return this.shippingForm.controls;
  }

  get paymentControls() {
    return this.paymentForm.controls;
  }

  get isConfirmDisabled() {
    return this.totalPrice === 0;
  }

  onSave() {
    this.validate();
    this.store.dispatch(
      new CheckoutActions.SetState({
        currentStep: this.currentStep,

        firstName: this.shippingControls.firstName.value,
        secondName: this.shippingControls.secondName.value,
        address: this.shippingControls.address.value,
        telephoneNumber: this.shippingControls.telephoneNumber.value,

        accountOwner: this.paymentControls.accountOwner.value,
        IBAN: this.paymentControls.IBAN.value,
      })
    );
  }

  onConfirm() {
    this.checkoutService.tryFingerprintAuth();
  }

  ngOnDestroy() {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }
}
