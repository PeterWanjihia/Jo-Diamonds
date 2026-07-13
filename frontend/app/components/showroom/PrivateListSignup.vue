<script setup lang="ts">
import { ref } from 'vue';

const email = ref('');
const receiveEventInvitations = ref(false);
const statusMessage = ref('');

function handleSubmit(): void {
  statusMessage.value =
    'Private list registration will be enabled at launch.';
}
</script>

<template>
  <section
    class="private-list"
    aria-labelledby="private-list-title"
  >
    <div class="private-list__inner">
      <div class="private-list__introduction">
        <svg
          class="private-list__icon"
          viewBox="0 0 64 64"
          fill="none"
          aria-hidden="true"
        >
          <path d="M10 25 32 10l22 15v29H10z" />
          <path d="m10 26 22 17 22-17" />
          <path d="m10 54 16-15" />
          <path d="m54 54-16-15" />

          <path d="M21 11h22v24L32 43 21 35z" />
          <path d="M26 18h12" />
          <path d="M26 23h12" />
          <path d="M26 28h8" />
        </svg>

        <div class="private-list__copy">
          <h2
            id="private-list-title"
            class="private-list__title"
          >
            Join the private list
          </h2>

          <p class="private-list__description">
            Be the first to discover new pieces, private releases
            <span>and invitations to exclusive events.</span>
          </p>
        </div>
      </div>

      <form
        class="private-list__form"
        @submit.prevent="handleSubmit"
      >
        <div class="private-list__form-row">
          <label
            class="sr-only"
            for="private-list-email"
          >
            Email address
          </label>

          <input
            id="private-list-email"
            v-model="email"
            class="private-list__input"
            name="email"
            type="email"
            autocomplete="email"
            placeholder="Email address"
            required
          >

          <button
            class="private-list__submit"
            type="submit"
          >
            Join the list
          </button>
        </div>

        <label class="private-list__consent">
          <input
            v-model="receiveEventInvitations"
            type="checkbox"
          >

          <span
            class="private-list__checkbox"
            aria-hidden="true"
          >
            <svg
              viewBox="0 0 16 16"
              fill="none"
            >
              <path d="m3.5 8 3 3 6-6" />
            </svg>
          </span>

          <span>
            I would also like to receive private event invitations.
          </span>
        </label>

        <p
          v-if="statusMessage"
          class="private-list__status"
          aria-live="polite"
        >
          {{ statusMessage }}
        </p>
      </form>
    </div>
  </section>
</template>

<style scoped>
.sr-only {
  position: absolute;

  width: 1px;
  height: 1px;

  padding: 0;
  margin: -1px;

  overflow: hidden;

  clip: rect(0, 0, 0, 0);
  clip-path: inset(50%);

  border: 0;

  white-space: nowrap;
}

.private-list {
  border-top:
    1px solid
    rgb(28 25 21 / 11%);

  border-bottom:
    1px solid
    rgb(28 25 21 / 14%);

  background:
    linear-gradient(
      90deg,
      #f8f5ef 0%,
      #f3eee7 50%,
      #f8f5ef 100%
    );

  color: #191713;
}

.private-list__inner {
  display: grid;
  grid-template-columns:
    minmax(0, 1fr)
    minmax(26rem, 0.95fr);

  width: min(
    calc(100% - (2 * var(--page-gutter))),
    var(--container-wide)
  );

  min-height: 5.75rem;

  align-items: center;

  gap: clamp(
    3rem,
    6vw,
    7rem
  );

  margin-inline: auto;

  padding-block:
    1rem
    1.05rem;
}

/* Introduction */

.private-list__introduction {
  display: grid;
  grid-template-columns:
    3.25rem
    minmax(0, 1fr);

  align-items: center;

  gap: 1.05rem;
}

.private-list__icon {
  width: 3rem;
  height: 3rem;

  color: #b89967;

  stroke: currentColor;
  stroke-width: 1.1;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.private-list__copy {
  min-width: 0;
}

.private-list__title {
  margin: 0;

  font-family: var(--font-display);
  font-size: clamp(
    1.2rem,
    1.55vw,
    1.5rem
  );
  font-weight: 500;

  line-height: 1;
  letter-spacing: 0.025em;

  text-transform: uppercase;
}

.private-list__description {
  display: flex;
  flex-direction: column;

  margin: 0.35rem 0 0;

  color: rgb(25 23 19 / 76%);

  font-family: var(--font-interface);
  font-size: 0.54rem;
  font-weight: 400;

  line-height: 1.4;
}

.private-list__description span {
  display: block;
}

/* Form */

.private-list__form {
  position: relative;

  width: 100%;
  min-width: 0;
}

.private-list__form-row {
  position: relative;

  display: grid;
  grid-template-columns:
    minmax(0, 1fr)
    8rem;

  width: 100%;

  align-items: stretch;

  gap: 0.55rem;
}

.private-list__input,
.private-list__submit {
  width: 100%;
  height: 2.2rem;

  box-sizing: border-box;
}

.private-list__input {
  display: block;

  min-width: 0;

  padding:
    0
    0.75rem;

  border:
    1px solid
    rgb(28 25 21 / 17%);

  border-radius: 0;

  outline: 0;

  background:
    rgb(255 255 255 / 22%);

  color: #191713;

  font-family: var(--font-interface);
  font-size: 0.53rem;
  font-weight: 400;

  line-height: 1;

  transition:
    border-color 180ms ease,
    background-color 180ms ease;
}

.private-list__input::placeholder {
  color: rgb(25 23 19 / 39%);

  opacity: 1;
}

.private-list__input:hover {
  border-color:
    rgb(28 25 21 / 27%);
}

.private-list__input:focus {
  border-color: #9b7945;

  background:
    rgb(255 255 255 / 46%);
}

.private-list__submit {
  display: inline-flex;

  align-items: center;
  justify-content: center;

  padding:
    0
    0.75rem;

  border:
    1px solid
    #11110f;

  border-radius: 0;

  background: #11110f;
  color: #f7f3ec;

  font-family: var(--font-interface);
  font-size: 0.51rem;
  font-weight: 600;

  line-height: 1;
  letter-spacing: 0.085em;

  text-transform: uppercase;

  cursor: pointer;

  transition:
    border-color 180ms ease,
    background-color 180ms ease,
    color 180ms ease;
}

.private-list__submit:hover {
  border-color: #2a2823;

  background: #2a2823;
}

.private-list__submit:active {
  background: #000;
}

.private-list__submit:focus-visible {
  outline:
    2px solid
    #b28a4f;

  outline-offset: 2px;
}

/* Consent */

.private-list__consent {
  display: inline-flex;

  align-items: center;
  gap: 0.4rem;

  margin-top: 0.42rem;

  color: rgb(25 23 19 / 52%);

  font-family: var(--font-interface);
  font-size: 0.45rem;
  font-weight: 400;

  line-height: 1.2;

  cursor: pointer;
}

.private-list__consent input {
  position: absolute;

  width: 1px;
  height: 1px;

  overflow: hidden;

  opacity: 0;
}

.private-list__checkbox {
  display: grid;

  width: 0.65rem;
  height: 0.65rem;

  flex: 0 0 auto;

  place-items: center;

  border:
    1px solid
    rgb(25 23 19 / 25%);

  background:
    rgb(255 255 255 / 26%);
}

.private-list__checkbox svg {
  width: 0.5rem;
  height: 0.5rem;

  opacity: 0;

  stroke: #191713;
  stroke-width: 1.8;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.private-list__consent
input:checked
+ .private-list__checkbox
svg {
  opacity: 1;
}

.private-list__consent
input:focus-visible
+ .private-list__checkbox {
  outline:
    2px solid
    #9b7945;

  outline-offset: 2px;
}

.private-list__status {
  margin: 0.4rem 0 0;

  color: rgb(25 23 19 / 59%);

  font-family: var(--font-interface);
  font-size: 0.44rem;
}

/* Tablet */

@media (max-width: 900px) {
  .private-list__inner {
    grid-template-columns: 1fr;

    gap: 1.25rem;

    padding-block:
      1.5rem
      1.65rem;
  }

  .private-list__introduction {
    max-width: 32rem;
  }

  .private-list__form {
    max-width: 36rem;
  }
}

/* Mobile */

@media (max-width: 620px) {
  .private-list__inner {
    width: calc(100% - 2rem);

    gap: 1.4rem;

    padding-block:
      1.75rem
      2rem;
  }

  .private-list__introduction {
    grid-template-columns:
      2.75rem
      minmax(0, 1fr);

    align-items: start;

    gap: 0.9rem;
  }

  .private-list__icon {
    width: 2.6rem;
    height: 2.6rem;
  }

  .private-list__title {
    font-size: 1.3rem;
  }

  .private-list__description {
    display: block;

    font-size: 0.55rem;
  }

  .private-list__description span {
    display: inline;
  }

  .private-list__description span::before {
    content: ' ';
  }

  .private-list__form-row {
    grid-template-columns: 1fr;

    gap: 0.6rem;
  }

  .private-list__input,
  .private-list__submit {
    height: 2.65rem;
  }

  .private-list__submit {
    width: 100%;
  }

  .private-list__consent {
    align-items: flex-start;

    margin-top: 0.6rem;

    font-size: 0.5rem;
  }

  .private-list__status {
    margin-top: 0.5rem;
  }
}
</style>