import { environmentSchema } from './environment.schema';

const validationOptions = {
  abortEarly: false,
  allowUnknown: true,
};

function validateEnvironment(input: Record<string, unknown>) {
  return environmentSchema.validate(input, validationOptions);
}

function getErrorMessages(input: Record<string, unknown>): string[] {
  const result = validateEnvironment(input);

  return result.error?.details.map((detail) => detail.message) ?? [];
}

describe('environmentSchema database configuration', () => {
  it('provides the local development database URL by default', () => {
    const result = validateEnvironment({
      NODE_ENV: 'development',
    });

    expect(result.error).toBeUndefined();
    expect(result.value).toMatchObject({
      DATABASE_URL:
        'postgres://jdiamonds:jdiamonds@127.0.0.1:5432/jdiamonds_dev',
    });
  });

  it('uses the local test database URL as DATABASE_URL in test mode', () => {
    const result = validateEnvironment({
      NODE_ENV: 'test',
    });

    expect(result.error).toBeUndefined();
    expect(result.value).toMatchObject({
      DATABASE_URL:
        'postgres://jdiamonds:jdiamonds@127.0.0.1:5433/jdiamonds_test',
      TEST_DATABASE_URL:
        'postgres://jdiamonds:jdiamonds@127.0.0.1:5433/jdiamonds_test',
    });
  });

  it('requires DATABASE_URL in production', () => {
    const messages = getErrorMessages({
      NODE_ENV: 'production',
      FRONTEND_ORIGIN: 'https://jodiamonds.com',
    });

    expect(messages).toContain('"DATABASE_URL" is required');
  });

  it('accepts a valid production PostgreSQL database URL', () => {
    const result = validateEnvironment({
      NODE_ENV: 'production',
      FRONTEND_ORIGIN: 'https://jodiamonds.com',
      DATABASE_URL:
        'postgres://jdiamonds:jdiamonds@db.example.com:5432/jdiamonds_prod',
    });

    expect(result.error).toBeUndefined();
  });

  it('rejects non-PostgreSQL database URLs', () => {
    const messages = getErrorMessages({
      NODE_ENV: 'development',
      DATABASE_URL: 'mysql://jdiamonds:jdiamonds@127.0.0.1:3306/jdiamonds',
    });

    expect(messages.some((message) => message.includes('DATABASE_URL'))).toBe(
      true,
    );
  });
});

describe('environmentSchema payment configuration', () => {
  it('disables payments by default', () => {
    const result = validateEnvironment({
      NODE_ENV: 'development',
    });

    expect(result.error).toBeUndefined();

    expect(result.value).toMatchObject({
      PAYMENTS_ENABLED: false,
    });

    expect(
      result.value.STRIPE_SECRET_KEY,
    ).toBeUndefined();
  });

  it('allows payments to remain disabled without a Stripe key', () => {
    const result = validateEnvironment({
      NODE_ENV: 'development',
      PAYMENTS_ENABLED: 'false',
    });

    expect(result.error).toBeUndefined();

    expect(result.value).toMatchObject({
      PAYMENTS_ENABLED: false,
    });
  });

  it('requires a Stripe secret key when payments are enabled', () => {
    const messages = getErrorMessages({
      NODE_ENV: 'development',
      PAYMENTS_ENABLED: 'true',
    });

    expect(messages).toContain(
      '"STRIPE_SECRET_KEY" is required',
    );
  });

  it('accepts a Stripe test secret key when payments are enabled', () => {
    const result = validateEnvironment({
      NODE_ENV: 'development',
      PAYMENTS_ENABLED: 'true',
      STRIPE_SECRET_KEY:
        'sk_test_example123456789',
    });

    expect(result.error).toBeUndefined();

    expect(result.value).toMatchObject({
      PAYMENTS_ENABLED: true,
      STRIPE_SECRET_KEY:
        'sk_test_example123456789',
    });
  });

  it('rejects a publishable key as the backend secret key', () => {
    const messages = getErrorMessages({
      NODE_ENV: 'development',
      PAYMENTS_ENABLED: 'true',
      STRIPE_SECRET_KEY:
        'pk_test_example123456789',
    });

    expect(
      messages.some((message) =>
        message.includes('STRIPE_SECRET_KEY'),
      ),
    ).toBe(true);
  });
});
