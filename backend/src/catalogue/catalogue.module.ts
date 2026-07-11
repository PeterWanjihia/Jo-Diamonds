import { Module } from '@nestjs/common';

import { DatabaseModule } from '../database';
import { CatalogueService } from './application';
import { CATALOGUE_REPOSITORY } from './catalogue.constants';
import { DrizzleCatalogueRepository } from './infrastructure';

@Module({
  imports: [DatabaseModule],
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
