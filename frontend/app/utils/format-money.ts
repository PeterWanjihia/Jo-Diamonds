import type { CataloguePriceResponse } from '../types/catalogue';

const gbpFormatter = new Intl.NumberFormat('en-GB', {
  style: 'currency',
  currency: 'GBP',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

export function formatMoney(
  price: CataloguePriceResponse,
): string {
  const majorAmount = price.minor / 100;

  return gbpFormatter.format(majorAmount);
}
