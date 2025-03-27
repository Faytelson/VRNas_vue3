<template>
  <component
    :is="tag"
    :to="isRouterLink ? to : null"
    class="button"
    :class="computedClass"
    :aria-label="isButton && ariaLabel ? ariaLabel : null"
    :disabled="isButton ? disabled : undefined"
  >
    <span class="button__text">{{ label }}</span>
  </component>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  tag: {
    type: String,
    validator: (value) => ["button", "router-link", "p"].includes(value),
    required: true,
  },
  to: {
    type: String,
  },
  label: {
    type: String,
    required: true,
  },
  variant: {
    type: String,
    validator: (value) => ["primary", "secondary", "dark"].includes(value),
    required: true,
  },
  ariaLabel: {
    type: String,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});

const isRouterLink = computed(() => props.tag === "router-link");
const isButton = computed(() => props.tag === "button");

const computedClass = computed(() => {
  const classes = new Set();
  if (props.variant) classes.add(`button_${props.variant}`);
  if (props.disabled) classes.add("button_disabled");
  return Array.from(classes).join(" ");
});
</script>

<style lang="scss" scoped>
.button {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-width: 150px;
  height: 50px;
  min-height: 52px;
  cursor: pointer;

  &_primary {
    padding: 0 38px;
    border: 1px solid $color-black-1;
    background: linear-gradient(
        rgba(255, 255, 255, 0.2),
        rgba(255, 255, 255, 0.2)
      ),
      linear-gradient(90deg, #0cbaf1 0%, #e95ce9 100%);
    transition: border-color $transition-main;

    .button__text {
      @include font($font-main, 14px, 700);
      line-height: 1em;
      color: $color-white;
      letter-spacing: 0.11em;
      text-transform: uppercase;
      transition: color $transition-main;
    }

    &:hover {
      border: 1px solid $color-white;
    }
  }

  &_secondary {
    padding: 0 24px;
    background: transparent;
    @include border-gradient-colored;
    position: relative;

    &::after {
      @include pseudo;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 1;
      border: 1px solid $color-white;
      background: linear-gradient(
        rgba(12, 186, 241, 0.5) 0%,
        rgba(233, 92, 233, 0.4) 100%
      );
      opacity: 0;
      transition: opacity $transition-main;
    }

    .button__text {
      position: relative;
      z-index: 2;
      @include font($font-main, 16px, 700);
      line-height: 1.75em;
      color: $color-white;
    }

    &:hover {
      &::after {
        opacity: 1;
      }
    }
  }

  &_dark {
    padding: 0 38px;
    background: rgba(37, 37, 50, 0.9);
    @include border-gradient-colored;

    .button__text {
      @include font($font-main, 14px, 700);
      line-height: 1em;
      color: $color-white;
      text-transform: uppercase;
      letter-spacing: 0.11em;
    }
  }

  &_disabled {
    opacity: 0.5;
    cursor: not-allowed;
    pointer-events: none;
  }
}
</style>
