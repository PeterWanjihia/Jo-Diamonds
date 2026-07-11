import { Test, type TestingModule } from '@nestjs/testing';

import { AppModule } from '../app.module';
import { CatalogueService } from './application';
import { CATALOGUE_REPOSITORY } from './catalogue.constants';
import type { CatalogueRepository } from './domain';
import { DrizzleCatalogueRepository } from './infrastructure';

describe('CatalogueModule integration', () => {
  let testingModule: TestingModule;

  beforeAll(async () => {
    testingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
  });

  afterAll(async () => {
    await testingModule.close();
  });

  it('resolves the catalogue application service', () => {
    const catalogueService =
      testingModule.get<CatalogueService>(CatalogueService);

    expect(catalogueService).toBeInstanceOf(CatalogueService);
  });

  it('resolves the catalogue repository token', () => {
    const catalogueRepository =
      testingModule.get<CatalogueRepository>(CATALOGUE_REPOSITORY);

    expect(catalogueRepository).toBeInstanceOf(DrizzleCatalogueRepository);
  });

  it('uses the same repository instance for the token and concrete provider', () => {
    const repositoryFromToken =
      testingModule.get<CatalogueRepository>(CATALOGUE_REPOSITORY);

    const concreteRepository = testingModule.get<DrizzleCatalogueRepository>(
      DrizzleCatalogueRepository,
    );

    expect(repositoryFromToken).toBe(concreteRepository);
  });
});
