import { Module } from '@nestjs/common';

import { DatabaseModule } from '../database';
import { CatalogueController } from './api';
import { CatalogueService } from './application';
import { CATALOGUE_REPOSITORY } from './catalogue.constants';
import { DrizzleCatalogueRepository } from './infrastructure';

@Module({
  imports: [DatabaseModule],
  controllers: [CatalogueController],
  providers: [
    DrizzleCatalogueRepository,
    {
      provide: CATALOGUE_REPOSITORY,
      useExisting: DrizzleCatalogueRepository,
    },
    CatalogueService,
  ],
  exports: [CatalogueService],
})
export class CatalogueModule {}
