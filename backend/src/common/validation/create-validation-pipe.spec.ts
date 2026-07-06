import type { ArgumentMetadata } from '@nestjs/common';
import { BadRequestException } from '@nestjs/common';
import { IsString } from 'class-validator';

import { createValidationPipe } from './create-validation-pipe';

class DemoDto {
  @IsString()
  name!: string;
}

describe('createValidationPipe', () => {
  const metadata: ArgumentMetadata = {
    type: 'body',
    metatype: DemoDto,
    data: '',
  };

  it('accepts a valid DTO-shaped body', async () => {
    const pipe = createValidationPipe();

    const result: unknown = await pipe.transform(
      {
        name: 'JO.DIAMONDS',
      },
      metadata,
    );

    expect(result).toBeInstanceOf(DemoDto);

    const dto = result as DemoDto;

    expect(dto.name).toBe('JO.DIAMONDS');
  });

  it('rejects undeclared fields', async () => {
    const pipe = createValidationPipe();

    await expect(
      pipe.transform(
        {
          name: 'JO.DIAMONDS',
          priceMinor: 1,
        },
        metadata,
      ),
    ).rejects.toBeInstanceOf(BadRequestException);
  });

  it('rejects invalid field types', async () => {
    const pipe = createValidationPipe();

    await expect(
      pipe.transform(
        {
          name: 123,
        },
        metadata,
      ),
    ).rejects.toBeInstanceOf(BadRequestException);
  });
});
