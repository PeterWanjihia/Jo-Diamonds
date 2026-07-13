<script setup lang="ts">
import {
  computed,
  onBeforeUnmount,
  ref,
  watch,
} from 'vue';

const route = useRoute();

const isMenuOpen = ref(false);

const isCollectionRoute = computed(
  () => route.path.startsWith('/collection'),
);

const collectionUrl = '/collection/';
const craftUrl = '/collection/#craft';
const privateViewingUrl =
  '/collection/#private-experience';

const conciergeEmail =
  'concierge@jodiamonds.store';

const conciergeUrl =
  `mailto:${conciergeEmail}?subject=${encodeURIComponent(
    'Private client assistance',
  )}`;

function closeMenu(): void {
  isMenuOpen.value = false;
}

function toggleMenu(): void {
  isMenuOpen.value = !isMenuOpen.value;
}

watch(
  () => route.fullPath,
  () => {
    closeMenu();
  },
);

watch(isMenuOpen, (isOpen) => {
  if (!import.meta.client) {
    return;
  }

  document.documentElement.style.overflow =
    isOpen ? 'hidden' : '';
});

onBeforeUnmount(() => {
  if (!import.meta.client) {
    return;
  }

  document.documentElement.style.overflow = '';
});
</script>

<template>
  <header class="site-header">
    <div class="site-header__inner">
      <!-- Mobile menu button -->
      <button
        class="site-header__menu-button"
        type="button"
        aria-controls="mobile-navigation"
        :aria-expanded="isMenuOpen"
        :aria-label="
          isMenuOpen
            ? 'Close navigation'
            : 'Open navigation'
        "
        @click="toggleMenu"
      >
        <svg
          v-if="!isMenuOpen"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <path d="M4 8h16" />
          <path d="M4 16h16" />
        </svg>

        <svg
          v-else
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <path d="m6 6 12 12" />
          <path d="m18 6-12 12" />
        </svg>
      </button>

      <!-- Desktop left navigation -->
      <nav
        class="
          site-header__navigation
          site-header__navigation--left
        "
        aria-label="Primary navigation"
      >
        <NuxtLink
          class="site-header__navigation-link"
          :class="{
            'site-header__navigation-link--active':
              isCollectionRoute,
          }"
          :to="collectionUrl"
          :aria-current="
            isCollectionRoute
              ? 'page'
              : undefined
          "
        >
          The Collection
        </NuxtLink>

        <NuxtLink
          class="site-header__navigation-link"
          :to="craftUrl"
        >
          Our Craft
        </NuxtLink>

        <NuxtLink
          class="site-header__navigation-link"
          :to="privateViewingUrl"
        >
          Private Viewing
        </NuxtLink>
      </nav>

      <!-- Centred wordmark -->
      <NuxtLink
        class="site-header__wordmark"
        to="/"
        aria-label="JO.DIAMONDS home"
      >
        JO.DIAMONDS
      </NuxtLink>

      <!-- Desktop right navigation -->
      <nav
        class="
          site-header__navigation
          site-header__navigation--right
        "
        aria-label="Customer navigation"
      >
        <button
          class="site-header__action"
          type="button"
          aria-label="Search the collection"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <circle
              cx="11"
              cy="11"
              r="6.5"
            />

            <path d="m16 16 4 4" />
          </svg>

          <span>Search</span>
        </button>

        <button
          class="site-header__action"
          type="button"
          aria-label="Customer account"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <circle
              cx="12"
              cy="8"
              r="3.5"
            />

            <path
              d="
                M5.5 20
                c.6-4 3-6 6.5-6
                s5.9 2 6.5 6
              "
            />
          </svg>

          <span>Account</span>
        </button>

        <button
          class="site-header__action"
          type="button"
          aria-label="Private bag, zero items"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <path d="M5 8.5h14l1 12H4z" />

            <path
              d="
                M8.5 9
                V6.5
                a3.5 3.5 0 0 1 7 0
                V9
              "
            />
          </svg>

          <span>Bag (0)</span>
        </button>
      </nav>

      <!-- Mobile bag button -->
      <button
        class="site-header__mobile-bag"
        type="button"
        aria-label="Private bag, zero items"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <path d="M5 8.5h14l1 12H4z" />

          <path
            d="
              M8.5 9
              V6.5
              a3.5 3.5 0 0 1 7 0
              V9
            "
          />
        </svg>

        <span>0</span>
      </button>
    </div>

    <!-- Mobile navigation drawer -->
    <Transition name="mobile-navigation">
      <div
        v-if="isMenuOpen"
        id="mobile-navigation"
        class="mobile-navigation"
      >
        <nav
          class="mobile-navigation__inner"
          aria-label="Mobile navigation"
        >
          <div class="mobile-navigation__primary">
            <NuxtLink
              :to="collectionUrl"
              @click="closeMenu"
            >
              The Collection
            </NuxtLink>

            <NuxtLink
              :to="craftUrl"
              @click="closeMenu"
            >
              Our Craft
            </NuxtLink>

            <NuxtLink
              :to="privateViewingUrl"
              @click="closeMenu"
            >
              Private Viewing
            </NuxtLink>
          </div>

          <div class="mobile-navigation__actions">
            <button type="button">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <circle
                  cx="11"
                  cy="11"
                  r="6.5"
                />

                <path d="m16 16 4 4" />
              </svg>

              Search
            </button>

            <button type="button">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <circle
                  cx="12"
                  cy="8"
                  r="3.5"
                />

                <path
                  d="
                    M5.5 20
                    c.6-4 3-6 6.5-6
                    s5.9 2 6.5 6
                  "
                />
              </svg>

              Account
            </button>

            <button type="button">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M5 8.5h14l1 12H4z"
                />

                <path
                  d="
                    M8.5 9
                    V6.5
                    a3.5 3.5 0 0 1 7 0
                    V9
                  "
                />
              </svg>

              Private Bag (0)
            </button>
          </div>

          <div class="mobile-navigation__concierge">
            <p>
              Private client assistance
            </p>

            <a :href="conciergeUrl">
              Contact the concierge

              <span aria-hidden="true">
                →
              </span>
            </a>
          </div>
        </nav>
      </div>
    </Transition>
  </header>
</template>

<style scoped>
.site-header {
  position: sticky;
  top: 0;

  z-index: var(--z-header);

  width: 100%;

  border-bottom: var(--border-thin);

  background:
    rgb(252 250 246 / 97%);

  color: var(--colour-text);

  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
}

.site-header__inner {
  display: grid;
  grid-template-columns:
    minmax(0, 1fr)
    auto
    minmax(0, 1fr);

  width: min(
    calc(100% - (2 * var(--page-gutter))),
    var(--container-wide)
  );

  min-height: 4.5rem;

  align-items: center;

  margin-inline: auto;
}

.site-header__navigation {
  display: flex;
  align-items: center;

  min-width: 0;
}

.site-header__navigation--left {
  justify-content: flex-start;

  gap: clamp(
    1.25rem,
    2.6vw,
    2.75rem
  );
}

.site-header__navigation--right {
  justify-content: flex-end;

  gap: clamp(
    1rem,
    2vw,
    2rem
  );
}

.site-header__navigation-link,
.site-header__action {
  position: relative;

  display: inline-flex;
  align-items: center;

  color: var(--colour-text);

  font-size: 0.6875rem;
  font-weight: 500;

  line-height: 1;
  letter-spacing: 0.065em;

  text-transform: uppercase;
  white-space: nowrap;
}

.site-header__navigation-link {
  min-height: 2.75rem;
}

.site-header__navigation-link::after {
  content: '';

  position: absolute;
  right: 0;
  bottom: 0.35rem;
  left: 0;

  height: 1px;

  background: var(--colour-gold);

  transform: scaleX(0);
  transform-origin: right;

  transition:
    transform
    var(--duration-normal)
    var(--ease-standard);
}

.site-header__navigation-link:hover::after,
.site-header__navigation-link:focus-visible::after,
.site-header__navigation-link--active::after {
  transform: scaleX(1);
  transform-origin: left;
}

.site-header__wordmark {
  justify-self: center;

  padding-inline: var(--space-5);

  font-family: var(--font-display);
  font-size: clamp(
    1.75rem,
    2.8vw,
    2.625rem
  );
  font-weight: 400;

  line-height: 1;
  letter-spacing: 0.045em;

  white-space: nowrap;
}

.site-header__action {
  gap: 0.4375rem;

  min-height: 2.75rem;

  padding: 0;

  border: 0;

  background: transparent;

  cursor: pointer;

  transition:
    color
    var(--duration-fast)
    var(--ease-standard);
}

.site-header__action:hover {
  color: var(--colour-gold);
}

.site-header__action svg,
.site-header__menu-button svg,
.site-header__mobile-bag svg,
.mobile-navigation__actions svg {
  width: 1.125rem;
  height: 1.125rem;

  flex: 0 0 auto;

  stroke: currentColor;
  stroke-width: 1.35;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.site-header__menu-button,
.site-header__mobile-bag {
  display: none;

  border: 0;

  background: transparent;
  color: inherit;

  cursor: pointer;
}

/* Laptop */

@media (max-width: 1120px) {
  .site-header__inner {
    min-height: 4.25rem;
  }

  .site-header__navigation--left {
    gap: 1.25rem;
  }

  .site-header__navigation--right {
    gap: 1rem;
  }

  .site-header__navigation-link,
  .site-header__action {
    font-size: 0.625rem;
  }

  .site-header__wordmark {
    font-size: 2rem;
  }
}

/* Mobile header */

@media (max-width: 820px) {
  .site-header__inner {
    grid-template-columns:
      2.75rem
      minmax(0, 1fr)
      2.75rem;

    width: calc(100% - 2rem);
    min-height: 4rem;
  }

  .site-header__navigation {
    display: none;
  }

  .site-header__menu-button,
  .site-header__mobile-bag {
    display: inline-grid;

    width: 2.75rem;
    height: 2.75rem;

    place-items: center;

    padding: 0;
  }

  .site-header__menu-button {
    justify-self: start;
  }

  .site-header__mobile-bag {
    position: relative;

    justify-self: end;
  }

  .site-header__mobile-bag span {
    position: absolute;
    top: 0.25rem;
    right: 0.125rem;

    display: grid;

    min-width: 1rem;
    height: 1rem;

    place-items: center;

    border-radius: 999px;

    background: var(--colour-ink);
    color: var(--colour-text-on-dark);

    font-size: 0.5625rem;

    line-height: 1;
  }

  .site-header__wordmark {
    justify-self: center;

    padding-inline: var(--space-3);

    font-size: clamp(
      1.55rem,
      7vw,
      2rem
    );
  }
}

/* Mobile navigation drawer */

.mobile-navigation {
  position: absolute;
  top: 100%;
  right: 0;
  left: 0;

  height: calc(
    100dvh - 4rem
  );

  overflow-y: auto;

  border-top: var(--border-thin);

  background: var(--colour-paper);
}

.mobile-navigation__inner {
  display: flex;

  width: min(
    calc(100% - 2.5rem),
    34rem
  );

  min-height: 100%;

  flex-direction: column;

  margin-inline: auto;

  padding-block:
    var(--space-7)
    var(--space-6);
}

.mobile-navigation__primary {
  display: grid;

  gap: var(--space-5);
}

.mobile-navigation__primary a {
  width: fit-content;

  font-family: var(--font-display);
  font-size: clamp(
    2.25rem,
    10vw,
    3.5rem
  );
  font-weight: 400;

  line-height: 1.05;
}

.mobile-navigation__actions {
  display: grid;

  margin-top: var(--space-7);

  border-top: var(--border-thin);
}

.mobile-navigation__actions button {
  display: flex;

  min-height: 3.75rem;

  align-items: center;

  gap: var(--space-4);

  padding: 0;

  border: 0;
  border-bottom: var(--border-thin);

  background: transparent;
  color: inherit;

  font-size: var(--font-size-label);
  font-weight: 600;

  letter-spacing:
    var(--letter-spacing-label);

  text-transform: uppercase;

  cursor: pointer;
}

.mobile-navigation__concierge {
  margin-top: auto;

  padding-top: var(--space-8);
}

.mobile-navigation__concierge p {
  margin: 0;

  color: var(--colour-gold);

  font-size: var(--font-size-caption);
  font-weight: 600;

  letter-spacing:
    var(--letter-spacing-label);

  text-transform: uppercase;
}

.mobile-navigation__concierge a {
  display: inline-flex;

  align-items: center;

  gap: var(--space-4);

  margin-top: var(--space-3);

  padding-bottom: var(--space-2);

  border-bottom:
    1px solid
    var(--colour-text);

  font-family: var(--font-display);
  font-size: 1.5rem;
}

/* Drawer transition */

.mobile-navigation-enter-active,
.mobile-navigation-leave-active {
  transition:
    opacity
    var(--duration-normal)
    var(--ease-standard),
    transform
    var(--duration-normal)
    var(--ease-standard);
}

.mobile-navigation-enter-from,
.mobile-navigation-leave-to {
  opacity: 0;

  transform:
    translateY(-0.75rem);
}
</style>