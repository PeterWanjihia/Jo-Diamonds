import { resolveSeedEnvironment } from './seed-environment';

describe('resolveSeedEnvironment', () => {
  const developmentDatabaseUrl =
    'postgres://jdiamonds:jdiamonds@127.0.0.1:5432/jdiamonds_dev';

  const testDatabaseUrl =
    'postgres://jdiamonds:jdiamonds@127.0.0.1:5433/jdiamonds_test';

  it('defaults NODE_ENV to development', () => {
    expect(
      resolveSeedEnvironment({
        DATABASE_URL: developmentDatabaseUrl,
      }),
    ).toEqual({
      nodeEnv: 'development',
      databaseUrl: developmentDatabaseUrl,
    });
  });

  it('uses the supplied test database in test mode', () => {
    expect(
      resolveSeedEnvironment({
        NODE_ENV: 'test',
        DATABASE_URL: testDatabaseUrl,
      }),
    ).toEqual({
      nodeEnv: 'test',
      databaseUrl: testDatabaseUrl,
    });
  });

  it('honours an explicit development database URL', () => {
    const databaseUrl = 'postgres://custom:custom@127.0.0.1:5544/custom_dev';

    expect(
      resolveSeedEnvironment({
        NODE_ENV: 'development',
        DATABASE_URL: databaseUrl,
      }),
    ).toEqual({
      nodeEnv: 'development',
      databaseUrl,
    });
  });

  it('allows production seeding with an explicit database URL', () => {
    const databaseUrl =
      'postgresql://production:secret@database.example.com/jdiamonds';

    expect(
      resolveSeedEnvironment({
        NODE_ENV: 'production',
        DATABASE_URL: databaseUrl,
      }),
    ).toEqual({
      nodeEnv: 'production',
      databaseUrl,
    });
  });

  it('requires DATABASE_URL', () => {
    expect(() =>
      resolveSeedEnvironment({
        NODE_ENV: 'development',
      }),
    ).toThrow('DATABASE_URL is required when running database seeds');
  });

  it('rejects unsupported environments', () => {
    expect(() =>
      resolveSeedEnvironment({
        NODE_ENV: 'staging',
        DATABASE_URL: developmentDatabaseUrl,
      }),
    ).toThrow('Unsupported database seed environment "staging"');
  });

  it('rejects an invalid database URL', () => {
    expect(() =>
      resolveSeedEnvironment({
        NODE_ENV: 'development',
        DATABASE_URL: 'not-a-url',
      }),
    ).toThrow('DATABASE_URL is not a valid URL');
  });

  it('rejects non-PostgreSQL database URLs', () => {
    expect(() =>
      resolveSeedEnvironment({
        NODE_ENV: 'development',
        DATABASE_URL: 'mysql://user:password@localhost/database',
      }),
    ).toThrow('DATABASE_URL must use postgres: or postgresql:');
  });
});
