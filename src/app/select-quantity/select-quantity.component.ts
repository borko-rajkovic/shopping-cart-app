import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

type ChangeType = 'increment' | 'decrement';

@Component({
  selector: 'app-select-quantity',
  templateUrl: './select-quantity.component.html',
  styleUrls: ['./select-quantity.component.css'],
})
export class SelectQuantityComponent implements OnInit {
  @Input() maximum: number;
  @Input() minimum = 0;
  @Input() value: number;

  @Output() quantityChange = new EventEmitter<number>();
  @Output() quantityDecrement = new EventEmitter<void>();
  @Output() quantityIncrement = new EventEmitter<void>();

  constructor() {}

  get disabledDecrement() {
    return this.value === this.minimum;
  }

  get disabledIncrement() {
    return this.value >= this.maximum;
  }

  onChange(type: ChangeType) {
    switch (type) {
      case 'decrement':
        this.value--;
        this.quantityDecrement.emit();
        break;
      case 'increment':
        this.value++;
        this.quantityIncrement.emit();
        break;
    }

    this.quantityChange.emit(this.value);
  }

  ngOnInit(): void {}
}
