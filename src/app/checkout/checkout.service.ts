import { Injectable } from '@angular/core';
import {
  CORDOVA,
  DEVICE,
  FINGERPINT_AUTH,
  IDevice,
} from 'src/cordova-constants';

import { ToastService } from '../toasts/toast.service';

const FingerprintAuth: {
  isAvailable: (
    successFunction: (data: any) => void,
    errorFunction: (error: any) => void
  ) => void;
  encrypt: (
    encryptConfig: any,
    encryptSuccessCallback: (data: any) => void,
    encryptErrorCallback: (error: any) => void
  ) => void;
} = window[FINGERPINT_AUTH];

const poweredByCordova = typeof window[CORDOVA] !== 'undefined';

const device: IDevice = window[DEVICE];

@Injectable({
  providedIn: 'root',
})
export class CheckoutService {
  constructor(private toastService: ToastService) {}

  tryFingerprintAuth() {
    if (!poweredByCordova) {
      console.log('Not powered by Cordova');
      return;
    }

    if (device.platform.toLowerCase() !== 'android') {
      console.log(`No FingerprintAuth for platform ${device.platform}`);
      return;
    }

    FingerprintAuth.isAvailable(
      (result) => this.isAvailableSuccess(result),
      (error) => this.isAvailableError(error)
    );
  }

  isAvailableSuccess(result: { isAvailable: boolean }) {
    if (result.isAvailable) {
      const encryptConfig = { clientId: 'com.rajkovic.borko.proba' };
      FingerprintAuth.encrypt(
        encryptConfig,
        () => this.encryptSuccessCallback(),
        (error) => this.encryptErrorCallback(error)
      );
    }
  }

  isAvailableError(error: any) {
    this.toastService.show(JSON.stringify(error), {
      classname: 'bg-danger text-light',
      delay: 5000,
      header: 'Error',
    });
  }

  encryptSuccessCallback() {
    this.toastService.show('Fingerprint recognition successful', {
      classname: 'bg-success text-light',
      delay: 5000,
      header: 'Thank you!',
    });
  }

  encryptErrorCallback(error: any) {
    this.toastService.show(JSON.stringify(error), {
      classname: 'bg-danger text-light',
      delay: 5000,
      header: 'Error',
    });
  }
}
