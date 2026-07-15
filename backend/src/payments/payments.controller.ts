import { Body, Controller, Get, Param, Post } from '@nestjs/common';

import { CreateCheckoutSessionDto } from './dto/create-checkout-session.dto';
import {
  type CheckoutSessionStatusResult,
  type CreateCheckoutSessionResult,
  PaymentsService,
} from './payments.service';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post('checkout-session')
  createCheckoutSession(
    @Body() body: CreateCheckoutSessionDto,
  ): Promise<CreateCheckoutSessionResult> {
    return this.paymentsService.createCheckoutSession(body);
  }

  @Get('checkout-session/:sessionId')
  retrieveCheckoutSession(
    @Param('sessionId') sessionId: string,
  ): Promise<CheckoutSessionStatusResult> {
    return this.paymentsService.retrieveCheckoutSession(sessionId);
  }
}
