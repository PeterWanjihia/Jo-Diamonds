export function resolveImageUrl(
  value: string | null | undefined,
): string | null {
  if (!value) {
    return null;
  }

  try {
    return new URL(value).toString();
  } catch {
    return value.startsWith('/')
      ? value
      : `/${value}`;
  }
}
