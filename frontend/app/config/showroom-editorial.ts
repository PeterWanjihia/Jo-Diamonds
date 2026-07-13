export const showroomCollectionOrder = [
  'signature-solitaires',
  'modern-icons',
  'heritage-halo',
] as const;

export type ShowroomCollectionSlug =
  (typeof showroomCollectionOrder)[number];

export type CollectionCardTone =
  | 'light'
  | 'dark';

export interface ShowroomCollectionEditorial {
  readonly image: string;
  readonly alt: string;
  readonly tone: CollectionCardTone;
  readonly objectPosition: string;
  readonly overlayStrength: 'strong' | 'soft';
}

export const showroomCollectionEditorial:
Readonly<Record<
  ShowroomCollectionSlug,
  ShowroomCollectionEditorial
>> = {
  'signature-solitaires': {
    image:
      '/images/showroom/collections/signature-solitaires.webp',

    alt:
      'Round diamond solitaire ring displayed on warm fabric.',

    tone: 'light',
    objectPosition: 'center center',
    overlayStrength: 'strong',
  },

  'modern-icons': {
    image:
      '/images/showroom/collections/modern-icons.webp',

    alt:
      'Emerald-cut diamond ring presented against a pale neutral background.',

    tone: 'dark',
    objectPosition: 'center center',
    overlayStrength: 'soft',
  },

  'heritage-halo': {
    image:
      '/images/showroom/collections/heritage-halo.webp',

    alt:
      'Diamond halo ring presented against a warm ivory background.',

    tone: 'dark',
    objectPosition: 'center center',
    overlayStrength: 'soft',
  },
};
