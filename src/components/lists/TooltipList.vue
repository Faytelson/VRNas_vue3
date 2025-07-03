<template>
  <div class="tooltip-list">
    <ul class="tooltip-list__list">
      <li v-for="item in tooltipListData" class="tooltip-list__item">
        <img
          :src="require(`@/assets/images/${item.image.src}`)"
          :alt="item.description"
          class="tooltip-list__img"
        />
        <div class="tooltip-list__tooltip">
          <div v-if="item.quote">
            <blockquote class="tooltip-list__quote">
              <p>{{ item.quote }}</p>
            </blockquote>
            <p class="tooltip-list__author-info">
              <span class="tooltip-list__name">
                {{ item.author }}
              </span>
              -
              <span class="tooltip-list__position">
                {{ item.position }}
              </span>
            </p>
          </div>
        </div>
      </li>
    </ul>
    <div class="tooltip-list__orbits">
      <div class="tooltip-list__orbit"></div>
      <div class="tooltip-list__orbit"></div>
      <div class="tooltip-list__orbit"></div>
      <div class="tooltip-list__orbit" v-if="isTablet"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const props = defineProps({
  tooltipListData: {
    type: Array,
    required: true,
  },
});

const isTablet = ref(false);

const checkDocumentWidth = () => {
  isTablet.value = document.documentElement.clientWidth >= 600;
};

window.onresize = checkDocumentWidth;

onMounted(() => {
  checkDocumentWidth();
});
</script>

<style lang="scss" scoped>
.tooltip-list {
  &__list {
    position: relative;
  }

  &__item {
    position: absolute;
    top: 0;
    left: 0;
  }

  &__img {
    width: 44px;
    height: 44px;
  }

  &__tooltip {
    width: max-content;
    max-width: 250px;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 100%;
    background: rgba(37, 37, 50, 0.77);
    padding: 20px;
  }

  &__quote {
    @include font($font-main, 12px, 400);
    color: $color-gray-2;
    line-height: 1.67em;
    margin-bottom: 8px;
  }

  &__author-info {
    @include font($font-main, 11px, 400);
    color: $color-gray-2;
    line-height: 2em;
  }

  &__name {
    color: $color-white;
  }

  &__orbits {
    position: relative;
  }

  &__orbit {
    border-radius: 50%;
    border: 2px solid $color-gray-3;
    aspect-ratio: 1 / 1;

    &:not(:first-child) {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }

    &:first-child {
      width: calc(100vw - 32px);
      margin: 0 auto;
    }

    &:nth-child(2) {
      width: calc(75vw - 32px);
    }

    &:nth-child(3) {
      width: calc(50vw - 32px);
    }

    &:nth-child(4) {
      width: calc(25vw - 32px);
    }
  }
}
</style>
