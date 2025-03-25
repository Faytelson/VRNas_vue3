<template>
  <ul class="feature-list">
    <li
      class="feature-list__item"
      v-for="item in listStore.featureListAboutUs"
      :key="item.id"
    >
      <img
        :src="item.img.path"
        alt="item.img.alt"
        class="feature-list__item-img"
      />
      <h3 class="feature-list__item-title">{{ item.title }}</h3>
      <p class="feature-list__item-description">
        {{ item.text }}
      </p>
    </li>
  </ul>
</template>

<script setup>
import { useListStore } from "@/store/lists";

const listStore = useListStore();
</script>

<style lang="scss" scoped>
.feature-list {
  display: grid;
  grid-template-columns: 1fr;
  gap: 50px;
  padding: 12px;
  background-color: $color-black-2;
  @include border-gradient(90deg, $color-gray-3 0%, $color-black-1 100%);

  &__item-img {
    width: 70px;
    height: 70px;
    margin-bottom: 42px;
  }

  &__item-title {
    @include font($font-main, 20px, 400);
    line-height: 1.2em;
    color: $color-white;
    margin-bottom: 12px;
  }

  &__item-description {
    @include font($font-main, 14px, 400);
    line-height: 2em;
    color: $color-gray-2;
  }
}

@media screen and (min-width: $mobileMdBreakpoint) {
  .feature-list {
    padding: 36px;
  }
}

@media screen and (min-width: $tabletSmBreakpoint) {
  .feature-list {
    &__item-img {
      width: 70px;
      height: 70px;
      margin-bottom: 42px;
    }

    &__item-title {
      @include font($font-main, 20px, 400);
      line-height: 1.2em;
      color: $color-white;
      margin-bottom: 12px;
    }

    &__item-description {
      @include font($font-main, 14px, 400);
      line-height: 2em;
      color: $color-gray-2;
    }
  }
}

@media screen and (min-width: $tabletMdBreakpoint) {
  .feature-list {
    grid-template-columns: 1fr 1fr;

    &__item {
      &:last-child:nth-child(odd) {
        grid-column: 1 / -1;
      }
    }
  }
}

@media screen and (min-width: $desktopMdBreakpoint) {
  .feature-list {
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    padding: 42px 64px 53px;

    &__item {
      &:last-child:nth-child(odd) {
        grid-column: auto;
      }
    }
  }
}
</style>
