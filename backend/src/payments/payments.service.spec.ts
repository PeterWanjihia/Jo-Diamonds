import {
  BadRequestException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';

import type { EnvironmentVariables } from '../config/environment';
import { PaymentsService } from './payments.service';

describe('PaymentsService', () => {
  const createCheckoutSession = jest.fn();
  const retrieveCheckoutSession = jest.fn();

  const stripeClient = {
    checkout: {
      sessions: {
        create: createCheckoutSession,
        retrieve: retrieveCheckoutSession,
      },
    },
  } as unknown as Stripe;

  const configService = {
    get: jest.fn((key: keyof EnvironmentVariables) => {
      if (key === 'FRONTEND_ORIGIN') {
        return 'http://localhost:3000';
      }

      throw new Error(`Unexpected configuration lookup: ${key}`);
    }),
  } as unknown as ConfigService<EnvironmentVariables, true>;

  let service: PaymentsService;

  beforeEach(() => {
    jest.clearAllMocks();

    service = new PaymentsService(stripeClient, configService);
  });

  describe('createCheckoutSession', () => {
    it('creates an embedded GBP Checkout Session', async () => {
      createCheckoutSession.mockResolvedValue({
        client_secret: 'cs_test_session_secret_example',
      } as unknown as Stripe.Checkout.Session);

      const result = await service.createCheckoutSession({
        amount: '250.50',
        reference: 'Private consultation',
      });

      expect(result).toEqual({
        clientSecret: 'cs_test_session_secret_example',
      });

      expect(createCheckoutSession).toHaveBeenCalledTimes(1);

      expect(createCheckoutSession).toHaveBeenCalledWith({
        mode: 'payment',
        ui_mode: 'embedded_page',

        adaptive_pricing: {
          enabled: false,
        },

        line_items: [
          {
            price_data: {
              currency: 'gbp',
              unit_amount: 25_050,

              product_data: {
                name: 'JO.DIAMONDS private payment',
                description: 'Private consultation',
              },
            },

            quantity: 1,
          },
        ],

        metadata: {
          source: 'jodiamonds-private-payment',
          reference: 'Private consultation',
        },

        return_url:
          'http://localhost:3000/payment/complete' +
          '?session_id={CHECKOUT_SESSION_ID}',
      });
    });

    it('trims the optional reference', async () => {
      createCheckoutSession.mockResolvedValue({
        client_secret: 'cs_test_trimmed_secret',
      } as unknown as Stripe.Checkout.Session);

      await service.createCheckoutSession({
        amount: '50.00',
        reference: '  Private viewing  ',
      });

      expect(createCheckoutSession).toHaveBeenCalledWith(
        expect.objectContaining({
          metadata: {
            source: 'jodiamonds-private-payment',
            reference: 'Private viewing',
          },
        }),
      );
    });

    it('omits an empty reference', async () => {
      createCheckoutSession.mockResolvedValue({
        client_secret: 'cs_test_no_reference_secret',
      } as unknown as Stripe.Checkout.Session);

      await service.createCheckoutSession({
        amount: '50.00',
        reference: '   ',
      });

      expect(createCheckoutSession).toHaveBeenCalledWith(
        expect.objectContaining({
          line_items: [
            {
              price_data: {
                currency: 'gbp',
                unit_amount: 5_000,

                product_data: {
                  name: 'JO.DIAMONDS private payment',
                },
              },

              quantity: 1,
            },
          ],

          metadata: {
            source: 'jodiamonds-private-payment',
          },
        }),
      );
    });

    it('rejects a non-positive payment before calling Stripe', async () => {
      await expect(
        service.createCheckoutSession({
          amount: '0.00',
        }),
      ).rejects.toThrow(BadRequestException);

      expect(createCheckoutSession).not.toHaveBeenCalled();
    });

    it('rejects payment creation when Stripe is disabled', async () => {
      const disabledService = new PaymentsService(null, configService);

      await expect(
        disabledService.createCheckoutSession({
          amount: '250.00',
        }),
      ).rejects.toThrow(ServiceUnavailableException);

      expect(createCheckoutSession).not.toHaveBeenCalled();
    });
  });

  describe('retrieveCheckoutSession', () => {
    it('returns a sanitized Checkout Session result', async () => {
      retrieveCheckoutSession.mockResolvedValue({
        status: 'complete',
        payment_status: 'paid',
        amount_total: 25_050,
        currency: 'gbp',

        customer_details: {
          email: 'client@example.com',
        },

        metadata: {
          reference: 'Private consultation',
        },
      } as unknown as Stripe.Checkout.Session);

      const result =
        await service.retrieveCheckoutSession('cs_test_session123');

      expect(retrieveCheckoutSession).toHaveBeenCalledWith(
        'cs_test_session123',
      );

      expect(result).toEqual({
        status: 'complete',
        paymentStatus: 'paid',
        amountTotal: 25_050,
        currency: 'gbp',
        customerEmail: 'client@example.com',
        reference: 'Private consultation',
      });
    });

    it('rejects malformed Checkout Session identifiers', async () => {
      await expect(
        service.retrieveCheckoutSession('pi_not_a_checkout_session'),
      ).rejects.toThrow(BadRequestException);

      expect(retrieveCheckoutSession).not.toHaveBeenCalled();
    });

    it('rejects session retrieval when Stripe is disabled', async () => {
      const disabledService = new PaymentsService(null, configService);

      await expect(
        disabledService.retrieveCheckoutSession('cs_test_session123'),
      ).rejects.toThrow(ServiceUnavailableException);

      expect(retrieveCheckoutSession).not.toHaveBeenCalled();
    });
  });
});
