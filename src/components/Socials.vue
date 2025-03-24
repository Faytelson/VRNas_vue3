<template>
  <ul class="socials">
    <li
      class="socials__item"
      v-for="link in navigationStore.socialLinks"
      :key="link.id"
    >
      <a href="#" class="socials__link">
        <img :src="link.img.path" :alt="link.img.alt" :class="`socials__img socials__img_${link.name}`" />
      </a>
    </li>
  </ul>
</template>

<script setup>
import { useNavigationStore } from "../store/navigation";
const navigationStore = useNavigationStore();
</script>

<style lang="scss" scoped>
.socials {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  column-gap: 20px;

  &__item {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 46px;
    height: 46px;
    border-radius: 50%;
    background: linear-gradient(
      rgba(12, 186, 241, 0.5) 0%,
      rgba(233, 92, 233, 0.4) 100%
    );
    position: relative;

    &::before {
      @include pseudo;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 43px;
      height: 43px;
      background-color: black;
      border-radius: 50%;
      z-index: 1;
    }
  }

  &__link {
    position: relative;
    z-index: 2;
  }

  &__img {
    &_twitter {
      width: 18px;
      height: 15px;
    }

    &_facebook {
      width: 10px;
      height: 20px;
    }

    &_instagram {
      width: 22px;
      height: 22px;
    }

    &_github {
      width: 21px;
      height: 21px;
    }
  }
}
</style>
