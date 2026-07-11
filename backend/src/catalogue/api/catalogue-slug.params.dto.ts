import { IsString, Length, Matches } from 'class-validator';

export class CatalogueSlugParamsDto {
  @IsString()
  @Length(1, 120)
  @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
    message:
      'slug must contain lowercase letters, numbers, and single hyphens only',
  })
  slug!: string;
}
