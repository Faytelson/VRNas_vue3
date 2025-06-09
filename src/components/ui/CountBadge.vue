<template>
  <div class="count-badge">
    <ul class="count-badge__image-list">
      <li
        class="count-badge__image-item"
        v-for="(image, index) in images"
        :key="image.id"
      >
        <img :src="image.path" :alt="image.alt" class="count-badge__img" />
      </li>
    </ul>

    <p v-if="subtitle" class="count-badge__subtitle">
      {{ subtitle }}
    </p>

    <h5 class="count-badge__title">
      {{ title }}
    </h5>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

defineProps({
  subtitle: {
    type: String,
    default: "",
  },
  title: {
    type: String,
    required: true,
  },
});

const images = ref({});
async function fetchImages() {
  const response = await fetch("/mock-data/happyClients.json");
  const data = await response.json();
  images.value = data.images;
}

onMounted(() => {
  fetchImages();
});
</script>

<style lang="scss" scoped>
.count-badge {
  display: flex;
  align-items: center;

  &__image-list {
    margin-right: 13px;
    display: flex;
    align-items: center;
  }

  &__image-item {
    margin-left: -12px;
    width: 50px;
    height: 50px;

    &:first-child {
      margin-left: 0;
    }
  }

  &__img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &__subtitle {
    @include font($font-main, 14px, 600);
    color: $color-white;
    padding-left: 5px;
    padding-right: 5px;
    position: relative;

    &::before {
        @include pseudo;
        width: 100%;
        height: 9px;
        left: 0;
        top: calc(100% - 7px);
        background: url('@/assets/images/text-decoration_underline_linear.svg') 0 0 / contain no-repeat;
    }
  }

  &__title {
    @include font($font-main, 14px, 300);
    color: $color-gray-2;
  }
}

@media screen and (min-width: $mobileMdBreakpoint) {
  .count-badge {
    &__subtitle,
    &__title {
      font-size: 16px;
    }
  }
}
</style>
