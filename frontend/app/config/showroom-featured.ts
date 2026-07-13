export type FeaturedSpecificationIcon =
  | 'diamond'
  | 'quality'
  | 'setting';

export interface FeaturedSpecification {
  readonly icon: FeaturedSpecificationIcon;
  readonly primary: string;
  readonly secondary: string;
}

export interface ShowroomFeaturedEditorial {
  readonly displayName: string;
  readonly subtitle: string;

  readonly image: string;
  readonly alt: string;
  readonly objectPosition: string;

  /*
   * Temporary homepage editorial price.
   *
   * Product pricing should ultimately come from the
   * catalogue API after the backend catalogue is migrated
   * from KES to GBP.
   */
  readonly priceMinor: number;
  readonly currency: 'GBP';

  readonly specifications:
    readonly FeaturedSpecification[];
}

export const showroomFeaturedEditorial:
Readonly<Record<string, ShowroomFeaturedEditorial>> = {
  'classic-round-solitaire-ring': {
    displayName: 'The Aurelia',
    subtitle: 'Emerald-cut diamond ring',

    image:
      '/images/showroom/featured/featured-masterpiece.webp',

    alt:
      'Emerald-cut diamond ring displayed on a pale textured surface.',

    objectPosition: 'center center',

    priceMinor: 1_480_000,
    currency: 'GBP',

    specifications: [
      {
        icon: 'diamond',
        primary: '2.10 ct',
        secondary: 'Emerald-cut natural diamond',
      },
      {
        icon: 'quality',
        primary: 'D Colour',
        secondary: 'VVS1 Clarity',
      },
      {
        icon: 'setting',
        primary: 'Platinum 950',
        secondary: 'Four-prong setting',
      },
    ],
  },
};

export const fallbackFeaturedEditorial:
ShowroomFeaturedEditorial = {
  displayName: 'Featured Piece',
  subtitle: 'JO.DIAMONDS signature jewellery',

  image:
    '/images/showroom/featured/featured-masterpiece.webp',

  alt:
    'Featured JO.DIAMONDS piece displayed on a pale textured surface.',

  objectPosition: 'center center',

  priceMinor: 1_480_000,
  currency: 'GBP',

  specifications: [
    {
      icon: 'diamond',
      primary: 'Exceptional stone',
      secondary: 'Individually selected',
    },
    {
      icon: 'quality',
      primary: 'Documented',
      secondary: 'Independent certification',
    },
    {
      icon: 'setting',
      primary: 'Hand-finished',
      secondary: 'Crafted in our atelier',
    },
  ],
};
