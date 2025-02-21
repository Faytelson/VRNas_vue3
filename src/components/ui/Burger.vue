<template>
  <button
    class="burger"
    :class="{ active: isActive }"
    @click="emit('toggleMenu')"
    aria-label="Toggle menu"
  >
    <span class="burger__line"></span>
  </button>
</template>

<script setup>
defineProps({
  isActive: Boolean,
});

const emit = defineEmits(["toggleMenu"]);
</script>

<style lang="scss" scoped>
.burger {
  width: 36px;
  height: 36px;
  @include border-gradient-colored;
  position: relative;

  &::before,
  &::after,
  &__line {
    right: 10px;
    height: 2px;
    background-color: $color-white;
  }

  &::before,
  &::after {
    @include pseudo;
    transition: all $transition-main;
  }

  &::before {
    top: 13px;
    width: 15px;
  }

  &__line {
    position: absolute;
    top: 17px;
    width: 11px;
  }

  &::after {
    top: 21px;
    width: 7px;
  }

  &.active {
    .burger__line {
      display: none;
    }

    &::before,
    &::after {
      top: 50%;
    }

    &::before {
      transform: translateY(-50%) rotate(45deg);
    }

    &::after {
      width: 15px;
      transform: translateY(-50%) rotate(-45deg);
    }
  }
}
</style>
