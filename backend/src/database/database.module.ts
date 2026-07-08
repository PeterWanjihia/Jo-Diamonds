import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { DATABASE_CONNECTION } from './database.constants';
import { DatabaseLifecycleService } from './database-lifecycle.service';
import {
  databaseClientProvider,
  databaseConnectionProvider,
} from './database.providers';

@Module({
  imports: [ConfigModule],
  providers: [
    databaseClientProvider,
    databaseConnectionProvider,
    DatabaseLifecycleService,
  ],
  exports: [DATABASE_CONNECTION],
})
export class DatabaseModule {}
