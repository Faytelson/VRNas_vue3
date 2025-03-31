<template>
  <ul class="icon-list">
    <li
      class="icon-list__item"
      v-for="item in listStore.iconListAdvantagesVR"
      :key="item.id"
    >
      <img
        src="@/assets/images/icons/icon_checkbox.svg"
        alt="Checkbox Icon"
        class="icon-list__img"
      />
      <p class="icon-list__text">{{ item.label }}</p>
    </li>
  </ul>
</template>

<script setup>
import { useListStore } from "../../store/lists";

const listStore = useListStore();
</script>

<style lang="scss" scoped>
.icon-list {
  &__item {
    display: flex;
    align-items: center;
    column-gap: 12px;
    margin-bottom: 14px;

    &:last-child {
      margin-bottom: 0;
    }
  }

  &__img {
    width: 16px;
    height: 16px;
  }

  &__text {
    @include font($font-main, 16px, 400);
    line-height: 1.2em;
    color: $color-white;
  }
}
</style>
