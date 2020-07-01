import { Component, HostBinding, OnInit, TemplateRef } from '@angular/core';

import { IToast, ToastService } from './toast.service';

@Component({
  selector: 'app-toasts',
  templateUrl: './toasts.component.html',
  styleUrls: ['./toasts.component.css'],
})
export class ToastsComponent implements OnInit {
  constructor(public toastService: ToastService) {}

  ngOnInit(): void {}

  @HostBinding('[class.ngb-toasts]') get ngbToasts() {
    return true;
  }

  isTemplate(toast: IToast) {
    return toast.textOrTpl instanceof TemplateRef;
  }

  close(toast: IToast) {
    this.toastService.remove(toast);
  }
}
