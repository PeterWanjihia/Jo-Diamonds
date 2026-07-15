import type { Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';

import type { EnvironmentVariables } from '../config/environment';

/*
 * Symbol token used by Nest's dependency-injection container.
 *
 * Consumers inject this token rather than constructing their
 * own Stripe clients.
 */
export const STRIPE_CLIENT = Symbol('STRIPE_CLIENT');

export type StripeClient = Stripe | null;

export const stripeClientProvider: Provider<StripeClient> = {
  provide: STRIPE_CLIENT,

  inject: [ConfigService],

  useFactory: (
    config: ConfigService<EnvironmentVariables, true>,
  ): StripeClient => {
    const paymentsEnabled = config.get('PAYMENTS_ENABLED', {
      infer: true,
    });

    if (!paymentsEnabled) {
      return null;
    }

    const secretKey = config.get('STRIPE_SECRET_KEY', {
      infer: true,
    });

    /*
     * Joi should already prevent this state.
     *
     * This defensive check protects the provider if it is ever
     * instantiated outside the normal application bootstrap.
     */
    if (!secretKey) {
      throw new Error(
        'STRIPE_SECRET_KEY is required when payments are enabled',
      );
    }

    return new Stripe(secretKey);
  },
};
