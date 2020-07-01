import { GermanCurrencyFormatPipe } from './german-currency-format.pipe';

describe('GermanCurrencyFormatPipe', () => {
  it('create an instance', () => {
    const pipe = new GermanCurrencyFormatPipe();
    expect(pipe).toBeTruthy();
  });
});
