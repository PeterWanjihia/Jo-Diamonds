export const collectionLandingOrder = [
  'signature-solitaires',
  'modern-icons',
  'heritage-halo',
] as const;

export type CollectionLandingSlug =
  (typeof collectionLandingOrder)[number];

export type CollectionLandingTone =
  | 'dark'
  | 'light';

export interface CollectionLandingEditorial {
  readonly image: string;
  readonly alt: string;
  readonly description: string;
  readonly tone: CollectionLandingTone;
  readonly objectPosition: string;
}

export const collectionLandingEditorial:
Readonly<Record<
  CollectionLandingSlug,
  CollectionLandingEditorial
>> = {
  'signature-solitaires': {
    image:
      '/images/collection/cards/signature-solitaires.webp',

    alt:
      'Round diamond solitaire ring presented against a dark background.',

    description:
      'Timeless expressions of singular beauty.',

    tone: 'dark',

    objectPosition:
      'center center',
  },

  'modern-icons': {
    image:
      '/images/collection/cards/modern-icons.webp',

    alt:
      'Pair of diamond earrings presented against a warm ivory background.',

    description:
      'Contemporary designs with a distinct point of view.',

    tone: 'light',

    objectPosition:
      'center center',
  },

  'heritage-halo': {
    image:
      '/images/collection/cards/heritage-halo.webp',

    alt:
      'Diamond halo ring presented against a dark background.',

    description:
      'Inspired by tradition, created for today.',

    tone: 'dark',

    objectPosition:
      'center center',
  },
};