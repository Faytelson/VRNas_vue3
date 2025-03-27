<template>
  <div class="options-card">
    <div class="options-card__main-info">
      <img
        :src="cardInfo.img.path"
        :alt="cardInfo.img.alt"
        class="options-card__img"
      />
      <h3 class="options-card__title">{{ cardInfo.title }}</h3>
      <p class="options-card__description" ref="descriptionRef">
        {{ cardInfo.text }}
      </p>
    </div>

    <div class="options-card__hover-info">
      <div class="options-card__button">
        <ButtonMain tag="p" label="learn more" variant="dark"></ButtonMain>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
// components
import ButtonMain from "@/components/ui/ButtonMain.vue";

const props = defineProps({
  cardInfo: {
    type: Object,
  },
});
</script>

<style lang="scss" scoped>
.options-card {
  height: 291px;
  padding: 38px 32px 25px;
  background-color: $color-black-2;
  position: relative;
  @include border-gradient(90deg, $color-gray-2 0%, $color-black-1 100%);
  transition: all $transition-main;

  &__main-info {
    max-height: 100%;
    overflow: hidden;
  }

  &__hover-info {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    padding-bottom: 24px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    opacity: 0;
    transition: opacity $transition-main;
    pointer-events: none;
    background: linear-gradient(
      180deg,
      transparent 0%,
      rgba(37, 37, 50, 0) 50%,
      rgba(37, 37, 50, 0.91) 75%,
      #252532 100%
    );
  }

  &:hover {
    @include border-gradient-colored;

    .options-card__hover-info {
      opacity: 1;
      pointer-events: none;
    }
  }

  &__img {
    width: 48px;
    height: 48px;
    margin-bottom: 58px;
  }

  &__title {
    @include font($font-main, 20px, 400);
    color: $color-white;
    line-height: 1.2em;
    margin-bottom: 12px;
  }

  &__description {
    @include font($font-main, 14px, 400);
    color: $color-gray-1;
    line-height: 2em;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
  }
}
</style>
