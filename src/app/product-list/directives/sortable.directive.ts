import {
  Directive,
  EventEmitter,
  Input,
  Output,
  HostBinding,
  HostListener,
} from '@angular/core';
import { Product } from '../../models/Product';

export type SortColumn = keyof Product | '';
export type SortDirection = 'asc' | 'desc' | '';
const rotate: { [key: string]: SortDirection } = {
  asc: 'desc',
  desc: '',
  '': 'asc',
};

export interface SortEvent {
  column: SortColumn;
  direction: SortDirection;
}

@Directive({
  // tslint:disable-next-line: directive-selector
  selector: 'th[sortable]',
})
export class SortableDirective {
  @Input() sortable: SortColumn = '';
  @Input() direction: SortDirection = '';
  @Output() sort = new EventEmitter<SortEvent>();

  @HostBinding('class.asc') get isAscending() {
    return this.direction === 'asc';
  }
  @HostBinding('class.desc') get isDescending() {
    return this.direction === 'desc';
  }

  @HostListener('click') onClick() {
    this.direction = rotate[this.direction];
    this.sort.emit({ column: this.sortable, direction: this.direction });
  }
}
