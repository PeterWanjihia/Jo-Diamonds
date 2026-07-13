<script setup lang="ts">
import {
  computed,
  resolveComponent,
} from 'vue';

type IconButtonVariant =
  | 'ghost'
  | 'outline'
  | 'solid';

type IconButtonTone =
  | 'light'
  | 'dark';

type IconButtonSize =
  | 'small'
  | 'medium'
  | 'large';

type IconButtonShape =
  | 'square'
  | 'circle';

const props = withDefaults(
  defineProps<{
    readonly ariaLabel: string;

    readonly to?: string;
    readonly href?: string;
    readonly external?: boolean;

    readonly type?:
      | 'button'
      | 'submit'
      | 'reset';

    readonly variant?: IconButtonVariant;
    readonly tone?: IconButtonTone;
    readonly size?: IconButtonSize;
    readonly shape?: IconButtonShape;

    readonly disabled?: boolean;
  }>(),
  {
    to: undefined,
    href: undefined,
    external: false,

    type: 'button',

    variant: 'ghost',
    tone: 'light',
    size: 'medium',
    shape: 'square',

    disabled: false,
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
    class="base-icon-button"
    :class="[
      `base-icon-button--${variant}`,
      `base-icon-button--tone-${tone}`,
      `base-icon-button--${size}`,
      `base-icon-button--${shape}`,
      {
        'base-icon-button--disabled': disabled,
      },
    ]"
    @click="handleClick"
  >
    <span class="base-icon-button__icon">
      <slot />
    </span>
  </component>
</template>

<style scoped>
.base-icon-button {
  display: inline-grid;

  flex: 0 0 auto;

  place-items: center;

  padding: 0;

  border:
    1px solid
    transparent;

  background: transparent;

  color: inherit;

  line-height: 1;

  cursor: pointer;

  transition:
    color
      var(--duration-fast)
      var(--ease-standard),
    background-color
      var(--duration-normal)
      var(--ease-standard),
    border-color
      var(--duration-normal)
      var(--ease-standard),
    transform
      var(--duration-fast)
      var(--ease-standard);
}

.base-icon-button:hover {
  transform: translateY(-1px);
}

.base-icon-button:active {
  transform: translateY(0);
}

/*
 * Sizes
 */

.base-icon-button--small {
  width: 2.5rem;
  height: 2.5rem;
}

.base-icon-button--medium {
  width: 2.875rem;
  height: 2.875rem;
}

.base-icon-button--large {
  width: 3.25rem;
  height: 3.25rem;
}

/*
 * Shapes
 */

.base-icon-button--square {
  border-radius: 0;
}

.base-icon-button--circle {
  border-radius: 999px;
}

/*
 * Ghost controls on light surfaces.
 */

.base-icon-button--ghost.base-icon-button--tone-light {
  color: var(--colour-text);
}

.base-icon-button--ghost.base-icon-button--tone-light:hover {
  background:
    rgb(23 22 18 / 6%);

  color: var(--colour-gold);
}

/*
 * Ghost controls on dark surfaces.
 */

.base-icon-button--ghost.base-icon-button--tone-dark {
  color: var(--colour-text-on-dark);
}

.base-icon-button--ghost.base-icon-button--tone-dark:hover {
  background:
    rgb(247 243 237 / 9%);

  color: var(--colour-gold-soft);
}

/*
 * Outlined controls on light surfaces.
 */

.base-icon-button--outline.base-icon-button--tone-light {
  border-color:
    rgb(23 22 18 / 42%);

  color: var(--colour-text);
}

.base-icon-button--outline.base-icon-button--tone-light:hover {
  border-color: var(--colour-ink);

  background: var(--colour-ink);
  color: var(--colour-text-on-dark);
}

/*
 * Outlined controls on dark surfaces.
 */

.base-icon-button--outline.base-icon-button--tone-dark {
  border-color:
    rgb(247 243 237 / 52%);

  color: var(--colour-text-on-dark);
}

.base-icon-button--outline.base-icon-button--tone-dark:hover {
  border-color: var(--colour-paper);

  background: var(--colour-paper);
  color: var(--colour-ink);
}

/*
 * Solid controls on light surfaces.
 */

.base-icon-button--solid.base-icon-button--tone-light {
  border-color: var(--colour-ink);

  background: var(--colour-ink);
  color: var(--colour-text-on-dark);
}

.base-icon-button--solid.base-icon-button--tone-light:hover {
  border-color: var(--colour-ink-soft);

  background: var(--colour-ink-soft);
}

/*
 * Solid controls on dark surfaces.
 */

.base-icon-button--solid.base-icon-button--tone-dark {
  border-color: var(--colour-paper);

  background: var(--colour-paper);
  color: var(--colour-ink);
}

.base-icon-button--solid.base-icon-button--tone-dark:hover {
  border-color: var(--colour-surface);

  background: var(--colour-surface);
}

/*
 * Icon sizing
 */

.base-icon-button__icon {
  display: grid;

  width: 1.125rem;
  height: 1.125rem;

  place-items: center;
}

.base-icon-button--small
.base-icon-button__icon {
  width: 1rem;
  height: 1rem;
}

.base-icon-button--large
.base-icon-button__icon {
  width: 1.25rem;
  height: 1.25rem;
}

.base-icon-button__icon :deep(svg) {
  width: 100%;
  height: 100%;

  fill: none;

  stroke: currentColor;
  stroke-width: 1.35;
  stroke-linecap: round;
  stroke-linejoin: round;
}

/*
 * Disabled state
 */

.base-icon-button--disabled {
  opacity: 0.38;

  cursor: not-allowed;
  pointer-events: none;

  transform: none;
}
</style>
