<template>
  <ul class="breadcrumbs">
    <li class="breadcrumbs__item">
      <a href="" class="breadcrumbs__link">Home</a>
    </li>
    <li class="breadcrumbs__item">
      <a href="" class="breadcrumbs__link">Pricing</a>
    </li>
  </ul>
</template>

<script setup></script>

<style lang="scss" scoped>
.breadcrumbs {
  display: flex;
  justify-content: center;
  align-items: center;

  &__list {
    display: flex;
    align-items: center;
    gap: 4px;
    padding: 4px 0;
    overflow-x: auto;
  }

  &__item:not(:last-child) {
    padding-right: 22px;
    position: relative;

    &::before {
      @include pseudo;
      top: 50%;
      right: 0;
      transform: translateY(-50%);
      width: 18px;
      height: 18px;
      background: url("@/assets/images/icons/icon_arrow_right.svg") center /
        18px 12px no-repeat;
    }
  }

  &__link {
    @include font($font-main, 16px, 600px);
    color: $color-white;
    white-space: nowrap;

    &_active {
      @include font($font-main, 16px, 300px);
      color: $color-gray-2;
    }
  }
}
</style>
