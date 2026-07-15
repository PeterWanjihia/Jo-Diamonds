import type {
  CheckoutSessionStatusResponse,
  CreateCheckoutSessionRequest,
  CreateCheckoutSessionResponse,
  PaymentApiErrorResponse,
} from '~/types/payments';

const DEFAULT_PAYMENT_ERROR =
  'The payment service could not complete the request. Please try again.';

function isRecord(
  value: unknown,
): value is Record<string, unknown> {
  return (
    typeof value === 'object' &&
    value !== null
  );
}

function isStringArray(
  value: unknown,
): value is readonly string[] {
  return (
    Array.isArray(value) &&
    value.every(
      (item) => typeof item === 'string',
    )
  );
}

function readApiErrorBody(
  value: unknown,
): PaymentApiErrorResponse | null {
  if (!isRecord(value)) {
    return null;
  }

  return value as PaymentApiErrorResponse;
}

export function getPaymentApiErrorMessage(
  error: unknown,
): string {
  if (isRecord(error)) {
    const responseBody =
      readApiErrorBody(error.data);

    if (responseBody) {
      if (
        isStringArray(responseBody.errors) &&
        responseBody.errors.length > 0
      ) {
        return responseBody.errors.join(' ');
      }

      if (
        typeof responseBody.message ===
        'string'
      ) {
        return responseBody.message;
      }

      if (
        isStringArray(responseBody.message) &&
        responseBody.message.length > 0
      ) {
        return responseBody.message.join(' ');
      }
    }
  }

  if (
    error instanceof Error &&
    error.message.trim().length > 0
  ) {
    return error.message;
  }

  return DEFAULT_PAYMENT_ERROR;
}

export function usePaymentsApi() {
  const config = useRuntimeConfig();

  const apiBaseUrl = String(
    config.public.apiBaseUrl,
  ).replace(/\/+$/, '');

  const paymentsEnabled =
    config.public.paymentsEnabled === true;

  const stripePublishableKey = String(
    config.public.stripePublishableKey ?? '',
  ).trim();

  async function createCheckoutSession(
    input: CreateCheckoutSessionRequest,
  ): Promise<CreateCheckoutSessionResponse> {
    return await $fetch<CreateCheckoutSessionResponse>(
      `${apiBaseUrl}/payments/checkout-session`,
      {
        method: 'POST',
        body: input,
      },
    );
  }

  async function retrieveCheckoutSession(
    sessionId: string,
  ): Promise<CheckoutSessionStatusResponse> {
    const normalizedSessionId =
      sessionId.trim();

    if (!normalizedSessionId) {
      throw new Error(
        'A Checkout Session identifier is required.',
      );
    }

    return await $fetch<CheckoutSessionStatusResponse>(
      `${apiBaseUrl}/payments/checkout-session/${encodeURIComponent(
        normalizedSessionId,
      )}`,
    );
  }

  return {
    paymentsEnabled,
    stripePublishableKey,
    createCheckoutSession,
    retrieveCheckoutSession,
    getErrorMessage:
      getPaymentApiErrorMessage,
  };
}
