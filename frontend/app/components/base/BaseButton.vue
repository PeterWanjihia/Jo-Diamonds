<script setup lang="ts">
import {
  computed,
  resolveComponent,
} from 'vue';

type ButtonVariant =
  | 'solid'
  | 'outline';

type ButtonTone =
  | 'light'
  | 'dark';

type ButtonSize =
  | 'compact'
  | 'standard'
  | 'large';

const props = withDefaults(
  defineProps<{
    /*
     * Use `to` for internal Nuxt navigation.
     */
    readonly to?: string;

    /*
     * Use `href` for ordinary or external links.
     */
    readonly href?: string;

    readonly external?: boolean;

    readonly type?:
      | 'button'
      | 'submit'
      | 'reset';

    readonly variant?: ButtonVariant;
    readonly tone?: ButtonTone;
    readonly size?: ButtonSize;

    readonly block?: boolean;
    readonly disabled?: boolean;

    readonly ariaLabel?: string;
  }>(),
  {
    to: undefined,
    href: undefined,
    external: false,

    type: 'button',

    variant: 'solid',
    tone: 'light',
    size: 'standard',

    block: false,
    disabled: false,

    ariaLabel: undefined,
  },
);

const emit = defineEmits<{
  click: [event: MouseEvent];
}>();

const component = computed(() => {
  if (props.to) {
    return resolveComponent('NuxtLink');
  }

  if (props.href) {
    return 'a';
  }

  return 'button';
});

const elementAttributes = computed<
  Record<string, unknown>
>(() => {
  const commonAttributes = {
    'aria-label': props.ariaLabel,

    'aria-disabled':
      props.disabled
        ? 'true'
        : undefined,

    tabindex:
      props.disabled &&
      (props.to || props.href)
        ? -1
        : undefined,
  };

  if (props.to) {
    return {
      ...commonAttributes,
      to: props.to,
    };
  }

  if (props.href) {
    return {
      ...commonAttributes,

      href: props.href,

      target:
        props.external
          ? '_blank'
          : undefined,

      rel:
        props.external
          ? 'noopener noreferrer'
          : undefined,
    };
  }

  return {
    ...commonAttributes,

    type: props.type,
    disabled: props.disabled,
  };
});

function handleClick(
  event: MouseEvent,
): void {
  if (props.disabled) {
    event.preventDefault();
    event.stopImmediatePropagation();

    return;
  }

  emit('click', event);
}
</script>

<template>
  <component
    :is="component"
    v-bind="elementAttributes"
    class="base-button"
    :class="[
      `base-button--${variant}`,
      `base-button--tone-${tone}`,
      `base-button--${size}`,
      {
        'base-button--block': block,
        'base-button--disabled': disabled,
      },
    ]"
    @click="handleClick"
  >
    <span
      v-if="$slots.leading"
      class="base-button__icon"
      aria-hidden="true"
    >
      <slot name="leading" />
    </span>

    <span class="base-button__label">
      <slot />
    </span>

    <span
      v-if="$slots.trailing"
      class="base-button__icon"
      aria-hidden="true"
    >
      <slot name="trailing" />
    </span>
  </component>
</template>

<style scoped>
.base-button {
  display: inline-flex;

  min-height: 2.875rem;

  align-items: center;
  justify-content: center;

  gap: 0.75rem;

  border:
    1px solid
    transparent;

  border-radius: 0;

  font-family:
    var(--font-interface);

  font-size:
    var(--font-size-label);

  font-weight: 600;

  line-height: 1;

  letter-spacing:
    var(--letter-spacing-label);

  text-align: center;
  text-transform: uppercase;

  cursor: pointer;

  transition:
    background-color
      var(--duration-normal)
      var(--ease-standard),
    border-color
      var(--duration-normal)
      var(--ease-standard),
    color
      var(--duration-normal)
      var(--ease-standard),
    transform
      var(--duration-fast)
      var(--ease-standard);
}

.base-button:hover {
  transform: translateY(-1px);
}

.base-button:active {
  transform: translateY(0);
}

/*
 * Sizes
 */

.base-button--compact {
  min-height: 2.5rem;

  padding:
    0.75rem
    1.125rem;

  font-size: 0.6875rem;
}

.base-button--standard {
  min-height: 2.875rem;

  padding:
    0.875rem
    1.5rem;
}

.base-button--large {
  min-height: 3.25rem;

  padding:
    1rem
    1.875rem;
}

/*
 * Solid button on a light background.
 */

.base-button--solid.base-button--tone-light {
  border-color:
    var(--colour-ink);

  background:
    var(--colour-ink);

  color:
    var(--colour-text-on-dark);
}

.base-button--solid.base-button--tone-light:hover {
  border-color:
    var(--colour-ink-soft);

  background:
    var(--colour-ink-soft);
}

/*
 * Solid button on a dark background.
 */

.base-button--solid.base-button--tone-dark {
  border-color:
    var(--colour-paper);

  background:
    var(--colour-paper);

  color:
    var(--colour-ink);
}

.base-button--solid.base-button--tone-dark:hover {
  border-color:
    var(--colour-surface);

  background:
    var(--colour-surface);
}

/*
 * Outlined button on a light background.
 */

.base-button--outline.base-button--tone-light {
  border-color:
    rgb(23 22 18 / 48%);

  background:
    transparent;

  color:
    var(--colour-text);
}

.base-button--outline.base-button--tone-light:hover {
  border-color:
    var(--colour-ink);

  background:
    var(--colour-ink);

  color:
    var(--colour-text-on-dark);
}

/*
 * Outlined button on a dark background.
 */

.base-button--outline.base-button--tone-dark {
  border-color:
    rgb(247 243 237 / 58%);

  background:
    transparent;

  color:
    var(--colour-text-on-dark);
}

.base-button--outline.base-button--tone-dark:hover {
  border-color:
    var(--colour-paper);

  background:
    var(--colour-paper);

  color:
    var(--colour-ink);
}

/*
 * Full-width use, especially on mobile and product panels.
 */

.base-button--block {
  width: 100%;
}

/*
 * Disabled state works for buttons, links and Nuxt links.
 */

.base-button--disabled {
  opacity: 0.42;

  cursor: not-allowed;
  pointer-events: none;

  transform: none;
}

.base-button__label {
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.base-button__icon {
  display: inline-grid;

  width: 1rem;
  height: 1rem;

  flex: 0 0 auto;

  place-items: center;
}

.base-button__icon :deep(svg) {
  width: 100%;
  height: 100%;

  stroke: currentColor;
  stroke-width: 1.4;
  stroke-linecap: round;
  stroke-linejoin: round;
}

/*
 * Slightly larger tap target on touch-oriented screens.
 */

@media (max-width: 620px) {
  .base-button--standard {
    min-height: 3rem;

    padding-inline: 1.25rem;
  }

  .base-button--large {
    min-height: 3.25rem;

    padding-inline: 1.5rem;
  }
}
</style>
