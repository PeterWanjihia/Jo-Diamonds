import { HttpStatus } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import {
  FastifyAdapter,
  type NestFastifyApplication,
} from '@nestjs/platform-fastify';
import Stripe from 'stripe';

import { AppModule } from '../src/app.module';
import { createValidationPipe } from '../src/common/validation/create-validation-pipe';
import { STRIPE_CLIENT } from '../src/payments/stripe.provider';

interface CreateCheckoutSessionBody {
  readonly clientSecret: string;
}

interface CheckoutSessionStatusBody {
  readonly status: string;
  readonly paymentStatus: string;
  readonly amountTotal: number | null;
  readonly currency: string | null;
  readonly customerEmail: string | null;
  readonly reference: string | null;
}

interface ValidationErrorBody {
  readonly code: string;
  readonly message: string;
  readonly errors: readonly string[];
}

interface HttpErrorBody {
  readonly statusCode: number;
  readonly error: string;
  readonly message: string;
}

function parseJson<T>(body: string): T {
  const parsed: unknown = JSON.parse(body);

  return parsed as T;
}

async function createTestApplication(
  stripeClient: Stripe | null,
): Promise<NestFastifyApplication> {
  const testingModule = await Test.createTestingModule({
    imports: [AppModule],
  })
    .overrideProvider(STRIPE_CLIENT)
    .useValue(stripeClient)
    .compile();

  const application =
    testingModule.createNestApplication<NestFastifyApplication>(
      new FastifyAdapter(),
    );

  application.setGlobalPrefix('v1');
  application.useGlobalPipes(createValidationPipe());

  await application.init();
  await application.getHttpAdapter().getInstance().ready();

  return application;
}

describe('Payments API e2e', () => {
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

  let application: NestFastifyApplication | undefined;

  beforeAll(async () => {
    application = await createTestApplication(stripeClient);
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterAll(async () => {
    await application?.close();
  });

  function getApplication(): NestFastifyApplication {
    if (!application) {
      throw new Error('Expected the Nest application to be initialized');
    }

    return application;
  }

  it('creates an embedded GBP Checkout Session', async () => {
    createCheckoutSession.mockResolvedValue({
      client_secret: 'cs_test_client_secret_example',
    } as unknown as Stripe.Checkout.Session);

    const response = await getApplication().inject({
      method: 'POST',
      url: '/v1/payments/checkout-session',
      payload: {
        amount: '250.50',
        reference: 'Private consultation',
      },
    });

    expect(response.statusCode).toBe(HttpStatus.CREATED);

    expect(parseJson<CreateCheckoutSessionBody>(response.body)).toEqual({
      clientSecret: 'cs_test_client_secret_example',
    });

    expect(createCheckoutSession).toHaveBeenCalledTimes(1);

    expect(createCheckoutSession).toHaveBeenCalledWith(
      expect.objectContaining({
        mode: 'payment',
        ui_mode: 'embedded_page',
        metadata: {
          source: 'jodiamonds-private-payment',
          reference: 'Private consultation',
        },
      }),
    );
  });

  it('rejects malformed payment amounts through the global validation pipe', async () => {
    const response = await getApplication().inject({
      method: 'POST',
      url: '/v1/payments/checkout-session',
      payload: {
        amount: '£250.50',
      },
    });

    expect(response.statusCode).toBe(HttpStatus.BAD_REQUEST);

    expect(parseJson<ValidationErrorBody>(response.body)).toEqual({
      code: 'VALIDATION_ERROR',
      message: 'Request validation failed.',
      errors: [
        'amount: amount must be a GBP amount with at most two decimal places',
      ],
    });

    expect(createCheckoutSession).not.toHaveBeenCalled();
  });

  it('retrieves a sanitized Checkout Session status', async () => {
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

    const response = await getApplication().inject({
      method: 'GET',
      url: '/v1/payments/checkout-session/cs_test_session123',
    });

    expect(response.statusCode).toBe(HttpStatus.OK);

    expect(parseJson<CheckoutSessionStatusBody>(response.body)).toEqual({
      status: 'complete',
      paymentStatus: 'paid',
      amountTotal: 25_050,
      currency: 'gbp',
      customerEmail: 'client@example.com',
      reference: 'Private consultation',
    });

    expect(retrieveCheckoutSession).toHaveBeenCalledWith('cs_test_session123');
  });

  it('rejects malformed Checkout Session identifiers', async () => {
    const response = await getApplication().inject({
      method: 'GET',
      url: '/v1/payments/checkout-session/pi_invalid_identifier',
    });

    expect(response.statusCode).toBe(HttpStatus.BAD_REQUEST);

    expect(parseJson<HttpErrorBody>(response.body)).toEqual({
      statusCode: HttpStatus.BAD_REQUEST,
      error: 'Bad Request',
      message: 'Invalid Checkout Session identifier',
    });

    expect(retrieveCheckoutSession).not.toHaveBeenCalled();
  });

  it('returns 503 when payments are disabled', async () => {
    const disabledApplication = await createTestApplication(null);

    try {
      const response = await disabledApplication.inject({
        method: 'POST',
        url: '/v1/payments/checkout-session',
        payload: {
          amount: '250.50',
        },
      });

      expect(response.statusCode).toBe(HttpStatus.SERVICE_UNAVAILABLE);

      expect(parseJson<HttpErrorBody>(response.body)).toEqual({
        statusCode: HttpStatus.SERVICE_UNAVAILABLE,
        error: 'Service Unavailable',
        message: 'Payments are temporarily unavailable',
      });
    } finally {
      await disabledApplication.close();
    }
  });
});
