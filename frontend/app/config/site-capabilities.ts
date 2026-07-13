export interface SiteCapabilities {
  readonly insuredDelivery: boolean;
  readonly stripePayments: boolean;
  readonly certificationIncluded: boolean;
  readonly privateAssistance: boolean;
}

export const siteCapabilities: Readonly<SiteCapabilities> = {
  insuredDelivery: true,

  /*
   * Displayed as part of the approved frontend design.
   * The actual payment workflow will be implemented later.
   */
  stripePayments: true,

  certificationIncluded: true,
  privateAssistance: true,
};

export type UtilityBarIcon =
  | 'delivery'
  | 'concierge'
  | null;

export interface UtilityBarItem {
  readonly id: string;
  readonly capability: keyof SiteCapabilities;
  readonly label: string;
  readonly icon: UtilityBarIcon;
}

export const utilityBarItems = [
  {
    id: 'insured-delivery',
    capability: 'insuredDelivery',
    label: 'Insured delivery',
    icon: 'delivery',
  },
  {
    id: 'secure-stripe-payment',
    capability: 'stripePayments',
    label: 'Secure Stripe payment',
    icon: null,
  },
  {
    id: 'certification-included',
    capability: 'certificationIncluded',
    label: 'Certification included',
    icon: null,
  },
  {
    id: 'private-client-assistance',
    capability: 'privateAssistance',
    label: 'Private client assistance',
    icon: 'concierge',
  },
] as const satisfies readonly UtilityBarItem[];
