<script setup lang="ts">
import BaseTextLink from '../base/BaseTextLink.vue';
</script>

<template>
  <section
    id="craft"
    class="brand-manifesto"
    aria-labelledby="brand-manifesto-title"
  >
    <div class="brand-manifesto__inner">
      <p class="brand-manifesto__eyebrow">
        The House of JO.DIAMONDS
      </p>

      <div
        class="brand-manifesto__ornament"
        aria-hidden="true"
      >
        <span class="brand-manifesto__line" />
        <span class="brand-manifesto__diamond" />
        <span class="brand-manifesto__line" />
      </div>

      <h2
        id="brand-manifesto-title"
        class="brand-manifesto__title"
      >
        <span>Jewellery should not simply mark an occasion.</span>
        <span>It should outlive it.</span>
      </h2>

      <p class="brand-manifesto__description">
        <span>Our pieces are selected for their character,</span>
        <span>
          crafted with precision and documented for generations that follow.
        </span>
      </p>

      <BaseTextLink
        href="#craft-pillars"
        arrow="right"
        tone="light"
        class="brand-manifesto__link"
      >
        Discover our philosophy
      </BaseTextLink>
    </div>
  </section>
</template>

<style scoped>
.brand-manifesto {
  scroll-margin-top: 4.5rem;

  border-top: 1px solid rgb(29 27 23 / 7%);
  border-bottom: 1px solid rgb(29 27 23 / 13%);

  background:
    radial-gradient(
      ellipse at top center,
      rgb(255 255 255 / 72%) 0%,
      rgb(255 255 255 / 20%) 48%,
      transparent 78%
    ),
    #f5f1ea;

  color: #171612;
}

.brand-manifesto__inner {
  width: min(
    calc(100% - (2 * var(--page-gutter))),
    58rem
  );

  margin-inline: auto;

  padding-block:
    clamp(2.25rem, 3.3vw, 3rem)
    clamp(2.4rem, 3.5vw, 3.15rem);

  text-align: center;
}

.brand-manifesto__eyebrow {
  margin: 0;

  font-family: var(--font-interface);
  font-size: 0.625rem;
  font-weight: 600;

  line-height: 1;
  letter-spacing: 0.115em;

  text-transform: uppercase;
}

.brand-manifesto__ornament {
  display: flex;
  align-items: center;
  justify-content: center;

  margin:
    0.8rem
    auto
    1.05rem;
}

.brand-manifesto__line {
  width: 1.15rem;
  height: 1px;

  background: rgb(188 145 70 / 58%);
}

.brand-manifesto__diamond {
  width: 0.32rem;
  height: 0.32rem;

  margin-inline: 0.32rem;

  background: #bc9146;

  transform: rotate(45deg);
}

.brand-manifesto__title {
  display: flex;
  flex-direction: column;

  margin: 0;

  font-family: var(--font-display);
  font-size: clamp(2rem, 2.75vw, 2.75rem);
  font-weight: 500;

  line-height: 1.04;
  letter-spacing: -0.012em;
}

.brand-manifesto__title span {
  display: block;
}

.brand-manifesto__description {
  display: flex;
  flex-direction: column;

  max-width: 45rem;

  margin:
    1rem
    auto
    0;

  color: rgb(23 22 18 / 76%);

  font-family: var(--font-interface);
  font-size: 0.75rem;
  font-weight: 400;

  line-height: 1.55;
}

.brand-manifesto__description span {
  display: block;
}

.brand-manifesto__link {
  min-height: 2rem;

  margin-top: 0.7rem;

  border-bottom: 0;

  font-size: 0.625rem;
  letter-spacing: 0.08em;
}

.brand-manifesto__link:hover {
  border-bottom: 0;
}

@media (max-width: 700px) {
  .brand-manifesto {
    scroll-margin-top: 4rem;
  }

  .brand-manifesto__inner {
    width: calc(100% - 2.5rem);

    padding-block:
      2.75rem
      2.9rem;
  }

  .brand-manifesto__title {
    font-size: clamp(
      2rem,
      9.5vw,
      2.65rem
    );

    line-height: 1.02;
  }

  .brand-manifesto__description {
    max-width: 30rem;

    font-size: 0.75rem;
  }
}

@media (max-width: 460px) {
  .brand-manifesto__inner {
    width: calc(100% - 2rem);
  }

  .brand-manifesto__title {
    display: block;
  }

  .brand-manifesto__title span {
    display: inline;
  }

  .brand-manifesto__title span + span::before {
    content: ' ';
  }

  .brand-manifesto__description {
    display: block;
  }

  .brand-manifesto__description span {
    display: inline;
  }

  .brand-manifesto__description span + span::before {
    content: ' ';
  }
}
</style>