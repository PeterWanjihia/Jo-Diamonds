import type { CataloguePriceResponse } from '../types/catalogue';

const formatterCache = new Map<
  string,
  Intl.NumberFormat
>();

function getFormatter(
  currency: string,
  locale: string,
): Intl.NumberFormat {
  const key = `${locale}:${currency}`;

  const cached = formatterCache.get(key);

  if (cached) {
    return cached;
  }

  const formatter = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  formatterCache.set(key, formatter);

  return formatter;
}

export function formatMoney(
  price: CataloguePriceResponse,
  locale = 'en-KE',
): string {
  const majorAmount = price.minor / 100;

  return getFormatter(
    price.currency,
    locale,
  ).format(majorAmount);
}
