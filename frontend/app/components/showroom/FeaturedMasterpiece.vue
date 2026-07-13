<script setup lang="ts">
import ProductCommercialState from '../catalogue/ProductCommercialState.vue';
import ProductImage from '../catalogue/ProductImage.vue';
import ProductPrice from '../catalogue/ProductPrice.vue';

import type {
  CatalogueProductSummaryResponse,
} from '../../types/catalogue';

defineProps<{
  readonly product: CatalogueProductSummaryResponse;
}>();
</script>

<template>
  <section
    id="featured-piece"
    class="featured-piece"
  >
    <div class="page-container page-container--wide">
      <div class="featured-piece__layout">
        <div class="featured-piece__media">
          <ProductImage
            :src="product.primaryImage?.url ?? null"
            :alt="
              product.primaryImage?.altText ??
              product.name
            "
          />
        </div>

        <div class="featured-piece__content">
          <p class="featured-piece__eyebrow">
            Featured masterpiece
          </p>

          <p
            v-if="product.collection"
            class="featured-piece__collection"
          >
            {{ product.collection.name }}
          </p>

          <h2 class="featured-piece__title">
            {{ product.name }}
          </h2>

          <p class="featured-piece__description">
            {{ product.shortDescription }}
          </p>

          <dl class="featured-piece__facts">
            <div>
              <dt>Reference</dt>
              <dd>{{ product.sku }}</dd>
            </div>

            <div>
              <dt>Supply</dt>
              <dd>
                <template
                  v-if="product.supply.mode === 'unique'"
                >
                  One of one
                </template>

                <template
                  v-else-if="
                    product.supply.mode === 'limited'
                  "
                >
                  Edition of
                  {{ product.supply.editionSize }}
                </template>

                <template v-else>
                  Made to order
                </template>
              </dd>
            </div>

            <div>
              <dt>Photography</dt>
              <dd>
                {{
                  product.photographyType === 'exact'
                    ? 'Exact piece'
                    : 'Representative'
                }}
              </dd>
            </div>
          </dl>

          <div class="featured-piece__commercial">
            <ProductPrice :price="product.price" />

            <ProductCommercialState
              :state="product.commercialState"
            />
          </div>

          <a
            class="featured-piece__link"
            href="#collections"
          >
            Explore the collection

            <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.featured-piece {
  padding-block:
    clamp(var(--space-8), 9vw, var(--space-10));

  background: var(--colour-paper);
}

.featured-piece__layout {
  display: grid;
  grid-template-columns:
    minmax(0, 1.15fr)
    minmax(22rem, 0.85fr);

  min-height: 44rem;
}

.featured-piece__media {
  min-height: 38rem;
}

.featured-piece__content {
  display: flex;
  flex-direction: column;
  justify-content: center;

  padding:
    clamp(var(--space-7), 6vw, var(--space-10));

  background: var(--colour-ivory);
}

.featured-piece__eyebrow,
.featured-piece__collection {
  font-size: var(--font-size-label);
  font-weight: 600;

  letter-spacing: var(--letter-spacing-label);
  text-transform: uppercase;
}

.featured-piece__eyebrow {
  color: var(--colour-gold);
}

.featured-piece__collection {
  margin-top: var(--space-6);
  color: var(--colour-text-muted);
}

.featured-piece__title {
  max-width: 11ch;
  margin-top: var(--space-4);

  font-family: var(--font-display);
  font-size: var(--font-size-heading-medium);
  font-weight: 400;

  line-height: var(--line-height-tight);
}

.featured-piece__description {
  max-width: 34rem;
  margin-top: var(--space-5);

  color: var(--colour-text-muted);
  font-size: var(--font-size-body-large);
}

.featured-piece__facts {
  display: grid;
  grid-template-columns:
    repeat(3, minmax(0, 1fr));

  gap: var(--space-5);

  margin-top: var(--space-7);
  padding-block: var(--space-5);

  border-block: var(--border-thin);
}

.featured-piece__facts div {
  display: grid;
  gap: var(--space-2);
}

.featured-piece__facts dt {
  color: var(--colour-text-muted);

  font-size: var(--font-size-caption);
  font-weight: 600;

  letter-spacing: var(--letter-spacing-label);
  text-transform: uppercase;
}

.featured-piece__facts dd {
  font-size: var(--font-size-body-small);
}

.featured-piece__commercial {
  display: flex;
  align-items: end;
  justify-content: space-between;
  gap: var(--space-5);

  margin-top: var(--space-7);
}

.featured-piece__link {
  display: inline-flex;
  width: fit-content;
  align-items: center;
  gap: var(--space-3);

  margin-top: var(--space-7);
  padding-bottom: var(--space-2);

  border-bottom:
    1px solid var(--colour-text);

  font-size: var(--font-size-label);
  font-weight: 600;

  letter-spacing: var(--letter-spacing-label);
  text-transform: uppercase;
}

@media (max-width: 900px) {
  .featured-piece__layout {
    grid-template-columns: 1fr;
  }

  .featured-piece__content {
    padding:
      var(--space-7)
      var(--space-6);
  }
}

@media (max-width: 560px) {
  .featured-piece__media {
    min-height: 27rem;
  }

  .featured-piece__facts {
    grid-template-columns: 1fr;
  }

  .featured-piece__commercial {
    align-items: flex-start;
    flex-direction: column;
  }
}
</style>
