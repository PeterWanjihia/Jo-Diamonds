const gbpFormatter = new Intl.NumberFormat('en-GB', {
  style: 'currency',
  currency: 'GBP',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export function formatGbpFromPence(
  amountInPence: number,
): string {
  if (
    !Number.isSafeInteger(amountInPence) ||
    amountInPence < 0
  ) {
    throw new RangeError(
      'GBP amount must be a non-negative integer number of pence',
    );
  }

  return gbpFormatter.format(
    amountInPence / 100,
  );
}
