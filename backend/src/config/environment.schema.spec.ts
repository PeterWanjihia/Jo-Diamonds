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
