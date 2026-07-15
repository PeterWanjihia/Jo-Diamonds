import { Module } from '@nestjs/common';

import { PaymentsController } from './payments.controller';
import { PaymentsService } from './payments.service';
import { stripeClientProvider } from './stripe.provider';

@Module({
  controllers: [PaymentsController],

  providers: [PaymentsService, stripeClientProvider],
})
export class PaymentsModule {}
