import { resolveSeedEnvironment } from './seed-environment';

describe('resolveSeedEnvironment', () => {
  it('defaults to the local development database', () => {
    expect(resolveSeedEnvironment({})).toEqual({
      nodeEnv: 'development',
      databaseUrl:
        'postgres://jdiamonds:jdiamonds@127.0.0.1:5432/jdiamonds_dev',
    });
  });

  it('selects the isolated test database in test mode', () => {
    expect(
      resolveSeedEnvironment({
        NODE_ENV: 'test',
      }),
    ).toEqual({
      nodeEnv: 'test',
      databaseUrl:
        'postgres://jdiamonds:jdiamonds@127.0.0.1:5433/jdiamonds_test',
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

  it.each(['staging', 'production'])(
    'rejects the %s environment',
    (nodeEnv) => {
      expect(() =>
        resolveSeedEnvironment({
          NODE_ENV: nodeEnv,
          DATABASE_URL:
            'postgres://jdiamonds:jdiamonds@127.0.0.1:5432/jdiamonds_dev',
        }),
      ).toThrow('Database seeding is allowed only in development or test');
    },
  );
});
