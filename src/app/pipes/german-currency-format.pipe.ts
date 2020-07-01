import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'germanCurrencyFormat',
})
export class GermanCurrencyFormatPipe implements PipeTransform {
  transform(value: unknown, ...args: unknown[]): unknown {
    const valueNumber = Number(value);
    const fixedDecimals = valueNumber.toFixed(2);
    const replacedSeparator = fixedDecimals.replace('.', ',');
    const separateBy3Digits = replacedSeparator.replace(
      /(\d)(?=(\d{3})+(?!\d))/g,
      '$1.'
    );
    return `${separateBy3Digits} €`;
  }
}
