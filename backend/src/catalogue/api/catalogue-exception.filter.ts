import {
  ArgumentsHost,
  Catch,
  type ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import type { FastifyReply } from 'fastify';

import {
  CatalogueCollectionNotFoundError,
  CatalogueProductNotFoundError,
} from '../application';

type CatalogueNotFoundError =
  CatalogueProductNotFoundError | CatalogueCollectionNotFoundError;

@Catch(CatalogueProductNotFoundError, CatalogueCollectionNotFoundError)
export class CatalogueExceptionFilter implements ExceptionFilter<CatalogueNotFoundError> {
  catch(exception: CatalogueNotFoundError, host: ArgumentsHost): void {
    const response = host.switchToHttp().getResponse<FastifyReply>();

    const message =
      exception instanceof CatalogueProductNotFoundError
        ? 'Catalogue product not found.'
        : 'Catalogue collection not found.';

    void response.status(HttpStatus.NOT_FOUND).send({
      statusCode: HttpStatus.NOT_FOUND,
      error: 'Not Found',
      message,
    });
  }
}
