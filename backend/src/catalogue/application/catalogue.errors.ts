export class CatalogueProductNotFoundError extends Error {
  constructor(readonly slug: string) {
    super(`Catalogue product "${slug}" was not found.`);

    this.name = CatalogueProductNotFoundError.name;
  }
}

export class CatalogueCollectionNotFoundError extends Error {
  constructor(readonly slug: string) {
    super(`Catalogue collection "${slug}" was not found.`);

    this.name = CatalogueCollectionNotFoundError.name;
  }
}
