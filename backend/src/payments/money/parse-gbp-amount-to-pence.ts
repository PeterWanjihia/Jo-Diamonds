const GBP_AMOUNT_PATTERN = /^\d+(?:\.\d{1,2})?$/;

export function parseGbpAmountToPence(input: string): number {
  const normalizedAmount = input.trim();

  if (!GBP_AMOUNT_PATTERN.test(normalizedAmount)) {
    throw new RangeError(
      'Amount must be a valid GBP value with at most two decimal places',
    );
  }

  const [wholePounds, fractionalPence = ''] = normalizedAmount.split('.');

  const normalizedPence = fractionalPence.padEnd(2, '0');

  const amountInPence = BigInt(wholePounds) * 100n + BigInt(normalizedPence);

  if (amountInPence <= 0n) {
    throw new RangeError('Payment amount must be greater than zero');
  }

  /*
   * Stripe's supported payment amounts are below JavaScript's
   * safe-integer boundary, but we still guard the conversion
   * from BigInt to number.
   */
  if (amountInPence > BigInt(Number.MAX_SAFE_INTEGER)) {
    throw new RangeError('Payment amount exceeds the supported numeric range');
  }

  return Number(amountInPence);
}
