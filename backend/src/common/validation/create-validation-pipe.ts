import { BadRequestException, ValidationPipe } from '@nestjs/common';
import type { ValidationError } from 'class-validator';

function flattenValidationErrors(
  errors: ValidationError[],
  parentPath = '',
): string[] {
  return errors.flatMap((error) => {
    const currentPath = parentPath
      ? `${parentPath}.${error.property}`
      : error.property;

    const ownMessages = error.constraints
      ? Object.values(error.constraints).map(
          (message) => `${currentPath}: ${message}`,
        )
      : [];

    const childMessages = error.children?.length
      ? flattenValidationErrors(error.children, currentPath)
      : [];

    return [...ownMessages, ...childMessages];
  });
}

export function createValidationPipe(): ValidationPipe {
  return new ValidationPipe({
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: true,
    forbidUnknownValues: true,
    stopAtFirstError: false,
    validationError: {
      target: false,
      value: false,
    },
    transformOptions: {
      enableImplicitConversion: false,
    },
    exceptionFactory: (errors: ValidationError[]) =>
      new BadRequestException({
        code: 'VALIDATION_ERROR',
        message: 'Request validation failed.',
        errors: flattenValidationErrors(errors),
      }),
  });
}
