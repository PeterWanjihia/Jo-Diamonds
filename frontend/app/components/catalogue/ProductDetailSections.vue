<script setup lang="ts">
import { computed } from 'vue';

import type {
  CatalogueGemstoneCaratClaimResponse,
  CatalogueProductDetailResponse,
  CatalogueProductServiceResponse,
} from '../../types/catalogue';

import { formatMoney } from '../../utils/format-money';

const props = defineProps<{
  readonly product: CatalogueProductDetailResponse;
}>();

interface DetailRow {
  readonly label: string;
  readonly value: string;
}

function formatWords(value: string): string {
  return value
    .replaceAll('_', ' ')
    .replace(/\b\w/g, (character) =>
      character.toUpperCase(),
    );
}

function formatMeasurement(
  value: number | null,
  unit: string,
): string | null {
  return value === null ? null : `${value} ${unit}`;
}

const jewelleryRows = computed<readonly DetailRow[]>(() => {
  const details = props.product.jewelleryDetails;

  if (!details) {
    return [];
  }

  const metal = [
    details.metalPurity,
    details.metalColour,
    details.metalType,
  ]
    .filter((value): value is string => Boolean(value))
    .map(formatWords)
    .join(' ');

  const rows: readonly {
    readonly label: string;
    readonly value: string | null;
  }[] = [
    {
      label: 'Metal',
      value: metal || null,
    },
    {
      label: 'Weight',
      value: formatMeasurement(
        details.totalWeightGrams,
        'g',
      ),
    },
    {
      label: 'Setting',
      value: details.settingStyle
        ? formatWords(details.settingStyle)
        : null,
    },
    {
      label: 'Size',
      value:
        details.sizeSystem && details.sizeValue
          ? `${details.sizeSystem} ${details.sizeValue}`
          : null,
    },
    {
      label: 'Width',
      value: formatMeasurement(details.widthMm, 'mm'),
    },
    {
      label: 'Height',
      value: formatMeasurement(details.heightMm, 'mm'),
    },
    {
      label: 'Depth',
      value: formatMeasurement(details.depthMm, 'mm'),
    },
    {
      label: 'Length',
      value: formatMeasurement(details.lengthMm, 'mm'),
    },
    {
      label: 'Clasp',
      value: details.claspType
        ? formatWords(details.claspType)
        : null,
    },
    {
      label: 'Backing',
      value: details.backingType
        ? formatWords(details.backingType)
        : null,
    },
    {
      label: 'Presented as',
      value: details.soldAs
        ? formatWords(details.soldAs)
        : null,
    },
  ];

  return rows.filter(
    (row): row is DetailRow => row.value !== null,
  );
});

function formatCaratClaim(
  claim: CatalogueGemstoneCaratClaimResponse,
): string {
  if (claim.mode === 'range') {
    return `${claim.minimumTotalCaratWeight}–${claim.maximumTotalCaratWeight} ct`;
  }

  const prefix =
    claim.mode === 'approximate' ? 'Approx. ' : '';

  return `${prefix}${claim.totalCaratWeight} ct`;
}

function formatServicePricing(
  service: CatalogueProductServiceResponse,
): string {
  switch (service.pricing.mode) {
    case 'included':
      return 'Included';
    case 'fixed':
      return formatMoney(service.pricing.price);
    case 'on_request':
      return 'Price on request';
  }
}

const issuedAtFormatter = new Intl.DateTimeFormat(
  'en-GB',
  {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  },
);

function formatIssuedAt(value: string): string {
  return issuedAtFormatter.format(new Date(value));
}
</script>

<template>
  <div class="product-details">
    <section
      v-if="jewelleryRows.length"
      class="product-details__section"
      aria-labelledby="piece-details-title"
    >
      <header class="product-details__heading">
        <p>Craft</p>
        <h2 id="piece-details-title">
          Piece details
        </h2>
      </header>

      <dl class="product-details__facts">
        <div
          v-for="row in jewelleryRows"
          :key="row.label"
        >
          <dt>{{ row.label }}</dt>
          <dd>{{ row.value }}</dd>
        </div>
      </dl>

      <p
        v-if="product.jewelleryDetails?.resizeNotes"
        class="product-details__note"
      >
        {{ product.jewelleryDetails.resizeNotes }}
      </p>
    </section>

    <section
      v-if="product.gemstoneGroups.length"
      class="product-details__section"
      aria-labelledby="gemstones-title"
    >
      <header class="product-details__heading">
        <p>Stones</p>
        <h2 id="gemstones-title">
          Gemstone details
        </h2>
      </header>

      <div class="product-details__cards">
        <article
          v-for="gemstone in product.gemstoneGroups"
          :key="`${gemstone.role}-${gemstone.displayOrder}`"
          class="product-details__card"
        >
          <p class="product-details__card-label">
            {{ formatWords(gemstone.role) }} stone
          </p>

          <h3>
            {{ gemstone.quantity }}
            {{ gemstone.shape ? formatWords(gemstone.shape) : '' }}
            {{ formatWords(gemstone.gemstoneType) }}
          </h3>

          <ul>
            <li>{{ formatCaratClaim(gemstone.caratClaim) }}</li>
            <li>{{ formatWords(gemstone.origin) }}</li>
            <li v-if="gemstone.colour">
              {{ gemstone.colour }} colour
            </li>
            <li v-if="gemstone.clarity">
              {{ gemstone.clarity }} clarity
            </li>
            <li v-if="gemstone.cutGrade">
              {{ formatWords(gemstone.cutGrade) }} cut
            </li>
            <li v-if="gemstone.treatment">
              Treatment: {{ formatWords(gemstone.treatment) }}
            </li>
          </ul>

          <p
            v-if="gemstone.notes"
            class="product-details__note"
          >
            {{ gemstone.notes }}
          </p>
        </article>
      </div>
    </section>

    <section
      v-if="product.certificates.length"
      class="product-details__section"
      aria-labelledby="certificates-title"
    >
      <header class="product-details__heading">
        <p>Provenance</p>
        <h2 id="certificates-title">
          Certification
        </h2>
      </header>

      <div class="product-details__cards">
        <article
          v-for="certificate in product.certificates"
          :key="`${certificate.issuer}-${certificate.displayOrder}`"
          class="product-details__card"
        >
          <p class="product-details__card-label">
            {{ formatWords(certificate.scope) }}
          </p>

          <h3>
            {{ certificate.issuer }}
            {{ certificate.certificateType }}
          </h3>

          <ul>
            <li v-if="certificate.certificateNumber">
              Report {{ certificate.certificateNumber }}
            </li>
            <li v-if="certificate.issuedAt">
              Issued {{ formatIssuedAt(certificate.issuedAt) }}
            </li>
          </ul>

          <div class="product-details__links">
            <a
              v-if="certificate.verificationUrl"
              :href="certificate.verificationUrl"
              target="_blank"
              rel="noopener noreferrer"
            >
              Verify report
            </a>
            <a
              v-if="certificate.documentUrl"
              :href="certificate.documentUrl"
              target="_blank"
              rel="noopener noreferrer"
            >
              View document
            </a>
          </div>
        </article>
      </div>
    </section>

    <section
      v-if="product.services.length"
      class="product-details__section"
      aria-labelledby="services-title"
    >
      <header class="product-details__heading">
        <p>Aftercare</p>
        <h2 id="services-title">
          Services
        </h2>
      </header>

      <div class="product-details__cards">
        <article
          v-for="service in product.services"
          :key="`${service.serviceType}-${service.displayOrder}`"
          class="product-details__card"
          :class="{
            'product-details__card--unavailable':
              !service.isAvailable,
          }"
        >
          <p class="product-details__card-label">
            {{ formatWords(service.serviceType) }}
          </p>

          <h3>{{ service.title }}</h3>

          <p v-if="service.description">
            {{ service.description }}
          </p>

          <p class="product-details__service-price">
            {{
              service.isAvailable
                ? formatServicePricing(service)
                : 'Currently unavailable'
            }}
          </p>

          <p
            v-if="service.leadTimeDays !== null"
            class="product-details__note"
          >
            {{
              service.leadTimeDays === 0
                ? 'No additional lead time'
                : `${service.leadTimeDays}-day lead time`
            }}
          </p>
        </article>
      </div>
    </section>
  </div>
</template>

<style scoped>
.product-details {
  width: min(
    calc(100% - (2 * var(--page-gutter))),
    var(--container-wide)
  );
  margin-inline: auto;
  padding-bottom: clamp(4rem, 9vw, 8rem);
}

.product-details__section {
  display: grid;
  grid-template-columns: minmax(12rem, 0.32fr) minmax(0, 0.68fr);
  gap: clamp(2rem, 7vw, 7rem);
  padding-block: clamp(2.75rem, 6vw, 5rem);
  border-top: var(--border-thin);
}

.product-details__heading p,
.product-details__card-label {
  margin: 0 0 var(--space-3);
  color: var(--colour-gold);
  font-size: var(--font-size-caption);
  font-weight: 600;
  letter-spacing: var(--letter-spacing-label);
  text-transform: uppercase;
}

.product-details__heading h2 {
  margin: 0;
  font-family: var(--font-display);
  font-size: clamp(2.25rem, 5vw, 4.5rem);
  font-weight: 400;
  line-height: 0.95;
}

.product-details__facts {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  margin: 0;
  border-top: var(--border-thin);
}

.product-details__facts div {
  display: grid;
  grid-template-columns: minmax(6rem, 0.45fr) minmax(0, 0.55fr);
  gap: var(--space-4);
  padding: var(--space-4) 0;
  border-bottom: var(--border-thin);
}

.product-details__facts div:nth-child(odd) {
  padding-right: var(--space-6);
}

.product-details__facts div:nth-child(even) {
  padding-left: var(--space-6);
  border-left: var(--border-thin);
}

.product-details__facts dt,
.product-details__facts dd {
  min-width: 0;
  margin: 0;
  font-size: 0.75rem;
  line-height: 1.5;
  overflow-wrap: anywhere;
}

.product-details__facts dt {
  color: var(--colour-text-muted);
}

.product-details__cards {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: var(--space-5);
}

.product-details__card {
  padding: clamp(1.5rem, 3vw, 2.25rem);
  border: var(--border-thin);
  background: rgb(255 255 255 / 50%);
}

.product-details__card--unavailable {
  opacity: 0.62;
}

.product-details__card h3 {
  margin: 0;
  font-family: var(--font-display);
  font-size: clamp(1.35rem, 2.5vw, 1.85rem);
  font-weight: 500;
  line-height: 1.1;
  overflow-wrap: anywhere;
}

.product-details__card > p:not(.product-details__card-label),
.product-details__card li,
.product-details__note {
  color: var(--colour-text-muted);
  font-size: 0.75rem;
  line-height: 1.6;
  overflow-wrap: anywhere;
}

.product-details__card ul {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem 1rem;
  margin: var(--space-4) 0 0;
  padding: 0;
  list-style: none;
}

.product-details__card li:not(:last-child)::after {
  content: '·';
  margin-left: 1rem;
}

.product-details__note {
  margin: var(--space-4) 0 0;
}

.product-details__service-price {
  margin: var(--space-4) 0 0;
  color: var(--colour-text) !important;
  font-weight: 600;
}

.product-details__links {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-5);
  margin-top: var(--space-5);
}

.product-details__links a {
  display: inline-flex;
  max-width: 100%;
  min-height: 2.75rem;
  align-items: center;
  padding-bottom: 0.2rem;
  border-bottom: 1px solid currentColor;
  color: var(--colour-text);
  font-size: var(--font-size-label);
  font-weight: 600;
  letter-spacing: var(--letter-spacing-label);
  text-transform: uppercase;
  overflow-wrap: anywhere;
}

@media (max-width: 760px) {
  .product-details {
    width: calc(100% - 2rem);
  }

  .product-details__section {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .product-details__facts,
  .product-details__cards {
    grid-template-columns: 1fr;
  }

  .product-details__facts div:nth-child(odd),
  .product-details__facts div:nth-child(even) {
    padding-inline: 0;
    border-left: 0;
  }
}
</style>
