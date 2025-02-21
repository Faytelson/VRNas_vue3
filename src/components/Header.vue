<template>
  <header class="header">
    <div class="header__container">
      <a href="#" class="header__logo">
        <img
          src="@/assets/images/logo.png"
          alt="Логотип компании VRNas"
          class="header__logo-img"
        />
      </a>

      <div v-if="isMobile" class="header__burger">
        <Burger @click="toggleMenu" :isActive="isMenuActive"></Burger>
      </div>

      <nav
        v-if="isMobile"
        v-show="isMenuActive"
        class="header__nav-mobile nav-mobile"
      >
        <menu class="nav-mobile__menu">
          <li class="nav-mobile__menu-item active">
            <a href="#" class="nav-mobile__menu-link">Home</a>
          </li>
          <li class="nav-mobile__menu-item nav-mobile__menu-item_dropdown">
            <span class="nav-mobile__submenu-title">About us</span>
            <ul class="nav-mobile__submenu">
              <li class="nav-mobile__submenu-item">
                <a href="#" class="nav-mobile__submenu-link">Sublist Item</a>
              </li>
            </ul>
          </li>
          <li class="nav-mobile__menu-item">
            <a href="#" class="nav-mobile__menu-link">Home</a>
          </li>
        </menu>
        <div class="nav-mobile__button">
          <ButtonMain
            tag="button"
            label="Contact us"
            variant="secondary"
          ></ButtonMain>
        </div>
      </nav>

      <nav v-if="!isMobile" class="header__nav-desktop nav-desktop">
        <menu class="nav-desktop__menu">
          <li class="nav-desktop__menu-item active">
            <a href="#" class="nav-desktop__menu-link">Home</a>
          </li>
          <li class="nav-desktop__menu-item nav-desktop__menu-item_dropdown">
            <span class="nav-desktop__submenu-title">About us</span>
            <ul class="nav-desktop__submenu">
              <li class="nav-desktop__submenu-item">
                <a href="#" class="nav-desktop__submenu-link">Sublist Item</a>
              </li>
            </ul>
          </li>
          <li class="nav-desktop__menu-item">
            <a href="#" class="nav-desktop__menu-link">Home</a>
          </li>
        </menu>
      </nav>

      <div v-if="width >= tabletBreakpoint" class="header__button">
        <ButtonMain
          tag="button"
          label="Contact us"
          variant="secondary"
        ></ButtonMain>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, computed, watch, onMounted } from "vue";
import Burger from "./ui/Burger.vue";
import ButtonMain from "./ui/ButtonMain.vue";
import { useWindowSize } from "@vueuse/core";

// breakpoints & window
const { width, height } = useWindowSize();
const tabletBreakpoint = 768;
const isMobile = computed(() => width.value < tabletBreakpoint);

// код для корректного отображения шапки на моб устройствах
const vh = computed(() => height.value * 0.01);
const updateVH = () => {
  document.documentElement.style.setProperty("--vh", `${vh.value}px`);
};

onMounted(() => {
  updateVH();
});

watch(height, () => {
  if (isMobile.value) {
    updateVH();
  }
});

// меню
const isMenuActive = ref(false);
const toggleMenu = () => {
  isMenuActive.value = !isMenuActive.value;
};

watch(width, (newWidth) => {
  if (newWidth >= tabletBreakpoint) {
    isMenuActive.value = false;
  }
});
</script>

<style lang="scss" scoped>
.header {
  height: 102px;
  position: relative;

  &__container {
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 16px;
  }

  &__logo {
    width: 101px;
    height: 30px;
  }
}

.nav-mobile {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: calc(100vh - 102px);
  height: calc(var(--vh, 1vh) * 100 - 102px);
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  padding: 12px 16px 20px;
  background-image: linear-gradient(
      90deg,
      rgba(37, 37, 50, 0.9),
      rgba(37, 37, 50, 0.9)
    ),
    linear-gradient(rgba(12, 186, 241, 0.5) 0%, rgba(233, 92, 233, 0.4) 100%);
  z-index: 999;

  &__menu {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  &__menu-item {
    &_dropdown {
      position: relative;

      &:hover {
        .header__submenu {
          height: auto;
          opacity: 1;
          visibility: visible;
          transition-delay: 0s;
        }
      }

      &::after {
        @include pseudo;
        top: 0;
        right: 0;
        height: 100%;
        width: 10px;
        background: url("@/assets/images/icons/icon_arrow_down.svg") 0 12px /
          contain no-repeat;
      }
    }

    .nav-mobile__menu-link,
    .nav-mobile__submenu-title {
      @include font($font-main, 24px, 300);
      color: $color-gray-2;
    }

    &.active {
      .nav-mobile__menu-link,
      .nav-mobile__submenu-title {
        font-weight: 400;
        color: $color-white;
      }
    }
  }

  &__submenu {
    padding-left: 10px;
    opacity: 0;
    visibility: hidden;
    transition: visibility 0s ease 0.3s, opacity 0.3s ease-in;
    height: 0;
  }

  &__submenu-item {
    @include font($font-main, 18px, 400);
    color: $color-white;
  }
}

.nav-desktop {
  &__menu {
    display: flex;
    gap: 64px;
  }

  &__menu-item {
    .nav-desktop__menu-link,
    .nav-desktop__submenu-title {
      @include font($font-main, 16px, 300);
      color: $color-gray-2;
      line-height: 1.75em;
    }

    &.active {
      .nav-desktop__menu-link,
      .nav-desktop__submenu-title {
        font-weight: 500;
        color: $color-white;
      }
    }

    &_dropdown {
      position: relative;

      &:hover {
        .header__submenu {
          height: auto;
          opacity: 1;
          visibility: visible;
          transition-delay: 0s;
        }
      }

      &::after {
        @include pseudo;
        top: 0;
        right: 0;
        height: 100%;
        width: 10px;
        background: url("@/assets/images/icons/icon_arrow_down.svg") 0 12px /
          contain no-repeat;
      }
    }
  }
}

@media screen and (min-width: 425px) {
  .nav-mobile {
    &__button {
      align-self: center;
    }
  }
}

@media screen and (min-width: 768px) {
}
</style>
