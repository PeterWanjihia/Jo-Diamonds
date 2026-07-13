<script setup lang="ts">
import {
  computed,
  resolveComponent,
} from 'vue';

type TextLinkTone =
  | 'light'
  | 'dark';

type TextLinkArrow =
  | 'right'
  | 'down'
  | 'none';

const props = withDefaults(
  defineProps<{
    readonly to?: string;
    readonly href?: string;
    readonly external?: boolean;

    readonly tone?: TextLinkTone;
    readonly arrow?: TextLinkArrow;

    readonly disabled?: boolean;
    readonly ariaLabel?: string;
  }>(),
  {
    to: undefined,
    href: undefined,
    external: false,

    tone: 'light',
    arrow: 'right',

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
    type: 'button',
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
    class="base-text-link"
    :class="[
      `base-text-link--tone-${tone}`,
      {
        'base-text-link--disabled': disabled,
      },
    ]"
    @click="handleClick"
  >
    <span class="base-text-link__label">
      <slot />
    </span>

    <span
      v-if="arrow !== 'none'"
      class="base-text-link__arrow"
      :class="{
        'base-text-link__arrow--down':
          arrow === 'down',
      }"
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
      >
        <path d="M5 12h14" />
        <path d="m14 7 5 5-5 5" />
      </svg>
    </span>
  </component>
</template>

<style scoped>
.base-text-link {
  position: relative;

  display: inline-flex;
  width: fit-content;

  align-items: center;
  justify-content: flex-start;

  gap: 0.75rem;

  min-height: 2.75rem;

  padding: 0;

  border: 0;
  border-bottom:
    1px solid
    currentColor;

  background: transparent;

  font-family:
    var(--font-interface);

  font-size:
    var(--font-size-label);

  font-weight: 600;

  line-height: 1;

  letter-spacing:
    var(--letter-spacing-label);

  text-align: left;
  text-transform: uppercase;

  cursor: pointer;

  transition:
    color
      var(--duration-normal)
      var(--ease-standard),
    border-color
      var(--duration-normal)
      var(--ease-standard),
    opacity
      var(--duration-normal)
      var(--ease-standard);
}

.base-text-link--tone-light {
  color: var(--colour-text);
}

.base-text-link--tone-dark {
  color: var(--colour-text-on-dark);
}

.base-text-link:hover {
  color: var(--colour-gold);
  border-color: var(--colour-gold);
}

.base-text-link__label {
  display: inline-flex;
  align-items: center;
}

.base-text-link__arrow {
  display: inline-grid;

  width: 1rem;
  height: 1rem;

  flex: 0 0 auto;

  place-items: center;

  transition:
    transform
      var(--duration-normal)
      var(--ease-standard);
}

.base-text-link__arrow svg {
  width: 100%;
  height: 100%;

  stroke: currentColor;
  stroke-width: 1.35;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.base-text-link:hover
.base-text-link__arrow {
  transform: translateX(0.25rem);
}

.base-text-link__arrow--down {
  transform: rotate(90deg);
}

.base-text-link:hover
.base-text-link__arrow--down {
  transform:
    rotate(90deg)
    translateX(0.25rem);
}

.base-text-link--disabled {
  opacity: 0.42;

  cursor: not-allowed;
  pointer-events: none;
}

@media (max-width: 620px) {
  .base-text-link {
    min-height: 3rem;
  }
}
</style>
