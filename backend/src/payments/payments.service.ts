import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';

import type { EnvironmentVariables } from '../config/environment';
import { CreateCheckoutSessionDto } from './dto/create-checkout-session.dto';
import { parseGbpAmountToPence } from './money/parse-gbp-amount-to-pence';
import { STRIPE_CLIENT, type StripeClient } from './stripe.provider';

const PAYMENT_CURRENCY = 'gbp';

const CHECKOUT_SESSION_ID_PATTERN = /^cs_[A-Za-z0-9_]+$/;

export interface CreateCheckoutSessionResult {
  readonly clientSecret: string;
}

export interface CheckoutSessionStatusResult {
  readonly status: Stripe.Checkout.Session['status'];
  readonly paymentStatus: Stripe.Checkout.Session['payment_status'];
  readonly amountTotal: number | null;
  readonly currency: string | null;
  readonly customerEmail: string | null;
  readonly reference: string | null;
}

@Injectable()
export class PaymentsService {
  constructor(
    @Inject(STRIPE_CLIENT)
    private readonly stripeClient: StripeClient,

    private readonly config: ConfigService<EnvironmentVariables, true>,
  ) {}

  async createCheckoutSession(
    input: CreateCheckoutSessionDto,
  ): Promise<CreateCheckoutSessionResult> {
    const stripe = this.requireStripeClient();

    const amountInPence = this.parseAmount(input.amount);
    const reference = input.reference?.trim() || undefined;

    const frontendOrigin = this.config.get('FRONTEND_ORIGIN', {
      infer: true,
    });

    const confirmationPageUrl = new URL(
      '/payment/complete',
      frontendOrigin,
    ).toString();

    try {
      const session = await stripe.checkout.sessions.create({
        mode: 'payment',
        ui_mode: 'embedded_page',

        adaptive_pricing: {
          enabled: false,
        },

        line_items: [
          {
            price_data: {
              currency: PAYMENT_CURRENCY,
              unit_amount: amountInPence,

              product_data: {
                name: 'JO.DIAMONDS private payment',

                ...(reference
                  ? {
                      description: reference,
                    }
                  : {}),
              },
            },

            quantity: 1,
          },
        ],

        metadata: {
          source: 'jodiamonds-private-payment',

          ...(reference
            ? {
                reference,
              }
            : {}),
        },

        return_url:
          `${confirmationPageUrl}` + '?session_id={CHECKOUT_SESSION_ID}',
      });

      if (!session.client_secret) {
        throw new ServiceUnavailableException(
          'Stripe did not return a Checkout client secret',
        );
      }

      return {
        clientSecret: session.client_secret,
      };
    } catch (error: unknown) {
      if (error instanceof Stripe.errors.StripeInvalidRequestError) {
        throw new BadRequestException(
          'Stripe cannot process the supplied payment amount',
        );
      }

      throw error;
    }
  }

  async retrieveCheckoutSession(
    sessionId: string,
  ): Promise<CheckoutSessionStatusResult> {
    const stripe = this.requireStripeClient();

    const normalizedSessionId = sessionId.trim();

    if (
      normalizedSessionId.length > 255 ||
      !CHECKOUT_SESSION_ID_PATTERN.test(normalizedSessionId)
    ) {
      throw new BadRequestException('Invalid Checkout Session identifier');
    }

    try {
      const session =
        await stripe.checkout.sessions.retrieve(normalizedSessionId);

      return {
        status: session.status,
        paymentStatus: session.payment_status,
        amountTotal: session.amount_total,
        currency: session.currency,
        customerEmail: session.customer_details?.email ?? null,
        reference: session.metadata?.reference ?? null,
      };
    } catch (error: unknown) {
      if (error instanceof Stripe.errors.StripeInvalidRequestError) {
        throw new NotFoundException('Checkout Session was not found');
      }

      throw error;
    }
  }

  private requireStripeClient(): Stripe {
    if (!this.stripeClient) {
      throw new ServiceUnavailableException(
        'Payments are temporarily unavailable',
      );
    }

    return this.stripeClient;
  }

  private parseAmount(amount: string): number {
    try {
      return parseGbpAmountToPence(amount);
    } catch (error: unknown) {
      if (error instanceof RangeError) {
        throw new BadRequestException(error.message);
      }

      throw error;
    }
  }
}
