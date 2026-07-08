import {
  Inject,
  Injectable,
  Logger,
  type OnApplicationBootstrap,
  type OnApplicationShutdown,
} from '@nestjs/common';

import { DATABASE_CLIENT } from './database.constants';
import type { PostgresClient } from './database.types';

interface CurrentDatabaseRow {
  databaseName: string;
}

@Injectable()
export class DatabaseLifecycleService
  implements OnApplicationBootstrap, OnApplicationShutdown
{
  private readonly logger = new Logger(DatabaseLifecycleService.name);

  constructor(
    @Inject(DATABASE_CLIENT)
    private readonly client: PostgresClient,
  ) {}

  async onApplicationBootstrap(): Promise<void> {
    const [row] = await this.client<CurrentDatabaseRow[]>`
      select current_database() as "databaseName"
    `;

    if (!row) {
      throw new Error('Database connection verification returned no row');
    }

    this.logger.log(`Connected to PostgreSQL database "${row.databaseName}"`);
  }

  async onApplicationShutdown(signal?: string): Promise<void> {
    await this.client.end({
      timeout: 5,
    });

    const signalSuffix = signal ? ` after ${signal}` : '';

    this.logger.log(`PostgreSQL connections closed${signalSuffix}`);
  }
}
