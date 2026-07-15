import { parseGbpAmountToPence } from './parse-gbp-amount-to-pence';

describe('parseGbpAmountToPence', () => {
  it.each([
    ['0.01', 1],
    ['1', 100],
    ['1.5', 150],
    ['1.50', 150],
    ['10', 1_000],
    ['10.01', 1_001],
    ['250.00', 25_000],
    ['1000.99', 100_099],
    ['100000.99', 10_000_099],
  ])('converts %s GBP into %i pence', (input, expectedPence) => {
    expect(parseGbpAmountToPence(input)).toBe(expectedPence);
  });

  it('allows harmless surrounding whitespace', () => {
    expect(parseGbpAmountToPence(' 250.50 ')).toBe(25_050);
  });

  it.each([
    '',
    ' ',
    'abc',
    '£10',
    '1,000',
    '-10',
    '+10',
    '.50',
    '10.',
    '10.999',
    '1e6',
  ])('rejects invalid amount syntax: %p', (input) => {
    expect(() => parseGbpAmountToPence(input)).toThrow(
      'Amount must be a valid GBP value with at most two decimal places',
    );
  });

  it.each(['0', '0.0', '0.00'])(
    'rejects a zero payment amount: %p',
    (input) => {
      expect(() => parseGbpAmountToPence(input)).toThrow(
        'Payment amount must be greater than zero',
      );
    },
  );

  it('rejects an amount outside the safe JavaScript integer range', () => {
    expect(() => parseGbpAmountToPence('90071992547410.00')).toThrow(
      'Payment amount exceeds the supported numeric range',
    );
  });
});
