<template>
  <component
    :is="tag"
    :to="isRouterLink ? to : null"
    class="button"
    :class="computedClass"
    :aria-label="isButton && ariaLabel ? ariaLabel  : null"
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
    validator: (value) => ["button", "router-link"].includes(value),
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
    validator: (value) => ["primary", "secondary"].includes(value),
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
  display: inline-block;
  border-radius: 4px;
  transition: all 0.2s;

  &_primary {
    background-color: #007bff;
    color: white;

    &:hover {
      background-color: #0056b3;
    }
  }

  &_secondary {
    background-color: #6c757d;

    &:hover {
      background-color: #545b62;
    }
  }

  &_disabled {
    opacity: 0.5;
    cursor: not-allowed;
    pointer-events: none;
  }
}
</style>
