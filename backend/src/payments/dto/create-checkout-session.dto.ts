import { IsOptional, IsString, Matches, MaxLength } from 'class-validator';

export class CreateCheckoutSessionDto {
  /*
   * The amount arrives as a decimal string so that financial
   * values are not first interpreted using floating-point maths.
   *
   * Accepted:
   * 10
   * 10.5
   * 10.50
   * 250000.00
   *
   * Rejected:
   * £10.00
   * 1,000.00
   * -10
   * 1e6
   */
  @IsString()
  @MaxLength(32)
  @Matches(/^\d+(?:\.\d{1,2})?$/, {
    message: 'amount must be a GBP amount with at most two decimal places',
  })
  amount!: string;

  @IsOptional()
  @IsString()
  @MaxLength(120)
  reference?: string;
}
