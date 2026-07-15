export interface CreateCheckoutSessionRequest {
  readonly amount: string;
  readonly reference?: string;
}

export interface CreateCheckoutSessionResponse {
  readonly clientSecret: string;
}

export interface CheckoutSessionStatusResponse {
  readonly status: string;
  readonly paymentStatus: string;
  readonly amountTotal: number | null;
  readonly currency: string | null;
  readonly customerEmail: string | null;
  readonly reference: string | null;
}

export interface PaymentApiErrorResponse {
  readonly statusCode?: number;
  readonly code?: string;
  readonly error?: string;
  readonly message?: string | readonly string[];
  readonly errors?: readonly string[];
}
