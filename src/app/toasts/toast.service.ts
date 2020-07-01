import { Injectable, TemplateRef } from '@angular/core';

interface ToastOptions {
  classname?: string;
  delay?: number;
  header?: string;
  [key: string]: any;
}

export interface IToast {
  textOrTpl: string | TemplateRef<any>;
  [key: string]: any;
}

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  toasts: IToast[] = [];

  show(textOrTpl: string | TemplateRef<any>, options: ToastOptions = {}) {
    this.toasts.push({ textOrTpl, ...options });
  }

  remove(toast: IToast) {
    this.toasts = this.toasts.filter((t) => t !== toast);
  }
}
